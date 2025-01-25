import express, { json } from "express";
import { router } from "./routes";
import morgan from "morgan";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(json());

app.use(cors());

app.use(morgan("dev"));

app.use(router);

app.use("/*", notFoundHandler);

app.use(errorHandler);

export { app };
