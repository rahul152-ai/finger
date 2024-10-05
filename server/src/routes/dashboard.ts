import express from "express";

const router = express.Router();
import { dashboardController } from "../controllers/dashboard";
import isAuth from "../middleware/isAuthenticated";

router.get("/", isAuth, dashboardController);

export default router;
