const jwt = require('jsonwebtoken');
const md5 = require('md5');


exports.userAuthUtils = {
    // Generating the JWT access token
    generateToken: async(payload, secret, expiryTime) => {
        try {
            const token = jwt.sign(
                payload,
                secret,
                { expiresIn: `${expiryTime}h`}
            );
            console.log(`Token generated:\n${token}`);
            return token;
        } catch (error) {
            console.log(`Error while generating token: ${error}`);
            throw error;
        }
    },

    // Checking the token send by user is verified or not
    verifyToken: (token,secret) => {
        try {
            const tokenPayload = jwt.verify(token, secret);
            return tokenPayload;
        } catch (error) {
            throw error;
        }
    },

    // Comparing the plain text password with its associated hash password.
    compare: async (password, hash) => {
        try {
            return md5(password) === hash;
        } catch (error) {
            console.log('Error while comparing token: ', error);
            throw error;
        }
    },

    // Creating the plain text password to hash.
    hashPassword: async (password) => md5(password),
}