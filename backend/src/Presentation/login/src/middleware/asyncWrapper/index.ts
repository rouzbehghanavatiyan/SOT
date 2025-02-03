import { NextFunction, Request, Response } from "express";
import { CustomErrorApi } from "../../error/index";
import { z } from "zod";

const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("Caaaaaaaatch Errrror . . .", error);

      if (error instanceof z.ZodError) {
        return next(new CustomErrorApi("Validation error", 400));
      }

      return next(new CustomErrorApi("Internal server error", 500));
    }
  };
};

export default asyncWrapper;
