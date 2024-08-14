const tblUsersMethod = require('../methods/tblUsers.method');
const { userAuthUtils } = require('../../utils/userAuthUtils');
const { USER_ROLE, HTTP_ERRORS, ERROR_MESSAGES } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('signUp.service.js');

/**
 * SignUpService for user and admin role to create new account
 * Accepting form data like username/email/mobile_no/password in request body, in which username/email/password is mandatory.
 * @returns Message of successful creation of Account
 */
const signUpService = async (req, res) => {
    const { username, email, mobile_no, password } = req.body;
    try {
        // Check whether (username/email/password) are present in req.body or not
        if(!username || !email || !password) {
            logger.error(`Insufficient data - username/password/email is required`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INSUFFICIENT_DATA);
        }

        //creation of payload
        const payload = {
            username,
            email,
            role: USER_ROLE.USER, // As only one Admin in application so rest of the user will be (role:user)
            mobile_no,
        }

        // As requirement is as of now only one admin.
        // Checking whether there is any admin already present in the sytem, if not present then create one user as admin, and
        // rest of the users who creating account will be (role:user)
        // This will ensure that the first user who create the account will be admin and all others will be (role:user)
        const users = await tblUsersMethod.fetchAll({ where : { role: USER_ROLE.ADMIN }, raw: true });
        if(!users.length) {
            payload.role = USER_ROLE.ADMIN;
        }

        //generated the hash password of plain text password.
        payload.password = await userAuthUtils.hashPassword(password);
        
        //Check whether the user who are trying to create account are already registerd or not, only new user can create account.
        //Already existed user can signIn directly using registerd credentials.
        const userExist = await tblUsersMethod.fetchOne({attributes:['id'], where: { email }, raw: true });
        if(userExist) {
            logger.error(`User has an account already`);
            return response.sendErrorResponse(res, HTTP_ERRORS.CONFLICT, ERROR_MESSAGES.USER_ALREADY_EXIST);
        }
        // registering the new user.
        await tblUsersMethod.create(payload);
        logger.info(`Account is created successfully for user ${username}`);
        return response.sendSuccessResponse(res, {data: `Account is created successfully for user ${username}`});
    } catch(error) {
        logger.error(`Error in signup service : ${error}`);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = signUpService;