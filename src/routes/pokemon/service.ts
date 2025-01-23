import axios from "axios";
import { POKE_API_URL, SELF_API_URL } from "../../core/env";
import { CustomError } from "../../utils/CustomError";

type GetPokemonsParams = {
  offset: number;
  limit: number;
};

export const getAllPokemons = async ({ offset, limit }: GetPokemonsParams) => {
  try {
    const { data } = await axios.get(
      `${POKE_API_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    ["next", "previous"].forEach((key) => {
      if (data[key]) {
        data[key] = data[key].replace(POKE_API_URL, SELF_API_URL);
      }
    });
    data.results = urlToId(data.results);

    return data;
  } catch (error: any) {
    throw new CustomError(error.status, error.message);
  }
};

const urlToId = (arr: any) => {
  return arr.map((el: any) => {
    return {
      name: el.name,
      id: el.url.split("/")[6],
    };
  });
};
