"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUploadedFiles = exports.editStudentValidator = exports.validateBatchId = exports.validateStudentId = exports.handleValidationResult = exports.studentValidator = void 0;
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const studentValidator = (0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            errorMessage: "name is required",
        },
        trim: true,
        escape: true,
    },
    mobileNumber: {
        notEmpty: {
            errorMessage: "Mobile number is required",
        },
        trim: true,
        escape: true,
    },
    address: {
        notEmpty: {
            errorMessage: "Address is required",
        },
        trim: true,
        escape: true,
    },
    batchId: {
        notEmpty: {
            errorMessage: "Batch id is required",
        },
        trim: true,
        escape: true,
    },
});
exports.studentValidator = studentValidator;
const validateStudentId = (0, express_validator_1.checkSchema)({
    studentId: {
        in: ["params"],
        notEmpty: {
            errorMessage: "Student id is required",
        },
        trim: true,
        escape: true,
        isMongoId: {
            errorMessage: "Invalid student id format",
        },
    },
});
exports.validateStudentId = validateStudentId;
const validateBatchId = (0, express_validator_1.checkSchema)({
    batchId: {
        in: ["params"],
        notEmpty: {
            errorMessage: "Batch id is required",
        },
        trim: true,
        escape: true,
        isMongoId: {
            errorMessage: "Invalid batch id format",
        },
    },
});
exports.validateBatchId = validateBatchId;
// Function to remove the uploaded file(s)
const removeUploadedFiles = (filePaths) => {
    if (filePaths && filePaths.length > 0) {
        filePaths.forEach((filePath) => {
            // Construct the full file path
            const fullFilePath = path_1.default.join(__dirname, "../uploads", filePath);
            // Check if the file exists before trying to delete it
            if (fs_1.default.existsSync(fullFilePath)) {
                try {
                    fs_1.default.unlinkSync(fullFilePath); // Delete the file
                    console.log(`Deleted file: ${fullFilePath}`);
                }
                catch (err) {
                    console.error(`Error while deleting file: ${fullFilePath}`, err);
                }
            }
            else {
                console.warn(`File not found: ${fullFilePath}`);
            }
        });
    }
};
exports.removeUploadedFiles = removeUploadedFiles;
const editStudentValidator = (0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            errorMessage: "name is required",
        },
        trim: true,
        escape: true,
    },
    mobileNumber: {
        notEmpty: {
            errorMessage: "Mobile number is required",
        },
        trim: true,
        escape: true,
    },
    address: {
        notEmpty: {
            errorMessage: "Address is required",
        },
        trim: true,
        escape: true,
    },
    batchId: {
        notEmpty: {
            errorMessage: "Batch id is required",
        },
        trim: true,
        escape: true,
    },
});
exports.editStudentValidator = editStudentValidator;
const handleValidationResult = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(req.files);
        const message = errors.array();
        return res.status(400).json({
            status: "error",
            message: message[0].msg || "Validation failed",
        });
    }
    next();
};
exports.handleValidationResult = handleValidationResult;
