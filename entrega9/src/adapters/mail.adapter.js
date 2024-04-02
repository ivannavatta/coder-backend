const { email } = require("../configs/services.config");
const transport = require("../utils/nodeMailer.util");

class MessageManager{
   async sendMessage(messageInfo){
    console.log('mail enviado con exito');
    await transport.sendMail({
        from: email.identifier,
        to: messageInfo.email,
        subject: 'Bienvenido a iZenStore',
        html: `
        <div>
        <h1>Gracias por realizar tu compra: ${messageInfo.first_name}
        </div>
       
        `,
       
    })
    }
}

module.exports = MessageManager