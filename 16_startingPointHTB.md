---
title: Starting Point - un HTB WriteUp
layout: page
permalink: /startingPointHTB
---

<h2 id="subtitulo-importante">Starting Point - un HTB WriteUp</h2>

Todas las writeups del starting point como módulos introductorios a <a href="https://app.hackthebox.com/starting-point">HackTheBox</a>. Pasando por Tier1, Tier2, Tier3.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/basics.png" alt="under" oncontextmenu="return false;">
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
  <img src="/assets/images/StartingPoint/meow.png" alt="under" oncontextmenu="return false;">
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
      <td><img src="/assets/images/StartingPoint/vpn1.png" alt="VPN 1" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
      <td><img src="/assets/images/StartingPoint/vpn2.png" alt="VPN 2" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
    </tr>
    <tr>
      <th align="center">3</th>
      <th align="center">4</th>
    </tr>
    <tr>
      <td><img src="/assets/images/StartingPoint/vpn3.png" alt="VPN 3" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
      <td><img src="/assets/images/StartingPoint/vpn4.png" alt="VPN 4" oncontextmenu="return false;" style="width: 100%; height: auto;"></td>
    </tr>
  </tbody>
</table>
<br>


Comenzamos agregando el target de la máquina en nuestra polybar con la utilidad elaborada por unkn0wn1122:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/vpnscript.png" alt="under" oncontextmenu="return false;">
</div>

Una vez conectados a la VPN, procederemos a encender la máquina:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/spawn.png" alt="under" oncontextmenu="return false;">
</div>

Nos dara también la dirección IP de la máquina -> (10.129.85.116) y ya podremos comenzar:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/meow_ip.png" alt="under" oncontextmenu="return false;">
</div>

Ahora gracias a un script previamente definido en la .zshrc podemos también agregar a la polybar la dirección IP de la maáquina Meow.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/ips.png" alt="under" oncontextmenu="return false;">
</div>

Entonces tenemos 3 direcciones IP:

1. 10.129.85.116 de la máquina Meow
2. 10.10.16.84 de la VPN de HackTheBox -> Interfaz tun0
3. 192.168.0.11 nuestra propia dirección IP (Privada) -> Interfaz enp3s0
<br><br>

Como alternativa para saber donde encontrar estas direcciones podemos hacer uso del comando `ifconfig`:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/ifconfig.png" alt="under" oncontextmenu="return false;">
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
  <img src="/assets/images/StartingPoint/nmap.png" alt="under" oncontextmenu="return false;">
</div>
Aunque, el escaneo esta perfecto y nos da la información que estamos buscando sobre puertos abiertos, podemos hacer un retoque estético.
Para esto podemos exportar la captura nmap en un formato 'grep' para aplicar expresiones regulares y obtener lo más relevante en pantalla. Lo haremos agregando al final *-oG target*.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/nmap2.png" alt="under" oncontextmenu="return false;">
</div>
La diferencia es muy clara, tendremos más centrado y la información más relevante de la captura. Ahora haremos uso de la siguiente utilidad:
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
  <img src="/assets/images/StartingPoint/extractPorts.png" alt="under" oncontextmenu="return false;">
</div>
Veremos como lo más importante es la dirección IP de la máquina Meow y su puerto abierto, en este caso 23.

Si queremos tener un poco más de información descriptiva sobre el servicio que se esta ejecutando en el puerto podemos ejecutar:
```bash
nmap -sCV -p23 10.129.85.116 -oN targeted
```

Estaremos escaneando la versión y servicio para el puerto 23 en la IP de la máquina Meow, y la estaremos exportando en formato 'nmap'/texto_plano en `targeted`.

<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/nmap3.png" alt="under" oncontextmenu="return false;">
</div>
 Y vemos que se está ejecutando un `telnet` y la máquina es Linux.

<h2 class="titulo-principal">Explotación</h2>

Telnet es un servicio orientado a conexiones remotas, y su mayor vulnerabilidad es establecer conexiones con credenciales por defecto.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/telnet.png" alt="under" oncontextmenu="return false;">
</div>
Una credencial muy utilizada es **root** y sin contraseña:
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/telnet2.png" alt="under" oncontextmenu="return false;">
</div>
Ahora como nos hemos conectado a través de telnet con credenciales de `root` tenemos control total, solo queda buscar la flag para completar la máquina al 100%.
<div style="text-align: center;">
  <img src="/assets/images/StartingPoint/pwn.png" alt="under" oncontextmenu="return false;">
</div>



---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
