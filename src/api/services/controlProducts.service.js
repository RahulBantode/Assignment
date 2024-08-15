const tblProductsMethod = require('../methods/tblProducts.method');
const { HTTP_ERRORS, ERROR_MESSAGES, USER_ROLE } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('controlProducts.service.js');

/**
 * Admin can control the products to show on website or not, for that taken up flag like active/inactive on that
 * basis products will be shown on website 
 * @returns 
 */
const controlProductsService = async (req, res) => {
    const { id, status } = req.body;
    try {
        // Check the logged in user is admin or not.
        if(req.token.role === USER_ROLE.ADMIN) {
            // Fetch the product w.r.t id 
            const product = await tblProductsMethod.fetchOne({where : { id }, raw:true });
            // check if product is present in DB or not.
            if(!product) {
                logger.error('Not able to update the status of product as it is not present in DB');
                return response.sendErrorResponse(res, HTTP_ERRORS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);                
            }
            // update the product status (active=1 / inactive=0) On this flag admin can show the products
            await tblProductsMethod.update({ status: status }, { where: { id } });
            logger.info('Product status updated successfully');
            return response.sendSuccessResponse(res, {data: 'products status updated'});
        }
        logger.error(`Only Admin can change the product status`);
        return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.ADMIN_ALLOWED_TO_CHANGE);
    } catch (error) {
        logger.error(`Error in control products service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
};

module.exports = controlProductsService;