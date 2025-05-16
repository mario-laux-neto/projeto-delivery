import express from 'express';
import fs from 'fs';
import path from 'path';

import { dirname  } from 'node:path';
import { fileURLToPath } from 'node:url';
import './models/index.js';
import Routes from './routes/index.js';
import { sequelize } from './config/delivery.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));

Routes(app);
app.use((req, res) => {
    res.status(404).send('404 - página não encontrada');
})

sequelize.authenticate()
.then(() => {
    console.log('deu boa');
});

app.listen(3000, (e) => {
    if (e) {
        return console.log(e);
    }
    console.log(`Rodando na URL http://localhost:3000`)
})

