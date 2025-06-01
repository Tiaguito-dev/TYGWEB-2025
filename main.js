const apiUrl = "https://rickandmortyapi.com/api/character";

//esta función va a crear una tarjeta visual con los datos de cada personaje
function makeCard(character) {
    //hacemos destructuring del objeto para obtener directamente las propiedades que nos interesan
    const { name, status, image } = character;

    //obtenemos el contenedor donde se van a insertar las tarjetas
    const cardsContainer = document.getElementsByClassName("cards-container")[0];
    //como getElementsByClassName devuelve una colección (array-like), accedemos al primer elemento con [0]

    const title = document.createElement("h3");
    title.textContent = name;

    const characterStatus = document.createElement("p");
    characterStatus.textContent = status;
    //cambiamos el color del texto según el estado del personaje
    if (status === "Alive") characterStatus.style.color = "green";
    else characterStatus.style.color = "gray";
    //podríamos agregar más condiciones si quisiéramos más colores

    const characterImage = document.createElement("img");
    characterImage.src = image;
    characterImage.width = 200;

    //creamos el contenedor de la tarjeta
    const Card = document.createElement("div");
    Card.appendChild(title);
    Card.appendChild(characterImage);
    Card.appendChild(characterStatus);
    Card.style.backgroundColor = "blue";

    //insertamos la tarjeta en el contenedor principal
    cardsContainer.appendChild(Card);
};

//esta función se encarga de obtener los personajes desde la API
async function getCharacters() {
    try {
        const response = await fetch(apiUrl);
        //fetch va a devolver una promesa
        //la promesa puede ser nula, o un valor. Pero no se sabe en qué momento va a volver esa respuesta
        //para eso se utiliza el async, con el que puedo utilizar el await, que espera a que esa respuesta llegue y la guarda en una variable
        //la respuesta que recibe await es un JSON

        const { results } = await response.json();
        //este método va a parsearlo a algo que entienda el javascript. Pero como devuelve una promesa, de vuelta tenemos que usar el await
        //las llaves acceden directamente a la propiedad del objeto respuesta que se llama results y nos ahorramos varios pasos

        for (let i = 0; i < results.length; i++) {
            makeCard(results[i]);
        }

        //en caso de que querramos ver si esto funciona hacemos:
        //throw new Error("API ERROR"); esto va directamente al catch
        console.log(results);
    } catch (error) {
        console.error(error);
    }
    //una buena práctica es usar el try-catch para el manejo de errores
}

//ya tenemos la respuesta. Ahora vamos a mostrarlo en el HTML
getCharacters();