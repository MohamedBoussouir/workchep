# Défi 6 : Multi-Stage Build & Optimisation d'image

L'objectif d'un **Multi-stage build** est de séparer l'environnement de construction (compilation, outillage) de l'environnement d'exécution (production) afin de produire une image légère, sécurisée et épurée.

## Problème
Le fichier `Dockerfile` utilise plusieurs étapes (`builder` et `runner`), mais la compilation échoue car le stage source est mal nommé et les dépendances nécessaires à l'exécution sont manquantes dans l'image finale.

## Exigences
1. Corrigez le fichier `Dockerfile` pour référencer correctement l'étape de construction (`builder`).
2. Assurez-vous que les dépendances nécessaires à l'exécution de production soient installées dans l'image finale (`npm install --only=production`).
3. Construisez l'image et lancez le conteneur sur le port `8000`.
4. Accédez à l'application dans votre navigateur sur `http://localhost:8000`.

## Solution
Dockerfile corrigé :
```dockerfile
# Étape 1 : Construction / Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p dist && cp -r src/* dist/

# Étape 2 : Image finale de production
FROM node:18-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 8000
CMD ["node", "dist/server.js"]
```

Commandes de test :
```bash
docker build -t ch6 .
docker run -d -p 8000:8000 --name ch6-app ch6
```
