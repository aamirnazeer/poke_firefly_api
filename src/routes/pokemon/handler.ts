import { Router } from "express";
import { getAllPokemons } from "./service";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", async (req, res, next) => {
  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 20;
  try {
    const data = await getAllPokemons({ offset, limit });
    res.status(StatusCodes.OK).send({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
});

export { router };
