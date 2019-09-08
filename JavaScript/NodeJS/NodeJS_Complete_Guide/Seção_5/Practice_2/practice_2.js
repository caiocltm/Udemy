const express = require('express');

const app = express();

const handler = () => "<h1>Very nice!!!!</h1>";

app.use('/practice', (req, res, next) => {
    console.log("Welcome, time to practice!");
    res.send("<h1>Welcome, time to practice!</h1>");
    next();
});

app.use('/users', (req, res, next) => res.send(handler()));

app.use('/', (req, res, next) => res.send(handler()));

app.listen(3000);