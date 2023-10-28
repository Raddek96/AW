//Juego de piedra, papel o tijera, la máquina vs el usuario.

//Portada generada por IA
console.log(" ______  ______  _______ ");
console.log("|  _   ||  _   ||__   __|");
console.log("| |_|  || |_|  |   | |   ");   
console.log("| _____||  ____|   | |   ");   
console.log("| |     | |        | |   ");   
console.log("|_|     |_|        |_|   ");
console.log("  El juego de: Piedra, Papel o Tijera  ");


const readline = require('readline-sync');
const eleccion = parseInt(readline.question("Elige tu objeto: 1. Piedra, 2.Papel, 3. Tijera: "));

switch (eleccion) {
    case 1:
        console.log("Has elegido Piedra")
        break;

    case 2:
        console.log("Has elegido Papel")
        break;

    case 3:
        console.log("Has elegido Tijera")
        break;

    default:
        console.log("Opción no válida");
        break;

}

const eleccionMaquina = Math.ceil(Math.random() * 3);

switch (eleccionMaquina) {
    case 1:
        console.log("Tu oponente a elegido Piedra")
        break;

    case 2:
        console.log("Tu oponente a elegido Papel")
        break;

    case 3:
        console.log("Tu oponente a elegido Tijera")
        break;

}

if (eleccion === 1) {
    switch (eleccionMaquina) {
        case 1:
            console.log("    _______                         _______    ");
            console.log("---'   ____)                       (____   '---");
            console.log("      (_____)                     (_____)      ");
            console.log("      (_____)                     (_____)      ");
            console.log("      (____)                       (____)      ");
            console.log("---.__(___)                         (___)__.---");
            console.log("Habeis empatado")
            break;

        case 2:
            console.log("    _______                         _______    ");
            console.log("---'   ____)                   ____(___    '---");
            console.log("      (_____)                 (______          ");
            console.log("      (_____)                 (_______         ");
            console.log("      (____)                   (_______        ");
            console.log("---.__(___)                      (_________.---");
            console.log("La máquina te ha ganado")
            break;

        case 3:
            console.log("    _______                        _______     ");
            console.log("---'   ____)                  ____(___    '--- ");
            console.log("      (_____)                (______           ");
            console.log("      (_____)                (__________       ");
            console.log("      (____)                       (____)      ");
            console.log("---.__(___)                         (___)__.---");
            console.log("Le has ganado a la máquina")
            break;
    }
}

if (eleccion === 2) {
    switch (eleccionMaquina) {
        case 1:
            console.log("     _______                        _______    ");
            console.log("---'    ____)____                  (____   '---");
            console.log("           ______)                (_____)      ");
            console.log("          _______)                (_____)      ");
            console.log("         _______)                  (____)      ");
            console.log("---.__________)                     (___)__.---");
            console.log("Le has ganado a la máquina")
            break;

        case 2:
            console.log("     _______                        _______    ");
            console.log("---'    ____)____              ____(___    '---");
            console.log("           ______)            (______          ");
            console.log("          _______)            (_______         ");
            console.log("         _______)              (_______        ");
            console.log("---.__________)                  (_________.---");
            console.log("Habeis empatado")
            break;

        case 3:
            console.log("     _______                       _______     ");
            console.log("---'    ____)____             ____(___    '--- ");
            console.log("           ______)           (______           ");
            console.log("          _______)           (__________       ");
            console.log("         _______)                  (____)      ");
            console.log("---.__________)                     (___)__.---");
            console.log("La máquina te ha ganado")
            break;
    }
}

if (eleccion === 3) {
    switch (eleccionMaquina) {
        case 1:
            console.log("    _______                         _______    ");
            console.log("---'   ____)____                   (____   '---");
            console.log("          ______)                 (_____)      ");
            console.log("       __________)                (_____)      ");
            console.log("      (____)                       (____)      ");
            console.log("---.__(___)                         (___)__.---");
            console.log("La máquina te ha ganado")

            break;

        case 2:
            console.log("    _______                         _______    ");
            console.log("---'   ____)____               ____(___    '---");
            console.log("          ______)             (______          ");
            console.log("       __________)            (_______         ");
            console.log("      (____)                   (_______        ");
            console.log("---.__(___)                      (_________.---");
            console.log("Le has ganado a la máquina")
            break;

        case 3:
            console.log("    _______                        _______     ");
            console.log("---'   ____)____              ____(___    '--- ");
            console.log("          ______)            (______           ");
            console.log("       __________)           (__________       ");
            console.log("      (____)                       (____)      ");
            console.log("---.__(___)                         (___)__.---");
            console.log("Habeis empatado")
            break;
    }
}