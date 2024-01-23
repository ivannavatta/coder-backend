const mongoose = require('mongoose')

const messageCollection = 'messages'

const messageShema = new mongoose.Schema({
    user:{
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
    },
    message: String,
    createdAt: Date,
})

const Message = mongoose.model(messageCollection, messageShema)

module.exports = Message