---
title: BountyHunter
layout: page
permalink: /HTB_BountyHunter
---

<h2 class="amarillo">BountyHunter</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/bountyhunter.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina BountyHunter y nos da la dirección ip 10.129.95.166, probamos a entablar conexión con la máquina enviando 5 trazas ICMP.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/1.png" alt="under" oncontextmenu="return false;">
</div>

Vemos que la máquina nos responde y que tenemos un TTL de 63, estamos frente a un Linux.

<h2 class="amarillo">Enumeración</h2>

Para la enumeración hacemos uso de nmap `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.95.166` y vemos únicamente el puerto 22 y 80 abiertos.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/2.png" alt="under" oncontextmenu="return false;">
</div>

Hacemos uso de los parámetros de nmap `-sCV` para identificar la versión y servicio que corren para los puertos 22 y 80.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/3.png" alt="under" oncontextmenu="return false;">
</div>

Tratamos de enumerar las tecnologías que utiliza el sitio web con la herramienta whatweb, pero no vemos nada interesante.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/4.png" alt="under" oncontextmenu="return false;">
</div>

Abrimos la web en el navegador.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/5.png" alt="under" oncontextmenu="return false;">
</div>
Revisando la web un poco y cada apartado que podemos acceder, vemos uno llamado portal que nos muestra una página en construcción.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/6.png" alt="under" oncontextmenu="return false;">
</div>
Al hacer clic nos presenta una página que nos permite reportar CVE:
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/7.png" alt="under" oncontextmenu="return false;">
</div>
Al darle submit, vemos que la información que llenemos en la tabla será representada en la web.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/8.png" alt="under" oncontextmenu="return false;">
</div>
Hacemos la prueba con valores aleatorios.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/9.png" alt="under" oncontextmenu="return false;">
</div>
Podemos probar un ataque de XXE.

<h2 class="amarillo">XXE External Entity Injection + XXE PHP base64File Wrapper</h2>

Capturando la información enviada con submit, vemos una cadena en URL Encode de base64, la cual si revisamos tenemos lo siguiente:
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/9.5.png" alt="under" oncontextmenu="return false;">
</div>
Siguiendo esta estructura podemos probar a realizar una inyección externa de entidades, para hacerlo, el poc es el siguiente:

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY xxe SYSTEM "file:///etc/passwd" >
]>
<bugreport>
  <title>&xxe;</title>
  <cwe>123</cwe>
  <cvss>7.5</cvss>
  <reward>1000</reward>
</bugreport>

```

Vamos a tratar de usar la estructura XML que se esta convirtiendo en base64 como data por POST al endpoint /tracker_diRbPr00f314.php, creando una entidad xxe que nos lea el contenido del archivo /etc/passwd, copiamos el XML con XXE en base64 y los pasamos a URL encode.

<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/10.png" alt="under" oncontextmenu="return false;">
</div>
Nos traemos la respuesta y la vemos en la consola decodificando con base64 -d, pero para poder ver el código php de las páginas del servidor se debe utilizar un wrapper `php://filter/convert.base64-encode/resource=index.php`, pero para descubrir más archivos haremos FUZZING.

<h2 class="amarillo">Fuzzing</h2>

Hacemos Fuzzing con la herramienta de wfuzz `wfuzz -c -t 200 --hc=404 -w /directory-list-2.3-medium.txt -u http://10.129.95.166/FUZZ.php`
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/13.png" alt="under" oncontextmenu="return false;">
</div>

Revisando los archivos que podrían existir con extensión php, vemos (index, portal, db)
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/11.png" alt="under" oncontextmenu="return false;">
</div>
Viendo el código de la página:
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/12.png" alt="under" oncontextmenu="return false;">
</div>
Hacemos uso del wrapper para ver el contenido del archivo db.php ya que puede contener credenciales en texto plano.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/14.png" alt="under" oncontextmenu="return false;">
</div>
BurpSuite nos deja ver en el código fuente de la respuesta del servidor que nos ha devuelto una cadena base64, si la decodificamos veremos el código fuente de db.php
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/15.png" alt="under" oncontextmenu="return false;">
</div>
Vemos unas credenciales atribuidas al usuario 'admin:m19RoAU0hP41A1sTsq6k', pero cuando vimos el /etc/passwd solo el usuario development parece ser activo en el sistema, así que probamos a reutilizar credenciales.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/16.png" alt="under" oncontextmenu="return false;">
</div>
Así nos conectamos por ssh y obtendremos la flag del usuario.

<h2 class="amarillo">Escalada</h2>

Tratamos de buscar privilegios SUID en el sistema `find / -perm -4000 2>/dev/null`, en donde, encontraremos el infame /pkexec pero no lo usaremos. También probamos a buscar por Capabilites de nivel SET-SUID sin resultados.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/17.png" alt="under" oncontextmenu="return false;">
</div>
Revisando si poseemos algún privilegio a nivel de sudoers con sudo -l, veremos la capacidad de ejecutar con python un binario /opt/skytrain_inc/ticketValidator.py:
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/18.png" alt="under" oncontextmenu="return false;">
</div>

Haciendo un análisis del código se ve bien a primera instancia, pero hay una función que llama mucho la atención por que ha sido la causa de muchos problemas de seguridad y es eval().

<h2 class="amarillo">Eval() Background</h2>

Eval() es una función que espera recibir una expresión regular y aplicarla sobre un string en el código ticketer, es decir, que por la naturaleza de eval() de interpretar si el string tiene una correcta sintaxis de python lo ejecutará, en caso contrario y se de un error de sintaxis tendremos un error de compilación.

Eval() solo servirá en cuanto al contexto del script.

Vemos que el script comienza leyendo un archivo .md y debe tener una estructura especial, a partir del análisis del contenido de ticketer llegamos a su abuso:
1. Revisa si el archivo termina en extensión .md.
2. La función evaluate(ticket) recibe nuestro archivo malicioso.md y lo itera siendo i las lineas y x el contenido de cada linea.
3. La primera linea debe comenzar con `# Skytrain Inc` como lo indica la función evaluate() cuando i == 0 para x.startwith().
4. La segunda linea debe comenzar con `## Ticket to `, si es correcto aplica un `continue` para saltar a la tercera linea.
5. Esta linea debe comenzar con `__Ticket Code:__`, y code_line vale None, pero aquí valdría i=2+1=3.
6. Si code_line=3 y i=3 == code_line=3 revisa que la cuarta linea comience con `**`.
7. La sentencia de `ticketCode = x.replace("**". "").split("+")[0]` significa que hay 2 números separados por una suma y está guardando el primero a la izquierda del +.
8. Este número al dividir entre 7 su modulo debe ser igual a 4.
9. Por ultimo, si todas las condiciones se cumplen podremos abusar el eval() con una asignación de SUID a la bash.

Creamos entonces un archivo malicioso.md
```c
# Skytrain Inc
## Ticket to
__Ticket Code:__
** 11 + 2 and __import__('os').system("chmod 4755 /bin/bash")
```

Probamos a ejecutar el script y seremos root.
<div style="text-align: center;">
  <img src="/assets/images/HTB/BountyHunter/19.png" alt="under" oncontextmenu="return false;">
</div>

