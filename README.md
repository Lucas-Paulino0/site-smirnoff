# Site Hail

Site do servidor de Minecraft RPG **Hail**: página inicial com IP e status ao vivo, catálogo de classes, mapa do mundo e loja com pagamento pelo Mercado Pago.

- `backend/`: API em Node.js + Express + Sequelize (PostgreSQL, MySQL ou SQLite)
- `frontend/`: React Router 7 (SSR) + MUI
- `plugin/`: plugin do servidor de Minecraft que entrega as compras no jogo

## Páginas

| Rota | O que tem |
|---|---|
| `/` | IP com botão de copiar, status (online e jogadores), recursos, raridades, atributos e como entrar |
| `/classes` | As 4 linhas base (níveis 1, 50 e 100) e as classes Lendárias, Míticas, Secretas e Divinas |
| `/mapa` | Mapa do mundo e descrição das regiões |
| `/wiki`, `/wiki/<artigo>` | Wiki: primeiros passos, regras, FAQ, níveis, atributos, classes, mundo, chefes, menus/HUD, comandos, economia, guildas/missões e loja |
| `/loja`, `/loja/carrinho`, `/loja/usuario` | Loja, carrinho e nick de entrega |
| `/compra/sucesso`, `/compra/erro`, `/compra/pendente` | Retorno do Mercado Pago |
| `/termos` | Termos de uso da loja |

## Rodando localmente

### Backend
```bash
cd backend
npm install
cp src/.env.example src/.env    # preencha as variáveis

npm run db:migrate   # cria as tabelas
npm run db:seed      # categorias e produtos da loja
npm run dev          # http://localhost:3000
```

`npm run db:reset` apaga tudo e recria as tabelas e os produtos.

O banco é escolhido pelo `.env` (`src/config/config.js`):
- `DATABASE_URL` preenchido: **PostgreSQL**, com SSL. Serve para bancos online como [Neon](https://neon.tech) ou [Supabase](https://supabase.com), que têm plano grátis. Crie o banco, copie a connection string (`postgresql://usuario:senha@host/banco?sslmode=require`) para o `DATABASE_URL` e rode `npm run db:migrate` e `npm run db:seed`. Para um Postgres local sem SSL, adicione `DB_SSL=false`.
- `DB_HOST` preenchido: MySQL (`DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`).
- Nenhum dos dois: SQLite local em `src/dev.sqlite`, sem instalar nada.

Variáveis principais do `.env`:
- `MC_SERVER_IP`: endereço do servidor para o status (`server1.halahost.net`)
- `FRONTEND_URL`: URL pública do site (usada nos retornos do Mercado Pago)
- `BASE_URL` e `WEBHOOK_ENDPOINT`: URL pública da API e caminho secreto do webhook do Mercado Pago
- `SECRET_ACCESS_TOKEN`: token que o plugin de entrega usa em `POST /purchases/approved`. Sem ele a rota responde 503
- `MP_ACCESS_TOKEN`: token de produção da conta do Mercado Pago (Suas integrações → Credenciais)

## Produtos da loja

O catálogo fica em `backend/src/seeders/demo-products.js`: 6 Classes Divinas, os VIPs Herói, Monarca e Divindade (30 dias), tickets de troca e pacotes de Tostões. Preços (2026-09-29): VIPs R$ 9,90 / 19,90 / 34,90; Classes Divinas R$ 24,90 (Necromancer R$ 29,90); tickets R$ 4,90 e 12,90; Tostões R$ 4,90, 19,90 e 69,90. **Só os VIPs estão ativos**: o resto depende do RPGCore, que ainda não está no servidor principal, e aparece no site como "Em breve". Para lançar um produto, mude `enabled` para `true` no banco (e no seeder, para instalações novas).

O `internalName` de cada produto (ex.: `classe_necromancer`, `heroi_30d`, `tostoes_1000`) é o que o plugin de entrega recebe para saber o que dar ao jogador. As imagens ficam em `backend/src/files/produtos/`.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev   # http://localhost:5173
```

## Plugin de entrega (`plugin/`)

Plugin HailLoja, feito para **Folia** (o Hail) e que também roda no Paper (o Teste). A cada 30 segundos ele pergunta ao backend quais compras foram pagas, roda pelo console os comandos de cada produto e avisa o backend do que foi entregue. Quem entra no servidor recebe na hora o que estava esperando.

1. Compile com `mvn package` (gera `target/HailLoja.jar`) ou com `LIBS=<pasta com os jars da API> ./build.sh` (gera `build/HailLoja.jar`), dentro de `plugin/`. Coloque o jar em `plugins/` do servidor.
2. No primeiro início ele cria `plugins/HailLoja/config.yml`. Preencha `api-url` (URL pública do backend) e `token` (o `SECRET_ACCESS_TOKEN`).
3. Confira os comandos de cada produto. A chave é o `internalName`, e `require-online: true` espera o jogador entrar para entregar. Produto sem comandos não é entregue: fica na fila com um aviso no console.
4. Mude `enabled` para `true` e rode `/loja-entregas reload`.

`/loja-entregas status` mostra a última consulta, a fila e o último erro; `/loja-entregas verificar` consulta na hora. Os ids entregues e ainda não confirmados ficam em `pendentes.yml`, para que uma queda do servidor não cause entrega em dobro.

**Comandos disponíveis hoje** (em 2026-09-29):
- **Classes Divinas:** `rpg class set <jogador> <classe>` do RPGCore, provisório. Ele troca a classe atual em vez de desbloquear para sempre, que é o que a loja promete.
- **VIPs (Herói, Monarca, Divindade):** `lp user <jogador> parent addtemp <grupo> 30d accumulate` do LuckPerms. O `accumulate` soma os dias a um VIP igual que ainda não venceu. A entrega espera o jogador entrar, porque o LuckPerms só acha pelo nick quem já jogou.
- **Tostões:** `rpg money <jogador> add <valor>` do RPGCore. O comando não funciona com o jogador offline, então a entrega espera ele entrar no servidor.
- **Tickets de troca:** ainda sem comando conhecido no RPGCore.
- O RPGCore está instalado só no Teste por enquanto.

## Pagamentos

O webhook (`POST /purchases/<WEBHOOK_ENDPOINT>`) aceita os formatos Webhooks e IPN do Mercado Pago e sempre consulta o pagamento na API antes de mudar qualquer coisa:
- **Aprovado:** só aprova se o valor pago cobre o preço guardado em cada item do pedido.
- **Estornado, cancelado ou chargeback:** o que ainda não foi entregue sai da fila. O que já foi entregue fica com `refunded = true`, e aparece um aviso no log para a equipe remover os itens no jogo.

O Mercado Pago precisa alcançar o backend pela internet com HTTPS, então os pagamentos só funcionam de verdade com o site publicado.

## Publicando

Os dois têm Dockerfile:
- **Backend:** `docker build -t hail-backend backend`. Passe as variáveis do `.env` para o container, com `DATABASE_URL` apontando para o PostgreSQL e `NODE_ENV=production`. As migrations rodam a cada início; os produtos entram uma vez com `docker exec <container> npm run db:seed`.
- **Frontend:** as variáveis `PUBLIC_*` entram no código durante o build: `docker build --build-arg PUBLIC_API_URL=https://api.seudominio.com --build-arg PUBLIC_DISCORD_URL=https://discord.gg/... -t hail-frontend frontend`. O site sobe na porta 3000.

Antes de abrir a loja, confira:
- `FRONTEND_URL` e `BASE_URL` com os endereços públicos, com HTTPS
- `SECRET_ACCESS_TOKEN` e `WEBHOOK_ENDPOINT` longos e aleatórios
- `MP_ACCESS_TOKEN` de produção
- Preços definidos e `enabled` ligado nos produtos
- Plugin instalado, com os comandos reais configurados

## API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/status` | Status do servidor (cache de 60s) |
| GET | `/categories` | Categorias da loja |
| GET | `/products` | Todos os produtos |
| GET | `/products/category/:id` | Produtos de uma categoria |
| POST | `/purchases` | Cria o pedido e devolve o link de pagamento (`{ username, productIds }`) |
| POST | `/purchases/approved` | Plugin de entrega: marca `delivered` (ids) como entregues e lista as compras aprovadas pendentes. Exige `Authorization: Bearer <SECRET_ACCESS_TOKEN>` |

Imagens de produtos ficam na pasta `backend/src/files/` e são servidas em `/files/<nome>`.

## Conteúdo do jogo

As classes (`frontend/app/data/classes.ts`), as regiões do mapa (`frontend/app/data/world.ts`) e os artigos da wiki (`frontend/app/data/wiki.tsx`) espelham o que está no servidor (`classes.yml` dos menus, a pintura do spawn e as configs do RPGCore, EternalCore e MythicMobs). Se algo mudar no jogo, atualize o arquivo correspondente. Os ícones em `frontend/public/classes/` e `frontend/public/raridades/` foram gerados com os mesmos desenhos dos menus do jogo.
