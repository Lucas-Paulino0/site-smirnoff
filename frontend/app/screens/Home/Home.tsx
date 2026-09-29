import { Link } from "react-router";
import { SITE } from "~/config/site";
import {
  ATTRIBUTES,
  CLASSES,
  CLASS_LINES,
  RARITIES,
  classIcon,
  rarityIcon,
} from "~/data/classes";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import ServerAddress from "~/ui/ServerAddress/ServerAddress";
import Wordmark from "~/ui/Wordmark/Wordmark";
import "./Home.css";

const FEATURES = [
  {
    icon: classIcon("archer"),
    title: `${CLASSES.length} classes`,
    text: `Comece como ${CLASS_LINES.map((l) => l.name).join(", ").replace(/, ([^,]*)$/, " ou $1")} e evolua sua classe nos níveis 50 e 100.`,
  },
  {
    icon: rarityIcon("lendarias"),
    title: "Nível 100",
    text: `Ganhe experiência, suba de nível e distribua pontos entre ${ATTRIBUTES.length} atributos para montar seu estilo de jogo.`,
  },
  {
    icon: classIcon("dragon_warrior"),
    title: "Chefes",
    text: "Enfrente chefes com modelos e habilidades próprias. Alguns guardam classes Lendárias e Míticas.",
  },
  {
    icon: rarityIcon("secretas"),
    title: "Segredos",
    text: "Classes Secretas não aparecem em lugar nenhum: são conquistadas completando missões.",
  },
  {
    icon: classIcon("phoenix_hunter"),
    title: "Mundo feito à mão",
    text: "Das Terras Ardentes aos Picos Gélidos, cada região foi construída pela equipe.",
    to: "/mapa",
  },
  {
    icon: classIcon("paladin"),
    title: "Guildas e missões",
    text: "Monte sua guilda e siga missões de história e diárias.",
    soon: true,
  },
];

export default function Home() {
  const joinSteps = [
    {
      title: "Abra o Minecraft",
      text: `O servidor roda no Minecraft ${SITE.minecraftVersion}.`,
    },
    {
      title: "Adicione o servidor",
      text: `Em Multijogador, adicione um servidor com o IP ${SITE.serverIp}.`,
    },
    {
      title: "Aceite o pacote de recursos",
      text: "Ele é obrigatório: traz os menus, a HUD, os itens e os modelos do servidor.",
    },
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content">
          <Wordmark size="large" />
          <p className="hero__tagline font-pixel">{SITE.tagline}</p>
          <p className="hero__lead">
            Escolha sua classe, evolua até o nível 100 e explore um mundo
            medieval cheio de chefes, segredos e regiões para descobrir.
          </p>
          <ServerAddress />
          <div className="hero__actions">
            <Link className="btn" to="/classes">
              Conheça as classes
            </Link>
            <Link className="btn btn--wood" to="/loja">
              Visitar a loja
            </Link>
          </div>
        </div>
      </section>

      <div className="page">
        <section className="section">
          <SectionHeading
            title="O que te espera"
            subtitle="Um RPG completo dentro do Minecraft, com sistemas feitos sob medida para o servidor."
          />
          <div className="grid grid-3">
            {FEATURES.map((feature) => {
              const content = (
                <>
                  <img
                    className="pixelated feature__icon"
                    src={feature.icon}
                    alt=""
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3 className="title feature__title">
                      {feature.title}
                      {feature.soon && <span className="badge">Em breve</span>}
                    </h3>
                    <p className="feature__text">{feature.text}</p>
                  </div>
                </>
              );
              return feature.to ? (
                <Link
                  key={feature.title}
                  to={feature.to}
                  className="frame feature feature--link"
                >
                  {content}
                </Link>
              ) : (
                <div key={feature.title} className="frame feature">
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <SectionHeading
            title="Raridades de classe"
            subtitle="Todo mundo começa numa classe Base. As outras você conquista (ou encontra na loja)."
          />
          <div className="rarities">
            {RARITIES.map((rarity) => (
              <Link
                key={rarity.id}
                to={`/classes#${rarity.id}`}
                className="rarity"
              >
                <img
                  className="pixelated"
                  src={rarityIcon(rarity.id)}
                  alt=""
                  width={72}
                  height={72}
                />
                <span className="rarity__name" style={{ color: rarity.color }}>
                  {rarity.label}
                </span>
                <span className="rarity__how">{rarity.how}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading
            title="Atributos"
            subtitle="A cada nível você ganha pontos para distribuir como quiser."
          />
          <div className="parchment attributes">
            {ATTRIBUTES.map((attribute) => (
              <div key={attribute.id} className="attribute">
                <span className="attribute__name font-pixel">
                  {attribute.name}
                </span>
                <span className="attribute__text">{attribute.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading title="Como entrar" />
          <ol className="steps">
            {joinSteps.map((step, index) => (
              <li key={step.title} className="frame step">
                <span className="step__number font-pixel">{index + 1}</span>
                <h3 className="title">{step.title}</h3>
                <p className="muted">{step.text}</p>
              </li>
            ))}
          </ol>
          {SITE.whitelist && (
            <div className="parchment whitelist">
              <strong className="font-pixel">Fase fechada:</strong> por
              enquanto só entra quem está na whitelist.{" "}
              {SITE.discordUrl ? (
                <>
                  Peça sua vaga no{" "}
                  <a href={SITE.discordUrl} target="_blank" rel="noreferrer">
                    nosso Discord
                  </a>
                  .
                </>
              ) : (
                "Fale com a equipe para pedir sua vaga."
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
