const express = require('express');
const handlebars = require('express-handlebars')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { port } = require('./configs/app.config');
const router = require('./router');
const mongoInitialize = require('./db');
const initializePassport = require('./configs/passport.config');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd() + '/src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())



router(app)

mongoInitialize()


app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})