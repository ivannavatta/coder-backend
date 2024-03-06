const { Router } = require('express')
const publicAccess = require('../middlewares/public-acces.middleware')

const router = Router()


router.get('/login', (req, res) =>{
    // const isAuthenticated = req.user !== undefined;
    res.render('login.handlebars', {style: 'style.css'})
})

router.get('/signup', publicAccess, (req, res) =>{
    const isAuthenticated = req.user !== undefined;
    res.render('signup.handlebars', {style: 'style.css', isAuthenticated})
})


module.exports = router