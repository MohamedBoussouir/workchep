# Défi 2 : Dockerfile cassé

Corrigez le fichier `Dockerfile` pour que l'application fonctionne sur le port 4000.

## Indice pour le formateur (Solution)
Dockerfile corrigé :
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "app.js"]
```
