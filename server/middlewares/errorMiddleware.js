const ErrorHandler = require("../error/ErrorHandler");

module.exports = {
    errorHandler:function(err, req, res) {
        if (err instanceof ErrorHandler) {
            return res.status(err.status).json({message: err.message});
        }
        return res.status(500).json({message: 'Unexpected error'});

    }
}