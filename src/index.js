const base_url = "https://pokeapi.co/api/v2/";

export const getPokemon = async (name) => {
    const response = await fetch(`${base_url}pokemon/${name}`);
    const data = await response.json();
    return data;
}

export const getAbility = async (name) => {
    const response = await fetch(`${base_url}ability/${name}`);
    const data = await response.json();
    return data;
}

export const getMove = async (name) => {
    const response = await fetch(`${base_url}move/${name}`);
    const data = await response.json();
    return data;
}

export const getType = async (name) => {
    const response = await fetch(`${base_url}type/${name}`);
    const data = await response.json();
    return data;
}