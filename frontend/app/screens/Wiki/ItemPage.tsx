import { ITEM_RARITIES } from "~/data/jobRarities";
import { JOBS, RARITIES, RECIPE_CATEGORIES, type JobItem } from "~/data/jobs";
import { mapLink } from "~/data/worldMap";
import { Table, WikiLink } from "./components";
import EntityPage, { EntitySection, type InfoRow } from "./EntityPage";
import { ItemLink, MATERIAL_BY_SLUG, MaterialLink, materialSource } from "./entities";

const anchor = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export default function ItemPage({ item }: { item: JobItem }) {
  const job = JOBS.find((j) => j.id === item.job)!;
  const category = RECIPE_CATEGORIES.find((c) => c.job === item.job && c.name === item.category)!;
  const rarities = ITEM_RARITIES[item.slug];
  const others = category.items.filter((slug) => slug !== item.slug);

  const info: InfoRow[] = [
    ["Tipo", item.kind],
    ["Profissão", <WikiLink to="profissoes#estacoes">{job.name}</WikiLink>],
    ["Nível", `${item.level} de ${job.name}`],
    ["Categoria", category.name],
  ];
  if (item.amount > 1) info.push(["Por fabricação", `${item.amount} unidades`]);
  if (category.resistance) info.push(["Resiste a", `Dano ${category.resistance}`]);
  info.push(["Raridade", rarities ? `${RARITIES[0]} a ${RARITIES.at(-1)}` : "Não tem"]);

  return (
    <EntityPage
      trail={[
        { to: "/wiki/receitas", label: "Receitas" },
        { to: `/wiki/receitas#${anchor(job.name)}`, label: job.name },
      ]}
      title={item.name}
      subtitle={`${item.kind} · nível ${item.level}`}
      icon={item.icon}
      info={info}
    >
      <EntitySection id="fabricar" title="Como fabricar">
        <p>
          Na estação do {job.name}, no Refúgio das Pétalas
          {job.station && (
            <>
              {" "}
              (<WikiLink to={mapLink(job.station.x, job.station.z)}>ver no mapa</WikiLink>)
            </>
          )}
          , categoria <strong>{category.name}</strong>. Pede {job.name} nível {item.level}
          {item.amount > 1 && ` e faz ${item.amount} de uma vez`}.
        </p>
        <Table
          head={["Material", "Quantidade", "De onde vem"]}
          rows={item.materials.map(([slug, amount]) => [
            <MaterialLink slug={slug} />,
            amount,
            materialSource(MATERIAL_BY_SLUG[slug]),
          ])}
        />
      </EntitySection>

      {rarities ? (
        <EntitySection id="raridades" title="Raridades">
          <p>
            A raridade é sorteada na hora de fabricar. Quanto mais o seu nível
            de {job.name} passa o nível {item.level}, maior a chance das
            raridades altas (veja <WikiLink to="profissoes#raridade">Raridade</WikiLink>).
          </p>
          <Table
            head={[
              "Raridade",
              ...(rarities[0][0] ? ["Valor"] : []),
              item.type === "food" ? "Bônus por 30 min" : "Bônus",
              ...(rarities[0][2] ? ["Durabilidade"] : []),
            ]}
            rows={rarities.map(([value, bonus, durability], i) => [
              <span className={`rarity rarity--${i}`}>{RARITIES[i]}</span>,
              ...(value ? [value] : []),
              bonus.length ? bonus.join(", ") : "Nenhum",
              ...(durability ? [durability.toLocaleString("pt-BR")] : []),
            ])}
          />
        </EntitySection>
      ) : (
        <EntitySection id="efeito" title="Efeito">
          <p>
            {item.stat}. As poções não têm raridade: saem num passo de 0 a 5, e
            quanto maior o passo, mais a poção cura. O passo sobe junto com o
            seu nível de Alquimista.
          </p>
        </EntitySection>
      )}

      {others.length > 0 && (
        <EntitySection id="mesma-categoria" title={`Outros itens de ${category.name}`}>
          <ul className="wiki-columns">
            {others.map((slug) => (
              <li key={slug}>
                <ItemLink slug={slug} />
              </li>
            ))}
          </ul>
        </EntitySection>
      )}

      <EntitySection id="veja-tambem" title="Veja também">
        <ul>
          <li>
            <WikiLink to={`receitas#${anchor(job.name)}`}>Todas as receitas do {job.name}</WikiLink>
          </li>
          <li>
            <WikiLink to="profissoes">Profissões</WikiLink>: estações, raridade e reparo
          </li>
          <li>
            <WikiLink to="itens-e-equipamentos">Itens e equipamentos</WikiLink>: como equipar
          </li>
        </ul>
      </EntitySection>
    </EntityPage>
  );
}
