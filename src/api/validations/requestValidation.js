const { validationResult } = require('express-validator');
const StandardResponse = require('../standardResponse');
const { HTTP_ERRORS } = require('../../constants/apiConstants');

// Middleware function to validate the rules which is defined are verified or not and respond accordingly.
const requestValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`Errors in request validation: ${JSON.stringify(errors.errors)} for request ${JSON.stringify(req.body)}`);
        const error = {
            code: 'BAD_REQUEST',
            message: errors,
        };

        const response = new StandardResponse();

        return response.sendErrorResponse(
            res,
            HTTP_ERRORS.BAD_REQUEST,
            error,
        );
    }
    return next();
};

module.exports = requestValidation;
