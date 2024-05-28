const authController = require('../controllers/auth.controller')
const cartsController = require('../controllers/carts.controller')
const currentController = require('../controllers/current.controller')
const paymentsController = require('../controllers/payments.controller')
const productsController = require('../controllers/products.controller')
const usersController = require('../controllers/users.controller')
const loggerController = require('../controllers/logger.controller')
const viewsTemplateController = require('../controllers/views-template.controller')
const messagesController = require('../controllers/messages.controller')
const mocksController = require('../controllers/mocks.controller')
const router = app => {
    app.use('/auth', authController)
    app.use('/api/payments', paymentsController)
    app.use('/carts', cartsController)
    app.use('/current', currentController)
    app.use('/products', productsController)
    app.use('/users', usersController)
    app.use('/loggerTest', loggerController)
    app.use('/api/messages', messagesController)
    app.use('/mockingproducts', mocksController)
    app.use('/', viewsTemplateController)
}

module.exports = router