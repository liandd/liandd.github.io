---
title: Late
layout: page
permalink: /HTB_Late
---

<h2 class="amarillo">Late</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Late/late.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la máquina Late y nos da la dirección ip 10.129.227.134 y le enviamos 5 trazas ICMP para validar que la máquina esta encendida.

```bash
➜ ping -c 5 10.129.227.134
PING 10.129.227.134 (10.129.227.134) 56(84) bytes of data.
64 bytes from 10.129.227.134: icmp_seq=1 ttl=63 time=101 ms
64 bytes from 10.129.227.134: icmp_seq=2 ttl=63 time=112 ms
64 bytes from 10.129.227.134: icmp_seq=3 ttl=63 time=85.8 ms
64 bytes from 10.129.227.134: icmp_seq=4 ttl=63 time=95.1 ms
64 bytes from 10.129.227.134: icmp_seq=5 ttl=63 time=88.2 ms

--- 10.129.227.134 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4007ms
rtt min/avg/max/mdev = 85.838/96.406/111.681/9.355 ms
```

Vemos que nos responde con un TTL de 63, así que estamos frente a una máquina linux.
<h2 class="amarillo">Enumeración</h2>

Para la enumeración vamos a lanzar con nmap `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.227.134`

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/1.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos como solo los puertos 22 y 80 están abiertos. Así que hacemos un escaneo exhaustivo para identificar la versión y servicio que corren para cada uno de estos puertos con los parámetros `-sCV`
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/2.png" alt="under" oncontextmenu="return false;">
</div>

Accedemos a la web para saber a que nos estamos enfrentando.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/3.png" alt="under" oncontextmenu="return false;">
</div>

No vemos nada en la web, así que hacemos una enumeración del sitio con la herramienta whatweb para saber las tecnologías que están siendo empleadas.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/4.png" alt="under" oncontextmenu="return false;">
</div>

No vemos nada raro en las tecnologías empleadas, así que pasamos a revisar el código fuente de la pagina y encontramos un subdominio llamado **images.late.htb**.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/5.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">FUZZING</h2>

Probamos a hacer fuzzing en caso de encontrarse mas subdominos en la web.

```bash
wfuzz -c -t 200 --hc=404 --hh=9461 -w /usr/share/SecLists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.late.htb" 10.129.227.134
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/7.png" alt="under" oncontextmenu="return false;">
</div>


Pero solo encontramos el subdominio **images**, probamos también fuzzing a la web anterior.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/8.png" alt="under" oncontextmenu="return false;">
</div>


Y encontramos un endpoint llamado **scanner** con un 500 server error, revisando entonces este subdominio una vez agregado al archivo /etc/hosts vemos que podemos convertir imágenes a texto con Flask.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/6.png" alt="under" oncontextmenu="return false;">
</div>


Ahora hace mas sentido haber encontrado el endpoint scanner.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/10.png" alt="under" oncontextmenu="return false;">
</div>


<h2 class="amarillo">Exiftool metadata injection (Failed)</h2>
A pesar de tener Flask la web, intentar ejecutar código de otra extensión se hace a propósito para generar mensajes de error, dentro de los meta-datos se puede subir instrucciones en los archivos de imágenes para lograr RCE.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/11.png" alt="under" oncontextmenu="return false;">
</div>

Al momento de enviar la imagen con BurpSuite vemos una ruta y usuario el cual esta haciendo la conversión de imagen a texto.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/12.png" alt="under" oncontextmenu="return false;">
</div>


<h2 class="amarillo">SSTI Server Side Template Injection</h2>
Probamos a subir una imagen con el texto para ejecutar comandos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/23.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que se ha ejecutado el primer comando al igual que el segundo.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/13.png" alt="under" oncontextmenu="return false;">
</div>


Por alguna razón, la utilidad Flameshot al crear imágenes a partir de capturas de pantalla no funcionaba, la solución fue utilizar la utilizar scrot -s para tomar capturas, de esta forma logramos que el SSTI se aconteciera con éxito.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/14.png" alt="under" oncontextmenu="return false;">
</div>

Ahora procedemos a leer la id_rsa el usuario svc_acc.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/15.png" alt="under" oncontextmenu="return false;">
</div>


Nos conectaremos con ssh y habremos conseguido la flag del usuario.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/16.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Escalada</h2>
Tras una enumeración exhaustiva del sistema y no encontrar nada, el ultimo recurso fue buscar por algún binario extraño en bash.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/17.png" alt="under" oncontextmenu="return false;">
</div>

Encontrando así un /usr/local/sbin/ssh-alert.sh, el cual al revisarse con detenimiento se encuentra creando una sesión ssh como root.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/18.png" alt="under" oncontextmenu="return false;">
</div>

Viendo los procesos del sistema vemos un /bin/bash /usr/local/sbin/ssh-alert.sh siendo ejecutado.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/19.png" alt="under" oncontextmenu="return false;">
</div>

pero revisando los permisos del archivo vemos que tenemos lectura y ejecución y el privilegio especial de lsattr a, significa esto que podemos hacer uso de ">>" para realizar "append" y agregar lo que queramos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/20.png" alt="under" oncontextmenu="return false;">
</div>

De esta forma, si podemos modificar su contenido y el uid que ejecuta el script es 0, agregamos entonces con "append" un chmod u+s /bin/bash.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/21.png" alt="under" oncontextmenu="return false;">
</div>

De esta forma, si vemos los procesos al conectarnos por ssh se ejecutar el script, abrimos otra terminal y nos volvemos a conectar como el usuario de bajos privilegios pero ya se abrá aplicado el privilegio SUID a la bash.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/22.png" alt="under" oncontextmenu="return false;">
</div>

Haciéndonos root del sistema.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Late/pwn.png" alt="under" oncontextmenu="return false;">
</div>
