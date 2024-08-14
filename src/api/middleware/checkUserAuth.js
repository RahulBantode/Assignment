const { userAuthUtils } = require('../../utils/userAuthUtils');
const { ERROR_MESSAGES, HTTP_ERRORS } = require('../../constants/apiConstants');
const logger = require('../../lib/logger')('checkUserAuth.js');

const userJwt = JSON.parse(process.env.USER_JWT);

const StandardResponse = require('../standardResponse');

const authenticate = {
    verifyToken: async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                throw new Error('Missing auth token');
            }
            const token = req.headers.authorization.split(' ')[1];
            const tokenPayload = await userAuthUtils.verifyToken(token, userJwt.ACCESS_TOKEN_SECRET);
            req.token = {
                role: tokenPayload.role,
                expiry: tokenPayload.exp,
            };
            next();
        } catch (error) {
            logger.error(`Error in verifying user token ${req.headers.authorization?.split(' ')[1] || ''}:`, error);
            const response = new StandardResponse();
            return response.sendErrorResponse(res, HTTP_ERRORS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
        }
    },
};

module.exports = authenticate;