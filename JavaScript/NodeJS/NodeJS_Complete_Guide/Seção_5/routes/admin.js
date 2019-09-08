const express = require('express');
const path = require('path');

const rootDir = require("../helpers/path");

const router = express.Router();

//Implicit URL => /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(`${rootDir}/views/add-product.html`);
});

//Implicit URL => /admin/product => POST
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
