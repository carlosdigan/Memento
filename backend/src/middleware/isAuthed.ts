import { Request, Response, NextFunction } from "express";
import { getTokenPayload } from "../utils";

export const isAuthed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(401);
  }

  const payload = getTokenPayload(token);

  if (!payload) {
    return res.sendStatus(401);
  }

  return next();
};
