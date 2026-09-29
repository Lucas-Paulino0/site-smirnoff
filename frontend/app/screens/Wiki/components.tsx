import { Link } from "react-router";

// Blocos usados nos artigos da wiki

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className={`callout callout--${type}`}>
      {title && <strong className="callout__title font-pixel">{title}</strong>}
      <div>{children}</div>
    </aside>
  );
}

export function Soon() {
  return <span className="badge wiki-soon">Em breve</span>;
}

export function Cmd({ children }: { children: React.ReactNode }) {
  return <code className="cmd">{children}</code>;
}

export function WikiLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={to.startsWith("/") ? to : `/wiki/${to}`} className="wiki-link">
      {children}
    </Link>
  );
}

export function Table({
  head,
  rows,
}: {
  head: React.ReactNode[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="wiki-table">
      <table>
        <thead>
          <tr>
            {head.map((cell, i) => (
              <th key={i}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function IconList({
  items,
}: {
  items: { icon: string; title: React.ReactNode; text: React.ReactNode }[];
}) {
  return (
    <ul className="icon-list">
      {items.map((item, i) => (
        <li key={i}>
          <img className="pixelated" src={item.icon} alt="" width={40} height={40} />
          <div>
            <strong className="font-pixel">{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
