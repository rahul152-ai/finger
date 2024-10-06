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
exports.editStudents = exports.getBatchStudents = exports.deleteStudentById = exports.getStudentById = exports.getAllStudents = exports.addStudent = void 0;
const students_1 = __importDefault(require("../models/students"));
const batch_1 = __importDefault(require("../models/batch"));
const student_1 = require("../validator/student");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const deletUploadedFile = (imagPath) => {
    const filePath = path_1.default.join(__dirname, "../uploads", imagPath);
    console.log("delete image path", filePath);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath); // Delete the file
    }
};
const saveBase64Image = (base64Data, fileName) => {
    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return new Error("Invalid base64 data");
    }
    const fileType = matches[1].split("/")[1]; // Get file extension (e.g., png, jpg)
    const buffer = Buffer.from(matches[2], "base64"); // Create a buffer from base64
    // Define the full file path to save the file
    const filePath = path_1.default.join(__dirname, "../uploads", `${fileName}.${fileType}`);
    // Save the file to the server
    try {
        fs_1.default.writeFileSync(filePath, buffer);
        // Return only the filename with extension, not the full path
        return `${fileName}.${fileType}`;
    }
    catch (err) {
        return new Error("Failed to save file");
    }
};
const addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filePaths = [];
    try {
        const { name, batchId, mobileNumber, address, fingerImage } = req.body;
        let images = JSON.parse(fingerImage);
        // Process each base64 image and store the file paths
        images.forEach((base64Image) => {
            const fileName = (0, uuid_1.v4)(); // Generate unique file names
            const filePath = saveBase64Image(base64Image, fileName);
            if (!(filePath instanceof Error)) {
                filePaths.push(filePath); // Add to filePaths if saved successfully
            }
            else {
                throw filePath; // If an error occurs during saving, throw it
            }
        });
        // Create a new student in the database
        const newStudent = yield students_1.default.create({
            name,
            batchId,
            mobileNumber,
            address,
            fingerPrint: filePaths,
            createdBy: req.user._id,
        });
        // If student creation is successful, update the studentCount in the batch
        if (newStudent) {
            yield batch_1.default.findByIdAndUpdate(batchId, {
                $inc: { studentCount: 1 }, // Increment the studentCount by 1
            });
            return res.status(201).json({
                message: "Student added successfully and batch updated",
                status: "success",
                data: newStudent,
            });
        }
    }
    catch (error) {
        // Remove the uploaded files if an error occurs during any step
        if (filePaths.length > 0) {
            (0, student_1.removeUploadedFiles)(filePaths); // Clean up uploaded files
        }
        next(error); // Pass the error to the error handling middleware
    }
});
exports.addStudent = addStudent;
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract page and limit from query with default values
        let { page = "1", limit = "10" } = req.query; // Destructure with default values
        // Convert to numbers with default values
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const userId = req.userId;
        // Calculate how many documents to skip for pagination
        const skip = (pageNumber - 1) * limitNumber;
        // Fetch students created by the user with pagination and select relevant fields
        const students = yield students_1.default.find({ createdBy: userId })
            .select("-__v -createdAt -updatedAt")
            .skip(skip)
            .limit(limitNumber)
            .populate({
            path: "batchId",
            model: "batch",
            select: "batchName",
        })
            .exec();
        // If no students are found
        if (!students.length) {
            return res.status(200).json({
                message: "No students found",
                status: "success",
            });
        }
        // Get total count of students for pagination metadata
        const totalStudents = yield students_1.default.countDocuments({ createdBy: userId });
        return res.status(200).json({
            message: "Successfully fetched students",
            status: "success",
            data: students,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalStudents / limitNumber),
                totalStudents,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        // Find the student by ID and populate batchId with batch details
        const student = yield students_1.default.findById(studentId)
            .select("-__v -createdAt -updatedAt") // Exclude fingerPrint from the response
            .populate({
            path: "batchId",
            model: batch_1.default,
            select: "batchName", // Select batch fields that you want to return
        })
            .exec();
        // Check if the student exists
        if (!student) {
            return next({
                status: 404,
                message: "Student not found",
            });
        }
        // Return the student data if found
        res.status(200).json({
            status: "success",
            message: "Student fetched successfully",
            student,
        });
    }
    catch (error) {
        // Pass the error to the global error handler
        next(error);
    }
});
exports.getStudentById = getStudentById;
// Controller to delete a student by ID and update the batch studentCount
const deleteStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const student = yield students_1.default.findById(studentId);
        // If student does not exist
        if (!student) {
            return next({
                status: 404,
                message: "Student not found",
            });
        }
        const batchId = student.batchId;
        // Delete the student
        yield students_1.default.findByIdAndDelete(studentId);
        // Decrement the student count in the corresponding batch
        if (batchId) {
            yield batch_1.default.findByIdAndUpdate(batchId, {
                $inc: { studentCount: -1 }, // Decrease studentCount by 1
            });
        }
        student.fingerPrint.forEach((fingImage) => {
            deletUploadedFile(fingImage);
        });
        // Respond with success message
        res.status(200).json({
            status: "success",
            message: "Student deleted and batch updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStudentById = deleteStudentById;
const getBatchStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { batchId } = req.params;
        // Extract page and limit from query parameters with default values
        let { page = "1", limit = "10" } = req.query;
        // Convert the query params to integers, with defaults
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        // Calculate the number of documents to skip for pagination
        const skip = (pageNumber - 1) * limitNumber;
        // Fetch students associated with the batchId
        const students = yield students_1.default.find({ batchId })
            .select("-__v -createdAt -updatedAt") // Exclude unnecessary fields
            .skip(skip)
            .limit(limitNumber)
            .populate({
            path: "batchId",
            model: "batch",
            select: "batchName", // Populate batchName for context
        })
            .exec();
        // If no students found, return a success message with no data
        if (!students.length) {
            return res.status(200).json({
                message: "No students found in this batch",
                status: "success",
                data: [],
            });
        }
        // Get the total number of students in the batch (for pagination metadata)
        const totalStudents = yield students_1.default.countDocuments({ batchId });
        // Return fetched students along with pagination metadata
        return res.status(200).json({
            message: "Successfully fetched students",
            status: "success",
            data: students,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalStudents / limitNumber),
                totalStudents,
            },
        });
    }
    catch (error) {
        // Pass any errors to the global error handler
        next(error);
    }
});
exports.getBatchStudents = getBatchStudents;
const editStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filePaths = [];
    try {
        const { studentId } = req.params;
        const { name, batchId, // new batchId
        mobileNumber, address, oldImages, imageMetaData, fingerImage, // updated images
         } = req.body;
        // Fetch the current student details to check the existing batchId
        const currentStudent = yield students_1.default.findById(studentId);
        if (!currentStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        // Capture the old batchId before updating
        const oldBatchId = currentStudent.batchId.toString();
        let images = JSON.parse(fingerImage);
        // Process each base64 image and store the file paths
        images.forEach((base64Image) => {
            const fileName = (0, uuid_1.v4)(); // Generate unique file names
            const filePath = saveBase64Image(base64Image, fileName);
            if (!(filePath instanceof Error)) {
                filePaths.push(filePath); // Add to filePaths if saved successfully
            }
            else {
                throw filePath; // If an error occurs during saving, throw it
            }
        });
        let localImageFilePath = [];
        // Parse imageMetaData, assuming it's an array of indexes representing which old images to replace
        const parsedImageMetaData = imageMetaData;
        // If new files and imageMetaData are provided, update the respective old images
        if (filePaths && filePaths.length > 0 && parsedImageMetaData.length > 0) {
            let oldImageArray = oldImages; // Assuming oldImages is an array of image URLs/paths
            // Replace old images with new ones based on the provided metadata
            parsedImageMetaData.forEach((index, i) => {
                const oldImage = oldImageArray[index]; // Get the old image that should be replaced
                if (oldImage) {
                    console.log("oldImage", oldImage);
                    // Delete the old image
                    deletUploadedFile(oldImage); // Implement the delete logic here
                    // Replace old image URL/path with new image
                    oldImageArray[index] = filePaths[i]; // Replace with the new file's path
                }
            });
            // Set the updated array of image paths
            localImageFilePath = oldImageArray;
        }
        else {
            // No new files, keep the old images unchanged
            localImageFilePath = oldImages;
        }
        // Update the student details in the database
        yield students_1.default.updateOne({ _id: studentId }, {
            $set: {
                name,
                batchId,
                mobileNumber,
                address,
                fingerPrint: localImageFilePath,
            },
        });
        // If the batch has changed, update the batch count
        if (batchId !== oldBatchId) {
            // Decrement the count for the old batch
            yield batch_1.default.updateOne({ _id: oldBatchId }, { $inc: { studentCount: -1 } });
            // Increment the count for the new batch
            yield batch_1.default.updateOne({ _id: batchId }, { $inc: { studentCount: 1 } });
        }
        return res.status(200).json({
            message: "Student updated successfully",
            status: "success",
        });
    }
    catch (error) {
        console.log(error);
        // Remove any newly uploaded files if an error occurs
        if (filePaths.length > 0) {
            (0, student_1.removeUploadedFiles)(filePaths); // Clean up uploaded files
        }
        next(error);
    }
});
exports.editStudents = editStudents;
