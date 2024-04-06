require('dotenv').config()

module.exports = {
    email: {
        identifier: process.env.EMAIL_IDENTIFIER,
        password: process.env.EMAIL_PASSWORD
    },
    sms: {
        twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
        twilioPhoneSms: process.env.TWILIO_PHONE_NUMBER
    }
}