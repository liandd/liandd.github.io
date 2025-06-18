---
title: Hacking CTF 1
layout: page
permalink: /Notas_CTF_Hacking_1
---
<h2 id="subtitulo-importante">Notas prácticas - Hacking 1 para CTF</h2>

Este es el curso de introducción a Hacking para practicar en plataformas como <a href="https://app.hackthebox.com/machines"><strong><em>HackTheBox</em></strong></a>, <a href="https://www.vulnhub.com/">VulnHub</a> y <a href="https://dockerlabs.es/">DockerLabs</a>. En caso de no tener un buen nivel en Linux, es recomendable hacer el <a href=""><em>Curso de Linux 1 para Hacking</em></a>.

Este curso es preparatorio desde 0 para el <a href="https://security.ine.com/certifications/ejpt-certification/">EJPT</a>, ECPPTV2, EWPT. Hay mucha practica para este curso y hay que realizar los ejercicos para que se quede grabado los conceptos de cada clase.

Esta publicación tiene los apuntes y notas sobre el tema <b><i>Hacking</i></b> de nivel introductorio donde se presenta el siguiente temario:

<h2 id="subtitulo-importante">Índice</h2>

- [Direcciones ipv4-ipv6](#direcciones-ipv4-ipv6)
- [Direcciones MAC Nic y Oui](#direcciones-mac-nic-y-oui)
- [Protocolos Comunes UDP, TCP y el famoso Three Way HandShake](#protocolos-comunes)
- [El Modelo OSI](#modelo-osi)
- [Subnetting - ¿Cómo se interpreta una mascara de red?](#)
- [Subnetting - CIDRS y calculo total de hosts](#)
- [Subnetting - Mascaras de subred, tipos de clase e interpretación de prefijos de red](#)
- [Subnetting - Interpretación de los rangos de red que el cliente nos ofrece para auditar](#)
- [Subnetting - Redes Curiosas y Casos Particulares](#)
- [Tips de Subnetting - Calculo veloz de direccionamiento de redes](#)
- [Nmap y sus diferentes modos de uso](#)
- [Técnicas de evasión de FireWalls - MTU DATA LENGTH SOURCE PORT DECOY ETC](#)
- [Uso de Scripts y Categorias de Nmap para aplicar reconocimiento](#)
- [Nmap - Creación de Custom Scripts en Lua](#)
- [Alternativas para la enumeraciñón de puertos usando descriptores de archivo](#)
- [Descubrimiento de archivos en la red local - ARP ICMP](#)
- [Validación de un objetivo - Fijando un Target en HackerOne](#)
- [Descubrimiento de correos electronicos](#)
- [Reconocimiento de imagenes](#)
- [Enumeración de SubDominios](#)
- [Credenciales y brechas de seguridad](#)
- [Identificación de las tecnologías de una página web](#)
- [Fuzzing - Enumeración de archivos en un servidor web](#)
- [Google Dorks - Google Hacking (Los 10 Dorks más usados)](#)
- [Identificación y verificación de sistema operativo](#)
- [Docker - Introducción](#)
- [Docker - Instalación](#)
- [Docker - Definiendo la estructura básica de DockerFile](#)
- [Docker - Creación y construcción de imagenes](#)
- [Docker - Carga de instrucciones y despliegue de nuestro primer contenedor](#)
- [Docker - Comandos comunes para la gestión de contenedores](#)
- [Docker - Port Forwarding y uso de monturas](#)
- [Docker - Despligue de máquinas vulnerables con DockerCompose](#)
- [Enumeración - Servicio FTP](#)
- [Enumeración - Servicio SSH](#)
- [Enumeración - Servicio HTTP HTTPS](#)
- [Enumeración - Servicio SMB](#)
- [Enumeración - Servicio de Gestores de Contenido CMS WordPress](#)
- [Enumeración - Servicio de Gestores de Contenido CMS Joomla](#)
- [Enumeración - Servicio de Gestores de Contenido CMS Drupal](#)
- [Enumeración - Servicio de Gestores de Contenido CMS Magento](#)
- [Explotación - Introdución a explotación de vulnerabilidades](#)
- [Explotación - Reverse Shell, Bind Shells, Forward Shells](#)
- [Explotación - Tipos de Payloads STAGED NON STAGED](#)
- [Explotación - Manuales y Automatizadas](#)
- [Explotación - Enumeración del sistema](#)
- [Explotación - Introducción a BurpSuite](#)
- [OWASP TOP 10 - SQLI SQL Injection](#)
- [OWASP TOP 10 - XXS Cross Site Scripting](#)
- [OWASP TOP 10 - XML External Entity Injection](#)
- [OWASP TOP 10 - LFI Local File Inclusion](#)
- [OWASP TOP 10 - RFI Remote File Inclusion](#)
- [OWASP TOP 10 - LFI RCE Log Poisoning](#)
- [OWASP TOP 10 - CSRF Cross Site Request Forgery](#)
- [OWASP TOP 10 - SSRF Server Side Request Forgery](#)
- [OWASP TOP 10 - SSTI Server Side Template Injection](#)
- [OWASP TOP 10 - CSTI Client Side Template Injection](#)
- [OWASP TOP 10 - PaddingOracle Ataque de Oraculo de Relleno](#)
- [OWASP TOP 10 - Ataque de Type Juggling](#)
- [OWASP TOP 10 - Inyecciones NOSQL](#)
- [OWASP TOP 10 - Inyecciones LDAP](#)
- [OWASP TOP 10 - Ataques de Deserialización](#)
- [OWASP TOP 10 - Inyecciones LaTeX](#)
- [OWASP TOP 10 - Abuso de API](#)
- [OWASP TOP 10 - Abuso de Subida de Archivos](#)
- [OWASP TOP 10 - Prototype Pollution](#)
- [OWASP TOP 10 - AXFR FULL ZONE TRANSFER Ataques de transferencia de zona](#)
- [OWASP TOP 10 - MASS ASSIGMENT ATTACK PARAMETER BINDING Ataques de asignación masiva](#)
- [OWASP TOP 10 - OPEN REDIRECT](#)
- [OWASP TOP 10 - Enumeración y Explotación WebDAV](#)
- [OWASP TOP 10 - Enumeración y EXplotación SQUID_PROXIES](#)
- [OWASP TOP 10 - Ataque SHELLSHOCK](#)
- [OWASP TOP 10 - Inyecciones Xpath](#)
- [OWASP TOP 10 - IDORs INSECURE DIRECT OBJECT REFERENCE](#)
- [OWASP TOP 10 - CORs Intercambio de recursos de origen cruzado](#)
- [OWASP TOP 10 - SQL TRUNCATION Ataque de truncado SQL](#)
- [OWASP TOP 10 - SESSION PUZZLING SESSION FIXATION SESSION VARIABLE OVERLOADING](#)
- [OWASP TOP 10 - Enumeración y Explotación JWT JS WEB TOKENS](#)
- [OWASP TOP 10 - RACE CONDITION Condiciones de carrera](#)
- [OWASP TOP 10 - Inyecciones CSS](#)
- [OWASP TOP 10 - Python Ataque de deserialización YAML](#)
- [OWASP TOP 10 - Python Ataque de deserialización PICKLE](#)
- [OWASP TOP 10 - GRAPHQL INTROSPECTION MUTATIONS e IDORs](#)
- [PRIV_ESC - Abusando de privilegios a nivel de sudoers](#)
- [PRIV_ESC - Abusando de privilegios SUID](#)
- [PRIV_ESC - Detección y explotación de tareas CRON](#)
- [PRIV_ESC - PATH HIJACKING](#)
- [PRIV_ESC - Python Library Hijacking](#)
- [PRIV_ESC - Abuso de permisos incorrectamente implementados](#)
- [PRIV_ESC - Detección y explotación de CAPABILITIES](#)
- [PRIV_ESC - Explotación de KERNEL](#)
- [PRIV_ESC - Abuso de grupos, usuarios especiales](#)
- [PRIV_ESC - Abuso de servicios internos del sistema](#)
- [PRIV_ESC - Abuso de binarios especificos](#)
- [PRIV_ESC - Secuestro de biblioteca de objetos compartidos enlazados dinamicamente](#)
- [PRIV_ESC - DOCKER BREAKOUT](#)
- [BufferOverflow - Introducción](#)
- [BufferOverflow - INMUNITY DEBUGGER y creación de laboratorio de pruebas](#)
- [BufferOverflow - Fase inicial de FUZZING y tomando control del registro EIP](#)
- [BufferOverflow - Asignación del espacio para el shellcode](#)
- [BufferOverflow - Generación de ByteArrays y detección de BADCHARS](#)
- [BufferOverflow - Búsqueda de OPCODES para entrar en el ESP y cargar nuestro shellcode](#)
- [BufferOverflow - Uso de NOPS Desplazamiento de pila e interpretación del shellcode para lograr RCE](#)
- [BufferOverflow - Modificación del shellcode para controlar el comando que se desea ejecutar](#)
- [BufferOverflow - Práctica](#)
- [BufferOverflow - Funcionamiento y Creación manual de shellcodes](#)
- [Taller - Máquina 1](#)
- [Taller - Máquina 2](#)
- [Taller - Máquina 3](#)
- [Taller - Máquina 4](#)
- [Taller - Máquina 5](#)
- [BONUS - METAEXPLOIT](#)
- [BONUS - SQLMAP](#)
- [BONUS - EXAMEN ECPPTV2](#)
- [USO DE LATEX 1](#)
<br>

---

<h2 id="direcciones-ipv4-ipv6"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

Lo primero es ¿Qúe es una dirección IP?, en mi caso en la polybar tengo mi propia dirección IP:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/1.png" alt="under" oncontextmenu="return false;">
</div>

Al igual que podemos verla usando el comando `ifconfig` o `ip a`:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver 2 interfaces de red, siendo la primera `enp3s0` y la `lo`. Solo vamos a centrarnos en la enp3s0 ahí vemos que pone **inet**, es la IP privada que nos identifica a nivel de usuario.

----
<h2 class="titulo-principal"> ¿Qué es una dirección IP?</h2>

Es una etiqueta numérica que identifica de manera lógica y jerárquica a una interfaz en la red de un dispositivo que utiliza el protocolo de Internet. Y esto no son más que bits ceros y unos. Y consiste de 4 octetos (4 pares de 8 bits). Podemos ver como los dispositivos cada uno se identifica con una dirección IP.

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/3.2.png" alt="under" oncontextmenu="return false;">
</div>

Para la estructura de una dirección IPv4 tenemos 4 pares de octetos representados en base 10, **198.20.250.1**.

Para cada uno de los 4 pares sale un Byte compuesto de 8 Bits (0,1).

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/3.3.png" alt="under" oncontextmenu="return false;">
</div>

Para hacer la conversión podemos hacerlo en Bash:

```bash
❯ echo "$(echo "obase=2; 192" | bc).168.0.10"
11000000.168.0.10
❯ echo "$(echo "obase=2; 192" | bc).$(echo "obase=2; 168" | bc).0.10"
11000000.10101000.0.10
❯ echo "$(echo "obase=2; 192" | bc).$(echo "obase=2; 168" | bc).$(echo "obase=2; 0" | bc).10"
11000000.10101000.0.10
❯ echo "$(echo "obase=2; 192" | bc).$(echo "obase=2; 168" | bc).$(echo "obase=2; 0" | bc).$(echo "obase=2; 10" | bc)"
11000000.10101000.0.1010
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/3.png" alt="under" oncontextmenu="return false;">
</div>

Y esto es la propia representación de la IP en binario:

<h2 class="titulo-secundario">¿Cuántas direcciones IP se pueden representar hablando de IPv4?</h2>

El computo lo hacemos con:

```bash
echo "2^32" | bc ----> Para IPv4
4294967296

echo "2^128" | bc ---> Para IPv6
340282366920938463463374607431768211456
```

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/4.png" alt="under" oncontextmenu="return false;">
</div>

Parece que jamas vamos a llegar a semejante cantidad de direcciones por IPv6, al momento de hacer pentesting en HackTheBox para la enumeración de puertos, identificar la máquina requiere tener la noción de estos conceptos.

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/5.png" alt="under" oncontextmenu="return false;">
</div>

Todo esto igual es muy básico pero es importante tenerlo muy claro, pronto se trabajará reconocimiento de equipos a nivel de red. Como breve inciso al hacer el comando `ifconfig` en **inet** podremos ver nuestra dirección iPv6.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/6.png" alt="under" oncontextmenu="return false;">
</div>

---
<h2 id="direcciones-mac-nic-y-oui"><h2 id="subtitulo-importante">Direcciones MAC Nic y Oui</h2></h2>

Si hacemos `ifconfig` podemos ver en nuestra interfaz de red enp3s0 donde dice **ether**
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/7.png" alt="under" oncontextmenu="return false;">
</div>

Bueno pues **d8:5e:d3:89:80:8b** es nuestra dirección MAC.

> En redes de computadoras una dirección MAC es un identificador de 48 bits que corresponde de manera única a una tarjeta o dispositivo de red, también se le conoce como dirección física y es "única" ya que hay herramientas como **MACchanger** que permiten modificar esta dirección.

En cuanto a su estructura respecta podemos dividirlo en 2 grupos. Siendo el primero el OUI Organization Unique Identifier y el segundo NIC Network Interface controller especific.

<div class="bgd" style="text-align: center;">
  <img src="/assets/images/notas_hacking/11.png" alt="under" oncontextmenu="return false;">
</div>

<a href="https://macaddress.io/faq/what-is-an-organizationally-unique-identifier-oui">Visita aquí</a>

Podemos aplicar un pequeño escaneo a nivel de red local para encontrar dispositivos conectados a la red.

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/8.png" alt="under" oncontextmenu="return false;">
</div>


<a><strong>¿Cómo sabe que dispositivos encuentra en la red local?</strong></a>
<h1 class="titulo-secundario"><strong> hay una herramienta `macchanger` que puede ayudar en esta identificación:</strong></h1>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/9.png" alt="under" oncontextmenu="return false;">
</div>


Esto es gracias al OUI, podemos hacer filtros usando grep

```bash
macchanger -l | grep -i arris
```

> Siendo arris la marca de mi router podemos ver:

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/10.png" alt="under" oncontextmenu="return false;">
</div>


Hay unas cuantas direcciones OUI para el Router de hogar Arris, y podemos ver que el OUI nos ayuda a identificar a que nos estamos enfrentando y entender los ID de los dispositivos. 

En auditorias de redes inalambricas en Hacking Wifi se puede hacer mucho uso de está técnica (La tarjeta de red se coloca en modo monitor, la tarjeta de red se da de baja, se cambia la dirección MAC etc). Por ahora es importante entender las direcciones iPv4 iPv6 y MAC.

---
<h2 id="protocolos-comunes"><h2 id="subtitulo-importante">Protocolos Comunes UDP, TCP y el famoso Three Way HandShake</h2></h2>

---

<h2 id="el-modelo-osi"><h2 id="subtitulo-importante">El Modelo OSI</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---

<h2 id="subnetting"><h2 id="subtitulo-importante">Direcciones ipv4-ipv6</h2></h2>

---


