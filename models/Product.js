const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({

    name: { type: String },
    title: { type: String },
    cost: { type: Number },
    img: { type: String }

});

const Product = mongoose.model("product", productSchema);

module.exports = Product;

