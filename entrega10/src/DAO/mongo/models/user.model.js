const mongoose = require('mongoose')
const userSchema = require('../schemas/user.schema')

const userCollection = 'user'


const User = mongoose.model(userCollection, userSchema)

module.exports = User