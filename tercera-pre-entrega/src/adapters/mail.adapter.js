const { email } = require("../configs/services.config");
const transport = require("../utils/nodeMailer.util");

class MessageManager{
   async sendMessage(messageInfo){
    console.log('mail enviado con exito');
    await transport.sendMail({
        from: email.identifier,
        to: messageInfo.email,
        subject: 'Bienvenidos al himalaya',
        html: `
        <div>
        <h1>que pasa bot: ${messageInfo.first_name}
        </div>
       
        `,
       
    })
    }
}

module.exports = MessageManager