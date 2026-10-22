import { Link } from "react-router";
import { SITE } from "~/config/site";
import "./Wordmark.css";

export default function Wordmark() {
  return (
    <Link
      to="/"
      className="wordmark"
      aria-label={`${SITE.name}, página inicial`}
    >
      <img
        className="pixelated"
        src="/favicon-96x96.png"
        alt=""
        width={26}
        height={26}
      />
      {SITE.name}
    </Link>
  );
}
