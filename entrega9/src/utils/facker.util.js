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
        name: faker.helpers.arrayElement(['Iphone 15 pro', 'Macbook air m3', 'Iphone 14 pro max', 'Macbook pro m2', 'Iphone 12 se', 'Mac mini', 'Airpods (3th generation)', 'Airpods max']),
        description: faker.commerce.productDescription(),
        stock: faker.string.numeric(),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar(),
        createAt: faker.defaultRefDate(),
        updatedAT: faker.defaultRefDate()
    }
}

module.exports = generateProducts