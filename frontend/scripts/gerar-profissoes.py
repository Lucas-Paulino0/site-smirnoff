"""Gera app/data/jobs.ts (profissões) a partir das configurações do servidor Hail.

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

Os nomes e os textos de bônus são os mesmos que o jogador vê no jogo.
"""

import glob
import json
import os
import re
import sys

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


def main(folder):
    def path(*parts):
        return os.path.join(folder, *parts)

    config = load_yaml(path("rpgjobs.yml"))
    lang = json.load(open(path("rpgitems-pt_br.json"), encoding="utf-8"))

    def item_name(item_id):
        return clean(lang.get(f"rpg.item.name.{item_id}", item_id))

    def buff(key, value):
        label = lang.get(f"rpg.item.buff.{key}")
        if label is None:
            sys.exit(f"Bônus sem texto no pt_br.json: {key}")
        return clean(label.replace("%%", "%").replace("%s", str(value), 1))

    def buffs(values):
        return [buff(k, v) for k, v in (values or {}).items()]

    # Região de cada spot e origem de cada material
    spot_region = {}
    for row in registry_rows(path("spots.md"), "Spot types"):
        spot_region[row[0]] = (row[4], REGIONS[row[5]])
    drops = {}
    for row in registry_rows(path("materials.md"), "Mob drops"):
        levels, family = row[3], row[4]
        if family not in FAMILIES:
            sys.exit(f"Família sem nome em FAMILIES: {family}")
        drops[row[0]] = f"{FAMILIES[family]}, níveis {levels.replace('-', ' a ')}"

    # Pontos de coleta, um tipo por profissão e faixa de nível
    spots, gathered = [], {}
    for job in GATHERING:
        for spot_id, spot in load_yaml(path("spots", f"{job}.yml")).items():
            main_id = next(k for k, r in spot["resources"].items() if not r.get("special"))
            special_id = next(k for k, r in spot["resources"].items() if r.get("special"))
            levels, region = spot_region[spot_id]
            for material in (main_id, special_id):
                gathered[material] = f"{spot['name']} ({config['jobs'][job]['name']})"
            spots.append(
                {
                    "job": job,
                    "level": spot["level"],
                    "levels": levels.replace("-", " a "),
                    "region": region,
                    "name": spot["name"],
                    "main": item_name(main_id),
                    "special": item_name(special_id),
                }
            )
    spots.sort(key=lambda s: (s["level"], GATHERING.index(s["job"])))

    def materials(values):
        out = []
        for material, amount in values.items():
            source = gathered.get(material) or drops.get(material)
            if source is None:
                sys.exit(f"Material sem origem: {material}")
            out.append([item_name(material), amount, source])
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
                    "materials": materials(tool.get("materials", {})),
                }
            )

    # Receitas, por profissão e categoria (tier_1, tier_10 ... na ordem do nível)
    categories = []
    for job in CRAFTING:
        files = glob.glob(path("recipes", job, "*.yml"))
        for file in sorted(files, key=lambda f: load_yaml(f)["level"]):
            data = load_yaml(file)
            recipes = []
            for recipe_id, r in data["recipes"].items():
                rar = r.get("rarities", {})
                low, high = rar.get("common", {}), rar.get("mythic", {})
                kind, stat, bonus = "", "", []
                if r["type"] == "weapon":
                    kind = KINDS[r["kind"]]
                    stat = f"{low['damage']} a {high['damage']} de dano"
                    bonus = buffs(high.get("buffs"))
                elif r["type"] == "armor":
                    kind = SLOTS[r["slot"]]
                    stat = f"{low['defense']} a {high['defense']} de defesa, +{low['hp']} Vida"
                    bonus = buffs(high.get("buffs"))
                elif r["type"] in JEWELRY:
                    kind = JEWELRY[r["type"]]
                    if r.get("focus"):
                        kind += f" de {FOCUS[r['focus']]}"
                    bonus = buffs(high.get("buffs"))
                elif r["type"] == "potion":
                    kind = POTIONS[r["potion"]]
                    stat = f"Recupera {r['heal']['amount']} de {POOLS[r['heal']['pool']]}"
                elif r["type"] == "food":
                    kind = f"Prato de {FOCUS[r['focus']]}"
                    minutes = high["duration"] // 60
                    stat = f"Bônus por {minutes} min"
                    bonus = buffs(high.get("temp"))
                else:
                    sys.exit(f"Tipo de receita desconhecido: {r['type']}")
                recipes.append(
                    {
                        "name": item_name(recipe_id),
                        "kind": kind,
                        "amount": r.get("amount", 1),
                        "materials": materials(r["materials"]),
                        "stat": stat,
                        "bonus": bonus,
                    }
                )
            category = {
                "job": job,
                "name": data["name"],
                "level": data["level"],
                "recipes": recipes,
            }
            if data.get("resistance"):
                category["resistance"] = RESISTANCES[data["resistance"]]
            categories.append(category)

    stations = {}
    for station in json.load(open(path("stations.json"), encoding="utf-8")).values():
        stations.setdefault(station["job"], {"x": station["x"], "z": station["z"]})

    jobs = []
    for job in CRAFTING + GATHERING:
        entry = {"id": job, "name": config["jobs"][job]["name"]}
        if job in stations:
            entry["station"] = stations[job]
        jobs.append(entry)

    rarities = [clean(re.sub(r"&.", "", config["rarities"][r]["name"])) for r in RARITIES]

    def ts(value):
        return json.dumps(value, ensure_ascii=False, separators=(", ", ": "))

    def ts_list(items):
        return "[\n" + "".join(f"  {ts(i)},\n" for i in items) + "]"

    def ts_categories(items):
        out = "[\n"
        for c in items:
            head = {k: v for k, v in c.items() if k != "recipes"}
            out += "  {\n" + "".join(f"    {k}: {ts(v)},\n" for k, v in head.items())
            out += "    recipes: [\n" + "".join(f"      {ts(r)},\n" for r in c["recipes"])
            out += "    ],\n  },\n"
        return out + "]"

    out = os.path.join(os.path.dirname(__file__), "..", "app", "data", "jobs.ts")
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(
            "// Gerado por scripts/gerar-profissoes.py a partir das configurações do\n"
            "// RPGJobs no servidor. Não edite à mão: rode o script de novo.\n\n"
            "export type JobId =\n"
            + "\n".join(f'  | "{j}"' for j in CRAFTING + GATHERING)
            + ";\n\n"
            "// [nome, quantidade, de onde vem]\n"
            "export type Material = [string, number, string];\n\n"
            "export type Job = { id: JobId; name: string; station?: { x: number; z: number } };\n\n"
            "export type Recipe = {\n"
            "  name: string;\n"
            "  kind: string;\n"
            "  // itens feitos de uma vez\n"
            "  amount: number;\n"
            "  materials: Material[];\n"
            "  stat: string;\n"
            "  // bônus da raridade Mítica, a mais alta\n"
            "  bonus: string[];\n"
            "};\n\n"
            "export type RecipeCategory = {\n"
            "  job: JobId;\n"
            "  name: string;\n"
            "  level: number;\n"
            "  resistance?: string;\n"
            "  recipes: Recipe[];\n"
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
            "export type Tool = { job: JobId; name: string; level: number; money: number; materials: Material[] };\n\n"
            f"export const JOB_MAX_LEVEL = {config['levels']['max']};\n"
            f"export const CRAFT_BATCH = {config['craft']['batch']};\n"
            f"export const SPECIAL_CHANCE = {config['gathering']['special-chance']};\n"
            f"export const TOOL_BONUS = {ts(config['gathering']['tool-bonus'])};\n"
            f"export const RARITIES = {ts(rarities)};\n\n"
            f"export const JOBS: Job[] = {ts_list(jobs)};\n\n"
            f"export const RECIPE_CATEGORIES: RecipeCategory[] = {ts_categories(categories)};\n\n"
            f"export const SPOTS: Spot[] = {ts_list(spots)};\n\n"
            f"export const TOOLS: Tool[] = {ts_list(tools)};\n"
        )
    total = sum(len(c["recipes"]) for c in categories)
    print(f"{out}: {total} receitas em {len(categories)} categorias, {len(spots)} tipos de spot, {len(tools)} ferramentas")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
