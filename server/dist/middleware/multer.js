"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure the uploads directory exists
const uploadDir = path_1.default.join(__dirname, "../uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
// Define storage options for multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${(0, uuid_1.v4)()}-${Date.now()}${path_1.default.extname(file.originalname)}`;
        cb(null, uniqueSuffix);
    },
});
// File filter to allow only specific file types (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extName && mimeType) {
        cb(null, true);
    }
    else {
        cb(new Error("Only images are allowed!"));
    }
};
// Multer configuration for handling multiple file uploads (up to 10 files)
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
}).array("fingerImage", 5); // 'files' is the key for file uploads, and 5 is the limit
exports.default = upload;
