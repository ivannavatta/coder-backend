const { Router } = require('express')


const router = Router()

const products = []

// method to limit the products
router.get('/',  (req, res) => {
    
     
// parseInt the number to avoid problems
        const limit = parseInt(req.query.limit)
//the conditional that, if limit is higher 0 or limit is a number, filter the products
        if (!isNaN(limit) && limit > 0) {
            const productFilter = products.slice(0, limit);
           return res.json({ products: productFilter });
        } 

        res.json({ products });

    

})
//method to filter products by ID
router.get('/:pid', (req, res) =>{
    const { pid } = req.params

    const product = products.find(product => product.id === Number(pid))
    if(!product) return res.status(404).json({error: 'Product not found'})
    res.json({message: product})
})
//method to create the products
router.post('/', (req, res) =>{
    const { id, title, description, code, price, status, stock, category, thumbnails} = req.body

    if( !title || !description || !code || !price  || !stock || !category) return res.status(400).json({ error: 'All properties are mandatory, except thumbnails.' });

    const newProducts = {
        id: products.length + 1,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails
    }

    products.push(newProducts)

    res.status(201).json({message: 'Product created'})
})
//method to change the products by ID
router.put('/:pid', (req, res) => {
    const { pid } = req.params
    //get body properties to change product information
    const {title, description, code, price, stock, category} = req.body

    const productUpdateIndex = products.findIndex(product => product.id === Number(pid))

    if(productUpdateIndex === -1) return res.status(404).json({error: "Product not found"})


    const productToUpdate = products[productUpdateIndex];

    productToUpdate.title = title;
    productToUpdate.description = description;
    productToUpdate.code = code;
    productToUpdate.price = price;
    productToUpdate.stock = stock;
    productToUpdate.category = category;
    

    res.json({message: 'Product update'})

} )
//method to delate the products by ID
router.delete('/:pid', (req, res) => {
    const { pid } = req.params
    
    const productIndex = products.findIndex(product => product.id === Number(pid))

    if(productIndex === -1) return res.status(404).json({error: "Product not found"})

   products.splice(productIndex, 1)

    res.json({message: 'Product deleted'})

} )

module.exports = router