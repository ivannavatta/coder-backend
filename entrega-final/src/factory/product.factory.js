const { environment } = require('../configs/app.config');
const mongoInitialize = require('../db');
const loggerFactory = require('./logger.factory');

switch (environment) {
    case 'FS':
        loggerFactory.info('factory fs ');
        module.exports = require('../DAO/fs/product-fs.dao')
        break;

        case 'MONGO':
            loggerFactory.info('factory product mongo ');
            mongoInitialize()
            module.exports = require('../DAO/mongo/product-mongo.dao')
        break;

    default:
        break;
}