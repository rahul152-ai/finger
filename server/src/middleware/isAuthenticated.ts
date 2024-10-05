import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import User from "../models/user";

interface CustomError extends Error {
  statusCode?: number;
}

dotenv.config();

interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any; // Replace `any` with your User type
  role?: string;
}

const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated.") as any;
      (error as CustomError).statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    } catch (err) {
      const error: CustomError = new Error();

      if (err instanceof TokenExpiredError) {
        error.statusCode = 401;
        error.message = "Token has expired.";
      } else if (err instanceof JsonWebTokenError) {
        error.statusCode = 401;
        error.message = "Invalid token.";
      } else {
        error.statusCode = 500;
        error.message = "Internal server error.";
      }

      throw error;
    }

    if (!decodedToken) {
      const error = new Error("Not authenticated.") as any;
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;

    const user = await User.findById(req.userId).select(
      "-__v -otp -otpExpires -layout -lastName -firstName"
    );

    if (!user) {
      const error = new Error("User not found.") as any;
      error.statusCode = 401;
      throw error;
    }
    req.user = user;
    req.role = user.role;
    next();
  } catch (error) {
    if (!(error as any).statusCode) {
      (error as any).statusCode = 500;
    }
    if (!(error as any).message) {
      (error as any).message = "An error occurred.";
    }
    next(error);
  }
};

export default isAuth;
