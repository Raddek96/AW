// //Intercambiar entre listas
// const input = "";
// const input1 = document.getElementById("input1");
// const input2 = document.getElementById("input2");
// const input3 = document.getElementById("input3");
// const mainList = document.getElementById("mainList");
// const numlista = "";

// const lista1 = document.getElementById("lista1");
// const lista2 = document.getElementById("lista2");
// const lista3 = document.getElementById("lista3");

// const divLista1 = document.getElementsByClassName("firstList");
// const divLista2 = document.getElementsByClassName("secondList");
// const divLista3 = document.getElementsByClassName("thirdList");

// lista1.addEventListener("click", function(){
//     numlista = 1;
// });

// lista2.addEventListener("click", function(){
//     numlista = 2;
// });

// lista3.addEventListener("click", function(){
//     numlista = 3;
// });

// function intercambiarListas(numlista){
//     switch (numlista){
//         case 1:
//        input = input1;
//         divLista1.style.display = "flex"
//         divLista2.style.display = "none"
//         divLista3.style.display = "none"

//         break;

//         case 2:
//        input = input2;
//        divLista1.style.display = "none"
//        divLista2.style.display = "flex"
//        divLista3.style.display = "none"
//         break;

//         case 3:
//        input = input3;
//        divLista1.style.display = "none"
//        divLista2.style.display = "none"
//        divLista3.style.display = "flex"
//         break;

//         default:

//     }
// }




const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const mainList1 = document.getElementById("mainList1");
const mainList2 = document.getElementById("mainList2");
const mainList3 = document.getElementById("mainList3");
let input = input1;
let numlista = 1;

const lista1 = document.getElementById("list1");
const lista2 = document.getElementById("list2");
const lista3 = document.getElementById("list3");

const divLista1 = document.getElementsByClassName("firstList")[0];
const divLista2 = document.getElementsByClassName("secondList")[0];
const divLista3 = document.getElementsByClassName("thirdList")[0];

lista1.addEventListener("click", function() {
  numlista = 1;
  intercambiarListas(numlista);
});

lista2.addEventListener("click", function() {
  numlista = 2;
  intercambiarListas(numlista);
});

lista3.addEventListener("click", function() {
  numlista = 3;
  intercambiarListas(numlista);
});

function intercambiarListas(numlista){
  switch (numlista){
    case 1:
      input = input1;
      divLista1.style.display = "flex";
      divLista2.style.display = "none";
      divLista3.style.display = "none";
      break;
    case 2:
      input = input2;
      divLista1.style.display = "none";
      divLista2.style.display = "flex";
      divLista3.style.display = "none";
      break;
    case 3:
      input = input3;
      divLista1.style.display = "none";
      divLista2.style.display = "none";
      divLista3.style.display = "flex";
      break;
    default:
      break;
  }
}

input.addEventListener("keydown", function(event){
  if(event.code === "Enter" && input.value !== ""){
    const newLi = document.createElement("li");
    newLi.innerText = input.value;
    switch (numlista) {
      case 1:
        mainList1.appendChild(newLi);
        break;
      case 2:
        mainList2.appendChild(newLi);
        break;
      case 3:
        mainList3.appendChild(newLi);
        break;
      default:
        break;
    }
    input.value = "";
  }
});
















//Crear Lista //


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



