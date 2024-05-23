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
const logger = require('./middlewares/logger.middleware');
const loggerFactory = require('./factory/logger.factory');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express')


const app = express()

app.use(logger)
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
  const swaggerOptions = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'La docu',
        description: 'La docu de la API',
      },
    },
    apis: [ process.cwd() + '/src/docs/**/*.yaml'],
  }
  
  const specs = swaggerJSDoc(swaggerOptions)
  app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

router(app)

app.use(errorMiddleware)

const chat = []



const httpServer = app.listen(port, () => {
    loggerFactory.info(`Server running at port: ${port}`);
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

