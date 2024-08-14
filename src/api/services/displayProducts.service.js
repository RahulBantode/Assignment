const tblProductsMethod = require('../methods/tblProducts.method');
const { HTTP_ERRORS, ERROR_MESSAGES, USER_ROLE } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('displayProducts.service.js');

/**
 * Fetch the products details (Only Admin allowed to show this products details on web or not)
 * @returns Products data.
 */
const displayProductsService = async (req, res) => {
    try {
        // Check whether user is admin or not.
        if (req.token.role === USER_ROLE.ADMIN) {
            const products = await tblProductsMethod.fetchAll();
            // If no products in system then it will respond as products are not available.
            if(!products) {
                logger.error(`No products found...`);
                return response.sendErrorResponse(res, HTTP_ERRORS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
            }
            logger.info('Products are fetched successfully....');
            return response.sendSuccessResponse(res, { products });
        }
    } catch(error) {
        logger.error(`Error in display products service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = displayProductsService;