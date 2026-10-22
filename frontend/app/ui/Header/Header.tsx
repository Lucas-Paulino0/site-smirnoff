import { Drawer, Icon, IconButton } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import { SITE } from "~/config/site";
import { useCart } from "~/context/CartContext/useCart";
import Wordmark from "../Wordmark/Wordmark";
import "./Header.css";

const LINKS = [
  { to: "/", label: "Início", end: true },
  { to: "/classes", label: "Classes" },
  { to: "/mapa", label: "Mapa" },
  { to: "/wiki", label: "Wiki" },
  { to: "/loja", label: "Loja" },
];

export default function Header() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const navLinks = (onClick?: () => void) =>
    LINKS.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.end}
        onClick={onClick}
        className={({ isActive }) =>
          `header__link${isActive ? " header__link--active" : ""}`
        }
      >
        {link.label}
      </NavLink>
    ));

  return (
    <header className="header">
      <div className="header__inner">
        <Wordmark />

        <nav className="header__nav" aria-label="Principal">
          {navLinks()}
        </nav>

        <div className="header__actions">
          {SITE.discordUrl && (
            <a
              className="header__link header__discord"
              href={SITE.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          )}
          <NavLink
            to="/loja/carrinho"
            className={({ isActive }) =>
              `header__link header__cart${isActive ? " header__link--active" : ""}`
            }
            aria-label={`Carrinho, ${cart.length} ${cart.length === 1 ? "item" : "itens"}`}
          >
            Carrinho
            {cart.length > 0 && (
              <span className="header__count">{cart.length}</span>
            )}
          </NavLink>
          <IconButton
            className="header__menu-button"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            sx={{ color: "var(--text)", borderRadius: "var(--radius)" }}
          >
            <Icon>menu</Icon>
          </IconButton>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "var(--surface)",
            backgroundImage: "none",
            borderLeft: "1px solid var(--line)",
            width: 260,
          },
        }}
      >
        <nav className="header__drawer" aria-label="Principal">
          {navLinks(() => setOpen(false))}
          {SITE.discordUrl && (
            <a
              className="header__link"
              href={SITE.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          )}
        </nav>
      </Drawer>
    </header>
  );
}
