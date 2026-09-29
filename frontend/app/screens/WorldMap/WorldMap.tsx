import { REGIONS } from "~/data/world";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import "./WorldMap.css";

export default function WorldMap() {
  return (
    <main className="page">
      <SectionHeading
        as="h1"
        title="Mapa do mundo"
        subtitle="O continente onde sua jornada acontece. Você também vai encontrar este mapa pintado no spawn do servidor."
      />

      <figure className="world-map">
        <img
          className="pixelated"
          src="/mapa-do-mundo.png"
          alt="Mapa do mundo com as regiões Terras Ardentes, Picos Gélidos, Floresta Sombria, Vale Florido, Cidadela de Hail, Planícies Verdes, Cratera do Início e a Área Inexplorada"
          width={800}
          height={600}
        />
      </figure>

      <section className="section">
        <SectionHeading title="Regiões" />
        <div className="regions">
          {REGIONS.map((region) => (
            <article key={region.name} className="frame region">
              <span
                className="region__swatch"
                style={{ background: region.color }}
                aria-hidden="true"
              />
              <div>
                <h3 className="title">{region.name}</h3>
                <p className="muted">{region.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
