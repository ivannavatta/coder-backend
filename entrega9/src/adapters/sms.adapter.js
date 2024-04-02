const { sms } = require("../configs/services.config")
const client = require("../utils/twilio.util")


class MessageManager{
   async sendMessage(messageInfo){
     await client.messages.create({
            body: `hola facha ${messageInfo.user}`,
            from: sms.phoneSms,
            to: messageInfo.phone
        })
    }
}

module.exports = MessageManager