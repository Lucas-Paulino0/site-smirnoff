# Site Smirnoff

Site do servidor de Minecraft RPG **Smirnoff**.

- `backend/`: API em Node.js + Express + Sequelize (MySQL), com pagamentos via Mercado Pago
- `frontend/`: React Router 7 + MUI + Tailwind

## Rodando localmente

### Backend
```bash
cd backend
npm install
cp src/.env.example src/.env                          # preencha as variáveis
cp src/config/config.example.json src/config/config.json  # dados do MySQL
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```
Defina `PUBLIC_API_URL` apontando para o backend (ex.: `http://localhost:3000`).
