const { email } = require("../configs/services.config");
const loggerFactory = require("../factory/logger.factory");
const transport = require("../utils/nodeMailer.util");

class MessageManager{
   async sendMessage(messageInfo){
    loggerFactory.info('mail enviado con exito');
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

    async restartPassword(gmail, user){
    loggerFactory.info('mail enviado con exito');
    await transport.sendMail({
        from: email.identifier,
        to: gmail,
        subject: 'Reset Password',
        html: `
        <div>
        Dear ${user},
        <div>

        We have received a request to reset the password associated with your account. If you did not make this request, please disregard this email. Otherwise, please use the following link to reset your password:

        <div>
        <a href="http://localhost:3001/restart-password" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Password Reset Link</a>
        </div>

        This link will expire in <b> 1 hour </b>. If you encounter any issues or need further assistance, please don't hesitate to contact our support team.
        <div>
        Best regards,
        iZenStore
        </div>
        `
    })
    }

    async sendDeletion(emails) {
    
    for (const email of emails) {
        await transport.sendMail({
            from: email.identifier,
            to: email,
            subject: 'Cuenta eliminada por inactividad',
            text: 'Tu cuenta ha sido eliminada por inactividad durante más de 2 días.'
        });
    }
};

    async sendDeletionProduct(email, productOwner) {
    
   
        await transport.sendMail({
            from: email.identifier,
            to: productOwner,
            subject: 'Producto eliminado',
            text: `Tu producto ha sido eliminado por ${email}`
        });
    
};
}

module.exports = MessageManager