const jwt = require('jsonwebtoken');
const md5 = require('md5');


exports.userAuthUtils = {
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

    verifyToken: (token,secret) => {
        try {
            const tokenPayload = jwt.verify(token, secret);
            return tokenPayload;
        } catch (error) {
            throw error;
        }
    },

    compare: async (password, hash) => {
        try {
            return md5(password) === hash;
        } catch (error) {
            console.log('Error while comparing token: ', error);
            throw error;
        }
    },
    hashPassword: async (password) => md5(password),
}