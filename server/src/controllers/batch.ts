import { Request, Response, NextFunction } from "express";
import Batch from "../models/batch";
import NewRequest from "../types/parameters";
import mongoose from "mongoose";
import { AppError } from "../middleware/errorMiddleWare";
import Student from "../models/students";
const addBatch = async (req: NewRequest, res: Response, next: NextFunction) => {
  try {
    const { batchName, studentCount } = req.body;
    const batch = new Batch({
      batchName,
      batchAdmin: new mongoose.Types.ObjectId(req.userId),
    });
    await batch.save();
    res.status(201).json({ message: "Batch added successfully", data: batch });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const editBatch = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { batchName, studentCount } = req.body;
    const { batchId } = req.params;
    const batch = await Batch.findById(batchId);
    if (!batch) {
      throw new AppError("Batch not found", 404);
    }
    batch.batchName = batchName;
    await batch.save();
    res
      .status(200)
      .json({ message: "Batch updated successfully", data: batch });
  } catch (error) {
    next(error);
  }
};
const deleteBatch = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await Batch.startSession();
  session.startTransaction();

  try {
    const { batchId } = req.params;

    // Find and delete the batch
    const batch = await Batch.findByIdAndDelete(batchId, { session });
    if (!batch) {
      throw new AppError("Batch not found", 404);
    }

    // Delete all students related to this batch
    await Student.deleteMany({ batchId: batchId }, { session });

    // Commit the transaction if everything is successful
    await session.commitTransaction();
    res.status(200).json({
      message: "Batch and associated students deleted successfully",
      data: null,
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    next(error);
  } finally {
    // End the session
    session.endSession();
  }
};

const getAllBatchs = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;

    const totalDocuments = await Batch.countDocuments({
      batchAdmin: new mongoose.Types.ObjectId(req.userId),
    });

    const batches = await Batch.find({
      batchAdmin: new mongoose.Types.ObjectId(req.userId),
    })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: "batchAdmin",
        model: "user",
        select: "userName",
      });

    if (!batches) {
      throw new AppError("No batches found", 404);
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
  } catch (error) {
    next(error);
  }
};
const getBatch = async (req: NewRequest, res: Response, next: NextFunction) => {
  try {
    const { batchId } = req.params;
    console.log(batchId);
    const batch = await Batch.findById(
      new mongoose.Types.ObjectId(batchId)
    ).select("-__v -createdAt -updatedAt -studentCount");

    res.status(200).json({
      message: "Batch fetched",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};

export { getBatch, addBatch, editBatch, deleteBatch, getAllBatchs };
