const { environmentMessage } = require('../configs/app.config')
const loggerFactory = require('./logger.factory')

switch (environmentMessage) {
  case 'dev':
    loggerFactory.info('Vamos a usar nodemailer')
    module.exports = require('../adapters/mail.adapter')
    break

  case 'prod':
    loggerFactory.info('Vamos a usar twilio')
    module.exports = require('../adapters/sms.adapter')
    break

  default:
    break
}