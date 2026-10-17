# Mapa do mundo (/mapa)

O terreno do mapa é renderizado dos arquivos do mundo do servidor Hail, 1 pixel por bloco.
Para refazer depois de mudanças no mundo:

1. Baixe, só lendo, `world/dimensions/minecraft/overworld/region/*.mca` e
   `plugins/WorldGuard/worlds/world/regions.yml` pelo SFTP do hail-admin-kit.
2. Extraia do jar do cliente da mesma versão do servidor (26.1.2) as pastas
   `assets/minecraft/{textures/block,textures/colormap,models/block,blockstates}` e
   `data/minecraft/worldgen/biome`.
3. Rode, com Python 3 + numpy + scipy + Pillow:

```
python palette.py <mc> palette.json
python render_regions.py <region> palette.json <mc> raw
python assemble.py raw regions.yml ../../public/mapa-do-mundo/tiles mundo.png
python zones.py regions.yml ../../public/mapa-do-mundo/zonas.json
```

`assemble.py` corta os tiles (zoom 0 a 5, 5 = 1 pixel por bloco). Converta o `mundo.png`
(zoom 2) para `public/mapa-do-mundo/mundo.webp`. Cidades, chefes e locais com monstros ficam em
`app/data/worldMap.ts`.
