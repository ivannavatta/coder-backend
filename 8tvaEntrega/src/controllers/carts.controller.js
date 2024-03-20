const { Router } = require('express')
const cartsServices = require('../services/carts.service')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')
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

        // const isAuthenticated = req.user !== undefined;
        

        if (!cartById) {
            return res.status(404).json({ error: 'El carrito con el ID buscado no existe.' });
        } else {
            const total = cartsServices.calculateTotal(cartById)
            res.render('cart.handlebars', {
                isAuthenticate: true,
                cartById, 
                total,
                // isAuthenticated,
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

router.patch('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const { productid } = req.body

         const cartUpdated = await cartsServices.updated({_id: cid}, productid)
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