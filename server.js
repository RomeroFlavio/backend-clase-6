const express = require('express');
const contenedor = require('./archivos');
const app = express();
const PORT = 8080;

app.get('/productos', (req, res) => {
    contenedor.getAll().then(resp => res.send(resp));
});

app.get('/productoRandom', (req, res) => {
    let numero = 1 + Math.floor(Math.random() * 3);
    contenedor.getById(numero).then(resp => res.send(resp));
});

const server = app.listen(PORT, (req, res) => {
    console.log(`Servidor respondiendo en el puerto: ${server.address().port}`);
});