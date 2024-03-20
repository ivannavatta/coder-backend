const total = (product) => {
    const total = product.products.reduce((total, product) => total + (product.product.price * product.quantity), 0);

    return total
}

module.exports = total