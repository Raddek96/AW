//Este ejercicio consiste en imprimir todos los números del 1 al 100, sin embargo, los números que sean multiplos de 3 se sustituirán por Fizz,
//los múltiplios de 5 por Buzz y los múltiplos de ambos por FizzBuzzz


for(i = 0; i <= 100; i++){
    if(i % 3 === 0 && i % 5 === 0 ){
        console.log("FizzBuzz")
    } else if(i % 3 === 0){
        console.log("Fizz")
    } else if(i % 5 === 0) {
        console.log("Buzz")
    } else {
        console.log(i);
    }
}