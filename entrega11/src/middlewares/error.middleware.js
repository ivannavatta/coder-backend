const ERRORS_CODE = require("../handlers/errors/enum-errror");

const errorMiddleware = (error, req, res, next) => {

    switch (error.code) {
        case ERRORS_CODE.INAVLID_USER_INFO:
            req.logger.error(error.cause);
            res
            .status(ERRORS_CODE.INAVLID_USER_INFO)
            .json({status: 'error', error: error.name})
            break;

        case ERRORS_CODE.INAVLID_PRODUCT_INFO:
            req.logger.error(error.cause);
            res
            .status(ERRORS_CODE.INAVLID_PRODUCT_INFO)
            .json({status: 'error', error: error.name})
            break;

        case ERRORS_CODE.INAVLID_CART_INFO:
            req.logger.error(error.cause);
            res
            .status(ERRORS_CODE.INAVLID_CART_INFO)
            .json({status: 'error', error: error.name})
            break;
    
        default:
            req.logger.error('error middleware', error);
            res
            .status(ERRORS_CODE.INTERNAL_SERVER_ERROR)
            .json({status: 'error', error: 'Internal Server Error'})
            break;
    }

}

module.exports = errorMiddleware