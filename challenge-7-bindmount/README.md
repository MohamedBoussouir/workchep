# Défi 7 : Bind Mount & Configuration dynamique

Les **Bind Mounts** permettent de monter un fichier ou un dossier de la machine hôte directement dans le système de fichiers d'un conteneur en cours d'exécution. Ils sont indispensables pour le développement en direct (live reload) et l'injection de fichiers de configuration sans avoir à reconstruire l'image.

## Problème
L'application démarre mais échoue avec une erreur `404` car elle attend un fichier de configuration situé dans `/app/config/app-config.json`. Ce dossier n'est pas intégré dans l'image.

## Exigences
1. Construisez l'image Docker avec le tag `ch7`.
2. Lancez le conteneur en montant le dossier local `config` de votre machine hôte vers `/app/config` à l'intérieur du conteneur en mode lecture seule (`:ro`).
3. Mappez le port `8080:8080`.
4. Ouvrez `http://localhost:8080` dans votre navigateur et vérifiez la bonne lecture de la configuration.

## Solution
Commandes :
```bash
docker build -t ch7 .
docker run -d -p 8080:8080 -v "$(pwd)/config:/app/config:ro" --name ch7-app ch7
```

Ou avec la syntaxe moderne `--mount` :
```bash
docker run -d -p 8080:8080 --mount type=bind,source="$(pwd)/config",target=/app/config,readonly --name ch7-app ch7
```
