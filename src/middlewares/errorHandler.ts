import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof CustomError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: "error",
      message,
    });
  } else {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { errorHandler };
