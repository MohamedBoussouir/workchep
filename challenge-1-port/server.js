const express = require('express');
const app = express();
const css = `<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f4f4f9;}.card{padding:2rem;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);text-align:center;max-width:600px;font-size:1.5rem;}.success{background-color:#d1fae5;color:#065f46;border:1px solid #34d399;}</style>`;

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card success">🎉 Bravo ! Exercice réussi avec succès.<br>Défi 1 complété : Félicitations, vous avez correctement mappé le port du conteneur vers votre machine !</div></body></html>`);
});

app.listen(3000, () => console.log('Server running on 3000'));
