"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, status = "error") {
        super(message);
        this.statusCode = statusCode;
        this.status = "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
exports.default = globalErrorHandler;
