const express = require('express');
const path = require('path');

const rootDir = require("../helpers/path");

const router = express.Router();

const products = [];

//Implicit URL => /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: "Add Product", 
        path: "/admin/add-product",
        shopActive: true,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

//Implicit URL => /admin/product => POST
router.post('/product', (req, res, next) => {
    const newProduct = req.body.title;
    console.log('New Product -> ', newProduct);
    products.push(newProduct);
    console.log('Products -> ', products);
    res.redirect('/');
});

module.exports.routes = router;
module.exports.data = products;
