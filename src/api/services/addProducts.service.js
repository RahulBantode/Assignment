const tblProductsMethod = require('../methods/tblProducts.method');
const { HTTP_ERRORS, ERROR_MESSAGES, PRODUCTS_STATUS } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('addProducts.service.js');

/**
 * Service to add the products into the system
 * @param {*} req 
 * @param {*} res 
 * @returns Successful registered the products data into system, to show the products on website its in admin control
 */
const addProductsService = async (req, res) => {
    const { products } = req.body;
    try {
         // check whether the products array empty or not.
        if(!products.length) {
            logger.error(`No products data available in request`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }
        // registering the products into the system.
        let productsData = await tblProductsMethod.bulkCreate(products)
        // filtering the products which have status active.
        productsData = productsData.filter((products) => products.status === PRODUCTS_STATUS.ACTIVE);
        response.sendSuccessResponse(res, { productsData });
    } catch(error) {
        logger.error(`Error in add products service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = addProductsService;