const genereteUserErrorInfo = user => {
    return `
    Parameters are missing:
    Name: ${user.first_name}
    Lastname: ${user.last_name}
    Email: ${user.email}
    Password: ${user.password}
    `
}

const genereteProductErrorInfo = product => {
    return `
    Parameters are missing:
    Name: ${product.name}
    Description: ${product.description}
    Price: ${product.price}
    Stock: ${product.stock}
    Thumbnail: ${product.thumbnail}
    `
}

const genereteIdErrorInfo = (obj, id) => {
    return `
    the ${obj} with the id: ${id} does not exist
    `
}


module.exports = {
    genereteUserErrorInfo,
    genereteProductErrorInfo,
    genereteIdErrorInfo,
   
}