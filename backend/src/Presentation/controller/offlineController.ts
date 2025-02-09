import { Request, Response } from "express";

export const addOffline = (req: Request, res: Response): void => {
  const {} = req.body;
  res.status(200).json({ msg: "Hello world" });
};
