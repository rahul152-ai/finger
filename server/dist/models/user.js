"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "pending"],
        required: true,
    },
    allowedBatch: {
        type: Number,
    },
    allowedStudent: {
        type: Number,
    },
    defaultIcon: {
        type: String,
        default: "defaultAvatar.png",
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
