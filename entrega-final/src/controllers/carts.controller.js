const { Router } = require('express')
const cartsServices = require('../services/carts.service')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')
const authorization = require('../middlewares/authenticateRole.middleware')
const productServices = require('../services/products.service')
const userServices = require('../services/users.service')
const total = require('../utils/calculate-total.util')
const checkStockInCart = require('../utils/stock-product.util')

const router = Router()

router.get('/', async (req, res) => {
    try {
    const Carts = await cartsServices.getAll()
    res.json({ status: 'success', payload: Carts})
    } catch (error) {
        req.logger.error(error.message)
        res.json({ status: 'error', error})  
    }
   
})

router.get('/:cid',authenticateJWT, async (req, res) => {
    try {
        const { cid } = req.params;
        const cartById = await cartsServices.findById(cid);

        if (!cartById) {
            return res.status(404).json({ error: 'El carrito con el ID buscado no existe.' });
        } else {
            
            const totalPrice = total(cartById.products)
            res.render('cart.handlebars', {
                isAuthenticate: true,
                cartById,
                totalPrice,
                style: 'style.css',
            });
        }
    } catch (error) {
        req.logger.error(error.message)
        res
        .status(500)
        .json({ status: 'error', error });
    }
});

router.get('/:cid/check-stock', authenticateJWT, async (req, res) => {
    try {
        const { cid } = req.params
        const cart =  await cartsServices.findById(cid)
        if (!cart) {
            return res.status(404).json({ error: 'Error a ver la orden de compra.'})
        } 
        const { productsInStock, productsOutOfStock } = checkStockInCart(cart)
        const totalPrice = total(productsInStock)
        if(productsOutOfStock.length){
            req.session.productsOutOfStock = productsOutOfStock;   

            await cartsServices.productOutStockCart(cid, productsOutOfStock )
        }
         const productsOutOfStockSession = req.session.productsOutOfStock || [];
       
        const user = req.user.user.first_name
        res.render ('stock.handlebars', { 
            style: 'style.css',
            productsInStock,
            productsOutOfStockSession,
            cart,
            user,
            totalPrice
        })
        // Destruir la sesión
        function destroy(){
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error al cerrar sesión:', err);
                    res.status(500).send('Error al cerrar sesión');
                }
            });
        }

        setTimeout(destroy, 3000)
        
    } catch (error) {
        req.logger.error('Error al obtener el ticket:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:cid/purchase', authenticateJWT, async (req, res) => {
    try {
        const user = req.user.user.first_name
        res.render ('ticket.handlebars', { 
            style: 'style.css',
            user,
        })
    
    } catch (error) {
        req.logger.error('Error al obtener el ticket:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.post('/:cid/purchase', authenticateJWT, async (req, res) =>{
    try {
                const { cid } = req.params;
                
                const cart = await cartsServices.findById(cid);
              
                let { productsInStock } = checkStockInCart(cart)
              
                    
                    await productServices.checkStock(productsInStock);
                    
                    const totalPrice = total(cart.products)
                    const uid = req.user.user.id
                    const userEmail = await userServices.findById(uid)
                
                    const ticket = await cartsServices.createTicket(totalPrice, userEmail)
                    const messageInfo = req.user.user
                    await userServices.sendMessage(messageInfo)
                    res.json({status: 'Success', redirect: `/carts/${cid}/purchase`});
                    
                    await cartsServices.saveCart(cid)
                
                
                
            } catch (error) {
                console.log("🚀 ~ router.post ~ error:", error)
                req.logger.error(error.message)
                res.status(500).json({ status: 'error', error });
            }
        });

router.post('/', async (req, res) => {
    try {
       const cart =  await cartsServices.create()
        res
        .status(201)
        .json({ status: 'success', payload: cart})
    } catch (error) {
        req.logger.error(error.message)
        res.json({ status: 'error', error})
    }
   
})


router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params
        const { stock } = req.body
    const productUpdated = await cartsServices.updatedProductStock(cid, pid, stock)
  
        res.json({ status: 'success', payload: productUpdated });
   
    } catch (error) {
        req.logger.error(error.message)
        res.json({ status: 'error', error})
    }
    
})


router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const  {products } = req.body
       
    const productUpdated = await cartsServices.updatedProductCart(cid, products)
  
        res.json({ status: 'success', payload: productUpdated });
   
    } catch (error) {
        req.logger.error(error.message)
        res.json({ status: 'error', error})
    }
    
})
//agregar productos
router.patch('/:cid', authorization(['user', 'premium']), async (req, res) => {
    try {
        const { cid } = req.params
        const { productid } = req.body
    
        const product = await productServices.findById(productid)
       
        const productOwner = product.owner.email
    
        const userOwner = req.user.user.email
    
        if(productOwner === userOwner){
            return res.status(200).json({ message: 'you cannot add your products to the cart'})
        }
         const cartUpdated = await cartsServices.addProduct( cid, productid)
        res
        
        .status(200)
        .json({status: 'success', payload: cartUpdated})
        
    } catch (error) {
        req.logger.error(error.message)
    }
   
       
 })

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params

        const productRemoved = await cartsServices.delateOneProductInCart(cid, pid)
   
        res.json({ status: 'success', payload: productRemoved });
  
    } catch (error) {
        req.logger.error(error.message)
        res.json({ status: 'error', message: error})
    }
    
})

router.delete('/:cid', async (req, res) =>{
    try {
            const { cid } = req.params

            const allProductsRemoved = await cartsServices.delateAllProductsInCart(cid)
       
            res.json({ status: 'success', payload: allProductsRemoved });
    } catch (error) {
        req.logger.error(error.message)
        res.json({ status: 'error', error})
    }
})


module.exports = router