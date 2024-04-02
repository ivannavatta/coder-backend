const { environmentMessage } = require('../configs/app.config')

switch (environmentMessage) {
  case 'dev':
    console.log('Vamos a usar nodemailer')
    module.exports = require('../adapters/mail.adapter')
    break

  case 'prod':
    console.log('Vamos a usar twilio')
    module.exports = require('../adapters/sms.adapter')
    break

  default:
    break
}