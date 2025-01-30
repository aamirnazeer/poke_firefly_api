import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const favourites = sqliteTable("favourites", {
  id: int().primaryKey({ autoIncrement: true }),
  pokemon_name: text().notNull(),
  pokemon_id: int().notNull(),
  user_id: text().notNull(),
});
