const db = require('../util/database');

module.exports = class Cart {
    
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        db.execute('SELECT * FROM cart where id = ?', [id])
        .then(([result]) => {
            let cart = result;
            // Add new product / increase quantity
            if(cart) {
                cart.qty = +cart.qty + 1;
                cart.totalPrice = cart.totalPrice + +productPrice;
                db.execute('UPDATE node-complete.cart SET cart.qty = ?, cart.totalPrice = ? WHERE cart.id = ?', 
                [cart.qty, cart.totalPrice, cart.id])
                .then(result => console.log('Product updated with success!'))
                .catch(err => console.log('MySQL Error: ', err));
            } else {
                db.execute('INSERT INTO node-complete.cart (id, qty, totalPrice) VALUES (?, ?, ?)', 
                [id, 1, productPrice])
                .then(result => console.log('Product inserted in the cart with success!'))
                .catch(err => console.log('MySQL Error: ', err));
            }
        })
        .catch(err => console.log('MySQL Error: ', err));
    }

    static deleteProduct(id, productPrice) {
        // Fetch the previous cart
        db.execute('SELECT * FROM cart where id = ?', [id])
        .then(([result]) => {
            let cart = result;
            // Add new product / increase quantity
            if(cart) {
                cart.qty = +cart.qty - 1;
                cart.totalPrice = cart.totalPrice + +productPrice;
                db.execute('UPDATE node-complete.cart SET cart.qty = ?, cart.totalPrice = ? WHERE cart.id = ?', 
                [cart.qty, cart.totalPrice, cart.id])
                .then(result => console.log('Product updated with success!'))
                .catch(err => console.log('MySQL Error: ', err));
            } else {
                db.execute('INSERT INTO node-complete.cart (id, qty, totalPrice) VALUES (?, ?, ?)', 
                [id, 1, productPrice])
                .then(result => console.log('Product inserted in the cart with success!'))
                .catch(err => console.log('MySQL Error: ', err));
            }
        })
        .catch(err => console.log('MySQL Error: ', err));
    }

    static getCart(callback) {
        return db.execute('SELECT * FROM cart');
    }
};