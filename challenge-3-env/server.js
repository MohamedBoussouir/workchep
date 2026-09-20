const express = require('express');
const app = express();
const css = `<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f4f4f9;}.card{padding:2rem;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);text-align:center;max-width:600px;font-size:1.5rem;}.success{background-color:#d1fae5;color:#065f46;border:1px solid #34d399;}.error{background-color:#fee2e2;color:#991b1b;border:1px solid #f87171;}</style>`;

app.get('/', (req, res) => {
    if (process.env.FLAG === 'DOCKER_HERO_2026') {
        res.send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card success">🎉 Bravo ! La variable d'environnement a été injectée avec succès !</div></body></html>`);
    } else {
        res.status(403).send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card error">Le serveur nécessite la variable d'environnement 'FLAG' avec la valeur correcte !</div></body></html>`);
    }
});

app.listen(5000, () => console.log('Server running'));
