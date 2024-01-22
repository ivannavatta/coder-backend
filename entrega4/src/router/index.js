const productInRealTimeController = require('../controllers/productsInRealTime.controller')

const homeController = require('../controllers/home.controller')

const router = app => {
    app.use('/', productInRealTimeController)
    app.use('/', homeController)
}

module.exports = router