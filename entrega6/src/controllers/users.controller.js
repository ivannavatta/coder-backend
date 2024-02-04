const { Router } = require('express')
const User = require('../model/user.model')

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { first_name, last_name , email, password } = req.body
        console.log(req.body);

        const newUserInfo = {
            first_name,
            last_name,
            email,
            password
        }
        console.log(newUserInfo);
    const user = await User.create(newUserInfo)


    res.json({ status: 'success', message: user})
    } catch (error) {
        res.json({ status: 'error', 'error': error})
    }
    
})

module.exports = router