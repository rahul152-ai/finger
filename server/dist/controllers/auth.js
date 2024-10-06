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
exports.getProfile = exports.signup = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMiddleWare_1 = require("../middleware/errorMiddleWare");
dotenv_1.default.config();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_1.default.findOne({ email: email }).select("-createdAt -updatedAt -__v");
        // If user not found, return error
        if (!user) {
            const error = new errorMiddleWare_1.AppError("User not found.", 401, "error");
            console.log("error in user not found", error);
            return next(error);
        }
        // Compare provided password with stored password
        const isEqual = yield bcryptjs_1.default.compare(password, user.password);
        if (!isEqual) {
            throw new errorMiddleWare_1.AppError("Wrong password!", 401, "error");
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user._id.toString(),
        }, process.env.JWT_SECRET, // Ensure JWT_SECRET is always defined
        { expiresIn: "8h" } // 1 hour expiration time is a common practice
        );
        // Find user details to send in response, excluding sensitive fields
        const resUser = yield user_1.default.findOne({ email: email }).select("-createdAt -updatedAt -__v -password -status -isVerified");
        // Return success response
        return res.status(200).json({
            status: "success",
            message: "User logged in!",
            token: token,
            user: resUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
// Signup handler
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, role, email, batto } = req.body;
        // Validate passkey
        if (!batto) {
            throw new errorMiddleWare_1.AppError("Passkey is required.", 400, "error");
        }
        // Compare provided passkey with hashed passkey from environment
        const isPasskeyValid = yield bcryptjs_1.default.compare(batto, process.env.PASS_KY);
        if (!isPasskeyValid) {
            throw new errorMiddleWare_1.AppError("Whoops! That password seems to be from another galaxy. Try again?", 403, "error");
        }
        if (role === "admin") {
            throw new errorMiddleWare_1.AppError("Admin? That's like asking for the keys to the kingdom! Slow down there, hero!", 403, "error");
        }
        // Hash the user password
        const hasPassword = yield bcryptjs_1.default.hash(password, 12);
        // Create and save new user
        const user = new user_1.default({
            userName,
            password: hasPassword,
            status: "active",
            isverified: true,
            role,
            email,
        });
        yield user.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
// get profile
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = user_1.default.findById({ userId }).select("-createdAt -updatedAt -__v -password -status -allowedBatch -allowedStudent -isVerified");
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found!",
            });
        }
        return res.status(200).json({
            status: "success",
            user: user,
            message: "successfully fetched user",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProfile = getProfile;
