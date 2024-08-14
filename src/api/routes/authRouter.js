const authRouter = require('express').Router();

const authController = require('../controller/auth.controller');
const requestValidation = require('../validations/requestValidation');
const userValidation = require('../validations/userValidation');

// /signup route for (role user & admin )
authRouter.post('/signup', 
    userValidation.signUpUser, 
    requestValidation, 
    authController.signUp
);

// /signin route for (role user & admin)
authRouter.post('/signin', 
    userValidation.signInUser, 
    requestValidation, 
    authController.signIn
);

module.exports = authRouter;