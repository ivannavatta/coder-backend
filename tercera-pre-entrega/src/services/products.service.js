const NewProductDto = require('../DTOs/new-product.dto')
const UpdateProduct = require('../DTOs/updated-product.dto')
const productsStore = require('../stores/products.store')

const getAll = async () => {
    return productsStore.getAll()
}
const create = async newproduct => {
    const newProductInfo = new NewProductDto(newproduct)
   
   return  await productsStore.create(newProductInfo)

}

const checkStock = async (product) =>{
    const stock = await productsStore.checkStock(product)

    return stock
}

const findById = async (id) => {
   const product = await productsStore.findById(id)
   return product
}

const updated = async (id, updated) => {
    const { name, price, stock, description } = updated;
    if (!name || !price || !stock || !description) {
        throw new Error('Bad request: Missing required fields');
    }

    const existingProduct = await productsStore.findById(id)

    if(!existingProduct || !existingProduct.status){
        throw new Error('Bad request: Product not found or is not active');
    }
    const productUpdated = new UpdateProduct(updated)
    return await productsStore.updated(id, productUpdated)
}

const deleted = async (id, status, deleteAt) => {
   
    return await productsStore.deleted(id, status, deleteAt)
}

module.exports = {
    getAll,
    create,
    findById,
    updated,
    deleted,
    checkStock
}