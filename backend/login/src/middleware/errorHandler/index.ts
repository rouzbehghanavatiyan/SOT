import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "../../error/index";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.error(err);

  if (err instanceof CustomErrorApi) {
    return res.status(err.statusCode as number).json({ msg: err.message });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("مشکل ارتباط با سرور");
};

export default errorHandler;
