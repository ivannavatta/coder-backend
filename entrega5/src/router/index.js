const cartsController = require('../controllers/carts.controller')
const chatController = require('../controllers/chat.controller')
const productsController = require('../controllers/products.controller')


const router = app => {
    app.use('/carts', cartsController),
    app.use('/chat', chatController),
    app.use('/products', productsController)
}

module.exports = router