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


##Cosas que revisar antes de ejecutar el script
#1. Que hayas metido 2 discos para la creación del RAID
#2. Que hayas cambiado el hostname al que se indica en el ejercicio
#3. Que puedas hacer un ping a una web, es decir que tengas acceso a internet
#4. Que la máquina este en la red correcta con la configuración de red correcta
#5. Que te puedas meter por ssh a la máquina
#6. Que en /etc/hosts la segunda línea sea 127.0.1.1


##VARIABLES A MODIFICAR SEGÚN EL ENUNCIADO DEL EJERCICIO

DIRECTORIOCOMPARTIDO=usuarios

SUBDIRECTORIOA=diradmin
SUBDIRECTORIOB=diraux
PERFISWINDOWS=PerfisWindows
PERFISLINUX=PerfisLinux

OUPADRE=uousuarios
OUHIJOA=uoadministracion
OUHIJOB=uouxiliares

USERA=uadm1
USERB=uaux1

GRUPOPADRE=g-usuarios
GRUPOA=g-administracion
GRUPOB=g-auxiliares

DOMINIOMIN=domilalinrl

MONTAJE=/raiddatos

##TODOS LOS COMENTARIOS QUE ESTEAN ENTRE * SON LA EXPLIACIÓN DEL SIGUIENTE COMANDO
#Variables que se usarán en la ejecución de este script

#*Se almacena en la variable IPSERVER la ip del servidor*
IPSERVER=$(hostname -I)
#*Se almacena en la variable HOSTNAME el hostname del servidor*
HOSTNAME=$(hostname)


#*Se muestra todas las variables al usuario para que pueda confirmar si tiene todo bien escrito, es espera un ENTER para continuar*
echo "Antes de continuar, comprueba que todas las variables contienen los datos correctos" 
echo "Tu dominio es: $DOMINIOMIN"
echo "El nombre de tu recurso compartido es: $DIRECTORIOCOMPARTIDO"
echo "Tu punto de montaje del RAID es: $MONTAJE y sus subdirectorios son $SUBDIRECTORIOA, $SUBDIRECTORIOB, $PERFISWINDOWS Y $PERFISLINUX"
echo "Tu estructura es: $OUPADRE:$GRUPOPADRE = Unidad organizativa y grupo principal,a este pertenecen todos los usuarios"
echo "Tu estructura es: $OUHIJOA:$GRUPOA:$USERA = Unidad organizativa hija, grupo y user 1"
echo "Tu estructura es: $OUHIJOB:$GRUPOB:$USERB = Unidad organizativa hija, grupo y user 1"
read -p "Presiona ENTER para continuar con la ejecución del script"



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

#Reiniciamos el servicio ntpsec
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
#*sed -i nos permite modificar directamente el archivo en vez de redirigir la salida a otro archivo*
#*la s indica que se va a realizar una operación de sustitución*
#*/ indica el comienzo del primer patrón, \( sirve para interpretar el paréntesis como el inicio del valor que se recoge en \1 al igual de \.*
#*[[:space:]]*\ esto indica que hay espacios en blanco, el * indica que no se especifica cuantos espacios en blanco hay*
#*\).*, interpreta el paréntesis el símbolo el primer valor que se recoge en \1 y el .* indica que puede haber cualquier cosa después*
#*\1 se refiere al valor recogido entre los paréntesis
sed -i "s/\(127\.0\.1\.1[[:space:]]*\).*/\1$HOSTNAME $HOSTNAME.$DOMINIOMIN.local/" /etc/hosts
sleep 2

#Promoción del dominio
samba-tool domain provision --use-rfc2307 --realm=$DOMINIOMAS.LOCAL --domain=$DOMINIOMAS --server-role=dc --dns-backend=SAMBA_INTERNAL --adminpass='abc123.'
echo "Dominio promocionado correctamente"
sleep 3

#Añadir parametros a [global] en /etc/samba/smb.conf
#*sed -i nos permite modificar directamente el archivo en vez de redirigir la salida a otro archivo*
#*/ indica el comienzo del patón que va a buscar, ^ significa principio de linea \[global\] sirve para escapar los corchetes y buscar tal cual [global]*
#*/ indica el final del patrón de búsqueda, a\ indica "append" es decir, que lo siguiente que haya después del append se va a añadir en global, por ello no necesitamos que sea otro rango*
#*\t indica una tabulación*
sed -i '/dns forwarder/d' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \tallow dns updates = nonsecure' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \tdns forwarder = 8.8.8.8' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \tldap server require strong auth = no' /etc/samba/smb.conf
sed -i '/^\[global\]/ a\ \thide unreadable = yes' /etc/samba/smb.conf

#Detener y desactivar servicio smbd, nmbd y winbind y activar el servicio samba-ad-dc
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

read -p "Presiona Enter para continuar con la parte de importar usuarios, presiona ENTER para continuar con la importación de los usuarios"

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

#Reiniciando el servicio nslcd
systemctl restart nslcd

#Creación de usuario de prueba
samba-tool user add usuarioPrueba abc123. --uid-number=10022

#Añadiendo gidNumber a "Domain Admins"
samba-tool group addunixattrs "Domain Admins" 20010



sleep 2

#Importando usuaios y filtrando para que únicamente nos muestre usuarioPrueba
getent passwd | grep usuarioPrueba

read -p "Usuarios y grupos importados correctamente, presiona ENTER para continuar"

#Elimina el usuario: usuarioPrueba
samba-tool user delete usuarioPrueba


#Instalación de servicios a usar posteriormente
echo "Instalación de mdadm, acl, y quota, entre otros..."
apt install mdadm acl fbgrab tree quota -y

echo "Creación del RAID"
sleep 2




##CREACIÓN DEL RAID


#Creación del raid, el yes | sirve para saltarnos la confirmación que nos pide al crear el RAID
yes | mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc
sleep 10

#Creación del directorio y subdirectorios, actualizando y formateando el disco, montándolo en fstab, etc.
mkdir $MONTAJE
mdadm --detail --scan >> /etc/mdadm/mdadm.conf
yes | mkfs.ext4 /dev/md0
update-initramfs -u
echo "/dev/md0 $MONTAJE ext4 user_xattr,acl,usrquota,grpquota 0 2" >> /etc/fstab
systemctl daemon-reload
mount -a
mount | grep md0
mkdir $MONTAJE/$SUBDIRECTORIOA $MONTAJE/$SUBDIRECTORIOB $MONTAJE/PerfisWindows $MONTAJE/PerfisLinux

#Permisos esenciales
chown -R root:root $MONTAJE
chmod -R 770 $MONTAJE
chmod 775 $MONTAJE

#Compartir recurso del valor de la variableDIRECTORIOCOMPARTIDO.
#-e para que interprete \ para escapar caracteres
echo -e "[$DIRECTORIOCOMPARTIDO]\n\tpath = $MONTAJE\n\tread only = No" >> /etc/samba/smb.conf


#Creación de usuarios, grupos y unidades organizativas (adaptado para el ejercicio de práctica)
#Creación de las unidades organizativas (En este caso uoadm y uoaux estarán dentro de uouser)
samba-tool ou create "OU=$OUPADRE,DC=$DOMINIOMIN,DC=local"
samba-tool ou create "OU=$OUHIJOA,OU=$OUPADRE,DC=$DOMINIOMIN,DC=local"
samba-tool ou create "OU=$OUHIJOB,OU=$OUPADRE,DC=$DOMINIOMIN,DC=local"


#Creación de los grupos y ubicarlos en su uo correspondiente
samba-tool group add $GRUPOPADRE --groupou=OU=$OUPADRE --gid-number=20000 --nis-domain=$DOMINIOMIN.local
samba-tool group add $GRUPOA --groupou=OU=$OUHIJOA,OU=$OUPADRE --gid-number=20001 --nis-domain=$DOMINIOMIN.local
samba-tool group add $GRUPOB --groupou=OU=$OUHIJOB,OU=$OUPADRE --gid-number=20002 --nis-domain=$DOMINIOMIN.local


#Hacer que las contraseñas nuncan caduquen
samba-tool domain passwordsettings set --max-pwd-age=0
#Creación de los usuarios y ubicarlos en su uo correspondiente
samba-tool user create $USERA abc123. --userou=OU=$OUHIJOA,OU=$OUPADRE --uid-number=10000 --home-directory="\\\\$HOSTNAME\\$DIRECTORIOCOMPARTIDO\\$SUBDIRECTORIOA\\$USERA" --home-drive=P --profile="\\\\$HOSTNAME\\$DIRECTORIOCOMPARTIDO\\$PERFISWINDOWS\\$USERA"
samba-tool user create $USERB abc123. --userou=OU=$OUHIJOB,OU=$OUPADRE --uid-number=10001 --home-directory="\\\\$HOSTNAME\\$DIRECTORIOCOMPARTIDO\\$SUBDIRECTORIOB\\$USERB" --home-drive=P --profile="\\\\$HOSTNAME\\$DIRECTORIOCOMPARTIDO\\$PERFISLINUX\\$USERB"




#Añadir los usuarios a sus grupos correspondientes
samba-tool group addmembers $GRUPOPADRE $USERA 
samba-tool group addmembers $GRUPOPADRE $USERB
samba-tool group addmembers $GRUPOA $USERA 
samba-tool group addmembers $GRUPOB  $USERB


#ACL

#Directorio padre
setfacl -m g:$GRUPOPADRE:r-x $MONTAJE
setfacl -m g:"Domain Admins":rwx $MONTAJE
setfacl -dm g:"Domain Admins":rwx $MONTAJE

#Directorio hijo 1
setfacl -m g:"Domain Admins":rwx $MONTAJE/$SUBDIRECTORIOA
setfacl -m g:$GRUPOA:r-x $MONTAJE/$SUBDIRECTORIOA
setfacl -dm g::--- $MONTAJE/$SUBDIRECTORIOA
setfacl -dm o:--- $MONTAJE/$SUBDIRECTORIOA

#Directorio hijo 2
setfacl -m g:"Domain Admins":rwx $MONTAJE/$SUBDIRECTORIOB
setfacl -m g:$GRUPOB:r-x $MONTAJE/$SUBDIRECTORIOB
setfacl -dm g::--- $MONTAJE/$SUBDIRECTORIOB
setfacl -dm o:--- $MONTAJE/$SUBDIRECTORIOB

#Directorio PerfisWindows
setfacl -m g:$GRUPOPADRE:rwx $MONTAJE/$PERFISWINDOWS

#Directorio PerfisLinux
setfacl -m g:$GRUPOPADRE:rwx $MONTAJE/$PERFISLINUX

#Quotas

quotaoff -avug
quotacheck -avug
quotaon -avug

setquota -u $USERA 150000 300000 0 0 /dev/md0
setquota -u $USERB 75000 150000 0 0 /dev/md0
