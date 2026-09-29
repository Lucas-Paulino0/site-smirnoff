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

# Banco local sem instalar nada (SQLite):
cp src/config/config.sqlite.example.json src/config/config.json
# ou, com MySQL: cp src/config/config.example.json src/config/config.json

npm run db:migrate   # cria as tabelas
npm run db:seed      # categorias e produtos da loja
npm run dev          # http://localhost:3000
```

`npm run db:reset` apaga tudo e recria as tabelas e os produtos.

Variáveis principais do `.env`:
- `MC_SERVER_IP`: endereço do servidor para o status (`server1.halahost.net`)
- `FRONTEND_URL`: URL pública do site (usada nos retornos do Mercado Pago)
- `BASE_URL` e `WEBHOOK_ENDPOINT`: URL pública da API e caminho secreto do webhook do Mercado Pago
- `SECRET_ACCESS_TOKEN`: token que o plugin de entrega usa em `POST /purchases/approved`

## Produtos da loja

O catálogo fica em `backend/src/seeders/demo-products.js`: 6 Classes Divinas, VIP e Premium (30 dias), tickets de troca e pacotes de Tostões. **Os preços ainda não foram definidos**: todos entram com preço 0 e desativados, e aparecem no site como "Em breve". Para lançar um produto, defina `price` e mude `enabled` para `true` (no seeder ou direto no banco).

O `internalName` de cada produto (ex.: `classe_necromancer`, `vip_30d`, `tostoes_1000`) é o que o plugin de entrega recebe para saber o que dar ao jogador. As imagens ficam em `backend/src/files/produtos/`.

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

As classes (`frontend/app/data/classes.ts`), as regiões do mapa (`frontend/app/data/world.ts`) e os artigos da wiki (`frontend/app/data/wiki.tsx`) espelham o que está no servidor (`classes.yml` dos menus, a pintura do spawn e as configs do RPGCore, EternalCore e MythicMobs). Se algo mudar no jogo, atualize o arquivo correspondente. Os ícones em `frontend/public/classes/` e `frontend/public/raridades/` foram gerados com os mesmos desenhos dos menus do jogo.
