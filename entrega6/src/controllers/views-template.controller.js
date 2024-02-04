const { Router } = require('express')

const router = Router()

router.get('/login', (req, res) => {
    res.render('login.handlebars', {style: 'style.css'})
})

router.get('/signup', (req, res) => {
    res.render('signup.handlebars', {style: 'style.css'})
})

module.exports = router