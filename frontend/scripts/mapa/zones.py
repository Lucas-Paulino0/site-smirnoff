"""Áreas de nível do regions.yml do WorldGuard, para o mapa do site.
Junta as faixas (rpg_<area>_<lo>_<hi>) e zonas de transição de cada área num
contorno só, sem as fendas de 4 blocos que o WorldGuard deixa nos buracos.
Uso: python zones.py <regions.yml> <saida.json>"""
import json, re, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from skimage import measure

src, out = sys.argv[1:3]
txt = open(src, encoding="utf-8").read()
blocks = re.split(r"\n    ([\w-]+):\n", txt)
regions = {}
for name, body in zip(blocks[1::2], blocks[2::2]):
    if re.search(r"type: (\w+)", body).group(1) == "poly2d":
        regions[name] = [(int(a), int(b)) for a, b in re.findall(r"\{x: (-?\d+), z: (-?\d+)\}", body)]

AREAS = {
    "spawn": "Cratera da Ruína", "sul": "Prado Verdejante", "leste": "Selva de Jade",
    "lago_cerejeiras": "Refúgio das Pétalas", "floresta_central": "Bosque do Crepúsculo",
    "neve": "Fronteira Nevada", "vulcao": "Inferno Escaldante",
}
X0, Z0, W, H, S = -4224, -2624, 6912, 5376, 4  # S blocos por pixel da máscara

areas = {}
for name, pts in regions.items():
    m = re.fullmatch(r"rpg_(entre_)?(spawn|sul|leste|lago_cerejeiras|floresta_central|neve|vulcao)_(\d+)_(\d+)(_\d+)?", name)
    if not m: continue
    a = areas.setdefault(m[2], {"lo": 999, "hi": 0, "polys": []})
    a["lo"] = min(a["lo"], int(m[3])); a["hi"] = max(a["hi"], int(m[4])); a["polys"].append(pts)

result = []
for key, a in sorted(areas.items(), key=lambda kv: kv[1]["lo"]):
    img = Image.new("L", (W // S, H // S), 0); d = ImageDraw.Draw(img)
    for pts in a["polys"]:
        d.polygon([((x - X0) / S, (z - Z0) / S) for x, z in pts], fill=255)
    mask = np.asarray(img) > 0
    mask = ndimage.binary_closing(mask, structure=np.ones((5, 5)), iterations=2)
    mask = ndimage.binary_fill_holes(mask)
    mask = ndimage.binary_opening(mask, structure=np.ones((3, 3)))
    rings = []
    for c in measure.find_contours(np.pad(mask, 1).astype(float), 0.5):
        c = measure.approximate_polygon(c, tolerance=1.2)
        if len(c) < 4: continue
        ring = [[round((p[1] - 1) * S + X0), round((p[0] - 1) * S + Z0)] for p in c]
        area = abs(sum(ring[i][0] * ring[i - 1][1] - ring[i - 1][0] * ring[i][1] for i in range(len(ring)))) / 2
        if area > 20000: rings.append(ring)
    result.append({"area": AREAS[key], "lo": a["lo"], "hi": a["hi"], "rings": rings})

def border_ring():
    body = txt[txt.index("\n    borda:"):]
    nxt = re.search(r"\n    [\w-]+:\n", body[10:])
    body = body[:10 + nxt.start()] if nxt else body
    return [[int(a), int(b)] for a, b in re.findall(r"\{x: (-?\d+), z: (-?\d+)\}", body)]

json.dump({"zones": result, "border": border_ring()}, open(out, "w", encoding="utf-8"),
          separators=(",", ":"), ensure_ascii=False)
print([(z["area"], len(z["rings"]), sum(len(r) for r in z["rings"])) for z in result])
