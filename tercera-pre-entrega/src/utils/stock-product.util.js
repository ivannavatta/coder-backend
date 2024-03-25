const checkStockInCart = productsCart=> {
    let productsInStock = [];
    let productsOutOfStock = [];
    for (const product of productsCart.products) {
        if (product.product.stock >= product.quantity) {
            productsInStock.push(product);
        } else {
            productsOutOfStock.push(product);
        }
    }

    return { productsInStock, productsOutOfStock}
}
 
module.exports = checkStockInCart