const nodemailer = require('nodemailer')
const { email } = require('../configs/services.config')
const services = require('./constants/services.constants')


const transport = nodemailer.createTransport({
    service: services.EMAIL,
    port: services.PORT,
    auth:{
        user: email.identifier,
        pass: email.password
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})

module.exports = transport