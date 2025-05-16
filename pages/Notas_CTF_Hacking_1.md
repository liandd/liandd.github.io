---
title: Hacking CTF 1
layout: page
permalink: /Notas_CTF_Hacking_1
---
<h2 id="subtitulo-importante">Notas prácticas - Hacking 1 para CTF</h2>

Este es el curso de introducción a Hacking para practicar en plataformas como HackTheBox y VulnHub, el Pinguino de Mario y Docker. En caso de no tener un buen nivel en Linux, es recomendable hacer el <a href=""><em>Curso de Linux 1 para Hacking</em></a>.

Este curso es preparatorio desde 0 para el EJPT, ECPPTV2, EWPT. Hay mucha practica para este curso y hay que realizar los ejercicos para que se quede grabado los conceptos de cada clase.

La materia tiene un enfoque orientado a seguridad informática para realizar CTF en plataformas como <a href="https://app.hackthebox.com/profile/1098514"><strong><em style="color :#559">Hack The Box</em></strong></a>.

Esta publicación tiene los apuntes y notas sobre el tema <b><i>Hacking</i></b> de nivel introductorio donde se presenta el siguiente temario:

<h2 id="subtitulo-importante">Índice</h2>

- [Direcciones ipv4-ipv6](#)
- [Direcciones MAC Nic y Oui](#)
- [Protocolos Comunes UDP, TCP y el famoso Three Way HandShake](#)
- [El Modelo OSI](#)
- [Subnetting - ¿Cómo se interpreta una mascara de red?](#)
- [Subnetting - CIDRS y calculo total de hosts](#)
- [Subnetting - Mascaras de subred, tipos de clase e interpretación de prefijos de red](#)
- [Subnetting - Interpretación de los rangos de red que el cliente nos ofrece para auditar](#)
- [Subnetting - Redes Curiosas y Casos Particulares](#)
- [Tips de Subnetting - Calculo veloz de direccionamiento de redes](#)
- [](#)

<br>

---

<h2 id="subtitulo-importante">titulo</h2>

Lo primero es ¿Qúe es una dirección IP?, en mi caso en la polybar tengo mi propia dirección IP:

![[1.png]]

Al igual que podemos verla usando el comando `ifconfig` o `ip a`:

![[2.png]]

Podemos ver 2 interfaces de red, siendo la primera `enp3s0` y la `lo`. Solo vamos a centrarnos en la enp3s0 ahí vemos que pone **inet**, es la IP privada que nos identifica a nivel de usuario.

----
# ¿Qué es una dirección IP?

Es una etiqueta numérica que identifica de manera lógica y jerárquica a una interfaz en la red de un dispositivo que utiliza el protocolo de Internet. Y esto no son más que bits ceros y unos. Y consiste de 4 octetos (4 pares de 8 bits). Podemos ver como los dispositivos cada uno se identifica con una dirección IP.

![[3.2.png]]

Para la estructura de una dirección IPv4 tenemos 4 pares de octetos representados en base 10, **198.20.250.1**.

Para cada uno de los 4 pares sale un Byte compuesto de 8 Bits (0,1).

![[3.3..png]]

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

![[3.png]]

Y esto es la propia representación de la IP en binario, ==¿Cuántas direcciones IP se pueden representar hablando de IPv4?==

El computo lo hacemos con:

```bash
echo "2^32" | bc ----> Para IPv4
4294967296

echo "2^128" | bc ---> Para IPv6
340282366920938463463374607431768211456
```

![[4.png]]

Parece que jamas vamos a llegar a semejante cantidad de direcciones por IPv6, al momento de hacer pentesting en HackTheBox para la enumeración de puertos, identificar la máquina requiere tener la noción de estos conceptos.

![[5.png]]
