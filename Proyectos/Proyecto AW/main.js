const FLEXCONTAINER = document.getElementById("flexContainer");


const WIDTH  = document.getElementById("width");
const HEIGHT = document.getElementById("height");

WIDTH.addEventListener("input", () => {
    
    if(!isNaN(WIDTH.value)){
        widthValue = WIDTH.value;
        console.log(widthValue);
        FLEXCONTAINER.style.width = widthValue +"px";
        WIDTH.placeholder = '';
    } else {
        console.error("Se ha introducido un valor no numérico");
    }
})

HEIGHT.addEventListener("input", () => {
    
    if(!isNaN(HEIGHT.value)){
        heightValue = HEIGHT.value;
        console.log(widthValue);
        FLEXCONTAINER.style.height = heightValue +"px";
        HEIGHT.placeholder = '';
    } else {
        console.error("Se ha introducido un valor no numérico");
    }
})


const CAJAS = document.getElementsByClassName("flexChilds");
CAJAS.forEach(element => {
    
});