//En este ejercicio, imprimiremos la sucesión de fibonacci hasta los 1000 caracteres.

let a = 0;
let b = 1;

for (i = 0; i <= 20; i++) {

    console.log(a)
    let temp = a + b; 
    a = b; 
    b = temp; 

}