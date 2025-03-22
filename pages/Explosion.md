---
title: Explosion
layout: page
permalink: /Explosion
---

<h2 class="titulo-principal">Explosion</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/explosion.webp" alt="under" oncontextmenu="return false;">
</div>

Vamos a encender la máquina, y nos da la dirección IP 10.129.54.191 y a realizar un ping para saber si la máquina está activa:
 
```bash
❯ ping -c 5 10.129.54.191
PING 10.129.54.191 (10.129.54.191) 56(84) bytes of data.
64 bytes from 10.129.54.191: icmp_seq=1 ttl=127 time=119 ms
64 bytes from 10.129.54.191: icmp_seq=2 ttl=127 time=2240 ms
64 bytes from 10.129.54.191: icmp_seq=3 ttl=127 time=1344 ms
64 bytes from 10.129.54.191: icmp_seq=4 ttl=127 time=321 ms
64 bytes from 10.129.54.191: icmp_seq=5 ttl=127 time=110 ms
--- 10.129.54.191 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4028ms
rtt min/avg/max/mdev = 109.585/826.837/2240.115/840.932 ms, pipe 3
```

Podemos ver un TTL de 127 lo que significa que estamos ante un Windows.

<h2 class="titulo-principal">Enumeración</h2>

Vamos a realizar un escaneo de puertos sigiloso y rápido utilizando la herramienta nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.54.191 -oG allPorts
```

El escaneo arroja una gran cantidad de puertos abiertos:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/nmap.png" alt="under" oncontextmenu="return false;">
</div>


Vamos a hacer uso de la herramienta **extractPorts** para copiar los puertos en la clipboard y hacer un escaneo con scripts básicos de reconocimiento:

**extractPorts**
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos una gran cantidad de puertos abiertos:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/ports.png" alt="under" oncontextmenu="return false;">
</div>

Aun necesitamos un poco mas de información ya que hay una gran cantidad de puertos abiertos, para ello haremos uso de nmap para saber la versión y servicio:

```bash
nmap -sCV -p135,139,445,3389,5985,47001,49664,49665,49666,49667,49668,49669,49670,49671 10.129.54.191 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Explotación</h2>

Podemos ver los puertos 135, 139 pero, no da mucho vector de ataque. Sin embargo, el puerto `445` nos deja ver que la máquina tiene un SMB activo. Por tanto, podemos listar los recursos compartidos a nivel de red con la herramienta `smbclient`:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/smb1.png" alt="under" oncontextmenu="return false;">
</div>

A pesar de listar los recursos compartidos a nivel de red, no encontramos nada. Así que al seguir mirando los puertos abiertos de la máquina encontramos uno muy interesante. El puerto `3389` del servicio **Remote Desktop Protocol** de MS.

> Remote Desktop Protocol es un [protocolo](https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/), o estándar técnico, para usar un ordenador de escritorio a distancia.

Para intentar explotar este servicio, podemos hacer uso de la herramienta `xfreerdp`.

```bash
sudo pacman -S freerdp
```

Esta herramienta nos permite entablar conexiones por el puerto 3389.

<h3 class="titulo-secundario">Ejemplo de prueba</h3>
```bash
xfreerdp connection.rdp /p:Pwd123! /f
xfreerdp /u:CONTOSO\JohnDoe /p:Pwd123! /v:rdp.contoso.com
xfreerdp /u:JohnDoe /p:Pwd123! /w:1366 /h:768 /v:192.168.1.100:4489
xfreerdp /u:JohnDoe /p:Pwd123! /vmconnect:C824F53E-95D2-46C6-9A18-23A5BB403532 /v:192.168.1.100
```
1. /v: Es para poner la dirección a la cual nos vamos a conectar.
2. /u: Es para el `usuario`.
3. /p: Es para la `contraseña`.
4. /cert: Para los certificados de confianza.
<br><br>

Si nos devolvemos un poco a la captura 'targeted' vemos un poco de información respecto al puerto 3389, ya que nmap ha sido capaz de enumerar un poco más de información. Y podemos destacar entre ella el nombre del Dominio 'Explosion'.

Podemos probar:

```bash
xfreerdp /v:10.129.54.191
```

Pero la conexión es rechazada por un certificado de seguridad:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/rdp.png" alt="under" oncontextmenu="return false;">
</div>

Una de las opciones que tenemos con `xfreerpd` es ignorar ese certificado usando la flag '/cert:ignore':

```bash
xfreerdp /v:10.129.54.191 /cert:ignore
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/rpd2.png" alt="under" oncontextmenu="return false;">
</div>

Aun seguimos sin poder establecer una conexión pero, ahora ya nos pide ingresar el dominio y una contraseña. Como vimos en los ejemplos de `xfreerdp` podemos usar la flag '/u:' para intentar con usuarios comunes:

- user
- admin
- administrator
<br><br>
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Explosion/rpd3.png" alt="under" oncontextmenu="return false;">
</div>

Nos abre una pestaña con la máquina Explosion y podemos ver la flag sin problemas. Hemos pwn3ed la máquina.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
