const total = (product) => {
    const total = product.reduce((total, product) => total + (product.product.price * product.quantity), 0);

    return total
}

module.exports = total