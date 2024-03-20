const { Router } = require('express')
const productsService = require('../services/products.service')
const productsPaginate = require('../utils/products-paginate.util')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')


const router = Router()

router.get('/',authenticateJWT, async (req, res) => {
    try {
   const { limit, name, sort, page } = req.query
  

   const { docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsPaginate({ limit, page, sort, name })
   const products = docs
   const user = req.user.user.first_name
   console.log(user);
   console.log('req user:',req.user);
   res
   .render('home.handlebars', 
   { 
    isAuthenticate: true,
    user,
    products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    limit,
    sort,
    style: 'style.css'
})
    } catch (error) {
        console.log('error:', error);
        res
        .status(500)
        .json({ status: 'error', error})
    }

})

router.get('/:id', async (req, res) => {
    try {
        const{ id } = req.params
        const productsById = await productsService.findById(id)
        res
        .status(200)
        .json({status: 'success', payload: productsById})
    } catch (error) {
        res
        .status(500)
        .json({ status: 'error', error})
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, description, price, thumbnail, stock } = req.body

        const newProductInfo = {
            name, 
            description,
            price,
            thumbnail,
            stock,
        }
        const newProduct = await productsService.create(newProductInfo)
        res
        .status(201)
        .json({status: 'success', payload: newProduct})
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ status: 'error', error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
    const { name, price, stock, description, thumbnail} = req.body

    if(!name || !price || !stock || !description) return res.status(400).json({ status: 'error' , message: 'Bad request' })

    const productUpdated = {
        name,
        price,
        stock,
        thumbnail,
        description
    }

    const product = await productsService.updated({_id: id, status:true}, productUpdated)

    res
    .status(200)
    .json({status: 'success', message: product})
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ status: 'error', error})
    }
    
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

     await productsService.updated({_id: id}, {status: false})

    res.json({status: 'success', message: 'Product delated'})
})

module.exports = router