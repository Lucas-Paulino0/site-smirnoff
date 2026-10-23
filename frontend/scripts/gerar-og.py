"""Imagens de prévia (Discord, WhatsApp, Twitter) das páginas da wiki.

Uso: python scripts/gerar-og.py

Amplia cada ícone de public/itens/ (16x16) para 256x256 sem borrar, em
public/og/itens/, porque o Discord amplia a imagem pequena com filtro e o
pixel art fica borrado. Rode de novo depois do gerar-profissoes.py.
A imagem padrão (public/og/hail.png, 1200x630) é feita à mão.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public" / "itens"
TARGET = ROOT / "public" / "og" / "itens"
SIZE = 256

TARGET.mkdir(parents=True, exist_ok=True)
for old in TARGET.glob("*.png"):
    old.unlink()

count = 0
for icon in sorted(SOURCE.glob("*.png")):
    image = Image.open(icon).convert("RGBA")
    factor = max(1, SIZE // max(image.size))
    big = image.resize((image.width * factor, image.height * factor), Image.NEAREST)
    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    canvas.paste(big, ((SIZE - big.width) // 2, (SIZE - big.height) // 2))
    canvas.save(TARGET / icon.name, optimize=True)
    count += 1

print(f"{count} imagens em {TARGET.relative_to(ROOT)}")
