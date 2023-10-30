//Calculadora realizada por @Raddek96
//Comentarios generados por IA





// Selección de todos los elementos con la clase "btn" y el elemento con la clase "pantalla"
const botones = document.querySelectorAll(".btn");
const pantalla = document.querySelector(".pantalla");

// Agregar un evento de escucha para cuando se presiona una tecla en el documento
document.addEventListener("keydown", (event) => {
    // Obtener la tecla presionada
    const tecla = event.key;

    // Manejo de la tecla "Backspace"
    if (tecla === "Backspace") {
        if (pantalla.textContent.length > 1) {
            pantalla.textContent = pantalla.textContent.slice(0, -1);
        } else {
            pantalla.textContent = "0";
        }
        return;
    }

    // Manejo de la tecla "Escape" (borrar todo)
    if (tecla === "Escape") {
        pantalla.textContent = "0";
        return;
    }

    // Manejo de la tecla "Enter" (realizar cálculo)
    if (tecla === "Enter") {
        try {
            pantalla.textContent = eval(pantalla.textContent);
            return;
        } catch {
            pantalla.textContent = "ERROR";

            // Restablecer la pantalla después de 2 segundos en caso de error
            setTimeout(() => {
                pantalla.textContent = "0";
            }, 2000);
            return;
        }
    }

    // Manejo de dígitos y operadores matemáticos
    if (!isNaN(tecla) || ["+", "-", "*", "/", "."].includes(tecla)) {
        if (pantalla.textContent === "0" && tecla === ".") {
            pantalla.textContent += tecla;
        } else if (pantalla.textContent === "0") {
            pantalla.textContent = tecla;
        } else {
            pantalla.textContent += tecla;
        }
    }
});

// Iteración a través de todos los botones y agregar eventos de clic
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        // Manejo del botón "c" (borrar todo)
        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        // Manejo del botón "borrar" (eliminar el último carácter)
        if (boton.id === "borrar") {
            if (pantalla.textContent.length > 1) {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            } else {
                pantalla.textContent = "0";
            }
            return;
        }

        // Manejo del botón "igual" (realizar cálculo)
        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
                return;
            } catch {
                pantalla.textContent = "ERROR";

                // Restablecer la pantalla después de 2 segundos en caso de error
                setTimeout(() => {
                    pantalla.textContent = "0";
                }, 2000);
                return;
            }
        }

        // Agregar números y operadores a la pantalla
        if (pantalla.textContent === "0") {
            pantalla.textContent = boton.textContent;
        } else {
            pantalla.textContent += boton.textContent;
        }

        // Restablecer la pantalla después de 2 segundos si el contenido es demasiado largo
        if (pantalla.textContent.length > 20) {
            pantalla.textContent = "TOO LONG";

            setTimeout(() => {
                pantalla.textContent = "0";
            }, 2000);
        }
    });
});


