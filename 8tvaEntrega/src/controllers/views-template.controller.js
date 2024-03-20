const { Router } = require('express')

const router = Router()

router.get('/login', (req, res) =>{
    
    res.render('login.handlebars', {style: 'style.css', isAuthenticate: null})
})

router.get('/signup', (req, res) =>{
    
    res.render('signup.handlebars', {style: 'style.css', isAuthenticate: null})
})

module.exports = router