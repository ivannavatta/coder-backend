const Product = require("./models/product.model")
const loggerFactory = require("../../factory/logger.factory")
class ProductMongoDao{
   async getAll(){
    const products = await Product.find()
    return products
    }
    async create(newProduct){
        const productCreated = await Product.create(newProduct)
        return productCreated
    }
    async find(firstParameter, secondParameter){
        
        return await Product.findOne(firstParameter, secondParameter)
    }
    async findById(id){
        const product = await Product.findById(id)
        return product
    }
    async updated(id, updated){
        const productUpated = await Product.updateOne(id, updated)
        return productUpated
    }
    async deleted(id, status){
        const productUpated = await Product.updateOne(id, status )
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
        
                    loggerFactory.info(`el producto ${findProduct.name} cambio el stock de ${findProduct.stock += quantity} a ${findProduct.stock}`);
                }
                else{
                    return
                }
               
            }
        } catch (error) {
            loggerFactory.error(error.message)
        }
        
    }
}

module.exports = ProductMongoDao