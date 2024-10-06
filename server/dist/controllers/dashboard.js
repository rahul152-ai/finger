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
exports.dashboardController = void 0;
const batch_1 = __importDefault(require("../models/batch"));
const students_1 = __importDefault(require("../models/students"));
const dashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const batch = yield batch_1.default.countDocuments({ batchAdmin: userId });
        const students = yield students_1.default.countDocuments({ createdBy: userId });
        return res.status(200).json({
            status: "success",
            data: {
                batch: batch,
                students: students,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
});
exports.dashboardController = dashboardController;
