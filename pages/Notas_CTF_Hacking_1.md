---
title: Hacking CTF 1
layout: page
permalink: /Notas_CTF_Hacking_1
---
<h2 id="subtitulo-importante">Notas prácticas - Hacking 1 para CTF</h2>

Esta publicación tiene los apuntes y notas sobre el tema <b><i>Hacking</b></i> de nivel introductorio orientado donde se presenta el siguiente temario:

Este es el curso de introducción a Hacking para practicar en plataformas como HackTheBox y VulnHub, El Pinguino de Mario y Docker. En caso de no tener un buen nivel en Linux, es recomendable hacer el Curso de Linux 1 para Hacking. Este curso es preparatorio desde 0 para el EJPT, ECPPTV2, EWPT.
Hay mucha practica para este curso, y hay que practicar mucho para que se quede grabado los conceptos de cada clase.

La materia tiene un enfoque orientado a seguridad informática para realizar CTF en plataformas como <a href="https://app.hackthebox.com/profile/1098514"><strong><em style="color :#559">Hack The Box</em></strong></a>.

<h2 id="subtitulo-importante">Índice</h2>

- [Introducción a Python](#introducción-a-python)
- [Conceptos Básicos](#conceptos-básicos)
- [Colecciones y Estructuras de Datos](#colecciones-y-estructuras-de-datos)
- [Programación Orientada a Objetos](#programación-orientada-a-objetos)
- [Módulos y Paquetes](#módulos-y-paquetes)
- [Entrada y Salida de Datos](#entrada-y-salida-de-datos)
- [Proyectos de POO para reforzar](#proyectos-de-POO-para-reforzar)
- [Biblioteca Estándar y Herramientas](#biblioteca-estándar-y-herramientas-adicionales)
- [Manejo de librerías Comunes](#manejo-de-librerías-comunes)
- [Desarrollo de aplicaciones de escritorio](#desarrollo-de-aplicaciones-de-escritorio)
- [Python Ofensivo](#python-ofensivo)

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
