const ERRORS_CODE = require("../handlers/errors/enum-errror");

const errorMiddleware = (error, req, res, next) => {

    switch (error.code) {
        case ERRORS_CODE.INAVLID_USER_INFO:
            console.log(error.cause);
            res
            .status(ERRORS_CODE.INAVLID_USER_INFO)
            .json({status: 'error', error: error.name})
            break;

        case ERRORS_CODE.INAVLID_PRODUCT_INFO:
            console.log(error.cause);
            res
            .status(ERRORS_CODE.INAVLID_PRODUCT_INFO)
            .json({status: 'error', error: error.name})
            break;

        case ERRORS_CODE.INAVLID_CART_INFO:
            console.log('hola botardo');
            console.log(error.cause);
            res
            .status(ERRORS_CODE.INAVLID_CART_INFO)
            .json({status: 'error', error: error.name})
            break;
    
        default:
            console.log('hola desde el middleware');
            res
            .status(ERRORS_CODE.INTERNAL_SERVER_ERROR)
            .json({status: 'error', error: 'Internal Server Error'})
            break;
    }

}

module.exports = errorMiddleware