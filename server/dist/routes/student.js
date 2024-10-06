"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = require("../controllers/student");
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const student_2 = require("../validator/student");
const router = express_1.default.Router();
router.post("/add", isAuthenticated_1.default, student_2.studentValidator, student_2.handleValidationResult, student_1.addStudent);
router.get("/get-all", isAuthenticated_1.default, student_1.getAllStudents);
router.get("/get/:studentId", isAuthenticated_1.default, student_2.validateStudentId, student_2.handleValidationResult, student_1.getStudentById);
router.delete("/delete/:studentId", isAuthenticated_1.default, student_2.validateStudentId, student_2.handleValidationResult, student_1.deleteStudentById);
router.get("/batch/:batchId", student_2.validateBatchId, student_2.handleValidationResult, student_1.getBatchStudents);
router.put("/edit/:studentId", 
// upload,
student_2.editStudentValidator, student_2.handleValidationResult, isAuthenticated_1.default, student_1.editStudents);
exports.default = router;
