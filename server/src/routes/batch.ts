import express from "express";
import isAuth from "../middleware/isAuthenticated";
import {
  addBatch,
  deleteBatch,
  editBatch,
  getAllBatchs,
  getBatch,
} from "../controllers/batch";
import {
  batchValidator,
  deleteBatchValidator,
  editBatchValidator,
  handleValidationResult,
} from "../validator/batch";

const router = express.Router();

router.post("/add", isAuth, batchValidator, handleValidationResult, addBatch);
router.put(
  "/edit-batch/:batchId",
  isAuth,
  editBatchValidator,
  handleValidationResult,
  editBatch
);
router.delete(
  "/delete-batch/:batchId",
  isAuth,
  deleteBatchValidator,
  handleValidationResult,
  deleteBatch
);
router.get("/get-batchs", isAuth, getAllBatchs);
router.get("/get-batch/:batchId", getBatch);

export default router;
