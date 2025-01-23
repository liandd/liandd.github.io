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

<h1 class="titulo-principal">Historia y filosofía de Python</h1>

La filosofía que dio su desarrollo y porque este lenguaje es tan completo. En 1989 nació Python con la capacidad de expresar conceptos con menos líneas de código que los lenguajes comunes de aquella época como C o Java.

Python debía centrarse en hacer más fácil las tareas del programador, la filosofía de Python se resume en el documento `The Zen of Python`.

<h1 class="titulo-principal">Características y Ventajas</h1>

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

<h1 class="titulo-principal">Diferencias entre Python2 y Python3, PIP2 Y PIP3</h1>

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

<h1 class="titulo-principal">El intérprete de Python</h1>

El intérprete es el corazón del lenguaje, es el motor que ejecuta el código. *Es el encargado de leer y ejecutar el código en tiempo real*. Todo el código es ejecutado línea por línea, los programas y Scripts tienen el formato **.py** y previamente a la compilación se convierte en bitcode mejorando el rendimiento.

Podemos usar,

```bash
python3 -c " "
```

<h1 class="titulo-principal">Shebang y Convenios en Python</h1>

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

<h3 class="titulo-secundario">¿Donde utilizamos el entorno `env`?</h3>

Para proyectos que requieran versiones especificas de paquetes instaladas mediante los *PIP2 o PIP3*, y para encontrar la ubicación del binario de Python3. El caso Windows es similar pero, solo para encontrar las versiones especificas de los paquetes con los que se va a trabajar, ya que el Shebang de Windows llama la ubicación del `.exe` en donde se encuentre el binario instalado.

---

Los convenios de codificación son las recomendaciones que guían para escribir código claro y consistente, siendo PEP8 el más conocido.

<a><strong><em style="color :#559">PEP8</em></strong></a> abarca:

> • <strong>Nombres de variables</strong>: Utilizar lower_case_with_underscore para nombres de variables y funciones.  Utilizar el UPPER_CASE_WITH_UNDERSCORE para constantes y camelCase para las clases.
> • <strong>Longitud de las líneas</strong>: Limitar a 79 caracteres y 72 para comentarios
> • <strong>Indentación</strong>: Usar 4 espacios por nivel de indentación

```python
#!/usr/bin/env python3
#clase5_shebang
def comprobacionEstadoApi():
    # lowerCamelCase

class TwitterApi:
    # UpperCamelCase

# PEP 8
def comprobar_estado_api():
    # snake_case

# SCREAMING_SNAKE_CASE
# Para constantes

VERSION_API = 1
URL_API = "https://google.com"

# Variable protegida
_protegido

# Variable privada
__privado

if __name__ == '__main__':
    print("Hola, soy el modulo principal")
else:
    print("No soy el modulo principal")
```

```python
#!/usr/bin/env python3
import clase5_shebang
```

<h1 class="titulo-principal">Definición de un modulo principal</h1>

```python
if __name__ == '__main__':
```

Se utiliza para definir el script como modulo principal, es útil para tener mejor organizado y limpio el código.

<h1 class="titulo-principal">Variables y tipos de datos</h1>

Strings, Enteros, Floats, Protegidos, Privados

Listas son colecciones ordenadas y mutables que pueden contener elementos de diferentes tipos

```python
my_ports = []
my_ports.append(22)
my_ports.extend([21,84])

for port in my_ports:
	print(port)
```

> Para trabajar los tamaños tenemos la función len().

```
.count(num) -> Contar ocurrencias
.insert(pos, valor_numero) -> Agregar un número
.pop() -> Elimina el último número
.index(num) -> Saber índice de primera ocurrencia
```

<h1 class="titulo-principal">String Formatting</h1>

```python
print(f"Hola{variable}")
print(f"[+] El puerto {my_ports[0]} está abierto")
my_ports += sorted(my_ports)
```

```python
#!/usr/bin/env python3
ip_address = "192.168.0.17"
print(ip_address)
print(type(ip_address))

port = 80
print(port)
print(type(port))

number = 4.5
print(number)
print(type(number))

print(int(number))
print(type(int(number)))

# Concepto Listas -> Array

my_ports = []
my_ports.append(22) # Primer Elemento
my_ports.append(80)
my_ports.append(443)

# Extiende la lista
my_ports.extend([22, 21, 84, 85])
my_ports += [8080, 87]
print(my_ports[0]) # -> Acceder al indice de la lista

for port in my_ports:
    print("El puerto " + str(port))

#print("El total de elementos en la lista es de: " + str(len(my_ports)))
print(f"El total de elementos en la lista es de: {len(my_ports)} elementos")

# Se ordena
my_ports = sorted(my_ports)

# Eliminar
del my_ports[1]

for port in my_ports:
    print(f"El puerto ordenado : {port}")
```

<h1 class="titulo-principal">Operadores Básicos en Python</h1>

Suma, Resta, Multiplicación, División, residuos y el exponente es usando **

```
2 ** 3 = 8
```

```python
#!/usr/bin/env python3
#clase 8 Operadores Basicos

# a + b, a - b, a ** b, a/b, a%b

first_number = 222
second_number = 4
result = first_number ** second_number
print("{:,}".format(result).replace(",","."))

# Cadenas
first_str = "Hola"
second_str = " "
third_str = "Mundo!"
print(first_str + second_str + third_str)
print(first_str * 3)
print(first_str[0] * 3)
print(third_str[0:3] * 8)

# Listas
odd_numbers = [1, 3, 5, 7, 9]
even_numbers = [2, 4, 6, 8, 10]
result = odd_numbers + even_numbers
print(result)

# ZIP
result = zip(odd_numbers, even_numbers) # -> crea objeto

# MAP -> iterador de cada tupla hecha por zip y aplicar operatorias

result = list(map(sum, zip(odd_numbers, even_numbers))) # -> sum suma
print(result)
for element in result:
    print(element)
```

<h1 class="titulo-principal">Operaciones con Cadenas</h1>

```python
#!/usr/bin/env python3

name = "juan"
rol = "ingeniero"

edad = 20

# Concatenar y type casting
print("Hola mi nombre es " + name + "y soy un " + rol + ". Actualmente tengo " + str(edad) + "años.")

# Usando punteros con prioridades
print("Hola mi nombre es %s y soy un %s. Actualmente tengo %d años." % (name, rol, edad))

# Usando format con posiciones
print("Hola mi nombre es {} y soy un {}. Actualmente tengo {} años.".format(name, rol, edad))

# Usando format mediante indices posicionales para asignar texto
print("Hola mi nombre es {0} y soy un {0}. Actualmente tengo {0} años.".format(name, rol, edad))

# Usando f-strings y nombrando directamente la variable
print(f"Hola mi nombre es {name} soy un {rol}. Actualmente tengo {edad}")

```

<h1 class="titulo-principal">Operaciones para Listas</h1>

```python
#!/usr/bin/env python3

# Bucles for
nombres = ["alicia", "ekaterina", "nastya", "katerina"]
animals = ["perro" , "gato", "pez", "colibri"]
frutas = {"manzanas" : 3, "uvas" : 7, "bananos" : 5, "mangos" : 10}
my_list = [[2, 4, 6, 8], [1, 3, 5, 7]]

# Iterada de 0 a 4 -> igual a un seq en Bash
for i in range(5):
    print(i)

# Iteracion en lista
for animal in animals:
    print(f"El animal en esta iteracion es {animal}")

# Bucles while
i = 0
while i < 5:
    print("El valor de i para esta iteracion es {}".format(i))
    i = i + 1

# Usando enumerate -> crea un objeto que es iterable
# Retorna indice y elemento

for i, nombre in enumerate(nombres):
    print("Para la iteracion %d, el nombre es: %s" % (i + 1, nombre))

# Iteracion en diccionarios
for key, value in frutas.items():
    print(f"Hay {value} cantidad de la fruta {key}")

# Bucles anidados
for element in my_list:
    for element_in_list in element:
        print(element_in_list)

# Listas de comprension
odd_list = [1, 3, 5, 7, 9]
cuadrado_de_odd_list = [i ** 2 for i in odd_list]
print(cuadrado_de_odd_list)

# Break, Continue y else's en bucles
print("\n")
for i in range(10):
    if i == 5:
        break # rompe
    print(i)
print("\n")
for i in range(10):
    if i == 5:
        continue # salta a la siguiente iteracion
    print(i)
# Uso de else en for
for i in range(10):
    if i == 10:
        break
else:
    print("Bucle concluido exitosamente")

# -------------------

print("continua el flujo del programa exitosamente")

# While
i = 0
while i < 10:
    if i == 10:
        break
    i += 1
else:
    print("Bucle while concluido exitosamente")
```

> <strong>Zip</strong>: Toma dos o más listas y las empareja, creando una lista de tuplas. Cada tupla contiene elementos de las listas originales que ocupan la misma posición.
> <strong>Map<strong>: Aplica la función especifica a cada elemento de un iterable, transforma datos

<h1 class="titulo-principal">String formatting, funciones e ámbitos de las variables y Lambdas anónimas</h1>

El string formatting consiste en darle un formato a las cadenas y los resultados.

```python
print("{;,}".format(resultado).replace(",","."))
```

<a><strong><em style="color :#559">Zip</em></strong></a> permite crear el formato tupla:

```python
(1,2)
(3,4)
(5,6)
(7,8)
(9,10)
```

<a><strong><em style="color :#559">Map</em></strong></a> permite crear un iterador de cada tupla, permitiendo crear operatorias:

```python
map(sum,zip(1,2))
```

Hay una regla para el formateo de cadenas y está requiere el operador porcentaje <em>(%s %d %f)</em>:

```
print(f"hola soy%s" %name)
print("hola mi nombre es {name}")
print("hola mi nombre es {}".format(name))
```

Las funciones son bloques de código reutilizables para una tarea especifica. Usan <a><em>def</em></a> y <a><em>return</em></a>.

El ámbito o scope se refiere a si una variable es local o global. Internamente la global efectua cambios globales.

Por otro lado, las funciones lambda anónimas permite simplificar código mediante expresiones.

```python
#!/usr/bin/env python3
from functools import reduce

# Ambito de las variables
variable = "Soy global"
def funcion():
    print("Soy funcion y mi contenido de variable es: %s " % variable)

def funcion2():
    variable = "Soy local"
    print("Soy funcion2 y mi contenido ha sido editado local, {}".format(variable))

def funcion3():
    global variable
    variable = "Soy global pero he sido modificado con 'global'"
    print(f"Soy funcion3 y usando 'global' el contenido de variable es: {variable}")

print(variable)
funcion()
funcion2()
funcion3()
print("Se ha terminado ambito de variables, valor resultante de 'variable es {}'".format(variable))

# uso de funciones
def mi_funcion():
    print("Hola Mundo")

mi_funcion()

def saludo(nombre):
    print("Hola {}, un saludo!".format(nombre))

saludo("convolk")
saludo("nastya")

def suma(x, y):
    return x+y

print("La suma de los numeros es %d" % suma(8,10))

# uso de funciones lambda anonimas
mi_suma = lambda x,y: x+y
print("Usando lambda la suma es {}".format(mi_suma(6,4)))

lista = [1, 2, 3, 4, 5]

# Cuadrado de cada elemento usando lambda
cuadrado = list(map(lambda x: x**2, lista))
print(f"Los cuadrados de {lista} son : {cuadrado}")

# Numeros pares o impares
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pares = list(filter(lambda x: x % 2 == 0, numeros))
impares = list(filter(lambda y: y % 2 != 0, numeros))
print(f"Los numeros pares son {pares}")
print("Los numeros impares son {}".format(impares))

# Producto de un numero
numeros = [1, 2, 3, 4, 5]
producto = reduce(lambda x, y: x*y, numeros)
print(f"El ultimo producto de la lista es: {producto}")
```

<h1 class="titulo-principal">Listas y Tuplas</h1>

Las listas permiten almacenar secuencias ordenadas de elementos (mutables), lo que significa que podemos modificar las listas después de su creación, y son dinámicas, permitiéndonos añadir o quitar elementos de ellas

<strong>Operaciones con listas</strong>:
```python
Añadir elementos -> .append(), .extend()
Eliminar elementos -> .remove(), .pop()
Ordenar elementos -> .sort(), .sorted(), .reverse(), [::-1]
```

```python
#!/usr/bin/env python3

# Repaso listas
cve_list = ['CVE-2023', 'CVE-2021', 'CVE-2024']
puertos_tcp = [21, 22, 25, 80, 443, 8080, 445, 69]
print(puertos_tcp)
print(len(puertos_tcp))
puertos_tcp.append(80)
print(len(puertos_tcp))

for puerto in puertos_tcp:
    print("Este es el puerto: {}".format(puerto))

print(cve_list)
cve_list.remove('CVE-2023')
print(cve_list)

# ordenar
puertos_tcp.sort()
print(f"Los puertos ordenados son: {puertos_tcp}")
puertos_tcp.reverse()
print("Se han revertido los puertos: {}".format(puertos_tcp))

# Poner listas en mayuscula
# animales = ["perro", "gato", "pez"]
# animales_mayus = [animal.upper() for animal in animales]
# animales_minus = [animal.lower() for animal in animales]

# Zip para combinatorias de listas
frutas = ["manzanas", "uvas", "mangos", "kiwis"]
cantidades = [3, 5, 6, 10]

for fruta, cantidad in zip(frutas, cantidades):
    print("cantidad %d de %s" % (cantidad, fruta))
```

```python
#!/usr/bin/env python3

tupla = (1, 2, 3, 4, 5)
print(tupla)
print(type(tupla))
print(tupla[1:3])
print(tupla[:4])
# No podemos modificar la tupla, son inmutables -> estaticas

# asignar
a, b, c, d, e = tupla
print("Valores de %d, %d, %d, %d, %d" % (a, b, c, d, e))
tupla = tupla + (6, 7, 8, 9, 10)
print(tupla)
tupla_pares = tuple(i for i in tupla if i % 2 == 0)
print(tupla_pares)
```

# Conjuntos (Sets)

No tienen orden ni elementos repetidos.

• Adición y eliminación:
```python
.add(), .remove(), .discard(), .update({})
# Para evitar errores con .remove(), usar .discard()
```

• Intersección:
```python
.intersection() # Para elementos repetidos en 2 conjuntos, ambos
.union() # Compacta y quita repeticiones, todas
```

```python
#!/usr/bin/env python3

#Conjutos sets {}, -> no guarda repetidos usando el typeCast set(mi_lista)
# Busquedas rapidas -> print(1234 in mi_conjunto) -> retorna true o falseo
# ambas -> intersection
# todas -> union
# diferente -> difference los que no estas en intersection

mi_conjunto = {1, 2, 3}
print(mi_conjunto)
print(type(mi_conjunto))
mi_conjunto.add(4)
mi_conjunto.add(5)
print(mi_conjunto)

mi_conjunto.update({6, 7, 8, 9, 10})
print(mi_conjunto)
mi_conjunto.remove(6)
print(mi_conjunto)

# Alternativa a borrado sin error
mi_conjunto.discard(11)
print(mi_conjunto)

# podemos crear intersecciones -> repetidos
mi_conjunto2 = {4, 5, 6, 11, 12, 13, 14, 15}
resultado = mi_conjunto.intersection(mi_conjunto2)
print(resultado)

# unir conjuntos con union
resultado2 = mi_conjunto.union(mi_conjunto2)
print(resultado2)

# subconjutos
p1_set = {1, 2, 3, 4}
p2_set = {1, 2, 3, 4, 5, 6, 7, 8, 9}
print(p1_set.issubset(p2_set)) # para todos los elementos True
# Basta con que UN SOLO elemento no esté presente, retorna False
```


