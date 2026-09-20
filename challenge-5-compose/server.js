const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.urlencoded({extended:true}));
const css = `<style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f4f4f9;}.card{padding:2rem;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);text-align:center;max-width:600px;font-size:1.5rem;}.success{background-color:#d1fae5;color:#065f46;border:1px solid #34d399;}</style>`;

const getClient = () => new Client({host:'db', user:'postgres', password:'123', database:'postgres'});

app.get('/', async (req, res) => {
    const client = getClient();
    try {
        await client.connect();
        await client.query('CREATE TABLE IF NOT EXISTS items (data text)');
        const result = await client.query('SELECT * FROM items');
        await client.end();
        res.send(`<!DOCTYPE html><html><head>${css}</head><body><div class="card success">🎉 أحسنت!<br>تحدي 5 مكتمل: تم إعداد Compose والتخزين المستمر بنجاح!<br>البيانات: ${JSON.stringify(result.rows)}<form method=POST action=/add><input name=item><button>Submit</button></form></div></body></html>`);
    } catch(e) { res.status(500).send(e.toString()); }
});

app.post('/add', async (req,res) => {
    const client = getClient();
    await client.connect();
    await client.query('INSERT INTO items VALUES ($1)', [req.body.item]);
    await client.end();
    res.redirect('/');
});
app.listen(7000);
