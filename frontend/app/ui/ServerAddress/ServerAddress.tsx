import { Icon } from "@mui/material";
import { SITE } from "~/config/site";
import { useAlert } from "~/context/AlertContext/useAlert";
import { useServerStatus } from "~/hooks/useServerStatus";
import "./ServerAddress.css";

export default function ServerAddress() {
  const status = useServerStatus();
  const { showSuccess, showError } = useAlert();

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SITE.serverIp);
      showSuccess("IP copiado! Agora é só colar no Minecraft.");
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
      ? `Online · ${status.players}/${status.maxPlayers} jogando`
      : "Offline no momento";
  }

  return (
    <div className="server-address">
      <button
        type="button"
        className="server-address__ip"
        onClick={copyIp}
        title="Clique para copiar"
      >
        <span className="server-address__value">{SITE.serverIp}</span>
        <span className="server-address__copy">
          <Icon fontSize="small">content_copy</Icon>
          Copiar IP
        </span>
      </button>
      <div className="server-address__meta" aria-live="polite">
        <span className="server-address__status">
          <span className={`status-dot ${dot}`} />
          {label}
        </span>
        <span className="server-address__sep">·</span>
        <span>Minecraft {SITE.minecraftVersion}</span>
      </div>
    </div>
  );
}
