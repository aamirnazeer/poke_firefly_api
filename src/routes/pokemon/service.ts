import axios, { AxiosError } from "axios";
import { LIMIT_VALUE, POKE_API_URL } from "../../core/env";
import { CustomError } from "../../utils/CustomError";
import { getEvolutionChain, filterOutPokemonData } from "./helper";
import { getFavouritesController } from "../favourite/controller";

export const getAllPokemonsService = async (offset: number, limit: number, currentUser: string) => {
  try {
    const { data } = await axios.get(`${POKE_API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const allFavourites = await getFavouritesController(currentUser, 0, LIMIT_VALUE);

    data["next"] = offset + 15 < LIMIT_VALUE ? !!data["next"] : false;
    data["previous"] = !!data["previous"];

    data.results = filterOutPokemonData(data.results, allFavourites);

    return data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      throw new CustomError(error.status ? error.status : 400, error.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const getPokemonDetailsService = async (name: string) => {
  try {
    const { data: pokemonData } = await axios.get(`${POKE_API_URL}/pokemon/${name}`);
    const speciesData = await axios.get(`${POKE_API_URL}/pokemon-species/${pokemonData.id}/`);
    const { url } = speciesData.data.evolution_chain;

    const evolutionChainData = await axios.get(url);

    const evolutions = getEvolutionChain(evolutionChainData.data.chain);
    const abilities = pokemonData.abilities.map((el: any) => {
      return el.ability.name;
    });
    const types = pokemonData.types.map((el: any) => {
      return el.type.name;
    });

    const { id } = pokemonData;

    return {
      abilities,
      types,
      evolutions,
      id,
    };
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      throw new CustomError(error.status ? error.status : 400, error.message);
    } else {
      throw new Error(error.message);
    }
  }
};

export const searchPokemonService = async (name: string, currentUser: string) => {
  try {
    if (!name) throw new AxiosError("please provide a name", "422");
    const { data: pokemonData } = await axios.get(`${POKE_API_URL}/pokemon/${name}`);
    const allFavourites = await getFavouritesController(currentUser, 0, LIMIT_VALUE);
    const isFavourite = allFavourites.some((el) => el.name === pokemonData.name);
    if (pokemonData.id <= LIMIT_VALUE) {
      return {
        name: pokemonData.name,
        id: pokemonData.id,
        isFavourite,
      };
    } else {
      throw new AxiosError("pokemon out of range", "416");
    }
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      throw new CustomError(
        error.status ? error.status : 400,
        error.message === "Request failed with status code 404" ? "unable to search for requested pokemon" : error.message
      );
    } else {
      throw new Error(error.message === "Request failed with status code 404" ? "cannot find" : error.message);
    }
  }
};
