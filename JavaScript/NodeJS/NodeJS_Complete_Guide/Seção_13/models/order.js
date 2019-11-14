const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            product: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
});

OrderSchema.methods.addOrder = function() {
	return this.getCart()
	.then(products => {
		const order = {
			items: products,
			user: {
				_id: new ObjectId(this._id),
				name: this.name
			}
		};
		return db.collection('orders').insertOne(order);
	})
	.then(result => {
		this.cart = {items: []};
		return db.collection('users').updateOne(
			{ _id: userId},
			{ $set: { cart: { items: []} } }
		);
	})
	.catch(err => console.log(err));
};

OrderSchema.methods.getOrders = function() {
	return this.find();
};


module.exports = mongoose.model("Order", OrderSchema);