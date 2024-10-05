import controllersParameters from "../types/parameters";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/errorMiddleWare";
import { NextFunction, Request, Response } from "express";
import NewRequest from "../types/parameters";

dotenv.config();

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email }).select(
      "-createdAt -updatedAt -__v"
    );

    // If user not found, return error
    if (!user) {
      const error = new AppError("User not found.", 401, "error");
      console.log("error in user not found", error);
      return next(error);
    }

    // Compare provided password with stored password
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new AppError("Wrong password!", 401, "error");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET as string, // Ensure JWT_SECRET is always defined
      { expiresIn: "8h" } // 1 hour expiration time is a common practice
    );

    // Find user details to send in response, excluding sensitive fields
    const resUser = await User.findOne({ email: email }).select(
      "-createdAt -updatedAt -__v -password -status -isVerified"
    );

    // Return success response
    return res.status(200).json({
      status: "success",
      message: "User logged in!",
      token: token,
      user: resUser,
    });
  } catch (error) {
    next(error);
  }
};

// Signup handler
const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userName, password, role, email, batto } = req.body;

    // Validate passkey
    if (!batto) {
      throw new AppError("Passkey is required.", 400, "error");
    }

    // Compare provided passkey with hashed passkey from environment
    const isPasskeyValid = await bcrypt.compare(
      batto,
      process.env.PASS_KY as string
    );
    if (!isPasskeyValid) {
      throw new AppError(
        "Whoops! That password seems to be from another galaxy. Try again?",
        403,
        "error"
      );
    }

    if (role === "admin") {
      throw new AppError(
        "Admin? That's like asking for the keys to the kingdom! Slow down there, hero!",
        403,
        "error"
      );
    }

    // Hash the user password
    const hasPassword = await bcrypt.hash(password, 12);

    // Create and save new user
    const user = new User({
      userName,
      password: hasPassword,
      status: "active",
      isverified: true,
      role,
      email,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// get profile

const getProfile = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    const user = User.findById({ userId }).select(
      "-createdAt -updatedAt -__v -password -status -allowedBatch -allowedStudent -isVerified"
    );
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found!",
      });
    }

    return res.status(200).json({
      status: "success",
      user: user,
      message: "successfully fetched user",
    });
  } catch (error) {
    next(error);
  }
};

export { login, signup, getProfile };
