const { Router } = require('express')
const passport = require('passport')
const NewTokenDto = require('../DTOs/new-token.dto')

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userInfo = req.user.user
    const user = new NewTokenDto(userInfo)
    if(user) return res.json({ payload: user})
})

module.exports = router