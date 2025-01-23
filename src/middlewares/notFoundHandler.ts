import { CustomError } from "../utils/CustomError";
import { StatusCodes } from "http-status-codes";

export const notFoundHandler = () => {
  throw new CustomError(StatusCodes.NOT_FOUND, "route not found");
};
