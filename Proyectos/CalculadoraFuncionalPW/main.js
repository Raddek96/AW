const botones = document.querySelectorAll(".btn");
const pantalla = document.querySelector(".pantalla");


botones.forEach(boton => {
    boton.addEventListener("click", () => {

        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length > 1) {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            } else {
                pantalla.textContent = "0";
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
                return
            } catch {
                pantalla.textContent = "ERROR";

                setTimeout(() => {
                    pantalla.textContent = "0";
                }, 2000);
                return;
            }
        }

        if (pantalla.textContent === "0" && boton.id === "punto") {
            pantalla.textContent += boton.textContent;

        } else if (pantalla.textContent === "0") {
            pantalla.textContent = boton.textContent;
        } else {
            pantalla.textContent += boton.textContent;
        }

        if (pantalla.textContent.length > 20) {
            pantalla.textContent = "TOO LONG"

            setTimeout(() => {
                pantalla.textContent = "0";
            }, 2000);
        }
    })

})

//Para escribir desde el teclado físico

document.addEventListener("keydown", (event) => {
    const tecla = event.key;

    if(!isNaN(tecla) || ["+", "-", "*", "/", "."].includes(tecla)) {
        if (pantalla.textContent === "0" && tecla === "point") {
            pantalla.textContent += tecla;

        } else if (pantalla.textContent === "0") {
            pantalla.textContent = tecla;
        } else {
            pantalla.textContent += tecla;
        } 
    }
     // si la tecla presionada es 'Enter', evaluar la expresión
     if (tecla === 'Enter') {
        try {
            pantalla.textContent = eval(pantalla.textContent);
        } catch {
            pantalla.textContent = "ERROR";

            setTimeout(() => {
                pantalla.textContent = "0";
            }, 2000);
        }
    }

    // si la tecla presionada es 'Backspace', borrar el último carácter
    if (tecla === 'Backspace') {
        if (pantalla.textContent.length > 1) {
            pantalla.textContent = pantalla.textContent.slice(0, -1);
        } else {
            pantalla.textContent = "0";
        }
    }

    // si la tecla presionada es 'Escape', limpiar la pantalla
    if (tecla === 'Escape') {
        pantalla.textContent = "0";
    }

    // si la longitud del texto en la pantalla es demasiado larga
    if (pantalla.textContent.length > 20) {
        pantalla.textContent = "TOO LONG"

        setTimeout(() => {
            pantalla.textContent = "0";
        }, 2000);
    }
});
