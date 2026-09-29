# Site Smirnoff

Site do servidor de Minecraft RPG **Smirnoff**: página inicial com IP e status ao vivo, catálogo de classes, mapa do mundo e loja com pagamento pelo Mercado Pago.

- `backend/`: API em Node.js + Express + Sequelize (MySQL)
- `frontend/`: React Router 7 (SSR) + MUI

## Páginas

| Rota | O que tem |
|---|---|
| `/` | IP com botão de copiar, status (online e jogadores), recursos, raridades, atributos e como entrar |
| `/classes` | As 4 linhas base (níveis 1, 50 e 100) e as classes Lendárias, Míticas, Secretas e Divinas |
| `/mapa` | Mapa do mundo e descrição das regiões |
| `/loja`, `/loja/carrinho`, `/loja/usuario` | Loja, carrinho e nick de entrega |
| `/compra/sucesso`, `/compra/erro`, `/compra/pendente` | Retorno do Mercado Pago |
| `/termos` | Termos de uso da loja |

## Rodando localmente

### Backend
```bash
cd backend
npm install
cp src/.env.example src/.env                              # preencha as variáveis
cp src/config/config.example.json src/config/config.json  # dados do MySQL
npm run dev   # http://localhost:3000
```

Variáveis principais do `.env`:
- `MC_SERVER_IP`: endereço do servidor para o status (`server1.halahost.net`)
- `FRONTEND_URL`: URL pública do site (usada nos retornos do Mercado Pago)
- `BASE_URL` e `WEBHOOK_ENDPOINT`: URL pública da API e caminho secreto do webhook do Mercado Pago
- `SECRET_ACCESS_TOKEN`: token que o plugin de entrega usa em `POST /purchases/approved`

Crie as tabelas com as migrations em `src/migrations` (categorias, produtos, compras). Os seeders têm dados de exemplo.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev   # http://localhost:5173
```

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

As classes (`frontend/app/data/classes.ts`) e as regiões do mapa (`frontend/app/data/world.ts`) espelham o que está no servidor (`classes.yml` dos menus e a pintura do spawn). Se uma classe mudar no jogo, atualize o arquivo. Os ícones em `frontend/public/classes/` e `frontend/public/raridades/` foram gerados com os mesmos desenhos dos menus do jogo.
