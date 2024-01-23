const mongoose = require('mongoose')

const productCollection = 'products'

const prodcutShema = new mongoose.Schema({
    name:  String,
    description: String,
    price:  Number,
    status: {
        type: Boolean,
        default: true
      },
    createdAt: Date,
    updatedAt: Date
})

const Product = mongoose.model(productCollection, prodcutShema)

module.exports = Product