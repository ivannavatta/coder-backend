const NewProductDto = require('../DTOs/new-product.dto')
const UpdateProduct = require('../DTOs/updated-product.dto')
const CustomError = require('../handlers/errors/Custom-Error')
const { genereteProductErrorInfo } = require('../handlers/errors/cause-error')
const ERRORS_CODE = require('../handlers/errors/enum-errror')
const TYPES_ERRORS = require('../handlers/errors/types-error')
const messageManager = require('../repositories/message')
const productsStore = require('../stores/products.store')

const getAll = async () => {
    return productsStore.getAll()
}
const create = async newproduct => {
    const {name, description, price, thumbnail, stock} = newproduct

    if(!name || !description || !price || !thumbnail || !stock){
        CustomError.createError({
            name: TYPES_ERRORS.PRODUCT_CREATION_ERROR,
            cause: genereteProductErrorInfo({name, description, price, thumbnail, stock}),
            message: 'Error trying to create product',
            code: ERRORS_CODE.INAVLID_PRODUCT_INFO
        })
    }
    const newProductInfo = new NewProductDto(newproduct)
   
   return  await productsStore.create(newProductInfo)

}

const checkStock = async (product) =>{
    const stock = await productsStore.checkStock(product)

    return stock
}

const find = async (firstParameter, secondParameter) => {
        
    return await productsStore.find(firstParameter, secondParameter)
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

const deleted = async (id, status, email, productOwner) => {
    await messageManager.sendDeletionProduct(email, productOwner)
    return await productsStore.deleted(id, {...status, deleteAt: new Date()})
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