import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import User from "../models/user";

const signinValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Email is not valid",
    },
    normalizeEmail: true,
    trim: true,
    escape: true, // Sanitize input to prevent script execution
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars long",
    },
    trim: true,
    escape: true, // Sanitize input to prevent script execution
  },
});

const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return res.status(400).json({
      status: "error",
      message: message[0].msg || "Validation failed",
    });
  }
  next();
};

const signupValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Email is not valid",
    },
    normalizeEmail: true,
    trim: true,
    escape: true,
    custom: {
      options: async (value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars long",
    },
    trim: true,
    escape: true,
  },

  userName: {
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Username should be at least 3 chars long",
    },
    trim: true,
    escape: true,
  },
  role: {
    notEmpty: {
      errorMessage: "Role is required",
    },
    isIn: {
      options: [["user", "admin"]],
      errorMessage: "Invalid role",
    },
  },
  batto: {
    notEmpty: {
      errorMessage:
        "Uh-oh! You missed the passkey—like trying to enter a club without the password!",
    },
    trim: true,
    escape: true,
  },
});

export { signinValidator, signupValidator, handleValidationResult };
