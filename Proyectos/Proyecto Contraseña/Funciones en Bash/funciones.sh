#!/bin/bash

##Funciones##

suma(){
	resultado=$((num1 + num2))
	echo "El resultado de tu suma es $resultado"
}

resta(){
	resultado=$((num1 - num2))
	echo "El resultado de tu resta es $resultado"
}

multiplicacion(){
	resultado=$((num1 * num2))
	echo "El resultado de tu multiplicación es $resultado"
}

division(){
	resultado=$((num1 / num2))
	echo "El resultado de tu división es $resultado"
}

##MAIN##

while true
do

	echo "Calculadora básica en Bash"

	echo "1. Suma"
	echo "2. Resta"
	echo "3. Multipliación"
	echo "4. División"
	echo "5. Salir"
	read operacion

	if [ -z "$operacion" ]
	then
		echo "Por favor, introduce una opción"
		continue
	fi

	if [ "$operacion" == 5 ]
	then
		exit
	fi

	if ! [[ "$operacion" =~ ^[1-4]$ ]]
	then
		echo "Opción no válida"
		continue
	fi

	echo "Primer dígito"
	read num1

	echo "Segundo dígito"
	read num2

	case $operacion in
		"1")
		suma
		;;
		"2")
		resta
		;;
		"3")
		multiplicacion
		;;
		"4")
		division
		;;
	esac

done

## Fin del Script
