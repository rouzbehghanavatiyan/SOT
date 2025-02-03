import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomErrorApi } from "../../error/CustomError";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    userName: string;
  };
}

const authorizationMidd = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    // throw new CustomErrorApi("No token provided", 401);
    throw new Error("No token provided");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { userId, userName } = decoded as {
      userId: string;
      userName: string;
    };
    req.user = { userId, userName };
    next();
  } catch (error) {
    // throw new CustomErrorApi("Not authorized to access this route", 403);
    throw new Error("Not authorized to access this route");
  }
};

export default authorizationMidd;
