const authRouter = require('express').Router();

const userController = require('../controller/user.controller');
const authenticate = require('../middleware/checkUserAuth');

// /add/products route to add the products into system.
authRouter.post('/add/products', 
    authenticate.verifyToken, // Authenticating the users by verifying the token
    userController.addProducts 
);


module.exports = authRouter;