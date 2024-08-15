const dbConfig = JSON.parse(process.env.DB_CONFIG);
const  { Sequelize } = require('sequelize');

// Database configurations
module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
        pool: {
            max: dbConfig.poolMax,
            min: dbConfig.poolMin,
            acquire: dbConfig.poolAcquire,
            idle: dbConfig.poolIdle,
        },
        define: {
            freezeTableName: true,
            timestamps: false,
        },
        logging: false,
    },
);