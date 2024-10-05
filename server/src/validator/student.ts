import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import fs from "fs";
import path from "path";

const studentValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "name is required",
    },
    trim: true,
    escape: true,
  },
  mobileNumber: {
    notEmpty: {
      errorMessage: "Mobile number is required",
    },
    trim: true,
    escape: true,
  },
  address: {
    notEmpty: {
      errorMessage: "Address is required",
    },
    trim: true,
    escape: true,
  },
  batchId: {
    notEmpty: {
      errorMessage: "Batch id is required",
    },
    trim: true,
    escape: true,
  },
});

const validateStudentId = checkSchema({
  studentId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Student id is required",
    },
    trim: true,
    escape: true,
    isMongoId: {
      errorMessage: "Invalid student id format",
    },
  },
});
const validateBatchId = checkSchema({
  batchId: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Batch id is required",
    },
    trim: true,
    escape: true,
    isMongoId: {
      errorMessage: "Invalid batch id format",
    },
  },
});

// Function to remove the uploaded file(s)
const removeUploadedFiles = (filePaths: string[]) => {
  if (filePaths && filePaths.length > 0) {
    filePaths.forEach((filePath) => {
      // Construct the full file path
      const fullFilePath = path.join(__dirname, "../uploads", filePath);

      // Check if the file exists before trying to delete it
      if (fs.existsSync(fullFilePath)) {
        try {
          fs.unlinkSync(fullFilePath); // Delete the file
          console.log(`Deleted file: ${fullFilePath}`);
        } catch (err) {
          console.error(`Error while deleting file: ${fullFilePath}`, err);
        }
      } else {
        console.warn(`File not found: ${fullFilePath}`);
      }
    });
  }
};

const editStudentValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "name is required",
    },
    trim: true,
    escape: true,
  },
  mobileNumber: {
    notEmpty: {
      errorMessage: "Mobile number is required",
    },
    trim: true,
    escape: true,
  },
  address: {
    notEmpty: {
      errorMessage: "Address is required",
    },
    trim: true,
    escape: true,
  },
  batchId: {
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
    console.log(req.files);

    const message = errors.array();
    return res.status(400).json({
      status: "error",
      message: message[0].msg || "Validation failed",
    });
  }
  next();
};

export {
  studentValidator,
  handleValidationResult,
  validateStudentId,
  validateBatchId,
  editStudentValidator,
  removeUploadedFiles,
};
