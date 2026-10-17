import { useEffect, useRef, useState } from "react";
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  levelColor,
  MAP_AREAS,
  MAP_BOSSES,
  MAP_NATIVE_ZOOM,
  MAP_ORIGIN,
  MAP_PLACES,
  MAP_SIZE,
  MAP_TOWNS,
  type MapTown,
} from "~/data/worldMap";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import "./WorldMap.css";

type Zone = {
  area: string;
  lo: number;
  hi: number;
  between: boolean;
  points: [number, number][];
};

type LayerId = "zones" | "areas" | "towns" | "bosses" | "places";

const LAYERS: { id: LayerId; label: string }[] = [
  { id: "zones", label: "Níveis" },
  { id: "areas", label: "Nomes das áreas" },
  { id: "towns", label: "Cidades" },
  { id: "bosses", label: "Chefes" },
  { id: "places", label: "Locais com monstros" },
];

const ICONS = {
  town: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#1c110a" d="M2 7h12v8H2zM4 3h8v4H4zM7 1h2v2H7z"/><path fill="#f1e3c4" d="M3 8h10v6H3zM5 4h6v3H5z"/><path fill="#8b1e1e" d="M4 4h8v2H4zM7 2h2v2H7z"/><path fill="#57361f" d="M7 11h2v3H7z"/></svg>`,
  boss: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#1c110a" d="M3 1h10v2h2v7h-2v2h-1v3H4v-3H3v-2H1V3h2z"/><path fill="#f1e3c4" d="M4 2h8v2h2v5h-2v2h-1v3H5v-3H4V9H2V4h2z"/><path fill="#8b1e1e" d="M4 5h3v3H4zM9 5h3v3H9zM7 9h2v1H7z"/><path fill="#1c110a" d="M6 12h1v2H6zM9 12h1v2H9z"/></svg>`,
  miniboss: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#1c110a" d="M1 1h4v2h2v2h2V3h2V1h4v4h-2v2h-2v2h2v2h2v4h-4v-2H9v-2H7v2H5v2H1v-4h2V9h2V7H3V5H1z"/><path fill="#e8b949" d="M2 2h2v2h2v2h4V4h2V2h2v2h-2v2h-2v4h2v2h2v2h-2v-2h-2v-2H6v2H4v2H2v-2h2v-2h2V6H4V4H2z"/></svg>`,
  place: `<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#1c110a" d="M1 4h2V2h2v2h2V2h2v2h2V2h2v2h2v11H1z"/><path fill="#a8a29a" d="M2 5h12v9H2z"/><path fill="#6b665f" d="M2 5h12v1H2z"/><path fill="#1c110a" d="M6 9h4v5H6z"/></svg>`,
};

function popup(title: string, lines: string[]) {
  return `<strong class="map-popup__title">${title}</strong>${lines
    .map((l) => `<span class="map-popup__line">${l}</span>`)
    .join("")}`;
}

export default function WorldMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const groups = useRef<Partial<Record<LayerId, LayerGroup>>>({});
  const [visible, setVisible] = useState<Record<LayerId, boolean>>({
    zones: true,
    areas: true,
    towns: true,
    bosses: true,
    places: true,
  });
  const [cursor, setCursor] = useState<{ x: number; z: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !container.current) return;

      // Coordenadas do Leaflet = [z, x] do mundo; no zoom nativo, 1 pixel = 1 bloco
      const scale = 2 ** MAP_NATIVE_ZOOM;
      const crs = L.extend({}, L.CRS.Simple, {
        transformation: new L.Transformation(
          1 / scale,
          -MAP_ORIGIN.x / scale,
          1 / scale,
          -MAP_ORIGIN.z / scale
        ),
      });
      const bounds = L.latLngBounds(
        [MAP_ORIGIN.z, MAP_ORIGIN.x],
        [MAP_ORIGIN.z + MAP_SIZE.height, MAP_ORIGIN.x + MAP_SIZE.width]
      );

      const m = L.map(container.current, {
        crs,
        minZoom: 0,
        maxZoom: MAP_NATIVE_ZOOM + 2,
        zoomSnap: 0.5,
        maxBounds: bounds.pad(0.1),
        attributionControl: false,
      });
      map.current = m;

      L.tileLayer("/mapa-do-mundo/tiles/{z}/{x}_{y}.webp", {
        bounds,
        minNativeZoom: 0,
        maxNativeZoom: MAP_NATIVE_ZOOM,
        tileSize: 256,
        noWrap: true,
        className: "world-map__tiles",
      }).addTo(m);

      const icon = (kind: keyof typeof ICONS, size = 24) =>
        L.divIcon({
          html: ICONS[kind],
          className: `map-icon map-icon--${kind}`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          popupAnchor: [0, -size / 2],
        });

      const zones = L.layerGroup();
      fetch("/mapa-do-mundo/zonas.json")
        .then((r) => r.json())
        .then((data: { zones: Zone[]; border: [number, number][] }) => {
          for (const zone of data.zones) {
            const color = levelColor(zone.lo);
            L.polygon(
              zone.points.map(([x, z]) => [z, x] as [number, number]),
              {
                color,
                weight: 1,
                opacity: 0.5,
                fillColor: color,
                fillOpacity: zone.between ? 0.08 : 0.14,
              }
            )
              .bindTooltip(
                `${zone.area} · níveis ${zone.lo} a ${zone.hi}${
                  zone.between ? " (transição)" : ""
                }`,
                { sticky: true, className: "map-tooltip" }
              )
              .addTo(zones);
          }
          L.polygon(
            data.border.map(([x, z]) => [z, x] as [number, number]),
            { color: "#e8b949", weight: 2, dashArray: "6 6", fill: false, interactive: false }
          ).addTo(m);
        })
        .catch(() => {});

      const areas = L.layerGroup();
      for (const a of MAP_AREAS) {
        L.marker([a.z, a.x], {
          interactive: false,
          icon: L.divIcon({
            className: "map-area-label",
            html: `<span>${a.name}</span><small>níveis ${a.minLevel} a ${a.maxLevel}</small>`,
            iconSize: [220, 44],
            iconAnchor: [110, 22],
          }),
        }).addTo(areas);
      }

      const towns = L.layerGroup();
      for (const t of MAP_TOWNS) {
        L.marker([t.z, t.x], { icon: icon("town", 26), riseOnHover: true })
          .bindPopup(
            popup(t.name, [
              `Cidade, sem monstros`,
              `<code>/warp ${t.warp}</code>`,
              `X ${t.x} · Z ${t.z}`,
            ])
          )
          .bindTooltip(t.name, {
            permanent: true,
            direction: "bottom",
            offset: [0, 10],
            className: "map-town-label",
          })
          .addTo(towns);
      }

      const bosses = L.layerGroup();
      for (const b of MAP_BOSSES) {
        L.marker([b.z, b.x], {
          icon: icon(b.role === "Chefe" ? "boss" : "miniboss", b.role === "Chefe" ? 26 : 20),
          riseOnHover: true,
          zIndexOffset: 500,
        })
          .bindPopup(
            popup(b.name, [
              `${b.role}, nível ${b.level}`,
              `X ${b.x} · Z ${b.z}`,
              `<a href="/wiki/chefes">Ver na wiki</a>`,
            ])
          )
          .addTo(bosses);
      }

      const places = L.layerGroup();
      for (const p of MAP_PLACES) {
        L.marker([p.z, p.x], { icon: icon("place", 20), riseOnHover: true })
          .bindPopup(
            popup(p.name, [`Níveis ${p.levels}`, p.mobs, `X ${p.x} · Z ${p.z}`])
          )
          .addTo(places);
      }

      groups.current = { zones, areas, towns, bosses, places };
      for (const [id, g] of Object.entries(groups.current)) {
        if (visible[id as LayerId]) g.addTo(m);
      }

      m.on("mousemove", (e) =>
        setCursor({ x: Math.floor(e.latlng.lng), z: Math.floor(e.latlng.lat) })
      );
      m.on("mouseout", () => setCursor(null));
      // Longe: só cidades, chefes e nomes das áreas; perto: nomes das cidades
      // no lugar dos nomes das áreas
      const zoomClasses = () => {
        const z = m.getZoom();
        container.current?.classList.toggle("world-map--far", z < 2.5);
        container.current?.classList.toggle("world-map--near", z >= 4);
      };
      m.on("zoomend", zoomClasses);

      // /mapa?x=-1917&z=1572&zoom=5 abre o mapa nesse ponto, com um marcador
      const params = new URLSearchParams(window.location.search);
      const x = Number(params.get("x"));
      const z = Number(params.get("z"));
      if (params.has("x") && params.has("z") && Number.isFinite(x) && Number.isFinite(z)) {
        const zoom = Number(params.get("zoom"));
        m.setView([z, x], Number.isFinite(zoom) && zoom > 0 ? zoom : MAP_NATIVE_ZOOM - 1);
        L.marker([z, x], { zIndexOffset: 1000 })
          .setIcon(
            L.divIcon({
              className: "map-pin",
              html: "<span></span>",
              iconSize: [18, 18],
              iconAnchor: [9, 9],
            })
          )
          .bindTooltip(`X ${Math.round(x)} · Z ${Math.round(z)}`, {
            permanent: true,
            direction: "top",
            offset: [0, -10],
            className: "map-tooltip",
          })
          .addTo(m);
      } else {
        m.fitBounds(L.latLngBounds([-2602, -4163], [2533, 2531]), {
          animate: false,
        });
      }
      zoomClasses();
    })();

    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
    // O mapa é montado uma vez; as camadas mudam no efeito abaixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    for (const [id, g] of Object.entries(groups.current)) {
      if (visible[id as LayerId]) g.addTo(m);
      else g.remove();
    }
  }, [visible]);

  function flyTo(town: MapTown) {
    map.current?.flyTo([town.z, town.x], MAP_NATIVE_ZOOM - 0.5, { duration: 1.2 });
    container.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className="page">
      <SectionHeading
        as="h1"
        title="Mapa do mundo"
        subtitle="O mundo do servidor visto de cima, bloco por bloco. Arraste para andar, use a roda do mouse ou os botões para dar zoom e clique nos ícones para ver detalhes."
      />

      <div className="world-map">
        <div className="world-map__toolbar">
          {LAYERS.map((layer) => (
            <label key={layer.id} className="world-map__toggle">
              <input
                type="checkbox"
                checked={visible[layer.id]}
                onChange={(e) =>
                  setVisible((v) => ({ ...v, [layer.id]: e.target.checked }))
                }
              />
              {layer.label}
            </label>
          ))}
        </div>
        <div className="world-map__frame">
          <div ref={container} className="world-map__canvas" />
          <div className="world-map__coords" aria-live="off">
            {cursor ? `X ${cursor.x} · Z ${cursor.z}` : "Passe o mouse no mapa"}
          </div>
        </div>
        <ul className="world-map__legend">
          <li>
            <span className="map-icon" dangerouslySetInnerHTML={{ __html: ICONS.town }} />
            Cidade (sem monstros)
          </li>
          <li>
            <span className="map-icon" dangerouslySetInnerHTML={{ __html: ICONS.boss }} />
            Chefe
          </li>
          <li>
            <span className="map-icon" dangerouslySetInnerHTML={{ __html: ICONS.miniboss }} />
            Mini-chefe
          </li>
          <li>
            <span className="map-icon" dangerouslySetInnerHTML={{ __html: ICONS.place }} />
            Local com monstros
          </li>
          <li>
            <span className="world-map__border-swatch" />
            Limite do mapa
          </li>
          <li>Aproxime para ver mini-chefes e locais com monstros</li>
        </ul>
      </div>

      <section className="section">
        <SectionHeading
          title="Áreas e níveis"
          subtitle="O nível dos monstros sobe conforme você se afasta da cratera do spawn. Cada área é dividida em faixas de cerca de 10 níveis."
        />
        <div className="regions">
          {MAP_AREAS.map((area) => (
            <article key={area.name} className="frame region">
              <span
                className="region__swatch"
                style={{ background: levelColor(area.minLevel) }}
                aria-hidden="true"
              />
              <div>
                <h3 className="title">{area.name}</h3>
                <p className="region__levels">
                  Níveis {area.minLevel} a {area.maxLevel}
                </p>
                <p className="muted">{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          title="Cidades"
          subtitle="Nas cidades e nas estradas entre elas não nascem monstros. Use /warp para viajar até qualquer uma delas."
        />
        <div className="towns">
          {MAP_TOWNS.map((town) => (
            <button
              key={town.warp}
              type="button"
              className="frame town"
              onClick={() => flyTo(town)}
            >
              <span className="title">{town.name}</span>
              <code>/warp {town.warp}</code>
              <span className="muted">
                X {town.x} · Z {town.z}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
