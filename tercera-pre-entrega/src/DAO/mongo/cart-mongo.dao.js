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
    async updatedCart(cid, productsOutOfStock) {
        const cart = await Cart.findById(cid);
    
        if (cart) {
            const existingProducts = cart.products.map(item => item.product.toString());
    
            for (const product of productsOutOfStock) {
                const productIdString = product.product._id.toString();
    
                // Verificar si el producto ya está en el carrito
                if (existingProducts.includes(productIdString)) {
                    // Si el producto ya está en el carrito, no hacer nada
                    return;
                }
    
                // Si el producto no está en el carrito, agregarlo
                cart.products.push({
                    product: product.product._id,
                    quantity: product.quantity
                });
            }
           
            await cart.save();
        }
    }
    
    
    async existingProduct(cid, pid){
        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).json({ error: 'El carrito con el ID proporcionado no existe.' });
        }
        console.log('productid',pid);

        const product = await Product.findById(pid);

        if (!product) {
            return res.status(404).json({ error: 'El producto con el ID proporcionado no existe.' });
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

        // Guardar el carrito actualizado en la base de datos
        await cart.save();
    }
    async updatedProductCart(cid, updatedProducts){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)

            if(cart){
                
                updatedProducts.forEach(updatedProduct => {

                const existingProduct = cart.products.find(product => product.product.equals(updatedProduct.productId))
                    
                if (existingProduct) {

                     existingProduct.quantity = updatedProduct.quantity
                    
                    }
                    
                    })
                    await cart.save()

                    console.log('Updated  product');
                    return ({ status: 'success', message: 'Updated  product'})
               
            }
            else{
                console.log('The cart does not exist');
                return ({ status: 'error', message: 'el carrito no existe'})
            }
        } catch (error) {
            console.log('Error al actualizar el producto del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
    }
    async updatedProductStock(cid, pid, stock){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)

            if(cart){
                //compara el object id del array de products con el id que se pasa por parametros del producto
                const productIndex = cart.products.findIndex(productExist => productExist.product.toString() === pid.toString())
                console.log('Product Index:', productIndex); // Imprime el índice del producto
                console.log('Product at Index:', cart.products[productIndex]); // Imprime los detalles del producto en el índice
                // si devuelve el contrario de -1(false), es decir 0(true), elimina el prodcuto
                if(productIndex !== -1){
                    console.log( cart.products[productIndex].stock);
                    cart.products[productIndex].stock = stock
                    console.log( cart.products[productIndex].stock);
                    //se gurda el carrito en la base de datos
                    await cart.save()

                    console.log('Updated stock product');
                    return ({ status: 'success', message: 'Updated stock product'})
                }
                else{
                    console.log('The product does not exist');
                    return ({ status: 'error', message: 'The product does not exist'})
                }
            }
            else{
                console.log('The cart does not exist');
                return ({ status: 'error', message: 'el carrito no existe'})
            }
        } catch (error) {
            console.log('Error al actualizar el producto del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
    }
    async delateOneProductInCart(cid, pid){
        try {
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
                    console.log('Delated product');
                    return ({  message: 'producto eliminado correctamente del carrito'})
                }
                else{
                    console.log('The product does not exist');
                    return ({ status: 'error', message: 'el producto no existe en el carrito'})
                }
            }
            else{
                console.log('The cart does not exist');
                return ({ status: 'error', message: 'el carrito no existe'})
            }
        } catch (error) {
            console.log('Error al eliminar el producto del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
     
    }
    async delateAllProductsInCart(cid){
        try {
            //verifica que existe el id del carrito
            const cart = await Cart.findById(cid)
            
            if(cart){
              if (cart.products.length ){
                cart.products = []
                await cart.save()
                    console.log('Delated all products');
                    return ({ status: 'success', message: 'Todos los productos fueron elimados del carrito'})
              }
              else{
                console.log('the cart has no products');
                return ({ status: 'error', message: 'El carrito no contiene productos'})
            }
                    
                }
                else{
                    console.log('The cart does not exist');
                    return ({ status: 'error', message: 'el carrito no existe'})
                }
            }
           
         catch (error) {
            console.log('Error al eliminar los productos del carrito:', error)
            return { status: 'error', message: 'Internal server error' }
        }
     
    }

    async delated(id, status, deleteAt){
        const cart = await Cart.updateOne(id, status, deleteAt )
        return cart
    }

}

module.exports = CartMongoDao