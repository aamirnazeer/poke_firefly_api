import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  setFavouritesService,
  getFavouritesService,
  deleteFavouriteService,
} from "./service";

const router = Router();

router.post("/", async (req, res, next) => {
  const name = req.query.name as string;
  try {
    await setFavouritesService(name, req.currentUser);
    res.status(StatusCodes.CREATED).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const offset = parseInt(req.query.offset as string) || 0;
  const limit = parseInt(req.query.limit as string) || 15;
  try {
    const data = await getFavouritesService(req.currentUser, offset, limit);
    res.status(StatusCodes.OK).send({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  const name = req.query.name as string;
  try {
    await deleteFavouriteService(name, req.currentUser);
    res.status(StatusCodes.OK).send({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
});

export { router };
