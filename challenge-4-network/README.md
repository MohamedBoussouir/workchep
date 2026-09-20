# Défi 4 : Réseau Docker et DNS

Ouvrez `http://localhost:6000` et connectez les deux conteneurs.

## Indice pour le formateur (Solution)
`docker network create my-net`
`docker run -d --name db --network my-net -e POSTGRES_PASSWORD=123 postgres`
`docker build -t ch4 .`
`docker run -p 6000:6000 --name app --network my-net -e DB_HOST=db ch4`
