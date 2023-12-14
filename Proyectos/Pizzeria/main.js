const pizzas = Array.from(document.getElementsByClassName("pizzas"));
const image = document.getElementById("image");
const tituloPizza = document.getElementById("tituloPizza");
const infoPizza = document.getElementById("infoPizza");
const arrayInfoPizzas = [`La pizza Cuatro Quesos es una deliciosa fusión de mozzarella, cheddar, parmesano y gorgonzola.
Su equilibrio perfecto crea una experiencia gastronómica única que cautiva a los amantes de la pizza.`,
`La pizza Barbacoa es una deliciosa combinación de sabores ahumados y jugosos.
 Su base de salsa de barbacoa se combina con trozos tiernos de carne, generalmente pollo o cerdo,
  cebolla caramelizada y queso fundido. Esta explosión de sabores te transportará a una parrillada perfecta.`,
`La pizza Hawaiana es una opción tropical que equilibra lo dulce y lo salado. La mezcla de piña jugosa,
 jamón ahumado y queso derretido crea una experiencia única en cada bocado.
  Esta pizza es ideal para aquellos que disfrutan de una combinación fresca y exótica.`,
`La pizza Margarita es una obra maestra clásica que resalta la simplicidad y la frescura.
 Su base de tomate, mozzarella de alta calidad y hojas de albahaca crean una armonía de sabores que rinde homenaje a la tradición italiana.
 Cada ingrediente se complementa para ofrecer una experiencia auténtica y deliciosa.`,
`La pizza Vegetariana es una opción vibrante y llena de color para aquellos que prefieren una opción sin carne.
 Con una variedad de verduras frescas como champiñones, pimientos, tomates y aceitunas, esta pizza ofrece una explosión de sabores saludables. 
El queso derretido completa esta opción deliciosa y satisfactoria.` ];


pizzas.forEach((pizza, index) => {
    pizza.addEventListener("click", () => {
        console.log(index);
        
        pizzas.forEach((pizza) => {
            pizza.classList.remove("selected");
        });


        pizzas[index].classList.add("selected");

        switch(index){
            case 0:
                image.src = "img/pizzas/4Quesos.png";
                tituloPizza.textContent = "4 QUESOS";
                infoPizza.textContent = arrayInfoPizzas[0];
            break;
            case 1:
                image.src = "img/pizzas/Barbacoa.png"
                tituloPizza.textContent = "BARBACOA";
                infoPizza.textContent = arrayInfoPizzas[1];
            break;
            case 2:
                image.src = "img/pizzas/hawaiana.png"
                tituloPizza.textContent = "HAWAIANA";
                infoPizza.textContent = arrayInfoPizzas[2];
            break;
            case 3:
                image.src = "img/pizzas/Margarita.png"
                tituloPizza.textContent = "MARGARITA";
                infoPizza.textContent = arrayInfoPizzas[3];
            break;
            case 4:
                image.src = "img/pizzas/Vegetariana.png"
                tituloPizza.textContent = "VEGETARIANA";
                infoPizza.textContent = arrayInfoPizzas[4];
            break;
            
        }
    })
});