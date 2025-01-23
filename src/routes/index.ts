import { Router } from "express";
import { router as pokemonRouter } from "./pokemon/handler";

const router = Router();

router.use("/pokemon", pokemonRouter);

export { router };
