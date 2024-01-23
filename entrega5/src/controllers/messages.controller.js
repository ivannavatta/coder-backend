const { Router } = require('express');
const Message = require('../models/messages.model');


const router = Router();



const saveMessage = async () => {
    
    const newMessage = new Message({
        user: 'ivannavatta@gmail.com',
        message: 'probando si funciona el guardado en la base de datos pero harcodeado'
    });

    try {
        const objetoGuardado = await newMessage.save();
        console.log('Objeto guardado con éxito:', objetoGuardado);
    } catch (error) {
        console.error('Este es el error:', error);
    }
};

saveMessage();

module.exports = router;



