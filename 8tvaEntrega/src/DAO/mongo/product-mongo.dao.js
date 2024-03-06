const Product = require("./models/product.model")

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
    async delated(id){
        const product = await Product.deleteOne(id)
        return product
    }
}

module.exports = ProductMongoDao