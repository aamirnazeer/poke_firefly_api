import { Router } from "express";
import { getAllPokemonsService, getPokemonDetailsService, searchPokemonService } from "./service";
import { StatusCodes } from "http-status-codes";
import { LIMIT_VALUE } from "../../core/env";

const router = Router();

router.get("/", async (req, res, next) => {
  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 15;

  const clampedOffset = Math.min(Math.max(0, offset), LIMIT_VALUE - limit);
  const clampedLimit = Math.min(Math.max(1, limit), 15);

  const { currentUser } = req;

  try {
    const data = await getAllPokemonsService(clampedOffset, clampedLimit, currentUser);
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
  const { currentUser } = req;
  try {
    const data = await searchPokemonService(name, currentUser);
    res.status(StatusCodes.OK).send({
      status: "success",
      data: [data],
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
