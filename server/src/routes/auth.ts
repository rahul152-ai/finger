import express, { NextFunction, Response } from "express";
import { getProfile, login, signup } from "../controllers/auth";
import {
  handleValidationResult,
  signinValidator,
  signupValidator,
} from "../validator/auth";
import isAuth from "../middleware/isAuthenticated";
import NewRequest from "../types/parameters";
import User from "../models/user";
const router = express.Router();

router.post("/login", signinValidator, handleValidationResult, login);
router.post("/create-user", signupValidator, handleValidationResult, signup);
router.get("/profile", isAuth, getProfile);
router.get("/validate", isAuth, validateUser);

async function validateUser(
  req: NewRequest,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User is not authenticated",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User is authenticated",
      user: user,
    });
  } catch (error) {
    next(error);
  }
}

export default router;
