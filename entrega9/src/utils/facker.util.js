const { faker } = require('@faker-js/faker')

const generateProducts = () => {
    const productsNumber = 100
    const products = []

    for (let index = 0; index < productsNumber; index++) {
        products.push(generateProdutct())
    }

    return products
}

const generateProdutct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.string.numeric(),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar(),
        createAt: faker.defaultRefDate(),
        updatedAT: faker.defaultRefDate()
    }
}

module.exports = generateProducts