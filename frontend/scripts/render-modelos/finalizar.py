"""Recorta os renders de scripts/render-modelos/renderizar.mjs e grava no site.

Uso: python scripts/render-modelos/finalizar.py <pasta-dos-modelos>

- <pasta>/renders/chefes/*.png  -> public/chefes/   (520x520)
- <pasta>/renders/monstros/*.png -> public/monstros/ (520x520)
- <pasta>/renders/itens/*.png   -> public/itens/3d/ (128x128)

Também escreve app/data/pictures.ts com a lista do que tem imagem.
Grava com 256 cores, que não muda nada visível e deixa o arquivo menor.
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent.parent
GROUPS = {
    "chefes": (ROOT / "public" / "chefes", 520, 0.06),
    "monstros": (ROOT / "public" / "monstros", 520, 0.06),
    "itens": (ROOT / "public" / "itens" / "3d", 128, 0.03),
}


def finish(source: Path, target: Path, size: int, padding: float):
    image = Image.open(source).convert("RGBA")
    box = image.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if box:
        image = image.crop(box)
    side = int(max(image.size) * (1 + 2 * padding))
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.alpha_composite(image, ((side - image.width) // 2, (side - image.height) // 2))
    final = canvas.resize((size, size), Image.LANCZOS)
    # 256 cores: sem diferença visível e uns 4 vezes menor
    final.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(target, optimize=True)


def main(folder: Path):
    for group, (target, size, padding) in GROUPS.items():
        target.mkdir(parents=True, exist_ok=True)
        files = sorted((folder / "renders" / group).glob("*.png"))
        for source in files:
            finish(source, target / source.name, size, padding)
        print(f"{len(files)} imagens em {target.relative_to(ROOT)}")
    write_list()


def write_list():
    # quais chefes e famílias têm imagem (o site não mostra imagem quebrada)
    names = lambda folder: sorted(p.stem for p in folder.glob("*.png"))
    chefes, monstros = names(GROUPS["chefes"][0]), names(GROUPS["monstros"][0])
    lines = [
        "// Gerado por scripts/render-modelos/finalizar.py: não edite à mão.",
        "",
        f"export const BOSS_PICTURES = new Set({chefes!r});".replace("'", '"'),
        "",
        f"export const FAMILY_PICTURES = new Set({monstros!r});".replace("'", '"'),
        "",
    ]
    out = ROOT / "app" / "data" / "pictures.ts"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"lista em {out.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
