---
title: Included 
layout: page
permalink: /HTB_Included
---

<h2 class="amarillo">Included</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/included.webp" alt="under" oncontextmenu="return false;">
</div>
Comenzamos encendiendo la máquina y haciendo un escaneo rápido y sigiloso para enumerar puertos abiertos con nmap:

```bash
sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.95.185 -oG allPorts
```
<h1 class="amarillo">Enumeración</h1>
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Como solo está el puerto 80 abierto vamos a lanzarle un escaneo exhaustivo para identificar la version y el servicio que corren para este puerto.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que nos lleva a **?file=home.php** lo cual es algo raro, veamos con whatweb lo que nos reporta:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que es un redirect a una web Titan Gears:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/web.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Explotación</h1>
Es algo sencillo intuir que la variable **file** es vulnerable un Directory Path Trasversal, así que tratamos de leer el /etc/passwd:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/pathtrasversal.png" alt="under" oncontextmenu="return false;">
</div>

Efectivamente podemos ver su contenido, si revisamos el código fuente de la página tenemos que el siguiente código php no está sanitizado.

```php
if ($_GET['file']) {
include($_GET['file']);
} else {
header("Location: http://$_SERVER[HTTP_HOST]/index.php?file=home.php");
}
```

No seria un código sanitizado y nos permitió un LFI

<h1 class="verde">¿Qué es un LFI?</h1>

Local file inclusion (also known as LFI) is the process of including files, that are
already locally present on the server, through the exploitation of vulnerable inclusion
procedures implemented in an application.

Lo sabemos porque pudimos cargar el /etc/passwd que es un LFI

```php
if ($_GET['file']) {
include( __DIR__ . $_GET['file']);
} else {
header("Location: http://$_SERVER[HTTP_HOST]/index.php?file=home.php");
}
```

Aquí solo carga localmente dentro de /var/www/html

El LFI nos dice que hay 
```bash
tftp:x:110:113:tftp daemon,,,:/var/lib/tftpboot:/usr/sbin/nologin
```

<h1 class="verde">¿Qué es TFTP?</h1>

Buscando en Google encontramos que tftp significa **Trivial File Transfer Protocol (TFTP)** y es un protocolo que provee de un servicio básico de transferencia de archivos que no requiere de autenticación por parte del usuario. Usado como alternativa para aplicaciones que no requieren sofisticadas interacciones dadas por FTP.

> Este servicio opera por UDP

```bash
nmap -p- --open -T5 -v -n -sU 10.129.95.185 
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/udpscan.png" alt="under" oncontextmenu="return false;">
</div>

Para poder usar TFTP usaremos la herramienta `tftp-hpa`
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/tftp.png" alt="under" oncontextmenu="return false;">
</div>

Nos conectamos y podemos ver los comandos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/tftp2.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos PUT, entonces esto nos permite subir archivos, por ejemplo subir un reverse shell en php:

```bash
❯ tftp 10.129.95.185
tftp> put li.php
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/intrusion.png" alt="under" oncontextmenu="return false;">
</div>

Nos ponemos en escucha con ncat y obtenemos la shell:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/intrusion2.png" alt="under" oncontextmenu="return false;">
</div>

Somos www-data y si tratamos de listar la user.txt no podremos por falta de permisos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/intrusion3.png" alt="under" oncontextmenu="return false;">
</div>

Tendremos que hacer **User Pivoting**, devolviendonos al directorio de la web si listamos los archivos ocultos encontramos un .htaccess y un .htpasswd
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/mike.png" alt="under" oncontextmenu="return false;">
</div>

Y esto nos ha revelado las credenciales del usuario mike:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/mike2.png" alt="under" oncontextmenu="return false;">
</div>

Siendo mike abremos completado la intrusion.

<h1 class="amarillo">Escalada</h1>

Enumerando un poco la máquina vemos que estamos en el grupo LXD, y si hacemos una rápida búsqueda en searchsploit encontraremos la herramienta desarrollada por S4vitar:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/escalada.png" alt="under" oncontextmenu="return false;">
</div>

La podemos descargar y necesitaremos entonces una imagen de alpine para poder ejecutar el exploit que conseguiremos con wget y buscando en internet.

```bash
wget https://raw.githubusercontent.com/saghul/lxd-alpine-builder/master/build-alpine
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/escalada2.png" alt="under" oncontextmenu="return false;">
</div>

Dentro del directorio /tmp tendremos todo lo necesario para ejecutar la escalada:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/escalada3.png" alt="under" oncontextmenu="return false;">
</div>

Ejecutamos el script y le pasamos la imagen de alpine:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/escalada4.png" alt="under" oncontextmenu="return false;">
</div>

Ahora si nos vamos al directorio /mnt tendremos el sistema de archivos de la máquina montada en nuestro contenedor, y en el contenedor nosotros somo root entonces habremos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/root.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Included/pwn.png" alt="under" oncontextmenu="return false;">
</div>




