const express = require('express');
const path = require('path');

const rootDir = require("../helpers/path");

const router = express.Router();

//Implicit URL => /admin/users => GET
router.get('/users', (req, res, next) => {
    res.sendFile(`${rootDir}/views/users.html`);
});

module.exports = router;
