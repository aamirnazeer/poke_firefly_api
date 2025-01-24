import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { DB_FILE_NAME } from "../core/env";

const db = drizzle(DB_FILE_NAME!);

export default db;
