const tblProducts = require('./models/tblProducts');

module.exports = {
    fetchOne: async (options) => tblProducts.findOne(options),
    fetchAll: async (options) => tblProducts.findAll(options),
    bulkCreate: async (payload) => tblProducts.bulkCreate(payload),
    update: async (payload, options) => tblProducts.update(payload, options),
    delete: async(options) => tblProducts.destroy(options),
};