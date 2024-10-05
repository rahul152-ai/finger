import { Response } from "express";
import NewRequest from "../types/parameters";
import Batch from "../models/batch";
import Student from "../models/students";

const dashboardController = async (req: NewRequest, res: Response) => {
  try {
    const userId = req.userId;

    const batch = await Batch.countDocuments({ batchAdmin: userId });
    const students = await Student.countDocuments({ createdBy: userId });

    return res.status(200).json({
      status: "success",
      data: {
        batch: batch,
        students: students,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export { dashboardController };
