import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utils/CustomError";

declare global {
  namespace Express {
    interface Request {
      currentUser: string;
    }
  }
}

export const checkUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.get("user-id");
  if (!userId) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "user details absent");
  } else {
    req.currentUser = userId;
  }

  next();
};
