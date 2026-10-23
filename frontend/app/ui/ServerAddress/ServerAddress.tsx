import { useEffect, useState } from "react";
import { SITE } from "~/config/site";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useServerStatus } from "~/hooks/useServerStatus";
import { track } from "~/services/analytics";
import "./ServerAddress.css";

export default function ServerAddress() {
  const status = useServerStatus();
  const { showError } = useAlert();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SITE.serverIp);
      setCopied(true);
      track("copiar-ip");
    } catch {
      showError(`Não deu pra copiar. O IP é ${SITE.serverIp}`);
    }
  };

  let dot = "status-dot--loading";
  let label = "Verificando status…";
  if (status === null) {
    label = "Status indisponível";
  } else if (status) {
    dot = status.online ? "status-dot--online" : "status-dot--offline";
    label = status.online
      ? `Online, ${status.players} de ${status.maxPlayers} jogando`
      : "Offline no momento";
  }

  return (
    <div className="server-address">
      <span className="server-address__label">Endereço do servidor</span>
      <div className="server-address__row">
        <code className="server-address__ip">{SITE.serverIp}</code>
        <button
          type="button"
          className="server-address__copy"
          onClick={copyIp}
          aria-live="polite"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <div className="server-address__meta" aria-live="polite">
        <span className="server-address__status">
          <span className={`status-dot ${dot}`} />
          {label}
        </span>
        <span>Minecraft {SITE.minecraftVersion}</span>
      </div>
    </div>
  );
}
