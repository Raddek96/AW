//Dependencias 
const prompt = require("prompt-sync")();



//Ejercicio 1
console.log("hola mundo");

//Ejercicio 2
console.log("Suma de dos números\n");
let num1 = prompt("Primer numero: \n");
let num2 = prompt("Segundo numero: \n");
let resultado1 = num1 + num2;
console.log("El resultado de la suma de los numeros es ${resultado1}")

//Ejercicio 3
console.log("Calcular el aŕea de un círculo a partir de su radio \n");
let radio = Math.pow(prompt("Introduce el radio: \n"), 2)
let resultado2 = Math.PI * radio;
console.log("El área del círculo dado tu radio es: ${resultado2}");

//Ejercicio 4
function numeroMayor(num1, num2, num3){
    if(num1 > num2 && num1 > num3){
        console.log("El numero mayor es: ${num1}")
    } else if (num2 > num1 && num2 > num3) {
        console.log("El número mayor es: ${num2}")
    } else {
        console.log("El número mayor es: ${num3}")
    }
}

numeroMayor(prompt("Introduce el primer numero"), prompt("Introduce el segundo numero"), prompt("Introduce el tercer numero"));

//Ejercicio 5
//Pa hacer aun

//Ejercicio 6
let numero = prompt("Introduce un numero natural menor que 100: \n");
for(let i = 0; i <= numero; i++){
    console.log(i);
}

//Ejercicio 7
let numero1 = prompt("Introduce un numero natural menor que 100: \n");
for(let i = 0; i <= numero1; i = i+2){
    console.log(i);
}

//Ejercicio 8
