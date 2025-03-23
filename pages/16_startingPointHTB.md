---
title: Starting Point - un HTB WriteUp
layout: page
permalink: /startingPointHTB
---

<h2 id="subtitulo-importante">Starting Point - un HTB WriteUp</h2>

Todas las writeups del starting point como módulos introductorios a <a href="https://app.hackthebox.com/starting-point">HackTheBox</a>. Pasando por Tier1, Tier2, Tier3.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/basics.png" alt="under" oncontextmenu="return false;">
</div>


<h2 id="subtitulo-importante">Índice</h2>

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
<h2 id="subtitulo-importante">Tier 1</h2>

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/tier1.png" alt="under" oncontextmenu="return false;">
</div>

<h2 id="meow"><h1 class="titulo-principal">Meow</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/meow.png" alt="under" oncontextmenu="return false;">
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
      <td><img src="/assets/images/StartingPoint/meow/vpn1.png" alt="VPN 1" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
      <td><img src="/assets/images/StartingPoint/meow/vpn2.png" alt="VPN 2" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
    </tr>
    <tr>
      <th align="center">3</th>
      <th align="center">4</th>
    </tr>
    <tr>
      <td><img src="/assets/images/StartingPoint/meow/vpn3.png" alt="VPN 3" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
      <td><img src="/assets/images/StartingPoint/meow/vpn4.png" alt="VPN 4" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
    </tr>
  </tbody>
</table>
<br>


Comenzamos agregando el target de la máquina en nuestra polybar con la utilidad elaborada por <a href="http://liandd.github.io/vpnScript.html">unkn0wn1122</a>:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/vpnscript.png" alt="under" oncontextmenu="return false;">
</div>

Una vez conectados a la VPN, procederemos a encender la máquina:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/spawn.png" alt="under" oncontextmenu="return false;">
</div>

Nos dara también la dirección IP de la máquina -> (10.129.85.116) y ya podremos comenzar:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/meow_ip.png" alt="under" oncontextmenu="return false;">
</div>

Ahora gracias a un script previamente definido en la .zshrc podemos también agregar a la polybar la dirección IP de la maáquina Meow.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/ips.png" alt="under" oncontextmenu="return false;">
</div>

Entonces tenemos 3 direcciones IP:

1. 10.129.85.116 de la máquina Meow
2. 10.10.16.84 de la VPN de HackTheBox -> Interfaz tun0
3. 192.168.0.11 nuestra propia dirección IP (Privada) -> Interfaz enp3s0
<br><br>

Como alternativa para saber donde encontrar estas direcciones podemos hacer uso del comando `ifconfig`:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/ifconfig.png" alt="under" oncontextmenu="return false;">
</div>
Ahora que ya hemos configurado nuestra máquina y hemos encendido Meow, podremos comenzar con la resolución de la misma.

<h2 class="titulo-principal">Enumeración</h2>

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

<h3 class="titulo-secundario">Explicación</h3>

- -p-: Escanea todo el rango de puertos (1-65535)
- --open: Muestra solo los puertos que están abiertos, ignorando cerrados y filtrados.
- -sS: Escaneo SYN (Sigiloso y rápido) no establece una conexión completa.
- --min-rate 5000: Envía al menos 5000 paquetes por segundo, acelerando el escaneo.
- -vvv: Triple verbose o modo muy detallado, muestra información a tiempo real mientras se ejecuta el escaneo.
- -n: No resuelve nombres de dominio por tanto, no aplica resolución DNS.
- -Pn: No hace ping, asume que el host está activo aunque no responde ICMP.
<br><br>

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/nmap.png" alt="under" oncontextmenu="return false;">
</div>
Aunque, el escaneo está perfecto y nos da la información que estamos buscando sobre puertos abiertos, podemos hacer un retoque estético.
Para esto podemos exportar la captura nmap en un formato 'grep' para aplicar expresiones regulares y obtener lo más relevante en pantalla. Lo haremos agregando al final *-oG target*.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/nmap2.png" alt="under" oncontextmenu="return false;">
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
  <img src="/assets/images/StartingPoint/meow/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>
Veremos como lo más importante es la dirección IP de la máquina Meow y su puerto abierto, en este caso 23.

Si queremos tener un poco más de información descriptiva sobre el servicio que se esta ejecutando en el puerto podemos ejecutar:
```bash
nmap -sCV -p23 10.129.85.116 -oN targeted
```

Estaremos escaneando la versión y servicio para el puerto 23 en la IP de la máquina Meow, y la estaremos exportando en formato 'nmap'/texto_plano en `targeted`.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/nmap3.png" alt="under" oncontextmenu="return false;">
</div>
 Y vemos que se está ejecutando un `telnet` y la máquina es Linux.

<h2 class="titulo-principal">Explotación</h2>

Telnet es un servicio orientado a conexiones remotas, y su mayor vulnerabilidad es establecer conexiones con credenciales por defecto.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/telnet.png" alt="under" oncontextmenu="return false;">
</div>
Una credencial muy utilizada es **root** y sin contraseña:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/telnet2.png" alt="under" oncontextmenu="return false;">
</div>
Ahora como nos hemos conectado a través de telnet con credenciales de `root` tenemos control total, solo queda buscar la flag para completar la máquina al 100%.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow/pwn.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<h2 id="fawn"><h2 class="titulo-principal">Fawn</h2></h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/fawn/fawn.png" alt="under" oncontextmenu="return false;">
</div>

Siempre es importante hacer uso de la utilidad `ifconfig` para saber nuestras direcciones IP (de la VPN, local, y de la máquina).

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/fawn/interfaces.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Enumeración</h2>

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

<h3 class="titulo-secundario">Explicación</h3>

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
  <img src="/assets/images/StartingPoint/fawn/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver que el puerto 21 está abierto y es FTP, especial atención a su posible versión ya que podría ser vulnerable. Para hacerlo podemos ejecutar:

```bash
nmap -sCV -p21 10.129.221.222 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/fawn/nmap.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Explotación</h2>

Una vez exportada la captura vemos una información mucho más detallada, nos encontramos con **FTP vsftpd 3.0.3** y inmediatamente nmap nos reporta que el usuario `anonymous` puede iniciar sesión en FTP sin contraseña. Por tanto, FPT no está sanitizado. También vemos que nmap nos reporta un archivo con capacidades de lectura para dueño, grupo, y otros. Donde por 'otros' seriamos nosotros con el usuario anonymous, así que podremos leer ese archivo `flag.txt` si nos conectamos a FTP.

Probamos conexión por FPT a la 10.129.221.222
```bash
ftp 10.129.221.222
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/fawn/ftp.png" alt="under" oncontextmenu="return false;">
</div>

Nos pide credenciales y probamos con _"anonymous y sin contraseña"_. Con `ls` y `get` podremos acceder a la flag y tendremos completada la máquina.

<h2 class="titulo-principal">Scripting con Python3 y C++</h2>

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
<h2 id="dancing"><h2 class="titulo-principal">Dancing</h2></h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/dancing/dancing.png" alt="under" oncontextmenu="return false;">
</div>

Ya sabes como empezar, primero encendiendo la máquina, ubicando nuestras respectivas direcciones IP, creando un directorio con el nombre de la máquina **Dancing** y podremos comenzar.

<h2 class="titulo-principal">Enumeración</h2>

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
  <img src="/assets/images/StartingPoint/dancing/nmap.png" alt="under" oncontextmenu="return false;">
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
  <img src="/assets/images/StartingPoint/dancing/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Ahora vemos lo más importante como la dirección IP y los puertos abiertos `135, 139, 445, 5985, 47001, 49664, 49665, 49666, 49667, 49668, 49669`.
Vamos a prestar especial atención a estos puertos, ya que pueden tener versiones o servicios expuestos vulnerables. Para ello ejecutamos:

```bash
nmap -sCV -p135,139,445,5985,47001,49664,49665,49666,49667,49668,49669 10.129.174.184 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/dancing/nmap2.png" alt="under" oncontextmenu="return false;">
</div>


Tratando de enumerar un poco con la herramienta `whatweb` para conocer el servicio web que estamos viendo por el puerto **5985** nos encontramos un servicio HTTPserver pero, poco mas.

```bash
❯ whatweb 10.129.203.2:5985
http://10.129.203.2:5985 [404 Not Found] Country[RESERVED][ZZ], HTTPServer[Microsoft-HTTPAPI/2.0], IP[10.129.203.2], Microsoft-HTTPAPI[2.0], Title[Not Found]
```

<h2 class="titulo-principal">Explotación</h2>

Especial atención a el puerto `445` ya que ese puerto en especial pertenece al servicio `Server Message Block`. SMB se usa para el acceso a redes MS por TCP/IP. Podemos hacer uso de la herramienta `smbclient` que nos permite listar directorios compartidos a nivel de red.

> **smbclient** es una herramienta que permite acceder a los recursos compartidos de un servidor SMB, de forma similar a un cliente FTP de línea de comandos.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/dancing/smbclient.png" alt="under" oncontextmenu="return false;">
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
  <img src="/assets/images/StartingPoint/dancing/smbclient2.png" alt="under" oncontextmenu="return false;">
</div>

Y obtenemos acceso con 'WorkShares', y podemos hacer uso de algunos comandos familiares como `ls, dir, cd, get`.

Y encontramos un directorio 'James.P' donde encontramos la `flag` y hemos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/dancing/flag.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<h2 id="redeemer"><h2 class="titulo-principal">Redeemer</h2></h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/redeemer/redeemer.webp" alt="under" oncontextmenu="return false;">
</div>

Estamos frente a la ultima máquina del Starting Point del Tier1. Así como hemos hecho con las anteriores máquinas es importante ir aplicando la metodología. (Encender la máquina, verificar nuestras direcciones IP, crear el directorio con el nombre de la máquina, y los subdirectorios de trabajo, ya conocer la utilidad `ifconfig` y organizar todo antes de la fase de enumeración). 
<h2 class="titulo-principal">Enumeración</h2>

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
  <img src="/assets/images/StartingPoint/redeemer/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Al ser un único puerto, aun necesitamos un poco mas de información respecto a ese puerto, para ello haremos uso de nmap con una serie de scripts básicos de reconocimiento:

```bash
nmap -sCV -p6379 10.129.191.232 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/redeemer/nmap2.png" alt="under" oncontextmenu="return false;">
</div>
<h2 class="titulo-principal">Explotación</h2>

Podemos ver que el puerto 6379  pertenece a un servicio **REDIS** con una versión `5.0.7`. A pesar de buscar en la web sobre está versión y encontrar algunas CVE, ninguna tiene relación a la explotación.

> **REDIS** es una base de datos de Key y Value. Usa pares de datos para guardar la información lo que las hace muy eficientes y similares a los diccionarios. En lugar de crear tablas y relaciones hace pares de datos.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/redeemer/redis.png" alt="under" oncontextmenu="return false;">
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
  <img src="/assets/images/StartingPoint/redeemer/redis3.png" alt="under" oncontextmenu="return false;">
</div>

Podemos usar `select 0` para seleccionar esa base de datos **db0**, y para ver las llaves podemos usars `keys *`. Y con `get` nos traemos la llave **flag**.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/redeemer/redis4.png" alt="under" oncontextmenu="return false;">
</div>

Y así hemos <a><strong><em>pw3nd</em></strong></a> la máquina y completado el Tier1 del Starting Point.
<hr />
<h2 id="subtitulo-importante">Tier 2</h2>

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/tier2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 id="appointment"><h1 class="titulo-principal">Appointment</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/appointment.png" alt="under" oncontextmenu="return false;">
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
<h2 class="titulo-principal">Enumeración</h2>

Para hacer un escaneo rápido y sigiloso usamos nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.84.205 -oG allPorts
```

Abrimos la captura de nmap de todos los puertos abiertos y vemos únicamente el puerto `80`.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Para no tener tanto ruido de la captura, con la herramienta **extractPorts** se nos parsea la información más relevante por consola:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Lanzamos una serie de scripts básicos de reconocimiento para identificar la versión y servicio de ese puerto 80 de la siguiente manera con nmap:

```bash
nmap -sCV -p80 10.129.84.205 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

La captura revela un servicio HTTP Apache y Login pero, poco más. Haciendo uso de la herramienta `whatweb` podemos tratar de enumerar un poco sobre el servicio HTTP y efectivamente vemos un Login.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Explotación</h2>

Con ayuda de nmap podemos lanzar un script programado en Lua, para identificar rutas comunes almacenadas en un diccionario de 1060-1080 entradas posibles para enumerar posibles rutas:

```bash
nmap --script http-enum 10.129.84.205 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/webScan.png" alt="under" oncontextmenu="return false;">
</div>

A pesar de encontrar estos directorios, no son útiles y no vemos nada más allá de lo habitual, así que ingresamos a la web:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/appointment/login.png" alt="under" oncontextmenu="return false;">
</div>

Efectivamente estamos viendo que se emplea un Login, probamos con credenciales por defecto 'admin:admin. admin:password. root:root' pero no logramos nada. Otra forma alternativa si no es por credenciales por defecto es que puede estar aplicando una Base de Datos MySQL y debamos hacer una SQL Injection.

----
<h3 class="titulo-secundario">¿Qué es una SQL Injection?</h3>

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
  <img src="/assets/images/StartingPoint/appointment/flagd.png" alt="under" oncontextmenu="return false;">
</div>

<hr />
<h2 id="sequel"><h1 class="titulo-principal">Sequel</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/sequel.png" alt="under" oncontextmenu="return false;">
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
<h2 class="titulo-principal">Enumeración</h2>

Para la fase de enumeración vamos a lanzar un escaneo rápido y sigiloso con nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.133.7 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Vemos como puerto abierto `3306` un MySQL, y limpiando un poco el ruido de la captura parsearemos la información de la captura con **extractPorts**:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Vamos a realizar un escaneo con una serie de scripts básicos de reconocimiento para identificar la versión y servicio del puerto MySQL.

```bash
nmap -sCV -p3306 10.129.133.7 -oG targeted
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Explotación</h2>

Para poder explotar este puerto podemos probar a loguearnos con credenciales por defecto al servicio MySQL usando mariadb.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/maria.png" alt="under" oncontextmenu="return false;">
</div>

Para solucionar este error de SSL ya que es una version algo desactualizada de SQL agregamos la flag '--ssl=OFF'. Y para las credenciales usamos la flag '-u root'.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/maria2.png" alt="under" oncontextmenu="return false;">
</div>

Nos acepta la conexión y por tanto ya podemos intentar a ejecutar comandos SQL.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/maria3.png" alt="under" oncontextmenu="return false;">
</div>

Vemos unas bases de datos y todo normal pero, una de ellas llama poderosamente la atención y es la 'htb'. Así que usamos con:
```
show databases;
use htb;
show tables;
select * from users;
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/maria4.png" alt="under" oncontextmenu="return false;">
</div>

Vemos usuarios y correos, pero aun no vemos la flag, así que revisamos la tabla 'config':

```
select * from config;
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/sequel/flag.png" alt="under" oncontextmenu="return false;">
</div>

Y hemos completado la máquina.

<hr />
<h2 id="crocodile"><h1 class="titulo-principal">Cocodrile</h1></h2>

<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/crocodile.png" alt="under" oncontextmenu="return false;">
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
<h2 class="titulo-principal">Enumeración</h2>

Para comenzar con la fase de enumeración vamos a realizar un escaneo rápido y sigiloso usando nmap para identificar puertos abiertos:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.1.15 -oG allPorts
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/nmap.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos de la captura una serie de puertos abiertos tal que `21, 80`. Vamos a eliminar el ruido con la herramienta **extractPorts**:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Lo siguiente será hacer un escaneo usando nmap y una serie de scripts básicos de reconocimiento:

```bash
nmap -sCV -p21,80 10.129.1.15 -oN targeted
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="titulo-principal">Explotación</h2>

Vemos que la máquina tiene puerto 21 FTP `3.0.3` que es vulnerable a **Anonymous Login**. Antes de revisar el servicio FTP vamos a realizar un análisis web a la 10.129.1.15:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

No vemos nada, así que haremos un escaneo con nmap usando un script programado en Lua, para identificar rutas comunes de servicios web con:

```bash
nmap --script hhtp-enum 10.129.1.15 -oN webScan
```

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/webScan.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos algo muy interesante en la captura de nmap una ruta llamada `login.php`, pero por ahora entablaremos una conexión con el FTP usando como credenciales "anonymous:" y sin contraseña:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/ftp.png" alt="under" oncontextmenu="return false;">
</div>

Listamos el contenido del servicio FTP:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/ftp2.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos 2 archivos llamados 'allowed.userlist' y 'allowed.userlist.passwd' que es información sensible no sanitizada. Las descargamos a nuestra máquina con el comando `get`.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/ftp3.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos posibles usuarios y credenciales, aun así ahora no podemos hacer nada. Abrimos la página web y vemos lo siguiente.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/web.png" alt="under" oncontextmenu="return false;">
</div>

Aun así no encontramos nada importante en la pagina, iremos la dirección que encontramos previamente 'http://10.129.1.15/login.php' y encontramos un panel de Login, probamos con credenciales por defecto 'admin:admin' 'root:root' 'admin:password' 'guest:guest' y no conseguimos nada. Probamos una inyección SQL 'admin'#:pruebatest1234' y sin resultados:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/web2.png" alt="under" oncontextmenu="return false;">
</div>


Probamos con las credenciales que obtuvimos previamente desde el servicio FTP:

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/cocodrile/flag.png" alt="under" oncontextmenu="return false;">
</div>

Hemos completado la máquina.


---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
