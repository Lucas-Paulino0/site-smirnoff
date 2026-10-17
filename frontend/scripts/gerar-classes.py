"""Gera app/data/classDetails.ts a partir das configurações do servidor Hail.

Baixe estes arquivos do servidor (SFTP, ver hail-admin-kit) para uma pasta e rode:

    python scripts/gerar-classes.py <pasta>

- plugins/RPGClasses/config.yml        -> rpgclasses.yml (habilidades e textos da árvore)
- plugins/RPGCore/config.yml           -> rpgcore.yml (nível de desbloqueio e bônus de atributos)
- plugins/RPGItems/weapon-types.yml    -> weapon-types.yml (arma de cada classe)
- claude/assets/rpg-menus/gerador/classes_info.yml -> classes_info.yml (descrição de cada classe)

Os textos são os mesmos que o jogador vê na árvore de habilidades do jogo.
"""

import json
import os
import re
import sys

import yaml

STAT_NAMES = {
    "hp": "Vida",
    "str": "Força",
    "dex": "Destreza",
    "int": "Inteligência",
    "def": "Defesa",
    "sta": "Estamina",
    "mp": "Mana",
    "agi": "Agilidade",
}
DAMAGE_NAMES = {"physical": "físico", "projectile": "de projétil", "magic": "mágico"}
RESOURCE_NAMES = {"stamina": "estamina", "mana": "mana"}
# Linhas &8 da árvore que o site mostra de outro jeito (custo, recarga, requisitos)
META = re.compile(r"^(Custo|Requer|Recarga|e 12 pontos gastos)\b")


def plain(text):
    return re.sub(r"&.", "", text).strip()


def number(value):
    text = f"{value:g}"
    return text.replace(".", ",")


def parse_lore(lore, cooldown=None, cost=None):
    kind, _, title = plain(lore[0]).partition(" · ")
    text, details, notes = [], [], []
    for line in lore[1:]:
        if cooldown is not None:
            line = line.replace("{cooldown}", number(cooldown))
        if cost is not None:
            line = line.replace("{cost}", number(cost))
        color = line[:2]
        value = plain(line)
        if not value:
            continue
        if color == "&7":
            text.append(value)
        elif color == "&f":
            details.append(value)
        elif color == "&8" and META.match(value):
            continue
        else:
            notes.append(value)
    node = {"text": " ".join(text), "details": details}
    if notes:
        node["notes"] = notes
    return kind, title, node


def class_skills(cfg):
    nodes = cfg["tree"]["nodes"]
    skills = cfg.get("skills", {})
    passives = cfg.get("passives", {})
    base = cfg["base-skill"]
    names = {base["id"]: plain(base["name"])}
    names.update({k: plain(v["name"]) for k, v in skills.items()})
    names.update({k: plain(v["name"]) for k, v in passives.items()})

    def bar_ancestor(node_id):
        while node_id not in skills:
            requires = nodes[node_id].get("requires") or []
            if not requires:
                return None
            node_id = requires[0]
        return node_id

    result = {
        "base": None,
        "corePassives": [],
        "bar": [],
        "passives": [],
        "paths": [],
    }
    bar = {}
    upgrades = {}
    total = 0
    requires_spent = 0

    for node_id, node in nodes.items():
        requires = node.get("requires") or []
        if node_id == base["id"]:
            _, _, parsed = parse_lore(node["lore"], cooldown=base.get("cooldown"))
            result["base"] = {"name": names[node_id], **parsed}
            continue
        if node_id in skills:
            skill = skills[node_id]
            cost = skill.get("cost", {})
            _, _, parsed = parse_lore(
                node["lore"], cooldown=skill.get("cooldown"), cost=cost.get("amount")
            )
            entry = {
                "name": names[node_id],
                "slot": skill["slot"],
                "cooldown": skill.get("cooldown"),
                "cost": {
                    "resource": RESOURCE_NAMES.get(cost.get("type"), cost.get("type")),
                    "amount": cost.get("amount", 0),
                },
                "points": skill.get("points", 1),
                **parsed,
                "upgrades": [],
            }
            if skill.get("target-block"):
                entry["aimRange"] = skill["target-block"]
            bar[node_id] = entry
            total += entry["points"]
            continue

        points = passives.get(node_id, {}).get("points", 0)
        total += points
        kind, _, parsed = parse_lore(node["lore"])
        entry = {"name": names.get(node_id, node.get("short", node_id)), "points": points, **parsed}

        if kind == "Aprimoramento":
            upgrades.setdefault(bar_ancestor(node_id), []).append(entry)
        elif kind == "Suprema":
            requires_spent = max(requires_spent, node.get("requires-spent", 0))
            result["paths"].append(entry)
        elif base["id"] in requires:
            result["corePassives"].append(entry)
        else:
            parent = bar_ancestor(node_id)
            if parent:
                entry["parent"] = names[parent]
            result["passives"].append(entry)

    for skill_id, entry in bar.items():
        entry["upgrades"] = sorted(upgrades.get(skill_id, []), key=lambda u: u["points"])
    result["bar"] = sorted(bar.values(), key=lambda s: s["slot"])
    result["totalCost"] = total
    result["requiresSpent"] = requires_spent
    return result


def main(folder):
    load = lambda name: yaml.safe_load(open(os.path.join(folder, name), encoding="utf-8"))
    rpgclasses = load("rpgclasses.yml")["classes"]
    rpgcore = load("rpgcore.yml")["classes"]
    weapons = load("weapon-types.yml")
    info = load("classes_info.yml")

    details = {}
    for class_id, core in rpgcore.items():
        cfg = rpgclasses.get(class_id)
        weapon = next(
            (w for w in weapons.values() if not w.get("offhand") and class_id in w["classes"]),
            None,
        )
        offhand = next(
            (w["name"] for w in weapons.values() if w.get("offhand") and class_id in w["classes"]),
            None,
        )
        stats = sorted(
            ((s, v) for s, v in core["stats"].items() if v),
            key=lambda item: -item[1],
        )
        resources = {
            s["cost"]["type"] for s in (cfg or {}).get("skills", {}).values() if s.get("cost")
        }
        entry = {
            "level": core["level"],
            "description": info.get(class_id, ""),
            "stats": [{"name": STAT_NAMES[s], "value": v} for s, v in stats],
            "skills": class_skills(cfg) if cfg and cfg.get("tree") else None,
        }
        if weapon:
            entry["weapon"] = {
                "name": weapon["name"],
                "damage": DAMAGE_NAMES[weapon["damage"]],
                "twoItems": bool(cfg and cfg.get("two-items")),
            }
            if offhand:
                entry["weapon"]["offhand"] = offhand
        if resources:
            entry["resource"] = RESOURCE_NAMES[resources.pop()]
        details[class_id] = entry

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app", "data", "classDetails.ts")
    body = json.dumps(details, ensure_ascii=False, indent=2)
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(
            "// Gerado por scripts/gerar-classes.py a partir das configurações do servidor\n"
            "// (RPGClasses, RPGCore, RPGItems e classes_info.yml). Não edite à mão: rode o\n"
            "// script de novo quando as classes mudarem no jogo.\n\n"
            'import type { ClassDetails } from "./classes";\n\n'
            f"export const CLASS_DETAILS: Record<string, ClassDetails> = {body};\n"
        )
    with_skills = sum(1 for d in details.values() if d["skills"])
    print(f"{len(details)} classes, {with_skills} com habilidades -> {os.path.normpath(out)}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
