const CartMongoDao = require("../DAO/mongo/cart-mongo.dao");

const Cart = new CartMongoDao()

const getAll = async () => {
    const carts = await Cart.getAll()
    return carts
}

const create = async (newCartInfo) => {
    await Cart.create(newCartInfo)
    return 'Cart created'
}

const find = async (cid) => {
    const cart = await Cart.find(cid)
    return cart
}

const findById = async (cid) => {
    const cart = Cart.findById(cid)
    return cart
}

const updated = async (cid, updated) => {
    await Cart.updated(cid, updated)
    return 'Cart updated'
}

const updatedProductCart = async (cid, updated) => {
    await Cart.updatedProductCart(cid, updated)
    return 'Cart product updated'
}

const updatedProductStock = async (cid, pid, stock) => {
    await Cart.updatedProductStock(cid, pid, stock) 
    return 'Cart product stock updated'
}

const delateOneProductInCart = async (cid, pid) => {
   const delatedProduct = await Cart.delateOneProductInCart(cid, pid)
   return delatedProduct
}

const delateAllProductsInCart = async (cid) => {
   const delatedAllProducts =  await Cart.delateAllProductsInCart(cid)
    return delatedAllProducts
}

const deleted = async (id) => {
    await Cart.delated(id)
}

module.exports = {
    getAll,
    create,
    find,
    findById,
    updated,
    updatedProductCart,
    updatedProductStock,
    delateOneProductInCart,
    delateAllProductsInCart,
    deleted
}