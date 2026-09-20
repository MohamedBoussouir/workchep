# Défi 1 : Mappage des ports (Port Mapping)

## Exigences
Construisez et exécutez le conteneur afin de pouvoir accéder à l'application dans le navigateur via l'URL `http://localhost:3000`.

## Indice pour le formateur (Solution)
Exécutez le conteneur en utilisant la commande suivante pour mapper correctement le port :
`docker build -t ch1 .`
`docker run -p 3000:3000 ch1`
