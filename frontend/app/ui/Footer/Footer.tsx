import { Link } from "react-router";
import { SITE } from "~/config/site";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__about">
          <strong className="font-head">{SITE.name}</strong>
          <p>
            {SITE.tagline}. Não somos afiliados à Mojang Studios nem à
            Microsoft.
          </p>
        </div>
        <nav className="footer__col" aria-label="Site">
          <span>Servidor</span>
          <Link to="/classes">Classes</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/wiki">Wiki</Link>
          <Link to="/loja">Loja</Link>
        </nav>
        <nav className="footer__col" aria-label="Informações">
          <span>Informações</span>
          <Link to="/termos">Termos de uso</Link>
          <Link to="/privacidade">Política de privacidade</Link>
          {SITE.discordUrl && (
            <a href={SITE.discordUrl} target="_blank" rel="noreferrer">
              Discord
            </a>
          )}
        </nav>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} {SITE.name}
      </p>
    </footer>
  );
}
