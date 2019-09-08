const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('../Practice_3/routes/users');
const homeRoutes = require('../Practice_3/routes/home');
const rootDir = require("./helpers/path");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(`${rootDir}/views/404.html`);
});

app.listen(3000);