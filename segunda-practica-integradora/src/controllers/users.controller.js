const { Router } = require('express')
const passport = require('passport')
const userDao = require('../dao/mongo/user-dao.mongo')

const User = new userDao()

const router = Router()

router.post('/', passport.authenticate('register', {failureRedirect: '/users/fail-register'}), async (req, res) => {
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

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { cartId } = req.body

        const user = await User.findUser({ _id: id })
        user.carts.push({cart: cartId})

        

         const userUpdated = await User.updateOneDao({_id: id}, user)
        res
        .json({status: 'succes', payload: userUpdated})
       } catch (error) {
        console.log(error);
        res
        
        .json({ status: 'error', error})
       }
 })
module.exports = router
