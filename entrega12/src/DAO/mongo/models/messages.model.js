const mongoose = require('mongoose')
const messageShema = require('../schemas/messages.schema')

const messageCollection = 'messages'


const Message = mongoose.model(messageCollection, messageShema)

module.exports = Message