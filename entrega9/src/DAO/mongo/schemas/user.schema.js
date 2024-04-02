const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user',
    },
    cart: {
      
           type: ObjectId,
           ref: 'cart'
  
   },
    githubId: Number,
    githubUsername: String,
    createAt: Date,
    updateAt: Date,
    deleteAt: Date,
})



module.exports = userSchema