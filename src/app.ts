import express, { json } from "express";
import { router } from "./routes";
import morgan from "morgan";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(json());

app.use(morgan("dev"));

app.use(router);

app.use("/*", notFoundHandler);

app.use(errorHandler);

export { app };
