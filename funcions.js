//npm install json-server
//npx json-server db.json

//https://pokeapi.co/api/v2/
//https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
const base_url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

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

export const getSpecies = async (name) => {
    const response = await fetch(`${base_url}pokemon-species/${name}`);
    const data = await response.json();
    return data;
}

export const getTypeByPokemon = async (name) => {
    const response = await getPokemon(name);
    const types = response.types.map(type => type.types.type.name);
    return types;
}

const createPokemon = async (name, type) => {
    const pokemon = await getPokemon(name);
    const species = await getSpecies(name);
    const types = await getType(type);
    return {
        ...pokemon,
        species: species,
        types: types
    }
}

// Función para descargar datos de la PokeAPI y guardarlos en db.json
// Define la función downloadAndSaveData() para descargar y guardar los datos
async function downloadAndSaveData() {
    try {
        // Realizar solicitud a la PokeAPI para obtener todos los Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta de la PokeAPI');
        }
        const pokemonData = await response.json();
        
        // Obtener los datos guardados previamente para comparación
        const savedDataResponse = await fetch("http://localhost:3000/pokemons");
        const savedPokemonData = await savedDataResponse.json();

        
        // Verificar si los datos descargados son los mismos que los guardados
        const areEqual = JSON.stringify(pokemonData) === JSON.stringify(savedPokemonData);
        if (areEqual) {
            console.log('Los datos descargados son iguales a los datos guardados anteriormente.');
        } else {
            // Guardar los datos en db.json
            const resposta = await fetch("http://localhost:3000/pokemons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pokemonData)
            });
            const result = await resposta.json();
            

            console.log('Datos de la PokeAPI guardados correctamente en db.json');
        }
    } catch (error) {
        console.error('Error al descargar datos de la PokeAPI:', error);
    }
}

async function crearPokemon(){
    try{
        const nouPokemon = {
            name: "Miguel",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        }
        const resposta = await fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nouPokemon)
        });
        const result = await resposta.json();
        console.log("Pokemon creat", result);

    }catch(error){
        console.error("Error al crear pokemon", error);
    }
}

async function actualitzarPokemon(){
    try{
        const id = 104;
        const pokemonActualitzat = {
            name: "Pablo",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        }
        const resposta = await fetch(`http://localhost:3000/pokemons/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemonActualitzat)
        });
        if(resposta.ok){
            console.log("Pokemon actualitzat correctament");
            const result = await resposta.json();
            console.log("Pokemon actualitzat", result);
        }
    }catch(error){
        console.error("Error al actualitzar pokemon", error);
    }
}

async function eliminarPokemon(){
    try{
        const id = 104;
        const resposta = await fetch(`http://localhost:3000/pokemons/${id}`, {
            method: "DELETE"
        });
        if(resposta.ok){
            console.log("Pokemon eliminat correctament");
            const result = await resposta.json();
            console.log("Pokemon eliminat", result);
        }
    }catch(error){
        console.error("Error al eliminar pokemon", error);
    }

}


// Agrega un event listener al botón con id "carregaPokemons"
document
  .getElementById("carregaPokemons")
  .addEventListener("click", async function () {
    try {
        // Llama a la función downloadAndSaveData() al hacer clic en el botón
        await downloadAndSaveData();
    } catch (error) {
        console.error("Error al obtener pokemons:", error);
    }
});

document
  .getElementById("llistarPokemons")
  .addEventListener("click", async function () {
    try {
        const URL = "http://localhost:3000/pokemons";
        const response = await fetch(URL);
        const data = await response.json();

        console.log(data);

        // data.pokemons[0].results.forEach(pokemon => {
        //     console.log(pokemon.name);
        // });
        
        //console.log("Llista de pokemoms", data.pokemons.results);
        return ("Llista de pokemoms", data.pokemons);
    } catch (error) {
        console.error("Error al llistar pokemons:", error);
    }
});

document
  .getElementById("crearPokemon")
  .addEventListener("click", async function () {
    try {
        await crearPokemon();
    } catch (error) {
        console.error("Error al crear pokemon:", error);
    }
});

document
    .getElementById("actualitzarPokemon")
    .addEventListener("click", async function () {
        try {
            await actualitzarPokemon();
        } catch (error) {
            console.error("Error al actualitzar pokemon:", error);
        }
    });

document
    .getElementById("eliminarPokemon")
    .addEventListener("click", async function () {
        try {
            await eliminarPokemon();
        } catch (error) {
            console.error("Error al eliminar pokemon:", error);
        }
    });

const funcions = {
    getPokemon,
    getAbility,
    getMove,
    getType,
    getSpecies,
    getTypeByPokemon,
    createPokemon,
    downloadAndSaveData,
};

export default funcions;