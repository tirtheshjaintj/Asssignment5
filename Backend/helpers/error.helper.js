class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        //console.log(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    console.error(err);

    res.status(status).json({
        status: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = {
    AppError,
    errorHandler
};
