const tblProductsMethod = require('../methods/tblProducts.method');
const { HTTP_ERRORS, ERROR_MESSAGES, USER_ROLE } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('deleteProducts.service.js');

/**
 * Delete the products from system (Only Admin is allowed to delete the products)
 * @param {productsIdsToDelete} - product ids to delete
 * @param {*} res 
 * @returns Successful message of products deleted.
 */
const deleteProductsService = async (req, res) => {
    // Accepting the products ids to delete e,g req.body
    // {  "productsIdsToDelete": [1,3]   }
    const { productsIdsToDelete } = req.body;
    try {
        // check whether the productsIdsToDelete array empty or not.
        if(!productsIdsToDelete.length) {
            logger.error(`No data available in request to delete the products`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }
        
        // Fetch the existed products to delete from DB.
        const productsToDelete = await tblProductsMethod.fetchAll({ 
                attributes: ['id'],
                where : {id:  productsIdsToDelete }, 
                raw:true 
            }
        )

        // Check whether the data of products to delete is correct or not.
        if(!productsToDelete.length) {
            logger.error(`Wrong product ids ${productsIdsToDelete} to delete`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }

        // Check whether logged in user in admin or not, because only admin can delete the products data
        if(req.token.role === USER_ROLE.ADMIN) {
            for(let i=0; i < productsIdsToDelete.length; i++) {
                for(let j = 0; j < productsToDelete.length; j++) {
                    if(productsIdsToDelete[i] === productsToDelete[j].id) {
                        await tblProductsMethod.delete({ where : { id: productsToDelete[j].id }})
                    }
                }
            }
            logger.info('Products deleted successfully');
            return response.sendSuccessResponse(res, {Data: 'Products are deleted successfully'});
        }
        logger.error(`Only Admin can delete the products`);
        return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.ADMIN_ALLOWED_TO_DELETE);
    } catch(error) {
        logger.error(`Error in delete products service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = deleteProductsService;