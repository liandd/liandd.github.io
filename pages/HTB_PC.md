---
title: PC
layout: page
permalink: /HTB_PC
---

<h2 class="amarillo">HackTheBox - PC WriteUp - Máquina retirada</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/PC/PC.png" alt="under" oncontextmenu="return false;">
</div>

Encedemos la maquina PC y obtenemos la direccion 10.129.56.82, para confirmar que la maquina esta activa lanzamos una traza ICMP

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/1.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos que recibimos las 5 trazas enviadas seguido de un TTL de 63, por tanto estamos frente a una maquina Linux

<h2 class="amarillo">Enumeración</h2>

Para la enumeracion lanzamos un escaneo con nmap a todo el rango de puertos y exportamos la captura en el formato "G" para pasarlo a la utilidad de extractPorts: 

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.56.82 -oG allPorts
```

Una vez con la captura de nmap representado los puertos abiertos hacemos una limpieza del ruido:
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/2.png" alt="under" oncontextmenu="return false;">
</div>

Usando extractPorts podremos ver la informacion mas relevante de la captura de nmap:
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/3.png" alt="under" oncontextmenu="return false;">
</div>
Ahora pasamos a hacer un escano exhaustivo y vemos los puertos 22 y 50051 abiertos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/4.png" alt="under" oncontextmenu="return false;">
</div>

Al no saber nada sobre el puerto 50051 haciendo busquedas en internet encontramos un servicio llamado grpc

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/5.png" alt="under" oncontextmenu="return false;">
</div>

buscando un poco de informacion en Github encontramos un repositorio que tiene un herramienta de consola, que a modo de cliente esta inspirada en curl para acceder al servicio grpc. Podremos instalar la herramienta con 

```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
```

Con la herramienta instalada podremos ver que argumentos debemos pasarle para poder hacer uso de la API que tenemos expuesta por el puerto 50051
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/6.png" alt="under" oncontextmenu="return false;">
</div>
Vemos algunos parametros interesantes como `-plaintext, list, describe, etc`

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/7.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que la maquina tiene un servicio llamado SimpleApp, donde usando "describe" podemos ver los metodos o servicios para la API en este servicio de SimpleApp

Podemos ver que es un servicio y los metodos que tiene. Usando la funcion "getInfo" tendremos la informacion de los parametros que espera cada uno de los metodos

```bash
grpcurl -plaintext 10.129.56.82:50051 SimpleApp.getInfo
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/8.png" alt="under" oncontextmenu="return false;">
</div>

Revisando un poco el manual de la herramienta de grpcurl podemos ver que el parametro "-d" nos permite agregar parametros y al saber que hay un metodo RegisterUser nos registramos en el servicio.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/9.png" alt="under" oncontextmenu="return false;">
</div>
Al tratar de traer la informacion vemos que nos pide un token en header, asi que pasandole los datos con los que nos registramos pero llamando al metodo LoginUser nos retorna el servicio un ID 707

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/10.png" alt="under" oncontextmenu="return false;">
</div>

Pero vemos que no es dinámico el ID y cambia despues de cada peticion:
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/11.png" alt="under" oncontextmenu="return false;">
</div>

Curiososamente postman permite trabajar con grpc al momento de crear un nuevo proyecto:
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/12.png" alt="under" oncontextmenu="return false;">
</div>

Desde postman podremos ver directamente los metodos de la API que tenemos expuesta.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/13.png" alt="under" oncontextmenu="return false;">
</div>

Intentamos loguearnos con credenciales por defecto como admin:admin y vemos que es posible y que existe este usuario.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/14.png" alt="under" oncontextmenu="return false;">
</div>

Pero en el postman vemos que en Metadata se nos ha generado un token

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/15.png" alt="under" oncontextmenu="return false;">
</div>

Llamando al metodo getInfo ya podemos utilizar el token y vemos que la respuesta es el id y que la API pronto actualizara la informacion.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/16.png" alt="under" oncontextmenu="return false;">
</div>

Si probamos como Header en la consola con grpcurl vemos la misma informacion.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/17.png" alt="under" oncontextmenu="return false;">
</div>

Al servicio estar almacenando usuarios y contrasenas probamos con una injeccion SQL

```sql
order by 1-- -
```

Generando la estructura

```bash
{"id": "536 order by 1-- -"}
```

Pero nos responde con will update soon
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/18.png" alt="under" oncontextmenu="return false;">
</div>

Seguido me hace pensar en que hay 1 columna valida, por tanto probando la consulta

```sql
union select 1-- -
```

vemos que nos responde con 1

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/19.png" alt="under" oncontextmenu="return false;">
</div>

Tratamos de listar las version de la base da datos pero obtenemos un error, hasta que despues de unas busquedas en internet del metodo version() para distintos motores de bases de datos logramos ver informacion releveante con `sqlite_version()`

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/20.png" alt="under" oncontextmenu="return false;">
</div>
Al conocer la version de la base de datos ya solo nos queda probar una injeccion:

```sql
tbl_name FROM sqlite_master WHERE type=\"table"\
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/21.png" alt="under" oncontextmenu="return false;">
</div>

Y vemos que la tabla se llama accounts, como siempre en una buena enumeracion de base de datos podemos usar group_concat

```sql
union select group_concat(username) from accounts limit 1
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/22.png" alt="under" oncontextmenu="return false;">
</div>

Seguido de saber que los usuarios son (admin y sau) recuperamos sus contrasenas

```sql
union select group_concat(password) from accounts limit 1
```

Y obtenemos (admin y HereIsYourPassword1431).

Probamos a reutilizar credenciales con el servicio expuesto ssh sau:HereIsYourPassword y obtendremos acceso a la maquina.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/23.png" alt="under" oncontextmenu="return false;">
</div>

<h2 class="amarillo">Escalada</h2>

Para la escalada vemos que no tenemos permisos o privilegios asignado a nivel de sudoers.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/24.png" alt="under" oncontextmenu="return false;">
</div>

Probamos a enumerar por binarios con privilegio SUID

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/25.png" alt="under" oncontextmenu="return false;">
</div>
Pero no encontramos nada asi que seguimos con la enumeracion al sistema

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/26.png" alt="under" oncontextmenu="return false;">
</div>
Vemos que el directorio /opt tiene una aplicacion en python pero enumerando estos archivos no encontramos nada interesante

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/27.png" alt="under" oncontextmenu="return false;">
</div>

Mirando la informacion de puertos abiertos internamente en la maquina con `netstat -nat` vemos el puerto 8000 y el puerto 9666

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/28.png" alt="under" oncontextmenu="return false;">
</div>

Gracias a que estamos con ssh podemos hacer uso de un Local Port Forwarding

```bash
ssh sau@10.129.56.82 -L 8000:127.0.0.1:8000 -L 9666:127.0.0.1:9666
```

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/29.png" alt="under" oncontextmenu="return false;">
</div>
De esta forma podemos acceder desde nuestro navegador al puerto 8000
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/30.png" alt="under" oncontextmenu="return false;">
</div>
Y vemos un panel de autenticacion pyLoad. Haciendo uso del commando `ps -eo command` vemos que alguien en el sistema esta ejecutando `/usr/bin/python3 /usr/local/bin/pyload`

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/31.png" alt="under" oncontextmenu="return false;">
</div>

Entonces mirando la informacion del dueno de este binario vemos que root lo esta ejecutando y que si tratamos de ejecutarlo no podremos hacerlo. Lo que si podemos hacer el leer el contenido del archivo entonces lo revisaremos con cat

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/32.png" alt="under" oncontextmenu="return false;">
</div>

Mas alla de entender como funciona el codigo podemos ver que importa una libreria llamada pyload, por lo tatno se me ocurre mirar la version y vemos pyload 0.5.0
<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/33.png" alt="under" oncontextmenu="return false;">
</div>

Lo primero a intentar sera un exploit encontrado en exploitdb para pyload 0.5.0, rapidamente para lograr esto nos iremos a /dev/shm el cual es un directorio donde tendremos capacidades rwx.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/34.png" alt="under" oncontextmenu="return false;">
</div>

La idea es copiar el script en python haciendo uso de base64 y darle permisos de ejecucion en la maquina.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/35.png" alt="under" oncontextmenu="return false;">
</div>
y vemos que el exploit funciona porque hemos logrado meter el output de un comando "whoami" en el archivo file en la maquina.

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/36.png" alt="under" oncontextmenu="return false;">
</div>
siguiendo este principio le asignamos el privilegio SUID a la bash para poder ejecutarla temporalmente como el propietario haciendo uso de "bash -p"

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/37.png" alt="under" oncontextmenu="return false;">
</div>
Asi habremos completado la maquina PC

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/38.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/PC/pwn3d.png" alt="under" oncontextmenu="return false;">
</div>
