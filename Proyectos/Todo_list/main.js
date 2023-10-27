const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const mainList1 = document.getElementById("mainList1");
const mainList2 = document.getElementById("mainList2");
const mainList3 = document.getElementById("mainList3");
const lista1 = document.getElementById("list1");
const lista2 = document.getElementById("list2");
const lista3 = document.getElementById("list3");
const divLista1 = document.getElementsByClassName("firstList")[0];
const divLista2 = document.getElementsByClassName("secondList")[0];
const divLista3 = document.getElementsByClassName("thirdList")[0];

// Agregar listeners a los elementos "lista1", "lista2" y "lista3"
lista1.addEventListener("click", function() {
  intercambiarListas(input1, 1);
});
lista2.addEventListener("click", function() {
  intercambiarListas(input2, 2);
});
lista3.addEventListener("click", function() {
  intercambiarListas(input3, 3);
});

// Agregar listener al elemento "input"
input1.addEventListener("keydown", function(event){
  agregarElementoLista1(event, input1, mainList1);
});
input2.addEventListener("keydown", function(event){
  agregarElementoLista2(event, input2, mainList2);
});
input3.addEventListener("keydown", function(event){
  agregarElementoLista3(event, input3, mainList3);
});

// Función para cambiar la lista activa
function intercambiarListas(input, numlista){
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

// Funciones para agregar elementos a cada lista
function agregarElementoLista1(event, input, mainList){
  if(event.code === "Enter" && input.value !== ""){
    const newLi = document.createElement("li");
    newLi.innerText = input.value;
    mainList.appendChild(newLi);
    input.value = "";
  }
}

function agregarElementoLista2(event, input, mainList){
  if(event.code === "Enter" && input.value !== ""){
    const newLi = document.createElement("li");
    newLi.innerText = input.value;
    mainList.appendChild(newLi);
    input.value = "";
  }
}

function agregarElementoLista3(event, input, mainList){
  if(event.code === "Enter" && input.value !== ""){
    const newLi = document.createElement("li");
    newLi.innerText = input.value;
    mainList.appendChild(newLi);
    input.value = "";
  }
}


