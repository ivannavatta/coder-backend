const { Router } = require('express')
const productsService = require('../services/products.service')
const productsPaginate = require('../utils/products-paginate.util')
const authorization = require('../middlewares/authenticateRole.middleware')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')


const router = Router()

router.get('/', authenticateJWT, async (req, res) => {
    try {
   const { limit, name, sort, page } = req.query
  
    const admin = req.user.user.role ? req.user.user.role === 'admin' : null
    
   const { docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsPaginate({ limit, page, sort, name })
   const products = docs
   const user = req.user.user.first_name
   req.logger.debug('usario:',user);
   res
   .render('home.handlebars', 
   { 
    isAuthenticate: true,
    admin,
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
        req.logger.error(error.message)
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
        req.logger.error(error.message)
        res
        .status(500)
        .json({ status: 'error', error})
    }
})

router.post('/', authorization('admin') , async (req, res) => {
    
        const newProduct = await productsService.create(req.body)
        res
        .status(201)
        .json({status: 'success', payload: newProduct})
   
})

router.put('/:id' , authorization('admin'), async (req, res) => {
    try {
        const { id } = req.params
    
    const product = await productsService.updated({_id: id, status:true}, req.body)

    res
    .status(200)
    .json({status: 'success', message: product})
    } catch (error) {
        req.logger.error(error.message)
        res
        .status(500)
        .json({ status: 'error', error})
    }
    
})

router.delete('/:id' , authorization('admin'), async (req, res) => {
    const { id } = req.params

     await productsService.deleted({_id: id}, {status: false}, {deleteAt: new Date()})

    res.json({status: 'success', message: 'Product delated'})
})



module.exports = router