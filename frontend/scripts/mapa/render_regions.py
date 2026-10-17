"""Render de cima de cada arquivo .mca: cor do bloco do topo (com tinta do bioma),
altura e profundidade da água, 1 pixel por bloco.
Uso: python render_regions.py <pasta region> <palette.json> <pasta mc> <saida>
Grava <saida>/r.X.Z.npz com rgb (512x512x3 uint8), h (int16), depth (uint8), ok (bool)."""
import json, os, struct, sys, zlib
from multiprocessing import Pool
import numpy as np
from PIL import Image

REG, PAL, MC, OUT = sys.argv[1:5]
MINY, HBITS = -272, 10

# ---------- NBT ----------
def nbt_payload(b, i, t):
    if t == 1: return b[i] if b[i] < 128 else b[i] - 256, i + 1
    if t == 2: return struct.unpack_from(">h", b, i)[0], i + 2
    if t == 3: return struct.unpack_from(">i", b, i)[0], i + 4
    if t == 4: return struct.unpack_from(">q", b, i)[0], i + 8
    if t == 5: return struct.unpack_from(">f", b, i)[0], i + 4
    if t == 6: return struct.unpack_from(">d", b, i)[0], i + 8
    if t == 7:
        n = struct.unpack_from(">i", b, i)[0]; return b[i + 4:i + 4 + n], i + 4 + n
    if t == 8:
        n = struct.unpack_from(">H", b, i)[0]; return b[i + 2:i + 2 + n].decode("utf-8", "replace"), i + 2 + n
    if t == 9:
        et, n = b[i], struct.unpack_from(">i", b, i + 1)[0]; i += 5; out = []
        for _ in range(n):
            v, i = nbt_payload(b, i, et); out.append(v)
        return out, i
    if t == 10:
        d = {}
        while True:
            tt = b[i]; i += 1
            if tt == 0: return d, i
            n = struct.unpack_from(">H", b, i)[0]; name = b[i + 2:i + 2 + n].decode("utf-8", "replace"); i += 2 + n
            d[name], i = nbt_payload(b, i, tt)
    if t == 11:
        n = struct.unpack_from(">i", b, i)[0]; return np.frombuffer(b, ">i4", n, i + 4), i + 4 + 4 * n
    if t == 12:
        n = struct.unpack_from(">i", b, i)[0]; return np.frombuffer(b, ">i8", n, i + 4), i + 4 + 8 * n
    raise ValueError(t)

def unpack(data, bits, count):
    per = 64 // bits
    d = np.asarray(data).astype(np.int64).view(np.uint64)
    shifts = (np.arange(per, dtype=np.uint64) * np.uint64(bits))
    v = (d[:, None] >> shifts[None, :]) & np.uint64((1 << bits) - 1)
    return v.reshape(-1)[:count].astype(np.int32)

# ---------- cores ----------
PALETTE = json.load(open(PAL))
GRASS_MAP = np.asarray(Image.open(os.path.join(MC, "assets/minecraft/textures/colormap/grass.png")).convert("RGB"))
FOLI_MAP = np.asarray(Image.open(os.path.join(MC, "assets/minecraft/textures/colormap/foliage.png")).convert("RGB"))
BIOMES = {}
bdir = os.path.join(MC, "data/minecraft/worldgen/biome")
def hexc(s): s = s.lstrip("#"); return [int(s[i:i + 2], 16) for i in (0, 2, 4)]
for fn in os.listdir(bdir):
    d = json.load(open(os.path.join(bdir, fn), encoding="utf-8"))
    t = min(max(d.get("temperature", 0.8), 0), 1); dn = min(max(d.get("downfall", 0.4), 0), 1) * t
    x, y = int((1 - t) * 255), int((1 - dn) * 255)
    e = d.get("effects", {})
    g = hexc(e["grass_color"]) if "grass_color" in e else list(GRASS_MAP[y, x])
    f = hexc(e["foliage_color"]) if "foliage_color" in e else list(FOLI_MAP[y, x])
    mod = e.get("grass_color_modifier")
    if mod == "swamp": g = [0x6A, 0x70, 0x39]
    if mod == "dark_forest": g = [((g[0] & 0xFE) + 0x28) >> 1, ((g[1] & 0xFE) + 0x34) >> 1, ((g[2] & 0xFE) + 0x0A) >> 1]
    w = hexc(e.get("water_color", "#3f76e4"))
    BIOMES["minecraft:" + fn[:-5]] = (g, f, w)
DEFAULT_B = BIOMES["minecraft:plains"]

SKIP_NAMES = {"air", "cave_air", "void_air", "light", "barrier", "structure_void", "short_grass", "tall_grass", "fern",
              "large_fern", "short_dry_grass", "tall_dry_grass", "bush", "dead_bush", "firefly_bush", "leaf_litter"}
WATER_NAMES = {"water", "bubble_column", "kelp", "kelp_plant", "seagrass", "tall_seagrass"}
UNKNOWN = [255, 0, 255, 255, 0]
missing = set()

def block_info(state):
    n = state["Name"].split(":")[-1]
    p = PALETTE.get(n)
    if p is None:
        missing.add(n); p = [128, 128, 128, 255, 0]
    skip = n in SKIP_NAMES or p[3] < 60
    water = n in WATER_NAMES
    return p, skip, water

def render_chunk(tag, rgb, hh, dep, ok, ox, oz):
    secs = tag.get("sections") or []
    if not secs: return
    ys = sorted(s["Y"] for s in secs if "block_states" in s)
    if not ys: return
    y0 = ys[0] * 16; ny = (ys[-1] - ys[0] + 1) * 16
    col = np.zeros((ny, 256, 3), np.uint8); alpha = np.zeros((ny, 256), np.uint8)
    tint = np.zeros((ny, 256), np.uint8); skip = np.ones((ny, 256), bool); water = np.zeros((ny, 256), bool)
    bio = np.zeros((ny // 4 + 1, 16, 3, 3), np.uint8)  # [y/4, celula xz, (grama, folha, agua)]
    for s in secs:
        bs = s.get("block_states")
        if not bs: continue
        pal = bs.get("palette", [])
        info = [block_info(q) for q in pal]
        pc = np.array([i[0][:3] for i in info], np.uint8); pa = np.array([i[0][3] for i in info], np.uint8)
        pt = np.array([i[0][4] for i in info], np.uint8); ps = np.array([i[1] for i in info]); pw = np.array([i[2] for i in info])
        if len(pal) == 1 or bs.get("data") is None: idx = np.zeros(4096, np.int32)
        else: idx = unpack(bs["data"], max(4, (len(pal) - 1).bit_length()), 4096)
        idx = idx.reshape(16, 256)
        a = (s["Y"] - ys[0]) * 16
        col[a:a + 16] = pc[idx]; alpha[a:a + 16] = pa[idx]; tint[a:a + 16] = pt[idx]; skip[a:a + 16] = ps[idx]; water[a:a + 16] = pw[idx]
        b = s.get("biomes")
        if b:
            bp = b.get("palette", [])
            bc = np.array([sum(BIOMES.get(q, DEFAULT_B), []) for q in bp], np.uint8).reshape(-1, 3, 3)
            bi = np.zeros(64, np.int32) if len(bp) == 1 or b.get("data") is None else unpack(b["data"], max(1, (len(bp) - 1).bit_length()), 64)
            bio[(s["Y"] - ys[0]) * 4:(s["Y"] - ys[0]) * 4 + 4] = bc[bi].reshape(4, 16, 3, 3)
    cols = np.arange(256)
    # topo = bloco visível mais alto de cada coluna (o heightmap salvo pode
    # estar velho onde houve colagens com FAWE)
    solid = ~skip
    y = np.where(solid.any(0), ny - 1 - np.argmax(solid[::-1], axis=0), 0)
    surf = y.copy(); d = np.zeros(256, np.int32)
    for _ in range(64):  # profundidade da água
        m = water[y, cols] & (y > 0)
        if not m.any(): break
        y = np.where(m, y - 1, y); d += m
    c = col[surf, cols].astype(np.float32); t = tint[surf, cols]
    cell = (cols >> 4 >> 2) * 4 + ((cols & 15) >> 2)
    bb = bio[np.clip(surf // 4, 0, bio.shape[0] - 1), cell].astype(np.float32)
    for k in (1, 2):
        m = t == k
        c[m] = c[m] * bb[m, k - 1] / 255
    iw = d > 0
    if iw.any():
        floor = col[y, cols].astype(np.float32)
        wc = col[surf, cols].astype(np.float32) * bb[:, 2] / 255
        f = np.clip(0.55 + d * 0.06, 0.55, 0.92)[:, None]
        c[iw] = (wc * f + floor * (1 - f))[iw]
    sl = (slice(oz, oz + 16), slice(ox, ox + 16))
    rgb[sl] = np.clip(c, 0, 255).astype(np.uint8).reshape(16, 16, 3)
    hh[sl] = (surf + y0).reshape(16, 16); dep[sl] = np.clip(d, 0, 255).reshape(16, 16)
    ok[sl] = solid.any(0).reshape(16, 16)  # coluna só de ar = inexplorada

def do_region(fn):
    rx, rz = map(int, fn.split(".")[1:3])
    dst = os.path.join(OUT, fn.replace(".mca", ".npz"))
    if os.path.exists(dst): return fn, 0, []
    rgb = np.zeros((512, 512, 3), np.uint8); hh = np.zeros((512, 512), np.int16)
    dep = np.zeros((512, 512), np.uint8); ok = np.zeros((512, 512), bool); n = 0
    with open(os.path.join(REG, fn), "rb") as f:
        head = f.read(4096)
        for i in range(1024):
            off = struct.unpack_from(">I", head, 4 * i)[0]
            if not off: continue
            f.seek((off >> 8) * 4096)
            try:
                ln, comp = struct.unpack(">IB", f.read(5)); raw = f.read(ln - 1)
                buf = zlib.decompress(raw) if comp == 2 else raw
                nl = struct.unpack_from(">H", buf, 1)[0]
                tag, _ = nbt_payload(buf, 3 + nl, 10)
                if tag.get("Status", "minecraft:full") not in ("minecraft:full", "full"): continue
                render_chunk(tag, rgb, hh, dep, ok, (i & 31) * 16, (i >> 5) * 16); n += 1
            except Exception as e:
                missing.add("ERR " + type(e).__name__ + str(e)[:60])
    np.savez_compressed(dst, rgb=rgb, h=hh, depth=dep, ok=ok)
    return fn, n, sorted(missing)

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    files = sorted(f for f in os.listdir(REG) if f.endswith(".mca") and os.path.getsize(os.path.join(REG, f)) > 8192)
    if len(sys.argv) > 5: files = [f for f in files if f in sys.argv[5:]]
    allm = set()
    with Pool(max(1, (os.cpu_count() or 2) - 2)) as p:
        for fn, n, m in p.imap_unordered(do_region, files):
            allm |= set(m); print(fn, n, flush=True)
    print("faltando na paleta:", sorted(allm)[:80])
