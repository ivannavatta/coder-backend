const mongoose = require('mongoose')

const messageShema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    message: String,
    createdAt: Date,
})


module.exports = messageShema