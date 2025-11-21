---
title: Nibbles
layout: page
permalink: /HTB_Nibbles
---

<h2 class="amarillo">Nibbles</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/nibbles.png" alt="under" oncontextmenu="return false;">
</div>

La máquina Nibbles al encenderla nos da la dirección ip 10.129.128.39, vamos a enviar 5 trazas ICMP para ver el valor de TTL y determinar si es una máquina Linux o Windows.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/1.png" alt="under" oncontextmenu="return false;">
</div>

Con un TTL de 63 estamos frente a un sistema Linux.
<h2 class="amarillo">Enumeración</h2>
Comenzando la fase de enumeración para identificar los puertos abiertos y servicios expuestos, usaremos nmap y vemos solo 2 puertos, el 22 y el 80.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/2.png" alt="under" oncontextmenu="return false;">
</div>
Hacemos un escaneo más exhaustivo haciendo uso de los parámetros `-sCV` para identificar la versión y servicio que corren para los puertos 22 y 80.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/3.png" alt="under" oncontextmenu="return false;">
</div>
Al ver que es una página web, probamos a enumerar las tecnologías del sitio usando la herramienta whatweb.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/4.png" alt="under" oncontextmenu="return false;">
</div>
Al entrar a la pagina web vemos un sitio prácticamente en blanco con el mensaje Hello World!.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/5.png" alt="under" oncontextmenu="return false;">
</div>
Podemos obtener más información del sitio haciendo uso del atajo `ctrl + u` para ver el código fuente de la página, en donde, vemos una ruta /nibbleblog/
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/5.5.png" alt="under" oncontextmenu="return false;">
</div>
Nos encontramos con un sitio web que nos habla sobre posts y algunas categorías, pero no encontramos nada más. En este punto vamos a hacer Fuzzing.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/6.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Fuzzing</h2>

Para el fuzzing y descubrir nuevas rutas potenciales en la web usaremos wfuzz `wfuzz -c -t 200 --hc=404 -w /directory-list-2.3-medium.txt http://10.129.128.39/FUZZ` y vemos que no encontramos nada.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/7.png" alt="under" oncontextmenu="return false;">
</div>
Probamos a enumerar ahora el endpoint encontrado anteriormente /nibbleblog:
`wfuzz -c -t 200 -w /directory-list-2.3-medium.txt http://10.129.128.39/nibbleblog/FUZZ` y encontramos algunas rutas potenciales.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/8.png" alt="under" oncontextmenu="return false;">
</div>
Como estamos enumerando información sobre la ruta /nibbleblog/, probando con la herramienta searchsploit encontramos 2 vulnerabilidades asociadas. Pero no usaremos ninguna.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/8.5.png" alt="under" oncontextmenu="return false;">
</div>
Yendo a la ruta de /nibbleblog/admin encontramos capacidad de directory listing, y vemos más directorios pero no hay nada de interés.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/9.png" alt="under" oncontextmenu="return false;">
</div>
Probamos a hacer Fuzzing pero a archivos con extensión .php en /nibbleblog/FUZZ.php y encontramos unos archivos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/10.png" alt="under" oncontextmenu="return false;">
</div>
Revisando con atención el archivo admin.php vemos que nos lleva a un login, no disponemos de credenciales válidas, pero probando combinaciones con la información que ya disponemos, podemos logearnos con admin:nibbles
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/11.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

La página nos permite subir imágenes pero no válida la extensión, entonces subimos una imagen.php:
```php
<?php echo "<pre>" . shell_exec($_GET["cmd"]) . "</pre>";
```

De esta forma al cargar el recurso de la imagen.php desde la URL, podremos hacer uso del parámetro "cmd" usando el método GET para inyectar comandos, por ejemplo un whoami.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/12.png" alt="under" oncontextmenu="return false;">
</div>

De esta forma podemos enviarnos una reverse shell.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/13.png" alt="under" oncontextmenu="return false;">
</div>

Si vamos al directorio /home encontraremos la flag del usuario.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/14.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Escalada</h2>

Junto a la flag encontramos un archivo que llama la atención "personal.zip", para traernos este archivo a nuestra maquina hacemos uso de un truco convirtiendo todo el comprimido zip en base64.
```bash
base64 -w 0 personal.zip

echo "UEsDBA........GAAAAA==" | base64 -d > personal.zip (ESTO EN NUESTRO SISTEMA)
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/15.png" alt="under" oncontextmenu="return false;">
</div>

El contenido del zip es un script en bash monitor.sh, y si hacemos sudo -l vemos que tenemos privilegios sobre el mismo binario
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/16.png" alt="under" oncontextmenu="return false;">
</div>

Podemos crear el directorio /home/nibbler/personal/stuff/monitor.sh usando mkdir -p, ya que tenemos un privilegio sobre una ruta que no existe, de esta forma como sera ejecutado por root, podemos agregar el privilegio SUID a la /bin/bash.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/18.png" alt="under" oncontextmenu="return false;">
</div>

De esta forma, ejecutando bash -p seremos root.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/19.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/HTB/Nibbles/pwn.png" alt="under" oncontextmenu="return false;">
</div>


