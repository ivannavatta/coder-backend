const ProductRepository = require("./product.repository");
const productFactory = require("../factory/product.factory");

const productRepository = new ProductRepository(new productFactory())

module.exports = productRepository