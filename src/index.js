import funcions from "./funcions";

async function main(){
    const pokemon = await funcions.getPokemon("pikachu");
    console.log(pokemon);
    const ability = await funcions.getAbility("static");
    console.log(ability);
}

main();

export default main;