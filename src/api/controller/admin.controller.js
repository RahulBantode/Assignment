const updateUsersService = require('../services/updateUsers.service.js');
const deleteUserService = require('../services/deleteUsers.service.js');
const updateProductsService = require('../services/updateProducts.service.js');
const deleteProductsService = require('../services/deleteProducts.service.js');
const displayProductsService = require('../services/displayProducts.service.js');

// Admin controller where all the admin related services are listed.
const adminController = {
    updateUsers: async(req, res) => {
        await updateUsersService(req, res);
    },
    deleteUser: async(req, res) => {
        await deleteUserService(req, res);
    },
    updateProducts: async(req, res) => {
        await updateProductsService(req, res);
    },
    deleteProducts: async(req, res) => {
        await deleteProductsService(req, res);
    },
    displayProducts: async(req, res) => {
        await displayProductsService(req, res);
    }
}

module.exports = adminController;