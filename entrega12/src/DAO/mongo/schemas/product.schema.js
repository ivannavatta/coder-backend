const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    owner: {
        email: {
            type: String,
            default: 'admin'
        }
    },
    createAt: Date,
    updateAt: Date,
    deleteAt: Date,
})

productSchema.plugin(mongoosePaginate)

module.exports = productSchema