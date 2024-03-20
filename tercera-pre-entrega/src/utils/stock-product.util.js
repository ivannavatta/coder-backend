const checkStock = productsCart=> {
    const productsInStock = [];
    const productsOutOfStock = [];
    for (const product of productsCart.products) {
        console.log('productsCart.products: ', productsCart.products);
        if (product.product.stock >= product.quantity) {
            productsInStock.push(product);
        } else {
            productsOutOfStock.push(product);
        }
    }
    console.log(productsInStock);

    

    return { productsInStock, productsOutOfStock}
}
 
module.exports = checkStock