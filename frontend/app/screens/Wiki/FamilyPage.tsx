import { BOSS_DETAILS } from "~/data/bossDetails";
import { JOB_MATERIALS } from "~/data/jobs";
import { formatNumber, healthAt, ROLE_HEALTH } from "~/data/mobStats";
import { BOSSES, familyPicture, type MobFamily } from "~/data/world";
import { Table, WikiLink } from "./components";
import EntityPage, { EntitySection, type InfoRow } from "./EntityPage";
import { BossLink, MaterialLink } from "./entities";

export default function FamilyPage({ family }: { family: MobFamily }) {
  const [min, max] = family.levels;
  const materials = JOB_MATERIALS.filter((m) => m.family && family.drops.includes(m.family));
  const bosses = BOSSES.filter((boss) => BOSS_DETAILS[boss.name]?.family === family.name);
  const levels = min === max ? [min] : [min, max];

  const info: InfoRow[] = [
    ["Tipo", "Família de monstros"],
    ["Níveis", `${min} a ${max}`],
    ["Papéis", family.roles.length > 1 ? "Comuns e elites" : family.roles[0] === "Elite" ? "Só elites" : "Só comuns"],
    ["Materiais", materials.length || "Nenhum"],
  ];
  if (bosses.length) info.push(["Chefes", bosses.length]);

  return (
    <EntityPage
      trail={[{ to: "/wiki/monstros", label: "Monstros" }]}
      title={family.name}
      subtitle={`Família de monstros · níveis ${min} a ${max}`}
      picture={familyPicture(family.name)}
      info={info}
    >
      <EntitySection id="monstros" title="Monstros">
        <p>{family.mobs}.</p>
        <p>
          Os elites têm cerca de 3 vezes a vida e 2,5 vezes o dano de um comum.
          Veja os tipos e a cor do nível em{" "}
          <WikiLink to="monstros#tipos">Monstros</WikiLink>.
        </p>
      </EntitySection>

      <EntitySection id="onde" title="Onde aparecem">
        <p>
          {family.where}. Os lugares com monstros estão marcados no{" "}
          <WikiLink to="/mapa">mapa</WikiLink>.
        </p>
      </EntitySection>

      <EntitySection id="vida" title="Vida">
        <p>A vida de cada um no menor e no maior nível em que a família aparece:</p>
        <Table
          head={["Nível", ...family.roles]}
          rows={levels.map((level) => [
            level,
            ...family.roles.map((role) => formatNumber(healthAt(ROLE_HEALTH[role], level))),
          ])}
        />
      </EntitySection>

      <EntitySection id="materiais" title="Materiais">
        {materials.length === 0 ? (
          <p>Esta família ainda não derruba materiais.</p>
        ) : (
          <>
            <p>
              Comuns e elites derrubam um material por faixa de nível, usado
              nas receitas das <WikiLink to="profissoes">profissões</WikiLink>:
            </p>
            <Table
              head={["Material", "Níveis", "Receitas"]}
              rows={materials.map((m) => [
                <MaterialLink slug={m.slug} />,
                m.levels,
                m.usedBy.length || "Nenhuma ainda",
              ])}
            />
          </>
        )}
      </EntitySection>

      {bosses.length > 0 && (
        <EntitySection id="chefes" title="Chefes por perto">
          <Table
            head={["Chefe", "Tipo", "Nível"]}
            rows={bosses.map((boss) => [<BossLink name={boss.name} />, boss.role, boss.levels])}
          />
        </EntitySection>
      )}

      <EntitySection id="veja-tambem" title="Veja também">
        <ul>
          <li>
            <WikiLink to="monstros#familias">Todas as famílias</WikiLink>
          </li>
          <li>
            <WikiLink to="materiais#monstros">Materiais de monstros</WikiLink>
          </li>
          <li>
            <WikiLink to="chefes">Chefes</WikiLink>
          </li>
        </ul>
      </EntitySection>
    </EntityPage>
  );
}
