const dns = require('node:dns');
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Carga las rutas desde /routes/index.js
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(`Caught exception: ${err}\n` + `Exception origin:${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Database is listening and node running on port ${PORT}`);
        });
    }
});