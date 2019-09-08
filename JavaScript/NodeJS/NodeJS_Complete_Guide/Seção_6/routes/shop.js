const express = require("express");
const path = require("path");

const rootDir = require("../helpers/path");
const admin = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
	const products = admin.data;
	res.render("shop", { 
        products: products, 
        pageTitle: "Shop", 
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
	console.log("Admin Data -> ", admin.data);
});

module.exports = router;
