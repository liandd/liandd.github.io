---
title: Python3 Ofensivo
layout: page
permalink: /pythonOfensivo
---

<h2 id="subtitulo-importante">Python Ofensivo - Notas prácticas</h2>

Esta publicación tiene los apuntes y notas sobre el tema Python Ofensivo de nivel introductorio orientado en Python3 donde se presenta el siguiente temario:

La materia tiene un enfoque orientado a seguridad informática para desplegar scripts al momento de realizar CTF en plataformas como <a href="https://app.hackthebox.com/profile/1098514"><strong><em style="color :#559">Hack The Box</em></strong></a>.

<h2 id="subtitulo-importante">Índice</h2>

- [Introducción a Python](#introducción-a-python)
- [Conceptos Básicos]
- [Colecciones y Estructuras de Datos]
- [Programación Orientada a Objetos]
- [Módulos y Paquetes]
- [Entrada y Salida de Datos]
- [Proyectos de POO para reforzar]
- [Biblioteca Estándar y Herramientas]
- [Manejo de librerías Comunes]
- [Desarrollo de aplicaciones de escritorio]
- [Python Ofensivo]

<br>

Se harán prácticas y proyectos antes de ir a la parte ofensiva, primero tener una soltura en Python para ir a conceptos más avanzados. Adquirir un buen nivel dentro de la practica.


------
<h2 id="introducción-a-python"><h2 id="subtitulo-importante">Introducción a Python</h2></h2>

# Historia y filosofía de Python

La filosofía que dio su desarrollo y porque este lenguaje es tan completo. En 1989 nació Python con la capacidad de expresar conceptos con menos líneas de código que los lenguajes comunes de aquella época como C o Java.

Python debía centrarse en hacer más fácil las tareas del programador, la filosofía de Python se resume en el documento `The Zen of Python`.

# Características y Ventajas

Es un lenguaje de alto nivel e interpretado, ya que se ejecuta mediante un interprete sin ser compilado, se traduce a código máquina en tiempo real mientras se ejecuta el programa, por eso Python es interpretado. Python es fácil de leer y escribir incluso para los principiantes permitiendo `Programación orientada a objetos, Programación Imperativa y Programación Funcional`. La imperativa es un estilo de programación centrado en escribir como se deben hacer las operaciones para obtener un resultado.

```python
def suma_imperativa(lista):
	total = 0
	for num in lista:
		total += num
	return total

print(suma_imperativa([1, 2, 3, 4, 5]))
```

Se compone de una serie de instrucciones que modifican el estado del programa, *La variable va cambiando mediante avanza el programa*.

La Programación Funcional se compone de una serie de evaluaciones de funciones que no modifican el estado del programa.

```python
from functools import reduce

def suma_funcional(lista):
	return reduce(lambda x, y: x + y, lista)

print(suma_funcional([1, 2, 3, 4, 5]))
```

> Siendo estas las diferencias entre estos dos enfoques de programación, por eso es excelente para una gran variedad de tareas.

Es muy versátil y sencillo para las tareas de Hacking ético.

# Diferencias entre Python2 y Python3, PIP2 Y PIP3

Python2 y Python3 son versiones del lenguaje de programación y los PIP2 Y PIP3 son las herramientas de gestión de paquetes *Instalan y administran tanto bibliotecas y dependencias*.

Python3 tuvo la fecha de lanzamiento en el 2008, durante todo el curso se usará Python3. Para instalar 

```bash
sudo apt install python2 python3
```

Y para saber la versión se hace 

```bash
python2 --version

python3 --version
```

Es recomendable tener Python2 puesto que, en algún momento no es de extrañar que un Script este programado en versiones antiguas del lenguaje y halla que adaptarlo a Python3.

En Python2 `print` funciona como una declaración, no como una función.

```python
print "Hola Mundo"
```

En Python3,

```python
print("Hola Mundo")
```

Y así hay muchas mas funciones que antes eran declaraciones, por tanto hay que estar pendiente del código al revisarlo.

Python2 utiliza ASCII, y Python3 trabaja con Unicode.

Los *PIP* provienen de `Pips Installs Packages`.

```bash
sudo apt install python3-pip
```

Y para Pip2,

```bash
wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
python2 get-pip.py
```

Para instalar un paquete se hace

```bash
pip3 install pwntools
```

```bash
pip2 install pwntools
```

# El intérprete de Python

El intérprete es el corazón del lenguaje, es el motor que ejecuta el código. *Es el encargado de leer y ejecutar el código en tiempo real*. Todo el código es ejecutado línea por línea, los programas y Scripts tienen el formato **.py** y previamente a la compilación se convierte en bitcode mejorando el rendimiento.

Podemos usar,

```bash
python3 -c " "
```

# Shebang y Convenios en Python

Son aspectos importantes que facilitan la escritura de Scripts.

Shebang en Python se incluye al principio del Script, ya que este le indica al Sistema Operativo con que intérprete debe ejecutarse el archivo en cuestión. Donde el Shebang más común es,

Para Linux

```python
#!/usr/bin/env python3
```

> El `env` busca en el *Path* el binario de Python.

Para Windows,

```python
#!"C:\Python33\python.exe"
```

##### ¿Donde utilizamos el entorno `env`?

Para proyectos que requieran versiones especificas de paquetes instaladas mediante los *PIP2 o PIP3*, y para encontrar la ubicación del binario de Python3. El caso Windows es similar pero, solo para encontrar las versiones especificas de los paquetes con los que se va a trabajar, ya que el Shebang de Windows llama la ubicación del `.exe` en donde se encuentre el binario instalado.

---

Los convenios de codificación son las recomendaciones que guían para escribir código claro y consistente

