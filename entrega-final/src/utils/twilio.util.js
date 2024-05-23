const twilio = require('twilio')
const { sms } = require('../configs/services.config')


const client = twilio(sms.accountSid, sms.authToken)

module.exports = client