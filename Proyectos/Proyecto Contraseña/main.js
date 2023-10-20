////////////////////////////////
//MOSTRAR Y OCULTAR CONTRASEÑA//
////////////////////////////////




//Almacenamos en la variable ="passwordInput" el elemento con id="passwordInput" del HTML que en este caso es un input (password).
const passwordInput = document.getElementById("passwordInput");
//Almacenamos en la variable ="togglePassword" el elemento con id="togglePassword" del HTML que en este caso es un icono
const togglePassword = document.getElementById("togglePassword");

//Con la funcion addEventListener("click") detectamos el click de toogle.Password, con function()
//creamos una función anónima
togglePassword.addEventListener("click", function(){
    //Creamos una variable de nombre "type" que con la función getAttribute("type")--> Si el tipo es password = text
    //                                                                             --> Si el tipo es text = password
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    //Al elemento type password que almacenamos en la variable passwordInput con la función setAttribute
    //le colocamos el tipo ("type") del input con el valor de la variable type
    //Es decir, cambia el tipo de input de passwordInput al valor de la variable de type
    passwordInput.setAttribute("type", type);

    //Se intercambian los iconos
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});


//
//Comprobar que tan segura es nuestra contraseña
//

const buttonInput = document.getElementById("buttonInput");
const body = document.querySelector("body");

function comprobarContraseña(){
    const longitudBasica = 7;
    const soloNumeros = /^\d+$/;
    const caracteresEspeciales = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const contraseña = document.getElementById("passwordInput").value;
    const  titulo = document.getElementById("titulo");
    const tituloOriginal = titulo.textContent;

    if (contraseña.length <= longitudBasica || soloNumeros.test(contraseña) || !caracteresEspeciales.test(contraseña)){
        body.style.background = "rgb(255,0,0)";
        body.style.background = "radial-gradient(circle, rgba(255,0,0,1) 50%, rgba(119,78,42,1) 100%)";
        titulo.textContent = "Your password is not secure";

        setTimeout(function() {
            body.style.background = "rgb(212,183,27)";
            body.style.background = "radial-gradient(circle, rgba(212,183,27,1) 50%, rgba(119,78,42,1) 100%)";
            titulo.textContent = tituloOriginal;
          }, 2000);
    } else {
        body.style.background = "rgb(0,255,10)";
        body.style.background = "radial-gradient(circle, rgba(0,255,10,1) 50%, rgba(119,78,42,1) 100%)"; 
        titulo.textContent = "Your password is secure";

        setTimeout(function() {
            body.style.background = "rgb(212,183,27)";
            body.style.background = "radial-gradient(circle, rgba(212,183,27,1) 50%, rgba(119,78,42,1) 100%)";
            titulo.textContent = tituloOriginal;
          }, 2000);
    }
}

//Hace que cuando se haga click en el boton con id="buttonInput" se ejecute la función comprobarContraseña
buttonInput.addEventListener("click", comprobarContraseña);


//Hace que cuando se presione Enter mientras estás usando el passwordInput se ejecute la función comprobarContraseña
passwordInput.addEventListener('keydown', function(event){
if (event.code === "Enter"){
    event.preventDefault();
    comprobarContraseña();
}

});