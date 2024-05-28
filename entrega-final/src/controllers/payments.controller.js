const { Router } = require('express')
const cartsServices = require('../services/carts.service')
const paymentServices = require('../services/payment.servcie')
const checkStockInCart = require('../utils/stock-product.util')
const total = require('../utils/calculate-total.util')

const router = Router()



router.post('/payment-intents/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart =  await cartsServices.findById(cid)
        const { productsInStock } = checkStockInCart(cart)
        console.log("🚀 ~ router.post ~ productsInStock:", productsInStock)
        let productPayment = [];
        for (const product of productsInStock) {
            const data = {
                id: product.product._id,
                name: product.product.name,
                quantity: product.quantity
            }
            productPayment.push(data)
        }
        console.log("🚀 ~ router.post ~ productPayment:", productPayment)
        const totalPrice = total(cart.products)
        console.log("🚀 ~ router.post ~ totalPrice:", totalPrice)
    
        if(productPayment.length === 0) return res.status(404).json({ status: 'Error', message: 'Product not found'})
    
            const response = await paymentServices.paymentIntentInfo(productPayment, totalPrice)
            const clientSecret = response.client_secret;
    
        res.json({ status: 'Success', payload: clientSecret})
        
    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        req.logger.error(error.message)
        res.status(500).json({ status: 'error', error });
    }
        
})

module.exports = router