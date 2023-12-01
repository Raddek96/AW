function generarColorAleatorio() {
  // Generar valores aleatorios para los componentes R, G, y B
  const componenteR = Math.floor(Math.random() * 256); // Valores entre 0 y 255
  const componenteG = Math.floor(Math.random() * 256);
  const componenteB = Math.floor(Math.random() * 256);

// Después
const colorRGB = `rgb(${componenteR}, ${componenteG}, ${componenteB})`;
return colorRGB;
}


const FLEXCONTAINER = document.getElementById("flexContainer");
const alignContent = document.getElementById("align-content");

const WIDTH = document.getElementById("width");
const HEIGHT = document.getElementById("height");

WIDTH.addEventListener("input", () => {
if (!isNaN(WIDTH.value)) {
  widthValue = WIDTH.value;
  console.log(widthValue);
  FLEXCONTAINER.style.width = widthValue + "px";
  WIDTH.placeholder = "";
} else {
  console.error("Se ha introducido un valor no numérico");
}
});

HEIGHT.addEventListener("input", () => {
if (!isNaN(HEIGHT.value)) {
  heightValue = HEIGHT.value;
  console.log(widthValue);
  FLEXCONTAINER.style.height = heightValue + "px";
  HEIGHT.placeholder = "";
} else {
  console.error("Se ha introducido un valor no numérico");
}
});

const CAJAS = document.getElementsByClassName("flexChilds");


const MINUS = document.getElementById("minus");
const PLUS = document.getElementById("plus");
let cajasVisibles = 3;

PLUS.addEventListener("click", () => {
if (cajasVisibles < CAJAS.length) {
  CAJAS[cajasVisibles].style.display = "block";
  cajasVisibles++;
  if (cajasVisibles > 0) {
    MINUS.style.background = "red";
    MINUS.style.cursor = "pointer";
    if (cajasVisibles === CAJAS.length) {
      PLUS.style.background = "rgb(128, 128, 128)";
      PLUS.style.cursor = "default";
    }
  }
}
});

MINUS.addEventListener("click", () => {
if (cajasVisibles > 0) {
  cajasVisibles--;
  CAJAS[cajasVisibles].style.display = "none";
  if (cajasVisibles === 0) {
    MINUS.style.background = "rgb(128, 128, 128)";
    MINUS.style.cursor = "default";
  }
  if (cajasVisibles < CAJAS.length) {
    PLUS.style.background = "green";
    PLUS.style.cursor = "pointer";
  }
}
});

const selectFlexDirection = document.getElementById("flex-direction");

selectFlexDirection.addEventListener("change", () => {
FLEXCONTAINER.style.flexDirection = selectFlexDirection.value;
});

const selectFlexWrap = document.getElementById("flex-wrap");

selectFlexWrap.addEventListener("change", () => {
FLEXCONTAINER.style.flexWrap = selectFlexWrap.value;
if(selectFlexWrap.value === "wrap"){
  alignContent.disabled = false;
} else {
  alignContent.disabled = true;
}
});

const selectJustifyContent = document.getElementById("justify-content");

selectJustifyContent.addEventListener("change", () => {
FLEXCONTAINER.style.justifyContent = selectJustifyContent.value;
});

const alignItems = document.getElementById("align-items");

alignItems.addEventListener("change", () => {
FLEXCONTAINER.style.alignItems = alignItems.value;
});



alignContent.addEventListener("change", () => {
  FLEXCONTAINER.style.alignContent = alignContent.value;
});

const arrayCajas = Array.from(CAJAS);
arrayCajas.forEach(caja => {
  caja.addEventListener("click", () => {
      caja.style.background = generarColorAleatorio();
  })
});

const buttonReset = document.getElementById("reset");
buttonReset.addEventListener("click", () => {
let inputs = window.document.querySelectorAll("input");
let selects = window.document.querySelectorAll("select");
inputs.forEach(function(input){
  input.value = "";
})

selects.forEach(function(select){
  select.selectedIndex = -1;
})
window.location.reload();

});



const witdthBox = document.getElementById("widthBox");
const heightBox = document.getElementById("heightBox");

witdthBox.addEventListener("input", () => {
if (!isNaN(witdthBox.value)) {
  widthValue = witdthBox.value;
  console.log(widthValue);
  arrayCajas.forEach(function(caja) {
    caja.style.width = widthValue + "px";
  });
  witdthBox.placeholder = "";
} else {
  console.error("Se ha introducido un valor no numérico");
}
});

heightBox.addEventListener("input", () => {
if (!isNaN(heightBox.value)) {
  heightValue = heightBox.value;
  console.log(heightValue);
  arrayCajas.forEach(function(caja) {
    caja.style.height = heightValue + "px";
  });
  heightBox.placeholder = "";
} else {
  console.error("Se ha introducido un valor no numérico");
}
});