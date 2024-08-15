const { body } = require('express-validator');

// product validaiton rules.
const productValidation = {
    updateProducts: [
        body('productsDetails', "INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isArray(),
        body('productsDetails.*.id', "INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isInt(),
    ],
    deleteProducts: [
        body('productsIdsToDelete', "INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isArray(),
    ],
    addProducts: [
        body('products',"INVALID_REQUEST_DATA").exists({ checkFalsy: true}).isArray(),
    ],
    controlProducts: [
        body('id', "INVALID_REQUEST_DATA").exists( { checkFalsy: true }).isInt(),
    ]
};

module.exports = productValidation;