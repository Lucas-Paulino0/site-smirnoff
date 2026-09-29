import { Badge, Drawer, Icon, IconButton } from "@mui/material";
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
              className="btn btn--small btn--wood header__discord"
              href={SITE.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          )}
          <NavLink
            to="/loja/carrinho"
            className="header__cart"
            aria-label={`Carrinho, ${cart.length} ${cart.length === 1 ? "item" : "itens"}`}
          >
            <Badge
              badgeContent={cart.length}
              color="primary"
              invisible={cart.length === 0}
            >
              <Icon>shopping_cart</Icon>
            </Badge>
          </NavLink>
          <IconButton
            className="header__menu-button"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            sx={{ color: "var(--gold)" }}
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
            background: "var(--wood-900)",
            borderLeft: "4px solid var(--wood-950)",
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
