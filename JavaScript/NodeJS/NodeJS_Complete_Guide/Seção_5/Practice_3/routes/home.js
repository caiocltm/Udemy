const express = require('express');
const path = require('path');

const rootDir = require("../helpers/path");

const router = express.Router();

//Implicit URL => / => GET
router.get('/', (req, res, next) => {
    res.sendFile(`${rootDir}/views/home.html`);
});

module.exports = router;
