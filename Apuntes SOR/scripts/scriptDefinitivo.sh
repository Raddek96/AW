#!/bin/bash

echo  " _______     ______    __  __   _______   _    _   _______    ______   "
echo  "|  ___  \   /  __  \  |  \/  | |__   __| |  \ | | |__   __|  /  __  \  "
echo  "| |   |  | |  |  |  | | \  / |    | |    |   \| |    | |    |  |  |  | "
echo  "| |   |  | |  |  |  | | |\/| |    | |    | |\   |    | |    |  |  |  | "
echo  "| |___|  | |  |__|  | | |  | |  __| |__  | | \  |  __| |__  |  |__|  | "
echo  "|_______/   \______/  |_|  |_| |_______| |_|  \_| |_______|  \______/  "
echo  "         _______   _________   __  __   ______      _________          "
echo  "        | |_____| |   ___   | |  \/  | |  __  |    |   ___   |         "      
echo  "        | |_____  |  |___|  | | \  / | | |__| |__  |  |___|  |         "      
echo  "        |_____  | |   ___   | | |\/| | |  ____   | |   ___   |         "
echo  "         _____| | |  |   |  | | |  | | | |____|  | |  |   |  |         "
echo  "        |_______| |__|   |__| |_|  |_| |_________| |__|   |__|  v2     "
echo  ""
echo  ""
echo "Script hecho por Radek Lisiecki :D"


##TODOS LOS COMENTARIOS QUE ESTEAN ENTRE * SON LA EXPLIACIÓN DEL SIGUIENTE COMANDO
#Variables que se usarán en la ejecución de este script

#*Se almacena en la variable IPSERVER la ip del servidor*
IPSERVER=$(hostname -I)
#*Se almacena en la variable HOSTNAME el hostname del servidor*
HOSTNAME=$(hostname)

#*Se almacena en la variable DOMINIOMIN el nombre del dominio*
echo "Introduce tu dominio en minúsculas y sin extensión como por ejemplo, iesallerrl"
read DOMINIOMIN

#*Se almacena en la variable MONTAJE la ruta sobre la que vas a montar el RAID*
read -p "Introduce la ruta de tu directorio sobre el que montarás el RAID, ejemplo /datos" MONTAJE

#*Se almacena en la variable DOMINIOMAS el valor de $DOMINIOMIN EN MAYÚSCULAS GRACIAS al COMANDO tr que permite la transliteración de caracteres de minúscula a mayúscula.*
DOMINIOMAS=$(echo "$DOMINIOMIN" | tr '[:lower:]' '[:upper:]')

#Antes de nada actualizamos los repositorios.
apt update

#Instalación y configuración del servicio NTP
apt install ntpsec -y
#*sed -i nos permite modificar directamente el archivo en vez de redirigir la salida a otro archivo*
#*el parámertro -e nos permite utilizar dentro del comando varias expresiones, es decir, puedes combinar lo que serían 4 comandos en uno*
#*la s indica que se va a realizar una operación de sustitución*
#*/ indica que comienza el primer patrón, lo que se va a buscar en este caso*
#*^ indica que busque al comienzo de una línea*
#*pool 0.* indica que va a buscar una línea que comineze por "pool 0" y que no se especifica que sigue después.*
#*/ indica que finaliza el primero y  comineza el segundo patrón, el valor por el que se va a sustituir*
#*server 0... es por que que se va a sustituir*
#*/ indica que finaliza el segundo patrón, el valor por el que se va a sustituir*
#*\ la barra indica que se va a realizar un corte de línea para mejorar la legibilidad del comando*
#* /etc/ntpsec.ntp.conf es el archivo al cual se le va a realizar el comando (-i)*
sed -i -e 's/^pool 0.*/server 0.es.pool.ntp.org/' \
       -e 's/^pool 1.*/server 1.es.pool.ntp.org/' \
       -e 's/^pool 2.*/server 2.es.pool.ntp.org/' \
       -e 's/^pool 3.*/server 3.es.pool.ntp.org/' /etc/ntpsec/ntp.conf


systemctl restart ntpsec.service
echo "Servicio NTP instalado y configurado correctamente"
sleep 2

#Instalación de Samba4, smbclient y winbind
apt install samba smbclient winbind -y
rm /etc/samba/smb.conf
echo "Samba instalado correctamente"
sleep 2


#Configuración del DNS interno en /etc/resolv.conf
#*sed -i nos permite modificar directamente el archivo en vez de redirigir la salida a otro archivo*
#*la s indica que se va a realizar una operación de sustitución*
#* .* en este caso representa cualquier secuencia de caracteres *
#*lo siguiente es que va a remplazar .* por:
#*domain nombreDelDominio.local
#*search nombreDelDominio.local
#*nameserver ipDelServer*
#*\n indica un cambio de línea*
#*/etc/resolv.conf en el archivo en el que se va a realizar la configuración*
sed -i "s/.*/domain $DOMINIOMIN.local\nsearch $DOMINIOMIN.local\nnameserver $IPSERVER/" /etc/resolv.conf
sleep 2

#Configuración del archivo hosts
sed -i "s/\(127\.0\.1\.1[[:space:]]*\).*/\1$HOSTNAME $HOSTNAME.$DOMINIOMIN.local/" /etc/hosts
sleep 2

#Promoción del dominio
samba-tool domain provision --use-rfc2307 --realm=$DOMINIOMAS.LOCAL --domain=$DOMINIOMAS --server-role=dc --dns-backend=SAMBA_INTERNAL --adminpass='abc123.'
echo "Dominio promocionado correctamente"
sleep 3

#Añadir parametros a [global] en /etc/samba/smb.conf
sed -i '/dns forwarder/d' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \tallow dns updates = nonsecure' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \tdns forwarder = 8.8.8.8' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \tldap server require strong auth = no' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \thide unreadable = yes' /etc/samba/smb.conf

#Detener y desactivar servicio smbd, nmbd y winbind
systemctl stop smbd nmbd winbind
systemctl disable smbd nmbd winbind
systemctl unmask samba-ad-dc
systemctl start samba-ad-dc
systemctl enable samba-ad-dc

echo "Esperando unos segundos antes de realizar las comprobaciones..."
sleep 10

#Realizar comprobaciones de los apuntes
smbclient -L localhost -U%
host -t SRV _ldap._tcp.$DOMINIOMIN.local
host -t SRV _kerberos._udp.$DOMINIOMIN.local
host -t A $HOSTNAME.$DOMINIOMIN.local

read -p "Presiona Enter para continuar con la parte de importar usuarios"

#Instalación y configuración del servicio nslcd (usar opciones por defecto y marcar passwd, group y shadow)
apt install nslcd -y

sleep 2

#Enviamos esta configuración a /etc/nslcd
echo "pagesize 1000" >> /etc/nslcd.conf
echo "referrals off" >> /etc/nslcd.conf
echo "" >> /etc/nslcd.conf
echo "# Filters" >> /etc/nslcd.conf
echo 'filter passwd (objectClass=user)' >> /etc/nslcd.conf
echo 'filter group (objectClass=group)' >> /etc/nslcd.conf
echo "" >> /etc/nslcd.conf
echo "# Attribute mappings" >> /etc/nslcd.conf
echo "map passwd uid sAMAccountName" >> /etc/nslcd.conf
echo "map passwd homeDirectory unixHomeDirectory" >> /etc/nslcd.conf
echo "map passwd gecos displayName" >> /etc/nslcd.conf
echo "map passwd gidNumber primaryGroupID" >> /etc/nslcd.conf
echo "" >> /etc/nslcd.conf
echo "# LDAP bind" >> /etc/nslcd.conf
echo "binddn cn=Administrator,cn=Users,dc=$DOMINIOMIN,dc=local" >> /etc/nslcd.conf
echo "bindpw abc123." >> /etc/nslcd.conf

systemctl restart nslcd

#Creación de usuario de prueba
samba-tool user add usuarioPrueba abc123. --uid-number=10022
sleep 2

getent passwd | grep usuarioPrueba

read -p "Usuarios y grupos importados correctamente"

samba-tool user delete usuarioPrueba


#Instalación de servicios a usar
echo "Instalación de mdadm, acl, y quota."
apt install mdadm acl quota -y

echo "Script finalizado"
sleep 2




##CREACIÓN DEL RAID



mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc
sleep 10 
mdadm --detail --scan >> /etc/mdadm/mdadm.conf
yes | mkfs.ext4 /dev/md0
update-initframs -u
echo "/dev/md0 $MONTAJE ext4 user_xattr,acl,usrquota,grpquota 0 2" >> /etc/fstab
systemctl daemon-reload
mount -a
mount | grep md0
