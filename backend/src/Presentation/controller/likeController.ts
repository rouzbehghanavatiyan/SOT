import { Request, Response } from "express";

export const addLike = (req: Request, res: Response): void => {
  const { userId, movieId } = req.body;
  console.log(userId, movieId);
  res.status(200).json({ msg: "Hello worddddld" });
};
