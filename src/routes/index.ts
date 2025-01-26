import { Router } from "express";
import { router as pokemonRouter } from "./pokemon/handler";
import { router as favouriteHandler } from "./favourite/handler";
import { checkUserMiddleware } from "../middlewares/checkUserMiddleware";

const router = Router();

router.use("/pokemon", checkUserMiddleware, pokemonRouter);
router.use("/favourite", checkUserMiddleware, favouriteHandler);

export { router };
