const connection = require('./dbConfigurations');
const logger = require('../../../lib/logger')('sequelize.js');

// Class to establish the db connection and once the object is created send it back to caller.
class Sequel {
    static async getConnection() {
        if (!Sequel.connection) {
            await new Sequel().init();
        }
        return Sequel.connection;
    }

    async init() {
        try {
            await connection.authenticate();
            logger.info('Database connection successful...');
            Sequel.connection = connection;
        } catch (error) {
            logger.error('Exit from app as DB connection could not be established !', error);
            process.exit(1);
        }
    }
}

module.exports = Sequel.getConnection();
