const CartMongoDao = require("../DAO/mongo/cart-mongo.dao");

const Cart = new CartMongoDao()

const getAll = async () => {
    const carts = await Cart.getAll()
    return carts
}

const create = async (newCartInfo) => {
    return await Cart.create(newCartInfo)
    
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

const addProduct = async (cid, pid) => {
    const product = await Cart.existingProduct(cid,pid) 
    return product
}

const createTicket = async ticket =>{
    const ticketInfo = await Cart.createTicket(ticket)
    return ticketInfo
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
  await Cart.delateOneProductInCart(cid, pid)
   return 'product successfully removed from cart'
}

const delateAllProductsInCart = async (cid) => {
    await Cart.delateAllProductsInCart(cid)
    return 'all products were removed from cart'
}

const deleted = async (id) => {
    await Cart.delated(id)
}
const productOutStockCart = async (cid, productsOutOfStock) => {
    const productsOutOfStockInfo = await Cart.removeProductOutStockCart(cid, productsOutOfStock)

    return productsOutOfStockInfo
}

const saveCart = async cid => {
    const cart = await Cart.saveCart(cid)

    return cart
}

module.exports = {
    getAll,
    create,
    find,
    findById,
    updated,
    createTicket,
    updatedProductCart,
    updatedProductStock,
    delateOneProductInCart,
    delateAllProductsInCart,
    deleted,
    productOutStockCart,
    addProduct,
    saveCart
}