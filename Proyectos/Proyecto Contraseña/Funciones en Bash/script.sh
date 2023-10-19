#!/bin/bash

echo "Introduce un numero"
read a
echo "Introduce otro numero"
read b

if [[ $a == $b ]]
then
echo "Los  números son iguales"
else
echo "Los números son diferentes"
fi

