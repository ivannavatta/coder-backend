const Product = require("../repositories/product")

const getAll = async () => {
    return await Product.getAll()
}

const create = async (newProductInfo) => {
    return await Product.create(newProductInfo)
     
}

const find = async (firstParameter, secondParameter) => {
        
    return await Product.find(firstParameter, secondParameter)
}

const findById = async (id) => {
    const product = await Product.findById(id)

    return product
}

const updated = async (id, updated) => {
     await Product.updated(id, updated)

    return 'Product updated'
}

const deleted = async (id, status) => {
    await Product.deleted(id, status)

   return 'Product deleted'
}

const checkStock = async product => {
    const stock = await Product.checkStock(product)

    return stock
}
module.exports = {
    getAll,
    create,
    find,
    findById,
    updated,
    deleted,
    checkStock
}

