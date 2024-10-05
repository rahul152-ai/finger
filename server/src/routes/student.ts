import express from "express";
import {
  addStudent,
  deleteStudentById,
  editStudents,
  getAllStudents,
  getBatchStudents,
  getStudentById,
} from "../controllers/student";
import upload from "../middleware/multer";
import isAuth from "../middleware/isAuthenticated";
import {
  editStudentValidator,
  handleValidationResult,
  studentValidator,
  validateBatchId,
  validateStudentId,
} from "../validator/student";

const router = express.Router();

router.post(
  "/add",
  isAuth,
  studentValidator,
  handleValidationResult,
  addStudent
);

router.get("/get-all", isAuth, getAllStudents);
router.get(
  "/get/:studentId",
  isAuth,
  validateStudentId,
  handleValidationResult,
  getStudentById
);

router.delete(
  "/delete/:studentId",
  isAuth,
  validateStudentId,
  handleValidationResult,
  deleteStudentById
);

router.get(
  "/batch/:batchId",
  validateBatchId,
  handleValidationResult,
  getBatchStudents
);

router.put(
  "/edit/:studentId",
  // upload,
  editStudentValidator,
  handleValidationResult,
  isAuth,
  editStudents
);

export default router;
