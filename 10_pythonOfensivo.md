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
- [Conceptos Básicos](#conceptos-básicos)
- [Colecciones y Estructuras de Datos](#colecciones-y-estructuras-de-datos)
- [Programación Orientada a Objetos](#programación-orientada-a-objetos)
- [Módulos y Paquetes](#módulos-y-paquetes)
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
<hr />
<h2 id="conceptos-básicos"><h2 id="subtitulo-importante">Conceptos Básicos</h2></h2>

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
<hr />
<h2 id="colecciones-y-estructuras-de-datos"><h2 id="subtitulo-importante">Colecciones y estructuras de datos</h2></h2>

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

<h1 class="titulo-principal">Conjuntos (Sets)</h1>

No tienen orden ni elementos repetidos.

>• Adición y eliminación:

```python
.add(), .remove(), .discard(), .update({})
# Para evitar errores con .remove(), usar .discard()
```

>• Intersección:

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

<h3 class="titulo-secundario">Repaso proyecto</h3>

```python
#!/usr/bin/env python3

juegos = ["Word of Warcraft", "Diablo 2", "Terraria"]

#Géneros
generos = {
	"Word of Warcraft":"RPG",
	"Diablo 2":"MMO",
	"Terraria":"Aventura"
}

#Ventas y unidades
ventas = {
	"Word of Warcraft":(800,200),
	"Diablo 2": (500,10),
	"Terraria": (200:700)
}

#Clientes
clientes = {
	"Word of Warcraft": {"zylem", "zokkz", "camcy", "liandd"},
	"Diablo 2": {"pypByter", "unkn0wn"},
	"Terraria": {"paloloco", "alexispropvp", "minfi"}
}

mi_juego = "Word of Warcraft"

def sumario(juego):
	#Sumario
	print(f"\n[i] Resumen del juego {juego}\n")
	print(f"\t[+] Género del juego: {generos[juego]}")
	print(f"\t[+] Total de ventas para este juego: {ventas[juego][0]} unidades")
	print(f"\t[+] Total de unidades disponibles para este juego: {ventas[juego[1]]}")
	print(f"\t[+] Clientes que han adquirido el juego: {', '.join(clientes[juego])}")


for juego in juegos:
	sumario(juego)

# Ventas mayores a 500
for juego in juegos:
	if ventas[juego][0] > 500:
		sumario(juego)
		ventas_mayores_a_500 = lambda: sum(units for juego, (sells,_) in ventas.items() if ventas[juego] > 500)
		
# Lambda para representar un conteo total de ventas
ventas_totales = lambda: sum(sells for sells, _ in ventas.values())

print(f"[i] El total de ventas de todos los productos es {ventas_totales()}")
```
<hr />
<h2 id="programación-orientada-a-objetos"><h2 id="subtitulo-importante">Programación Orientada a Objetos</h2></h2>

<h1 class="titulo-principal">Clases y objetos</h1>

La programación orientada a objetos es un paradigma, empleando clases y objetos permitiendo la modularidad para hacer un código más estructurado.

OOP (Object Oriented Programming)

¿Qué es una clase?

> Podemos verlo como una plantilla base en la cual hay definida una serie de atributos y métodos para definir un objeto.

Estos 'objetos' son instancias de la clase, o la plantilla para ser representada.

```python
#!/usr/bin/env python3

class Persona:
    # Los métodos son funciones internas de la clase, el primero que se crea se llama constructor,
    esto se hace para que se inicialice el objeto con los atributos de la clase.

    def __init__(self, nombre, edad): # El uso de self hace referencia al objeto que se le pasa
        self.nombre = nombre
        self.edad = edad

    def saludo(self):
        return f"Hola, soy{self.nombre} y tengo {self.edad}.\n"

# Después de tener la clase, se crea un objeto Persona
Tony = Persona("Tony", 28)
print(Tony.saludo())
```


```python
#!/usr/bin/env python3

class Animal:

	# En caso de necesitar variables se establecen aquí arriba, antes del constructor
	
	def __init__(self, nombre, tipo):
		self.nombre = nombre
		self.tipo = tipo

	def descripcion(self):
		return f"{self.nombre} es un {self.tipo}"


gato = Animal("Sasha", "Gato")
perro = Animal("Toby", "Perro")

print(gato.descripcion())
```

```python
#!/usr/bin/env python3

class CuentaBancaria:
	def __init__(self, cuenta, nombre, dinero=0): # Si no se le pasa ningun argumento, valdrá 0
		self.cuenta = cuenta
		self.nombre = nombre
		self.dinero = dinero

	def depositar_dinero(self, dinero):
		self.dinero += dinero # Se le suma el dinero que ya tenia '1000' + '500'
		print(f"[i] Se han depositado {dinero}, el dinero total es {self.dinero}")

	def retirar_dinero(self, retiro):
		if self.dinero > retiro:
			self.dinero -= retiro
			print(f"[i] Se han retirado {retiro}, el dinero total es {self.dinero}")
		else:
			print(f"[!] No se puede retirar, ¡Negado!")

sanchez = CuentaBancaria("1293182093", "Manuel Sanchez", 1000) 
sanchez.depositar_dinero(500)
sanchez.retirar_dinero(900)
```

```python
#!/usr/bin/env python3

class Rectangulo:
	def __init__(self, ancho, alto):
		self.ancho = ancho
		self.alto = alto

	# Método normal
	def calcular_area(self):
		return self.ancho * self.alto

	# Usando decoradores
	@property
	def area(self): # Acceder al resultado directamente
		return self.ancho * self.alto

	# Otro método especial es __str__ # Para indicar que quiero que muestre
	def __str__(self):
		return f"\n[i] Propiedades del rectángulo: [Ancho: {self.ancho}][Alto: {self.alto}]"

	# Otro método especial es __eq__ de igualdad, para saber si los objetos son iguales
	def __eq__(self, otro):
		return self.ancho == otro.ancho and self.alto == otro.alto
	
rectangulo1 = Rectangulo(20, 80)
rectangulo2 = Rectangulo(15, 60)
print(f"[+] El área es {rectangulo1.area}") # Sin colocar los parentesis, para acceder al valor del atributo como tal
print(f"[+] ¿Son iguales? -> {rectangulo1 == rectangulo2}")
```

```python
#!/usr/bin/env python3

class Libro:
		IVA = 0.51
	best_seller = 5000
	def __init__(self, titulo, autor, precio):
		self.titulo = titulo
		self.autor = autor
		self.precio = precio

	def es_best_seller(self, ventas):
		return ventas > Libro.best_seller

	# Operaciones puntuales, y no pueden acceder a los atributos a menos que le pase como argumento la instancia del objeto
	@staticmethod
	def es_best_seller(total):
		return total > Libro.best_seller

	# Precio con iva
	# Con @staticmethod
	@staticmethod
	def precio_con_iva(precio):
		return precio + precio * Libro.IVA

	# Con @classmethod -> recibe como argumento la clase con 'cls'
	def precio_con_iva(cls, precio):
		return precio + precio * cls.IVA

mi_libro = Libro("Aves Negras", "Juan García", 15000)
print(mi_libro.es_best_seller(6000)) # Normal
print({Libro.es_best_seller(6000)}) # @staticmethod
print({Libro.precio_con_iva(mi_libro.precio)})
print({Libro.precio_con_iva(mi_libro.precio)})
```

<h1 class="titulo-principal">Métodos estáticos  y de clase</h1>

Refuerzo sobre los métodos <strong>@staticmethod</strong> y <strong>@classmethod.</strong>

```python
#!/usr/bin/env python
# Acceder directamente a los métodos sin crear objetos
#@staticmethod
class Calculadora:

	@staticmethod
	def suma(num1, num2):
		return num1 + num2

	@staticmethod
	def resta(num1, num2):
		return num1 - num2

	@staticmethod
	def multiplicar(num1, num2):
		return num1 * num2

	@staticmethod
	def division(num1, num2):
		return num1 / num2 if num2 != 0 else "[!] Error Division por cero."
		
print(Calculadora.suma(2, 8))
print(Calculadora.resta(8, 4))
print(Calculadora.multiplicar(7, 12))
print(Caculadora.division(13, 0))
```

```python
#!/usr/bin/env python3

class Automovil:
	def __init__(self, marca, modelo):
		self.marca = marca
		self.modelo = modelo

	@classmethod
	def deportivo(cls, marca):
		return cls(marca, "Deportivo")
	# Es lo mismo que Automovil("Ferrari", "Deportivo"), es igual que usar un constructor con parametros

	# Se requiere el __str__
	def __str__(self):
		return f"La marca {self.marca} es un modelo {self.modelo}"

vehiculo1 = print(Automovil.deportivos("Ferrari")
```

> Usando variables de clase:

```python
#!/usr/bin/env python3

class Estudiante:

	estudiantes = []

	def __init__(self, nombre, edad):
		self.nombre = nombre
		self.edad = edad

		Estudiantes.estudiantes.append(self)

	@staticmethod
	def es_mayor_de_edad(edad):
		return edad > 18
		
	@classmethod
	def crear_estudiante(cls, nombre, edad):
		if cls.es_mayor_de_edad(edad):
			return cls(nombre, edad) # Es como llamar al constructor con parametros, es igual que crear objetos locales dentro de la clase
		else:
			print(f"[!] Error, el estudiante {nombre}, es menor de edad")

	@staticmethod
	def mostrar_estudiante():
		for i, estudiante in enumerate(Estudiantes.estudiante):
			print(f"[+] El estudiante [{i+1}]: {estudiante.nombre}")

# Para usar con @classmethod
Estudiantes.crear_estudiante("zylem", 23)
Estudiantes.crear_estudiante("zokks", 18)
Estudiantes.crear_estudiante("unkn0nw", 1122)
Estudiantes.crear_estudiante("bochim", 22)

Estudiantes.mostrar_estudiantes()
```

<h1 class="titulo-principal">Uso de Self</h1>

Refuerzo para comprender mejor el uso de *self*.

> Retocar y editar objetos requiere el uso de *self*

```python
#!/usr/bin/env python

class Persona:

	# Self hace referencia al objeto que se está creando
	def __init__(self, nombre, edad):
		self.nombre = nombre
		self.edad = edad

	def presentacion(self):
		return f"{self.nombre} te ha saludado!"
ekaterina = Persona("Ekaterina", 26)
# Se está haciendo: Persona.__init__(ekaterina: obj, "Ekaterina" : str, 26 : int)
print(ekaterina.presentacion())
```

```python
#!/usr/bin/env python3

class Calculadora:

	def __init__(self, numero):
		self.numero = numero

calc = Calculadora(5)
```

<h1 class="titulo-principal">Herencia y Polimorfismo</h1>

Estos son nuevos conceptos, siendo a muy resumidas cuentas la Herencia una clase que hereda de otra clase ya existente:

```python
#!/usr/bin/env python3

class Animal:

	def __init__(self, nombre):
		self.nombre = nombre

	def hablar(self):
		pass # Se convierte en un método abstracto, para utilizarlos después en una subclase que incluya este método
		# Otra forma es:
		raise NotImplementedError("Las subclases definidas deben implentar este método")
	
class Gato(Animal):
# "Se sobreescribe" el método
	def hablar(self):
		return f"{self.nombre} dice !Miau¡"

class Perro(Animal):
# "Se sobreescribe" el método, pero esto no significa que el método de la clase Gato se cambie para perros.
	def hablar(self):
		return f"{self.nombre} dice !Woof¡"
	
gato = Gato("kiki")
perro = Perro("candy")
print(gato.hablar())
print(perro.hablar())
```

Ahora, para polimorfismo estamos llamando directamente al método, fuera de las clases se hace una función, recibe el objeto:

```python
#!/usr/bin/env python3

class Animal:

	def __init__(self, nombre):
		self.nombre = nombre

	def hablar(self):
		pass # Se convierte en un método abstracto, para utilizarlos después en una subclase que incluya este método
		# Otra forma es:
		raise NotImplementedError("Las subclases definidas deben implentar este método")
	
class Gato(Animal):
# "Se sobreescribe" el método
	def hablar(self):
		return f"!Miau¡"

class Perro(Animal):
# "Se sobreescribe" el método, pero esto no significa que el método de la clase Gato se cambie para perros.
	def hablar(self):
		return f"!Woof¡"
	
gato = Gato("kiki")
perro = Perro("candy")
print(gato.hablar())
print(perro.hablar())

def hacer_hablar(objeto):
	print(f"{objeto.nombre} dice {objeto.hablar()}")

hacer_hablar(gato)
hacer_hablar(perro)
```

```python
#!/usr/bin/env python3

class Automovil:

	def __init__(self, marca, modelo):
		self.marca = marca
		self.modelo = modelo

	def describir(self):
		return f"Vehiculo:{self.marca}, {self.modelo}"

coche = Automovil("Nissan", "GTR")
moto = Automovil("AKT", "NKD")

print(coche.describir())
print(moto.describir())

# Ambas diran lo mismo, aunque un objeto sea un coche y el otro una moto. 
# Aplicando herencia se hace mucho más modular

class Automovil:

	def __init__(self, marca, modelo):
		self.marca = marca
		self.modelo = modelo

	def describir(self):
		raise NotImplementedError("Los vehículos deben implementar este método!")
		
class Coche(Automovil):

	def describir(self):
		return f"Vehículo: {self.marca}, {self.modelo}"

class Moto(Automovil):

	def describir(self):
		return f"Moto: {self.marca}, {self.modelo}"

coche = Coche("NISSAN", "GTR")
moto = Moto("AKT", "NKD")

print(coche.describir())
print(moto.describir())

# Ahora aplicando polimorfismo

def describirse(objeto):
	return f"{objeto.describir()}"

print(describirse(moto))
print(describirse(coche))
```

```python
#!/usr/bin/env python3

class Dipositivo:

	def __init__(self, modelo):
		self.modelo = modelo

	def escanear_vulnerabilidades(self):
		raise NotImplementedError("Este método debe ser definido para el resto de subclases existentes")

class Ordenador(Dispositivo):

	def escanear_vulnerabilidades(self):
		return f"[+] Análisis de vulnerabilidades concluido: Actualización de software necesaria"

class Router(Dispositivo):

	def escanear_vulnerabilidades(self):
		return f"[+] Análisis de vulnerabilidades concluido: Múltiples puertos críticos detectados abiertos"

class TelefonoMovil(Dispositivo):

	def escanear_vulnerabilidades(self):
		return f"[+] Análisis de vulnerabilidades concluido: Múltiples aplicaciones detectadas con permisos excesivos"

def realizar_escaneo(objeto):
	return f"{objeto.escanear_vulnerabilidades}"

pc = Ordenador("Vaio Sony")
router = Router("Tenda F3")
movil = TelefonoMovil("POCO")

print(realizar_escaneo(pc))
print(realizar_escaneo(router))
print(realizar_escaneo(movil))
```

> Hay ocasiones donde queremos que el método en la clase padre no se sobrescriba y es usando constructores:

```python
#!/usr/bin/env python3

class A:

	def __init__(self):
		print("Inicializando A")

class B(A):

	def __init__(self):
		print("Inicializando B")
		super.__init__() # Evita sobrescribir el método de la clase A, la cual el constructor es heredado por B

a = A()
#---
b = B() # Aquí se ha sobrescrito el constructor de A, y prevalece el de B
# Cuando nos interese no sobrescribir usamos *super*
```

```python
#!/usr/bin/env python3

class A:

	def __init__(self, x):
		self.x = x
		print("El valor de x: {self.x}")

class B(A):

	def __init__(self, x, y):
		self.y = y
		super.__init__(x)
		print("El valor de y: {self.y}")

b = B(2, 10)
```

```python
#!/usr/bin/env python3

class A:

	def saludo(self):
		return "Saludo desde A"

class B(A):

	def saludo(self):
		original = super().saludo()
		return f"{original}, pero también saludo desde B"

saludo = A()
print(saludo.saludo())

saludo_b = B()
print(saludo.saludo())
```

```python
#!/usr/bin/env python

class Persona:

	def __init__(self, nombre, edad):
		self.nombre = nombre
		self.edad = edad

	def saludo(self):
		return f"Hola soy {self.nombre}, y tengo {self.edad} años"

katya = Persona("Katya", 23)
print(katya.saludo())

class Empleado(Persona):

	def __init__(self, nombre, edad, salario):
		super().__init__(nombre, edad)
		self.salario = salario

	def saludo(self):
		original = super().saludo()
		return f"{original}, y mi salario es: {self.saludo}"

convolk = Empleado("convolk", 23, 75000)
print(convolk.saludo())
```

<h1 class="titulo-principal">Encapsulamiento y métodos especiales</h1>

En el paradigma de la programación orientada a objetos, el encapsulamiento es un método o una estrategia que permite restringir el acceso o ciertas partes de un objeto fuera de la clase.

```python
self.__dinero -> Atributo privado

self._dinero -> Atributo protegido
```

```python
#!/usr/bin/env python3

class Ejemplo:

	def __init__(self):
		# No visible hacia afuera, se crean una Atributo protegido
		self._atributo_protegido = "Soy un atributo protegido, y no deberías poder verme"

		# Atributo privado
		self.__atributo_privado = "Soy un atributo privado"

ejemplo = Ejemplo()
print(ejemplo._atributo_protegido) # El convenio de python dice que no debe referenciar de está manera los atributos protegido o privados

```

Esto es conocido como *name mangling* y lo que hace es retocar un poco el nombre _self._atributo_privado:

```python

# Para ver un atributo privado
print(ejemplo._Ejemplo__atributo_privado)
```

```python
#!/usr/bin/env python3

class Coche:

	def __init__(self, marca, modelo):
		self.marca = marca
		self.modelo = modelo
		self.__kilometraje = 0 # Atributo privado

	def conducir(self, kilometros):
		if kilometros >= 0:
			self.__kilometraje += kilometros
		else:
			print("[!] Los kilometros deben ser mayores a 0\n")

	def mostrar_kilometros(self):
		return self.__kilometros

coche = Coche("Toyota", "AE86")
coche.conducir(150)
print(coche.mostrar_kilometros())
```

Breve refuerzo sobre los métodos especiales:

```python
#!/usr/bin/env python3

class Libro:

	def __init__(self, autor, titulo):
		self.autor = autor
		self.titulo = titulo

	def __str__(self):
		return f"El libro {self.titulo} ha sido escrito por {self.autor}"

	def __eq__(self, otro):
		return self.autor == otro.autor and self.titulo == otro.titulo

mi_libro = Libro("Juan García", "Aves Negras")
libro_dos = Libro("Miguel García", "Cadaveres de Gato")

print(mi_libro)
print(f"¿Son iguales ambos libros? -> {mi_libro == libro_dos}")
```

```python
#!/usr/bin/env python3

class CuentaBancaria:

	def __init__(self, num_cuenta, titular, saldo_inicial=0):
		self.num_cuenta = num_cuenta
		self.titular = titular
		self.__saldo = saldo_inicial

	def depositar_dinero(self, cantidad):
		if cantidad > 0:
			self.__saldo += cantidad
		else:
			return "El monto a depositar debe ser mayor a cero"

	def retirar_dinero(self, retiro):
		if self.__saldo > 0:
			if self.__saldo > retiro:
				self.__saldo -= retiro
			else:
				return "No tienes fondos suficientes para retirar"
		else:
			return "No tienes ni un duro!"

	def mostrar_dinero(self):
		return f"El saldo actual en la cuenta es {self.__saldo}"

nastya = CuentaBancaria("27346", "Nastya Aovna")
print(nastya.mostrar_dinero())
```

```python
#!/usr/bin/env python3

class Caja:

	#def __init__(self, ) # ¿De qué manera podemos recibir multiples frutas en una sola variable sin usar listas?

	# Se crea una tupla, idependiente de la cantidad de elemetos
	def __init__(self, *frutas):
		self.frutas = frutas

	def mostrar_frutas(self):
		for i in self.frutas:
			print(i)

	# Saber la longitud de la caja sin usar len()
	def __len__(self):
		return len(self.frutas)

caja = Caja("Manzana", "Kiwi", "Uva", "Fresa")
```

```python
#!/usr/bin/env python3

class Pizza:

	def __init__(self, size, *ingredientes):
		self.size = size
		self.ingredientes = ingredientes

	def descripcion(self):
		print(f"La pizza tiene {self.size} y los ingredientes son: {", ".join(self.ingredientes)}")

pizza = Pizza(12, "Chorizo", "Jamón", "Tocineta", "Queso")
```

```python
#!/usr/bin/env python3

class MiLista:

	def __init__(self):
		self.data = [1, 2, 3, 4, 5]

	# Para traer un elemento de una lista representada como atributo
	def __getitem__(self, idx):
		return self.data[idx]

lista = MiLista()
print(lista)
```

```python
#!/usr/bin/env python3

class Saludo:

	def __init__(self, saludo):
		self.saludo = saludo

	# Hay un método especial llamado call
	def __call__(self):
		return f"{self.saludo} {nombre}!"

hola = Saludo("¡Hola")
print(hola("Katya"))
```

```python
#!/usr/bin/env python3

class Punto:

p1 = Punto(2, 8)
p2 = Punto(4, 9)

print(p1 + p2) # Aquí se rompe python porque no sabe que es.

# 2+4=6, 9+8=17

class Punto:

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def __add__(self, otro):
		# Crear un objeto temporal
		return Punto(self.x + otro.x, self.y + otro.y)

	def __str__(self):
		return f"({self.x}, {self.y})"

p1 = Punto(2, 8)
p2 = Punto(4, 9)

print(p1 + p2)
```

```python
#!/usr/bin/env python3

class Contador:

	def __init__(self, limite):
		self.limite = limite

	# Crear un iterador sobre un objeto
	def __iter__(self):
		self.contador = 0
		return self

	def __next__(self): # Igual que al bucle while, devolver el iterador y definir que pasa cada iteración
		if self.contador < self.limite:
			self.contador += 1
			return self.contador
		else:
			raise StopIteration

c = Contador(5)

for i in c:
	print(i)
```

<h1 class="titulo-principal">Decoradores y propiedades</h1>

Hasta ahora se han visto algunos decoradores 

```python
@property
```

Para no alterar el código de una función o método de una clase, pero si puede hacer muchas cosas más.

```python
#!/usr/bin/env python3

def saludo():
	print("Hola, estoy saludando desde la función")


# Para expandir la función se crea una función de orden superior
def mi_decorador
# Necesitamos una envoltura, para apartir de ahora la función saludo se convierte en envoltura, es como una alteración, y retornarla

def mi_decorador(funcion):
	def envoltura():
		print("Estoy saludando en la envoltura antes de llamar a la función")
		funcion()
		print("Estoy saludando en la envoltura después de llamar a la función")
	return envoltura

@mi_decorador
def saludo():
	print("Hola, estoy saludando desde la funcióm")

salud()
#----

@property # Trabaja con Setters y Getters

class Persona:

	def __init__(self, nombre, edad):
		# Atributos protegidos, externamente no se ven pero si se pueden manipular
		self._nombre = nombre
		self._edad = edad

	# Cómo desde fuera se puede actualizar los valores?
	@property # Crear una nueva propiedad
	# Aquí se trabaja set y get: 
	def edad(self): # GET
		return self._edad

	@edad.setter # CON DECORADOR ES SET
	def edad(self, edad):
		if edad > 0:
			self._edad = edad
		else:
			raise ValueError("No puedes poner la edad")

sasha = Persona("Sasha", 21)
```

# Organización de Código en Módulos

# Importación y uso de Módulos

# Creación y distribución de paquetes

# Entrada y salida por teclado

# Lectura y escritura de archivos

# Formateo de cadenas

# Proyecto - Gestión de Biblioteca

# Proyecto - Tienda de animales

# Proyecto - Administración de vehículos

# Proyecto - Gestión de notas

# Manejo de fechas y horas

# Expresiones Regulares

# Manejo de archivos y directorios

# Conexiones de red y protocolos

# Librería OS y SYS

# Librería REQUEST

# Librería URLLIB

# Librería Threading y Multiprocessing

# Interfaz gráfica de usuario

# Tkinter - Desarrollo de aplicaciones

# CustomTkinter - Desarrollo de aplicaciones

# Chat Multiusuario con GUI y Cifrado E2E

# Scripting - Escaner de Puertos

# Scripting - Macchanger

# Scripting - Escaner de red ICMP

# Scripting -  Escaner de red ARP con Scapy

# Scripting - ARP Spoofer con Scapy

# Scripting - DNS Sniffer

# Scripting - HTTP Sniffer

# Scripting - HTTPS_Image Sniffer con mitmdump

# Scripting -  DNS Spoofer con Scapy y NetfilterQueue

# Scripting - Traffic Hijacking

# Scripting - Keylogger

# Scripting - Creación de Malware

# Scripting -  Creación de Backdoors y Command_and_Control

# Scripting - Forward Shell
