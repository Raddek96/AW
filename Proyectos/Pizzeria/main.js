const pizzas = Array.from(document.getElementsByClassName("pizzas"));
const image = document.getElementById("image");

pizzas.forEach((pizza, index) => {
    pizza.addEventListener("click", () => {
        console.log(index);
        
        pizzas.forEach((pizza) => {
            pizza.classList.remove("selected");
        });


        pizzas[index].classList.add("selected");

        switch(index){
            case 0:
                image.src = "img/pizzas/4Quesos.png"
            break;
            case 1:
                image.src = "img/pizzas/Barbacoa.png"
            break;
            case 2:
                image.src = "img/pizzas/hawaiana.png"
            break;
            case 3:
                image.src = "img/pizzas/Margarita.png"
            break;
            case 4:
                image.src = "img/pizzas/Vegetariana.png"
            break;
            
        }
    })
});