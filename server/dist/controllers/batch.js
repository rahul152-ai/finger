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
exports.getAllBatchs = exports.deleteBatch = exports.editBatch = exports.addBatch = exports.getBatch = void 0;
const batch_1 = __importDefault(require("../models/batch"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorMiddleWare_1 = require("../middleware/errorMiddleWare");
const students_1 = __importDefault(require("../models/students"));
const addBatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batchName, studentCount } = req.body;
        const batch = new batch_1.default({
            batchName,
            batchAdmin: new mongoose_1.default.Types.ObjectId(req.userId),
        });
        yield batch.save();
        res.status(201).json({ message: "Batch added successfully", data: batch });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.addBatch = addBatch;
const editBatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batchName, studentCount } = req.body;
        const { batchId } = req.params;
        const batch = yield batch_1.default.findById(batchId);
        if (!batch) {
            throw new errorMiddleWare_1.AppError("Batch not found", 404);
        }
        batch.batchName = batchName;
        yield batch.save();
        res
            .status(200)
            .json({ message: "Batch updated successfully", data: batch });
    }
    catch (error) {
        next(error);
    }
});
exports.editBatch = editBatch;
const deleteBatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield batch_1.default.startSession();
    session.startTransaction();
    try {
        const { batchId } = req.params;
        // Find and delete the batch
        const batch = yield batch_1.default.findByIdAndDelete(batchId, { session });
        if (!batch) {
            throw new errorMiddleWare_1.AppError("Batch not found", 404);
        }
        // Delete all students related to this batch
        yield students_1.default.deleteMany({ batchId: batchId }, { session });
        // Commit the transaction if everything is successful
        yield session.commitTransaction();
        res.status(200).json({
            message: "Batch and associated students deleted successfully",
            data: null,
        });
    }
    catch (error) {
        // Rollback the transaction in case of error
        yield session.abortTransaction();
        next(error);
    }
    finally {
        // End the session
        session.endSession();
    }
});
exports.deleteBatch = deleteBatch;
const getAllBatchs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const totalDocuments = yield batch_1.default.countDocuments({
            batchAdmin: new mongoose_1.default.Types.ObjectId(req.userId),
        });
        const batches = yield batch_1.default.find({
            batchAdmin: new mongoose_1.default.Types.ObjectId(req.userId),
        })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .populate({
            path: "batchAdmin",
            model: "user",
            select: "userName",
        });
        if (!batches) {
            throw new errorMiddleWare_1.AppError("No batches found", 404);
        }
        res.status(200).json({
            message: "Batches fetched",
            data: batches,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalDocuments / pageSize),
                totalBatches: totalDocuments,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBatchs = getAllBatchs;
const getBatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batchId } = req.params;
        console.log(batchId);
        const batch = yield batch_1.default.findById(new mongoose_1.default.Types.ObjectId(batchId)).select("-__v -createdAt -updatedAt -studentCount");
        res.status(200).json({
            message: "Batch fetched",
            data: batch,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBatch = getBatch;
