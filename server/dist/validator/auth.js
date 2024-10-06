"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationResult = exports.signupValidator = exports.signinValidator = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const signinValidator = (0, express_validator_1.checkSchema)({
    email: {
        notEmpty: {
            errorMessage: "Email is required",
        },
        isEmail: {
            errorMessage: "Email is not valid",
        },
        normalizeEmail: true,
        trim: true,
        escape: true, // Sanitize input to prevent script execution
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password should be at least 6 chars long",
        },
        trim: true,
        escape: true, // Sanitize input to prevent script execution
    },
});
exports.signinValidator = signinValidator;
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
const signupValidator = (0, express_validator_1.checkSchema)({
    email: {
        notEmpty: {
            errorMessage: "Email is required",
        },
        isEmail: {
            errorMessage: "Email is not valid",
        },
        normalizeEmail: true,
        trim: true,
        escape: true,
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                return user_1.default.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("E-Mail address already exists!");
                    }
                });
            }),
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password should be at least 6 chars long",
        },
        trim: true,
        escape: true,
    },
    userName: {
        notEmpty: {
            errorMessage: "Username is required",
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Username should be at least 3 chars long",
        },
        trim: true,
        escape: true,
    },
    role: {
        notEmpty: {
            errorMessage: "Role is required",
        },
        isIn: {
            options: [["user", "admin"]],
            errorMessage: "Invalid role",
        },
    },
    batto: {
        notEmpty: {
            errorMessage: "Uh-oh! You missed the passkey—like trying to enter a club without the password!",
        },
        trim: true,
        escape: true,
    },
});
exports.signupValidator = signupValidator;
