const express = require('express');
const path = require('path');
require('dotenv').config();

// App Express
const app = express();

// Node Server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);

        io.emit('mensaje', { admin: 'nuevo mensajes' });
    });
});

// Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath))


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto !!!!', process.env.PORT);
});