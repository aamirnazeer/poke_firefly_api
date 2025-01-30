import db from "../../db";
import { eq, and, asc } from "drizzle-orm";
import { favourites } from "../../db/schema/favourites";

export const setFavouritesController = async (name: string, id: number, uuid: string) => {
  return db.insert(favourites).values({ pokemon_name: name, user_id: uuid, pokemon_id: id });
};

export const checkFavouritesController = async (name: string, uuid: string) => {
  return db.$count(favourites, and(eq(favourites.user_id, uuid), eq(favourites.pokemon_name, name)));
};

export const getFavouritesCount = async (uuid: string) => {
  return db.$count(favourites, eq(favourites.user_id, uuid));
};

export const getFavouritesController = async (uuid: string, offset: number, limit: number) => {
  return db
    .select({ name: favourites.pokemon_name, id: favourites.pokemon_id })
    .from(favourites)
    .where(eq(favourites.user_id, uuid))
    .orderBy(asc(favourites.pokemon_id))
    .limit(limit)
    .offset(offset);
};

export const deleteFavouriteController = async (name: string, uuid: string) => {
  await db.delete(favourites).where(and(eq(favourites.pokemon_name, name), eq(favourites.user_id, uuid)));
};
