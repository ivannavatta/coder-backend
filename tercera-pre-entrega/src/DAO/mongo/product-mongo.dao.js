const Product = require("./models/product.model")
const productsServices = require('../../services/products.service')
class ProductMongoDao{
   async getAll(){
    const products = await Product.find()
    return products
    }
    async create(newProduct){
        const productCreated = await Product.create(newProduct)
        return productCreated
    }
    async findById(id){
        const product = await Product.findById(id)
        return product
    }
    async updated(id, updated){
        const productUpated = await Product.updateOne(id, updated)
        return productUpated
    }
    async deleted(id, status, deleteAt){
        const productUpated = await Product.updateOne(id, status, deleteAt )
        return productUpated
    }
    async checkStock(products){
        try {
            for (const product of products) {
                const id = product.product._id
                const quantity = product.quantity
    
                const findProduct = await Product.findById(id)
                if(findProduct.stock >= 0){
                    findProduct.stock -= quantity
                    await findProduct.save()
        
                    console.log(`el producto ${findProduct.name} cambio el stock de ${findProduct.stock += quantity} a ${findProduct.stock}`);
                }
                else{
                    return
                }
               
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = ProductMongoDao