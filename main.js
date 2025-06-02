//const apiRickMorty = "https://rickandmortyapi.com/api/character";

/* Esta funcion me va a generar un numero aleatorio que la voy a utilizar en varios lugares*/
function numeroRandom(array) {
    return Math.floor(Math.random() * array.length);
}

/* --- PRIMERA API --- */

//esta función va a crear una tarjeta visual con los datos de cada personaje
function makeCard(character) {
    //hacemos destructuring del objeto para obtener directamente las propiedades que nos interesan
    const { name, species, image } = character;

    const title = document.createElement("h3");
    title.textContent = name;
    title.setAttribute('style', '-webkit-text-stroke: 0.5px black; margin: 10px'); /* Esto es para el contorno del texto */
    if (species !== "Human") {
        title.style.color = 'red';
    }

    const characterSpecies = document.createElement("p");
    characterSpecies.style.padding = '5px';
    characterSpecies.textContent = ("ESPECIE: " + species);
    //cambiamos el color del texto según el estado del personaje
    if (species !== "Human") characterSpecies.style.color = "red";
    else characterSpecies.style.color = "#1F2937";
    //podríamos agregar más condiciones si quisiéramos más colores

    const characterImage = document.createElement("img");
    characterImage.src = image;
    characterImage.setAttribute('style', `
        height: 250px;
    `);

    //creamos el contenedor de la tarjeta
    const Card = document.createElement("div");
    Card.setAttribute('style', `
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f4f6fc;
    `);
    Card.appendChild(title);
    Card.appendChild(characterImage);
    Card.appendChild(characterSpecies);

    return Card
};

//esta función se encarga de obtener los personajes desde la API
async function mostrarPersonajes(apiRickMorty, cardsContainer) {

    cardsContainer.setAttribute('style', `
        margin-top: 10px;
        border-radius: 10px;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 10px;
    `);


    try {
        const response = await fetch(apiRickMorty);
        //fetch va a devolver una promesa
        //la promesa puede ser nula, o un valor. Pero no se sabe en qué momento va a volver esa respuesta
        //para eso se utiliza el async, con el que puedo utilizar el await, que espera a que esa respuesta llegue y la guarda en una variable
        //la respuesta que recibe await es un JSON

        const { results } = await response.json();
        //este método va a parsearlo a algo que entienda el javascript. Pero como devuelve una promesa, de vuelta tenemos que usar el await
        //las llaves acceden directamente a la propiedad del objeto respuesta que se llama results y nos ahorramos varios pasos

        /* Voy a imprimir a Rick y a uno random */
        cardsContainer.appendChild(makeCard(results[0]));

        // Me aseguro que no imprima a Rick dos veces
        do
            var i = numeroRandom(results);
        while (i == 0);
        const Card = makeCard(results[i]);

        //insertamos la tarjeta en el contenedor principal
        cardsContainer.appendChild(Card);

        //en caso de que querramos ver si esto funciona hacemos:
        //throw new Error("API ERROR"); esto va directamente al catch
        console.log(results);
    } catch (error) {
        console.error(error);
    }
    //una buena práctica es usar el try-catch para el manejo de errores
}

document.addEventListener("DOMContentLoaded", function () {
    const linkRickMorty = document.getElementById("a_rickMorty");
    const url = "https://rickandmortyapi.com/api/character";
    //event captura el evento. Queseria el click
    linkRickMorty.onclick = function (event) {
        //obtenemos el contenedor donde se van a insertar las tarjetas
        const cardsContainer = document.getElementsByClassName("cards-container")[0];

        //Esto que le pongo acá es para ver si ya le dio click
        if (linkRickMorty.style.color === "red") {
            //Primero tengo que eliminar todos los hijos
            while (cardsContainer.firstChild) {
                cardsContainer.removeChild(cardsContainer.firstChild);
            }
        } else {
            //Seteo la flag que me dice si ya hizo click
            linkRickMorty.style.color = "red";
            linkRickMorty.innerHTML = "Nueva Carta";
        }

        event.preventDefault(); // evita que se recargue/redirija la página y la recarga
        mostrarPersonajes(url, cardsContainer);
    };
});

/* --- EJERCICIO N5 --- */

document.addEventListener("DOMContentLoaded", function () {
    const frases = [
        '<span id="sombra1">Seamos libres lo demás no importa</span>',
        '<span id="sombra2">La pelota no se mancha</span>',
        '<span id="sombra3">Ladran sancho señal que cabalgamos</span>'
    ];
    const aleatoria = numeroRandom(frases);
    document.getElementById("frase").innerHTML = frases[aleatoria];
});