const prompt = require("prompt-sync")();

function numeroMayor(num1, num2, num3){
    if(num1 > num2 && num1 > num3){
        console.log("El numero mayor es: ${num1}")
    } else if (num2 > num1 && num2 > num3) {
        console.log("El número mayor es: ${num2}")
    } else {
        console.log("El número mayor es: " + num3)
    }
}

numeroMayor(prompt("Introduce el primer numero"), prompt("Introduce el segundo numero"), prompt("Introduce el tercer numero"));