---
title: Ciberseguridad 1 - UCP
layout: page
permalink: /ciberseguridadUcp
---

<h2 id="subtitulo-importante">Optativa II Ciberseguridad 1 UCP - Notas prácticas</h2>

La ciberseguridad es el esfuerzo continuo para proteger a las personas, las organizaciones y los gobiernos de los ataques digitales mediante la protección de los sistemas y datos en red contra el uso o daño no autorizados.

La asignatura es 3 horas por trabajo con docente, por tanto debe ser trabajo 6 horas en casa, se harán muchos laboratorios.

<h2 id="subtitulo-importante">Índice</h2>

1. <h1 class="titulo-principal">Introducción a la ciberseguridad</h1>
- [Conceptos básicos](#introducción-a-la-ciberseguridad)
- Tipos y estados de la información
- Tipos de ataques y sus herramientas
- Laboratorios 1 y 2
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
<h2 id="introducción-a-la-ciberseguridad"><h2 id="subtitulo-importante">Modulo 1 - Conceptos Básicos</h2></h2>

<h1 class="titulo-principal">Introducción a la Ciberseguridad</h1>

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
<br>

Los datos personales describen cualquier información sobre usted, incluido su nombre, número de seguro social, número de licencia de conducir, fecha y lugar de nacimiento, nombre de nuestros familiares y amigos. Donde se puede presentar suplantación de identidad.

> **Registros médicos**: Cada vez que visita al médico, la información personal sobre salud y demás queda en los registros médicos electrónicos `EHR` Ya que estos se guardan en línea.

> **Registros educativos**: Calificaciones y logros académicos. Ya que pueden incluir información de contacto.

> **Registros de empleo y financieros**: Ya que se presenta información sobre anteriores empleos incluso evaluaciones de desempeño actuales, y en este historial se puede quizás encontrar información bancaria.



TAREA, descubriendo nuestro comportamiento riesgoso en línea

<hr />

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

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
