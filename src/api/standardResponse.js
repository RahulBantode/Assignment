class StandardResponse {
    constructor() {
        this.error = null;
        this.data = null;
    }

    sendSuccessResponse(res, data, header){
        return res.header(header).json(data);
    }

    

    sendErrorResponse(res, httpStatusCode, error, /*additionalInfo*/) {
        this.error = { ...error };
        // if (additionalInfo) {
        //     this.error.message += additionalInfo;
        // }
        this.data = null;
        return res.status(httpStatusCode).json(this);
    }
}

module.exports = StandardResponse;