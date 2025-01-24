import { config } from "dotenv";

config();

export const ENV = process.env.ENV;
export const PORT = process.env.PORT;
export const POKE_API_URL = process.env.POKE_API_URL;
export const SELF_API_URL = process.env.SELF_API_URL;
export const DB_FILE_NAME = process.env.DB_FILE_NAME;
export const LIMIT_VALUE = parseInt(process.env.LIMIT_VALUE!) || 150;
