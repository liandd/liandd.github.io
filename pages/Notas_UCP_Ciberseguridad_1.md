---
title: Ciberseguridad 1 - UCP
layout: page
permalink: /Notas_UCP_Ciberseguridad_1
---

<h2 id="subtitulo-importante">Optativa II Ciberseguridad 1 UCP - Notas prácticas</h2>

La ciberseguridad es el esfuerzo continuo para proteger a las personas, las organizaciones y los gobiernos de los ataques digitales mediante la protección de los sistemas y datos en red contra el uso o daño no autorizados.

La asignatura es 3 horas por trabajo con docente, por tanto debe ser trabajo 6 horas en casa, se harán muchos laboratorios.

<h2 id="subtitulo-importante">Índice</h2>

1. <h1 class="titulo-principal">Introducción a la ciberseguridad</h1>
- [Conceptos básicos](#introducción-a-la-ciberseguridad)
- [Tipos y estados de la información](#tipos-y-estados-de-la-información)
- [Tipos de ataques y sus herramientas](#tipos-de-ataques-y-sus-herramientas)
- [Laboratorios 1 y 2](#laboratorio-1-y-2)
<br>
2. <h1 class="titulo-principal">Ataques, conceptos y técnicas</h1>
- [Analizando un ciberataque](#analizando-un-ciberataque)
- Tipos de ataques
- Métodos de infiltración e ingeniería social
- Clasificación de vulnerabilidades
-  Laboratorios 3 y 4
<br>
3. <h1 class="titulo-principal">Protegiendo el perímetro de red</h1>
- Dispositivos y tecnologías de seguridad
- Seguridad basada en el comportamiento
- Herramientas para la prevención y detección
- Laboratorios 5 y 6
<br>
4. <h1 class="titulo-principal">Herramientas de monitoreo</h1>
- Centro de operaciones de seguridad SOC
- Centro de operaciones de red NOC
- Acceso remoto SSH
- Sincronización de infraestructura
- Herramientas de monitoreo SYSLOG, SPAN
- Laboratorios 7, 8 y 9
<br>
5. <h1 class="titulo-principal">Tecnologías de Firewall</h1>
- Tecnologías de Firewall: Software y Hardware basado en contexto
- Filtrado de paquetes
- Laboratorio 10
<br>
6. <h1 class="titulo-principal">Proyecto de asignatura</h1>
- Estudio de caso

<hr />
<h2 id="introducción-a-la-ciberseguridad"><h2 id="subtitulo-importante">Modulo 1 - Introducción a la Ciberseguridad</h2></h2>

<h1 class="titulo-principal">Conceptos Básicos</h1>

La ciberseguridad bajo el contexto en Colombia, la palabra involucra todos los esfuerzos, actividades, experiencia que se ponen a disposición de promover la seguridad informática, que mis sistemas involucrando infraestructura, software, empleados...etc esten seguros. Proteger todo de los ataques, y para nadie es un secreto que la industria de los Hackers genera mucho dinero y trabajan en grupos grandes como organizaciones. Ellos mismos muestran sus ganancias y revelan sus actividades.

Es importante resaltar que el tema puede tener una repercusión de ansiedad, ya que las herramientas y el conocimiento no son los malos, son aquellas personas que en el corazón les nace hacer estas cosas. Solo el corazón y la ética puede determinarlo.

Todo esto es para la protección de los sistemas pero, para esto **es de importancia saber ¿Cómo atacar?**. Las herramientas son para poder defender de aquellos ataques que puedan sufrir nuestras organizaciones. Lo importante es que podamos hacer uso de las herramientas en los casos y situaciones que se nos presenten. Y no podemos dejarles en bandeja de plata a los agentes externos nuestra infraestructura y datos corporativos. Debemos proteger nuestros datos, los clientes y la organización.

Los incidentes de ciberseguridad traen consigo daños a una empresa en su reputación y se quiebran. Los daños son (Personal, Organizativo, Gobiernos, Entidades públicas).

El `ColCERT de Mintic`, es el equipo de respuestas de ciberseguridad de Colombia, Grupo de respuestas a emergencias cibernéticas. Se les puede contactar para pedir ayuda si un caso es muy critico y la empresa entra en pánico.

`Mitre` presenta técnicas, tácticas, y procedimientos ya documentados y el plan de acción para los distintos ataques que puede recibir una organización.

<strong>Visita estas páginas:</strong>

- <a href="https://wwww.colcert.gov.co"><strong><em style="color: #559;">ColCERT</em></strong></a>
- <a href="https://attack.mitre.org"><strong><em style="color: #559">Mitre</em></strong></a>
- <a href="https://wwww.sans.org"><strong><em style="color: #559">Sans</em></strong></a>
- <a href="https://caivirtual.policia.gov.co"><strong><em style="color: #559">CaiVirtual</em></strong></a>
- <a href="https://wwww.ccit.org.co"><strong><em style="color: #559">Ccit</em></strong></a>
- <a href="https://nvd.nist.gov"><strong><em style="color: #559">Nist US</em></strong></a>

---
<h2 id="tipos-y-estados-de-la-información"><h2 id="subtitulo-importante">Tipos y estados de la información</h2></h2>
<h1 class="titulo-principal">Protegiendo nuestros datos personales</h1>

Debemos proteger nuestros datos pero *¿Cuáles son?*, información personal, información financiera, información académica y todo lo relacionado con historias clínicas, información educativa relacionado con la academia. Incluso entidades bancarias comos <a href="https://www.datacredito.com.co" style="color: #559999">Datacredito</a> existen para almacenar un historial financiero de cada persona con fines lucrativos. Los Hackers pueden tener acceso a sus datos personales a través de estos registros. Por lo que se puede presentar altas tazas de suplantación de identidad o recolección de información. Conocido como **Inteligencia de fuentes abiertas** o **OSINT**.

<h3 class="titulo-secundario">¿Dónde están nuestros datos?</h3>

De las fotos, de nuestras redes sociales, lo que comentamos, publicamos y compartimos en internet con amigos y familia. Pueden ser fuentes valiosas de información para los agentes externos mediante ingeniería social.

Hay tres niveles de protección:

> **Telepresencia**: A nivel personal, debe proteger su identidad, sus datos, y sus dispositivos informáticos.

>  **Organizacional**: A nivel corporativo, es responsabilidad de todos proteger la reputación, los datos y los clientes de la organización.

> **Gobierno**: A medida que se recopila y comparte más información digital, su protección se vuelve aún mas vital a nivel gubernamental, donde la seguridad nacional, la estabilidad económica y la seguridad y el bienestar de los ciudadanos están en juego.

Los datos personales son cualquier información que se puede utilizar para identificarlo y puede existir tanto fuera de línea como en línea.

Muchas personas creen que si no tienen una o ninguna cuenta en redes sociales o en línea, entonces no tienen unan identidad en línea. Este no es el caso. Si usa la web, tiene una identidad en línea.

En base a nuestra identidad en línea, como primer día de trabajo debemos elegir un nombre de usuario

- **jdoe1990**
- **Jdoe.es**
- **j.doe12**
- **jane.doe**
- **jdoe**
<br><br>
<details><summary><strong><em>Respuestas correctas</em></strong></summary><h3 class="titulo-secundario"><strong>jdoe y j.doe12</strong></h3></details>
<hr />
<h2 id="tipos-de-ataques-y-sus-herramientas"><h3 class="titulo-principal">Tipos donde pueden haber ataques</h3></h2>
Los datos personales describen cualquier información sobre usted, incluido su nombre, número de seguro social, número de licencia de conducir, fecha y lugar de nacimiento, nombre de nuestros familiares y amigos. Donde se puede presentar suplantación de identidad.

> **Registros médicos**: Cada vez que visita al médico, la información personal sobre salud y demás queda en los registros médicos electrónicos `EHR` Ya que estos se guardan en línea.

> **Registros educativos**: Calificaciones y logros académicos. Ya que pueden incluir información de contacto.

> **Registros de empleo y financieros**: Ya que se presenta información sobre anteriores empleos incluso evaluaciones de desempeño actuales, y en este historial se puede quizás encontrar información bancaria.


<h3 class="titulo-secundario">Robo de identidad</h3>

No contentos con robar su dinero para obtener ganancias financieras a corto plazo, los ciberdelincuentes invierten en la ganancia a largo plazo del robo de identidad. Como robo medico o bancario.
Pero no solo los agentes de amenaza quieren nuestros datos, también tenemos:

> Proveedor de servicios de Internet (ISP): Hace un seguimiento a nuestra actividad en línea y, en algunos países, se puede vender esta información a los anunciantes.

> Anunciantes: Es la publicidad dirigida y esta hace parte de Internet. Los anunciantes monitorean y rastrean (Hábitos de compra, preferencias personales, anuncios).

> Motores de búsqueda y plataformas de redes sociales: Recopilan información acerca de género, geolocalización, número de teléfono e ideologías políticas. También es vendida con fines de lucro.

> Sitios web que visitamos: Mediante sus cookies para rastrear las actividades con el fin de brindar una experiencia más personalizada. Pero esto deja un rastro de datos que está vinculado a nuestra identidad en línea.

Cada vez los agentes de amenaza son más sofisticados en su búsqueda de datos valiosos, esto representa problemas a los datos corporativos y de nuestras organizaciones.

<hr />

Antes de comenzar a implementar las mejores prácticas para proteger los datos de la organización, debemos saber de qué se trata.

<h1 class="titulo-principal">Estados de la información</h1>

Tenemos por una parte **Datos tradicionales** que suelen ser generados y mantenidos por todas las organizaciones, grandes y pequeñas.

1. **Datos transaccionales**, como detalles relacionados con la compra y venta, actividades de producción y operaciones organizativas básicas, como cualquier información para tomar decisiones de empleo.
2. **La propiedad intelectual**, como patentes, marcas registradas y planes de productos nuevos, permite a una empresa obtener una ventaja económica sobre sus competidores. Todo se debe a que información es confidencial y secreto.
3. **Datos financieros**, como las declaraciones de ingresos, los balances y las declaraciones de flujo de caja. Ya que brinda información sobre el estado de la empresa.
<br><br>
Por otro lado, la IoT es una gran red de objetos físicos, como sensores, software y otro equipos. Todos están conectados a internet, con la capacidad de recopilar y compartir datos. Y dado que las opciones de almacenamiento se están expandiendo a través de la nube se habla hoy día de Big Data.

<h1 class="titulo-principal">El Cubo</h1>

El McCumber Cube es un marco modelo creado por John McCumber en 1991 para ayudar a las organizaciones a establecer y evaluar iniciativas de seguridad de la información. Este modelo tiene tres dimensiones.

1. Los principios fundamentales para proteger los sistemas de información
2. La protección de la información en cada uno de sus estados posibles
3. Las medidas de seguridad utilizadas para proteger los datos

*Los principios fundamentales* para proteger la información:

**Confidencialidad, integridad, Disponibilidad**.

> **Confidencialidad**: Es un conjunto de reglas que evita que la información sensible sea revelada a personas no autorizadas, espacios, recursos y procesos. Los métodos utilizados para garantizar la confidencialidad está el *Cifrado de Datos*, la *Autenticación* y el *Control de Acceso*.

> **Integridad**: Garantiza que la información o los procesos del sistema estén protegidos contra modificaciones intencionales o accidentales. Una forma de garantizar la integridad de los datos es usar funciones Hash o sumas de comprobación como MD5, SHA256.

> **Disponibilidad**: Significa que los usuarios autorizados pueden acceder a los sistemas y datos cuando y donde sea necesario y aquellos que no cumplen con las condiciones establecidas, no lo son. (Mantenimiento del equipo, reparaciones de Hardware, sistemas operativos actualizados y copias de seguridad)

*La protección de información en cada estado* se compone de **Procesamiento, Almacenamiento, Transmisión**.

Con el procesamiento nos referimos a los dato que se utilizan para realizar una operación con la actualización de un registro de base de datos. En el almacenamiento hablamos de los datos en memoria o un dispositivo permanente de almacenamiento, HDD o SSD. Y las transmisión se refiere a los datos que viajan entre sistemas de información.

*Las medidas de seguridad para proteger los datos* son **Awareness, capacitación y educación**, **Tecnología** y **Política y procedimiento**.

> La concientización es la medida implementada por una empresa para garantizar que los usuarios estén informados sobre posibles amenazas de seguridad y como pueden actuar para mantener los sistemas y la organización segura.

> La tecnología se refiere a las soluciones basadas en Software y Hardware diseñadas para proteger los sistemas comos los `Firewalls`, que monitorean continuamente la red en busca de incidentes.

> La política y el procedimiento son los controles administrativos que proporcionan una base para la forma en que una organización tiene planes de respuestas a incidentes y mejores practicas. 

Frente a un correo electrónico fraudulento, que se puede identificar como **Phising**?
- Lengua, ortografía y gramática
- Nombre del cliente
- Gráficos
- URL del enlace
- Dirección de correo electrónico
<br><br>
<details><summary><strong>Respuestas correctas</strong></summary><h3 class="titulo-secundario">Lengua, ortografía y gramática. <br> Gráficos. <br> URL del enlace. <br> Dirección de correo electrónico.</h3></details><br>

El <em>Phising</em> es muy común y, a menudo funciona. Por ejemplo, en agosto 2020, la marca <strong>Razer</strong> sufrió una violación de datos que expuso la información personal de aprox 100000 clientes. Se descubrió que un clúster en la nube estaba `mal configurado y expuso un segmento de la infraestructura` de <strong>Razer</strong> a la Internet pública. <strong>Razer</strong> tardo tres semanas en 'proteger' la instancia en la nube del acceso público pero los agentes de amenaza ya se habían hecho con la información.

Este tipo de situación se esta haciendo muy común y son graves, tenemos como ejemplo la <em>BotNet Persirai</em> de 2017, que afectaba a 'IoT y más de 1000 cámaras de Protocolo Internet IP', `con puertos abiertos permitía la ejecución remota de comandos RCE`, este malware se ejecutaba desde **memoria** y se usó mayormente para causar *ataques de denegación de servicios *Dos/DDoS*.* Tenemos también el caso de Equifax en 2017 una empresa de informes crediticios de USA que sufrió un evento de violación de datos `mediante una vulnerabilidad web`. La empresa creó un dominio para que los clientes verificaran si habían sufrido robo de datos pero los agentes de amenaza aprovecharon y crearon dominios similares y hubo robo de datos.

Siempre hay que estar al tanto de no usar sitios web no autorizados y al cuidado de la información que se proporciona a través de Internet.

Estos ejemplos muestran que las posibles consecuencias de una violación de la seguridad pueden ser graves.

> **Daño a la reputación**: Una violación puede tener un impacto negativo a largo plazo en la reputación de una organización que ha tardado años en construirse. En caso de haber clientes afectados deberán ser notificados y solicitar una compensación o recurrir a un competidor confiable y seguro.

> **Vandalismo**: Un hacker puede vandalizar un sitio web de una organización publicando información falsa. Incluso pueden hacer algunas modificaciones menores en el número de teléfono o la dirección de la organización y son cambios difíciles de detectar.

> **Robo**: La información comprometida se puede hacer pública o la pueden explotar en sobornos por dinero.

> **Pérdida de ingresos**: Un agente de amenaza puede eliminar por completo todo el sitio web y evitar que esta siga operativa. Así la empresa no vende, no crece y se puede enfrentar a multas y sanciones.

> **Propiedad intelectual dañada**: Puede afectar si el negocio o organización es competitivo en el mercado ya que se pueden filtrar patentes, documentos confidenciales, secretos comerciales y toda la propiedad intelectual.

A pesar de las mejores intenciones y de todas las salvaguardas es imposible defenderse de todos los ciberataques, los agentes de amenaza están constantemente encontrando nuevas formas de atacar y, eventualmente, tendrán éxito.
<h3 class="titulo-secundario">Nosotros como profesionales de ciberseguridad debemos saber como responder rápidamente.</h3>
<hr />
<h2 id="laboratorio-1-y-2"><h2 id="subtitulo-importante">Lab 1 ¿Quién posee sus datos?</h2></h2>
<h3 class="titulo-principal">Parte 1</h3>
Revisar los términos y condiciones y responder unas preguntas.

1.¿Tiene una cuenta con una proveedor de servicios en línea? Si es así, ¿ha leído el acuerdo de los términos de servicio?
<details><summary>Respuesta</summary>Si, con icloud hay transparencia en como funciona sus aplicaciones y su servicio en la nube. El como comparte su información en servidores de terceros para alojamiento de datos y las restricciones y procedimientos a realizar para usuarios menores de edad.</details>
<br> 
2.¿Cuál es la política de uso de datos? 
 <details><summary>Respuesta</summary>Aplica tarifas y requiere de uso de licencias de terceros las cuales deben ser aceptadas.</details>
 <br> 
3.¿Cuáles son las configuraciones de privacidad? 
<details><summary>Respuesta</summary>Apple se reserva el derecho de determinar en cualquier momento si el contenido es apropiado y se ajusta a lo previsto en este contrato (trasladar, rechazar, modificar, eliminar contenido en cualquier momento) sin notificación previa y a entera discreción.</details>
<br> 
4.¿Cuál es la política de seguridad? 
 <details><summary>Respuesta</summary>Si se desea, se puede habilitar la encriptación de punto a punto para proteger aún más categorías adicionales de los datos en icloud.</details>
 <br> 
5.¿Cuáles son sus derechos en relación con sus datos? ¿Puede solicitar una copia de sus datos? 
 <details><summary>Respuesta</summary>Si, con icloud se puede acceder a una copia de nuestros datos y si no se hace una copia en 180 días Apple eliminara que fueron creadas periódicamente en icloud.</details>
 <br> 
6.¿Qué puede hacer el proveedor con los datos que usted carga? 
<details><summary>Respuesta</summary>Si, con icloud hay transparencia en como funciona sus aplicaciones y su servicio en la nube. El como comparte su información en servidores de terceros para alojamiento de datos y las restricciones y procedimientos a realizar para usuarios menores de edad.</details>
<br> 
7.¿Qué sucede con sus datos cuando cierra su cuenta? 
<details><summary>Respuesta</summary>Si la persona muere y Apple recibe el certificado de defunción se cancelara la cuenta y se eliminar todo el contenido. Apple se reserva el derecho en caso de evaluar contenido proporcionado por terceros de determinar si el contenido es ajustado a lo previsto y sin notificación previa eliminar contenido.</details>

<h3 class="titulo-principal">Parte 2: ¿Sabe a qué se suscribió?</h3>
Luego de haber creado una cuenta y aceptado las Condiciones del servicio, ¿sabe realmente a qué se suscribió?. En la parte 2, explorará cómo los proveedores pueden interpretar y utilizar las Condiciones de servicio. 

> Utilice Internet para buscar información sobre cómo se interpretan las Condiciones del servicio. A continuación se encuentran algunos artículos de ejemplo para comenzar.

Haz click aquí -> <a href="http://www.americanbar.org/publications/law_practice_today_home/law_practice_today_archive/april12/haveattorneys-read-the-icloud-terms-and-conditions.html"><strong><em style="color: #559">iCloud</em></strong></a>

Revise el artículo y responda las siguientes preguntas. 
1. ¿Qué puede hacer para protegerse, proteger su cuenta y proteger sus datos?  
  <details><summary>Respuesta</summary>Se puede realizar una encriptación de los datos para proteger lo almacenado en icloud.</details>
<hr />
<h2 id="subtitulo-importante">Lab 2 Reflexión Sobre comportamiento riesgoso en línea</h2>

2 puntos es bastante seguro, el compartir artículos y noticias por filtro de a quien se decide compartir ya es un comportamiento muy minucioso por parte de un usuario en cuanto su privacidad.

---

Modelos de servicio en la nube frente a servicio en físico llamado 'On premise vs cloud'.
Retomando hay un porcentaje entre el 20/80 de amenazas externas y externas

Guerra cibernetica es básicamente mediante gusanos, virus y sabotajes contra el poder de otros países. Stuxnet fue un auge y ha sementado un comienzo en virus y programas de espionaje y obstaculizan avances de potencias armamentistas. Es curioso como muchos de estos temas son tratados en películas y series. Otro propósito es impactar en la infraestructura y evitar avances.
<hr />

<h2 id="analizando-un-ciberataque"><h2 id="subtitulo-importante">Modulo 2 Ataques, conceptos y técnicas</h2></h2>

Hay una clasificación en los diferentes ataques que existen:

- Malware
- Reconocimiento
- Acceso
- Dos / Ddos
- Ingeniería Social
<br><br>
Todo el Malware es el código malicioso, ejemplo el Spyware que hace espionaje en la plataforma o sistema operativo. El Adware son las ventanas emergentes llamando la atención al usuario haciendo que haga click en donde no debe. Luego tenemos el Backdoor o 'puerta trasera' que funciona en segundo plano, es difícil de detectar y permite persistencia al atacante a la máquina, empresa o organización.

El virus requiere intervención del usuario pero el gusano no, ese se auto reproduce, una forma muy curiosa para detectar patrones de posible infección por virus es el análisis de PID para saber procesos desconocidos.

Entran todos los troyanos, keyloggers.

## Reconocimiento
Es muy utilizado para obtener información no actualizadas, topologias de red, servicios web y vulnerabilidades. Puede ser mediante la web y técnicas de OSINT para obtener información del objetivo.

Internet information queries (OSINT) -> Inteligencia de fuente abierta
Ping Sweeps - NMAP
Port Scans - NMAP
Packet Sniffer - Wireshark, TCPDUMP
El 80% de las amenazas son internas, y con herramientas como NMAP un agente puede hacer reconocimiento de nuestra información.

Una herramienta para OSINT, es WHOIS y por consola está WFUZZ, GOBUSTER. Cuando una persona cae en el PHISING y es redireccionado a la pagina del atacante cae en FARMING donde con herramientas como Cisco Talos para averiguar sobre la web (reputación, dominios, IP).

### Caso de estudio Proyecto asignatura

Para comfamiliar, debemos hacer toda la infraestructura de ciberseguridad. Nos dan todos los permisos y parámetros describiéndonos la infraestructura de red.

#### VLans y enrutamiento (SIMULACIÓN)

Hay diferentes tipos de vlan para separar los canales de datos. (Datos, voz IP, Administrativa, Usuarios, Nativa es exclusiva para los enlaces truncales). Para separar los canales de conexión mediante una segmentación. Se puede hacer mediante un algoritmo de enrutamiento. Los puertos .1 y .24 son truncales y están establecidos por defecto.

Se hace una separación entre las Vlans y la #1 no se usa por seguridad. Vlan de parking y están apagados por defecto.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
