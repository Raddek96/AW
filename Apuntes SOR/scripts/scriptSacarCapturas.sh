#!/bin/bash

#Script para sacar las capturas del ejercicio
#Importante ejecutarlo desde 

mkdir /root/imagenesEjercicio
cat /etc/hosts;cat /etc/hostname
fbgrab /root/imagenesEjercicio/hostsAndHostname.png
clear
sleep 2 

ip link;ip addr
fbgrab /root/imagenesEjercicio/networkConf.png
clear
sleep 2

samba-tool domain info 127.0.0.1
fbgrab /root/imagenesEjercicio/domainInfo.png
clear
sleep 2

samba-tool ou list
fbgrab /root/imagenesEjercicio/ouList.png
clear
sleep 2

samba-tool user list
fbgrab /root/imagenesEjercicio/userList.png
clear
sleep 2

samba-tool group list
fbgrab /root/imagenesEjercicio/domainInfo.png
clear
sleep 2

df -h;tree -L 2 /datos
fbgrab /root/imagenesEjercicio/directoryStructure.png
clear
sleep 2
smbclient -L localhost -U%
sleep 5
fbgrab /root/imagenesEjercicio/smbclientLocalhost.png
clear
sleep 2

getent passwd|tail -n5;getent group | tail -n5
fbgrab /root/imagenesEjercicio/getentPasswdAndGroup.png
clear
sleep 2

getfacl /datos/diradmin
fbgrab /root/imagenesEjercicio/aclDiradmin.png
clear
sleep 2

getfacl /datos/PerfisWindows
fbgrab /root/imagenesEjercicio/aclPerfisWindows.png
clear
sleep 2

repquota -a
fbgrab /root/imagenesEjercicio/quotaA.png
clear
sleep 2

edquota -u uadm1
fbgrab /root/imagenesEjercicio/quotaB.png
clear
echo "Capturas tomadas y almacenadas en el directorio /root/ejercicioImagenes"