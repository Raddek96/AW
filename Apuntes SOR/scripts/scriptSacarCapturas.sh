#!/bin/bash

#Script para sacar las capturas del ejercicio

#Importante ejecutarlo desde la máquina y no desde ningún ssh

echo "Antes de continuar, asegúrate de estar ejecutando este script desde la máquina y no desde ssh"
echo "Además comprueba que los comandos están bien"
read -p "Presiona ENTER para continuar..."



mkdir /root/imagenesEjercicio
cat /etc/hosts;cat /etc/hostname
sleep 1
fbgrab /root/imagenesEjercicio/hostsAndHostname.png
clear
sleep 2 

ip link;ip addr
sleep 1
fbgrab /root/imagenesEjercicio/networkConf.png
clear
sleep 2

samba-tool domain info 127.0.0.1
sleep 1
fbgrab /root/imagenesEjercicio/domainInfo.png
clear
sleep 2

samba-tool ou list
sleep 1
fbgrab /root/imagenesEjercicio/ouList.png
clear
sleep 2

samba-tool user list
sleep 1
fbgrab /root/imagenesEjercicio/userList.png
clear
sleep 2

samba-tool group list
sleep 1
fbgrab /root/imagenesEjercicio/domainInfo.png
clear
sleep 2

df -h;tree -L 2 /datos
sleep 1
fbgrab /root/imagenesEjercicio/directoryStructure.png
clear
sleep 2
smbclient -L localhost -U%
sleep 5
fbgrab /root/imagenesEjercicio/smbclientLocalhost.png
clear
sleep 2

getent passwd|tail -n5;getent group | tail -n5
sleep 1
fbgrab /root/imagenesEjercicio/getentPasswdAndGroup.png
clear
sleep 2

getfacl /datos/diradmin
sleep 1
fbgrab /root/imagenesEjercicio/aclDiradmin.png
clear
sleep 2

getfacl /datos/PerfisWindows
sleep 1
fbgrab /root/imagenesEjercicio/aclPerfisWindows.png
clear
sleep 2

repquota -a
sleep 1
fbgrab /root/imagenesEjercicio/quotaA.png
clear
sleep 2

edquota -u uadm1
sleep 1
fbgrab /root/imagenesEjercicio/quotaB.png
clear
echo "Capturas tomadas y almacenadas en el directorio /root/ejercicioImagenes"