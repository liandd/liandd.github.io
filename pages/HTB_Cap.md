---
title: Cap
layout: page
permalink: /HTB_Cap
---

<h2 class="amarillo">HackTheBox - Cap WriteUp - Máquina retirada</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Cap/Cap.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la máquina y nos da la dirección IP 10.129.17.161, enviaremos un paquete para saber a que nos estamos enfrentando:

```bash
❯ ping -c 5 10.129.17.161
PING 10.129.17.161 (10.129.166.121) 56(84) bytes of data.
64 bytes from 10.129.17.161: icmp_seq=1 ttl=63 time=115 ms
64 bytes from 10.129.17.161: icmp_seq=2 ttl=63 time=112 ms
64 bytes from 10.129.17.161: icmp_seq=3 ttl=63 time=109 ms
64 bytes from 10.129.17.161: icmp_seq=4 ttl=63 time=108 ms
64 bytes from 10.129.17.161: icmp_seq=5 ttl=63 time=111 ms
--- 10.129.17.161 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 108.120/110.928/115.225/2.492 ms
```

Con un TTL de 63 estamos frente a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>


Comenzamos con un escaneo usando nmap y adelantamos trabajo:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/1.png" alt="under" oncontextmenu="return false;">
</div>

Vemos los puertos `21,22,80` en donde para el puerto 80 ejecutamos whatweb para identificar un poco las tecnologías que emplea la web, seguido lanzamos el conjunto de scripts básicos de reconocimiento y revisamos la version y servicio para estos puertos con nmap:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/2.png" alt="under" oncontextmenu="return false;">
</div>

Intentamos conectarnos con ftp pero al no tener el usuario anonymous habilitado no podremos hacer
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/3.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Explotación</h1>

Iremos directamente a la web:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/4.png" alt="under" oncontextmenu="return false;">
</div>

y encontramos un panel en el cual ya estamos logueados como el usuario nathan, esto es importante porque ahora tenemos un potencial usuario para el FTP.

Llama mucho la atención el apartado **Security Snapshot** porque podemos ver la palabra **PCAP** la cual es un archivo de lectura para el tráfico de red.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/5.png" alt="under" oncontextmenu="return false;">
</div>

Pero la web reporta que la captura PCAP no tiene información, sin embargo al mirar la URL dice data/1, lo que podemos hacer es cambiar el 1 por un 0:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/6.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos como el número de paquetes ha aumentado, también tenemos un botón para descargar la captura. Así que la abriremos con Wireshark
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/7.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos en el tráfico mediante el protocolo FTP el usuario nathan conectándose por FTP con su contraseña.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/8.png" alt="under" oncontextmenu="return false;">
</div>

Proporcionamos las credenciales y accedimos al FTP, y enumerando un poco encontramos la user.txt
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/9.png" alt="under" oncontextmenu="return false;">
</div>

Recordando que veíamos un SSH probamos a conectarnos como nathan:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/10.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Escalada</h1>

Probamos a enumerar si tenemos algún privilegio asignado como sudo:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/11.png" alt="under" oncontextmenu="return false;">
</div>

Pero no tenemos ninguno entonces buscamos por privilegios SUID:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/12.png" alt="under" oncontextmenu="return false;">
</div>

Pero nada fuera de lo normal, pero como el nombre de la máquina es CAP podemos tratar de buscar por capabilities:

<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/13.png" alt="under" oncontextmenu="return false;">
</div>
Y encontramos que el binario de python3.8 tiene una capability `cap_setuid` y esto es de lo que nos aprovecharemos porque nuestro identificador de usuario lo podremos cambiar con python:

```python
import os
os.system("whoami")
>>nathan
os.setuid(0)
os.system("whoami")
>>root
os.system("bash")
# whoami
root
# cat /root/root.txt
```

Y habremos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Cap/14.png" alt="under" oncontextmenu="return false;">
</div>
