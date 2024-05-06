const mongoose = require('mongoose');
const { dbUser, dbPassword, dbName } = require('../configs/app.config');
const loggerFactory = require('../factory/logger.factory');

const mongoInitialize = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbName}/Segunda-pre-entrega?retryWrites=true&w=majority&appName=Cluster0`)
        loggerFactory.info('Db is connected');
    } catch (error) {
        loggerFactory.error(error.message)
    }
}

module.exports = mongoInitialize