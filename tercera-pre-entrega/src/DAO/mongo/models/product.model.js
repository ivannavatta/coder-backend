const mongoose = require('mongoose')
const productSchema = require('../schemas/product.schema')

const productCollection = 'product'

const Product = mongoose.model(productCollection, productSchema)


module.exports = Product