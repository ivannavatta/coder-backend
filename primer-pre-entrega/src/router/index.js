const productsController = require('../controllers/products.controller')
const cartController = require('../controllers/cart.controller')

const router = app => {
    app.use('/api/products', productsController)
    app.use('/api/cart', cartController)
}

module.exports = router