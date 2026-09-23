const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const css = `<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f4f4f9;}.card{padding:2rem;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);text-align:center;max-width:650px;font-size:1.5rem;}.success{background-color:#d1fae5;color:#065f46;border:1px solid #34d399;}.error{background-color:#fee2e2;color:#991b1b;border:1px solid #f87171;}</style>`;

const configPath = path.join('/app', 'config', 'app-config.json');

app.get('/', (req, res) => {
    try {
        if (!fs.existsSync(configPath)) {
            return res.status(404).send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card error">⚠️ Fichier de configuration manquant !<br>Le serveur cherche <code>${configPath}</code>.<br><br><small style="font-size:1rem;">Astuce : Montez le dossier local <code>./config</code> avec un Bind Mount :<br><code>-v $(pwd)/config:/app/config:ro</code></small></div></body></html>`);
        }

        const raw = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(raw);

        if (config.mode === 'PRODUCTION_VERIFIED') {
            return res.send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card success">🎉 Bravo !<br>Défi 7 complété : Le volume Bind Mount est correctement attaché !<br><br><div style="font-size:1.1rem;text-align:left;background:#fff;padding:1rem;border-radius:6px;border:1px solid #a7f3d0;"><strong>Mode :</strong> ${config.mode}<br><strong>Mainteneur :</strong> ${config.maintainer}<br><strong>Fonctionnalités :</strong> ${config.features.join(', ')}</div></div></body></html>`);
        } else {
            return res.status(400).send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card error">Valeur de 'mode' invalide dans la configuration !</div></body></html>`);
        }
    } catch (e) {
        return res.status(500).send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card error">Erreur lors de la lecture du fichier : ${e.message}</div></body></html>`);
    }
});

app.listen(8080, () => console.log('Server running on 8080'));
