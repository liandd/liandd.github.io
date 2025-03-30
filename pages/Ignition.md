---
title: Ignition
layout: page
permalink: /Ignition
---

<h2 class="titulo-principal">Ignition</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/ignition.webp" alt="under" oncontextmenu="return false;">
</div>


Encendemos la máquina Ignition y nos da la dirección IP 10.129.1.27 y lanzamos un ping para saber si la máquina está activa.

```bash
❯ ping -c 5 10.129.1.27
PING 10.129.1.27 (10.129.1.27) 56(84) bytes of data.
64 bytes from 10.129.1.27: icmp_seq=1 ttl=63 time=114 ms
64 bytes from 10.129.1.27: icmp_seq=2 ttl=63 time=109 ms
64 bytes from 10.129.1.27: icmp_seq=3 ttl=63 time=109 ms
64 bytes from 10.129.1.27: icmp_seq=4 ttl=63 time=110 ms
64 bytes from 10.129.1.27: icmp_seq=5 ttl=63 time=109 ms
--- 10.129.1.27 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4001ms
rtt min/avg/max/mdev = 108.648/110.052/113.603/1.802 ms
```

Para saber a que nos estamos enfrentamos miramos el TTL y vemos 63, así que estamos frente a una máquina Linux.
<h2 class="titulo-principal">Enumeración</h2>

Para la enumeración usamos nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.1.27 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Al ver que solo hay un puerto abierto y ser el `80` directamente, pasamos a realizar un escaneo exhaustivo con una serie de scripts básicos de reconocimiento para identificar la versión y servicio.

```bash
nmap -sCV -p80 10.129.1.27 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que el escaneo de nmap reporta una redirección a un sitio web llamado `http://ignition.htb` el cual no ha podido resolver. Por tanto, para solucionar esto debemos agregarlo al archivo `/etc/hosts` para que nuestra máquina pueda resolver esta dirección web:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/hosting.png" alt="under" oncontextmenu="return false;">
</div>

Al hacer eso y saber que hay un puerto 80 abierto, hacemos uso de la herramienta whatweb para enumerar un poco:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Algo curioso de la captura de whatweb es que nos reporta un `Magento`. Antes de revisarlo seguimos enumerando con una serie de scripts de reconocimiento de rutas comunes con nmap empleando un diccionario corto y un script programado en Lua:

```bash
nmap --script http-enum 10.129.1.27 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/webscanfail.png" alt="under" oncontextmenu="return false;">
</div>

Pero el script no funciona, seguimos enumerando con la herramienta gobuster para encontrar posibles rutas comunes:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/dirbust.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos una ruta '/admin', seguimos enumerando por archivos con la extensión .PHP:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/filebust.png" alt="under" oncontextmenu="return false;">
</div>

Pero no hay nada más allá de un index.php.
<h2 class="titulo-principal">Explotación</h2>

Recordando que estamos frente a un servicio web, lo abrimos en el navegador y nos encontramos con la página en cuestion:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web.png" alt="under" oncontextmenu="return false;">
</div>

Revisando un poco la página, vemos algunos campos que llaman bastante la atención como un formulario y dos apartados para iniciar sesión, y el otro para crear una cuenta.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web2.png" alt="under" oncontextmenu="return false;">
</div>

Al hacer abrir el segundo nos pide registrarnos y crear una cuenta:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web3.png" alt="under" oncontextmenu="return false;">
</div>

Terminamos de llenar el formulario e iniciamos sesión:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web6.png" alt="under" oncontextmenu="return false;">
</div>

Usando la extensión `Wappalyzer` vemos que la página ejecuta un MySQL, interpreta código PHP, y Volvemos a ver `Magento` y nos dice que es la versión `2`.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web7.png" alt="under" oncontextmenu="return false;">
</div>

Aunque hagamos esto e iniciemos sesión, no encontraremos nada. Entonces volviendo al escaneo de whatweb que nos arrojó un `Magento` y gobuster detectó un directorio '/admin' procedemos a ir a la ruta:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web4.png" alt="under" oncontextmenu="return false;">
</div>

Encontramos un servicio Magento en la página con un panel Login, que intentando con credenciales comunes y por defecto no logramos nada.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/web5.png" alt="under" oncontextmenu="return false;">
</div>

Después de probar con intentos fallidos de inyección SQL, seguimos sin lograr nada, así una rápida búsqueda en Internet dice que posibles credenciales por defecto son las siguientes:

```
admin admin123
admin root123
admin password1
admin administrator1
admin changeme1
admin password123
admin qwerty123
admin administrator123
admin changeme123
```

Después de probar con todas la combinación ganadora fue 'admin:qwerty123'. Una vez iniciada la sesión podemos ver la flag y habremos completado la máquina.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Ignition/flag.png" alt="under" oncontextmenu="return false;">
</div>

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
