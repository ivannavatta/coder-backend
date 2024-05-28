const { Router } = require('express')
const authorization = require('../middlewares/authenticateRole.middleware')
const sessionTimeout = require('../middlewares/accessOneHour.middleware')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')



const router = Router()

router.get('/login', (req, res) =>{
    
    res.render('login.handlebars', {style: 'style.css', isAuthenticate: null})
})

router.get('/signup', (req, res) =>{
    
    res.render('signup.handlebars', {style: 'style.css', isAuthenticate: null})
})

router.get('/chat', authorization('user'), (req, res) => {
    res.render('chat.handlebars')
})

router.get('/admin-panel', authorization('admin'), (req, res) => {
    const admin = req.user.user.role ? req.user.user.role === 'admin' : null
    res.render('admin-panel.handlebars', {style: 'style.css', isAuthenticate: true, admin})
})


router.get('/send-email', (req, res) => {
    res.render('send-email.handlebars', {style: 'style.css'})
})

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password.handlebars', {style: 'style.css'})
})

router.get('/restart-password', sessionTimeout,  (req, res) => {
    res.render('restart-password.handlebars', {style: 'style.css'})
})

router.get('/payment', authenticateJWT, (req, res) => {
    res.render('payment.handlebars', {style: 'style.css'})
})



module.exports = router