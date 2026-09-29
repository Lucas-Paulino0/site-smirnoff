FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
# As variáveis PUBLIC_* entram no código na hora do build:
# docker build --build-arg PUBLIC_API_URL=https://api.seusite.com ...
ARG PUBLIC_API_URL
ARG PUBLIC_SERVER_IP
ARG PUBLIC_DISCORD_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL \
    PUBLIC_SERVER_IP=$PUBLIC_SERVER_IP \
    PUBLIC_DISCORD_URL=$PUBLIC_DISCORD_URL
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]