"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBatchValidator = exports.handleValidationResult = exports.editBatchValidator = exports.batchValidator = void 0;
const express_validator_1 = require("express-validator");
const batchValidator = (0, express_validator_1.checkSchema)({
    batchName: {
        notEmpty: {
            errorMessage: "Batch name is required",
        },
        trim: true,
        escape: true,
    },
});
exports.batchValidator = batchValidator;
const editBatchValidator = (0, express_validator_1.checkSchema)({
    batchName: {
        notEmpty: {
            errorMessage: "Batch name is required",
        },
        trim: true,
        escape: true,
    },
    batchId: {
        in: ["params"],
        notEmpty: {
            errorMessage: "Batch id is required",
        },
        trim: true,
        escape: true,
    },
});
exports.editBatchValidator = editBatchValidator;
const deleteBatchValidator = (0, express_validator_1.checkSchema)({
    batchId: {
        in: ["params"],
        notEmpty: {
            errorMessage: "Batch id is required",
        },
        trim: true,
        escape: true,
    },
});
exports.deleteBatchValidator = deleteBatchValidator;
const handleValidationResult = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const message = errors.array();
        return res.status(400).json({
            status: "error",
            message: message[0].msg || "Validation failed",
        });
    }
    next();
};
exports.handleValidationResult = handleValidationResult;
