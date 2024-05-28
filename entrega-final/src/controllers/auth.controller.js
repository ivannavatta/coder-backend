const { Router } = require('express')
const passport = require('passport')
const userServices = require('../services/users.service')
const { createHash, useValidPassword } = require('../utils/crypt-password.util')


const router = Router()

router.post('/', async (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, ) => {
        if (err) {
            req.logger.error(err.message);
            return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
        if (!user) {
            // Aquí se maneja el caso de usuario no encontrado o contraseña incorrecta
            return res.status(400).json({ status: 'error', error: 'Bad Request' });
        }
        res.cookie('authToken', user, { maxAge: 36000000, httpOnly: true });
        return res.json({ status: 'success', redirect: '/products' });
    })(req, res, next);
});




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
    
    const verifiedEmail = emailExist.email

    if(useValidPassword(emailExist, password)) return res.status(404).json({message: 'la contrasenia es la misma'})
    

    const passwordHash = createHash(password)

    const passwordUpdated = await userServices.updatedOne({email: verifiedEmail}, {password: passwordHash, updateAt: new Date()})

    req.logger.info(passwordUpdated);

    res.redirect('/login')
})


router.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    req.logger.info('cookie eliminada');
    res.redirect('/login')
})

module.exports = router