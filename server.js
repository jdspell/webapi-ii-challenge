const express = require('express');

const dbRouter = require('./data/dbRouter.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send(`<h2>Hi from the API!</h2>`);
});

server.use('/api/posts', dbRouter);


module.exports = server;