const { Router } = require('express')
const passport = require('passport')
const userServices = require('../services/users.service')
const { createHash, useValidPassword } = require('../utils/crypt-password.util')


const router = Router()

router.post('/', passport.authenticate('login', {failureRedirect: '/auth/fail-login', session: false}), async (req, res) =>{
    try {
        res.cookie('authToken', req.user, {maxAge: 36000000, httpOnly: true})
        res.status(200).json({status: 'success', payload: 'The user logged in'})
       
    } catch (error) {
        req.logger.error(error.message)
        res
        .status(500)
        .json({ status: 'error', error: 'Interal Server Error'})
    }
    

})

router.get('/fail-login', (req, res) => {
    res
    .status(400)
    .json({ status: 'error', error: 'Bad request'})
})



router.get('/github', passport.authenticate('github', { scope: ['user: email'], session: false }));

router.get('/githubcallback', 
  passport.authenticate('github', { failureRedirect: '/login', session: false }), 
  (req, res) => {
    res.cookie('authToken', req.user);
    res.redirect('/products');
  }
);


router.post('/forgot-password',  async (req, res) => {
    const email = req.body.email
    const user = req.body.user

    const emailExist = await userServices.find({email: email})

    if(!emailExist) return res.status(404).json({message: 'Bad Request'})

    await userServices.restartPassword(email, user)
    res.redirect('/send-email')

})

router.post('/restart-password', async (req, res) => {
    const { email, password } = req.body

    const emailExist = await userServices.find({email: email})

    if(!emailExist) return res.status(404).json({message: 'Bad Request'})
    console.log("🚀 ~ router.get ~ emailExist:", emailExist)

    const verifiedEmail = emailExist.email

    if(useValidPassword(emailExist, password)) return res.status(404).json({message: 'la contrasenia es la misma'})
    

    const passwordHash = createHash(password)

    const passwordUpdated = await userServices.updatedOne({email: verifiedEmail}, {password: passwordHash})

    req.logger.info(passwordUpdated);

    res.redirect('/login')
})


router.get('/logout', (req, res) => {
    res.clearCookie('authToken');

    // Puedes enviar una respuesta al cliente si lo deseas
    req.logger.info('cookie eliminada');
    res.redirect('/login')
})

module.exports = router