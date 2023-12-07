var persona = {
        nombre: {
                pila: "bob",
                apellido: "Smith",
       },
        edad: 32,
        genero: "masculino",
        intereses: ["música", "esquí"],
        bio: function () {
          alert(
            `${this.nombre.pila} ${this.nombre.apellido} tiene ${this.edad} años. Le gusta ${this.intereses[0]} y this.intereses[1].`,
          );
        },
        saludo: function () {
                return "Hola, Soy " + this.nombre.pila + ". ";
              },
              
      };
      
      var nombrePerzonalizado = "altura";
      var valorPerzonalizado = "1.75m";
      persona[nombrePerzonalizado] = valorPerzonalizado;
      
      persona.prueba = 12;


console.log(persona.altura);
console.log(persona.prueba);