const tblProducts = require('./models/tblProducts');

module.exports = {
    fetchOne: async (options) => tblProducts.findOne(options),
    fetchAll: async () => tblProducts.findAll(),
    bulkCreate: async (options) => tblProducts.bulkCreate(options),
    update: async (payload, options) => tblProducts.update(payload, options),
    delete: async(options) => tblProducts.destroy(options),
};