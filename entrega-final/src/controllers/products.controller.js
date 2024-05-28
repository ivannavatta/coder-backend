const { Router } = require('express')
const productsService = require('../services/products.service')
const userServices = require('../services/users.service')
const productsPaginate = require('../utils/products-paginate.util')
const authorization = require('../middlewares/authenticateRole.middleware')
const authenticateJWT = require('../middlewares/authenticateToken.middleware')
const lastConexion = require('../middlewares/lastConexion.middleware')


const router = Router()

router.get('/json', authenticateJWT, async (req, res) => {
    try {
        const products = await productsService.getAll()
        res.status(200).json({ status: 'success', payload: products})
        
    } catch (error) {
        req.logger.error(error.message)
        res
        .status(500)
        .json({ status: 'error', error})
    }
} )

router.get('/', authenticateJWT, lastConexion, async (req, res) => {
    try {
   const { limit, name, sort, page } = req.query
  
    const admin = req.user.user.role ? req.user.user.role === 'admin' : null
    
   const { docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsPaginate({ limit, page, sort, name })
   const products = docs
   const user = req.user.user.first_name
   req.logger.info('usario:',user);
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

router.post('/', authorization(['admin', 'premium']) , async (req, res) => {
    try {
        const newProduct = await productsService.create(req.body)
    
        const role = req.user.user.role
        if(role === 'premium'){
        const userEmail = req.user.user.email
    
        const user = await userServices.find({email: userEmail })
    
        const productName = req.body.name
    
        const product = await productsService.find({name: productName })
    
        product.owner.email = user.email
    
        await product.save()
    
        return res
        .status(201)
        .json({status: 'success', payload: newProduct})
        }
        
        res
        .status(201)
        .json({status: 'success', payload: newProduct})
        
    } catch (error) {
        console.log(error);
    }
    
   
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
        .json({ status: 'error', error: error.message})
    }
    
})

router.delete('/:id' , authorization(['admin', 'premium']), async (req, res) => {
    const { id } = req.params

    const product = await productsService.findById(id)

    const productOwner = product.owner.email

    const userOwner = req.user.user.email

    const userRole = req.user.user.role

    if(productOwner === userOwner  || userRole === 'admin'){
        await productsService.deleted({_id: id}, {status: false}, userOwner, productOwner)
        return res.json({status: 'success', message: 'Product delated'})
    }

    res.json({status: 'error', message: 'You cannot delete a product that is not yours.'})

})



module.exports = router