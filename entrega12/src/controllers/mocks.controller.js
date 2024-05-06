const { Router } = require('express')
const generateProducts = require('../utils/facker.util')

const router = Router()

router.get('/', ( req, res) => {
    const product = generateProducts()
    res.json({ message: product})
})

module.exports = router