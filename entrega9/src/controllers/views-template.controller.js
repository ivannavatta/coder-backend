const { Router } = require('express')
const authorization = require('../middlewares/authenticateRole.middleware')


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



module.exports = router