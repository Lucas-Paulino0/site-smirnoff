import { TOOLS, type JobMaterial } from "~/data/jobs";
import { Region } from "~/data/wikiJobs";
import { Table, WikiLink } from "./components";
import EntityPage, { EntitySection, type InfoRow } from "./EntityPage";
import { DropFamilyLink, ITEM_BY_SLUG, ItemLink, jobName, materialSource } from "./entities";

export default function MaterialPage({ material }: { material: JobMaterial }) {
  const gathered = material.source === "coleta";
  const job = gathered ? jobName(material.job!) : "";
  const items = material.usedBy.map((slug) => ITEM_BY_SLUG[slug]);
  const tools = TOOLS.filter((tool) => material.tools.includes(tool.name));

  const info: InfoRow[] = gathered
    ? [
        ["Tipo", material.special ? "Achado raro" : "Material de coleta"],
        ["Profissão", <WikiLink to="profissoes#coleta">{job}</WikiLink>],
        ["Ponto", <WikiLink to={`onde-coletar#${job.toLowerCase()}`}>{material.spot}</WikiLink>],
        ["Nível", `${material.level} de ${job}`],
        ["Região", <Region name={material.region!} />],
        ["Por coleta", material.special ? "1, às vezes" : material.amount!],
      ]
    : [
        ["Tipo", "Material de monstro"],
        ["Quem derruba", <DropFamilyLink drop={material.family!} />],
        ["Níveis", material.levels],
      ];
  info.push(["Usado em", items.length + tools.length ? `${items.length + tools.length}` : "Nada ainda"]);

  return (
    <EntityPage
      trail={[{ to: "/wiki/materiais", label: "Materiais" }]}
      title={material.name}
      subtitle={gathered ? `Material de ${job} · nível ${material.level}` : `Material de monstro · níveis ${material.levels}`}
      icon={material.icon}
      info={info}
    >
      <EntitySection id="de-onde-vem" title="De onde vem">
        {gathered ? (
          <p>
            {material.special ? (
              <>
                É o achado raro do ponto <strong>{material.spot}</strong>: cada
                coleta tem uma chance pequena de trazer um, maior com uma
                ferramenta acima do nível do ponto.
              </>
            ) : (
              <>
                É o material principal do ponto <strong>{material.spot}</strong>:
                cada coleta traz {material.amount}.
              </>
            )}{" "}
            O ponto pede {job} nível {material.level} e fica na região{" "}
            {material.region}. Veja os outros pontos em{" "}
            <WikiLink to={`onde-coletar#${job.toLowerCase()}`}>Onde coletar</WikiLink>.
          </p>
        ) : (
          <p>
            {materialSource(material)}. Só os monstros comuns e de elite
            derrubam: mini-chefes e chefes não. Veja onde a família vive na
            página dela: <DropFamilyLink drop={material.family!} />.
          </p>
        )}
      </EntitySection>

      <EntitySection id="usado-em" title="Usado em">
        {items.length === 0 && tools.length === 0 && (
          <p>Ainda não entra em nenhuma receita. Novas receitas chegam com as próximas atualizações.</p>
        )}
        {items.length > 0 && (
          <Table
            head={["Item", "Profissão", "Nível", "Quantidade"]}
            rows={items.map((item) => [
              <ItemLink slug={item.slug} />,
              jobName(item.job),
              item.level,
              item.materials.find(([slug]) => slug === material.slug)![1],
            ])}
          />
        )}
        {tools.length > 0 && (
          <>
            <p>Também é pedido para desbloquear estas ferramentas:</p>
            <Table
              head={["Ferramenta", "Nível", "Quantidade"]}
              rows={tools.map((tool) => [
                tool.name,
                tool.level,
                tool.materials.find(([slug]) => slug === material.slug)![1],
              ])}
            />
          </>
        )}
      </EntitySection>

      <EntitySection id="veja-tambem" title="Veja também">
        <ul>
          <li>
            <WikiLink to="materiais">Todos os materiais</WikiLink>
          </li>
          <li>
            <WikiLink to="profissoes">Profissões</WikiLink>: coleta, cargas e ferramentas
          </li>
          <li>
            <WikiLink to="receitas">Receitas</WikiLink>
          </li>
        </ul>
      </EntitySection>
    </EntityPage>
  );
}
