"""Gera app/data/jobs.ts e jobRarities.ts (profissões) a partir das configurações
do servidor Hail, e copia os ícones dos materiais e itens para public/itens.

Baixe estes arquivos do servidor (SFTP, ver hail-admin-kit) para uma pasta e rode:

    python scripts/gerar-profissoes.py <pasta>

- plugins/RPGJobs/config.yml             -> rpgjobs.yml (profissões e raridades)
- plugins/RPGJobs/tools.yml              -> rpgjobs-tools.yml (ferramentas de coleta)
- plugins/RPGJobs/recipes/<job>/tier_*.yml -> recipes/<job>/tier_*.yml (receitas)
- plugins/RPGJobs/spots/<job>.yml        -> spots/<job>.yml (tipos de ponto de coleta)
- plugins/RPGApi/data/rpgjobs/stations.json -> stations.json (estações colocadas)
- plugins/Nexo/pack/assets/rpgitems/lang/pt_br.json -> rpgitems-pt_br.json (nomes)
- claude/context/spots.md e materials.md -> spots.md, materials.md (região e
  origem de cada material)
- plugins/Nexo/pack/assets/rpgitems/textures/item/*.png -> sprites/item/ (ícones
  dos materiais)
- plugins/Nexo/pack/assets/rpgjobs/textures/crafted/<gema>_<necklace|earring|ring>.png
  e <metal>_<chestplate|leggings|boots>.png -> sprites/crafted/ (os únicos itens
  fabricados com ícone plano; os outros são modelos 3D)

Os nomes e os textos de bônus são os mesmos que o jogador vê no jogo.
"""

import glob
import json
import os
import re
import shutil
import sys
import unicodedata

import yaml

CRAFTING = ["blacksmith", "armorer", "jeweler", "alchemist", "culinarian"]
GATHERING = ["miner", "woodcutter", "fisher", "gatherer"]

# Regiões do registro de spots -> áreas do mapa (data/worldMap.ts)
REGIONS = {
    "Cratera": "Cratera da Ruína",
    "Sul": "Prado Verdejante",
    "Leste": "Selva de Jade",
    "Lago": "Refúgio das Pétalas",
    "Floresta": "Bosque do Crepúsculo",
    "Neve": "Fronteira Nevada",
    "Vulcão": "Inferno Escaldante",
}

# Famílias de monstros do registro de materiais, como a wiki as chama
FAMILIES = {
    "boar": "Javalis",
    "crater_golem": "Golems",
    "slime": "Mini Slimes",
    "critter": "Bichos do campo",
    "toom": "Tooms",
    "blue_knight": "Cavaleiros azuis",
    "crimson_knight": "Cavaleiros carmesins",
    "red_knight": "Cavaleiros vermelhos",
    "striped_knight": "Cavaleiros listrados",
    "goblin": "Goblins",
    "bandit": "Bandidos",
    "ent": "Ents",
    "beetle": "Besouros-rinoceronte",
    "bear": "Ursos",
    "candle": "Monstros de vela",
    "spider": "Aranhas",
    "pirate": "Tripulantes piratas",
    "crab": "Caranguejos",
    "crustarax": "Crustarax",
    "sentinel": "Sentinelas Dourados",
    "mosquito": "Mosquitos",
    "jungle_frog": "Sapos da selva",
    "jungle_beast": "Criaturas da selva",
    "murloc": "Murlocs",
    "plant": "Plantas despertas",
    "bokoblin": "Bokoblins",
    "yokai": "Yokais",
    "bird_berserker": "Pássaros berserker",
    "oni": "Onis",
    "lizard": "Lagartos",
}

KINDS = {
    "espada": "Espada",
    "adaga": "Adaga",
    "arco": "Arco",
    "cajado": "Cajado",
    "machado": "Machado",
    "escudo": "Escudo",
}
SLOTS = {
    "helmet": "Capacete",
    "chestplate": "Peitoral",
    "leggings": "Calças",
    "boots": "Botas",
}
JEWELRY = {"necklace": "Colar", "earring": "Brinco", "ring": "Anel"}
FOCUS = {"str": "Força", "dex": "Destreza", "int": "Inteligência", "hp": "Vida"}
POTIONS = {
    "heal_small": "Poção de Vida pequena",
    "heal_medium": "Poção de Vida média",
    "heal_large": "Poção de Vida grande",
    "stamina": "Poção de Estamina",
    "mana": "Poção de Mana",
}
POOLS = {"hp": "Vida", "sta": "Estamina", "mp": "Mana"}
RESISTANCES = {"physical": "físico", "projectile": "de projétil", "magic": "mágico"}
RARITIES = ["common", "uncommon", "rare", "epic", "legendary", "mythic"]


def load_yaml(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def clean(text):
    return re.sub(r"§.", "", text).strip()


def registry_rows(path, section):
    """Linhas da tabela markdown que vem logo depois do título `## <section>`."""
    rows, inside = [], False
    with open(path, encoding="utf-8") as f:
        for line in f:
            if line.startswith("## "):
                inside = line[3:].strip() == section
                continue
            if inside and line.startswith("| `"):
                rows.append([c.strip().strip("`") for c in line.strip().strip("|").split("|")])
    return rows


def slugify(text):
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn").lower()
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def main(folder):
    def path(*parts):
        return os.path.join(folder, *parts)

    config = load_yaml(path("rpgjobs.yml"))
    lang = json.load(open(path("rpgitems-pt_br.json"), encoding="utf-8"))
    job_name = {job: config["jobs"][job]["name"] for job in CRAFTING + GATHERING}

    def item_name(item_id):
        return clean(lang.get(f"rpg.item.name.{item_id}", item_id))

    def buff(key, value):
        label = lang.get(f"rpg.item.buff.{key}")
        if label is None:
            sys.exit(f"Bônus sem texto no pt_br.json: {key}")
        return clean(label.replace("%%", "%").replace("%s", str(value), 1))

    def buffs(values):
        return [buff(k, v) for k, v in (values or {}).items()]

    # Ícones: os sprites 16x16 dos materiais e os ícones planos dos itens
    # fabricados (joias e armaduras; o resto é modelo 3D) vão para public/itens
    public = os.path.join(os.path.dirname(__file__), "..", "public", "itens")
    os.makedirs(public, exist_ok=True)

    def icon(folder_name, file_id):
        source = path("sprites", folder_name, f"{file_id}.png")
        if not os.path.exists(source):
            return None
        shutil.copyfile(source, os.path.join(public, f"{file_id}.png"))
        return f"/itens/{file_id}.png"

    # Materiais: os de coleta (dos spots) e os que caem de monstros
    spot_region = {}
    for row in registry_rows(path("spots.md"), "Spot types"):
        spot_region[row[0]] = (row[4], REGIONS[row[5]])

    materials = {}
    spots = []
    for job in GATHERING:
        for spot_id, spot in load_yaml(path("spots", f"{job}.yml")).items():
            levels, region = spot_region[spot_id]
            levels = levels.replace("-", " a ")
            entry = {"job": job, "level": spot["level"], "levels": levels, "region": region, "name": spot["name"]}
            for material_id, resource in spot["resources"].items():
                special = bool(resource.get("special"))
                materials[material_id] = {
                    "id": material_id,
                    "name": item_name(material_id),
                    "source": "coleta",
                    "job": job,
                    "spot": spot["name"],
                    "level": spot["level"],
                    "levels": levels,
                    "region": region,
                    "special": special,
                    "amount": str(resource["amount"]).replace("-", " a "),
                }
                entry["special" if special else "main"] = material_id
            spots.append(entry)
    spots.sort(key=lambda s: (s["level"], GATHERING.index(s["job"])))

    for row in registry_rows(path("materials.md"), "Mob drops"):
        material_id, levels, family = row[0], row[3], row[4]
        if family not in FAMILIES:
            sys.exit(f"Família sem nome em FAMILIES: {family}")
        materials[material_id] = {
            "id": material_id,
            "name": row[1],
            "source": "monstro",
            "family": FAMILIES[family],
            "level": int(levels.split("-")[0]),
            "levels": levels.replace("-", " a "),
        }

    for material in materials.values():
        material["slug"] = slugify(material["name"])
        material["usedBy"] = []
        material["tools"] = []
        found = icon("item", material["id"])
        if found:
            material["icon"] = found

    def material_list(values, used_by=None, tool=None):
        out = []
        for material_id, amount in values.items():
            material = materials.get(material_id)
            if material is None:
                sys.exit(f"Material sem origem: {material_id}")
            if used_by and used_by not in material["usedBy"]:
                material["usedBy"].append(used_by)
            if tool and tool not in material["tools"]:
                material["tools"].append(tool)
            out.append([material["slug"], amount])
        return out

    tools = []
    for job, entries in load_yaml(path("rpgjobs-tools.yml")).items():
        for tool in entries.values():
            tools.append(
                {
                    "job": job,
                    "name": tool["name"],
                    "level": tool["level"],
                    "money": tool.get("money", 0),
                    "materials": material_list(tool.get("materials", {}), tool=tool["name"]),
                }
            )

    # Itens fabricados, por profissão e categoria (tier_1, tier_10 ... na ordem do nível)
    categories, items, rarities_by_item = [], [], {}
    for job in CRAFTING:
        files = glob.glob(path("recipes", job, "*.yml"))
        for file in sorted(files, key=lambda f: load_yaml(f)["level"]):
            data = load_yaml(file)
            category = {"job": job, "name": data["name"], "level": data["level"]}
            if data.get("resistance"):
                category["resistance"] = RESISTANCES[data["resistance"]]
            slugs = []
            for recipe_id, r in data["recipes"].items():
                name = item_name(recipe_id)
                slug = slugify(name)
                rar = r.get("rarities", {})
                low, high = rar.get("common", {}), rar.get("mythic", {})
                kind, stat, bonus, icon_id = "", "", [], None
                per_rarity = []
                if r["type"] == "weapon":
                    kind = KINDS[r["kind"]]
                    stat = f"{low['damage']} a {high['damage']} de dano"
                    bonus = buffs(high.get("buffs"))
                    per_rarity = [[f"{v['damage']} de dano", buffs(v.get("buffs")), v["durability"]] for v in rar.values()]
                elif r["type"] == "armor":
                    kind = SLOTS[r["slot"]]
                    stat = f"{low['defense']} a {high['defense']} de defesa, +{low['hp']} Vida"
                    bonus = buffs(high.get("buffs"))
                    per_rarity = [
                        [f"{v['defense']} de defesa, +{v['hp']} Vida", buffs(v.get("buffs")), v["durability"]]
                        for v in rar.values()
                    ]
                    icon_id = recipe_id
                elif r["type"] in JEWELRY:
                    kind = JEWELRY[r["type"]]
                    if r.get("focus"):
                        kind += f" de {FOCUS[r['focus']]}"
                    bonus = buffs(high.get("buffs"))
                    per_rarity = [["", buffs(v.get("buffs")), None] for v in rar.values()]
                    icon_id = re.sub(r"_(str|dex|int)$", "", recipe_id)
                elif r["type"] == "potion":
                    kind = POTIONS[r["potion"]]
                    stat = f"Recupera {r['heal']['amount']} de {POOLS[r['heal']['pool']]}"
                elif r["type"] == "food":
                    kind = f"Prato de {FOCUS[r['focus']]}"
                    stat = f"Bônus por {high['duration'] // 60} min"
                    bonus = buffs(high.get("temp"))
                    per_rarity = [["", buffs(v.get("temp")), None] for v in rar.values()]
                else:
                    sys.exit(f"Tipo de receita desconhecido: {r['type']}")
                item = {
                    "slug": slug,
                    "name": name,
                    "job": job,
                    "type": r["type"],
                    "kind": kind,
                    "category": data["name"],
                    "level": data["level"],
                    "amount": r.get("amount", 1),
                    "materials": material_list(r["materials"], used_by=slug),
                    "stat": stat,
                    "bonus": bonus,
                }
                found = icon("crafted", icon_id) if icon_id else None
                if found:
                    item["icon"] = found
                items.append(item)
                if per_rarity:
                    rarities_by_item[slug] = per_rarity
                slugs.append(slug)
            category["items"] = slugs
            categories.append(category)

    def unique(rows, what):
        seen = set()
        for row in rows:
            if row["slug"] in seen:
                sys.exit(f"Dois {what} com o mesmo endereço: {row['slug']}")
            seen.add(row["slug"])

    unique(items, "itens")
    unique(materials.values(), "materiais")

    stations = {}
    for station in json.load(open(path("stations.json"), encoding="utf-8")).values():
        stations.setdefault(station["job"], {"x": station["x"], "z": station["z"]})

    jobs = []
    for job in CRAFTING + GATHERING:
        entry = {"id": job, "name": job_name[job]}
        if job in stations:
            entry["station"] = stations[job]
        jobs.append(entry)

    rarities = [clean(re.sub(r"&.", "", config["rarities"][r]["name"])) for r in RARITIES]
    material_rows = sorted(materials.values(), key=lambda m: (m["source"] != "coleta", m["level"], m["name"]))

    def ts(value):
        return json.dumps(value, ensure_ascii=False, separators=(", ", ": "))

    def ts_list(rows):
        return "[\n" + "".join(f"  {ts(row)},\n" for row in rows) + "]"

    header = (
        "// Gerado por scripts/gerar-profissoes.py a partir das configurações do\n"
        "// RPGJobs no servidor. Não edite à mão: rode o script de novo.\n\n"
    )
    data_dir = os.path.join(os.path.dirname(__file__), "..", "app", "data")
    with open(os.path.join(data_dir, "jobs.ts"), "w", encoding="utf-8", newline="\n") as f:
        f.write(
            header
            + "export type JobId =\n"
            + "\n".join(f'  | "{j}"' for j in CRAFTING + GATHERING)
            + ";\n\n"
            "export type Job = { id: JobId; name: string; station?: { x: number; z: number } };\n\n"
            "// [endereço do material, quantidade]\n"
            "export type MaterialAmount = [string, number];\n\n"
            "export type JobMaterial = {\n"
            "  id: string;\n"
            "  slug: string;\n"
            "  name: string;\n"
            "  icon?: string;\n"
            '  source: "coleta" | "monstro";\n'
            "  // coleta: o ponto que dá o material; monstro: a família que derruba\n"
            "  job?: JobId;\n"
            "  spot?: string;\n"
            "  region?: string;\n"
            "  special?: boolean;\n"
            "  amount?: string;\n"
            "  family?: string;\n"
            "  level: number;\n"
            "  levels: string;\n"
            "  // itens que usam o material e ferramentas que pedem ele\n"
            "  usedBy: string[];\n"
            "  tools: string[];\n"
            "};\n\n"
            "export type JobItem = {\n"
            "  slug: string;\n"
            "  name: string;\n"
            "  job: JobId;\n"
            '  type: "weapon" | "armor" | "necklace" | "earring" | "ring" | "potion" | "food";\n'
            "  kind: string;\n"
            "  category: string;\n"
            "  level: number;\n"
            "  // itens feitos de uma vez\n"
            "  amount: number;\n"
            "  materials: MaterialAmount[];\n"
            "  stat: string;\n"
            "  // bônus da raridade Mítica, a mais alta\n"
            "  bonus: string[];\n"
            "  icon?: string;\n"
            "};\n\n"
            "export type RecipeCategory = {\n"
            "  job: JobId;\n"
            "  name: string;\n"
            "  level: number;\n"
            "  resistance?: string;\n"
            "  items: string[];\n"
            "};\n\n"
            "export type Spot = {\n"
            "  job: JobId;\n"
            "  level: number;\n"
            "  levels: string;\n"
            "  region: string;\n"
            "  name: string;\n"
            "  main: string;\n"
            "  special: string;\n"
            "};\n\n"
            "export type Tool = { job: JobId; name: string; level: number; money: number; materials: MaterialAmount[] };\n\n"
            f"export const JOB_MAX_LEVEL = {config['levels']['max']};\n"
            f"export const CRAFT_BATCH = {config['craft']['batch']};\n"
            f"export const SPECIAL_CHANCE = {config['gathering']['special-chance']};\n"
            f"export const TOOL_BONUS = {ts(config['gathering']['tool-bonus'])};\n"
            f"export const RARITIES = {ts(rarities)};\n\n"
            f"export const JOBS: Job[] = {ts_list(jobs)};\n\n"
            f"export const RECIPE_CATEGORIES: RecipeCategory[] = {ts_list(categories)};\n\n"
            f"export const JOB_ITEMS: JobItem[] = {ts_list(items)};\n\n"
            f"export const JOB_MATERIALS: JobMaterial[] = {ts_list(material_rows)};\n\n"
            f"export const SPOTS: Spot[] = {ts_list(spots)};\n\n"
            f"export const TOOLS: Tool[] = {ts_list(tools)};\n"
        )

    # Os valores de cada raridade só aparecem na página do item: ficam num
    # arquivo à parte para não pesar nas outras páginas da wiki
    with open(os.path.join(data_dir, "jobRarities.ts"), "w", encoding="utf-8", newline="\n") as f:
        f.write(
            header
            + "// Por item, uma linha por raridade (Comum a Mítico): [valor, bônus, durabilidade]\n"
            "export type RarityRow = [string, string[], number | null];\n\n"
            "export const ITEM_RARITIES: Record<string, RarityRow[]> = {\n"
            + "".join(f"  {ts(slug)}: {ts(rows)},\n" for slug, rows in rarities_by_item.items())
            + "};\n"
        )

    icons = sum(1 for m in materials.values() if "icon" in m) + sum(1 for i in items if "icon" in i)
    print(
        f"{len(items)} itens em {len(categories)} categorias, {len(materials)} materiais, "
        f"{len(spots)} tipos de spot, {len(tools)} ferramentas, {icons} ícones"
    )


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
