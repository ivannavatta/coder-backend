const { environment } = require('../configs/app.config');
const mongoInitialize = require('../db');

switch (environment) {
    case 'FS':
        console.log('factory fs ');
        module.exports = require('../DAO/fs/product-fs.dao')
        break;

        case 'MONGO':
            console.log('factory product mongo ');
            mongoInitialize()
            module.exports = require('../DAO/mongo/product-mongo.dao')
        break;

    default:
        break;
}