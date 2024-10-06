"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    batchId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
    },
    fingerPrint: {
        type: [String],
        required: true,
    },
    mobileNumber: {
        type: Number,
        requiredf: true,
    },
    address: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
const student = mongoose_1.default.model("Student", studentSchema);
exports.default = student;
