const bodyContainer = document.getElementById("bodyContainer")
let eleccionHumano = "";




//Si el jugador elige la piedra
const piedra = document.getElementById("piedra");

piedra.addEventListener("click", () => {
    eleccionHumano = "piedra";
    resolver();
});

//Si el jugador elige la tijera
const papel = document.getElementById("papel");

papel.addEventListener("click", () => {

    eleccionHumano = "papel";
    resolver();
});

//Si el jugador elige la tijera
const tijera = document.getElementById("tijera");

tijera.addEventListener("click", () => {
    eleccionHumano = "tijera";
    resolver();
});




const imagenEleccion = document.getElementById("imagenEleccion");
const imagenEleccionMaquina = document.getElementById("imagenEleccionMaquina");
function resolver () {
     const eleccionMaquina = Math.round(Math.random() * 3) + 1;
    bodyContainer.style.display = "none";
    switch (eleccionHumano) {
        case "piedra":
            imagenEleccion.src = "img/piedraB.png"
            resolverPiedra(eleccionMaquina);
        break;

        case "papel":
            imagenEleccion.src = "img/papelB.png"
            resolverPapel(eleccionMaquina);
        break;

        case "tijera":
            imagenEleccion.src = "img/tijeraB.png"
            resolverTijera(eleccionMaquina);
        break;
    }   
}

function resolverPiedra (eleccionMaquina) {
    switch (eleccionMaquina) {
        case 1:
            console.log("Empate")
            imagenEleccionMaquina.src = "img/piedraB.png"
        break;

        case 2:
            console.log("perdiste")
            imagenEleccionMaquina.src = "img/papelB.png"
        break;

        case 3:
            console.log("ganaste")
            imagenEleccionMaquina.src = "img/tijeraB.png"
        break;
    }
}

function resolverPapel (eleccionMaquina) {
    switch (eleccionMaquina) {
        case 1:
            console.log("Ganaste")
            imagenEleccionMaquina.src = "img/piedraB.png"
        break;

        case 2:
            console.log("Empate")
            imagenEleccionMaquina.src = "img/papelB.png"
        break;

        case 3:
            console.log("perdiste")
            imagenEleccionMaquina.src = "img/tijeraB.png"
        break;
    }
}

function resolverTijera (eleccionMaquina) {
    switch (eleccionMaquina) {
        case 1:
            console.log("perdiste")
            imagenEleccionMaquina.src = "img/piedraB.png"
        break;

        case 2:
            console.log("ganaste")
            imagenEleccionMaquina.src = "img/papelB.png"
        break;

        case 3:
            console.log("Empate")
            imagenEleccionMaquina.src = "img/tijeraB.png"
        break;
    }
}