import axios, { AxiosError } from "axios";
import { LIMIT_VALUE, POKE_API_URL } from "../../core/env";
import { CustomError } from "../../utils/CustomError";
import { getEvolutionChain, filterOutPokemonData } from "./helper";

export const getAllPokemonsService = async (offset: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${POKE_API_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    data["next"] = offset + 15 < LIMIT_VALUE ? !!data["next"] : false;
    data["previous"] = !!data["previous"];

    data.results = filterOutPokemonData(data.results);

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
    const { data: pokemonData } = await axios.get(
      `${POKE_API_URL}/pokemon/${name}`
    );
    const speciesData = await axios.get(
      `${POKE_API_URL}/pokemon-species/${pokemonData.id}/`
    );
    const { url } = speciesData.data.evolution_chain;

    const evolutionChainData = await axios.get(url);

    const evolutions = getEvolutionChain(evolutionChainData.data.chain);

    return {
      abilities: pokemonData.abilities,
      types: pokemonData.types,
      evolutions,
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

export const searchPokemonService = async (name: string) => {
  try {
    if (!name) throw new AxiosError("please provide a name", "422");
    const { data: pokemonData } = await axios.get(
      `${POKE_API_URL}/pokemon/${name}`
    );
    if (pokemonData.id <= LIMIT_VALUE) {
      return {
        name: pokemonData.name,
      };
    } else {
      throw new AxiosError("pokemon out of range", "416");
    }
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      throw new CustomError(error.status ? error.status : 400, error.message);
    } else {
      throw new Error(error.message);
    }
  }
};
