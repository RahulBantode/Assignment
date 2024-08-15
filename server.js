require('dotenv').config();

const http = require('http');
const sequelize = require('./src/api/methods/models/sequelize');
const logger = require('./src/lib/logger')("server.js");
const backendServer = require('./src/lib/app');

//On successful resovled of promise for database connection backend server and routes are initialized, 
// if DB connection fails appropriate error message thrown.
sequelize.then(() => {
    backendServer.init();
    const server = http.createServer(backendServer.app);

    server.listen(process.env.SERVER_PORT, (error) => {
        if(!error) {
            logger.info(`Backend server started at PORT:${process.env.SERVER_PORT}`);
        }
    })
})