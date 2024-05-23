const { Router } = require('express')
const passport = require('passport')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')
const userServices = require('../services/users.service')
const cron = require('node-cron')
const router = Router()

router.get('/', async (req, res) => {
    const users = await userServices.getAll()
    res.status(200).json({status: 'success', payload: users})
})

router.get('/:uid', async (req, res) => {
    const { uid } = req.params
    const user = await userServices.findById(uid)
    res.status(200).json({status: 'success', payload: user})
})

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
        req.logger.error(error.message)
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

router.patch('/premium/:uid', async (req, res) => {
    try {
        const { uid } = req.params
    
        const user = await userServices.findById(uid)
        
        if(user.role === 'premium'){
            user.role = 'user'
             await user.save()
        }
        else if(user.role === 'user'){
            user.role = 'premium'
             await user.save()
        }
        else{
           return res.json({ status: 'error', message: 'The user does not have a premium or user role'})
        }
    
        res.status(200).json({ status: 'success', message: 'User change role '})
        
    } catch (error) {
        req.logger.error(error)
        res.status(500).json({ status: 'error', message: 'Internal Server Error'})
    }
})

cron.schedule('0 * * * *', async () => {
    console.log('se ejecuto correctamente el cron job');
        try {
            const days = 2880 // 2 dias
            const inactiveUsers = await userServices.deleteInactiveUsers(days); // Cambia a 2880 para dos días
            res.status(200).json({ status: 'success', message: 'Inactive users deleted', payload: inactiveUsers });
        } catch (error) {
            req.logger.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
})
//para tmb tener activacion manual
router.delete('/inactive', async (req, res) => {
    try {
        const days = 2880 // 2 dias
        const inactiveUsers = await userServices.deleteInactiveUsers(days);
        res.status(200).json({ status: 'success', message: 'Inactive users deleted', payload: inactiveUsers });
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

router.delete('/:uid', async (req, res) => {
    try {
        const { uid } = req.params
        const deleteUser = await userServices.deleted(uid)
        res.status(200).json({ status: 'success', message: ' user deleted', payload: deleteUser });
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});


module.exports = router