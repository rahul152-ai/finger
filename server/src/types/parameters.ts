import { Request } from "express";

interface NewRequest extends Request {
  userId?: string;
  user?: any; // Replace `any` with your User type
  role?: string;
}

export default NewRequest;
