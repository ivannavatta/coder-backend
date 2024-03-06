const express = require('express')
const { port } = require('./configs/server.config')
const cookieParser = require('cookie-parser')
const  handlebars  = require('express-handlebars')
const router = require('./router')
const mongoConnect = require('./db')
const initializePassport = require('./configs/passport.config')
const passport = require('passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(process.cwd() + '/src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

router(app)

mongoConnect()


app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})