import eventEmitter from "../../middleware/event/eventEmmiter";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getRouteId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  eventEmitter.emit("getId", userId);
  res.send(userId);
};

export { getRouteId };
