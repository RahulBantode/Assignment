const { ERROR_MESSAGES, HTTP_ERRORS } = require('../../constants/apiConstants');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');


const standardResponse = require('../standardResponse');

const response = new standardResponse();

class ApiRoutes { 
    constructor(app) {
        this.app = app;
    }

    init() {
        // Base route for auth, admin, user get initialized.
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/admin', adminRouter);
        this.app.use('/api/user', userRouter);

        this.app.use((req, res) => {
            response.sendErrorResponse(
                res,
                HTTP_ERRORS.NOT_FOUND,
                ERROR_MESSAGES.NOT_FOUND,
            );
        });
    }
}
module.exports = ApiRoutes;