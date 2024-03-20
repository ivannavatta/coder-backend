const { Router } = require('express')
const cartsServices = require('../services/carts.service')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')
const authorization = require('../middlewares/authenticateRole.middleware')
const productServices = require('../services/products.service')
const userServices = require('../services/users.service')
const checkStock = require('../utils/stock-product.util')
const total = require('../utils/calculate-total.util')

const router = Router()

router.get('/', async (req, res) => {
    try {
    const Carts = await cartsServices.getAll()
    res.json({ status: 'success', payload: Carts})
    } catch (error) {
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
            
            const totalPrice = total(cartById)
            res.render('cart.handlebars', {
                isAuthenticate: true,
                cartById,
                totalPrice,
                style: 'style.css',
            });
        }
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ status: 'error', error });
    }
});

router.get('/:cid/purchase', authenticateJWT, async (req, res) => {
    try {
        const { cid } = req.params
        
        const cart =  await cartsServices.findById(cid)
        if (!cart) {
            return res.status(404).json({ error: 'Error a ver la orden de compra.'})
        } 
        const { productsInStock, productsOutOfStock } = checkStock(cart)

        const totalPrice = total(cart)
        const user = req.user.user.first_name
        res.render ('ticket.handlebars', { 
            style: 'style.css',
            cart,
            productsInStock,
            productsOutOfStock,
            user,
            totalPrice})
    } catch (error) {
        console.error ('Error al obtener el ticket:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/:cid/purchase', authenticateJWT, async (req, res) =>{
    try {
                const { cid } = req.params;
                
                const cart = await cartsServices.findById(cid);
              
                const { productsInStock, productsOutOfStock } = checkStock(cart)
        
                await productServices.checkStock(productsInStock);
        
                const totalPrice = total(cart)
                const uid = req.user.user.id
                const userEmail = await userServices.findById(uid)
                
                await cartsServices.createTicket(totalPrice, userEmail)
                
                await cartsServices.upatedCart(cid, productsOutOfStock )
                
                res.redirect(`/carts/${cid}/purchase`);
                
            } catch (error) {
                console.error(error);
                res.status(500).json({ status: 'error', error });
            }
        });

router.post('/', async (req, res) => {
    try {
       const cart =  await cartsServices.create()
        res
        .status(201)
        .json({ status: 'success', message: cart})
    } catch (error) {
        res.json({ status: 'error', error})
    }
   
})

//no actualiza el stock, VER PROBLEMA
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params
        const { stock } = req.body
    const productUpdated = await cartsServices.updatedProductStock(cid, pid, stock)
  
        res.json({ status: 'success', payload: productUpdated });
   
    } catch (error) {
        res.json({ status: 'error', error})
    }
    
})

//TAMPOCO FUNCIONA
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const  {products } = req.body
       
    const productUpdated = await cartsServices.updatedProductCart(cid, products)
  
        res.json({ status: 'success', payload: productUpdated });
   
    } catch (error) {
        res.json({ status: 'error', error})
    }
    
})
//agregar productos
router.patch('/:cid', authorization('user') , async (req, res) => {
    try {
        const { cid } = req.params
        const { productid } = req.body

         const cartUpdated = await cartsServices.addProduct( cid, productid)
        res
        
        .status(200)
        .json({status: 'success', payload: cartUpdated})
       } catch (error) {
        console.log(error);
        res
        
        .json({ status: 'error', error})
       }
 })

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid} = req.params
    const productRemoved = await cartsServices.delateOneProductInCart(cid, pid)
    if (productRemoved.status === 'success') {
        res.json({ status: 'success', payload: productRemoved });
    } else {
        res.json(productRemoved); 
    }
   
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: error})
    }
    
})

router.delete('/:cid', async (req, res) =>{
    try {
        const { cid } = req.params
        const allProductsRemoved = await cartsServices.delateAllProductsInCart(cid)
       
        if (allProductsRemoved.status === 'success') {
            res.json({ status: 'success', payload: allProductsRemoved });
        } else {
            res.json(allProductsRemoved); 
        }

    } catch (error) {
        res.json({ status: 'error', error})
    }
})


module.exports = router