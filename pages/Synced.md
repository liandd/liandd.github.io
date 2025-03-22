---
title: Synced
layout: page
permalink: /Synced
---

<h2 class="titulo-principal">Synced</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Synced/synced.webp" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina Synced y nos la dirección IP 10.129.228.37, así vamos a realizar un ping para saber si la máquina está activa y ver a que sistema nos estamos enfrentando.

```bash
❯ ping -c 5 10.129.228.37
PING 10.129.228.37 (10.129.228.37) 56(84) bytes of data.
64 bytes from 10.129.228.37: icmp_seq=1 ttl=63 time=120 ms
64 bytes from 10.129.228.37: icmp_seq=2 ttl=63 time=111 ms
64 bytes from 10.129.228.37: icmp_seq=3 ttl=63 time=114 ms
64 bytes from 10.129.228.37: icmp_seq=4 ttl=63 time=110 ms
64 bytes from 10.129.228.37: icmp_seq=5 ttl=63 time=110 ms
--- 10.129.228.37 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 109.548/113.020/119.644/3.714 ms
```

Con un TTL de 63 vemos que estamos frente a una máquina Linux.
<h2 class="titulo-principal">Enumeración</h2>

Vamos a realizar un escaneo sigiloso y rápido con nmap para descubrir puertos abiertos:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.228.37 -oG allPorts
```

El escaneo fue bastante rápido ya que solo encontró un puerto abierto `873`.

<hr />
<h3 class="titulo-secundarion">¿Qué es Rsync?</h3>

Es una herramienta de línea de comandos que permite sincronizar archivos y directorios entre sistemas.

Se trabaja con **2 directorios** `origen` y `destino`

```bash
cd ~            ---> Se va al directorio raíz
mkdir original  ---> Se crea el directorio origen
mkdir duplicate ---> Se crea el directorio destino
touch original/file{1..3} --> Se crean tres archivos llamados file1, file2, file3 dentro de original
```

El siguiente comando copiará o sincronizará todos los archivos del directorio original en el directorio duplicado.

```bash
rsync original/* duplicate/
```
<hr />

Después de contextualizar un poco `RSYNC` le pasamos la captura 'allPorts' a la función extractPorts
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Synced/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Ahora que ya tenemos el puerto `873` copiado a la clipboard comenzaremos a hacer una serie de scripts básicos de reconocimiento para saber la version y servicio de RSYNC.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Synced/extractPorts1.png" alt="under" oncontextmenu="return false;">
</div>

La captura nos arroja un _Protocol version 31_ pero, no hay nada relacionado a vulnerabilidades.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Synced/nmap.png" alt="under" oncontextmenu="return false;">
</div>

**Como nota adicional**
> El puerto TCP 873 usa el Protocolo de Control de Transmisión. TCP es uno de los protocolos principales en redes TCP/IP. TCP es un protocolo orientado en la conexión, _necesita el apretón de manos para determinar comunicaciones de principio a fin (Ejemplo)_. Solo cuando la conexión es determinada, los datos del usuario pueden ser mandados de modo bidireccional por la conexión.
> ¡Atención! TCP puerto 873 garantiza la entrega de paquetes de datos en la misma orden, en que fueron mandados.

<h2 class="titulo-principal">Explotación</h2>

Por defecto en las distribuciones Linux ya hay un binario instalado llamado `rsync` con el cual podemos intentar acceder a este protocolo para entablar una conexión. Haremos uso del comando y agregamos **--list-only** para listar recursos.

```bash
rsync --list-only 10.129.228.37
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Synced/rsync.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un recurso anónimo compartido llamado `public`, podemos listar agregando al final del comando 'rsync 10.129.228.37::public' y encontramos la flag, así que para verla la actualizamos desde la máquina a un archivo nuevo en nuestro host con el mismo nombre.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Synced/flag.png" alt="under" oncontextmenu="return false;">
</div>

Y hemos terminado la máquina Synced.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
