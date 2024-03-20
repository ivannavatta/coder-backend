const mongoose = require('mongoose');
const { dbUser, dbPassword, dbName } = require('../configs/app.config');

const mongoInitialize = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbName}/Segunda-pre-entrega?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Db is connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoInitialize