const Message = require("./models/messages.model");
const app = require("./server");
const { Server } = require('socket.io')

const PORT = 3001

const chat = []

app.post('/api/messages', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = new Message({ user, message });
        await newMessage.save();
        io.emit('newMessage', newMessage); // Emite el nuevo mensaje a todos los clientes conectados
        res.status(201).json({ success: true, message: 'Mensaje guardado con éxito' });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})

const io = new Server(httpServer)

io.on('connection', socket => {
    socket.on('newUser', data =>{
        socket.broadcast.emit('userConnected', data)
        socket.emit('messagesLogs', chat)
    })

    socket.on('messages', data =>{
        chat.push(data)

        io.emit('messagesLogs', chat)
    })
})

