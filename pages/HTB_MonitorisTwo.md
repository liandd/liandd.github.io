---
title: MonitorsTwo
layout: page
permalink: /HTB_MonitorsTwo
---

<h2 class="amarillo">MonitorsTwo</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/monitorstwo.png" alt="under" oncontextmenu="return false;">
</div>
Encendemos la máquina y obtenemos la dirección ip 10.129.228.231 a la cual le lanzaremos 5 trazas ICMP para saber si esta encendida, y de paso a través del TTL saber si es una Linux o Windows.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/1.png" alt="under" oncontextmenu="return false;">
</div>
Vemos un TTL de 63, por tanto, estamos frente a una máquina Linux por proximidad a 64.

<h2 class="amarillo">Enumeración</h2>
Comenzando con la fase de enumeración para detectar puertos abiertos utilizando nmap, se hace primero el escaneo por TCP con el comando `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.228.231` y exportamos la captura para no realizar nuevamente un escaneo.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/2.png" alt="under" oncontextmenu="return false;">
</div>

Revisando los puertos abiertos vemos que solo están el 22 y el 80.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/3.png" alt="under" oncontextmenu="return false;">
</div>

Enumerando el puerto 80 con la herramienta whatweb vemos un servicio "cacti" y las tecnologías que utiliza la web.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/4.png" alt="under" oncontextmenu="return false;">
</div>

Entrando a la página desde el navegador vemos un panel login.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/5.png" alt="under" oncontextmenu="return false;">
</div>

Más allá de desconocer las credenciales para iniciar sesión, vemos que la página nos muestra la versión del servicio cacti, la cual con la herramienta de searchsploit podremos ver que es vulnerable.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/6.png" alt="under" oncontextmenu="return false;">
</div>

Antes de probar con los scripts, seguimos enumerando un poco la web haciendo uso de la herramienta wfuzz `wfuzz -c -t 200 --hc=404 -w /directory-list-2.3-medium.txt -u http://10.129.228.231/FUZZ`.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/7.png" alt="under" oncontextmenu="return false;">
</div>

Por más que intentemos filtrar por la cantidad de caracteres ya que son muy disparejos los valores, intentaremos fuzzear por archivos php y encontramos uno interesante del cual el RCE anteriormente visto con searchsploit hace uso, el cual es el cmd.php
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/8.png" alt="under" oncontextmenu="return false;">
</div>
<h2 class="amarillo">Explotación</h2>

Con python ejecutamos el script el cual nos dara una consola interactiva
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/9.png" alt="under" oncontextmenu="return false;">
</div>

Después de hacer un tratamiento de la tty con bash:
```bash
script /dev/null -c bash
ctrl + Z
stty raw -echo; fg
reset
xterm
export TERM=xterm
export SHELL=bash
```
Vemos que al hacer un Hostname -I estamos en un segmento de ip completamente diferente al de la máquina, ya esto nos da la idea de que es contenedor.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/10.png" alt="under" oncontextmenu="return false;">
</div>
Tratamos de buscar binarios con el privilegio SUID con el comando `find \-perm -4000 2>/dev/null` y encontramos un binario extraño llamado capsh, el cual si le pasamos los argumentos --gid=0 --uid=0 -- nos arroja una consola como root.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/11.png" alt="under" oncontextmenu="return false;">
</div>
Siendo root dentro del contendor y enumerando un poco el sistema, encontraremos un archivo de configuracion sql.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/12.png" alt="under" oncontextmenu="return false;">
</div>
Y haciendo uso de los argumentos -uroot -proot -h db -D cacti nos conectaremos( -u y -p para el usuario y la contraseña, -h para decirle el hostname el cual es db, y -D la base de datos que usaremos)
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/13.png" alt="under" oncontextmenu="return false;">
</div>
Conectados vemos una tabla user_auth la cual con la query `select username,0x3a,password from user_auth;` veremos las contrasenas de los usuarios.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/14.png" alt="under" oncontextmenu="return false;">
</div>

```
admin:$2y$10$IhEA.Og8vrvwueM7VEDkUes3pwc3zaBbQ/iuqMft/llx8utpR1hjC
marcus:$2y$10$vcrYth5YcCLlZaPDj6PwqOYTw68W1.3WeKlBn70JonsdW/MhFYK4C
```

Utilizando hashcat intentamos crackear las contrasenas con `hashcat hash rockyou.txt -O`
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/15.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/16.png" alt="under" oncontextmenu="return false;">
</div>
Una vez hashcat termina, veremos que la contraseña del usuario marcus es:funkymonkey, por tanto, podremos hacer uso del SSH para conectarnos. Sin embargo, a pesar de buscar por (binarios SUID, Capabilities, Tareas cron, etc) no encontraremos nada, pero recordando que hemos salido de un contenedor podemos revisar monturas o sistemas de archivos montados con mount. Y encontramos uno llamativo:

`/var/lib/docker/overlay2/4ec90ecfa.....effec/merged` y tiene capacidad de rw

<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/17.png" alt="under" oncontextmenu="return false;">
</div>
Con esto sabremos que podremos escribir allí y para hacer la escalada de privilegios haremos una copia de la bash, le asignamos el privilegio SUID y seremos root.
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/18.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/HTB/MonitorsTwo/pwn.png" alt="under" oncontextmenu="return false;">
</div>


