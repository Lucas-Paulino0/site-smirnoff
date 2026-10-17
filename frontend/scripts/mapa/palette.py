"""Cor de cima de cada bloco, tirada das texturas do cliente (26.1.2).
Uso: python palette.py <pasta mc extraída> <saida.json>
Saída: {bloco: [r, g, b, a, tint]}; tint: 0 nenhum, 1 grama, 2 folhagem, 3 água."""
import json, os, sys
from PIL import Image

MC, OUT = sys.argv[1], sys.argv[2]
A = os.path.join(MC, "assets", "minecraft")
GRASS = {"grass_block", "short_grass", "tall_grass", "fern", "large_fern", "sugar_cane", "vine", "pink_petals_stem"}
FOLIAGE_TINTED = {"oak_leaves", "jungle_leaves", "acacia_leaves", "dark_oak_leaves", "mangrove_leaves", "vine"}
FIXED_LEAF = {"spruce_leaves": (0x61, 0x99, 0x61), "birch_leaves": (0x80, 0xA7, 0x55)}
WATERY = {"water", "bubble_column", "kelp", "kelp_plant", "seagrass", "tall_seagrass"}

def load_model(name, seen=0):
    name = name.split(":")[-1]
    p = os.path.join(A, "models", name + ".json")
    if not os.path.exists(p) or seen > 10:
        return {}
    m = json.load(open(p, encoding="utf-8"))
    tex = {}
    if "parent" in m:
        tex.update(load_model(m["parent"], seen + 1))
    tex.update(m.get("textures", {}))
    return tex

def resolve(tex, key):
    v = tex.get(key)
    for _ in range(10):
        if isinstance(v, dict):
            v = v.get("sprite")
        if v is None or not v.startswith("#"):
            return v
        v = tex.get(v[1:])
    return None

def avg(texname):
    p = os.path.join(A, "textures", texname.split(":")[-1] + ".png")
    if not os.path.exists(p):
        return None
    im = Image.open(p).convert("RGBA")
    w, h = im.size
    im = im.crop((0, 0, w, w))  # texturas animadas: só o primeiro quadro
    px = list(im.get_flattened_data()) if hasattr(im, 'get_flattened_data') else list(im.getdata())
    sol = [q for q in px if q[3] > 40]
    if not sol:
        return None
    n = len(sol)
    return [sum(q[i] for q in sol) // n for i in range(3)] + [int(255 * n / len(px))]

def first_model(bs):
    if "variants" in bs:
        v = next(iter(bs["variants"].values()))
        return (v[0] if isinstance(v, list) else v)["model"]
    for part in bs.get("multipart", []):
        a = part["apply"]
        return (a[0] if isinstance(a, list) else a)["model"]
    return None

out = {}
for fn in os.listdir(os.path.join(A, "blockstates")):
    name = fn[:-5]
    bs = json.load(open(os.path.join(A, "blockstates", fn), encoding="utf-8"))
    model = first_model(bs)
    tex = load_model(model) if model else {}
    color = None
    for key in ("top", "end", "up", "all", "texture", "cross", "plant", "crop", "flower", "pattern", "side", "particle"):
        t = resolve(tex, key)
        if t:
            color = avg(t)
            if color:
                break
    if name in ("water", "bubble_column"):
        color = avg("block/water_still")
    elif name == "lava":
        color = avg("block/lava_still")
    elif name == "grass_block":
        color = avg("block/grass_block_top")
    if not color:
        continue
    tint = 0
    if name in WATERY:
        tint = 3
    elif name in GRASS:
        tint = 1
    elif name in FOLIAGE_TINTED:
        tint = 2
    if name in FIXED_LEAF:
        r, g, b = FIXED_LEAF[name]
        color = [color[0] * r // 255, color[1] * g // 255, color[2] * b // 255, color[3]]
    out[name] = color + [tint]

json.dump(out, open(OUT, "w"), indent=0)
print(len(out), "blocos")
