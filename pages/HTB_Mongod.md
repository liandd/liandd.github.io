---
title: Mongod
layout: page
permalink: /HTB_Mongod
---

<h2 class="titulo-principal">Mongod</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/mongod.webp" alt="under" oncontextmenu="return false;">
</div>

Lo primero que vamos a hacer es encender la máquina y obtenemos la dirección IP 10.129.50.235.

Vamos a lanzar 5 paquetes para saber si la máquina está activa y ver a que nos estamos enfrentando si aun sistema Linux o Windows:

```bash
❯ ping -c 5 10.129.50.235
PING 10.129.50.235 (10.129.50.235) 56(84) bytes of data.
64 bytes from 10.129.50.235: icmp_seq=1 ttl=63 time=112 ms
64 bytes from 10.129.50.235: icmp_seq=2 ttl=63 time=113 ms
64 bytes from 10.129.50.235: icmp_seq=3 ttl=63 time=111 ms
64 bytes from 10.129.50.235: icmp_seq=4 ttl=63 time=112 ms
64 bytes from 10.129.50.235: icmp_seq=5 ttl=63 time=115 ms
--- 10.129.50.235 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 110.522/112.553/114.953/1.412 ms
```

Con un TTL de 63 sabemos que estamos frente a un Linux.

<h2 class="titulo-principal">Enumeración</h2>

Por tanto vamos a comenzar con la fase de enumeración con nmap y un escaneo rápido y sigiloso:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.50.235 -oG allPorts
```

El resultado del escaneo nos revela que tenemos 2 puertos abiertos `22` y `27017`, un SSH y un MongoDB.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Para saber un poco más de información de estos servicios usamos extractPorts para copiar los puertos a la clipboard y comenzar nuestro escaneo nmap con una serie de scripts básicos de reconocimiento para saber la versión y servicio.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Para ello con nmap ejecutamos y exportamos el contenido de la captura al archivo targeted:

```bash
nmap -sCV -p22,27017 10.129.50.235 -oN targeted
```

Es una captura bastante abrumadora en el sentido que el servicio MongoDB está muy mal configurado y la información más relevante está casi al final de la misma.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Explotación</h2>

La captura nos arroja la información de las bases de datos que contiene MongoDB, así que lo siguiente será entablar una conexión con el servicio por el puerto 27017. Una forma de hacerlo es usando la herramienta `mongo` o `mongosh`.

> Para entablar la conexión con el servicio MongoDB ejecutamos **mongosh mongodb://10.129.50.235**

Pero recibimos un error de versiones entre el servidor y mongosh:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/mongo.png" alt="under" oncontextmenu="return false;">
</div>

Para eso lo recomendado es ir a la página oficial de mongosh y descargar el binario `2.3.2`, compilarlo y después intentar nuevamente a conectarnos. Un cambio con respecto a las versiones nuevas es la necesidad de especificar el puerto abierto del servicio MongoDB antes de usar `mongosh`.

```bash
mongosh mongodb://10.129.50.235:27017
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/mongo2.png" alt="under" oncontextmenu="return false;">
</div>

Y debido a que no pide credenciales ya tenemos acceso a la base de datos. Podemos hacer uso del comando 'show' y 'dbs' para ver las bases de datos y vemos exactamente lo mismo que nos reportó la captura de nmap.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/mongo3.png" alt="under" oncontextmenu="return false;">
</div>

A través de un **show tables** revisando cada una de las tablas, hay una que llama particularmente la atención y es la tabla llamada _Sensitive Content_.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/mongo4.png" alt="under" oncontextmenu="return false;">
</div>

Usando la base de datos y mostrando sus colecciones con **show collections** podemos ver un dato llamado 'flag'. Así que haciendo uso de la sintaxis de MongoDB haremos:

```sql
db.flag.find().pretty()
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Mongod/mongo5.png" alt="under" oncontextmenu="return false;">
</div>

Y habremos completado la máquina Mongod.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
