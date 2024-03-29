const { Router } = require('express')
const passport = require('passport')
const { generateToken } = require('../utils/jwt.util')

const router = Router()

router.post('/', passport.authenticate('login', {failureRedirect: '/auth/fail-login'}), (req, res) =>{
    try {
        console.log('--------');
        const userToken = {
            id: req.user.id,
            role: req.user.role
        }
        console.log(userToken);

        const token = generateToken(userToken)

        res.cookie('authToken', token, {maxAge: 6000, httpOnly: true}).json({ status: 'success', payload: 'Logged in'})

        res.redirect('/products')
    } catch (error) {
        console.log(error);
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

// router.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if(err) {
//             return res.json({ success: false, message: err });
//         }
//         res.json({ success: true, message: 'Sesión destruida correctamente' });
//     });
// })

router.get('/github', passport.authenticate('github', {scope: ['user: email']}), (req, res) =>{

})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) =>{
    
    res.redirect('/products')
})


module.exports = router