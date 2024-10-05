import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";

const batchValidator = checkSchema({
  batchName: {
    notEmpty: {
      errorMessage: "Batch name is required",
    },
    trim: true,
    escape: true,
  },
});

const editBatchValidator = checkSchema({
  batchName: {
    notEmpty: {
      errorMessage: "Batch name is required",
    },
    trim: true,
    escape: true,
  },
  batchId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Batch id is required",
    },
    trim: true,
    escape: true,
  },
});
const deleteBatchValidator = checkSchema({
  batchId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Batch id is required",
    },
    trim: true,
    escape: true,
  },
});

const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return res.status(400).json({
      status: "error",
      message: message[0].msg || "Validation failed",
    });
  }
  next();
};

export {
  batchValidator,
  editBatchValidator,
  handleValidationResult,
  deleteBatchValidator,
};
