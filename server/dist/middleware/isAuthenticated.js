"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
dotenv_1.default.config();
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            const error = new Error("Not authenticated.");
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(" ")[1];
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            const error = new Error();
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                error.statusCode = 401;
                error.message = "Token has expired.";
            }
            else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                error.statusCode = 401;
                error.message = "Invalid token.";
            }
            else {
                error.statusCode = 500;
                error.message = "Internal server error.";
            }
            throw error;
        }
        if (!decodedToken) {
            const error = new Error("Not authenticated.");
            error.statusCode = 401;
            throw error;
        }
        req.userId = decodedToken.userId;
        const user = yield user_1.default.findById(req.userId).select("-__v -otp -otpExpires -layout -lastName -firstName");
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 401;
            throw error;
        }
        req.user = user;
        req.role = user.role;
        next();
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        if (!error.message) {
            error.message = "An error occurred.";
        }
        next(error);
    }
});
exports.default = isAuth;
