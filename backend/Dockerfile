FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
# As variáveis (.env) vêm do ambiente do container, com DATABASE_URL apontando
# para o PostgreSQL. As migrations rodam a cada início; os seeders só na primeira vez,
# à mão: docker exec <container> npm run db:seed
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node src/server.js"]
