// Vida dos monstros pelo nível, com as regras de balanceamento do servidor
// (plugins/MythicMobs/config/config-mobs.yml, ScalingEquations, e
// HailTools/skills/hail_tools_skills.yml; leitura de 2026-10-22).

// Vida no nível 1 de cada papel (mobs.md, "level-1")
export const ROLE_HEALTH = {
  Comum: 659,
  Elite: 2058,
  "Mini-chefe": 9878,
  Chefe: 37042,
} as const;

// Quantas vezes a recompensa de um comum do mesmo nível (RPGCore, rewards.roles)
export const ROLE_REWARD = { Comum: 1, Elite: 4, "Mini-chefe": 20, Chefe: 80 } as const;

const step = (level: number, at: number) => (level >= at ? 1 : 0);

// ScalingEquations.Health dividido pelo valor base
export function healthScale(level: number) {
  const x = 2.55 * (level - 1) + 13 + 4 * step(level, 50) + 4 * step(level, 100);
  return (10 + 1.5 * x ** 1.5) / 80.3082;
}

export const healthAt = (base: number, level: number) => Math.round(base * healthScale(level));

// Hail_PlayerScaling: +75% de vida por jogador a mais a até 32 blocos
export const GROUP_HEALTH_BONUS = 0.75;

// Hail_Enrage_*: segundos de luta até a fúria, para n jogadores
export function furySeconds(role: "Chefe" | "Mini-chefe", players: number) {
  const base = role === "Chefe" ? 562.5 : 150;
  return (base * (0.25 + 0.75 * players)) / players;
}

export const formatNumber = (n: number) => n.toLocaleString("pt-BR");
