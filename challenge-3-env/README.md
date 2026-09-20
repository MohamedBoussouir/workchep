# Défi 3 : Variable d'environnement manquante

Exécutez le conteneur en transmettant la variable d'environnement `FLAG=DOCKER_HERO_2026`.

## Indice pour le formateur (Solution)
`docker build -t ch3 .`
`docker run -p 5000:5000 -e FLAG=DOCKER_HERO_2026 ch3`
