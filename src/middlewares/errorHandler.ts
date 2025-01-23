import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof CustomError) {
    const { statusCode, message, details } = err;
    res.status(statusCode).json({
      status: "error",
      message,
      ...(details && { details }),
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { errorHandler };
