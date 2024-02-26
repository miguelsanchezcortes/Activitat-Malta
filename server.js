const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser); 

server.delete('')


server.delete('/x/:id', (req, res) => {
    const characterId = parseInt(req.params.id);

    router.db.get('x').remove({ id: characterId }).write();


    router.db.write();

    res.json({ message: 'Personaje eliminado correctamente' });
});

server.use(router);

server.listen(port, () => {
    console.log(`JSON Server está corriendo en el puerto ${port}`);
});

const fs = require('fs');

// Función para descargar datos de la PokeAPI y guardarlos en db.json
async function downloadAndSaveData() {
    try {
        // Realizar solicitud a la PokeAPI para obtener todos los Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta de la PokeAPI');
        }
        const pokemonData = await response.json();

        // Guardar los datos en db.json
        fs.writeFileSync('db.json', JSON.stringify({ pokemon: pokemonData.results }, null, 2));

        console.log('Datos de la PokeAPI guardados correctamente en db.json');
    } catch (error) {
        console.error('Error al descargar datos de la PokeAPI:', error);
    }
}

// Llamar a la función para descargar datos y guardarlos en db.json
downloadAndSaveData();
