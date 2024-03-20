const NewTicketDto = require('../DTOs/new-ticket.dto')
const cartsStore = require('../stores/carts.store')

const getAll = async () => {
    const carts = await cartsStore.getAll()
    return carts
}

const create = async () => {
    const createCart = {
        createAt: new Date(),
        updateAt: new Date()
    }
    return await cartsStore.create(createCart)
}

const find = async (cid) => {
    const cart = await cartsStore.find(cid)
    return cart
}

const findById = async (cid) => {
    const cart = await cartsStore.findById(cid)
    return cart
}
const upatedCart = async (cid, productsOutOfStock) => {
    const productsOutOfStockInfo = await cartsStore.upatedCart(cid, productsOutOfStock)
    return productsOutOfStockInfo
}
const updated = async (cid, productid) => {
    const cart = await cartsStore.find({ _id: cid })
        cart.products.push({product: productid})
        cart.updateAt = new Date()
        
        const updatedCart = await cartsStore.updated(cid, cart);
        return updatedCart;
}

const createTicket = async (total, user) =>{
    const newTicket = new NewTicketDto(total, user)
    const ticketinfo = await cartsStore.createTicket(newTicket)
    return ticketinfo
}

const updatedProductStock = async (cid, pid, stock) => {
   return await cartsStore.updatedProductStock(cid, pid, stock)
}

const updatedProductCart = async (cid, updated) => {
   return await cartsStore.updatedProductCart(cid, updated)
}

const delateOneProductInCart = async (cid, pid) => {
    const removeProduct = await cartsStore.delateOneProductInCart(cid, pid)
    return removeProduct
}

const delateAllProductsInCart = async (cid) => {
  const allProductsRemoved  =  await cartsStore.delateAllProductsInCart(cid)
  return allProductsRemoved
}

const addProduct = async (cid, pid) => {
    const product = await cartsStore.addProduct(cid,pid) 
    return product
}

module.exports = {
    getAll,
    findById,
    create,
    find,
    updated,
    createTicket,
    updatedProductStock,
    updatedProductCart,
    delateOneProductInCart,
    delateAllProductsInCart,
    upatedCart,
    addProduct
}