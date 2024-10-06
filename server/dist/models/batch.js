"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const batchSchema = new mongoose_1.default.Schema({
    batchName: {
        type: String,
        required: true,
    },
    batchAdmin: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    studentCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const batch = mongoose_1.default.model("batch", batchSchema);
exports.default = batch;
