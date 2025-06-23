---
title: Funnel
layout: page
permalink: /HTB_Funnel
---

<h2 class="amarillo">Funnel</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/funnel.png" alt="under" oncontextmenu="return false;">
</div>
Comenzamos encendiendo la máquina y nos da una dirección IP 10.129.204.40, le enviamos un ping para saber si está encendida.

```bash
❯ ping -c 5 10.129.204.40
PING 10.129.204.40 (10.129.204.40) 56(84) bytes of data.
64 bytes from 10.129.204.40: icmp_seq=1 ttl=63 time=123 ms
64 bytes from 10.129.204.40: icmp_seq=2 ttl=63 time=121 ms
64 bytes from 10.129.204.40: icmp_seq=3 ttl=63 time=122 ms
64 bytes from 10.129.204.40: icmp_seq=4 ttl=63 time=123 ms
64 bytes from 10.129.204.40: icmp_seq=5 ttl=63 time=125 ms
--- 10.129.204.40 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 121.385/122.979/124.854/1.199 ms
```

Por el TTL 63 sabemos que estamos frente a una máquina Linux.

<h2 class="amarillo">Enumeración</h2>

Para la fase de enumeración de puertos abiertos vamos a usar nmap y exportar la captura en formato `-oG`:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.204.40 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/nmap.png" alt="under" oncontextmenu="return false;">
</div>


Eliminamos el ruido de la captura de nmap con la herramienta **extractPorts**:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>


Pasamos a hacer un escaneo exhaustivo para identificar versión y servicio de los puertos abiertos con nmap:

```bash
nmap -sCV -p21,22 10.129.204.40 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>
Y vemos que hay un puerto 21 con FTP `3.0.3` el cual podemos probar con el usuario `anonymous` para loguearnos.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/ftp.png" alt="under" oncontextmenu="return false;">
</div>


Después de loguearnos encontramos un directorio llamado 'mail_backup', entramos y vemos 2 archivos interesantes:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/ftp2.png" alt="under" oncontextmenu="return false;">
</div>


Con el comando **get** podemos descargar estos 2 archivos a nuestra máquina y ver su contenido:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/file1.png" alt="under" oncontextmenu="return false;">
</div>


El archivo `welcome` nos revela unos usuarios potenciales para explotar como credenciales, y se le pide a estos usuarios cambiar la contraseña lo más pronto posible:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/file2.png" alt="under" oncontextmenu="return false;">
</div>

Al abrir el archivo `password_policy` encontramos que la contraseña por defecto es **funnel123#!#**, recordando que tenemos usuarios potenciales y el puerto `22` abierto, podemos probar a entablar una conexión por SSH.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/ssh.png" alt="under" oncontextmenu="return false;">
</div>


Y logramos entrar como el usuario 'christine', ahora dentro de la máquina no encontramos archivos importantes. Por tanto, mediante una breve enumeración de puertos locales encontramos un servicio PostgreSQL ejecutándose localmente:

> El comando ss viene de Socket Statistics y es utilizado para averiguar los puertos usados localmente en una máquina.

```
-l: Muestra unicamente los sockets en escucha.
-t: Muestra TCP sockets.
-n: Para no resolver el nombre del servicio
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/ssh2.png" alt="under" oncontextmenu="return false;">
</div>


Si filtramos en el archivo '/etc/passwd' encontramos que hay 2 usuarios con una bash "root:christine".
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/intrusion.png" alt="under" oncontextmenu="return false;">
</div>


Conociendo entonces el puerto y el servicio que se ejecuta localmente en la máquina podemos probar a hacer un Local Port Forwarding.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/psql.png" alt="under" oncontextmenu="return false;">
</div>


---
<h3 class="verde">¿Qué es Local Port Forwarding?</h3>

El **Local Port Forwarding** (Reenvío de puerto local) es una técnica de SSH que te permite acceder a servicios que están **en otra máquina** (servidor remoto), **como si estuvieran en tu propia máquina**.

Esto se logra redirigiendo el tráfico de un puerto local a un puerto de un servidor remoto a través de una conexión segura SSH.

```bash
ssh -L 1234:localhost:22 user@remote.example.com
```

Cuando ejecute este comando, el cliente SSH establecerá una conexión segura con el servidor SSH remoto,
y escuchará las conexiones entrantes en el puerto local 1234 . Cuando un cliente se conecta al puerto local,
el cliente SSH reenviará la conexión al servidor remoto en el puerto 22 . Esto permite al cliente local
acceder a los servicios del servidor remoto como si se estuvieran ejecutando en la máquina local.
En el escenario al que nos enfrentamos actualmente, queremos reenviar el tráfico de cualquier puerto local dado, por ejemplo
1234 , al puerto en el que PostgreSQL está escuchando, es decir 5432 , en el servidor remoto. Por lo tanto
especificamos el puerto 1234 a la izquierda de localhost , y 5432 a la derecha, indicando el puerto de destino.

```bash
ssh -L 1234:localhost:5432 christine@10.129.204.40
```

---

Una vez hecho el Local Port Forwarding podemos probar con el cliente de terminal PSQL

```bash
psql -U christine -h localhost -p 1234
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/intrusion2.png" alt="under" oncontextmenu="return false;">
</div>


Dentro de la base de datos podemos listar contenido con `\l` o `\list`:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/intrusion3.png" alt="under" oncontextmenu="return false;">
</div>


Vemos una base de datos interesante llamada `secrets`, utilizamos el comando `\c o connect` y secrets.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/intrusion4.png" alt="under" oncontextmenu="return false;">
</div>


Para ver el contenido de secrets debemos dumpear la base de datos con `\dt` y vemos la flag, aplicando una query sencilla con select la obtendremos:

```sql
select * from flag;
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/flag.png" alt="under" oncontextmenu="return false;">
</div>


Y habremos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Funnel/pwn.png" alt="under" oncontextmenu="return false;">
</div>
---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
