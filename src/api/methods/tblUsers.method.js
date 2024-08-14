const tblUsers = require('./models/tblUsers');

module.exports = {
    fetchOne: async (options) => tblUsers.findOne(options),
    fetchAll: async (options) => tblUsers.findAll(options),
    create: async (options) => tblUsers.create(options),
    update: async (payload, options) => tblUsers.update(payload, options),
    delete: async(options) => tblUsers.destroy(options),
};