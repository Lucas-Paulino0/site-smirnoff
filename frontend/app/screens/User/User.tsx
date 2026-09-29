import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MINECRAFT_USERNAME } from "~/context/UserContext/UserProvider";
import { useUser } from "~/context/UserContext/useUser";
import SectionHeading from "~/ui/SectionHeading/SectionHeading";
import "../Store/Store.css";

export default function User() {
  const { username, ready, setUsername } = useUser();
  const [nick, setNick] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && username) setNick(username);
  }, [ready]);

  const valid = MINECRAFT_USERNAME.test(nick);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!valid) return;

    setUsername(nick);
    navigate("/loja/carrinho");
  };

  return (
    <main className="page">
      <SectionHeading
        as="h1"
        title="Seu nick"
        subtitle="Os produtos são entregues na conta com esse nome. Confira com atenção."
      />
      <form className="parchment user-form" onSubmit={handleSubmit}>
        <img
          src={`https://mc-heads.net/avatar/${valid ? encodeURIComponent(nick) : "MHF_Steve"}/96`}
          alt=""
          width={96}
          height={96}
        />
        <label htmlFor="nick">Nick no Minecraft</label>
        <input
          id="nick"
          value={nick}
          maxLength={16}
          autoComplete="off"
          spellCheck={false}
          placeholder="Steve"
          onChange={(e) => setNick(e.target.value.trim())}
          onBlur={() => setTouched(true)}
          aria-invalid={touched && !valid}
          aria-describedby="nick-error"
        />
        <p id="nick-error" className="user-form__error">
          {touched && !valid
            ? "Use de 3 a 16 caracteres: letras, números e _"
            : ""}
        </p>
        <button type="submit" className="btn btn--block">
          Continuar
        </button>
      </form>
    </main>
  );
}
