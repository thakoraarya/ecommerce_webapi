const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    UserId: { type: String, reuireed: true, unique: true },
    products: [{
        productId: { type: String },
        quanty: { type: Number, default: 1 },
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema)