const signUpService = require('../services/signUp.service');
const signInService = require('../services/signIn.service');

// Auth controller where all the auth related services are listed.
const authController = {
    signUp: async (req, res) => {
        await signUpService(req, res);
    },
    signIn: async (req, res) => {
        await signInService(req, res);
    }

};

module.exports = authController;