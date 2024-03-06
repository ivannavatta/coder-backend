const productsStore = require('../stores/products.store')

const getAll = async () => {
    return productsStore.getAll()
}
const create = async newproduct => {
    const newProductInfo = {
        name: newproduct.name, 
        description: newproduct.description,
        price: newproduct.price *1.1,
        thumbnail: newproduct.thumbnail,
        stock: newproduct.stock,
        createAt: new Date(),
        updateAt: new Date()
    }
   return  await productsStore.create(newProductInfo)

}

const findById = async (id) => {
   const product = await productsStore.findById(id)
   return product
}

const updated = async (id, updated) => {
    const productUpdated = {
        name: updated.name,
        price: updated.price,
        stock: updated.stock,
        thumbnail: updated.thumbnail,
        description: updated.description,
        updateAt: new Date()
    }
    return await productsStore.updated(id, productUpdated)
}

module.exports = {
    getAll,
    create,
    findById,
    updated
}