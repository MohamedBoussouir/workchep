# BROKEN DOCKERFILE - MULTI-STAGE
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p dist && cp -r src/* dist/

# Stage de production cassé
FROM node:18-alpine AS runner
WORKDIR /app

# Erreur 1 : Le nom du stage source est incorrect (wrong_stage au lieu de builder)
# Erreur 2 : Absence d'installation des dépendances de production
COPY --from=wrong_stage /app/dist ./dist

EXPOSE 8000
CMD ["node", "dist/server.js"]
