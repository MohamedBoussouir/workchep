const express = require('express');
const Redis = require('ioredis');
const app = express();

const css = `<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f4f4f9;}.card{padding:2rem;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);text-align:center;max-width:650px;font-size:1.5rem;}.success{background-color:#d1fae5;color:#065f46;border:1px solid #34d399;}.error{background-color:#fee2e2;color:#991b1b;border:1px solid #f87171;}</style>`;

const redis = new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: 6379,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null
});

app.get('/', async (req, res) => {
    try {
        const visits = await redis.incr('visits');
        res.send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card success">🎉 Bravo !<br>Défi 8 complété : Le Healthcheck Docker Compose et l'ordonnancement avec <code>condition: service_healthy</code> fonctionnent parfaitement !<br><br><span style="font-size:1.1rem;background:#fff;padding:0.5rem 1rem;border-radius:6px;border:1px solid #a7f3d0;display:inline-block;margin-top:1rem;">Nombre de requêtes enregistrées dans Redis : <strong>${visits}</strong></span></div></body></html>`);
    } catch (e) {
        res.status(503).send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card error">❌ Échec de connexion au service Redis !<br><br><small style="font-size:1rem;color:#7f1d1d;">Erreur : ${e.message}<br><br>Assurez-vous que le service 'redis' dispose d'un <code>healthcheck</code> valide et que le service 'app' spécifie :<br><code>depends_on:<br>&nbsp;&nbsp;redis:<br>&nbsp;&nbsp;&nbsp;&nbsp;condition: service_healthy</code></small></div></body></html>`);
    }
});

app.listen(9000, () => console.log('Server running on 9000'));
