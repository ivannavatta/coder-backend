const Product = require("../repositories/product")

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
     await Product.updated(id, updated)

    return 'Product updated'
}

const deleted = async (id, status, deleteAt) => {
    await Product.deleted(id, status, deleteAt)

   return 'Product updated'
}

const checkStock = async product => {
    const stock = await Product.checkStock(product)

    return stock
}
module.exports = {
    getAll,
    create,
    findById,
    updated,
    deleted,
    checkStock
}

