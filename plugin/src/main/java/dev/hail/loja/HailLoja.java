package dev.hail.loja;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.papermc.paper.threadedregions.scheduler.ScheduledTask;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.format.NamedTextColor;
import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Pattern;

/**
 * Consulta o backend do site (POST /purchases/approved), entrega as compras
 * pagas rodando os comandos de cada produto pelo console e, na consulta
 * seguinte, informa ao backend os ids entregues.
 *
 * Feito para Folia (o Hail) e também roda no Paper: não existe o scheduler do
 * Bukkit, então a rede vai no AsyncScheduler, os comandos de console no
 * GlobalRegionScheduler e as mensagens no scheduler do próprio jogador.
 *
 * Os ids entregues e ainda não confirmados pelo backend ficam salvos em
 * pendentes.yml: se o servidor cair entre a entrega e a confirmação, a compra
 * não é entregue de novo quando ele voltar.
 */
public final class HailLoja extends JavaPlugin implements Listener {

    private static final Pattern MINECRAFT_USERNAME = Pattern.compile("^[A-Za-z0-9_]{3,16}$");
    private static final LegacyComponentSerializer LEGACY = LegacyComponentSerializer.legacyAmpersand();

    private record PendingPurchase(int id, String username, String internalName) {}

    private final Set<Integer> toConfirm = ConcurrentHashMap.newKeySet();
    private final Set<Integer> warned = ConcurrentHashMap.newKeySet();
    private final AtomicBoolean polling = new AtomicBoolean();

    private HttpClient http;
    private File pendingFile;
    private ScheduledTask task;

    private volatile long lastSuccess;
    private volatile long lastAttempt;
    private volatile int lastQueueSize;
    private volatile String lastError;

    @Override
    public void onEnable() {
        saveDefaultConfig();
        http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();
        pendingFile = new File(getDataFolder(), "pendentes.yml");
        loadPending();
        getServer().getPluginManager().registerEvents(this, this);
        schedule();
    }

    @Override
    public void onDisable() {
        if (task != null) {
            task.cancel();
        }
        savePending();
    }

    private void schedule() {
        if (task != null) {
            task.cancel();
            task = null;
        }
        if (!getConfig().getBoolean("enabled")) {
            getLogger().warning("Entregas desligadas (enabled: false no config.yml). Confira os comandos dos produtos e ligue.");
            return;
        }
        if (getConfig().getString("token", "").isBlank()) {
            getLogger().warning("token vazio no config.yml: o backend vai recusar as consultas.");
        }
        long seconds = Math.max(10, getConfig().getInt("interval-seconds", 30));
        task = Bukkit.getAsyncScheduler().runAtFixedRate(this, t -> poll(), 5, seconds, TimeUnit.SECONDS);
    }

    private void pollSoon(long seconds) {
        Bukkit.getAsyncScheduler().runDelayed(this, t -> poll(), seconds, TimeUnit.SECONDS);
    }

    // ---------- consulta ao backend (thread assíncrona) ----------

    private void poll() {
        if (!getConfig().getBoolean("enabled") || !polling.compareAndSet(false, true)) {
            return;
        }
        lastAttempt = System.currentTimeMillis();
        try {
            List<Integer> confirming = new ArrayList<>(toConfirm);
            JsonArray delivered = new JsonArray();
            confirming.forEach(delivered::add);
            JsonObject body = new JsonObject();
            body.add("delivered", delivered);

            String apiUrl = getConfig().getString("api-url", "").replaceAll("/+$", "");
            HttpRequest request = HttpRequest.newBuilder(URI.create(apiUrl + "/purchases/approved"))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + getConfig().getString("token", ""))
                    .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                    .build();
            HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                fail("o backend respondeu HTTP " + response.statusCode() + ": " + response.body());
                return;
            }

            // O backend marcou esses ids como entregues antes de montar a fila
            if (!confirming.isEmpty()) {
                confirming.forEach(toConfirm::remove);
                savePending();
            }

            List<PendingPurchase> queue = parseQueue(response.body());
            lastQueueSize = queue.size();
            lastSuccess = System.currentTimeMillis();
            lastError = null;

            if (!queue.isEmpty()) {
                Bukkit.getGlobalRegionScheduler().run(this, t -> deliver(queue));
            }
        } catch (Exception e) {
            fail(e.getClass().getSimpleName() + ": " + e.getMessage());
        } finally {
            polling.set(false);
        }
    }

    private void fail(String message) {
        // Só registra no console quando o erro muda, para não lotar o log
        if (!message.equals(lastError)) {
            getLogger().warning("Falha ao consultar a loja: " + message);
        }
        lastError = message;
    }

    private List<PendingPurchase> parseQueue(String json) {
        List<PendingPurchase> queue = new ArrayList<>();
        for (JsonElement element : JsonParser.parseString(json).getAsJsonArray()) {
            JsonObject purchase = element.getAsJsonObject();
            JsonElement product = purchase.get("Product");
            String internalName = product != null && product.isJsonObject()
                    ? product.getAsJsonObject().get("internalName").getAsString()
                    : null;
            queue.add(new PendingPurchase(
                    purchase.get("id").getAsInt(),
                    purchase.get("username").getAsString(),
                    internalName));
        }
        return queue;
    }

    // ---------- entrega (thread global, onde o console pode rodar comandos) ----------

    private void deliver(List<PendingPurchase> queue) {
        boolean deliveredAny = false;

        for (PendingPurchase purchase : queue) {
            // Já entregue, esperando a confirmação chegar ao backend
            if (toConfirm.contains(purchase.id())) {
                continue;
            }

            ConfigurationSection product = purchase.internalName() == null
                    ? null
                    : getConfig().getConfigurationSection("products." + purchase.internalName());
            List<String> commands = product == null ? List.of() : product.getStringList("commands");
            // Sem comandos a compra ficaria marcada como entregue sem o jogador receber nada
            if (commands.isEmpty()) {
                warnOnce(purchase, "o produto '" + purchase.internalName() + "' não tem comandos no config.yml");
                continue;
            }
            if (!MINECRAFT_USERNAME.matcher(purchase.username()).matches()) {
                warnOnce(purchase, "nick inválido '" + purchase.username() + "'");
                continue;
            }

            Player player = Bukkit.getPlayerExact(purchase.username());
            if (product.getBoolean("require-online", true) && player == null) {
                continue;
            }

            for (String command : commands) {
                String line = command.replace("{player}", purchase.username());
                boolean ok = Bukkit.dispatchCommand(Bukkit.getConsoleSender(), line);
                if (!ok) {
                    getLogger().warning("Compra #" + purchase.id() + ": comando não reconhecido: " + line);
                }
            }

            toConfirm.add(purchase.id());
            savePending();
            deliveredAny = true;
            getLogger().info("Compra #" + purchase.id() + " entregue: " + purchase.internalName() + " para " + purchase.username());

            if (player != null) {
                String name = product.getString("name", purchase.internalName());
                String message = getConfig().getString("delivered-message", "").replace("{product}", name);
                if (!message.isBlank()) {
                    player.getScheduler().run(this, t -> player.sendMessage(LEGACY.deserialize(message)), null);
                }
            }
        }

        // Confirma logo em vez de esperar o próximo intervalo
        if (deliveredAny) {
            pollSoon(1);
        }
    }

    private void warnOnce(PendingPurchase purchase, String reason) {
        if (warned.add(purchase.id())) {
            getLogger().warning("Compra #" + purchase.id() + " de " + purchase.username() + " não entregue: " + reason + ".");
        }
    }

    // Quem acabou de entrar recebe o que estava esperando por ele
    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        if (getConfig().getBoolean("enabled") && System.currentTimeMillis() - lastAttempt > 5000) {
            pollSoon(3);
        }
    }

    // ---------- pendentes.yml ----------

    private void loadPending() {
        if (pendingFile.exists()) {
            toConfirm.addAll(YamlConfiguration.loadConfiguration(pendingFile).getIntegerList("delivered"));
        }
    }

    private synchronized void savePending() {
        YamlConfiguration yaml = new YamlConfiguration();
        yaml.set("delivered", new ArrayList<>(toConfirm));
        try {
            yaml.save(pendingFile);
        } catch (IOException e) {
            getLogger().severe("Não foi possível salvar " + pendingFile.getName() + ": " + e.getMessage());
        }
    }

    // ---------- /loja-entregas ----------

    private static Component text(String legacy) {
        return LEGACY.deserialize(legacy);
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        String sub = args.length > 0 ? args[0].toLowerCase() : "status";
        switch (sub) {
            case "reload" -> {
                reloadConfig();
                warned.clear();
                schedule();
                sender.sendMessage(text("&aConfig recarregada."));
            }
            case "verificar" -> {
                if (!getConfig().getBoolean("enabled")) {
                    sender.sendMessage(text("&cAs entregas estão desligadas (enabled: false)."));
                } else {
                    Bukkit.getAsyncScheduler().runNow(this, t -> poll());
                    sender.sendMessage(text("&aConsultando a loja..."));
                }
            }
            case "status" -> {
                boolean enabled = getConfig().getBoolean("enabled");
                sender.sendMessage(text("&6HailLoja &7(" + (enabled ? "&aligado" : "&cdesligado") + "&7)"));
                sender.sendMessage(text("&7Backend: &f" + getConfig().getString("api-url")));
                sender.sendMessage(text("&7Última consulta ok: &f"
                        + (lastSuccess == 0 ? "nenhuma" : "há " + (System.currentTimeMillis() - lastSuccess) / 1000 + "s")));
                sender.sendMessage(text("&7Na fila do site: &f" + lastQueueSize
                        + " &7| Entregues sem confirmação: &f" + toConfirm.size()));
                if (lastError != null) {
                    // Texto puro: a mensagem de erro pode ter & e não deve virar cor
                    sender.sendMessage(Component.text("Último erro: " + lastError, NamedTextColor.RED));
                }
            }
            default -> {
                return false;
            }
        }
        return true;
    }
}
