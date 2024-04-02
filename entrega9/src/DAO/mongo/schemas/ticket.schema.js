const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    amount: Number,
    purchaser: String,
    purchase_datetime: Date,
})

module.exports = ticketSchema