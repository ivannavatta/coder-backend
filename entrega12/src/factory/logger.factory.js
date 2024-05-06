const { environmentLogger } = require('../configs/app.config');

switch (environmentLogger) {
    case 'devLogger':
        console.log('devLogger');
        module.exports = require('../utils/winston/devLogger')
        break;
    case 'prodLogger':
        console.log('prodLogger');
        module.exports = require('../utils/winston/prodLogger')
        break;

    default:
        break;
}