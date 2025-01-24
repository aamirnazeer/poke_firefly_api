import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DB_FILE_NAME } from "./src/core/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema",
  dialect: "sqlite",
  dbCredentials: {
    url: DB_FILE_NAME!,
  },
});
