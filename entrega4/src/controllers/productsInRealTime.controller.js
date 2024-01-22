const { Router } = require('express')
const ProductManager = require ("./productManager.js");
const router = Router()

const productManager = new ProductManager();

router.get('/realtimeproducts', async (req, res) =>{
    try{

        const allProducts = await productManager.consultarProductos()

        res.render('productsInRealTime.handlebars', {allProducts})

    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.json({ error: 'Error al obtener productos' });
    }
   
})

module.exports = router