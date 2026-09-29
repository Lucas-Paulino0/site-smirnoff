import { Link } from "react-router";
import { SITE } from "~/config/site";
import "./Wordmark.css";

export default function Wordmark({
  size = "small",
}: {
  size?: "small" | "large";
}) {
  if (size === "large") {
    return (
      <div className="wordmark wordmark--large">
        <img
          className="pixelated wordmark__icon"
          src="/classes/warrior.png"
          alt=""
          width={72}
          height={72}
        />
        <span className="wordmark__text">{SITE.name.toUpperCase()}</span>
      </div>
    );
  }

  return (
    <Link
      to="/"
      className="wordmark"
      aria-label={`${SITE.name}, página inicial`}
    >
      <img
        className="pixelated wordmark__icon"
        src="/classes/warrior.png"
        alt=""
        width={32}
        height={32}
      />
      <span className="wordmark__text">{SITE.name.toUpperCase()}</span>
    </Link>
  );
}
