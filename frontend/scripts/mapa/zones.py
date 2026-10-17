"""Zonas de nível e áreas do regions.yml do WorldGuard, simplificadas, para o mapa do site.
Uso: python zones.py <regions.yml> <saida.json>"""
import json, re, sys

src, out = sys.argv[1:3]
txt = open(src, encoding="utf-8").read()
blocks = re.split(r"\n    ([\w-]+):\n", txt)
regions = {}
for name, body in zip(blocks[1::2], blocks[2::2]):
    t = re.search(r"type: (\w+)", body).group(1)
    if t == "poly2d":
        pts = [(int(a), int(b)) for a, b in re.findall(r"\{x: (-?\d+), z: (-?\d+)\}", body)]
    elif t == "cuboid":
        mn = re.search(r"min: \{x: (-?[\d.]+), y: -?[\d.]+, z: (-?[\d.]+)\}", body)
        mx = re.search(r"max: \{x: (-?[\d.]+), y: -?[\d.]+, z: (-?[\d.]+)\}", body)
        if not mn or not mx: continue
        x0, z0, x1, z1 = int(float(mn[1])), int(float(mn[2])), int(float(mx[1])), int(float(mx[2]))
        pts = [(x0, z0), (x1, z0), (x1, z1), (x0, z1)]
    else:
        continue
    regions[name] = pts

def dp(pts, eps):
    """Douglas-Peucker num polígono fechado."""
    if len(pts) < 4: return pts
    def rec(a, b):
        (x1, z1), (x2, z2) = pts[a], pts[b]
        dx, dz = x2 - x1, z2 - z1; L = (dx * dx + dz * dz) ** 0.5 or 1
        best, bi = -1, -1
        for i in range(a + 1, b):
            d = abs(dz * (pts[i][0] - x1) - dx * (pts[i][1] - z1)) / L
            if d > best: best, bi = d, i
        if best > eps: return rec(a, bi)[:-1] + rec(bi, b)
        return [pts[a], pts[b]]
    far = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
    return rec(0, far)[:-1] + rec(far, len(pts) - 1)

AREAS = {
    "spawn": "Cratera da Ruína", "sul": "Terras do Sul", "leste": "Planícies Verdes",
    "lago_cerejeiras": "Vale Florido", "floresta_central": "Floresta Sombria",
    "neve": "Picos Gélidos", "vulcao": "Terras Ardentes",
}
zones = []
for name, pts in regions.items():
    m = re.fullmatch(r"rpg_(entre_)?(spawn|sul|leste|lago_cerejeiras|floresta_central|neve|vulcao)_(\d+)_(\d+)(_\d+)?", name)
    if not m: continue
    zones.append({"area": AREAS[m[2]], "lo": int(m[3]), "hi": int(m[4]), "between": bool(m[1]),
                  "points": [list(p) for p in dp(pts, 6)]})
zones.sort(key=lambda z: (z["lo"], z["between"]))
border = [list(p) for p in dp(regions["borda"], 3)]
roads = [[list(p) for p in dp(pts, 3)] for n, pts in regions.items() if n.startswith("rpg_semmobs_estrada")]
json.dump({"zones": zones, "border": border}, open(out, "w", encoding="utf-8"), separators=(",", ":"), ensure_ascii=False)
print(len(zones), "zonas,", sum(len(z["points"]) for z in zones), "pontos; borda", len(border))
