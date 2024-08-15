const addProductsService = require('../services/addProducts.service');

// User controller where all the user related services are listed.
const userController =  {
    addProducts: async (req, res) => {
        await addProductsService(req, res);
    }
}

module.exports = userController;