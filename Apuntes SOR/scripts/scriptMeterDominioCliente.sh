#!/bin/bash

##################################################
##	 INTRODUCIR CLIENTE UBUNTU EN DOMINIO	    ##
##		Hecho por Radoslaw Lisiecki             ##
##################################################
##
#####################
#¡EJECUTAR CON ROOT!#
#####################


HOSTNAME=$(hostname)
echo "Introduce tu dominio en minúsculas  (sin extensión; por ejemplo, iesallerrl )"
read DOMINIOMIN

DOMINIOMAS=$(echo "$DOMINIOMIN" | tr '[:lower:]' '[:upper:]')

#Actualizar paquetes
apt update

# Instalación y configuración del servicio NTP
apt install ntp -y
sed -i -e 's/^pool 0.*/server 0.es.pool.ntp.org/' \
       -e 's/^pool 1.*/server 1.es.pool.ntp.org/' \
       -e 's/^pool 2.*/server 2.es.pool.ntp.org/' \
       -e 's/^pool 3.*/server 3.es.pool.ntp.org/' /etc/ntp.conf
systemctl restart ntp.service
sleep 2
ntpq -p
echo "Servicio NTP instalado y configurado correctamente!"
sleep 1



#Configurar fichero /etc/hosts
sed -i "s/127.0.1.1.*/127.0.1.1 $HOSTNAME/" /etc/hosts
echo "Hosts configurados correctamente"
sleep 1


#Configurar search
nmtui





echo "Elige una opción para meter el cliente en el dominio"
echo "1.pbis"
echo "2.realmd"
read OPCION

if ! [[ "$OPCION" =~ ^[1-2]$ ]]
then 
    exit
fi

if [[ "$OPCION" -eq 1 ]]
then
    #Descargar e instalar pbis-open
    wget -O pbis-installer.sh https://github.com/BeyondTrust/pbis-open/releases/download/9.1.0/pbis-open-9.1.0.551.linux.x86_64.deb.sh
    sleep 5
    sh pbis-installer.sh

    #Unirse a dominio
    domainjoin-cli join --disable ssh  $DOMINIOMAS.LOCAL Administrator --password=abc123.
else 
apt install realmd -y
realm join $DOMINIOMAS
echo abc123.


sleep 1

fi
