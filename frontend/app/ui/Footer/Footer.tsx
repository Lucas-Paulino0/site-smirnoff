import { Link } from "react-router";
import { SITE } from "~/config/site";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos
          reservados.
        </p>
        <nav className="footer__links" aria-label="Rodapé">
          <Link to="/classes">Classes</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/wiki">Wiki</Link>
          <Link to="/loja">Loja</Link>
          <Link to="/termos">Termos de uso</Link>
          {SITE.discordUrl && (
            <a href={SITE.discordUrl} target="_blank" rel="noreferrer">
              Discord
            </a>
          )}
        </nav>
        <p className="footer__disclaimer">
          Não somos afiliados à Mojang Studios nem à Microsoft.
        </p>
      </div>
    </footer>
  );
}
