---
title: OpenAdmin
layout: page
permalink: /HTB_OpenAdmin
---

<h2 class="amarillo">HackTheBox - OpenAdmin WriteUp - Máquina retirada</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/OpenAdmin.png" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la maquina OpenAdmin la cual nos da la dirección IP 10.129.22.86. Seguido vamos a lanzarle 5 trazas ICMP para verificar que la maquina este activa y de paso mediante el TLL identificar si estamos frente a una maquina Linux o Windows.
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/1.png" alt="under" oncontextmenu="return false;">
</div>


Vemos el TLL de 63 por tanto estamos frente a una maquina Linux.

<h2 class="amarillo">Enumeración</h2>

Para comenzar con la fase de enumeración usaremos la herramienta nmap para hacer una enumeración de los puertos que estén abiertos `nmap -p- --open -sS --min-rate -vvv -n -Pn`
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/2.png" alt="under" oncontextmenu="return false;">
</div>


Con la captura de nmap exportada en el archivo allPorts vemos que al pasarla como argumento a la función extractPorts tenemos el puerto 22 y 80
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/3.png" alt="under" oncontextmenu="return false;">
</div>


Con estos puertos podemos pasar a hacer una enumeración exhaustiva para identificar la version y servicio que corren para estos puertos y lanzar una serie de scripts básicos de reconocimiento
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/4.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos que tenemos una pagina web http montada con apache, asi que si tratamos de acceder a la web veremos la pagina por defecto de apache
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/5.png" alt="under" oncontextmenu="return false;">
</div>


Probamos a hacer algo de fuzzing utilizando ffuf para encontrar alguna ruta que nos pueda ser de utilidad para continuar con la resolución de la maquina

```bash
ffuf -w /opt/apps/Tools/SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://10.129.22.86/FUZZ -c -v
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/6.png" alt="under" oncontextmenu="return false;">
</div>


Y encontraremos los directorios **music**
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/7.png" alt="under" oncontextmenu="return false;">
</div>


Accediendo a esta ruta en la web encontraremos una pagina web
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/8.png" alt="under" oncontextmenu="return false;">
</div>


Algo que llama mucho la atención de esta pagina web es que cuenta con un panel de login, pero si hacemos hovering veremos que nos redirige a **/ona**
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/9.png" alt="under" oncontextmenu="return false;">
</div>


Accediendo a este extraño recurso veremos que podremos iniciar sesión como guest:guest
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/10.png" alt="under" oncontextmenu="return false;">
</div>


Analizando un poco este panel administrativo veremos una version v18.1.1 y el servicio que esta desplegando la web se llama OpenNetAdmin. Veremos también información sobre una base de datos
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/11.png" alt="under" oncontextmenu="return false;">
</div>


Al estar como el usuario guest estamos muy limitados, pero podemos probar a conectarnos como admin:admin
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/12.png" alt="under" oncontextmenu="return false;">
</div>


Buscando en la base de datos de exploitdb encontraremos que podemos ejecutar algunos exploits
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/13.png" alt="under" oncontextmenu="return false;">
</div>


El exploit es una petición en un one liner que se aprovecha de xajax para ejecutarnos comandos, en este caso lo adaptaremos para conseguir una consola completamente interactiva
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/14.png" alt="under" oncontextmenu="return false;">
</div>


Ejecutando el exploit obtendremos una pseudoconsola pero para trabajar mas cómodos enviaremos una tty por TCP a nosotros mismos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/15.png" alt="under" oncontextmenu="return false;">
</div>


Una vez nos conectamos hacemos un tratamiento de la tty
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/16.png" alt="under" oncontextmenu="return false;">
</div>


Hacemos un hostname -I y efectivamente estamos dentro de la maquina
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/17.png" alt="under" oncontextmenu="return false;">
</div>


Enumerando un poco los archivos que encontramos del servicio web encontraremos algunas credenciales pero no serán de utilidad
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/18.png" alt="under" oncontextmenu="return false;">
</div>
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/19.png" alt="under" oncontextmenu="return false;">
</div>


Llendo al directorio /opt es curioso encontrar un directorio llamado sql
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/20.png" alt="under" oncontextmenu="return false;">
</div>

<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/21.png" alt="under" oncontextmenu="return false;">
</div>


Después de revisar los archivos y no encontrar nada podemos hacer una búsqueda en la raíz del sistema por archivos que tengan config en el nombre
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/22.png" alt="under" oncontextmenu="return false;">
</div>


Encontramos un database_settings_inc.php en cual nos revela una credencial muy interesante
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/23.png" alt="under" oncontextmenu="return false;">
</div>

**n1nj4W4rri0R!**

Probamos a enumerar la base de datos en busca de información
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/24.png" alt="under" oncontextmenu="return false;">
</div>


A pesar de tener la tabla users no vemos información de usuarios
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/25.png" alt="under" oncontextmenu="return false;">
</div>


Haciendo un ls al directorio /home encontramos que existen los usuarios jimmy y joanna
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/26.png" alt="under" oncontextmenu="return false;">
</div>


Reutilizando la credencial que encontramos pudimos conectarnos como jimmy, y este usuario en su directorio personal contaba con un directorio .ssh

00e302ccdcf1c60b8ad50ea50cf72b939705f49f40f0dc658801b4680b7d758eebdc2e9f9ba8ba3ef8a8bb9a796d34ba2e856838ee9bdde852b8ec3b3a0523b1
Revealed

<h2 class="amarillo">Escalada</h2>

Para la escalada comenzamos enumerando los puertos que puedan estar internamente expuestos con algún servicio que nos pueda ser de utilidad para escalar privilegios. Y vemos con netstat -nat el puerto 52846
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/27.png" alt="under" oncontextmenu="return false;">
</div>


Hacemos un LocalPortForwarding del puerto 52846 para traerlo a nuestra maquina y vemos un login
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/28.png" alt="under" oncontextmenu="return false;">
</div>


Ingresando las credenciales que ya tenemos, la pagina nos permitió listar el contenido de una clave ssh encriptada y nos dice que no nos olvidemos de la ninja password
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/29.png" alt="under" oncontextmenu="return false;">
</div>

```
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,2AF25344B8391A25A9B318F3FD767D6D

kG0UYIcGyaxupjQqaS2e1HqbhwRLlNctW2HfJeaKUjWZH4usiD9AtTnIKVUOpZN8
ad/StMWJ+MkQ5MnAMJglQeUbRxcBP6++Hh251jMcg8ygYcx1UMD03ZjaRuwcf0YO
ShNbbx8Euvr2agjbF+ytimDyWhoJXU+UpTD58L+SIsZzal9U8f+Txhgq9K2KQHBE
6xaubNKhDJKs/6YJVEHtYyFbYSbtYt4lsoAyM8w+pTPVa3LRWnGykVR5g79b7lsJ
ZnEPK07fJk8JCdb0wPnLNy9LsyNxXRfV3tX4MRcjOXYZnG2Gv8KEIeIXzNiD5/Du
y8byJ/3I3/EsqHphIHgD3UfvHy9naXc/nLUup7s0+WAZ4AUx/MJnJV2nN8o69JyI
9z7V9E4q/aKCh/xpJmYLj7AmdVd4DlO0ByVdy0SJkRXFaAiSVNQJY8hRHzSS7+k4
piC96HnJU+Z8+1XbvzR93Wd3klRMO7EesIQ5KKNNU8PpT+0lv/dEVEppvIDE/8h/
/U1cPvX9Aci0EUys3naB6pVW8i/IY9B6Dx6W4JnnSUFsyhR63WNusk9QgvkiTikH
40ZNca5xHPij8hvUR2v5jGM/8bvr/7QtJFRCmMkYp7FMUB0sQ1NLhCjTTVAFN/AZ
fnWkJ5u+To0qzuPBWGpZsoZx5AbA4Xi00pqqekeLAli95mKKPecjUgpm+wsx8epb
9FtpP4aNR8LYlpKSDiiYzNiXEMQiJ9MSk9na10B5FFPsjr+yYEfMylPgogDpES80
X1VZ+N7S8ZP+7djB22vQ+/pUQap3PdXEpg3v6S4bfXkYKvFkcocqs8IivdK1+UFg
S33lgrCM4/ZjXYP2bpuE5v6dPq+hZvnmKkzcmT1C7YwK1XEyBan8flvIey/ur/4F
FnonsEl16TZvolSt9RH/19B7wfUHXXCyp9sG8iJGklZvteiJDG45A4eHhz8hxSzh
Th5w5guPynFv610HJ6wcNVz2MyJsmTyi8WuVxZs8wxrH9kEzXYD/GtPmcviGCexa
RTKYbgVn4WkJQYncyC0R1Gv3O8bEigX4SYKqIitMDnixjM6xU0URbnT1+8VdQH7Z
uhJVn1fzdRKZhWWlT+d+oqIiSrvd6nWhttoJrjrAQ7YWGAm2MBdGA/MxlYJ9FNDr
1kxuSODQNGtGnWZPieLvDkwotqZKzdOg7fimGRWiRv6yXo5ps3EJFuSU1fSCv2q2
XGdfc8ObLC7s3KZwkYjG82tjMZU+P5PifJh6N0PqpxUCxDqAfY+RzcTcM/SLhS79
yPzCZH8uWIrjaNaZmDSPC/z+bWWJKuu4Y1GCXCqkWvwuaGmYeEnXDOxGupUchkrM
+4R21WQ+eSaULd2PDzLClmYrplnpmbD7C7/ee6KDTl7JMdV25DM9a16JYOneRtMt
qlNgzj0Na4ZNMyRAHEl1SF8a72umGO2xLWebDoYf5VSSSZYtCNJdwt3lF7I8+adt
z0glMMmjR2L5c2HdlTUt5MgiY8+qkHlsL6M91c4diJoEXVh+8YpblAoogOHHBlQe
K1I1cqiDbVE/bmiERK+G4rqa0t7VQN6t2VWetWrGb+Ahw/iMKhpITWLWApA3k9EN
-----END RSA PRIVATE KEY-----
```

Usando ssh2john podemos pasarle la clave RSA para obtener el HASH que podemos crackear con john o hashcat diciéndole `ssh2jonh id_rsa`
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/30.png" alt="under" oncontextmenu="return false;">
</div>


Probamos a romper el hash con john `johm -w=/opt/apps/rockyou.txt hash_id_rsa`
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/31.png" alt="under" oncontextmenu="return false;">
</div>


Y vemos que la contraseña es *bloodninjas*

Con la contraseña podremos loguearnos como el usuario joanna y ejecutando sudo -l veremos que tenemos privilegios al ejecutar nano
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/32.png" alt="under" oncontextmenu="return false;">
</div>


Hay una forma de escapar del contexto de nano para ejecutar comandos y asi seremos root en la maquina
<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/33.png" alt="under" oncontextmenu="return false;">
</div>


<div style="text-align: center;">
  <img src="/assets/images/HTB/OpenAdmin/34.png" alt="under" oncontextmenu="return false;">
</div>
