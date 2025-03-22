---
title: Preignition
layout: page
permalink: /Preignition
---

<h2 class="titulo-principal">Preignition</h2>
<div id="imgs" style="text-align: center;">
  <img src="/assets/images/Preignition/preignition.webp" alt="under" oncontextmenu="return false;">
</div>

Vamos a encender la máquina, y nos da la dirección IP 10.129.9.0.
# Enumeración

Vamos a lanzar 5 paquetes para saber si la máquina está activa:

```bash
❯ ping -c 5 10.129.9.0
PING 10.129.9.0 (10.129.9.0) 56(84) bytes of data.
64 bytes from 10.129.9.0: icmp_seq=1 ttl=63 time=111 ms
64 bytes from 10.129.9.0: icmp_seq=2 ttl=63 time=112 ms
64 bytes from 10.129.9.0: icmp_seq=3 ttl=63 time=119 ms
64 bytes from 10.129.9.0: icmp_seq=4 ttl=63 time=110 ms
64 bytes from 10.129.9.0: icmp_seq=5 ttl=63 time=110 ms
--- 10.129.9.0 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 109.508/112.468/119.315/3.516 ms
```

Vemos que tiene un TTL de 63. Por tanto, estamos frente a una máquina Linux. Vamos a continuar con la fase de enumeración usando nmap:

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.9.0 -oG allPorts
```

Es escaneo ha ido bastante rápido y como no, si el único puerto abierto es el `80`. Pero aun sabemos muy poco así que sigamos enumerando. 

![[HTB/Starting Point VIP/Tier 1/Preignition/Images/nmap.png]]

Vamos a analizar el puerto 80 con una serie de scripts básicos de reconocimiento usando nmap para identificar la versión y servicio:

```bash
nmap -sCV -p80 10.129.9.0 -oN targeted
```

![[HTB/Starting Point VIP/Tier 1/Preignition/Images/nmap2.png]]

Vemos que estamos ante una página web con nginx pero, al acceder a esta no vemos información relevante más que el servidor HTTP está funcionando.

![[web.png]]
# Explotación

Al no encontrar nada más que el servidor activo HTTP, podemos probar a enumerar un poco directorios usando la herramienta gobuster:

```bash
gobuster dir --url http://10.129.9.0 --wordlist /opt/apps/Tools/SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt
```

## Explicación

- dir: Para enumerar directorios o archivos
- dns: Utiliza DNS para enumerar subdominios
- fuzz: Se utiliza para FUZZEAR por una palabra
- help: Ver el panel de ayuda
- s3: Para enumerar contenedores s3 de Amazon AWS
- version: Muestra la versión
- vhost: Para averiguar si está aplicando Virtual Hosting (Una página por dirección IP, que es diferente a su página accedida por Dominio)

Usamos `--url` para indicar la página de la máquina y `--wordlist` para decirle el diccionario que queremos utilizar.

**Ejemplo para vhost**
```bash
gobuster vhost -u http://10.129.9.0 -w /opt/apps/Tools/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
```

Pero ninguna de estas dos formas nos revela alguna información de utilidad, ya que hemos buscado rutas comunes de servicios web tipo (/login, /uploads, /admin). Y al no tener un dominio de nada nos sirve aplicar `vhost`. Afortunadamente `gobuster` tiene un parámetro **-x** para buscar por nombres de archivos.

Podemos intentar buscar archivos comunes de la siguiente manera:

```bash
gobuster dir --url http://10.129.9.0 --wordlist /opt/apps/Tools/SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt -x .php
```

En este caso hemos filtrado por contenido .PHP:

![[dirbust.png]]

El panorama se ilumina puesto hemos encontrado una ruta llamada '/admin.php'.

![[web.png]]

Agregamos `/admin.php` a la url de la máquina 10.129.9.0/admin.php y nos encontramos con el típico panel de iniciar sesión. 

![[web2.png]]

Probamos con las típica credenciales por defecto 'admin:admin' 

![[HTB/Starting Point VIP/Tier 1/Preignition/Images/flag.png]]

Y hemos completado la máquina.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
