---
title: NLP - Notes
layout: page
permalink: /nlp
---

# Optativa 1 - NLP

Esta publicación tiene los apuntes y notas sobre el tema Procesamiento del Lenguaje Natural en Python3 de nivel introductorio donde se presenta el siguiente temario:

La materia está enfocada a la inteligencia artificial y se presentará un componente fuerte en investigación. La idea de la Optativa es solucionar problemas y tratar de darle enfoques de calidad, como resultado de aprendizaje el trabajo se centra en desarrollar habilidades teórico prácticas, y la capacidad de poder conceptualizar los temas con calidad.

El procesamiento del lenguaje como su nombre indica, procesar el lenguaje. El ingeniero debe y tiene que saber gramática, saber escribir, leer y redactar textos.

# Índice
- [Introducción a la Inteligencia Artificial](#introducción-a-la-inteligencia-artificial)
- [NLP En Java](#nlp-en-java)
- [Introducción a Python](#introducción-a-python)
- [Bases NLP](#bases-nlp)
- [NLP - Pipeline](#nlp-pipeline)
- [Text Representation](#text-representation)
- [Text Clasification](#text-clasification)
- [Information Extraction](#information-extraction)
- [Speech recognition and synthesis](#speech-recognition-and-synthesis)
- [Chatbots](#chatbots)
- [Search and Information Retrival](#search-and-information-retrival)
- [Topic Modeling](#topic-modeling)
- [Recommender Systems for Textual Data](#recommender-systems-for-textual-data)

<br>

Para el Procesamiento del lenguaje natural hay que saber de gramática donde la idea es poder combinar el sistema de reglas con Machine Learning usando entrenamientos para hacer seguimientos. Usando reglas y patrones, árboles y semántica se trabaja bastante el tema en el lenguaje de programación Python.

------
# Introducción a la Inteligencia Artificial

## Inicios de la IA

Podemos decir que el tema comienza con un **paper** que introduce conceptos sobre el sistema nervioso, el funcionamiento neural y las contribuciones de Alan Turing, así como la programación computacional.

La inteligencia artificial hizo su aparición en 1943, y Alan Turing realizó contribuciones significativas con su paper "*Computing Machinery and Intelligence*"[^1]. En este trabajo, Turing presentó conceptos innovadores como el aprendizaje automático, los algoritmos genéricos, el aprendizaje por refuerzo, y el famoso *Test de Turing*.

El *Test de Turing* involucra a dos humanos: uno formula preguntas, mientras que un humano y una máquina responden. El objetivo del test es que el entrevistador no pueda distinguir quién respondió, lo que indicaría que la inteligencia artificial ha alcanzado un grado significativo al poder engañar al entrevistador humano. Este concepto fue propuesto por Turing en 1950[^2].

El término *inteligencia artificial* (IA) fue acuñado en 1956 por John McCarthy, quien definió este enfoque como "la ciencia de crear máquinas inteligentes y programas de cómputo inteligentes". Esta idea sirvió como una forma de evaluar el progreso de los algoritmos de IA hasta ese momento[^3].

En **1967**, el *Perceptrón Mark 1* surgió como una implementación de redes neuronales básicas[^4], donde las entradas pasan por un proceso para generar una salida. Este modelo se centra en replicar aspectos de la naturaleza humana: el perceptrón recibe entradas, las procesa a través de neuronas, y con *deep learning* (aprendizaje profundo) la cantidad de neuronas influye en la precisión del sistema, aunque también tiene desventajas y ventajas: mayor precisión requiere más capacidad de procesamiento. Por ejemplo, procesar media página es diferente a procesar 10 páginas.

En el *deep learning*, las redes están formadas por muchas neuronas conectadas entre sí. Hoy en día, hablamos de capas de neuronas, que se comunican para dar una respuesta binaria, como 0 o 1.

En **1980**, surge el concepto de la *Habitación China*, que es la antítesis del *Test de Turing*. Este argumento refuta la idea de que una máquina que pasa el *Test de Turing* tenga inteligencia real. Se afirma que solo simula la inteligencia, sin comprender el contenido semántico, solo el sintáctico.

### Eventos importantes

- **IBM (1997)**: Vence al campeón mundial de ajedrez.
- **IBM (2011)**: Gana en el programa de televisión *Jeopardy*.
- **Minwa (2015)**: Desarrolla sistemas de reconocimiento de imágenes superpotentes.
- **2017**: Nace la base de los generadores de texto modernos, sobre los principios de generación de texto y avances hacia el futuro.

En la actualidad, los sistemas de *Question Answering* (QA) son una de las competencias de IA a desarrollar, junto con los generadores de texto como *GPT*. Estos sistemas ayudan a alimentar grandes corpus de conocimiento, que continúan aprendiendo de manera constante.

La programación funcional, con su uso intensivo de paréntesis, es extremadamente rápida y eficiente en términos de tiempo de ejecución.

### Definiciones y enfoques de la IA

La *Inteligencia Artificial* se define como la rama de la ciencia de la computación que se encarga de automatizar conductas inteligentes. Según Luger (2005), el objetivo de la IA es desarrollar capacidades inteligentes, influenciadas por la filosofía, las matemáticas y la psicología, con un enfoque en la resolución de problemas.

Áreas específicas donde la IA tiene un papel fundamental incluyen la conducción autónoma de vehículos y la medición del rendimiento de sistemas.

No se limita solo a *Python*, la IA abarca múltiples disciplinas.

### Principales enfoques de la IA:

- Robots que piensan como humanos.
- Robots que actúan como humanos.
- Lógica formal y sistemas expertos, como sistemas con sensores para enviar correos electrónicos o detectar enfermedades.
- Agentes inteligentes y asistentes virtuales que actúan racionalmente.

Es importante considerar la palabra "automatización", pero, dado que es un concepto complejo, es mejor hablar de "sistematización" para evitar confusiones.

### Contribuciones desde diversas disciplinas

- **Estadística y probabilidad**: La IA se nutre de estas áreas para hablar en términos científicos y lógicos.
- **Neurociencia**: Aporta a la IA con el estudio de las neuronas, las conexiones y cómo aprenden.
- **Psicología**: Se conecta con la IA a través del estudio de cómo piensan y actúan las personas, ayudando a replicar la conducta humana.
- **Economía**: Contribuye en la toma de decisiones, ya que una máquina debe pensar en beneficios, competidores y el balance entre ellos.

### Áreas principales de la IA:

- Resolución de problemas.
- Representación del conocimiento (cómo se muestra la salida en pantalla).
- Búsquedas.

### Áreas específicas:

- Planificación de tareas (ej. *scheduling* para la organización de productos en contenedores).
- Procesamiento del lenguaje natural.
- Percepción.
- Razonamiento autónomo.

Algoritmos de redes, como los usados en la gestión de tráfico y enrutamiento, son ejemplos de la aplicación de la inteligencia artificial. Conocer y aplicar técnicas adecuadas es esencial.

------
# NLP En Java

------
# Introducción a Python

Durante la asignatura, se utilizará *Flask*. Python es un lenguaje poderoso, interpretado y multiparadigma, con características como datos estructurados, no estructurados, diccionarios, y más. Por ejemplo, el uso de índices `[:-2]`, diccionarios clave-valor (bases de NoSQL), y estructuras de procesamiento de lenguaje natural con listas anidadas.

El uso de `set` y `get` en clases de Python, la sobrecarga de métodos (mismo nombre con diferentes parámetros) también son temas importantes que se cubrirán.

------
# Bases NLP

El conocimiento del lenguaje y sus estructuras es esencial para trabajar con PLN:

- **S**: Oración principal.
- **SN**: Sintagma nominal (grupo de palabras que cumplen la función de sujeto).
- **SV**: Sintagma verbal (grupo de palabras que contiene el verbo y el complemento).
- **SAdj**: Sintagma adjetival (grupo de palabras cuyo núcleo es un adjetivo).
- **SAdv**: Sintagma adverbial (grupo de palabras cuyo núcleo es un adverbio).
- **SPrep**: Sintagma preposicional (grupo de palabras que comienzan con una preposición).

Los elementos clave en una oración son el *sujeto* (quien realiza la acción), el *predicado* (la acción realizada por el sujeto), y el *complemento* (directo, indirecto, circunstancial).

#### Clases de palabras:

- **N**: Sustantivo.
- **V**: Verbo.
- **Adj**: Adjetivo.
- **Adv**: Adverbio.
- **Det**: Determinante.
- **Prep**: Preposición.
- **Conj**: Conjunción.

Durante el curso se trabajarán las bibliotecas **NLTK** y **Spacy**, dividiendo las frases según la función de cada palabra.

------
# NLP - Pipeline

Un *pipeline* de NLP es una serie de pasos que permiten procesar texto de manera estructurada. Estos pasos incluyen la adquisición de datos, limpieza, preprocesamiento, extracción de características, modelado, evaluación y despliegue.

Los pasos más comunes incluyen:

1. **Tokenización**: Dividir el texto en palabras o frases.
2. **Limpieza**: Eliminar mayúsculas/minúsculas, dígitos, signos de puntuación, y normalizar el texto.
3. **POS Tagging**: Etiquetado de las palabras según su función gramatical.
4. **Stop Words**: Eliminar palabras irrelevantes como artículos y preposiciones.
5. **Ingeniería de características**: Detectar elementos relevantes del texto y extraer características importantes.

Un pipeline podría verse así: *tokenización → POS tagging → eliminación de stop words → extracción de características → modelado con machine learning*.

El proceso más extenso de un pipeline es la *ingeniería de características*, que permite dar mayor sentido al texto y extraer información relevante.

Finalmente, la evaluación de modelos se realiza mediante métricas como la precisión (*precision*), el recuerdo (*recall*), y el tiempo de respuesta.

------
# Text Representation

------
## Referencias

[^1]: **Turing, A. M.** (1950). *Computing Machinery and Intelligence*  
[^2]: **Turing, A. M.** (1950). *Ibid*. 
[^3]: **McCarthy, J. et al.** (1956). *Dartmouth Conference Proposal*
[^4]: **Luger, George F.** (2005). *Artificial Intelligence: Structures and Strategies for Complex Problem Solving*

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)

