FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server.js ./

# Le dossier /app/config n'est PAS copié dans l'image.
# Il doit être monté dynamiquement depuis l'hôte au démarrage.
EXPOSE 8080
CMD ["npm", "start"]
