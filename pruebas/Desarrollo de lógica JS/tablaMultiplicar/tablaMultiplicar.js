//En este ejercicio, el usuario introducirá un número, y le mostraremos su tabla de multiplicar

const readline = require('readline-sync');

const numero = readline.question("Por favor, ingresa un numero:  " );

console.log("La tabla de multiplicar del numero "  + numero + " es: ");
for (let i = 1; i <= 10; i++){
    
    console.log("Por " + i + " --> " + numero + " * " +  i + " = " + numero * i)
}
