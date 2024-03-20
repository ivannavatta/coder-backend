const mongoose = require('mongoose')
const cartSchema = require('../schemas/cart.schema')

const cartCollection = 'cart'


const Cart = mongoose.model(cartCollection, cartSchema)


module.exports = Cart