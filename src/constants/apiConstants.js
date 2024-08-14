const API_CONSTANTS = {

    HTTP_SUCCESS: 200,

    HTTP_ERRORS: {
        INTERNAL_SERVER_ERROR: 500,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        INVALID_TOKEN: 412,
        FORBIDDEN: 403,
        BAD_REQUEST: 400,
        SERVICE_UNAVAILABLE: 503,
        CONFLICT: 409,
    },

    ERROR_MESSAGES: {
        INTERNAL_SERVER_ERROR: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server error',
        },
        NOT_FOUND: {
            code: 'NOT_FOUND',
            message: 'Not found',
        },
        UNAUTHORIZED: {
            code: 'UNAUTHORIZED',
            message: 'Unauthorized',
        },
        INVALID_CREDENTIALS: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid credentials',
        },
        TOKEN_EXPIRED: {
            code: 'TOKEN_EXPIRED',
            message: 'Token expired',
        },
        INSUFFICIENT_DATA: {
            code: 'INSUFFICIENT_DATA',
            message: 'Insufficient data (username,email,password) is required'
        },
        INVALID_DATA_FORMAT: {
            code: 'INVALID_DATA_FORMAT',
            message: 'Invalid data format'
        },
        USER_ALREADY_EXIST: {
            code: 'USER_ALREADY_EXIST',
            message: 'User has an account already'
        },
        ADMIN_ALLOWED_TO_UPDATE: {
            code: 'ADMIN_ALLOWED_TO_UPDATE',
            message: 'Only admin can update'
        },
        ADMIN_ALLOWED_TO_DELETE: {
            code: 'ADMIN_ALLOWED_TO_DELETE',
            message: 'Only admin can delete'
        },
        ADMIN_ALLOWED_TO_CHANGE: {
            code: 'ADMIN_ALLOWED_TO_CHANGE',
            message: 'Only admin can change the status'
        }
    },
    
    USER_ROLE: {
        ADMIN: 'admin',
        USER: 'user',
    },

    PRODUCTS_STATUS: {
        ACTIVE: 1,
        INACTIVE: 0,
    }

};

module.exports = API_CONSTANTS;
