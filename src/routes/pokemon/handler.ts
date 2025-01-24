import { Router } from "express";
import {
  getAllPokemonsService,
  getPokemonDetailsService,
  searchPokemonService,
} from "./service";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", async (req, res, next) => {
  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 15;

  const clampedOffset = Math.min(Math.max(0, offset), 135);
  const clampedLimit = Math.min(Math.max(1, limit), 15);

  try {
    const data = await getAllPokemonsService(clampedOffset, clampedLimit);
    res.status(StatusCodes.OK).send({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  const name = (req.query.name as string) || "";
  try {
    const data = await searchPokemonService(name);
    res.status(StatusCodes.OK).send({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  const name = req.params.name as string;
  try {
    const data = await getPokemonDetailsService(name);
    res.status(StatusCodes.OK).send({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
});

export { router };
