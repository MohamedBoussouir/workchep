# Défi 8 : Healthchecks & Ordonnancement dans Docker Compose

Par défaut dans Docker Compose, la directive `depends_on: [service]` attend uniquement que le conteneur cible soit créé et démarré au niveau de l'OS. Elle n'attend **pas** que le processus interne (base de données, Redis, etc.) ait terminé son initialisation et soit capable d'accepter des connexions réseau. Cela provoque souvent des erreurs de type `ECONNREFUSED` au démarrage de l'application cliente.

## Problème
Dans le fichier `docker-compose.yml`, le service `app` dépend de `redis`. Cependant, en l'absence de vérification d'état (`healthcheck`) sur Redis et sans condition `service_healthy`, l'application risque d'échouer lors de ses requêtes initiales.

## Exigences
1. Ajoutez une directive `healthcheck` au service `redis` dans `docker-compose.yml` en utilisant la commande `redis-cli ping`.
2. Mettez à jour la directive `depends_on` du service `app` pour exiger la condition `condition: service_healthy`.
3. Lancez la stack avec `docker compose up -d --build`.
4. Accédez à l'application via `http://localhost:9000` et rechargez la page pour vérifier l'incrémentation du compteur Redis.

## Indice pour le formateur (Solution)
Fichier `docker-compose.yml` corrigé :
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "9000:9000"
    environment:
      - REDIS_HOST=redis
    depends_on:
      redis:
        condition: service_healthy

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
```

Commandes de test :
```bash
docker compose up -d --build
# Observez l'état HEALTHY
docker compose ps
curl http://localhost:9000
```
