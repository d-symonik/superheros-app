class ErrorHandler extends Error{
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequestError(message){
        return new ErrorHandler(404, message);
    }
    static internalError(message){
        return new ErrorHandler(500, message);
    }
}

module.exports = ErrorHandler;