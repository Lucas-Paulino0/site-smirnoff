"""Junta os renders das regiões, aplica relevo e a borda do mapa e corta os tiles.
Uso: python assemble.py <tiles_raw> <regions.yml> <saida tiles> <saida preview.png>"""
import os, re, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

RAW, REGIONS, OUT, PREVIEW = sys.argv[1:5]
TILE = 256
X0, Z0 = -4224, -2624          # canto noroeste do mapa (múltiplo de 64)
W, H = 27 * TILE, 21 * TILE    # 6912 x 5376 blocos
MAXZ = 5                       # zoom 5 = 1 pixel por bloco

rgb = np.zeros((H, W, 3), np.uint8); hh = np.zeros((H, W), np.float32)
dep = np.zeros((H, W), np.uint8); ok = np.zeros((H, W), bool)
for fn in os.listdir(RAW):
    rx, rz = map(int, fn.split(".")[1:3])
    x, z = rx * 512 - X0, rz * 512 - Z0
    sx0, sz0 = max(0, -x), max(0, -z); dx0, dz0 = max(0, x), max(0, z)
    w, h = min(512 - sx0, W - dx0), min(512 - sz0, H - dz0)
    if w <= 0 or h <= 0: continue
    d = np.load(os.path.join(RAW, fn))
    sl = (slice(dz0, dz0 + h), slice(dx0, dx0 + w)); ss = (slice(sz0, sz0 + h), slice(sx0, sx0 + w))
    rgb[sl] = d["rgb"][ss]; hh[sl] = d["h"][ss]; dep[sl] = d["depth"][ss]; ok[sl] = d["ok"][ss]

# relevo: detalhe (vizinho a noroeste) + forma grande (altura suavizada)
water = dep > 0
hf = np.where(ok, hh, ndimage.grey_dilation(hh, size=3))
fine = hf - np.roll(np.roll(hf, 1, 0), 1, 1)
big = ndimage.gaussian_filter(hf, 6)
gz, gx = np.gradient(big)
light = -(gx + gz) * 0.9
shade = 1 + np.clip(fine * 0.045, -0.22, 0.22) + np.clip(light * 0.09, -0.25, 0.25)
shade[water] = 1 + np.clip(light[water] * 0.02, -0.05, 0.05)
img = np.clip(rgb.astype(np.float32) * shade[..., None], 0, 255)

# fora da borda: escurece e dessatura
txt = open(REGIONS, encoding="utf-8").read()
seg = txt[txt.index("\n    borda:"):]
nxt = re.search(r"\n    [\w-]+:\n", seg[10:])
seg = seg[:10 + nxt.start()] if nxt else seg
pts = [(int(a) - X0, int(b) - Z0) for a, b in re.findall(r"\{x: (-?\d+), z: (-?\d+)\}", seg)]
m = Image.new("L", (W, H), 0); ImageDraw.Draw(m).polygon(pts, fill=255)
inside = np.asarray(m) > 0
fade = ndimage.distance_transform_edt(~inside)
k = np.clip(fade / 48, 0, 1)[..., None]
gray = img.mean(axis=2, keepdims=True)
outside = (img * 0.35 + gray * 0.25) * (1 - k * 0.55) + np.array([26, 20, 14]) * k * 0.55
img = np.where(inside[..., None], img, outside)
BG = (32, 25, 18)  # fundo do mapa (o mesmo do site)

# Onde não há chunks (área inexplorada): névoa azul-escura com nuvens, e um
# banco de nuvens claras na beira da terra
rng = np.random.default_rng(7)
def noise(sigma, shape=(H // 4, W // 4)):
    n = ndimage.gaussian_filter(rng.standard_normal(shape), sigma)
    n = (n - n.mean()) / (n.std() + 1e-9)
    return ndimage.zoom(n, 4, order=1)[:H, :W]
# beira orgânica: a névoa avança um pouco sobre a terra fora da borda
soft = ndimage.gaussian_filter((~ok).astype(np.float32), 20) + noise(3) * 0.12
void = ((soft > 0.42) & ~inside) | ~ok
cloud = noise(40) * 0.55 + noise(12) * 0.3 + noise(4) * 0.15
wisp = ndimage.zoom(ndimage.gaussian_filter(rng.standard_normal((H // 4, W // 4)), (1.5, 18)), 4, order=1)[:H, :W]
wisp = np.clip((wisp / (wisp.std() + 1e-9) - 1.2) * 0.6, 0, 1)
dist = ndimage.distance_transform_edt(void)
bank = np.clip(1 - dist / 90, 0, 1) ** 1.5 * np.clip(noise(6) * 0.8 + 0.7, 0, 1)
fog = np.array([43, 56, 80], np.float32) + cloud[..., None] * np.array([10, 12, 16], np.float32)
fog = fog + wisp[..., None] * np.array([40, 46, 56], np.float32)
fog = fog * (1 - bank[..., None]) + np.array([196, 205, 218], np.float32) * bank[..., None]
fog = fog * (1 - np.clip(dist / 900, 0, 0.35))[..., None]  # mais escuro longe da terra
img = np.where(void[..., None], fog, img)
lab = void.copy(); lab[:, (-2600 - X0):] = False; lab[:(-300 - Z0), :] = False
zz, xx = np.nonzero(lab)
print("centro da área inexplorada: x", int(xx.mean()) + X0, "z", int(zz.mean()) + Z0)
img = img.astype(np.uint8)

# tiles: zoom MAXZ = 1:1, cada nível abaixo reduz pela metade
level = Image.fromarray(img)
for z in range(MAXZ, -1, -1):
    lw, lh = level.size
    for ty in range((lh + TILE - 1) // TILE):
        for tx in range((lw + TILE - 1) // TILE):
            t = Image.new("RGB", (TILE, TILE), BG)  # sobra do último tile: cor de fundo
            t.paste(level.crop((tx * TILE, ty * TILE, min(lw, tx * TILE + TILE), min(lh, ty * TILE + TILE))), (0, 0))
            d = os.path.join(OUT, str(z)); os.makedirs(d, exist_ok=True)
            t.save(os.path.join(d, f"{tx}_{ty}.webp"), "WEBP", quality=82, method=6)
    if z == 2: level.save(PREVIEW)
    level = level.resize((max(1, lw // 2), max(1, lh // 2)), Image.LANCZOS)
print("ok", W, H)
