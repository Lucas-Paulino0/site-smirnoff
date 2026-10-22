import { Link } from "react-router";
import { CLASS_DETAILS } from "~/data/classDetails";
import { CLASS_LINES, classIcon, getClass } from "~/data/classes";
import "./ClassLines.css";

const LEVELS = CLASS_LINES[0].tiers.map((tier) => tier.level);

function ClassName({ id, showSoon }: { id: string; showSoon: boolean }) {
  const rpgClass = getClass(id);
  if (!rpgClass) return null;
  return (
    <Link to={`/classes/${id}`} className="class-name">
      <img
        className="pixelated"
        src={classIcon(id)}
        alt=""
        width={28}
        height={28}
      />
      <span>
        {rpgClass.name}
        {showSoon && !CLASS_DETAILS[id]?.skills && (
          <small> (habilidades em breve)</small>
        )}
      </span>
    </Link>
  );
}

// Tabela das linhas Base: uma linha por classe inicial, uma coluna por nível
export default function ClassLines({ showSoon = false }: { showSoon?: boolean }) {
  return (
    <div className="lines-table">
      <table>
        <thead>
          <tr>
            <th scope="col">Linha</th>
            {LEVELS.map((level) => (
              <th key={level} scope="col">
                Nível {level}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CLASS_LINES.map((line) => (
            <tr key={line.id}>
              <th scope="row">{line.name}</th>
              {line.tiers.map((tier) => (
                <td key={tier.level}>
                  {tier.classes.map((id) => (
                    <ClassName key={id} id={id} showSoon={showSoon} />
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
