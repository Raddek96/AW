// Autor: Radoslaw Lisiecki
// Fecha: 01-12-2023
// Versión: 1.0



// Variables y elementos del DOM
const FLEXCONTAINER = document.getElementById("flexContainer");
const alignContent = document.getElementById("align-content");
const WIDTH = document.getElementById("width");
const HEIGHT = document.getElementById("height");
const CAJAS = document.getElementsByClassName("flexChilds");
const MINUS = document.getElementById("minus");
const PLUS = document.getElementById("plus");
const selectFlexDirection = document.getElementById("flex-direction");
const selectFlexWrap = document.getElementById("flex-wrap");
const selectJustifyContent = document.getElementById("justify-content");
const alignItems = document.getElementById("align-items");
const arrayCajas = Array.from(CAJAS);
const buttonReset = document.getElementById("reset");
const witdthBox = document.getElementById("widthBox");
const heightBox = document.getElementById("heightBox");
const toogleSun = document.getElementById("sun");
const H2 = document.getElementsByTagName("h2");
const arrayH2 = Array.from(H2);
const LABEL = document.getElementsByTagName("label");
const arrayLabel = Array.from(LABEL);
let modoOscuro = false;
let cajasVisibles = 3;





//Funciones

//Cambiar entre modo claro y modo oscuro
function cambiarModo() {
  if (modoOscuro) {
    document.body.style.background = "#fff";
    toogleSun.classList.remove("fa-sun");
    toogleSun.classList.add("fa-moon");
    arrayH2.forEach(h2 => {
      h2.style.color = "#000";
    });
    arrayLabel.forEach(label => {
      label.style.color = "#000";
    })

  } else {
    document.body.style.background = "#252525";
    toogleSun.classList.remove("fa-moon");
    toogleSun.classList.add("fa-sun");
    arrayH2.forEach(h2 => {
      h2.style.color = "#fff";
    });

    arrayLabel.forEach(label => {
      label.style.color = "#fff";
    })
  }
  modoOscuro = !modoOscuro;
}


// Genera un código con formato rgb aleatorio
function generarColorAleatorio() {
  // Generar valores aleatorios para los componentes R, G, y B
  const componenteR = Math.floor(Math.random() * 256); // Valores entre 0 y 255
  const componenteG = Math.floor(Math.random() * 256);
  const componenteB = Math.floor(Math.random() * 256);

  // Almacena el color en formato RGB
  const colorRGB = `rgb(${componenteR}, ${componenteG}, ${componenteB})`;
  return colorRGB;
}


//Modifica el tamaño del contenedor padre o de los contenedores hijos
function modificarTamaño(valor, size, boolean) {
  if (!isNaN(valor)) {
    var valorValue = parseFloat(valor);
    if (boolean === "true") {

      if (size === "width") {
        FLEXCONTAINER.style.width = valorValue + "px";
        WIDTH.placeholder = "";
      } else if (size === "height") {
        FLEXCONTAINER.style.height = valorValue + "px";
        HEIGHT.placeholder = "";
      }
    } else {
      arrayCajas.forEach(function (caja) {
        if (size === "width") {
          caja.style.width = valorValue + "px";
          witdthBox.placeholder = "";
        } else if (size === "height") {
          caja.style.height = valorValue + "px";
          heightBox.placeholder = "";
        }
      });

    }
  } else {
    console.error("Se ha introducido un valor no numérico");
  }

}

//Cambiar propiedades flex del contenedor padre
function cambiarPropiedadFlex(propiedad, valor) {
  FLEXCONTAINER.style[propiedad] = valor;
}

//Habilitar o deshabilitar AlignContent
function boolAlignContent() {
  if (selectFlexWrap.value === "wrap") {
    alignContent.disabled = false;
  } else {
    alignContent.disabled = true;
  }
}


// Event Listeners
//Anchura del contenedor padre
WIDTH.addEventListener("input", () => {
  modificarTamaño(WIDTH.value, "width", "true")
});

//Altura del contenedor padre
HEIGHT.addEventListener("input", () => {
  modificarTamaño(HEIGHT.value, "height", "true")
});

//Anchura de los contenedores hijos
witdthBox.addEventListener("input", () => {
  modificarTamaño(witdthBox.value, "width", "false");
});

//Altura de los contenedor hijos
heightBox.addEventListener("input", () => {
  modificarTamaño(heightBox.value, "height", "false");
});

//Cambia el estilo de flexDirection
selectFlexDirection.addEventListener("change", () => {
  cambiarPropiedadFlex("flexDirection", selectFlexDirection.value);
});

//Cambia el estilo de justifyContent
selectJustifyContent.addEventListener("change", () => {
  cambiarPropiedadFlex("justifyContent", selectJustifyContent.value);
});

//Cambia el estilo de alignItems
alignItems.addEventListener("change", () => {
  cambiarPropiedadFlex("alignItems", alignItems.value);
});

//Cambia el estilo de alignContent
alignContent.addEventListener("change", () => {
  cambiarPropiedadFlex("alignContent", alignContent.value);
});

//Cambia el estilo de flexWrap y habilita o deshabilita alignContent
selectFlexWrap.addEventListener("change", () => {
  cambiarPropiedadFlex("flexWrap", selectFlexWrap.value);
  boolAlignContent();
});

//Cambia el color de cada contenedor hijo a un colo aleatorio
arrayCajas.forEach(caja => {
  caja.addEventListener("click", () => {
    caja.style.background = generarColorAleatorio();
  })
});

//Configura el funcionamiento del botón de añadir (display) de los contenedores hijos
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

//Configura el funcionamiento del botçon de quitar (display) de los contenedores hijos
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

//Configura el botón de resetear los inputs y los selects
buttonReset.addEventListener("click", () => {
  let inputs = window.document.querySelectorAll("input");
  let selects = window.document.querySelectorAll("select");
  inputs.forEach(function (input) {
    input.value = "";
  });

  selects.forEach(function (select) {
    select.selectedIndex = -1;
  });
  window.location.reload();
});

//Ejecuta la función cambiarModo()
toogleSun.addEventListener("click", () => {
  cambiarModo();
})