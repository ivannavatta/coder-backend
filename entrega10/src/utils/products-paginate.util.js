const Product = require("../DAO/mongo/models/product.model");

async function productsPaginate({ limit = 10, page = 1, sort, name }) {
    const limitFilter = limit ? parseInt(limit) : 10
    
    const query = {
        status: true,
        name: name ? name : { $exists: true }
    };

    const options = {
        page,
        limit: limitFilter,
        sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : undefined,
        lean: true,
    }

    return await Product.paginate(query, options)
}

module.exports =  productsPaginate 