//Crear Lista //

const input = document.getElementById("input");
const mainList = document.getElementById("mainList");

function crearTarea(){
    if (input.value == 0){
        input.setAttribute("placeholder", "Por favor, introduce una tarea")
        setTimeout(function(){
            input.setAttribute("placeholder", "");
        }, 2000);
    } else {
        input.setAttribute("placeholder", "");
        const tarea = document.createElement("li");
        tarea.innerText = input.value;
        mainList.appendChild(tarea);
    }
}

input.addEventListener("keydown", function(event){
    if (event.code == "Enter"){
        crearTarea();
        // Aquí puedes limpiar el valor de entrada si lo deseas
        input.value = '';
    }
})



//Intercambiar entre listas


// function intercambiarListas(numlista){
//     switch (numlista){
//         case 1:

//         break;

//         case 2:

//         break;

//         case 3:

//         break;

//         default:

//     }
// }

