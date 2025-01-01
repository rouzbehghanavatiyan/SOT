import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import uuid from "uuid";
import asyncWrapper from "../../middleware/asyncWrapper";
import { CustomErrorApi } from "../../error/CustomError";
import UnAthenticated from "../../error/UnAthenticated";
import StatusCodes from "http-status-codes";
import { UserService } from "../../services/register";
require("dotenv").config();
const id = uuid.v4();
const User = require("../model/userModel");

declare global {
  namespace Express {
    interface Request {
      user?: {
        userName: string;
        userId: string;
      };
    }
  }
}

const userService = new UserService();

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { userName, email, password, confirmPassword } = req.body;

  if (!userName || !email || !password) {
    throw new CustomErrorApi("Please provide all the required fields", 400);
  }

  if (password !== confirmPassword) {
    throw new CustomErrorApi("Passwords do not match", 400);
  }

  const registerUser = await userService.createUser(userName, email, password); // استفاده از نمونه
  const token = await userService.createJWT(
    registerUser.id,
    registerUser.userName
  );

  res.status(StatusCodes.CREATED).json({
    code: 0,
    result: registerUser,
    token,
  });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const userLogin = await User.findOne({ userName });
  if (!userName || !password) {
    throw new CustomErrorApi("Please provide all the required fields", 404);
  }
  const fixHashPass = userLogin.comparePass(password);
  if (!fixHashPass) {
    throw new UnAthenticated("invalid athenticated", 403);
  }
  const token = userLogin.createJWT();
  res.status(StatusCodes.CREATED).json({ code: 0, token, result: userLogin });
});

export const dashboard = asyncWrapper(async (req: Request, res: Response) => {
  const { userName, userId } = req.user!;
  console.log(userName, userId);
  res.status(201).json({
    code: 0,
    result: { userName, userId },
  });
});
