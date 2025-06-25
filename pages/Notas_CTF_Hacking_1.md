---
title: Hacking CTF 1
layout: page
permalink: /Notas_CTF_Hacking_1
---
<h2 id="whity">Notas prácticas - Hacking 1 para CTF</h2>

Este es el curso de introducción a Hacking para practicar en plataformas como <a href="https://app.hackthebox.com/machines"><strong><em>HackTheBox</em></strong></a>, <a href="https://www.vulnhub.com/">VulnHub</a> y <a href="https://dockerlabs.es/">DockerLabs</a>. En caso de no tener un buen nivel en Linux, es recomendable hacer el <a href=""><em>Curso de Linux 1 para Hacking</em></a>.

Este curso es preparatorio desde 0 para el <a href="https://security.ine.com/certifications/ejpt-certification/">EJPT</a>, ECPPTV2, EWPT. Hay mucha practica para este curso y hay que realizar los ejercicos para que se quede grabado los conceptos de cada clase.

Esta publicación tiene los apuntes y notas sobre el tema <b><i>Hacking</i></b> de nivel introductorio donde se presenta el siguiente temario:

<h2 id="whity">Índice</h2>

- [Direcciones ipv4-ipv6](#direcciones-ipv4-ipv6)
- [Direcciones MAC Nic y Oui](#direcciones-mac-nic-y-oui)
- [Protocolos Comunes UDP, TCP y el famoso Three Way HandShake](#protocolos-comunes)
- [El Modelo OSI](#modelo-osi)
- [Subnetting - ¿Cómo se interpreta una mascara de red?](#)
- [Subnetting - CIDRS y cálculo total de hosts](#)
- [Subnetting - Mascaras de subred, tipos de clase e interpretación de prefijos de red](#)
- [Subnetting - Interpretación de los rangos de red que el cliente nos ofrece para auditar](#)
- [Subnetting - Redes Curiosas y Casos Particulares](#)
- [Tips de Subnetting - Cálculo veloz de direccionamiento de redes](#)
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

<h2 id="direcciones-ipv4-ipv6"><h2 id="whity">Direcciones ipv4-ipv6</h2></h2>

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
<h2 class="amarillo"> ¿Qué es una dirección IP?</h2>

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

<h2 class="verde">¿Cuántas direcciones IP se pueden representar hablando de IPv4?</h2>

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
<h2 id="direcciones-mac-nic-y-oui"><h2 id="whity">Direcciones MAC Nic y Oui</h2></h2>

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
<h1 class="verde"><strong> hay una herramienta `macchanger` que puede ayudar en esta identificación:</strong></h1>

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
<h2 id="protocolos-comunes"><h2 id="whity">Protocolos Comunes UDP, TCP y el famoso Three Way HandShake</h2></h2>
Cuando hablamos de protocolos por lo general nos centramos en TCP, UDP, vamos a ver un poquito la  diferencia entre estos.

<h1 class="amarillo">TCP vs UDP</h1>

Comenzando con **TCP**.

> Este protocolo esta orientado a conexiones, la gran mayoría de dispositivos lo utilizan para conectarse a través internet.

Así mismo, es uno de los principales protocolos en redes **TCP/IP**, este protocolo es especial porque proporciona verificación de errores además de garantizar la entrega de datos y que los paquetes se entreguen en el orden en el que fueron enviados. 

Todo lo contrario a **UDP**.

> Es un protocolo sin conexión, a diferencia del protocolo **TCP** éste no garantiza la entrega de datos, ni verifica los errores.

El protocolo **UDP** envía continuamente datos al destinatario pero sin comprobar que este los recibe.

Normalmente, al hablar de este protocolo **TCP** se habla del **Three Way Handshake** y se suele ver al momento de entablar una conexión se suele ver algo como esto:

```
SYN -> SYN ACK -> ACK
```

Pero, <a>¿Qué es esto?</a>

Esto hay que verlo como una comunicación

> Imagina que estas con un compañero y quieres comenzar la conversación (Esto lo podríamos considerar como el **SYN**), el compañero una vez le hablamos y comienza la conversación (Sería **SYN ACK**) ACK viene de acknowledge, y por último **ACK**.

Esto puede verse en Wireshark

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/11.2.png" alt="under" oncontextmenu="return false;">
</div>

Lo ideal sería tomar para este ejemplo la interfaz loopback

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/12.png" alt="under" oncontextmenu="return false;">
</div>

Vamos a ponernos en escucha con *nc* en el puerto 4646

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/13.png" alt="under" oncontextmenu="return false;">
</div>

> Siendo ncat una herramienta que nos permite realizar conexiones de red y trabajar el envío de datos

Tratamos de entablar una conexión a nuestra dirección IP, donde con *nc* estamos en escucha en el puerto 4646:

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/14.png" alt="under" oncontextmenu="return false;">
</div>

Si nos vamos al Wireshark veremos lo siguiente:

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/15.png" alt="under" oncontextmenu="return false;">
</div>

Podremos ver en los últimos paquetes el **Three Way Handshake**, estamos viendo el SYN -> SYN ACK -> ACK. En este caso el SYN representa como intentamos conectarnos a nuestra dirección IP por el puerto 4646, donde se nos responde con el SYN ACK, y luego el ACK.

Cuando estamos en una página web, o nos conectamos a un servicio lo normal es ver este principio que opera por **TCP**.

>Recordar muy importante que un servicio puede estar operando en un puerto pero este puede ser **TCP** o **UDP**, quizás otros protocolos. Nosotros como atacantes debemos realizar escaneos para identificar estos servicios con la herramienta **NMAP** la cual veremos más adelante en profundidad.

Pasando ahora a los servicios, cabe decir que hay infinidad de servicios pero la cantidad de puertos que existen para alojar estos servicios es de 65535, estos puertos vamos a tratar de enumerarlos con la herramienta **NMAP** y demás, pero entre estos puertos hay algunos de ellos que suelen ser muy comunes a la hora de realizar estos escaneos.

<a>**TCP**</a>
```bash
21 -> FTP
22 -> SSH
23 -> TELNET (Acceder a otra máquina de manera remota)
25 -> SMTP (Correo Electronico)
53 -> DNS
80 -> HTTP
443 -> HTTPS
110 -> POP3
139, 445 -> SMB -> Recursos compartidos a nivel de red a nivel de empresa (Hace mucho daño)
143 -> IMAP
```

<h1 class="verde">UDP</h1>
```bash
53 -> DNS
69 -> TFTP
161 -> SNMP
```

Por **UDP** no es muy común encontrar tantos puertos pero los puede haber.

---

<h2 id="modelo-osi"><h2 id="whity">El Modelo OSI</h2></h2>

El proceso de enviar una solicitud a un servidor es algo similar a enviar un paquete por correo, todos los paquetes enviados desde nuestro PC pasan por unos pocos pasos para llegar al destinatario. Estos pasos es lo que se conoce como **Modelo OSI**.

>El Modelo OSI es un estándar para los protocolos de red, los protocolos no son más que reglas de comunicación que se utilizan para conectar dos o más computadores.

Justamente el **Modelo OSI** se encarga de juntar estos protocolos en grupos específicos o capas. Cuando hacemos una solicitud a un servicio web está solicitud recorre un largo camino desde nuestra máquina hasta el servidor, normalmente esto es por un cable de Ethernet o por el aire usando redes WiFi pasando por el proveedor de internet ISP hasta que llega al destino.

El servidor devuelve la respuesta por la misma ruta pero<a> **¿Cómo sabe la solicitud que camino tomar?** </a>

Tenemos siete capas y el **Modelo OSI** enumera desde la superior hasta la inferior:

<h1 class="verde">Capas del Modelo OSI</h1>

```
7 -> Aplicación
6 -> Presentación
5 -> Sesión
4 -> Transporte 
3 -> Red
2 -> Datos
1 -> Física
```

<strong>La primera capa</strong> siendo la <a>física</a> sería el camino que recorre el paquete para llegar al destino, esta capa específica los dispositivo como Hubs y los medios de transmisión como los cables de red, donde los datos se transmiten por estos medios y se procesan en la siguiente capa.

<strong>La segunda capa</strong> siendo la de <a>datos o enlace</a> actúa como inspector, digamos que observa sí el paquete tiene un defecto en su formato y controla el flujo con el que se envían los paquetes, en esta capa se verifican si los paquetes recibido del medio físico presentan algún error y tratar de corregirlos (Por tanto, las capas superiores asumen una transmisión de paquetes sin errores). Cabe destacar que está capa también controla el flujo de datos que se transmite.

<strong>La tercera capa</strong> siendo la de<a> red</a> verifica el destinatario y remitente del paquete, en caso de que hayan demasiados mensajes para enviar se puede priorizar cuales se enviaran primero (Actúa como una oficina de correos). Aquí es donde esta el direccionamiento IP source/destination.

<strong>La cuarta capa</strong> presentaría los camiones o reporteros siendo la capa de <a>transporte</a>, garantizando el envío y recepción de paquetes provenientes de la capa tres. Gestiona el transporte de los paquetes garantizando el éxito de envío de paquetes.

<strong>La quinta capa</strong> la de <a>sesión</a> es la responsable de establecer y terminar la conexión entre Hosts, también se encarga de realizar el establecimiento de sesiones (También brinda registros Logs y algunas tareas de seguridad).

<strong>La sexta capa</strong> la de <a>presentación</a> es responsable de traducir todos los datos para que los utilice la siguiente capa, desde la conversión de códigos a caracteres, comprensión de datos y cifrado de los mismos.

<strong>La última capa</strong> siendo la de<a> aplicación</a>, es donde el usuario consume correos electrónicos, transferir archivos, acceder a sitios webs, etc. Aquí encontramos algunos protocolos comunes como HTTP y HTTPs.

Esto viene bastante bien de cara a soporte para identificar errores subiendo desde la primer capa hasta la última.

---

<h2 id="subnetting"><h2 id="whity">Subnetting ¿Qué es y cómo se interpreta una mascara de red?</h2></h2>
Hemos venido hablando de las mascaras de red, podemos volver a verlo con `ifconfig`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/16.png" alt="under" oncontextmenu="return false;">
</div>

Esto que pone **255.255.255.0**, nos permite a nosotros como atacantes hacernos una idea de como está estructurada la red (Aplicar escaneos a nivel de red para saber que equipos están conectados).

La mejor forma de practicar en este caso es crear una hoja de cálculo. 

<h1 class="amarillo">¿Qué es el Subnetting?</h1>

Esto consiste en dividir una red grande, en redes más pequeñas mediante un proceso cauteloso y con planificación previa para no desaprovechar direcciones IPv4.

Vamos a representar la mascara de red **255.255.255.0** en la hoja de calculo.

> Lo que estamos viendo para la mascara de red son bits.
 <div style="text-align: center;">
  <img src="/assets/images/notas_hacking/17.png" alt="under" oncontextmenu="return false;">
</div>

1. Comenzaremos desde 128 e iremos dividiendo entre 2.
2. La segunda fila la rellenamos de '1' indicando como un True en algebra boolena.

<h1 class="amarillo">De ¿Dónde proviene el 255?</h1>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/18.png" alt="under" oncontextmenu="return false;">
</div>

La formula es:
```
=(A1*A2)+(B1*B2)+(C1*C2)+(D1*D2)+(E1*E2)+(F1*F2)+(G1*G2)+(H1*H2)
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/19.png" alt="under" oncontextmenu="return false;">
</div>

Y hemos dado con la mascara de red, ahora vamos a agregar dos columnas más (una para el CIDR que es un estándar de red para la interpretación de redes y otra para el Total Hosts).
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/20.png" alt="under" oncontextmenu="return false;">
</div>


Para el CIDR vamos a contar todas las posiciones donde haya un '1'.

```
=CONCATENATE("/"; COUNTIF(A2:AI2;1))
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/21.png" alt="under" oncontextmenu="return false;">
</div>

---

<h2 id="subnetting"><h2 id="whity">Subnetting CIDRs y cálculo total de hosts</h2></h2>
En función de la mascara de red o el prefijo de red viendo el CIDR <a><strong>¿Cuántos Hosts se pueden repartir?</strong></a>

Para esto vamos a realizar la operación:

```
2^⁽Número total de ceros⁾
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/22.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/23.png" alt="under" oncontextmenu="return false;">
</div>

Eso es porque tenemos 8 ceros:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/24.png" alt="under" oncontextmenu="return false;">
</div>

Ahora solo queda contar la cantidad de hosts:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/25.png" alt="under" oncontextmenu="return false;">
</div>

El total de host pondrá 256, esto sucede porque se cuenta desde el 0 la cantidad de direcciones ip que se pueden asignar, quizás para algunos es más fácil emplear una técnica de resta para hacer los cálculos un poco más comodos:

```
2^⁽Total de hosts⁾⁻¹
```

<h1 class="amarillo">Ejemplo real</h1>

El jefe interno de la empresa te dice:
>"Como parte del equipo de auditoría interna, se te ha encomendado una tarea prioritaria: analizar y evaluar la seguridad de un segmento de red estratégico que aloja los servidores críticos de bases de datos de la empresa. Este segmento se encuentra en la dirección **10.10.148.25/18**. Tu responsabilidad es identificar vulnerabilidades, riesgos potenciales y asegurar que los controles existentes sean adecuados para proteger la integridad y confidencialidad de la información en esta subred."

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/26.png" alt="under" oncontextmenu="return false;">
</div>

Para esto contruimos una pequeña tabla donde tendremos los 32 segmentos de red posibles para hacer más fácil el trabajo de analizar el segmento de red que nos dan.

---

<h2 id=""><h2 id="whity">Subnetting Mascaras de subred tipos de clase e interpretación de prefijos de red</h2></h2>
Viene muy bien tener la tablar para entender el segmento donde esté configurada la red.

El total de hosts va incrementendo en **x2** a medida que el número de ceros aumenta en la hoja de cálculo de bits
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/24.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/27.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/28.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/29.png" alt="under" oncontextmenu="return false;">
</div>

Cuando encontramos un /21 ya sabemos que la mascara es 255.255.248.0, para el ejemplo la respuesta es 255.255.192.0.

Tendremos que pararnos en Clase B, luego ir al CIRD /21 y nos dice que la Subnet es 255.255.x.0. La x la remplazmos por la subnet Mask 248.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/30.png" alt="under" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Ejemplo</h1>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/31.png" alt="under" oncontextmenu="return false;">
</div>

Supongamos que estamos en una auditoria y tenemos la siguiente dirección IP 192.168.1.0/26 y aquí están los dispositivos de red.

> Para llenar los campos de red utilizaremos nuestra tabla de subnet.

1. Vemos que dice /26 por tanto es una Clase C y la subnet mask tiene 192.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/32.png" alt="under" oncontextmenu="return false;">
</div>

Según nuestra tabla de subnet, el Total hosts es de 64, pero debemos realizar una resta '-2' ya que la Network ID y la Broadcast Address son direcciones reservadas, por tanto sería '64-2' para un total de 62 hosts. Siendo la cantidad de IP libres para repartir como nos guste o para auditar.

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/33.png" alt="under" oncontextmenu="return false;">
</div>
---

<h2 id=""><h2 id="whity">Subnetting Interpretación de los rangos de red que el cliente nos ofrece para auditar</h2></h2>
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/33-2.png" alt="under" oncontextmenu="return false;">
</div>

Es muy importante hacer ejemplos y practicar, llegados a este punto:

> La Broadcast Address o dirección de difusión permite enviar paquetes de datos a todos los usuarios de una red local.

Lo recomendable es llenar la tabla y empezar a jugar con direcciones ip:

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/34.png" alt="under" oncontextmenu="return false;">
</div>


El 128 se debe a que debemos de saber identificar los rangos de ip, en el caso de 192.168.112.165/25 no podemos empezar en 192.168.0.0 porque nuestra ip termina en .165, por tanto, 255/2 es aproximado a 128. Por eso empezamos desde esa ip para que la broadcast pueda ser la .255.

Para el último ejemplo de 10.10.13.124/19, se comparte la solución:

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/35.png" alt="under" oncontextmenu="return false;">
</div>


---

<h2 id=""><h2 id="whity">Subnetting Redes_curiosas_y_casos_particulares</h2></h2>

Para las redes curiosas como la 13.13.13.13/13, podemos ver que tiene una mascara 255.248.0.0. 

> Para calcular rápido podemos hacer uso de la calculadora y hacer lo siguiente:

```
256 * 256 = 65536 hosts

desde la 13.0.0.0 hasta la 13.0.255.255, antes de llegar a la 13.1.0.0 hay 65536 hosts,
desde la 13.1.0.0 hasta la 13.0.255.255 hay otros 65536 hosts.

524288/65536 = 8

de la 13.0.0.0 hasta la 13.7.255.255, pero como nuestra ip extraña es la 13.13.13.13 hay que tomar el otro rango
de la 13.8.0.0 hasta la 13.15.255.255 terminamos.

```

---

<h2 id=""><h2 id="whity">Tips de subnetting y cálculo veloz de direccionamiento en redes</h2></h2>

En este punto ya sabremos como atender a esta situación cuando un cliente nos de una dirección IP para auditar mediante el uso de CIDR y mascaras de red (Saber el total de hosts, la network ID, y la Broadcast). 

Hay una forma rápida para hacer el cálculo.

La idea es con una IP 172.14.15.16/17

> Intentar primero representar la ip en binario

```bash
echo "obase=2; 172" | bc
```

10101100.

```bash
echo "obase=2; 14" | bc
```

10101100.00001110.

```bash
echo "obase=2; 15" | bc
```

10101100.00001110.00001111.

```bash
echo "obase=2; 16"
```

10101100.00001110.00001111.00010000

1. Lo siguiente es averiguar la mascara de red y el network ID
2. Como el CIDR es /17, los primeros 17bits pertenecen a la red, y los 15 restantes a hosts

así que rellenamos con '1', los primeros 17bits

```bash
11111111.11111111.10000000.00000000
```

Ahora ya tenemos la **Mascara de RED**.

```bash
echo "ibase=2; 11111111" | bc
```

Nos devuelve un 255, por tanto ya tenemos un 255.255.x.0, para el x que nos falta sería:

```bash
echo "ibase=2; 100000000" | bc
```

3. Para averiguar el Network ID, hay que aplicar un AND entre la IP en binario y la mascara de red

> Cuando haya una coincidencia entre '1' ponemos un '1' de resto 0

```bash
10101100.00001110.00001111.00010000 (172.14.15.16)
11111111.11111111.10000000.00000000 (255.255.128.0)
------------------------------------
10101100.00001110.00000000.00000000
```

172.14.0.0 sería el network ID.

4. Para la broadcast address tenemos un /17 y es hasta /32.
```
32-17=15
```

5. Vamos a poner en '1' 15 bits de la ip 172.14.15.16 correspondientes a host:
```
10101110.00001110.01111111.11111111 -> 172.14
```

```bash
echo "ibase=2;01111111" -> 127
```

y 11111111 corresponde a 255.

> La broadcast es 172.14.127.255.


<h1 class="amarillo">Mi Script Subnetting_tool</h1>

Comparto aquí mi herramienta para automátizar el proceso de Subnetting desde Bash proporcionando la dirección IP y la NetMask.
La publicación de está herramienta <a href="https://liandd.github.io/Script_SubNet">aquí<a>.


> El proyecto se centra en el desarrollo de un script en Bash para el cálculo de parámetros de red, incluyendo la identificación de la clase de red, el cálculo del ID de red y del rango de hosts. Además, se implementa una función para obtener la representación binaria de una dirección IP y una máscara de red.

> El script de Bash consta de varias funciones clave

  **`1.`** **helpPanel**: Muestra un panel de ayuda con la descripción de los parámetros esperados.
  ```bash
 function helpPanel(){
    echo -e "\n[!] Uso: $0 -i <ipAddress> -n <netMask>\n"
    echo -e "\ti) Direccion IPv4 para subnet"
    echo -e "\tn) Mascara de red"
    echo -e "\th) Panel de ayuda"
}
  ```
  **`2.`** **calculoSubnet**: Realiza el cálculo de la clase de red, el ID de red, el rango de hosts y la representación binaria de la IP y la máscara de red.

  **`3.`** **getNetIDRange**: Calcula el rango de ID de red, tomando en cuenta la dirección IP, la máscara de red y el incremento deseado.

  **`4.`** **getHostsPerSubnet**: Determina la cantidad de hosts por subred basándose en la máscara de red proporcionada.

  **`5.`** **binaryRepresentation**: Obtiene la representación binaria de la dirección IP y la máscara de red.
<h1 class="verde">Ejemplo de Uso</h1>

```bash
./subNet.sh -i 192.168.1.1 -n 255.255.255.0
```

Este comando calculará la información de red para la dirección IP **192.168.1.1** y la máscara de red **255.255.255.0**.
```bash
#!/bin/bash
# Autor: liandd (Juan Garcia)
##Colours
greenColour="\e[0;32m"
endColour="\033[0m\e[0m"
redColour="\e[0;31m"
blueColour="\e[0;34m"
yellowColour="\e[0;33m"
purpleColour="\e[0;35m"
turquoiseColour="\e[0;36m"
grayColour="\e[0;37m"

# Ctrl_C
trap ctrl_c INT

function ctrl_c(){
    echo -e "\n\n${redColour}[!] Saliendo...${endColour}\n"
    tput cnorm && exit 1
}

function helpPanel(){
    echo -e "\n${yellowColour}[!]${endColour}${grayColour} Uso: ${endColour}${greenColour}$0${endColour} ${purpleColour}-i${endColour}${blueColour} <ipAddress>${endColour} ${purpleColour}-n${endColour} ${blueColour}<netMask>${endColour}\n"
    echo -e "\t${purpleColour}i)${endColour}${grayColour} Direccion${endColour}${blueColour} IPv4${endColour}${grayColour} para subnet${endColour}"
    echo -e "\t${purpleColour}n)${endColour}${grayColour} Mascara de red${endColour}"
    echo -e "\t${purpleColour}h)${endColour}${grayColour} Panel de ayuda${endColour}"
}

function binaryRepresentation(){
    IFS='.' read -r -a ipOctet <<< "$1"
    IFS='.' read -r -a netOctet <<< "$2"
    local ipBinary=""
    local netBinary=""
    for octet in "${ipOctet[@]}"; do
        binaryOctet=$(echo "obase=2; $octet" | bc)
        binaryOctet=$(printf "%08d" "$binaryOctet")
        ipBinary+="$binaryOctet."
    done 
    ipBinary=${ipBinary%?}
    for octet in "${netOctet[@]}"; do
        binaryOctet=$(echo "obase=2; $octet" | bc)
        binaryOctet=$(printf "%08d" "$binaryOctet")
        netBinary+="$binaryOctet."
    done
    netBinary=${netBinary%?}
    ipBIN=$ipBinary
    netBIN=$netBinary
    echo -e "\n${greenColour}[!]${endColour}${grayColour} Representacion Binaria:${endColour}"
    echo -e "\n${yellowColour}[+]${endColour}${greenColour} IP Address dada: ${endColour}${purpleColour}$(printf '%s.' "${ipBIN}" | sed "s/\.$//")${endColour} "
    echo -e "${yellowColour}[+]${endColour}${turquoiseColour} Mascara de Red: ${endColour}${purpleColour}$(printf '%s.' "${netBIN}" | sed "s/\.$//")${endColour} "
}

function getOctetosMask(){
    mask="$1"
    IFS='.' read -r -a octetosMask <<< "$mask"
    maskEnRango=()
    if [ "${#octetosMask[@]}" -eq 4 ]; then
        for octeto in "${octetosMask[@]}"; do
            if [ "$octeto" == 0 ] || [ "$octeto" == 128 ] || [ "$octeto" == 192 ] || [ "$octeto" == 224 ] || [ "$octeto" == 240 ] || [ "$octeto" == 248 ] || [ "$octeto" == 252 ] || [ "$octeto" == 254 ] || [ "$octeto" == 255 ]; then
                maskEnRango+=("true")
            else
                maskEnRango+=("false")
            fi
        done
        if [ "${maskEnRango[0]}" == "true" ] && [ "${maskEnRango[1]}" == "true" ] && [ "${maskEnRango[2]}" == "true" ] && [ "${maskEnRango[3]}" == "true" ]; then
            return 0
        else
            echo -e "\n${redColour}[!] Mascaras de subnet solo usan${endColour}${greenColour} 2^${endColour}${yellowColour}[${endColour}${turquoiseColour}0${endColour}${grayColour}-${endColour}${turquoiseColour}7${endColour}${yellowColour}]${endColour}${grayColour}.${endColour}${redColour} Ingresa nuevamente la mascara.${endColour}\n\n"
            exit 1
        fi
        else
            echo -e "\n${redColour}[!] Ingresar los cuatro octetos para la mascara de red usando puntos${endColour}\n"
            exit 1
        fi
}

function getOctetosDeIP(){
    ip="$1"
    IFS='.' read -r -a octetosIP <<< "$ip"
    ipEnRango=()
    if [ "${#octetosIP[@]}" -eq 4 ]; then
        for octeto in "${octetosIP[@]}"; do
            if [ "$octeto" -ge 0 ] && [ "$octeto" -le 255 ]; then
                ipEnRango+=("true")
            else
                ipEnRango+=("false")
            fi
        done
        if [ "${ipEnRango[0]}" == "true" ] && [ "${ipEnRango[1]}" == "true" ] && [ "${ipEnRango[2]}" == "true" ] && [ "${ipEnRango[3]}" == "true" ]; then
            return 0
        else
            echo -e "\n${redColour}[!] Solo hay${endColour}${greenColour} 255 bits${endColour}${blueColour} por octeto${endColour}${grayColour}.${endColour}${redColour} Ingresa nuevamente la IP.${endColour}\n\n"
            exit 1
        fi
    else
        echo -e "\n${redColour}[!] Ingresar los cuatro octetos para la IP usando puntos${endColour}\n\n"
        exit 1
    fi
}

function calcularClase(){
    local octetosIP=("${!1}")
    counter=0 
    if [ "${octetosIP[0]}" == 10 ]; then
        counter=1  # Class A Private address blocks
    elif [ "${octetosIP[0]}" == 172 ] && [ "${octetosIP[1]}" -ge 16 ] && [ "${octetosIP[1]}" -le 31 ]; then
        counter=2  # Class B Private address blocks
    elif [ "${octetosIP[0]}" == 192 ] && [ "${octetosIP[1]}" == 168 ]; then
        counter=3  # Class C Private address blocks
    elif [ "${octetosIP[0]}" == 127 ]; then
        counter=4  # Loopback Address Reserved address blocks
    elif [ "${octetosIP[0]}" -ge 0 ] && [ "${octetosIP[0]}" -lt 127 ]; then
        counter=5
    elif [ "${octetosIP[0]}" -gt 127 ] && [ "${octetosIP[0]}" -lt 192 ]; then
        counter=6
    elif [ "${octetosIP[0]}" -gt 191 ] && [ "${octetosIP[0]}" -lt 224 ]; then
        counter=7
    elif [ "${octetosIP[0]}" -gt 223 ] && [ "${octetosIP[0]}" -lt 240 ]; then
        counter=8
    elif [ "${octetosIP[0]}" -gt 239 ] && [ "${octetosIP[0]}" -le 255 ]; then
        counter=9
    else
        counter=0  # Out of Range
    fi
    case $counter in
        1) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${purpleColour} Private block${endColour},${greenColour} Class 'A'${endColour}" ;;
        2) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${purpleColour} Private block${endColour},${greenColour} Class 'B'${endColour}" ;;
        3) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${purpleColour} Private block${endColour},${greenColour} Class 'C'${endColour}" ;;
        4) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${redColour} Reserved block, System Loopback Address${endColour}" ;;
        5) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} A${endColour}" ;;
        6) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} B${endColour}" ;;
        7) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} C${endColour}" ;;
        8) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} D${endColour}"
            echo -e "\n${redColour}[!]${endColour}${grayColour} Esta es una ${endColour}${greenColour}Clase D${endColour}${redColour} Reservada${endColour}${turquoiseColour} 'Multicast IP Address Block'${endColour}" ;;
        9) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} E${endColour}"
            echo -e "\n${redColour}[!]${endColour}${grayColour} Esta es una ${endColour}${greenColour}Clase E${endColour}${redColour} Reservada${endColour}${turquoiseColour} 'Multicast IP Address Block'${endColour}" ;;
        *) echo -e "\n${redColour}[!]${endColour}${grayColour} No esta en rango${endColour}" ;;
    esac
}

function getNetID(){
    local -n ip_ref=$1
    local -n mask_ref=$2
    netID=()
    for ((j = 0; j < ${#ip_ref[@]}; j++)); do
        netID+=($(( ip_ref[j] & mask_ref[j] )))
    done
}

function getNetIDRange(){
    local -a netIDEnd=() 
    IFS='.' read -r -a decimalNetID <<< "$1"
    local netInc=$2
    IFS='.' read -r -a decimalMask <<< "$3"
    for ((i=0; i<${#decimalNetID[@]}; i++)); do
        if [ "${decimalMask[i]}" -eq 255 ]; then
            netIDEnd+=("${decimalNetID[i]}")
        elif [ "${decimalMask[i]}" -lt 255 ] && [ "${decimalMask[i]}" -gt 0 ]; then
            netIDEnd+=("$(( (decimalNetID[i] | (255 - decimalMask[i])) + netInc - 1))")
        else
            netIDEnd+=("255")
        fi
    done
    echo -e "${yellowColour}[+]${endColour}${grayColour} BroadCast IP: ${endColour}${blueColour}$(printf '%s.' "${netIDEnd[@]}" | sed 's/\.$//')${endColour}"
}

function getHostsPerSubnet(){
    IFS='.' read -r -a decimalMask <<< "$1"
    hostBits=0
    for ((i=0; i<${#decimalMask[@]}; i++)); do
        if [ "${decimalMask[i]}" -eq 255 ]; then
            hostBits=$((hostBits + 0))
            continue
        elif [ "${decimalMask[i]}" -eq 254 ]; then
            hostBits=$((hostBits + 1))
            continue
        elif [ "${decimalMask[i]}" -eq 252 ]; then
            hostBits=$((hostBits + 2))
            continue
        elif [ "${decimalMask[i]}" -eq 248 ]; then
            hostBits=$((hostBits + 3))
            continue
        elif [ "${decimalMask[i]}" -eq 240 ]; then
            hostBits=$((hostBits + 4))
            continue
        elif [ "${decimalMask[i]}" -eq 224 ]; then
            hostBits=$((hostBits + 5))
            continue
        elif [ "${decimalMask[i]}" -eq 192 ]; then
            hostBits=$((hostBits + 6))
            continue
        elif [ "${decimalMask[i]}" -eq 128 ]; then
            hostBits=$((hostBits + 7))
            continue
        elif [ "${decimalMask[i]}" -eq 0 ]; then
            hostBits=$((hostBits + 8))
            continue
        else
            hostBits=0
            break
        fi
    done
    local hostsPerSubnet=$(awk -v bits="$hostBits" 'BEGIN { printf "%.0f", 2 ** bits - 2 }')
    echo -e "${yellowColour}[+]${endColour}${grayColour} Total Hosts:${endColour} ${purpleColour}${hostsPerSubnet}${endColour}"
}

function calculoSubnet(){
    ip=$1
    netMask=$2
    octetosIP=()
    octetosMask=()
    netID=()
    netInc=1
    getOctetosDeIP "$ip"
    IFS='.' read -r -a octetosIP <<< "$ip"
    getOctetosMask "$netMask"
    IFS='.' read -r -a octetosMask <<< "$netMask"
    echo -e "\n${yellowColour}[+]${endColour}${grayColour} Calculo de ${endColour}${turquoiseColour}SubNetting${endColour}${greenColour} Juan Garcia${endColour} ${grayColour}(${endColour}${yellowColour}aka${endColour}${redColour} liandd${endColour}${grayColour})${endColour}"
    echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Address:${endColour}${blueColour} ${ip}${endColour}"
    echo -e "${yellowColour}[+]${endColour}${grayColour} Mascara de Red:${endColour}${blueColour} ${netMask}${endColour}"
    binaryRepresentation $ip $netMask
    echo -e "\n${greenColour}[!]${endColour}${grayColour} Informacion de Clase de red Respecto al ${endColour}${turquoiseColour}CIDR${endColour}"
    calcularClase octetosIP[@]
    getNetID octetosIP octetosMask
    echo -e "${yellowColour}[+]${endColour}${grayColour} Network ID: ${endColour}${blueColour}$(printf '%s.' "${netID[@]}" | sed 's/\.$//')${endColour}"
    getNetIDRange $ip $netInc $netMask
    getHostsPerSubnet $netMask
}

while getopts "i:n:h" arg; do
    case $arg in
        i) ipAddress=$OPTARG;;
        n) netMask=$OPTARG;;
        h) ;;
    esac
done
if [ $ipAddress ] && [ $netMask ]; then
    calculoSubnet "$ipAddress" "$netMask"
else
    helpPanel
fi
```

---

<h2 id=""><h2 id="whity">Nmap y sus diferentes modos de uso</h2></h2>

Para la fase de reconocimiento nosotros como atacantes debemos tener claro en todo momento es conocer que puertos están abiertos. A través de estos puertos se exponen los servicios y así como dijimos anteriormente tenemos 65535 puertos y por defecto vamos a comenzar los escaneos por el protocolo **TCP**.

Vamos a comenzar practicando con **NMAP** y usando la dirección IP de nuestro router:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/1.png" alt="under" oncontextmenu="return false;">
</div>

Podemos hacer el comando `route -n` y en Gateway tendremos `192.168.0.1`.

La herramienta **NMAP** dispone de múltiples parámetros y con el `-p` le indicamos los puertos que queremos escanear:
1. Escribimos **nmap**
2. Especificamos los puertos que queremos escanear con `-p`
3. Por último siempre colocamos nuestra dirección IP a escanear

```bash
nmap -p- 192.168.0.1
```

<h1 class="amarillo">Usos del -p</h1>
```
nmap -p22 -> enumera únicamente el puerto 22
nmap -p1-65535 -> enumera todo el rango de puertos
nmap -p1-100 -> enumera del 1 al 100
nmap -p- -> también enumera todo el rango de puertos
```

Este escaneo puede tardar un poco, y cabe resaltar que los resultados pueden arrojar información relevante de los puertos como lo son sus estados (Abierto, Filtrado, Cerrado).

> Para el caso del estado Filtrado (Filtered) es porque **nmap** no es capaz de distinguir con certeza si el puerto está abierto o filtrado (Sea filtrado por Firewall, etc).
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/2.png" alt="under" oncontextmenu="return false;">
</div>

El escaneo va bastante lento, para nuestra suerte **Nmap** nos ofrece formas de agilizar el escaneo. A menos puertos más rápido y más ágil irá el escaneo.

```bash
nmap --top-ports 500 192.168.0.1
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/3.png" alt="under" oncontextmenu="return false;">
</div>

1. Realmente en el primer escaneo no nos interesa que el puerto se encuentre filtrado
2. Agregar `--open` solo representará los abiertos.

> Para adelantar trabajo podemos usar el `-v` de Verbose para saber más información en tiempo de ejecución de **Nmap** los puertos descubiertos.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/4.png" alt="under" oncontextmenu="return false;">
</div>

Puerto descubierto 80, 443, 22, 23, etc.

El ir rápido puede quitarnos precisión en nuestro escaneo, pero mirando la anterior imagen dice **Initiating Parallell DNS resolution** esto significa que esta aplicando resolución DNS.

> La resolución DNS Domain Name System es un sistema para traducir los nombres de los sitios web a números IP. En lugar que acceder por IP entramos por http://google.com entre otros.

En algunas ocasiones lo mejor es siempre remover esta resolución con `-n`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/5.png" alt="under" oncontextmenu="return false;">
</div>

Fue mucho más rápido en este caso, pero podemos aumentar la velocidad aún más agregando Plantillas de temporizado.

**Nmap** tiene 5 modos
1. Paranoico
2. Sigilso
3. Amable
4. Normal
5. Agresivo
6. Loco

Así podemos ajustar la velocidad de nuestro escaneo

```bash
nmap -p- -T5 --open 192.168.0.1 -v -n
```

A más lento la plantilla de temporizado más silencioso será el escaneo.

Otro escaneo sería con un `tcp connect scan`

```bash
nmap -p- --open -T5 -sT 192.168.0.1 -v -n
```

Aquí lo que va a pasar es que se va a establecer el **Three Way Handshake**

```
Lanzamos un SYN

SYN -> (RST (cerrado))

Sí el puerto está cerrado nos responderá con un RST Reset paquet, pero si está abierto

SYN -> (RST (cerrado) | SYN/ACK (abierto) -> ACK)
```

Vamos a analizar con Wireshark este flujo, para ello usando **tcpdump** nos pondremos en escucha para analizar el trafico:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/6.png" alt="under" oncontextmenu="return false;">
</div>


<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/7.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/8.png" alt="under" oncontextmenu="return false;">
</div>

Dado que el puerto destino ha sido el `22`, podemos aplicar un filtro como `tcp.port == 22`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/9.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver el filtro y como hemos enviado un SYN, y el router nos responde con SYN ACK, por último concluimos la conexión con ACK, y el RST es porque la conexión ya no se mantiene.

Esto fue para un puerto abierto, pero para uno cerrado?
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/10.png" alt="under" oncontextmenu="return false;">
</div>

Hemos intentado con `nmap -p134 -sT -v -n 192.168.0.1`

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/11.png" alt="under" oncontextmenu="return false;">
</div>


Aplicando nuevamente el filtro para el puerto 134 vemos el SYN de nuestro lado y como el puerto está cerrado nos cierra la conexión con RST.

> Esto sería todo por el `-sT` tcp connect scan.

<h1 class="amarillo">Más parámetros</h1>

Otro muy interesante es el `-Pn` ya que nuestros escaneos por defecto con **NMAP** es identificar si los hosts están activos y en caso de que estén apagados no procede con el escaneo y te recomienda agregar este parámetro. (Lo hace mediante el protocolo de resolución de direcciones ARP).
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/12.png" alt="under" oncontextmenu="return false;">
</div>

De que vaya un poco lento no es un problema ya que aún podemos agilizar mucho más el escaneo.

<h1 class="amarillo">¿Qué tal un escaneo por UDP?</h1>

Para escanear con **NMAP** los puertos por el protocolo UDP, podemos hacerlo de la siguiente manera:

```
nmap -sU
```

Pero va mucho más lento por UDP que por TCP.

```
nmap --top-ports 500 -sU --open -v -n -Pn 192.168.0.1
```

Este tipo de combinatorias hacen que vayan mucho más rápido los escaneos

<h1 class="amarillo">ARP vs NMAP</h1>

Hace unas clases trabajamos con `arp-scan` para identificar equipos que estén ubicados dentro nuestra red local

```bash
arp-scan -I enp3s0 --localnet
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/8.png" alt="under" oncontextmenu="return false;">
</div>

Digamos que podemos hacerlo con **NMAP** con el parámetro `-sn`:

```bash
nmap -sn 192.168.0.0/24
```

> Se aplica un barrido con PING mediante trazas ICMP para descubrir Hosts activos.

Debemos indicar el CIDR en el escaneo.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/13.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/14.png" alt="under" oncontextmenu="return false;">
</div>


Y en este caso hay 7 equipos y hemos logrado identificar hosts en nuestra red local.

> Un pequeño bonus es el parámetro `-O` pero es muy agresivo y no se recomienda para la identificación de sistema operativo.

Algo que si es de utilidad es identificar la versión y servicio para los puertos usando los parametros `-sC -sV`.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/15.png" alt="under" oncontextmenu="return false;">
</div>

Nos brinda un poco más de información y esto para identificar versiones vulnerables o vías potenciales para explotar alguna vulnerabilidad y esta genial.

---

<h2 id=""><h2 id="whity">Técnicas de evasión de FireWalls - MTU DATA LENGTH SOURCE PORT DECOY ETC</h2></h2>

> Un Firewall o Corta fuegos es un sistema de seguridad de red que controla el trafico de red entrante y saliente en función de reglas de seguridad predeterminadas.

Normalmente al enumerar una máquina con **NMAP** hay una serie de puertos abiertos, una vez conseguido el acceso a la máquina es muy probable que con `netstats` o `ss` puede en algunas ocasiones tener la máquina puertos abiertos internos (Es bastante normal que sean únicamente visibles internamente).

Se pueden acceder a estos puertos sin problemas con técnicas como **Port Forwarding** pero lo veremos más adelante, ahora lo que veremos es al hacer escaneos encontrar puertos Filtrados (Pueda ser porque hay un Firewall que impida que **Nmap** determine si está abierto o cerrado).

Nmap tiene una serie de parametros que pueden ayudar a eludir posibles Firewalls.

<h1 class="verde">Manual de nmap</h1>
```
-f; --mtu <valor>: Fragmentar paquetes
-D <señuelo1,señuelo2[,ME],..>: Disimular análisis con señuelos
--spoof-mac <dirección-mac/prefijo/nombre de fabricante> : Falsificar la dirección MAC
--badsum: Envíar paquetes con una suma de comprobación TCP/UDP Falsa
-g/--source-port <port>: Utilizar el número de puerto dado
-S: Falsificar dirección IP origen
--data-length
```
<h1 class="amarillo">Fragmentación de Paquetes</h1>

Comenzando con el `-f` tenemos la Fragmentación de paquetes. Esto es al momento de realizar el escaneo enviar el paquete con todos los datos correspondientes lo enviamos fragmentado y lo podemos ver con wireshark.

```bash
namp -p22 192.168.0.1 -f
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/16.png" alt="under" oncontextmenu="return false;">
</div>

De primer vistazo no se ve mucha diferencia pero si capturamos el trafíco con `tcpdump`:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/17.png" alt="under" oncontextmenu="return false;">
</div>

Ahora abrimos la Captura.cap con `wireshark`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/18.png" alt="under" oncontextmenu="return false;">
</div>

En este caso el filtro no será por un puerto, sino que por paquetes fragmentados. Para hacer esto escribimos el filtro `ip.flags.mf == 1`:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/19.png" alt="under" oncontextmenu="return false;">
</div>

Podemos ver el filtro y en INFO dice Fragmented IP protocol.

Estos paquetes luego son re ensamblados (Se envían fragmentados y se re ensamblan para poder identificar el contenido del paquete), podemos ver que dice **Reassembled in #48** para poder ver esto debemos quitar el filtro y buscar el #48.
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/20.png" alt="under" oncontextmenu="return false;">
</div>

Por TCP si ha tramitado una solicitud para saber si el puerto 22 está abierto, en algunos casos los Firewalls esperan un paquete concreto y el hecho de fragmentar el paquete para puertos abiertos o incluso algunos que estén filtrados ayuda a que de primeras podamos llegar a ver los puertos.

<h1 class="amarillo">MTU Unidad de transmisión máxima</h1>

> Esto es un valor el cual puede estar establecido en los Firewalls y normalmente son múltiplos de 8 y al poner un valor inferior al esperado podemos burlar el Firewall.

```bash
nmap -p22 192.168.0.1 --mtu 8
```

Si hacemos un `nmap --help`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/21.png" alt="under" oncontextmenu="return false;">
</div>

Todos estos son los parámetros que podemos usar para eludir un Firewall o un IDS.

> Un IDS es un sistema de detección de intrusiones para evitar accesos no autorizados.

<h1 class="amarillo">Decoy</h1>

El parámetro `-D` Decoy, es para spoofear direcciones IP al hacer un escaneo. El chiste de este parámetro es que no solo se vea únicamente nuestra dirección IP si no muchas más.

```bash
nmap -p22 192.168.0.1 -D 192.168.0.27
```

Vamos a verlo con wireshark:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/22.png" alt="under" oncontextmenu="return false;">
</div>

1. IP Router 192.168.0.1
2. Mi IP 192.168.0.6
3. IP para el Decoy y burlar un posible Firewall 192.168.0.27
4. Capturamos el tráfico con `tcpdump`
5. Abrimos la captura con `wireshark`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/23.png" alt="under" oncontextmenu="return false;">
</div>

6. El puerto destino es el 22, así que aplicamos el filtro `tcp.port == 22`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/24.png" alt="under" oncontextmenu="return false;">
</div>

Donde esta el **Source** podemos ver Mi dirección IP 192.168.0.6 pero también la 192.168.0.27. Y hemos hecho que otra dirección IP tramite el paquete al destino (Router) y el caso más practico sería el siguiente:

```bash
namp --top-ports 100 192.168.0.1 -D -v -n 192.168.0.2,192.168.0.3,192.168.0.4,192.168.0.5,192.168.0.6,192.168.0.7,192.168.0.8,192.168.0.9,192.168.0.10,192.168.0.11,192.168.0.12,192.168.0.13,192.168.0.14,192.168.0.15,192.168.0.16,192.168.0.17,192.168.0.18,192.168.0.19,192.168.0.20,192.168.0.21,192.168.0.22,192.168.0.23,192.168.0.24,192.168.0.25,192.168.0.26,192.168.0.27,192.168.0.28,192.168.0.29,192.168.0.30,192.168.0.31,192.168.0.32,192.168.0.33,192.168.0.34,192.168.0.35,192.168.0.36,192.168.0.37,192.168.0.38,192.168.0.39,192.168.0.40,192.168.0.41,192.168.0.42,192.168.0.43,192.168.0.44,192.168.0.45,192.168.0.46,192.168.0.47,192.168.0.48,192.168.0.49,192.168.0.50,192.168.0.51,192.168.0.52,192.168.0.53,192.168.0.54,192.168.0.55,192.168.0.56,192.168.0.57,192.168.0.58,192.168.0.59,192.168.0.60,192.168.0.61,192.168.0.62,192.168.0.63,192.168.0.64,192.168.0.65,192.168.0.66,192.168.0.67,192.168.0.68,192.168.0.69,192.168.0.70,192.168.0.71,192.168.0.72,192.168.0.73,192.168.0.74,192.168.0.75,192.168.0.76,192.168.0.77,192.168.0.78,192.168.0.79,192.168.0.80,192.168.0.81,192.168.0.82,192.168.0.83,192.168.0.84,192.168.0.85,192.168.0.86,192.168.0.87,192.168.0.88,192.168.0.89,192.168.0.90,192.168.0.91,192.168.0.92,192.168.0.93,192.168.0.94,192.168.0.95,192.168.0.96,192.168.0.97,192.168.0.98,192.168.0.99,192.168.0.100,192.168.0.101,192.168.0.102,192.168.0.103,192.168.0.104,192.168.0.105,192.168.0.106,192.168.0.107,192.168.0.108
```
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/25.png" alt="under" oncontextmenu="return false;">
</div>

Esto trae sus ventajas por ejemplo determinada IP puede ver algunos puertos o servicios abiertos, entonces el que nosotros falsifiquemos con Decoy estas entradas de origen nos puede permitir ver algunos puertos filtrados como abiertos:
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/26.png" alt="under" oncontextmenu="return false;">
</div>

Aquí debemos aplicar un filtro para poder ver en funcionamiento el Decoy `ip.dst == 192.168.0.1`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/27.png" alt="under" oncontextmenu="return false;">
</div>

Así que como origen podemos ver todos las direcciones IP que colocamos en el Decoy con **Nmap**.

La gran pregunta aquí es <a><strong>¿Quién es la IP real que está tramitando esta solicitud?</strong></a> Porque ahora es más complicado y para un IDS es difícil identificarlo.

<h1 class="amarillo">--Source-port</h1>

Algo que se suele realizar también es modificar el puerto de salida:

```bash
nmap -p22 --open -T5 -v -n 192.168.0.1
```

Aislado a los puertos de destino como el 22, están los de salida (Aquí un puerto aleatorio del equipo se abre para poder enviar la solicitud y es automático, pero se puede manipular).
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/28.png" alt="under" oncontextmenu="return false;">
</div>

Puerto 22 abierto y abrimos la captura con wireshark
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/29.png" alt="under" oncontextmenu="return false;">
</div>

1. Aplicamos el filtro `tcp.port == 22`
2. Y en INFO podemos ver el puerto `44732` el cual es el aleatorio que ha abierto nuestra máquina para tramitar el paquete


En ocasiones el Firewall trata de identificar el Source Port y si detecta dentro de una lista blanca que tiene el puerto 53 o el que corresponda, como nuestro puerto fue el `44732` la solicitud es bloqueada por el Firewall.

Esto lo podemos manipular con `--source-port 53`
<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/30.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/notas_hacking/2/31.png" alt="under" oncontextmenu="return false;">
</div>


En INFO vemos 53, por tanto hemos podido manipular este puerto aleatorio temporalmente eludiendo en algunos casos el Firewall.


---

<h2 id=""><h2 id="whity">Uso de Scripts y Categorias de Nmap para aplicar reconocimiento</h2></h2>

---

<h2 id=""><h2 id="whity">Nmap - Creación de Custom Scripts en Lua</h2></h2>

---

<h2 id=""><h2 id="whity">Alternativas para la enumeraciñón de puertos usando descriptores de archivo</h2></h2>

---

<h2 id=""><h2 id="whity">Descubrimiento de archivos en la red local - ARP ICMP</h2></h2>

---

<h2 id=""><h2 id="whity">Validación de un objetivo - Fijando un Target en HackerOne</h2></h2>

---

<h2 id=""><h2 id="whity">Descubrimiento de correos electronicos</h2></h2>

---

<h2 id=""><h2 id="whity">Reconocimiento de imagenes</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración de SubDominios</h2></h2>

---

<h2 id=""><h2 id="whity">Credenciales y brechas de seguridad</h2></h2>

---

<h2 id=""><h2 id="whity">Identificación de las tecnologías de una página web</h2></h2>

---

<h2 id=""><h2 id="whity">Fuzzing - Enumeración de archivos en un servidor web</h2></h2>

---

<h2 id=""><h2 id="whity">Google Dorks - Google Hacking (Los 10 Dorks más usados)</h2></h2>

---

<h2 id=""><h2 id="whity">Identificación y verificación de sistema operativo</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Introducción</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Instalación</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Definiendo la estructura básica de DockerFile</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Creación y construcción de imagenes</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Carga de instrucciones y despliegue de nuestro primer contenedor</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Comandos comunes para la gestión de contenedores</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Port Forwarding y uso de monturas</h2></h2>

---

<h2 id=""><h2 id="whity">Docker - Despligue de máquinas vulnerables con DockerCompose</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio FTP</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio SSH</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio HTTP HTTPS</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio SMB</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio de Gestores de Contenido CMS WordPress</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio de Gestores de Contenido CMS Joomla</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio de Gestores de Contenido CMS Drupal</h2></h2>

---

<h2 id=""><h2 id="whity">Enumeración - Servicio de Gestores de Contenido CMS Magento</h2></h2>

---

<h2 id=""><h2 id="whity">Explotación - Introdución a explotación de vulnerabilidades</h2></h2>

---

<h2 id=""><h2 id="whity">Explotación - Reverse Shell, Bind Shells, Forward Shells</h2></h2>

---

<h2 id=""><h2 id="whity">Explotación - Tipos de Payloads STAGED NON STAGED</h2></h2>

---

<h2 id=""><h2 id="whity">Explotación - Manuales y Automatizadas</h2></h2>

---

<h2 id=""><h2 id="whity">Explotación - Enumeración del sistema</h2></h2>

---

<h2 id=""><h2 id="whity">Explotación - Introducción a BurpSuite</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - SQLI SQL Injection</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - XXS Cross Site Scripting</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - XML External Entity Injection</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - LFI Local File Inclusion</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - RFI Remote File Inclusion</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - LFI RCE Log Poisoning</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - CSRF Cross Site Request Forgery</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - SSRF Server Side Request Forgery</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - SSTI Server Side Template Injection</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - CSTI Client Side Template Injection</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - PaddingOracle Ataque de Oraculo de Relleno</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Ataque de Type Juggling</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Inyecciones NOSQL</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Inyecciones LDAP</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Ataques de Deserialización</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Inyecciones LaTeX</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Abuso de API</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Abuso de Subida de Archivos</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Prototype Pollution</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - AXFR FULL ZONE TRANSFER Ataques de transferencia de zona</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - MASS ASSIGMENT ATTACK PARAMETER BINDING Ataques de asignación masiva</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - OPEN REDIRECT</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Enumeración y Explotación WebDAV</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Enumeración y EXplotación SQUID_PROXIES</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Ataque SHELLSHOCK</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Inyecciones Xpath</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - IDORs INSECURE DIRECT OBJECT REFERENCE</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - CORs Intercambio de recursos de origen cruzado</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - SQL TRUNCATION Ataque de truncado SQL</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - SESSION PUZZLING SESSION FIXATION SESSION VARIABLE OVERLOADING</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Enumeración y Explotación JWT JS WEB TOKENS</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - RACE CONDITION Condiciones de carrera</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Inyecciones CSS</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Python Ataque de deserialización YAML</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - Python Ataque de deserialización PICKLE</h2></h2>

---

<h2 id=""><h2 id="whity">OWASP TOP 10 - GRAPHQL INTROSPECTION MUTATIONS e IDORs</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Abusando de privilegios a nivel de sudoers</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Abusando de privilegios SUID</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Detección y explotación de tareas CRON</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - PATH HIJACKING</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Python Library Hijacking</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Abuso de permisos incorrectamente implementados</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Detección y explotación de CAPABILITIES</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Explotación de KERNEL</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Abuso de grupos, usuarios especiales</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Abuso de servicios internos del sistema</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Abuso de binarios especificos</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - Secuestro de biblioteca de objetos compartidos enlazados dinamicamente</h2></h2>

---

<h2 id=""><h2 id="whity">PRIV_ESC - DOCKER BREAKOUT</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Introducción</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - INMUNITY DEBUGGER y creación de laboratorio de pruebas</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Fase inicial de FUZZING y tomando control del registro EIP</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Asignación del espacio para el shellcode</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Generación de ByteArrays y detección de BADCHARS</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Búsqueda de OPCODES para entrar en el ESP y cargar nuestro shellcode</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Uso de NOPS Desplazamiento de pila e interpretación del shellcode para lograr RCE</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Modificación del shellcode para controlar el comando que se desea ejecutar</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Práctica</h2></h2>

---

<h2 id=""><h2 id="whity">BufferOverflow - Funcionamiento y Creación manual de shellcodes</h2></h2>

---

<h2 id=""><h2 id="whity">Taller - Máquina 1</h2></h2>

---

<h2 id=""><h2 id="whity">Taller - Máquina 2</h2></h2>

---

<h2 id=""><h2 id="whity">Taller - Máquina 3</h2></h2>

---

<h2 id=""><h2 id="whity">Taller - Máquina 4</h2></h2>

---

<h2 id=""><h2 id="whity">Taller - Máquina 5</h2></h2>

---

<h2 id=""><h2 id="whity">BONUS - METAEXPLOIT</h2></h2>

---

<h2 id=""><h2 id="whity">BONUS - SQLMAP</h2></h2>

---

<h2 id=""><h2 id="whity">BONUS - EXAMEN ECPPTV2</h2></h2>

---

<h2 id=""><h2 id="whity">USO DE LATEX 1</h2></h2>

---

