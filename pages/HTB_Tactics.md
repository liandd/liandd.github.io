---
title: Tactics
layout: page
permalink: /HTB_Tactics
---

<h2 class="titulo-principal">Tactics</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/tactics.png" alt="under" oncontextmenu="return false;">
</div>


Encendemos la máquina y nos da la dirección IP 10.129.96.179. Con la herramienta ping le enviamos un paquete para saber si la máquina esta activa.

```bash
❯ ping -c 5 10.129.96.179
PING 10.129.96.179 (10.129.96.179) 56(84) bytes of data.
64 bytes from 10.129.96.179: icmp_seq=1 ttl=127 time=247 ms
64 bytes from 10.129.96.179: icmp_seq=2 ttl=127 time=120 ms
64 bytes from 10.129.96.179: icmp_seq=3 ttl=127 time=121 ms
64 bytes from 10.129.96.179: icmp_seq=4 ttl=127 time=120 ms
64 bytes from 10.129.96.179: icmp_seq=5 ttl=127 time=128 ms
--- 10.129.96.179 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4004ms
rtt min/avg/max/mdev = 119.939/147.233/247.262/50.103 ms
```

Vemos que tiene un TTL de 127, estamos frente a una máquina Windows.

<h2 class="titulo-principal">Enumeración</h2>

Usando nmap haremos un escaneo rápido y sigiloso para identificar puertos abiertos:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -P 10.129.96.179
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/nmap.png" alt="under" oncontextmenu="return false;">
</div>


Vemos algunos puertos abiertos, entonces para eliminar el ruido de la captura de nmap vamos a usar la herramienta extractPorts:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>


Vamos a hacer un escaneo exhaustivo a los puertos abiertos con nmap para identificar la version y servicio de esos puertos:

```bash
nmap -sCV -p135,139,445 10.129.96.179 -oN targeted
```
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/nmap2.png" alt="under" oncontextmenu="return false;">
</div>


<h2 class="titulo-principal">Explotación</h2>

El puerto que más llama la atención es el `445` ya que hay un servicio SMB compartido a nivel de red, al cual podemos acceder usando la herramienta `smbclient`
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/smb.png" alt="under" oncontextmenu="return false;">
</div>


Pero no podemos ver ningún recurso, podemos probar agregando `-U user` donde el usuario será el defecto en Windows 'Administrator':
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/smb2.png" alt="under" oncontextmenu="return false;">
</div>


Y esta vez podemos listar los recursos, probamos a conectarnos a la unidad compartida `$C`:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/smb3.png" alt="under" oncontextmenu="return false;">
</div>



Y una vez dentro encontramos la flag en el escritorio.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/flag.png" alt="under" oncontextmenu="return false;">
</div>


Habremos completado la máquina.

<hr />
<h3 class="titulo-secundario">Bonus</h3>

Podemos usar la herramienta `impacket`, ya que podemos acceder a `ADMIN$` como recurso compartido, vamos a ejecutar un script llamado **psexec.py** para explotar esta mala configuración y tener una shell interactiva. 

<h3 class="titulo-secundario">Impacket y Psexec.py Ejecución Remota de Comandos en Windows</h3>

**Impacket** es un framework escrito en Python para trabajar con protocolos de red. Está enfocado en proporcionar acceso programático de bajo nivel a los paquetes y, para algunos protocolos (como SMB y MSRPC), la implementación completa del protocolo. En resumen, Impacket contiene docenas de herramientas increíbles para interactuar con sistemas y aplicaciones Windows, muchas de las cuales son ideales para atacar sistemas Windows y Active Directory.

<h3 class="titulo-principal">Psexec.py en Impacket</h3>

Una de las herramientas más comúnmente utilizadas de Impacket es **psexec.py**. Esta herramienta lleva su nombre de la utilidad PsExec de la suite Sysinternals de Microsoft, ya que realiza la misma función: permitirnos ejecutar un shell completamente interactivo en máquinas Windows remotas.

**PsExec** es una herramienta portátil de Microsoft que permite ejecutar procesos de manera remota utilizando las credenciales de cualquier usuario. Es algo similar a un programa de acceso remoto, pero en lugar de controlar la computadora con un ratón, los comandos se envían mediante la línea de comandos, sin necesidad de instalar software cliente de manera manual.

<h3 class="titulo-principal">Funcionamiento de Psexec en Impacket</h3>

Es importante entender cómo funciona `psexec.py` de Impacket. Este crea un servicio remoto subiendo un ejecutable con un nombre aleatorio en el recurso compartido **ADMIN$** del sistema remoto y luego lo registra como un servicio de Windows. Esto resultará en un **shell interactivo** disponible en el sistema Windows remoto a través del puerto TCP 445.

**Psexec** requiere credenciales de un usuario con privilegios de administrador local o superiores, ya que es necesario leer/escribir en el recurso compartido **ADMIN$**. Una vez que la autenticación sea exitosa, se accederá a un **shell NT AUTHORITY\SYSTEM**.

<h2 class="titulo-secundario">Descarga e Instalación de Impacket</h2>

Puedes descargar **Impacket** desde el siguiente enlace:

[Descargar Impacket](https://github.com/SecureAuthCorp/impacket)

<h2 id="subtitulo-importante">Guía de instalación:</h2>

Si no tienes instalado **pip3** (pip para Python3) o **Python3**, instálalos con los siguientes comandos:

```bash
sudo apt install python3 python3-pip
```

El script **pkexec.py** se puede encontrar en la ruta `/impacket/examples/pkexec.py`. Para ver la información de ayuda para `psexec.py`, ejecuta el siguiente comando:

```bash
psexec.py -h
```

Para clonar el repositorio e instalar Impacket, ejecuta:

```bash
git clone https://github.com/SecureAuthCorp/impacket.git
cd impacket
pip3 install .
# O también puedes usar:
sudo python3 setup.py install
```

### Sintaxis para obtener un shell interactivo

Para obtener un shell interactivo:

```python
python psexec.py usuario:contraseña@ipDelHost
```

El usuario **Administrator** no tiene contraseña (como vimos en el caso de **smbclient**), entonces el comando sería:

```
psexec.py administrator@10.10.10.131
```

Cuando solicite la contraseña presionar **Enter** (ya que no hay contraseña configurada).

Y seremos el usuario con **más altos privilegios**, es decir, el usuario **NT AUTHORITY\SYSTEM**.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/VIP/Tactics/pwn.png" alt="under" oncontextmenu="return false;">
</div>

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
