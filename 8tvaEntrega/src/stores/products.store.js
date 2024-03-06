const ProductMongoDao = require("../DAO/mongo/product-mongo.dao");

const Product = new ProductMongoDao()

const getAll = async () => {
    return await Product.getAll()
}

const create = async (newProductInfo) => {
     await Product.create(newProductInfo)
     return 'New product created'
}

const findById = async (id) => {
    const product = await Product.findById(id)

    return product
}

const updated = async (id, updated) => {
    const product = await Product.updated(id, updated)

    return 'Product updated'
}

module.exports = {
    getAll,
    create,
    findById,
    updated
}

