const express = require('express');
const handlebars = require('express-handlebars')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { port } = require('./configs/app.config');
const router = require('./router');
const initializePassport = require('./configs/passport.config');
const { Server } = require('socket.io');
const session = require('express-session');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.use(express.static(process.cwd() + '/src/public'))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

const hbs = handlebars.create({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
  
  // Definición del helper multiply
  hbs.handlebars.registerHelper('multiply', function(a, b) {
    return a * b;
  });

router(app)

app.use(errorMiddleware)

const chat = []



const httpServer = app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
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

