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
const deleteUsersService = async (req,res) => {
    // Accepting the users ids to delete e,g req.body
    // {  "usersIdsToDelete": [5, 6]   }
    let { usersIdsToDelete } = req.body;

    try {
        // check whether the usersIdsToDeleted array empty or not.
        if(!usersIdsToDelete.length) {
            logger.error(`No data available in request for delete the user`);
                return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }
        
        // Fetch the existed users to delete from DB.
        const usersToDelete = await tblUsersMethod.fetchAll({ 
                attributes: ['id'],
                where : {id:  usersIdsToDelete }, 
                raw:true 
            }
        )

        // Check whether the data of users to delete is correct or not.
        if(!usersToDelete.length) {
            logger.error(`Wrong user ids ${usersIdsToDelete} to delete`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }

        // Check whether logged in user in admin or not, because only admin can delete the users.
        if(req.token.role === USER_ROLE.ADMIN) {
            for(let i=0; i < usersIdsToDelete.length; i++) {
                for(let j = 0; j < usersToDelete.length; j++) {
                    if(usersIdsToDelete[i] === usersToDelete[j].id) {
                        await tblUsersMethod.delete({ where : { id: usersToDelete[j].id }})
                    }
                }
            }
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