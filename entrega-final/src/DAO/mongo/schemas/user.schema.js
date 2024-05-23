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
      enum: ['user', 'premium', 'admin', 'superAdmin'],
      default: 'user',
    },
    status: {
      type: Boolean,
      default: true
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
    lastConexion: {
      type: Date,
      default: Date.now
    }
})



module.exports = userSchema