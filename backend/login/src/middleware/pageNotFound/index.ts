import { NextFunction, Request, Response } from "express";

const pageNotFound = (req: Request, res: Response): any =>
  res.status(500).json({ msg: "page not found" });

export default pageNotFound;
