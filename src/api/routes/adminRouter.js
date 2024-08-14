const adminRouter = require('express').Router();
const adminController = require('../controller/admin.controller');
const authenticate = require('../middleware/checkUserAuth');
const requestValidation = require('../validations/requestValidation');
const userValidation = require('../validations/userValidation');
const productValidation = require('../validations/productValidation');

// /update route to update the users data 
adminRouter.put('/update/user', 
    authenticate.verifyToken, // Authenticating the users by verifying the token
    userValidation.updateUsers, // request validations rules for updateUsers req.
    requestValidation, // validating the request body data
    adminController.updateUsers
);

// /delete route to delete the users
adminRouter.delete('/delete/user', 
    authenticate.verifyToken, 
    userValidation.deleteUsers,
    requestValidation,
    adminController.deleteUser
);

// /update route to update products details
adminRouter.put('/product/update', 
    authenticate.verifyToken,
    productValidation.updateProducts,
    requestValidation, 
    adminController.updateProducts
);

// /delete route to delete product details.
adminRouter.delete('/product/delete', 
    authenticate.verifyToken, 
    productValidation.deleteProducts,
    requestValidation,
    adminController.deleteProducts
);

// /control route to display products on website or not
adminRouter.put('/product/control',
    authenticate.verifyToken,
    productValidation.controlProducts,
    requestValidation,
    adminController.controlProducts
);

// /products route to fetch all the products
adminRouter.get('/products', authenticate.verifyToken, adminController.displayProducts);

module.exports = adminRouter;