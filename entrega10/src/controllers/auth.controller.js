const { Router } = require('express')
const passport = require('passport')


const router = Router()

router.post('/', passport.authenticate('login', {failureRedirect: '/auth/fail-login', session: false}), async (req, res) =>{
    try {
        res.cookie('authToken', req.user, {maxAge: 36000000, httpOnly: true})
        res.redirect('/products');
       
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


router.get('/logout', (req, res) => {
    res.clearCookie('authToken');

    // Puedes enviar una respuesta al cliente si lo deseas
    req.logger.info('cookie eliminada');
    res.redirect('/login')
})

module.exports = router