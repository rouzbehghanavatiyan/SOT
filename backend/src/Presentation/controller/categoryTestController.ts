import { Request, Response } from "express";

export const categoryTestController = (req: Request, res: Response): void => {
  console.log("Request received");
  res.status(200).json({ msg: "Hello world" });
};
