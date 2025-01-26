import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../utils/CustomError";
import { setFavouritesController, getFavouritesController, checkFavouritesController, getFavouritesCount, deleteFavouriteController } from "./controller";

export const setFavouritesService = async (name: string, uuid: string) => {
  const count = await checkFavouritesController(name, uuid);
  if (count) throw new CustomError(StatusCodes.CONFLICT, "already set as favourite");
  await setFavouritesController(name, uuid);
};

export const getFavouritesService = async (uuid: string, offset: number, limit: number) => {
  const rawResults = await getFavouritesController(uuid, offset, limit);
  const results = rawResults.map((el) => {
    return {
      ...el,
      isFavourite: true,
    };
  });
  const count = await getFavouritesCount(uuid);
  const next = offset + limit < count ? true : false;
  const previous = offset - limit >= 0 ? true : false;
  return { count, next, previous, results };
};

export const deleteFavouriteService = async (name: string, uuid: string) => {
  const count = await checkFavouritesController(name, uuid);
  if (!count) throw new CustomError(StatusCodes.CONFLICT, "favourite not available");
  await deleteFavouriteController(name, uuid);
};
