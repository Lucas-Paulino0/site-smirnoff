import { BOSS_DETAILS } from "~/data/bossDetails";
import {
  formatNumber,
  furySeconds,
  GROUP_HEALTH_BONUS,
  healthAt,
  ROLE_REWARD,
} from "~/data/mobStats";
import { bossPicture, type Boss } from "~/data/world";
import { MAP_BOSSES, mapLink } from "~/data/worldMap";
import { Table, WikiLink } from "./components";
import EntityPage, { EntitySection, type InfoRow } from "./EntityPage";
import { FamilyLink } from "./entities";

const minutes = (seconds: number) => {
  const m = Math.round(seconds / 30) / 2;
  return `${m.toLocaleString("pt-BR")} ${m === 1 ? "minuto" : "minutos"}`;
};

export default function BossPage({ boss }: { boss: Boss }) {
  const details = BOSS_DETAILS[boss.name];
  const names = boss.mapNames ?? [boss.name];
  const spots = MAP_BOSSES.filter((b) => names.includes(b.name)).sort((a, b) => a.level - b.level);
  const single = spots.length === 1;
  // "nível 70", "níveis 16, 25 e 33", ou só "Quartzo 25, Diamante 200..."
  const levelText = /[a-z]/i.test(boss.levels)
    ? boss.levels
    : `${single ? "nível" : "níveis"} ${boss.levels}`;

  const info: InfoRow[] = [
    ["Tipo", boss.role],
    [single ? "Nível" : "Níveis", boss.levels],
    ["Onde", boss.where],
  ];
  if (single) {
    info.push(["Mapa", <WikiLink to={mapLink(spots[0].x, spots[0].z)}>Ver no mapa</WikiLink>]);
    info.push(["Vida", formatNumber(healthAt(details.health, spots[0].level))]);
  }
  if (details.resists) info.push(["Resistência", details.resists]);
  info.push(["Volta em", `${boss.respawn} minutos`]);
  if (details.family) info.push(["Família", <FamilyLink name={details.family} />]);

  return (
    <EntityPage
      trail={[{ to: "/wiki/chefes", label: "Chefes" }]}
      title={boss.name}
      subtitle={`${boss.role} · ${levelText}`}
      picture={bossPicture(boss.name)}
      info={info}
    >
      <p className="wiki-entity__lead">{boss.description}</p>

      <EntitySection id="onde" title="Onde fica">
        <p>
          {boss.where}.{" "}
          {spots.length > 1 && "Há um em cada lugar da lista abaixo, cada um com o seu nível."}
        </p>
        {spots.length > 1 ? (
          <Table
            head={[names.length > 1 ? "Golem" : "Nível", "Mapa"]}
            rows={spots.map((spot) => [
              names.length > 1 ? `${spot.name}, nível ${spot.level}` : `Nível ${spot.level}`,
              <WikiLink to={mapLink(spot.x, spot.z)}>Ver no mapa</WikiLink>,
            ])}
          />
        ) : (
          single && (
            <p>
              <WikiLink to={mapLink(spots[0].x, spots[0].z)}>Ver no mapa</WikiLink>
            </p>
          )
        )}
      </EntitySection>

      <EntitySection id="comportamento" title="A luta">
        <p>
          <strong>Antes da luta:</strong> {details.waits}
        </p>
        {details.resets && (
          <p>
            <strong>Sem ninguém por perto:</strong> {details.resets}
          </p>
        )}
        <Table
          head={["Ataque", "O que faz"]}
          rows={details.attacks.map(([name, text]) => [<strong>{name}</strong>, text])}
        />
        <p>
          Quando o chão é marcado, saia da marca antes do golpe cair. Quem foge
          para longe por alguns segundos leva um salto do chefe. As regras
          gerais estão em <WikiLink to="combate-e-descanso#monstros">Combate e descanso</WikiLink>.
        </p>
      </EntitySection>

      {details.phases && (
        <EntitySection id="fases" title="Fases">
          <ul>
            {details.phases.map((phase) => (
              <li key={phase}>{phase}</li>
            ))}
          </ul>
        </EntitySection>
      )}

      {details.helpers && (
        <EntitySection id="ajudantes" title="Ajudantes">
          <p>{details.helpers}</p>
        </EntitySection>
      )}

      <EntitySection id="vida" title="Vida e fúria">
        <p>
          A vida sobe {GROUP_HEALTH_BONUS * 100}% para cada jogador a mais a até
          32 blocos do chefe:
        </p>
        <Table
          head={["Nível", "Sozinho", "2 jogadores", "3 jogadores", "4 jogadores"]}
          rows={spots.map((spot) => {
            const hp = healthAt(details.health, spot.level);
            return [
              names.length > 1 ? `${spot.name.replace(/^Golem de /, "")}, ${spot.level}` : spot.level,
              ...[1, 2, 3, 4].map((n) => formatNumber(Math.round(hp * (1 + GROUP_HEALTH_BONUS * (n - 1))))),
            ];
          })}
        />
        <p>
          Depois de cerca de {minutes(furySeconds(boss.role, 1))} de luta
          sozinho ({minutes(furySeconds(boss.role, 4))} numa party de 4), o
          chefe entra em <strong>fúria</strong>: o dano sobe 25% a cada 30
          segundos a mais. A contagem zera se ninguém ficar a até 32 blocos do
          chefe por 10 segundos.
        </p>
      </EntitySection>

      <EntitySection id="recompensa" title="Recompensa">
        <p>
          Dá o XP e as Moedas de {ROLE_REWARD[boss.role]} monstros comuns do
          mesmo nível, repartidos pelo dano que cada um causou (veja{" "}
          <WikiLink to="party-e-pvp">Party e PvP</WikiLink>). Os itens especiais
          dos chefes ainda estão a caminho.
        </p>
      </EntitySection>

      <EntitySection id="veja-tambem" title="Veja também">
        <ul>
          <li>
            <WikiLink to="chefes">Todos os chefes</WikiLink>
          </li>
          {details.family && (
            <li>
              <FamilyLink name={details.family} />: os monstros que vivem por perto
            </li>
          )}
          <li>
            <WikiLink to="combate-e-descanso">Combate e descanso</WikiLink>: arena, golpes marcados e fúria
          </li>
        </ul>
      </EntitySection>
    </EntityPage>
  );
}
