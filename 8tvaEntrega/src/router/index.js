const authController = require('../controllers/auth.controller')
const cartsController = require('../controllers/carts.controller')
const productsController = require('../controllers/products.controller')
const usersController = require('../controllers/users.controller')
const viewsTemplateController = require('../controllers/views-template.controller')

const router = app => {
    app.use('/auth', authController)
    app.use('/carts', cartsController)
    app.use('/products', productsController)
    app.use('/users', usersController)
    app.use('/', viewsTemplateController)
}

module.exports = router