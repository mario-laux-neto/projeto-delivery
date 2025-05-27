import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fileUpload from 'express-fileupload'
import './models/index.js';

import Routes from './routes/index.js';
import { sequelize } from './config/postgres.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const logStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' },
);

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  methods: 'GET,PUT,PATCH,DELETE,POST',
  credentials: true,
}

app.use(cors(corsOptions));
app.use(morgan('combined', { stream: logStream }));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(express.static('public'))
app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
  uriDecodeFileNames: true,
  debug: true, // Certifique-se de que o debug está ativado para obter mais informações
  limits: { fileSize: 50 * 1024 * 1024 } // Limite de 50 MB
}));

Routes(app);
app.use((req, res) => {
  res.status(404).send('404 - página não encontrada');
})

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  const file = req.files.imageProduct; // Substitua 'imageProduct' pelo nome do campo do arquivo
  file.mv(`./public/uploads/${file.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Arquivo enviado com sucesso!');
  });
});

sequelize.authenticate()
  .then(() => {
    console.log('deu boa');
  });

app.listen(process.env.API_PORT, (e) => {
  if (e) {
    return console.log(e);
  }
  console.log(`Rodando na url http://localhost:${process.env.API_PORT}`);
});