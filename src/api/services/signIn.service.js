const tblUsersMethod = require('../methods/tblUsers.method');
const { userAuthUtils } = require('../../utils/userAuthUtils');
const { HTTP_ERRORS, ERROR_MESSAGES } = require('../../constants/apiConstants');
const StandardResponse = require('../standardResponse');

const response = new StandardResponse();
const logger = require('../../lib/logger')('singIn.service.js');

const userJwt = JSON.parse(process.env.USER_JWT);

/**
 * SignIn service to logged the registed users 
 * @param {email} - email as username 
 * @param {password} - registered password 
 * @returns Returns authorization (jwt) token
 */
const signInService = async (req, res) => {
    let payload = {};
    const { email, password } = req.body;
    try {
        // Check whether email and password is present in request body or not.
        if(!email || !password) {
            logger.error(`Invalid credentials (email/password) is required`);
            return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
        // Checking the user who are trying to login are existed in system or not.
        const user = await tblUsersMethod.fetchOne({
            attributes: ['id','username','role','password'],
            where: { email },
            raw: true,
        });

        //comparing the password with hash created password
        if(user) {
            if (await userAuthUtils.compare(password, user.password)) {
                payload = {
                    userId: user.id,
                    username: user.username,
                    role: user.role
                };
                // generating the authorization token for the user.
                const token = await userAuthUtils.generateToken(payload, userJwt.ACCESS_TOKEN_SECRET, userJwt.ACCESS_TOKEN_EXPIRY_DAY);
                logger.info(`User ${user.username} signed in successfully`);
                return response.sendSuccessResponse(res, { token, name: user.name } );
            }
        }
        logger.error(`User not found`);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.BAD_REQUEST,
            ERROR_MESSAGES.INVALID_CREDENTIALS,
        );
    } catch (error) {
        logger.error(`Error in sign in service `, error);
        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        );
    }
}

module.exports = signInService;