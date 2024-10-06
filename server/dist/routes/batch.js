"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const batch_1 = require("../controllers/batch");
const batch_2 = require("../validator/batch");
const router = express_1.default.Router();
router.post("/add", isAuthenticated_1.default, batch_2.batchValidator, batch_2.handleValidationResult, batch_1.addBatch);
router.put("/edit-batch/:batchId", isAuthenticated_1.default, batch_2.editBatchValidator, batch_2.handleValidationResult, batch_1.editBatch);
router.delete("/delete-batch/:batchId", isAuthenticated_1.default, batch_2.deleteBatchValidator, batch_2.handleValidationResult, batch_1.deleteBatch);
router.get("/get-batchs", isAuthenticated_1.default, batch_1.getAllBatchs);
router.get("/get-batch/:batchId", batch_1.getBatch);
exports.default = router;
