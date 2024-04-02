const { Router } = require('express')
const passport = require('passport')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')
const userServices = require('../services/users.service')
const router = Router()

router.get('/user-cart', authenticateJWT, async (req, res) => {
    const uid = req.user.user.id
    const userCart = await userServices.findById(uid)
     res.json({ payload: userCart.cart})
})

router.post('/', passport.authenticate('register', {failureRedirect: '/users/fail-register', session: false}), async (req, res) => {
    try {
        res
        .status(201)
        .json({ status: 'Success', message: 'User created'})
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.log(error);
        res
        .status(500)
        .json({ status: 'Error', error: 'Internal Server Error'})
    }
   
})

router.get('/fail-register', (req, res) => {
    res
    .status(400)
    .json({ status: 'error', error: 'Bad request'})
})


module.exports = router