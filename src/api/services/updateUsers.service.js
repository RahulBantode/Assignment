const tblUsersMethod = require('../methods/tblUsers.method');
const { HTTP_ERRORS, ERROR_MESSAGES, USER_ROLE } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('updateUser.service.js');

/**
 * Update the users data into system (Only Admin is allowed to update the users)
 * @param {usersData} - users Data to update
 * @param {*} res 
 * @returns Successful message of users data updated.
 */
const updateUsersService = async (req, res) => {
    try {
        // Accepting the array of users 
        const { usersData } = req.body;

        //Check whether usersData array empty or not.
        if(!usersData.length) {
            logger.error(`No data available in request for update the user`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_DATA_FORMAT);
        }

        // Check whether the user whoom logged in is admin or not, only admin has rights to update the users
        if(req.token.role === USER_ROLE.ADMIN) {
            usersData.forEach(async (userToUpdate) => {
                const user = await tblUsersMethod.fetchOne({ where : {id: userToUpdate.id }, raw:true })
                if(user) {
                    // Considered only username/email/mobile_no of user going to update by admin and admin by users id.
                    const payload = {
                        username: userToUpdate?.username,
                        email: userToUpdate?.email,
                        mobile_no: userToUpdate?.mobile_no,
                        updated_at: Date.now(),
                    }
                    //updating the users into the system
                    await tblUsersMethod.update(payload, {where: { id: userToUpdate.id }});
                }
            })
            logger.info(`Users data updated successfully`);
            return response.sendSuccessResponse(res, {Data: "Users are updated successfully"});
        }
        logger.error(`Only Admin can update the users`);
        return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.ADMIN_ALLOWED_TO_UPDATE);
    } catch (error) {
        logger.error(`Error in update users service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = updateUsersService;