const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    owner: { type: String, reuireed: true, unique: true },
    name: { type: String, reuireed: true, unique: false },
    description: { type: String, reuireed: true },
    category: { type: array },
    price: { type: number, reuireed: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Item", ProductSchema)