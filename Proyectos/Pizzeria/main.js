const pizzas = Array.from(document.getElementsByClassName("pizzas"));
const image = document.getElementById("image");
const tituloPizza = document.getElementById("tituloPizza");

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
            break;
            case 1:
                image.src = "img/pizzas/Barbacoa.png"
                tituloPizza.textContent = "BARBACOA";
            break;
            case 2:
                image.src = "img/pizzas/hawaiana.png"
                tituloPizza.textContent = "HAWAIANA";
            break;
            case 3:
                image.src = "img/pizzas/Margarita.png"
                tituloPizza.textContent = "MARGARITA";
            break;
            case 4:
                image.src = "img/pizzas/Vegetariana.png"
                tituloPizza.textContent = "VEGETARIANA";
            break;
            
        }
    })
});