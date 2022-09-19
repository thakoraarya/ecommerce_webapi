const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    order: { type: String, reuireed: true, unique: true },
    owner: {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Item',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart;