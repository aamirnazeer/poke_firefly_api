export const filterOutPokemonData = (arr: { name: string; url: string }[], favourites: { name: string }[]) => {
  return arr.map((el: any) => {
    return {
      name: el.name,
      id: parseInt(el.url.split("/")[6]) || 0,
      isFavourite: favourites.some((favourite: any) => favourite.name === el.name),
    };
  });
};

export const getEvolutionChain = (chain: any) => {
  const evolutions: string[] = [];

  const evolutionRecursive = (node: any) => {
    if (!node) return;
    evolutions.push(node.species.name);
    if (node.evolves_to.length > 0) {
      node.evolves_to.forEach((evolution: any) => evolutionRecursive(evolution));
    }
  };

  evolutionRecursive(chain);
  return evolutions;
};
