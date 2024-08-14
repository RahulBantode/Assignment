const { body } = require('express-validator');

const userValidation = {
    signUpUser: [
        body('username', 'INVALID_REQUEST_DATA').exists({ checkFalsy: true}),
        body('email', 'INVALID_REQUEST_DATA').exists({ checkFalsy: true}).isEmail(),
        body('password', 'Invalid credentials').exists({ checkFalsy: true }).isLength({ min: 5 }),
    ],
    signInUser: [
        body('email', 'INVALID_CREDENTIALS').exists({ checkFalsy: true }).isEmail(),
        body('password', 'INVALID_CREDENTIALS').exists({ checkFalsy: true }).isLength({ min: 5 }),
    ],
    updateUsers: [
        body('usersData', "INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isArray(),
        body('usersData.*.id', "INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isInt(),
    ],
    deleteUsers: [
        body('usersIdsToDelete', "INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isArray(),
    ],
}

module.exports = userValidation;