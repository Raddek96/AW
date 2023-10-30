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

        if (pantalla.textContent === "0") {
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

