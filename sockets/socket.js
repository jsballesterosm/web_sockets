const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Pantera'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado', new Date());

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado', new Date());
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);

        io.emit('mensaje', { admin: 'nuevo mensajes' });
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        // enviamos a todo el mundo el cambio de informaicon
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        // enviamos a todo el mundo el cambio de informaicon
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        // enviamos a todo el mundo el cambio de informaicon
        io.emit('active-bands', bands.getBands());
    });

    /*client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload); // emite el mensaje a todos
        client.broadcast.emit('nuevo-mensaje', payload); // emite el mensaje a todos menos al que lo emitio
    });*/
});