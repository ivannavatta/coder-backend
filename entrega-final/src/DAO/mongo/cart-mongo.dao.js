const loggerFactory = require("../../factory/logger.factory")
const CustomError = require("../../handlers/errors/Custom-Error")
const { genereteIdErrorInfo } = require("../../handlers/errors/cause-error")
const ERRORS_CODE = require("../../handlers/errors/enum-errror")
const TYPES_ERRORS = require("../../handlers/errors/types-error")
const Cart = require("./models/cart.model")
const Product = require("./models/product.model")
const Ticket = require("./models/ticket.model")

class CartMongoDao{
   async getAll(){
    const carts = await Cart.find()
    return carts
    }
    async create(newCart){
        const cartCreated = await Cart.create(newCart)
        return cartCreated
    }
    async find(id){
        const cart = await Cart.findOne(id)
        return cart
    }
    async findById(id){
        const cart = await Cart.findById(id).populate('products.product').lean();
        return cart
    }
    async updated(id, updated){
        const cartUpated = await Cart.updateOne(id, updated)
        return cartUpated
    }
    async createTicket(ticket){
        const ticketInfo = await Ticket.create(ticket)
        return ticketInfo
    }
    async removeProductOutStockCart(cid, productOutOfStock) {
        try {
            const cart = await Cart.findById(cid);
    
            if (cart) {
                const productsToRemove = productOutOfStock.filter(product => product.product.stock === 0);
                loggerFactory.debug('productsToRemove', productsToRemove);
                // Eliminar los productos filtrados del carrito
                productsToRemove.forEach(productToRemove => {
                    const index = cart.products.findIndex(product => product._id.toString() === productToRemove._id.toString());
                    if (index !== -1) {
                        cart.products.splice(index, 1);
                    }
                });

                
                // Guardar los cambios en el carrito
                await cart.save();
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    
    
    async existingProduct(cid, pid){
        const cart = await Cart.findById(cid);
       
        if (!cart) {
            CustomError.createError({
                name: TYPES_ERRORS.CART_FOUND_ERROR,
                cause: genereteIdErrorInfo('cart', cid),
                message: 'Error trying to found cart',
                code: ERRORS_CODE.INAVLID_CART_INFO
            })
        }
        
        loggerFactory.debug('productid',pid);

        const product = await Product.findById(pid);

        if (!product) {
            CustomError.createError({
                name: TYPES_ERRORS.PRODUCT_FOUND_ERROR,
                cause: genereteIdErrorInfo('product', pid),
                message: 'Error trying to found product',
                code: ERRORS_CODE.INAVLID_PRODUCT_INFO
            })
        }

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(prod => prod.product.toString() === pid.toString());

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            cart.products[existingProductIndex].quantity++;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.products.push({ product: pid, quantity: 1 });
        }

        cart.updateAt = new Date()
        await cart.save();
        return product.name
    }
    async updatedProductCart(cid, updatedProducts){
       
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)
            

            if(cart){
                
                updatedProducts.forEach(updatedProduct => {
                    
                    const existingProduct = cart.products.find(product => product.product.equals(updatedProduct.productId))
                    console.log("🚀 ~ CartMongoDao ~ updatedProductCart ~ existingProduct:", existingProduct)
                    
                    if (!existingProduct) {
                        
                        CustomError.createError({
                            name: TYPES_ERRORS.PRODUCT_FOUND_ERROR,
                            cause: genereteIdErrorInfo('product', updatedProduct.productId),
                            message: 'Error trying to found product',
                            code: ERRORS_CODE.INAVLID_PRODUCT_INFO
                        })
                    }
                if (existingProduct) {

                     existingProduct.quantity = updatedProduct.quantity
                    
                    }
                    
                    })
                    await cart.save()

                    loggerFactory.info('Updated  product');
                   
               
            }
            else{
                loggerFactory.info('The cart does not exist');
                CustomError.createError({
                    name: TYPES_ERRORS.CART_FOUND_ERROR,
                    cause: genereteIdErrorInfo('cart', cid),
                    message: 'Error trying to found cart',
                    code: ERRORS_CODE.INAVLID_CART_INFO
                })
            }
        
    }
    async updatedProductStock(cid, pid, stock){
       
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)

            if(cart){
                //compara el object id del array de products con el id que se pasa por parametros del producto
                const productIndex = cart.products.findIndex(productExist => productExist.product.toString() === pid.toString())
                loggerFactory.debug('Product Index:', productIndex); // Imprime el índice del producto
                loggerFactory.debug('Product at Index:', cart.products[productIndex]); // Imprime los detalles del producto en el índice
                // si devuelve el contrario de -1(false), es decir 0(true), elimina el prodcuto
                if(productIndex !== -1){
                    loggerFactory.debug( cart.products[productIndex].quantity);
                    cart.products[productIndex].quantity = stock
                    loggerFactory.debug( cart.products[productIndex].quantity);
                    //se gurda el carrito en la base de datos
                    await cart.save()

                    loggerFactory.info('Updated stock product');
                    
                }
                else{
                    loggerFactory.info('The product does not exist');
                    CustomError.createError({
                        name: TYPES_ERRORS.PRODUCT_FOUND_ERROR,
                        cause: genereteIdErrorInfo('product', pid),
                        message: 'Error trying to found product',
                        code: ERRORS_CODE.INAVLID_PRODUCT_INFO
                    })
                }
            }
            else{
                loggerFactory.info('The cart does not exist');
                CustomError.createError({
                    name: TYPES_ERRORS.CART_FOUND_ERROR,
                    cause: genereteIdErrorInfo('cart', cid),
                    message: 'Error trying to found cart',
                    code: ERRORS_CODE.INAVLID_CART_INFO
                })
            }
        
    }
    async delateOneProductInCart(cid, pid){
       
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)
            
            if(cart){
                //compara el object id del array de products con el id que se pasa por parametros del producto
                const productIndex = cart.products.findIndex(productExist => productExist.product.toString() === pid.toString())
                // si devuelve el contrario de -1(false), es decir 0(true), elimina el prodcuto
                if(productIndex !== -1){
                    //elimina el prdocuto del array con la propiedad splice, pasando el inidce del producto y como segundo parametro el 1 para elimar el producto
                    cart.products.splice(productIndex, 1)
                    //se gurda el carrito en la base de datos
                    await cart.save()
                    loggerFactory.info('Delated product');
                   
                }
                else{
                    loggerFactory.info('The product does not exist');
                    CustomError.createError({
                        name: TYPES_ERRORS.PRODUCT_FOUND_ERROR,
                        cause: genereteIdErrorInfo('product', pid),
                        message: 'Error trying to found product',
                        code: ERRORS_CODE.INAVLID_PRODUCT_INFO
                    })
                }
            }
            else{
                loggerFactory.info('The cart does not exist');
                CustomError.createError({
                    name: TYPES_ERRORS.CART_FOUND_ERROR,
                    cause: genereteIdErrorInfo('cart', cid),
                    message: 'Error trying to found cart',
                    code: ERRORS_CODE.INAVLID_CART_INFO
                })
            }
        
     
    }
    async delateAllProductsInCart(cid){
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)
            
            if(cart){
              if (cart.products.length ){
                cart.products = []
                await cart.save()
                loggerFactory.info('Delated all products');
                
              }
              else{
                loggerFactory.info('the cart has no products');
                return ({ status: 'error', message: 'El carrito no contiene productos'})
            }
                    
                }
                else{
                    loggerFactory.info('The cart does not exist');
                    CustomError.createError({
                        name: TYPES_ERRORS.CART_FOUND_ERROR,
                        cause: genereteIdErrorInfo('cart', cid),
                        message: 'Error trying to found cart',
                        code: ERRORS_CODE.INAVLID_CART_INFO
                    })
                }
    }

    async delated(id, status, deleteAt){
        const cart = await Cart.updateOne(id, status, deleteAt )
        return cart
    }

    async saveCart(cid){
        const cart = await Cart.findById(cid)
        cart.products = []
        return cart.save()
    }

}

module.exports = CartMongoDao