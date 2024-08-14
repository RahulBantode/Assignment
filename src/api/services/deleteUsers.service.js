const tblUsersMethod = require('../methods/tblUsers.method');
const { HTTP_ERRORS, ERROR_MESSAGES, USER_ROLE } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('updateUser.service.js');

/**
 * Delete the users from system (Only Admin is allowed to delete the users)
 * @param {usersIdsToDelete} - user ids to delete
 * @param {*} res 
 * @returns Successful message of users deleted.
 */
const deleteUsersService = (req,res) => {
    // Accepting the users ids to delete e,g req.body
    // {  "usersIdsToDelete": [5, 6]   }
    const { usersIdsToDelete } = req.body;
    try {
        // check whether the usersIdsToDeleted array empty or not.
        if(!usersIdsToDelete.length) {
            logger.error(`No data available in request for delete the user`);
                return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }
        
        // Check whether logged in user in admin or not, because only admin can delete the users.
        if(req.token.role === USER_ROLE.ADMIN) {
            usersIdsToDelete.forEach(async (userId) => {
                // deleting the users from system.
                await tblUsersMethod.delete({where: { id: userId }});
            })
            logger.info('Users deleted successfully');
            return response.sendSuccessResponse(res, {Data: 'Users are deleted successfully'});
        }
        logger.error(`Only Admin can delete the users`);
        return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.ADMIN_ALLOWED_TO_DELETE);
    } catch(error) {
        logger.error(`Error in delete users service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = deleteUsersService;