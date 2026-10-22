import { Link } from "react-router";
import { SITE } from "~/config/site";
import {
  ATTRIBUTES,
  CLASSES,
  CLASS_LINES,
  RARITIES,
  classesByRarity,
  rarityIcon,
} from "~/data/classes";
import { TOWNS } from "~/data/world";
import ClassLines from "~/ui/ClassLines/ClassLines";
import ServerAddress from "~/ui/ServerAddress/ServerAddress";
import "./Home.css";

const FEATURES = [
  {
    title: "Progressão",
    text: `Cada nível dá 3 pontos para distribuir entre ${ATTRIBUTES.length} atributos, e cada classe tem a sua árvore de habilidades.`,
    to: "/wiki/habilidades",
  },
  {
    title: "Chefes",
    text: "O Senhor da Guerra Kragan, o Capitão Barba-Morta e outros, cada um com modelo e ataques próprios.",
    to: "/wiki/chefes",
  },
  {
    title: "Classes Secretas",
    text: "Não aparecem em menu nenhum. Só são liberadas completando missões.",
  },
  {
    title: "Mundo",
    text: `Da Cratera da Ruína ao Inferno Escaldante, com ${TOWNS.length} cidades ligadas por viagem rápida e masmorras construídas pela equipe.`,
    to: "/mapa",
  },
  {
    title: "Guildas e missões",
    text: "Guildas, missões de história e missões diárias.",
    soon: true,
  },
];

export default function Home() {
  return (
    <main className="page home">
      <section className="hero">
        <div className="hero__text">
          <h1 className="title">Um servidor de RPG para Minecraft Java</h1>
          <p className="hero__lead">
            Você começa numa das {CLASS_LINES.length} classes Base, evolui nos
            níveis 50 e 100 e monta o personagem distribuindo pontos entre{" "}
            {ATTRIBUTES.length} atributos. Ao todo são {CLASSES.length} classes,
            cada uma com arma e habilidades próprias.
          </p>
          <ServerAddress />
          {SITE.whitelist && (
            <p className="hero__note">
              O servidor está em fase fechada: só entra quem está na
              whitelist.{" "}
              {SITE.discordUrl ? (
                <>
                  Peça sua vaga no{" "}
                  <a href={SITE.discordUrl} target="_blank" rel="noreferrer">
                    Discord
                  </a>
                  .
                </>
              ) : (
                "Fale com a equipe para pedir sua vaga."
              )}
            </p>
          )}
        </div>

        <figure className="hero__map">
          <Link to="/mapa">
            <img
              src="/mapa-do-mundo/mundo.webp"
              alt="Mapa do mundo do servidor visto de cima"
              width={864}
              height={672}
            />
          </Link>
          <figcaption>
            O mundo do servidor visto de cima, renderizado bloco por bloco.{" "}
            <Link to="/mapa">Abrir o mapa interativo</Link>
          </figcaption>
        </figure>
      </section>

      <section className="section split">
        <div className="split__head">
          <h2 className="title">Como entrar</h2>
        </div>
        <ol className="steps">
          <li>
            <strong>Abra o Minecraft {SITE.minecraftVersion}.</strong>
          </li>
          <li>
            <strong>Adicione o servidor.</strong> Em Multijogador, clique em
            Adicionar servidor e use o endereço <code>{SITE.serverIp}</code>.
          </li>
          <li>
            <strong>Aceite o pacote de recursos.</strong> Ele é obrigatório:
            traz os menus, a HUD, os itens e os modelos do servidor.
          </li>
        </ol>
      </section>

      <section className="section split">
        <div className="split__head">
          <h2 className="title">Classes</h2>
          <p>
            Todo jogador começa numa das linhas Base. Cada evolução custa um
            ticket de troca, ganho numa missão a cada 50 níveis.
          </p>
          <p>
            <Link to="/classes">Ver todas as classes</Link>
          </p>
        </div>
        <div>
          <ClassLines />

          <ul className="rarity-list">
            {RARITIES.slice(1).map((rarity) => {
              const count = classesByRarity(rarity.id).length;
              return (
                <li key={rarity.id}>
                  <img
                    className="pixelated"
                    src={rarityIcon(rarity.id)}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <div>
                    <Link
                      to={`/classes#${rarity.id}`}
                      style={{ color: rarity.color }}
                    >
                      {rarity.label}
                    </Link>
                    <span>
                      {count} {count === 1 ? "classe" : "classes"}.{" "}
                      {rarity.how}.
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section split">
        <div className="split__head">
          <h2 className="title">Atributos</h2>
          <p>Os pontos de cada nível vão onde você quiser.</p>
        </div>
        <dl className="attributes">
          {ATTRIBUTES.map((attribute) => (
            <div key={attribute.id}>
              <dt>{attribute.name}</dt>
              <dd>{attribute.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section split">
        <div className="split__head">
          <h2 className="title">No servidor</h2>
        </div>
        <dl className="features">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <dt>
                {feature.to ? (
                  <Link to={feature.to}>{feature.title}</Link>
                ) : (
                  feature.title
                )}
                {feature.soon && <span className="badge">Em breve</span>}
              </dt>
              <dd>{feature.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
