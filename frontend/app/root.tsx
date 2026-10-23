import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import { createTheme, ThemeProvider } from "@mui/material";
import { AlertProvider } from "./context/AlertContext/AlertProvider";
import { AlertCard } from "./context/AlertContext/AlertCard";
import { UserProvider } from "./context/UserContext/UserProvider";
import { CartProvider } from "./context/CartContext/CartProvider";
import SiteLayout from "./ui/SiteLayout/SiteLayout";
import { SITE } from "./config/site";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Alegreya:wght@500;700&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon-96x96.png",
  },
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
];

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d9a54a",
      contrastText: "#1c1406",
    },
    secondary: {
      main: "#d4664f",
    },
    background: {
      default: "#131210",
      paper: "#1b1916",
    },
    text: {
      primary: "#ece6da",
      secondary: "#a89f90",
    },
    success: {
      main: "#82c06c",
    },
    error: {
      main: "#d4664f",
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily: '"Alegreya Sans", system-ui, sans-serif',
  },
  cssVariables: true,
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#131210" />
        <Meta />
        <Links />
        {SITE.analyticsId && (
          // só conta no endereço público (não no localhost) e respeita o "não rastrear"
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={SITE.analyticsId}
            data-domains={new URL(SITE.url).hostname}
            data-do-not-track="true"
          />
        )}
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <CartProvider>
              <AlertProvider>
                {children}
                <ScrollRestoration />
                <Scripts />
                <AlertCard />
              </AlertProvider>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Algo deu errado";
  let details = "Um erro inesperado aconteceu. Tente novamente em instantes.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Página não encontrada" : "Erro";
    details =
      error.status === 404
        ? "Esse caminho não leva a lugar nenhum. Talvez seja parte da Área Inexplorada."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <SiteLayout>
      <main className="page">
        <h1 className="title">{message}</h1>
        <p className="muted" style={{ margin: "12px 0 24px" }}>
          {details}
        </p>
        <a className="btn" href="/">
          Voltar para {SITE.name}
        </a>
        {stack && (
          <pre
            style={{ textAlign: "left", overflowX: "auto", marginTop: 32 }}
          >
            <code>{stack}</code>
          </pre>
        )}
      </main>
    </SiteLayout>
  );
}
