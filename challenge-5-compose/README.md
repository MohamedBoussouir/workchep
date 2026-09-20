# Défi 5 : Compose et persistance des données

Corrigez le fichier de configuration pour exécuter l'application et vérifier la persistance des données.

## Indice pour le formateur (Solution)
Ajoutez `depends_on`, `environment` et `volumes` au service `db`.
Utilisez `volumes` sous `services.db` pour lier le dossier à `pgdata` défini au niveau supérieur.
```yaml
version: '3'
services:
  app:
    build: .
    ports: ["7000:7000"]
    depends_on: [db]
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: 123
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```
