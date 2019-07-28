'esversion: 6';
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();

server.get('/', (request, response) => {
    response.send('Olá Jovem, Bem-vindo!');
});

server.listen(3000, () => {
    console.log('Server start at port 3000!');
    mongoose.connect('localhost:27017', {'useNewUrlParser': true}, () => {
        console.log('Conected to Mongo Database!');
    }).catch((error) => {
        console.log(error);
    });
});
