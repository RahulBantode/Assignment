const tblProductsMethod = require('../methods/tblProducts.method');
const { HTTP_ERRORS, ERROR_MESSAGES, USER_ROLE } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('updateProducts.service.js');

/**
 * Update the products into system (Only Admin is allowed to update the products data)
 * @param {productsDetails} - products Data to update
 * @param {*} res 
 * @returns Successful message of products data updated.
 */
const updateProductsService = async (req, res) => {
    try {
        // Accepting the array of products 
        const { productsDetails } = req.body;

        //Check whether productDetails array empty or not.
        if(!productsDetails.length) {
            logger.error(`No data available in request to update the products`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }

        // Check whether the user who logged in is admin or not, only admin has rights to update the products details
        if(req.token.role === USER_ROLE.ADMIN) {
            productsDetails.forEach(async (productData) => {
                const product = await tblProductsMethod.fetchOne({ where : {id: productData?.id }, raw:true })
                if(product) {
                    // product_name/price/description will get updated w.r.t product id
                    const payload = {
                        product_name: productData?.productName,
                        price: productData?.price,
                        description: productData?.description,
                        updated_at: Date.now(),
                    }
                    // updating the products into the system.
                    await tblProductsMethod.update(payload, {where: { id: productData?.id }});
                }
                logger.info(`Product data updated successfully`);
                return response.sendSuccessResponse(res, {Data: "Product are details updated successfully"});
            })
        }
        logger.error(`Only Admin can update the products details`);
        return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.ADMIN_ALLOWED_TO_UPDATE);
    } catch (error) {
        logger.error(`Error in update product details service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = updateProductsService;