---
title: Guia Instalacion de Arch Linux  
layout: page
permalink: /Misc_Guía_Instalación_Arch_Linux
---
<h2 id="subtitulo-importante">Entorno Arch</h2>

<div style="text-align: center;">
  <img src="/assets/images/GuiaArch/entorno.png" alt="under" oncontextmenu="return false;">
</div>

Esta publicación tiene la guía de instalación de Arch Linux, suponiendo que ya se ha lanzado su instalador y ya ha sido quemado en un USB Booteable, o una máquina virtual.

Se han configurado atajos de teclado optimizados para agilizar el flujo de trabajo, asignando comandos a combinaciones de teclas para realizar acciones rápidas y sencillas.

<h2 id="subtitulo-importante">Índice</h2>

- [Introducción](#introducción)
- [Bootear la iso de Arch Linux](#bootear-la-iso-de-arch-linux)
- [Distribución de teclado](#distribución-de-teclado)
- [Conectarse a Internet](#conectarse-a-internet)
- [IWD](#iwd)
- [Tips para la terminal](#tips-para-la-terminal)
- [Probando la conexión a internet](#probando-la-conexión-a-internet)
- [Partición de discos con cfdisk](#partición-de-discos-con-cfdisk)
- [Formatear las particiones](#formatear-las-particiones)
- [Montar el sistema de archivos](#montar-el-sistema-de-archivos)
- [Instalar el sistema base](#instalar-el-sistema-base)
- [Fstab](#fstab)
- [Migración a root (Entrar en nuestro sistema instalado)](#migración-a-root-entrar-en-nuestro-sistema-instalado)
- [Zona horaria](#zona-horaria)
- [Localización](#localización)
- [Keymap](#keymap)
- [Hostname](#hostname)
- [Contraseña de root](#contraseña-de-root)
- [Agregar un usuario (Con privilegios de root)](#agregar-un-usuario-con-privilegios-de-root)
- [Contraseña de nuestro usuario](#contraseña-de-nuestro-usuario)
- [Configuración de sudo](#configuración-de-sudo)
- [Habilitar los servicios/demonios](#habilitar-los-serviciosdemonios)
- [Configuración de Grub](#configuración-de-grub)
- [Saliendo del instalador de Archiso](#saliendo-del-instalador-de-archiso)
- [Arrancando/Booting en nuestra instalación](#arrancandobooting-en-nuestra-instalación)
- [Probando la conexión a internet 2](#probando-la-conexión-a-internet-2)
- [Instalación parcial de nuestro gestor de ventanas BSPWM](#instalación-parcial-de-nuestro-gestor-de-ventanas-bspwm)
- [Instalación de paquetes adicionales](#instalación-de-paquetes-adicionales)
- [Arrancar entorno gráfico](#arrancar-entorno-gráfico)
- [Ufetch -> (neofetch alternative)](#ufetch-neofetch-alternative)

------
<h1 id="introducción" class="titulo-principal">Introducción</h1>

Para la instalación de nuestro sistema Arch Linux debemos contemplar el entorno donde se instalará el sistema, bien sea una máquina virtual o de forma nativa. 

> Para esta guía se hará de forma nativa la instalación del sistema Arch Linux.

Una vez arrancado el sistema estaremos frente a una consola interactiva, ahí sabremos que podremos comenzar con la instalación.

----
<h1 id="bootear-la-iso-de-arch-linux" class="titulo-principal">Bootear la iso de Arch Linux</h1>

Este apartado es único en caso de querer instalar Arch Linux de forma nativa. De no ser el caso, lo aconsejable es continuar con la [Distribución de teclado](#distribución-de-teclado). 

> La instalación de Arch Linux de forma nativa requiere unos pasos adicionales.

Para bootear la iso del sistema Arch es tan cómodo como instalar la iso de la [página oficial](https://archlinux.org/download/). Una vez instalada usando programas como [Rufus](https://rufus.ie/es/) o [AnyBurn](https://anyburn.com/download.php) podremos grabar la iso en una memoria USB (Recomendable superior a los 8 GB).

Después de instalar la iso en la memoria USB, habrá que apagar la máquina, insertar la memoria y rápidamente en el apartado de **Boot Device** seleccionar la memoria USB. De esta forma comenzará la instalación y tendremos en pantalla una consola interactiva.
### Máquina virtual

En caso contrario, de que quisiéramos ejecutar nuestro sistema Arch Linux en una maquina virtual. Después de descargar la iso, procedemos a abrirla con VmWare o VirtualBox.

Los pasos para la creación de la maquina virtual son los siguientes:

1. Typical recommended.
2. Seleccionar la iso de Arch.
3. Donde dice Guess operating System, seleccionar Linux.
4. Elegir un nombre para la Máquina virtual.
5. Podemos asignar 80 GB para nuestra máquina.
6. Y seleccionamos "Store virtual disk as a single file".
7. Next.
8. Y en "Customize Hardware" le asignamos la RAM Y CPU que consideremos oportunos.
9. **Importante** en NetworkAdapter seleccionar Bridged y Replicate physical connection state.
10. De esta forma por DHCP el router asignara una dirección IP a la máquina.

Después de configurar el entorno para máquina virtual o de forma nativa, o siguiente sera encender el sistema. Esperamos a que arranque ya que nos otorgara una consola interactiva para comenzar la instalación a nivel de sistema.

-----
<h1 id="distribución-de-teclado" class="titulo-principal">Distribución de teclado</h1>

Muy bien, lo primero a configurar es la distribución de teclado debido a que Arch Linux en su configuración por defecto usa el teclado inglés `US LAYOUT`, sí usamos una distribución de teclado en español tenemos las siguientes opciones:

- la-latin1
- es

> Lo recomendable es probar con ambos **Layouts** para estar seguros con la distribución de teclado. Siendo *la-latin1* la correspondiente para teclados latinoamericanos, ya que el teclado "*es*" es propio de España, ya que tiene algunos caracteres especiales en su distribución. 

De manera que para aplicar los cambios debemos de escribir el siguiente comando: 

```bash
loadkeys la-latin1
```
-----
<h1 id="conectarse-a-internet" class="titulo-principal">Conectarse a Internet</h1>

Hay 2 formas de conectarse a Internet, la primera es mediante un cable Ethernet y la segunda haciendo uso de nuestra tarjeta Wifi.

### Cable Ethernet

> Si disponemos de una conexión mediante cable Ethernet, no tendremos que hacer mucho, simplemente conectar el cable a la máquina y podremos continuar con la instalación en [Tips para la terminal](#tips-para-la-terminal).

<h1 id="iwd" class="titulo-principal">IWD</h1>

Si no contamos con una conexión mediante cable Ethernet, tendremos que conectarnos manualmente.

### Usando Tarjeta Wifi

Para conectarnos a Internet usando el módulo Wifi haremos uso de la herramienta **iwd**[^1] que durante la instalación de Arch estará disponible para nuestro uso.

> Primero debemos usar **iwd**[^1] para listar las interfaces de red, encontrar nuestra red Wifi y conectarnos.

Utilizando el comando `ip a` podremos ver el nombre de nuestra interfaz de red el cual usaremos en el paso [4](#^481c1e). **Importante** filtrar por la interfaz cuya inicial sea la letra **w**. Esta inicial denota Wireless.

1. Debemos ejecutar el comando `iwctl`.
2. Se abrirá una consola interactiva de color verde.
3. Para conectarnos a la red Wifi primero debemos listar todas las redes disponibles haciendo uso del comando `device list`, recordar que estamos bajo el contexto de la consola interactiva de **iwd**[^1] con `iwctl`. De lo contrario, no funcionará.
4. En caso de que nuestra interfaz esté apagada, podemos usar `device *name* set-property Powered on`. Donde *name* será el nombre de nuestra interfaz. (Algunos ejemplos son **ens33**, **wlp3s0**, **wlan0**, **wlp2s0**). ^481c1e
5. Una vez nuestra interfaz esté encendida, procedemos a escanear las redes disponibles con el comando `station *name* scan`. Sin prisas ya que el comando no debería mostrar absolutamente nada por pantalla.
6. Para ver las redes Wifi que hemos escaneado y poder conectarnos haremos uso del comando `station *name* get-networks`, ya que en el paso anterior hemos escaneado las redes, ahora las traemos para proceder con la conexión.
7. La conexión a la red se realiza con el comando `station *name* connect SSID`, Donde **SSID** será el nombre de la red Wifi a la cual deseamos conectarnos.
8. En caso de que nuestra red requiera de una contraseña de autenticación, saldrá por pantalla lo siguiente:

```bash
Passphrase or password: _
```

9. Una vez ingresada la contraseña de nuestra red Wifi y todo este en orden, podemos salir escribiendo `exit` y regresar a la consola de la instalación de Arch.

----
<h1 id="tips-para-la-terminal" class="titulo-principal">Tips para la terminal</h1>

Quizás en la pantalla de nuestra instalación haya mucho texto debido a que recién configuramos nuestro acceso a internet, por tanto, una buena forma de "limpiar" nuestra terminal es usando el comando `clear` o hacer la combinación de teclas `ctrl + l`.

Otro comando que puede resultar útil al momento de usar nuestra terminal, es cuando nos encontramos en una consola interactiva por un comando. Un claro ejemplo es al momento de conectarnos a una red Wifi utilizando el comando **iwd**[^1], que nos abre un intérprete de color verde donde se nos da la capacidad de escribir comandos. Para salir de este intérprete podemos hacer uso de la combinación de teclas `ctrl + d`.

-----
<h1 id="probando-la-conexión-a-internet" class="titulo-principal">Probando la conexión a internet</h1>

Para probar que realmente disponemos de conexión a Internet, haremos uso del comando **ping**[^2] y la flag *-c 5*.

> **Ping**[^2] es un comando disponible en Linux que envía paquetes para probar conexión a Internet, y la flag *-c* es un parámetro que permite enviar únicamente los paquetes que le indiquemos como argumento, en este caso 5 paquetes.

```bash
ping -c 5 archlinux.org
```

Al hacer el comando obtendremos una respuesta como la siguiente:

```bash
❯ ping -c 5 archlinux.org
PING archlinux.org (2a01:4f9:c010:6b1f::1) 56 data bytes
64 bytes from archlinux.org (2a01:4f9:c010:6b1f::1): icmp_seq=1 ttl=41 time=185 ms
64 bytes from archlinux.org (2a01:4f9:c010:6b1f::1): icmp_seq=2 ttl=41 time=183 ms
64 bytes from archlinux.org (2a01:4f9:c010:6b1f::1): icmp_seq=3 ttl=41 time=184 ms
64 bytes from archlinux.org (2a01:4f9:c010:6b1f::1): icmp_seq=4 ttl=41 time=182 ms
64 bytes from archlinux.org (2a01:4f9:c010:6b1f::1): icmp_seq=5 ttl=41 time=182 ms

--- archlinux.org ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 181.933/183.224/184.902/1.108 ms
```

> Podemos ver como 5 paquetes fueron transmitidos y 5 fueron recibidos, esto significa que ya contamos con la conexión a Internet.

-----
<h1 id="partición-de-discos-con-cfdisk" class="titulo-principal">Partición de discos con cfdisk</h1>

Bien, ahora hemos llegado a una de las partes más importantes durante la instalación y por supuesto, esta es la fase de partición de disco. Es sin duda alguna de las partes más tediosas, pero la abarcaremos como campeones.

Es importante resaltar que si estamos instalando Arch en una máquina virtual, por defecto la partición que seleccionamos para la instalación estará limpia. Es decir, que no contendrá etiquetas conocidas como **Labels**[^3] tales como (*gpt, mbr, sun, dos*)[^4]. Es muy importante definir que etiqueta usar para la partición de nuestros discos, en este caso se usara la etiqueta *gpt*[^4] porque es el nuevo estándar para las tablas de partición.

En caso de estar haciendo la instalación de forma nativa, cuando ejecutemos el comando **cfdisk**[^5]. Directamente, nos dirá la etiqueta que está usando nuestro disco.

Hay 2 formas de hacer la partición de discos de manera correcta, siendo la primera para equipos más modernos fabricados a partir del año 2011 en adelante, ya que estos usan el sistema *EFI/UEFI*[^6]. Por otro lado, la segunda forma de particionar el disco es para equipos del 2010 hacia atrás, debido a que usan el sistema *BIOS Boot*[^7].

### Partición de discos EFI/UEFI

Si contamos con una máquina virtual podemos hacer el particionado de nuestro disco siguiendo el esquema *EFI/UEFI*[^6].
 
> Utilizaremos el comando **cfdisk**[^5] para la partición de nuestro disco.

1. En la terminal escribimos el comando **cfdisk**[^5].
2. Nos enfrentaremos a un menú como el siguiente:
![[Pasted image 20240725222934.png]]
3. Seleccionamos la opción *gpt*[^4] para crear nuestras particiones.
4. Centraremos nuestra atención al apartado *Device*, ya que ahí estarán nuestras particiones.
5. En caso de que debajo del apartado *Device* existan algunas particiones del tipo `/dev/sda1 /dev/sda2 /dev/sda3`, tendremos que movernos usando nuestras flechas en el teclado `↑ ↓ → ←`, seguidamente hacer un *Enter* en nuestro teclado en `[ Delete ]`, de esta forma eliminaremos las particiones existentes en caso de que estén ahí.
6. Una vez eliminadas las particiones en caso de haberlas, estaremos viendo de color verde debajo de *Device* la palabra **Free space**.
7. En las opciones justo en la parte posterior de **cfdisk**[^5] podremos ver `[ New ]`. Aquí presionamos *Enter* y la terminal nos pedirá un tamaño para nuestra primera partición.  ^928261
8. Donde dice `Partition size` escribiremos *128 MB*, creando una partición de 128Mb la cual será la partición de nuestro *gestor de arranque/boot*[^8].
9. Nuevamente, repetiremos el paso [7](#^928261), pero esta vez creando una partición de *4 GB, o de 8 GB, o de 16 GB* porque esta es la partición de *memoria virtual*[^9]. Es usada por nuestro sistema para guardar *excess memory o swap*[^9], en caso de que nuestra RAM este a su 100% de uso, de aquí saldrá un poco de memoria para liberar la carga y aligerar los procesos. Si no se hace esta partición tan pronto como nuestra RAM llegue a su 100% de uso, el sistema se crashea/rompe.
10. Nuevamente, repetiremos el paso [7](#^928261), pero esta vez tomando todo el tamaño disponible para la partición, está, será usada para alojar nuestro *sistema de archivos*[^10] de Arch.
11. Usaremos nuestras flechas en el teclado `↑ ↓ → ←` y nos desplazamos al apartado `[ Write ]` y presionamos *Enter* con el fin de guardar los cambios que hemos realizado, siendo estos la creación de nuestras particiones.
12. Obtendremos un mensaje en la terminal diciendo lo siguiente, donde escribiremos *yes* para aplicar los cambios y guardar nuestras nuevas particiones: 

```bash
Are you sure you want to write the partition table disk? *WE TYPE YES*
```

13.  Con ayuda de nuestras flechas en el teclado `↑ ↓ → ←`, nos desplazamos a la opción `[ Quit ]` para salir, y habremos terminado con el proceso de partición de disco.

> Para estar seguros de haber aplicado los cambios correctamente usaremos **lsblk**[^11]; siendo este un comando muy poderoso para saber en todo momento que está sucediendo con nuestras particiones. 

```bash
❯ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 465,8G  0 disk
├─sda1   8:1    0   128M  0 part           *128M partition OK* 
├─sda2   8:2    0     8G  0 part           *8G for "excess memory" OK*
└─sda3   8:3    0 457,6G  0 part           *The third partition takes the rest of the space in the disk OK*
sr0     11:0    1  1024M  0 rom /run/archiso/bootmnt
```

### Partición de discos BIOS Boot

Si ya hemos utilizado la [Partición de discos con cfdisk](#partición-de-discos-con-cfdisk) podremos saltarnos esta parte y continuar con [Formatear las particiones](#formatear-las-particiones).

Ahora bien, vamos a formatear las particiones que hemos definido. Ya llegados a este punto, se pueden presentarse 2 escenarios debido a que estamos instalando Arch en un portátil, laptop o PC de forma nativa y no en una máquina virtual. Dicho esto, se debe a que el PC, laptop o portátil anteriormente tenia un sistema Windows instalado, debido a esto las máquinas virtuales no se ven afectadas por este inconveniente.

#### Primer escenario

El primer escenario es aquel donde la suerte está de nuestro lado, puesto que al ejecutar el comando **cfdisk**[^5] el nombre de etiqueta ocupado por nuestro disco está actualmente etiquetado como *gpt*[^4]. Si es así, haremos los siguientes pasos para hacer la correcta partición de nuestro disco:

> Utilizaremos el comando **cfdisk**[^5] para la partición de nuestro disco.

1. En la terminal escribimos el comando **cfdisk**[^5] y donde dice `Label:` veremos que dice *gpt*[^4].
2. Centraremos nuestra atención al apartado *Device*, ya que ahí estarán nuestras particiones.
3. En caso de que debajo del apartado *Device* existan algunas particiones del tipo `/dev/sda1 /dev/sda2 /dev/sda3`, tendremos que movernos usando nuestras flechas en el teclado `↑ ↓ → ←`, seguidamente hacer un *Enter* en nuestro teclado en `[ Delete ]`, de esta forma eliminaremos las particiones existentes en caso de que estén ahí.
4. Una vez eliminadas las particiones en caso de haberlas, estaremos viendo de color verde debajo de *Device* la palabra **Free space**.
5. En las opciones justo en la parte posterior de **cfdisk**[^5] podremos ver `[ New ]`. Aquí presionamos *Enter* y la terminal nos pedirá un tamaño para nuestra primera partición.
6. Donde dice `Partition size` escribiremos *8 MB*, creando una partición de 8Mb[^12] la cual será la partición de nuestro *gestor de arranque/boot*[^8].
7. Nuevamente, repetiremos el paso *5*, pero esta vez creando una partición de *4 GB, o de 8 GB, o de 16 GB* porque esta es la partición de *memoria virtual*[^9]. Es usada por nuestro sistema para guardar *excess memory o swap*[^9], en caso de que nuestra RAM este a su 100% de uso, de aquí saldrá un poco de memoria para liberar la carga y aligerar los procesos. Si no se hace esta partición tan pronto como nuestra RAM llegue a su 100% de uso, el sistema se crashea/rompe.
8. Nuevamente, repetiremos el paso *5*, pero esta vez tomando todo el tamaño disponible para la partición, está, será usada para alojar nuestro *sistema de archivos*[^10] de Arch.
9. Usaremos nuestras flechas en el teclado `↑ ↓ → ←`, nos desplazamos al apartado `[ Write ]` y presionamos *Enter*.
10. Obtendremos un mensaje en la terminal diciendo lo siguiente, donde escribiremos *yes* para aplicar los cambios y guardar nuestras nuevas particiones:

```bash
Are you sure you want to write the partition table disk? *WE TYPE YES*
```

13.  Con ayuda de nuestras flechas en el teclado `↑ ↓ → ←`, nos desplazamos a la opción `[ Quit ]` para salir, y habremos terminado con el proceso de partición de disco.

> Para estar seguros de haber aplicado los cambios correctamente usaremos **lsblk**[^11]; es un comando muy poderoso para saber en todo momento que esta sucediendo con nuestras particiones. 

```bash
❯ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 465,8G  0 disk
├─sda1   8:1    0   128M  0 part           *8M partition OK* 
├─sda2   8:2    0     8G  0 part           *8G for "excess memory" OK*
└─sda3   8:3    0 457,6G  0 part           *The third partition takes the rest of the space in the disk OK*
sr0     11:0    1  1024M  0 rom /run/archiso/bootmnt
```

----
#### Segundo escenario

 
El segundo escenario es aquel donde nuestro disco tiene otra etiqueta diferente a *gpt*[^4], puesto que al ejecutar el comando **cfdisk**[^5] el nombre de etiqueta ocupado por nuestro disco es diferente de *gpt*[^4]. Tendremos que hacer los siguientes pasos adicionales para hacer la correcta partición de nuestro disco:

> Utilizaremos el comando **cfdisk**[^5] para la partición de nuestro disco.

1. En la terminal escribimos el comando **cfdisk**[^5] y donde dice `Label:` veremos que **NO** dice *gpt*[^4].
2. Ejecutaremos el temible comando[^13] **fdisk**[^14] `fdisk /dev/sda`.
3. Una vez dentro de la consola interactiva de **fdisk**[^14] escribimos la tecla `g` seguido de pulsar *Enter*. Saldrán unas letras de color rojo, indicando que ya se ha creado la etiqueta *gpt*[^4] para nuestro disco.
4. Debemos guardar la etiqueta, para ello dentro de la consola interactiva de **fdisk**[^14] presionamos la tecla `w` y presionamos rápidamente *Enter*.
5. Después de este proceso, escribiremos por consola `cfdisk /dev/sda`. 
6. Ahora ya podremos centrarnos en la creación de las particiones para el sistema, siendo estas `/dev/sda1 /dev/sda2 /dev/sda3`.
7. Centraremos nuestra atención al apartado *Device*, ya que ahí estarán nuestras particiones.
8. Al haber creado manualmente la etiqueta *gpt*[^4] no tendremos ninguna partición, lo cual facilita todo el proceso.
9. Estaremos viendo de color verde debajo de *Device* la palabra **Free space**.
10. En las opciones justo en la parte posterior de **cfdisk**[^5] podremos ver `[ New ]`. Aquí presionamos *Enter* y la terminal nos pedirá un tamaño para nuestra primera partición.
11. Donde dice `Partition size` escribiremos *8 MB*, creando una partición de 8Mb[^12] la cual será la partición de nuestro *gestor de arranque/boot*[^8].
12. Nuevamente, repetiremos el paso *10*, pero esta vez creando una partición de *4G, o de 8G, ó de 16G* porque esta es la partición de *memoria virtual*[^9]. Es usada por nuestro sistema para guardar *excess memory o swap*[^9], en caso de que nuestra RAM este a su 100% de uso, de aquí saldrá un poco de memoria para liberar la carga y aligerar los procesos. Si no se hace esta partición tan pronto como nuestra RAM llegue a su 100% de uso, el sistema se crashea/rompe.
13. Nuevamente, repetiremos el paso *10*, pero esta vez tomando todo el tamaño disponible para la partición, está, será usada para alojar nuestro *sistema de archivos*[^10] de Arch.
14. Usaremos nuestras flechas en el teclado `↑ ↓ → ←`, nos desplazamos al apartado `[ Write ]` y presionamos *Enter*.
15. Obtendremos un mensaje en la terminal diciendo lo siguiente, donde escribiremos *yes* para aplicar los cambios y guardar nuestras nuevas particiones:

```bash
Are you sure you want to write the partition table disk? *WE TYPE YES*
```

13.  Con ayuda de nuestras flechas en el teclado `↑ ↓ → ←`, nos desplazamos a la opción `[ Quit ]` para salir, y habremos terminado con el proceso de partición de disco.

> Para estar seguros de haber aplicado los cambios correctamente usaremos **lsblk**[^11].

```bash
❯ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 465,8G  0 disk
├─sda1   8:1    0   128M  0 part           *8M partition OK* 
├─sda2   8:2    0     8G  0 part           *8G for "excess memory" OK*
└─sda3   8:3    0 457,6G  0 part           *The third partition takes the rest of the space in the disk OK*
sr0     11:0    1  1024M  0 rom /run/archiso/bootmnt
```

------
<h1 id="formatear-las-particiones" class="titulo-principal">Formatear las particiones</h1>

Lo primero a realizar es formatear la partición `/dev/sda3` donde estarán alojados todos nuestros archivos de sistema y documentos propios.

> Si analizamos la información que nos proporciona el comando **lsblk**[^11] veremos nuestras particiones `/dev/sda1 /dev/sda2 /dev/sda3`.

```bash
❯ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 465,8G  0 disk
├─sda1   8:1    0   128M  0 part /boot/efi  *Grub Partition OK*   -> POINTS TO  ->   -> /dev/sda1
├─sda2   8:2    0     8G  0 part [SWAP]     *"excess memory" OK*  -> POINTS TO  ->   -> /dev/sda2
└─sda3   8:3    0 457,6G  0 part /          *Root, filesystem and home Partition OK* -> /dev/sda3
sr0     11:0    1  1024M  0 rom
```

Quizás pueda parecer información sin sentido, pero lo más importante del comando **lsblk**[^11] es lo siguiente:

```bash
❯ lsblk
NAME      
sda        
├─sda1  -> *NUESTRA PARTICION DE GRUB*     ->   *Grub Partition OK*   -> POINTS TO  ->   -> /dev/sda1
├─sda2  -> *NUESTRA PARTICION DE SWAP*     ->   *"excess memory" OK*  -> POINTS TO  ->   -> /dev/sda2
└─sda3  -> *NUESTRA PARTICION DE ARCHIVOS* ->   *Root, filesystem and home Partition OK* -> /dev/sda3
sr0        
```

> De esta manera, nos damos cuenta de que hemos creado correctamente las particiones y podremos continuar sin problemas.

1. En `/dev/sda1` tenemos nuestra partición de *arranque/boot*[^8].
2. En `/dev/sda2` tenemos nuestra partición de *memoria virtual*[^9] o *swap*[^9].
3. En `/dev/sda3` tenemos nuestra partición del *sistema de archivos*[^10] donde se guardara el sistema y nuestros documentos.

El orden para realizar el formateo de cada una de las particiones no es relevante en sí, pero lo recomendable es seguir una estructura al momento de formatear.

> El orden en este caso será primero la partición del *sistema de archivos*[^10] `/dev/sda3`, seguido de la partición de *arranque/boot*[^8] `/dev/sda1`, y por ultimo la partición *swap*[^9] `/dev/sda2`. 

1. Comenzaremos con nuestra partición alojada en *sda3*, para formatearla correctamente haremos uso del comando `mkfs.ext4 /dev/sda3` y presionamos *Enter*. Siendo *ext4*[^15] el sistema de archivos correspondiente para la partición.
2. Después de formatear *sda3*, la siguiente partición en lista es *sda1*, ya que aquí estará alojado nuestra partición de *arranque/boot*[^8]. Para ello haremos uso del comando `mkfs.fat -F 32 /dev/sda1`. La partición de arranque debe ser y a su vez requerido por el sistema operativo funcionar[^16] bajo el formato *FAT32*[^17], a diferencia de nuestra partición de sistema *ext4*[^15].
3. Por último la partición *sda2* es la correspondiente a la *memoria virtual*[^9] conocida como *swap*[^9]. Para darle formato haremos uso del comando `mkswap /dev/sda2`.

-----
<h1 id="montar-el-sistema-de-archivos" class="titulo-principal">Montar el sistema de archivos</h1>

Lo siguiente a realizar es montar nuestro *sistema de archivos*[^10] empezando por la partición `/dev/sda3`. Para ello utilizamos los siguientes pasos:

1. `mount /dev/sda3 /mnt`, donde *mnt* es el lugar esperado[^18] por el sistema para montar el sistema de archivos, y presionamos *Enter*.
2. Ahora la siguiente partición a montar será la de nuestro gestor de *arranque/boot*[^8] alojada en `/dev/sda1`. Aquí suceden 2 casos.

---
### Primer caso

Hemos creado las particiones en una máquina virtual usando *EFI/UEFI* [^6]:

1. Montar el gestor de arranque en `/boot/efi`, pero esta ubicación no existe. Por tanto, procederemos a crearla ejecutando el comando `mkdir -p /mnt/boot/efi`.
2. Ahora, una vez creada la carpeta para nuestro gestor de arranque, debemos montar su respectiva partición. Esto podremos lograrlo ejecutando `mount /dev/sda1 /mnt/boot/efi`.

### Segundo caso

Como hemos utilizado el sistema *BIOS/Boot*[^7] no tendremos que montar el sistema de nuestro gestor de *arranque/boot*[^8].

-----

> Después de montar el sistema de archivos, solo queda pendiente activar nuestra partición *swap*[^9]. Activar la partición *swap*[^9] es mediante el comando `swapon /dev/sda2`.

------
<h1 id="instalar-el-sistema-base" class="titulo-principal">Instalar el sistema base</h1>

Lo siguiente en nuestra instalación de Arch Linux será instalar el sistema base, nuestras aplicaciones y utilidades en la ruta donde montamos el sistema, en este caso la ruta sería `/dev/sda3`.

> Para ello usaremos la utilidad **pacstrap**[^19].

Si usamos *EFI/UEFI*[^6] el comando será el siguiente `pacstrap /mnt base linux linux-firmware sof-firmware base-devel grub efibootmgr vim networkmanager`, pero si usamos *BIOS/Boot*[^7] escribiremos en la terminal el siguiente comando `pacstrap /mnt base linux linux-firmware sof-firmware base-devel vim networkmanager`.

Estos serían nuestros paquetes base para la instalación. Puede tardar un poco, pero después de escribir el comando con nuestros paquetes, presionaremos seguidamente *Enter* para dar inicio a la instalación de Arch Linux.

**Importante** debemos esperar a que termine la descarga, y que nos regrese una terminal. Recordar hacer uso [[#Tips para la terminal]] en especial para "limpiar" pantalla.

--------------
<h1 id="fstab" class="titulo-principal">Fstab</h1>

> El comando *Fstab* es el encargado de **almacenar información descriptiva acerca de los diferentes sistemas de ficheros** del equipo. Siendo los archivos Fstab aquellos que contienen las informaciones que conciernen al montaje de las particiones del sistema.

Una vez instalados todos los paquetes, generaremos todos los procesos *Fstab*.

Para hacerlo hacemos uso del comando `genfstab /mnt`. Ejecutar el comando debe arrojar una salida como la siguiente:

```bash
# UUID=d4f52e31-62d2-499c-afb9-e156052b9545
/dev/sda3           	/         	ext4      	rw,relatime	0 1

# UUID=4F97-0407
/dev/sda1           	/boot/efi 	vfat      	rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro	0 2

# UUID=2812e50b-93f3-4809-b34b-0dee4e6d8bc2
/dev/sda2           	none      	swap      	defaults  	0 0
```

Después de ejecutar el comando y ver la información de nuestras tablas de particiones, debemos agregar el contenido a un archivo en nuestro sistema. Para ello ejecutamos el siguiente comando `genfstab /mnt > /mnt/etc/fstab`.

Para verificar que el comando se ha realizado correctamente podemos usar **cat**[^20] `cat /mnt/etc/fstab`.

------

<h1 id="migración-a-root-entrar-en-nuestro-sistema-instalado" class="titulo-principal">Migración a root (Entrar en nuestro sistema instalado)</h1>

Hemos terminado con gran parte del proceso de instalación de Arch Linux, se podría decir que para este punto en adelante serán más configuraciones propias al sistema, que instalar. Ya que el sistema en su medida ya está más que instalado.

Vamos a entrar a nuestro sistema instalado usando el comando `arch-chroot /mnt` y presionamos *Enter*. Seguidamente, veremos como la terminal cambia a un formato más cómodo:

```bash
[root@archiso /]# 
```

A partir de este punto comenzaremos a configurar nuestro sistema.

-----

<h1 id="zona-horaria" class="titulo-principal">Zona horaria</h1>

> Utilizaremos la herramienta **ln**[^21] para crear un enlace simbólico.

Para establecer nuestra zona horaria haremos uso del siguiente comando:

```bash
ln -sf /usr/share/zone/info/America/Bogota /etc/localtime
```

Debemos asegurarnos que la hora se haya establecido correctamente, para ello usamos `date` y verificamos que la hora sea correcta. Seguido ejecutaremos lo siguiente `hwclock --systohc` para sincronizar la hora con la pila de nuestra máquina.

----

<h1 id="localización" class="titulo-principal">Localización</h1>

La parte de configurar la localización suele ser un poco compleja debido a que se deben crear manualmente los archivos. El paso a paso será el siguiente:

1. Escribimos en la consola `vim /etc/locale.gen`. El comando *vim* es un editor de código muy poderoso y lo usaremos para crear nuestro archivo de localización. Usando las flechas en el teclado `↑ ↓ → ←`, debemos ubicar la línea *185*, la cual dice `es_CO.UTF-8 UTF-8`. Directamente con *vim* podemos hacer uso de la siguiente combinación de teclas `shitf :185` e iremos directamente a la línea de la localización.
![[Pasted image 20240726202048.png]]
2. Cuando estemos en la línea *185* pulsaremos en nuestro teclado la tecla ` i ` para entrar en el modo de *Insert* de *vim*. Esto es con el fin de poder editar el código, ya que debemos eliminar el símbolo *#*.
3. Después de eliminar el símbolo *#*, pulsaremos la tecla ` Esc ` para entrar en el modo *Normal* de *vim*.
4. Una vez estemos en el modo *Normal*, haremos la siguiente combinación de teclas para guardar nuestro archivo de localización `shift : wq`. Lo que logramos con la combinación *wq* es *write file, quit file*. Y el archivo de localización estará listo.

Haremos uso de la utilidad `locale-gen` para verificar que los cambios se hayan aplicado:

```bash
Generating locales...
  es_CO.UTF-8 UTF-8... done
```

Posterior a esto, debemos especificar la configuración local creando el archivo `vim /etc/locale.conf`. Una vez abierto el editor *vim* entramos en modo *Insert* para poder tener capacidad de escritura y modificar el archivo **locale.conf**, después escribimos lo siguiente:

```bash
LANG=es_CO.UTF-8
```

Para salir de *vim* y guardar nuestro archivo **locale.conf** pulsaremos la tecla ` Esc ` para entrar en el modo *Normal* de *vim*. Una vez estemos en el modo *Normal*, haremos la siguiente combinación de teclas para guardar nuestro archivo **locale.conf**  `shift : wq`. Recordar lo que logramos con la combinación *wq* es *write file, quit file*. Y el archivo **locale.conf** estará listo.

-----------

<h1 id="keymap" class="titulo-principal">Keymap</h1>

Este paso es más opcional que otra cosa, pero dado que la mayoría de teclados no están en la distribución inglés que es lo predeterminado en Arch Linux, lo cambiaremos a español. Hacer el cambio requiere que abramos un nuevo archivo `vim /etc/vconsole.conf` y al igual que los pasos anteriores entraremos en el modo *Insert* de *vim* y escribimos:

```bash
KEYMAP=la-latin1
```

Para salir de *vim* y guardar nuestro archivo **vconsole.conf** pulsaremos la tecla ` Esc ` para entrar en el modo *Normal* de *vim*. Una vez estemos en el modo *Normal*, haremos la siguiente combinación de teclas para guardar nuestro archivo **vconsole.conf**  `shift : wq`. Recordar lo que logramos con la combinación *wq* es *write file, quit file*. Y el archivo **vconsole.conf** estará listo.

-----

<h1 id="hostname" class="titulo-principal">Hostname</h1>

> Vamos a crear el archivo de **hostname** el cual será el nombre con el que identificaremos nuestro equipo en la red.

Crearemos este archivo usando el comando `vim /etc/hostname`, y escribimos el nombre que queramos:

```bash
Blandonferxoo
```

Para salir de *vim* y guardar nuestro archivo **hostname** pulsaremos la tecla ` Esc ` para entrar en el modo *Normal* de *vim*. Una vez estemos en el modo *Normal*, haremos la siguiente combinación de teclas para guardar nuestro archivo **hostname**  `shift : wq`. Recordar lo que logramos con la combinación *wq* es *write file, quit file*. Y el archivo **hostname** estará listo.

------

<h1 id="contraseña-de-root" class="titulo-principal">Contraseña de root</h1>

Uno de los aspectos más importantes al momento de utilizar un sistema Linux son los **Usuarios**[^22] del sistema, donde el usuario más importante es el *root*. 
Por defecto, durante nuestra instalación del sistema Arch Linux el *usuario root*[^23] no tiene una contraseña. Por tanto, debemos de asignarle una. Podemos lograrlo con el comando `passwd` y presionamos *Enter*. 

> Nos saldrá un menú como el siguiente después de ejecutar `passwd`:

```bash
New password: 
```

> En este punto introduciremos nuestra contraseña. -> La recomendación es elegir una contraseña robusta y que sea fácil de recordar.

```bash
Retype new password:
```

Posterior tendremos este menú donde debemos escribir por segunda vez nuestra contraseña.

-----

<h1 id="agregar-un-usuario-con-privilegios-de-root" class="titulo-principal">Agregar un usuario (Con privilegios de root)</h1>

Ya hemos configurado previamente al *usuario root*[^23] quien tendrá las mayores capacidades para modificar y hacer cambios en el sistema, pero aún debemos crear nuestro propio usuario (Utilizar el *usuario root*[^23] para todas las tareas no es recomendable por cuestiones de seguridad[^24]). En la terminal ejecutaremos el comando `useradd -m -G wheel -s /bin/bash *username*`. 

> El comando **useradd** de Linux *te permite añadir nuevos usuarios*. Siendo el parámetro *-m*  para especificar que queremos crear un directorio `/home/*username*`. El parámetro *-G* nos agrega a nuestro usuario al grupo *wheel*[^25] cuya finalidad la veremos más adelante en [Configuración de sudo](#configuración-de-sudo). Y por último el parámetro *-s* nos indica que tipo de **Shell**[^26] queremos usar para el usuario, en este caso `/bin/bash`.

-----

<h1 id="contraseña-de-nuestro-usuario" class="titulo-principal">Contraseña de nuestro usuario</h1>

Al igual que el paso a paso anterior donde configuramos [Contraseña de root](#contraseña-de-root), debemos hacer lo mismo para nuestro usuario. Entonces tenemos lo siguiente: 

Con el comando `passwd` agregamos nuestra contraseña personal y seguidamente presionamos *Enter*.

Nos saldrá un menú como el siguiente:

```bash
New password: 
```

> En este punto introduciremos nuestra contraseña. -> La recomendación es elegir una contraseña robusta y que sea fácil de recordar. No hay ningún problema con que la contraseña del usuario sea la misma de *root*, pero a mayor seguridad que sean diferentes. No supone ningún problema que sea la misma.

```bash
Retype new password:
```

Posterior tendremos este menú donde debemos escribir por segunda vez nuestra contraseña.

------

<h1 id="configuración-de-sudo" class="titulo-principal">Configuración de sudo</h1>

Es importante la configuración de **sudo**[^27] para realizar tareas básicas como instalar paquetes o actualizar nuestro sistema.

Para ello, una vez creado nuestro usuario usaremos el comando `su`:

```bash
[root@archiso /]# su *username*
```

Obtendremos un cambio en la terminal, puesto que el comando `su *username*` nos ha migrado la terminal al usuario que hemos creado.

```bash
[username@archiso /]#
```

Si tratamos de actualizar el sistema con el comando `sudo pacman -Syu` pedirá nuestra contraseña, la cual después de introducir correctamente nos saldrá el siguiente mensaje:

```bash
*username* is not in the sudoers file. This incident will be reported.
```

Para solucionar este pequeño inconveniente saldremos de la sesión con nuestro usuario con el comando `exit`, el cual nos devolverá a la consola con el *usuario root*[^23]:

```bash
[root@archiso /]#
```

Escribiremos el comando `EDITOR=vim visudo` para abrir el archivo *sudoers*[^28]. Con ayuda de nuestras flechas en el teclado `↑ ↓ → ←`, nos desplazamos a la parte posterior del archivo buscando lo siguiente:

```bash
## Uncomment to allow members of group wheel to execute any command
#%wheel ALL=(ALL) ALL
```

Una vez abierto el editor *vim* entramos en modo *Insert* para poder tener capacidad de escritura y modificar el archivo *sudoers*[^28], esto es con el fin de poder editar el código, ya que debemos eliminar el símbolo *#*.

Resultando en lo siguiente:

```bash
## Uncomment to allow members of group wheel to execute any command
%wheel ALL=(ALL) ALL *DELETED HASHTAG FROM THIS LINE ONLY*
```

Después de eliminar el símbolo *#*, pulsaremos la tecla ` Esc ` para entrar en el modo *Normal* de *vim*.

Una vez estemos en el modo *Normal*, haremos la siguiente combinación de teclas para guardar nuestro archivo `shift : wq`. Lo que logramos con la combinación *wq* es *write file, quit file*. 
De esta manera el archivo de *sudoers*[^28] estará listo y nuestro usuario podrá ejecutar y usar libremente el comando *sudo*[^27] siempre y cuando sepa la contraseña del *usuario root*[^23].

Seguidamente, cambiaremos nuevamente a nuestro usuario creado con el comando `su *username*`.

```bash
[root@archiso /]# su *username*
```

Migrados al usuario que hemos creado, probamos nuevamente a actualizar el sistema:

```bash
[username@archiso /]# sudo pacman -Syu
[sudo] password for username:
...
there is nothing to do
```

De esta forma ya estará lista la configuración para nuestro usuario, y que este pueda acceder al comando **sudo**[^27].

----

<h1 id="habilitar-los-serviciosdemonios" class="titulo-principal">Habilitar los servicios/demonios</h1>

Este es uno de los pasos fundamentales en el proceso de instalación de Arch Linux, hablamos de la habilitación de los *servicios/demonios*[^29].

En el paso anterior nos quedamos con una consola donde el usuario es aquel que hemos creado, para habilitar los servicios/demonios debemos hacerlo como el usuario root.

> Ejecutamos "su" para migrar al usuario root.

```bash
su
Passwd: *TYPE ROOT PASSWORD*
...
[root@archiso /]# 
```

Vamos a comenzar habilitando el demonio de red con el comando `systemctl enable NetworkManager` estando como usuario root.

----

<h1 id="configuración-de-grub" class="titulo-principal">Configuración de Grub</h1>

Este es el último paso fundamental antes de reiniciar la máquina y es la configuración de nuestro *gestor de arranque/boot*[^8]. Lograremos su configuración con ayuda de la utilidad `grub-install /dev/sda`. Ejecutamos este comando en la terminal como *usuario root*[^23]. 

> Posterior a la instalación de nuestro *gestor de arranque/boot*[^8] aun queda pendiente su configuración.

Para la configuración de nuestro *gestor de arranque/boot*[^8] escribiremos el siguiente comando como *usuario root*[^23] `grub-mkconfig -o /boot/grub/grub.cfg` y presionamos *Enter*.

-----

<h1 id="saliendo-del-instalador-de-archiso" class="titulo-principal">Saliendo del instalador de Archiso</h1>

Después de configurar el *gestor de arranque/boot*[^8] ejecutaremos el comando `exit` para volver a la consola interactiva de nuestra instalación. Recordar que en el paso [Migración a root (Entrar en nuestro sistema instalado)](#migración-a-root-entrar-en-nuestro-sistema-instalado) ejecutamos el comando `arch-chroot /mnt`. Por ende, hemos salido de esa terminal de nuestro propio sistema instalado para volver al contexto de la instalación de Arch Linux.

> Debemos desmontar todos nuestros discos y particiones para ellos escribiremos `umount -a`.

Finalmente, la espera ha valido la pena y ya estaremos listos para reiniciar nuestro sistema Arch Linux.

Para concluir la instalación reiniciaremos el sistema con el comando `reboot`. Posteriormente retiramos la memoria USB en caso de haber hecho la instalación de manera nativa.

----

<h1 id="arrancandobooting-en-nuestra-instalación" class="titulo-principal">Arrancando/Booting en nuestra instalación</h1>

Después del comando `reboot` estaremos nuevamente en una consola pero ya habremos instalado el sistema base de Arch.

Antes de instalar entorno grafico, aplicaciones y herramientas debemos configurar nuestro fresco y recién instalado sistema, primero que todo comenzaremos por configurar nuestro *localhost*[^30], ya que "No hay lugar, como el hogar".

1. Ejecutamos el comando `sudo vim /etc/hosts` y veremos lo siguiente:

```bash
# Static table lookup for hostnames.
# See hosts(5) for details.
```

2. Importante recordar que para escribir pulsaremos en nuestro teclado la tecla ` i ` para entrar en el modo de *Insert* de *vim*. Esto es con el fin de poder editar el código, ya que debemos agregar nuestro *localhost*[^30].
3.  Escribiremos dentro del archivo nuestros punteros a *localhost*:

```bash
127.0.0.1  #1 tab   localhost
::1        #2 tab   localhost
127.0.1.1  #1 tab   Blandonferxoo.localdomain #1tab Blandonferxoo
```

4. Después de agregar las líneas, pulsaremos la tecla ` Esc ` para entrar en el modo *Normal* de *vim*.
5. Una vez estemos en el modo *Normal*, haremos la siguiente combinación de teclas para guardar nuestro archivo de localización `shift : wq`. Lo que logramos con la combinación *wq* es *write file, quit file*. Y el archivo `/etc/hosts` estará listo.

---
<h1 id="probando-la-conexión-a-internet-2" class="titulo-principal">Probando la conexión a internet 2</h1>

Una vez iniciemos sesión en nuestro nuevo sistema Arch lo primero es verificar la conexión a Internet, podemos hacer uso de la herramienta `ping -c 5 8.8.8.8`. Pero al ejecutar el comando nos encontramos con el error:

```bash
ping: connect: La red es inaccesible
```

Para solucionar este inconveniente es tan cómodo como escribir en la consola `systemctl enable NetworkManager.service` y presionamos *Enter*, seguidamente si nos conectamos a internet mediante tarjeta Wifi ejecutamos `which nmcli`. Si nos arroja una *ruta absoluta*[^31] como la siguiente: 

```bash
/usr/bin/nmcli
```

Es luz verde para proceder con la conexión a internet, de manera que aprovecharemos la utilidad *nmcli*[^32] para tener acceso a la red.

1. Para conectarnos a la red Wifi escribiremos el comando `nmcli device wifi list`.
2. De distintos colores aparecerán en pantalla las redes Wifi disponibles.
3. En caso de no tener una respuesta del comando `nmcli device wifi list`, podemos hacer uso del comando `nmcli device wifi rescan`.
4. Una vez encontremos nuestra red Wifi a la cual deseamos conectarnos, escribiremos `nmcli device wifi connect *name of the access point* password *type wifi password*`.
5. Si todo ha salido correctamente, veremos por terminal el mensaje:

```bash
El dispositivo <<*your interface*>> se activo correctamente con *.....*
```

Para mayor confiabilidad de estar conectados a Internet probaremos el comando `ip a`, donde si nos fijamos en el nombre de nuestra interfaz de red tendrá el estatus *UP*. Por tanto estará encendido el adaptador Wifi y tendremos conectividad a Internet.

> El ultimo paso es transmitir el *ping -c 5 8.8.8.8*.

Con estos pasos ya habremos configurado nuevamente nuestro acceso a Internet, el cual es necesario para los pasos posteriores.

Una pequeña prueba interesante que podemos hacer, es la instalación de una herramienta que es de uso muy común en Windows. La herramienta de *Administrador de tareas*[^33], pero su equivalente en sistemas Linux es **htop*[^34].

Para ellos escribimos `sudo pacman -S htop`. Finalizando la instalación de nuestro *administrador de tareas* lo podemos ejecutar escribiendo `htop`.

> La herramienta *htop*[^34] nos permitirá ver los procesos o **PID**[^35] de nuestro sistema, ver la cantidad de RAM usada y la cantidad de *swap*[^9].

Para salir de la herramienta presionamos en nuestro teclado `q` seguido de "limpiar" pantalla escribiendo `clear`, o usando el atajo `ctrl + l`.

Por último, para tener acceso a un sin fin de paquetes, teniendo en cuenta que llegados a este punto ya podemos instalar así como hicimos con htop[^34]. Instalaremos la paqueteria de *AUR*.

> Siendo *AUR* como un repositorio manejado por la comunidad de Arch Linux.

Para ello hacemos `sudo pacman -S git`, vamos a migrar a nuestro usuario y crear una serie de carpetas:

1. Ejecutamos `mkdir -p /home/*username*/Desktop/*username*/repos`.
2. Entramos a la carpeta repos con `cd ~/Desktop/*username*/repos`.
3. Escribimos el comando para clonar el repositorio de AUR `git clone https://aur.archlinux.org/paru-bin.git`, y presionamos *Enter*.
4. Se nos creara un directorio llamado `paru-bin`, nos metemos con `cd paru-bin`.
5. Y escribimos el comando `makepkg -si`, y presionamos *Enter*.

### Vm Tools

Este paso es para máquina virtual, ya que hay que instalar el paquete `sudo pacman -S open-vm-tools xf86-video-vmware xf86-input-vmmouse`. Para arreglar muchos de los errores visuales.

Nos encontraremos con que debemos habilitar el segundo *servicio/demonio*[^29], en este caso `systemctl enable vmtoolsd` y presionamos *Enter*. Rápidamente escribimos `reboot now` y ahora nos debería abrir en pantalla completa.

**Recomendación** crear una snapshot para guardar el proceso de instalación hasta ahora.

---
<h1 id="instalación-parcial-de-nuestro-gestor-de-ventanas-bspwm" class="titulo-principal">Instalación parcial de nuestro gestor de ventanas BSPWM</h1>

Para este entorno se utiliza el gestor de ventanas Bspwm, que se basa en el concepto de _ventanas flotantes_[^36]. Es altamente personalizable, lo que permite organizar y controlar las ventanas de forma efectiva.

Se han configurado atajos de teclado optimizados para agilizar el flujo de trabajo, asignando comandos a combinaciones de teclas para realizar acciones rápidas y sencillas.

Llegados a este punto lo siguiente será la instalación de nuestro gestor de ventanas Bspwm como nuestro *ventanas flotantes*[^36].

Tan simple como ejecutar `sudo pacman -S bspwm`. Una vez instalado lo siguiente será configurar una carpeta donde guardaremos los ajustes de Bspwm.

1. Primero haremos uso del comando `pwd` y nos devolverá la ruta donde estamos ubicados, tal que debemos estar en `/home/*username*`.
2. Podemos listar el contenido del directorio con `ls -la` puesto que nos interesa ver archivos ocultos.
3. Encontraremos una carpeta llamada `.config`. Dentro de esta carpeta crearemos todas nuestras carpetas de configuración.
4. Ejecutamos `cd .config`, seguido hacemos un `ls -la` y veremos la carpeta de *htop*[^34].
5. Lo siguiente será crear una carpeta llamada *bspwm*, para ello escribimos `mkdir bspwm`.
6. Para entrar a la carpeta ejecutamos `cd bspwm`. 
7. Ejecutaremos el comando `cp` para copiar el archivo de configuración de *bspwm* en nuestra carpeta actual `cp /usr/share/doc/bspwm/examples/bspwmrc .`, debemos incluir el punto '.' al final del comando.
8. Abrimos el archivo *bspwmrc* con *vim*.

Compartiré un archivo de prueba con configuraciones del *bspwmrc*:

```bash
#! /bin/sh
timedatectl set-timezone America/Bogota #zona horaria
pgrep -x sxhkd > /dev/null || sxhkd &   #shortcuts
setxkbmap latam                         #teclado latam
bspc monitor -d I II III IV V           #cantidad de ventanas (puede ir hasta 10)

bspc config border_width         2
bspc config window_gap          12

bspc config split_ratio          0.52
bspc config borderless_monocle   true
bspc config gapless_monocle      true

bspc config focus_follows_pointer true  #Seguimiento del mouse a las aplicaciones
bspc config border_width 0              #Eliminar bordes

wmname LG3D &                           #habilitar clipboard entre Windows y Maquinas Virtuales
vmware-user-suid-wrapper &              #habilitar clipboard entre Windows y Maquinas Virtuales
```

### Gestor de shortcuts 

Para los shortcuts o atajos de teclado usaremos *sxhkd*, así que lo instalaremos `sudo pacman -S sxhkd`.

1. Crearemos una carpeta para la configuración de nuestros atajos de teclado con `mkdir /home/*username*/.config/sxhkd/`.
2. Para ir directamente a la carpeta que recién hemos creado utilizaremos `cd !$`.
3. Si hacemos un `pwd` nos daremos cuenta que estamos bajo la carpeta del *sxhkd*.
4. Al igual que con el *bspwm* debemos copiarnos la configuración por defecto `cp /usr/share/doc/bspwm/examples/sxhkdrc .`, importante escribir el punto '.' al final del comando.
5. Abrimos el *sxhkdrc* y configuramos el tipo de terminal así como algunos shortcuts.

Compartiré un archivo de prueba con configuraciones del *sxhkd*:

```bash
# terminal emulator
super + Return
	kitty

# program launcher
super + d
	rofi -no-config -no-lazy-grab -show drun -modi drun -theme ~/.config/polybar/blocks/scripts/rofi/launcher.rasi

# make sxhkd reload its configuration files:
super + Escape
	pkill -USR1 -x sxhkd

#
# bspwm hotkeys
#

# quit/restart bspwm
super + alt + {q,r}
	bspc {quit,wm -r}

# close and kill
super + {_,shift + }w
	bspc node -{c,k}

# alternate between the tiled and monocle layout
super + m
	bspc desktop -l next

# send the newest marked node to the newest preselected node
super + y
	bspc node newest.marked.local -n newest.!automatic.local

# swap the current node and the biggest window
super + g
	bspc node -s biggest.window

#
# state/flags
#

# set the window state
super + {t,shift + t,s,f}
	bspc node -t {tiled,pseudo_tiled,floating,fullscreen}

# set the node flags
super + ctrl + {m,x,y,z}
	bspc node -g {marked,locked,sticky,private}

#
# focus/swap
#

# focus the node in the given direction
super + {_,shift + }{Left,Down,Up,Right}
	bspc node -{f,s} {west,south,north,east}

# focus the node for the given path jump
super + {p,b,comma,period}
	bspc node -f @{parent,brother,first,second}

# focus the next/previous window in the current desktop
super + {_,shift + }c
	bspc node -f {next,prev}.local.!hidden.window

# focus the next/previous desktop in the current monitor
super + bracket{left,right}
	bspc desktop -f {prev,next}.local

# focus the last node/desktop
super + {grave,Tab}
	bspc {node,desktop} -f last

# focus the older or newer node in the focus history
super + {o,i}
	bspc wm -h off; \
	bspc node {older,newer} -f; \
	bspc wm -h on

# focus or send to the given desktop
super + {_,shift + }{1-9,0}
	bspc {desktop -f,node -d} '^{1-9,10}'

#
# preselect
#

# preselect the direction
super + ctrl + alt + {Left,Down,Up,Right}
	bspc node -p {west,south,north,east}

# preselect the ratio
super + ctrl + {1-9}
	bspc node -o 0.{1-9}

# cancel the preselection for the focused node
super + ctrl + space
	bspc node -p cancel

# cancel the preselection for the focused desktop
super + ctrl + alt + space
	bspc query -N -d | xargs -I id -n 1 bspc node id -p cancel

#
# move/resize
#

# expand a window by moving one of its side outward
#super + alt + {h,j,k,l}
#	bspc node -z {left -20 0,bottom 0 20,top 0 -20,right 20 0}

# contract a window by moving one of its side inward
#super + alt + shift + {h,j,k,l}
#	bspc node -z {right -20 0,top 0 20,bottom 0 -20,left 20 0}

# move a floating window
super + ctrl + {Left,Down,Up,Right}
	bspc node -v {-20 0,0 20,0 -20,20 0}

# Custom move/resize
alt + super + {Left,Down,Up,Right}
	/home/qw4qe/.config/bspwm/scripts/bspwm_resize {west,south,north,east}

# Firefox
shift + l
	/usr/bin/firefox

# Lightdm
super + shift + x
	dm-tool lock

# Capturas de pantalla
super + shift + g
	/usr/bin/flameshot gui

#pruebas de audio
XF86AudioLowerVolume
   exec pulseaudio-ctl down
#exec pactl set-sink-volume @DEFAULT_SINK@ -5% 
XF86AudioMute
   exec pulseaudio-ctl mute #exec pactl set-sink-mute @DEFAULT_SINK@ toggle #exec pulseaudio-ctl mute

XF86AudioRaiseVolume
   exec pulseaudio-ctl up #exec pactl set-sink-volume @DEFAULT_SINK@ +5% #exec pulseaudio-ctl up
```

Seguido crearemos el siguiente archivo y ejecutamos los comandos:

1. `mkdir ~/.config/bspwm/scripts/`.
2. `touch ~/.config/bspwm/scripts/bspwm_resize;`.
3. `chmod +x ~/.config/bspwm/scripts/bspwm_resize`    
4. Mediante la siguiente configuración podremos en el futuro controlar las dimensiones de las ventanas, así como modificarlas con atajos de teclado:

```bash
#!/usr/bin/env dash

if bspc query -N -n focused.floating > /dev/null; then
  step=20
else
  step=100
fi

case "$1" in
  west) dir=right; falldir=left; x="-$step"; y=0;;
  east) dir=right; falldir=left; x="$step"; y=0;;
  north) dir=top; falldir=bottom; x=0; y="-$step";;
  south) dir=top; falldir=bottom; x=0; y="$step";;
esac

bspc node -z "$dir" "$x" "$y" || bspc node -z "$falldir" "$x" "$y"
```

Instalaremos nuestra terminal *kitty* y lightdm para poder arrancar *bspwm* cómodamente, escribiremos el comando `sudo pacman -S kitty`. Rápidamente al finalizar la instalación de *kitty* revisamos que este en su versión mas reciente con `kitty -v`, siendo hasta la fecha la 0.35.2.

Para instalar lightdm y sus complementos haremos lo siguiente `sudo pacman -S lightdm lightdm-gtk-greeter-settings`.

> Activaremos lightdm `sudo systemctl enable lightdm`.

Y reiniciamos nuestro equipo con `reboot`.

---
<h1 id="instalación-de-paquetes-adicionales" class="titulo-principal">Instalación de paquetes adicionales</h1>

Simplemente paquetes adicionales que utilizaremos en un futuro.

`sudo pacman -S thunar rofi polybar wget p7zip picom git zsh net-tools python3 openssh xclip tmux feh nitrogen neovim`

1. Thunar es el gestor de archivos.
2. Rofi será la aplicación para abrir cualquier app rápidamente.
3. Polybar es la barra de estado que gestiona nuestros entornos de trabajo de Bspwm
4. wget es una herramienta que nos permite descargar archivos *raw*, lo usaremos mas adelante.
5. p7zip es el equivalente a winrar pero para nuestra consola.
6. Picom es la herramienta con la cual ajustaremos nuestras transparencias, bordes y blurs.
7. Git es la versión de consola para trabajar con nuestros repositorios en GitHub.
8. zsh sera la terminal que usaremos ya que es altamente personalizable a diferencia de la bash que tendremos por defecto.
9. net-tools es un conjunto de herramientas de red, un ejemplo es el uso del comando `ifconfig` para ver nuestras interfaces de red.
10. Python3 es la forma rápida de instalar python en Linux.
11. Openssh será la herramienta para conectarnos por telnet, ssh.
12. xclip es de las más interesantes herramientas, puesto que copia cualquier cosa en nuestro `ctrl c` a nivel de consola.
13. tmux es un gestor de ventanas de terminal para aumentar nuestra productividad, pero al igual que *vim*. Tmux cuenta con una gran cantidad de atajos por teclado.
14. Tanto feh como nitrogen son aplicaciones que podemos utilizar para configurar nuestros fondos de pantalla.
15. Neovim será el paquete base para posteriormente instalar los plugins *Lazy, Astro o NvChad*.

---
<h1 id="arrancar-entorno-gráfico" class="titulo-principal">Arrancar entorno gráfico</h1>

Después de arrancar nuestro sistema veremos un Login, significa que lightdm ha sido correctamente instalado. Tendremos todo en negro pero es normal puesto no tenemos fondo de pantalla y aun no hemos desplegado la Polybar, Picom, ni la configuración apropiada de nuestra *kitty*.

Pero antes debemos escribir el comando `setxkbmap latam`, de esta manera pondremos nuestra distribución de teclado en español.
Rápidamente, incorporamos en el archivo `'bspwmrc'` la siguiente línea para arreglar el cursor `xsetroot -cursor_name left_ptr &`.

1. Para ello ejecutamos el comando `echo "xsetroot -cursor_name left_ptr &" >> /home/*username*/.config/bspwm/bspwmrc`.

> Configuramos un poco la terminal e instalamos las Hack Nerd Fonts o cualquier font recomendable que sea de tipo Nerd, además del Firefox (hay que descargarse la última versión, con el objetivo de lanzar Firefox bajo este contexto enjaulado con **sxhkd**). Las fuentes de Nerd Fonts deben ir descomprimidas en `/usr/local/share/fonts/`, una vez hecho hay que ejecutar el comando `'fc-cache -v'`.

1. Descargar las fuentes de la pagina [NerdFonts](https://nerdfonts.com) .
2. Se descargará un archivo de tipo .zip.
3. En el paso anterior [Instalación de paquetes adicionales](#instalación-de-paquetes-adicionales) uno de los paquetes instalados es *p7zip* el cual será nuestra herramienta para descomprimir archivos.
4. Debemos migrar a root usando el comando `sudo su` e introducimos nuestra contraseña.
5. Nos moveremos a la carpeta `cd /usr/local` y creamos la carpeta `mkdir fonts`, seguido de `cd fonts`.
6. Moveremos el archivo de nuestras fuentes ejecutando `mv /home/*username*/Descargas/*our fonts*.zip`.
7. Ahora usaremos `7z x *our font*.zip`. Logrando así descomprimir correctamente el archivo con nuestras fuentes.
8. Seguido ejecutamos `fc-cache -v` para recargar nuestra configuración de fuentes.

### Configuración de la Kitty

Nos vamos a `cd /home/*username*/.config/kitty`, y creamos el archivo kitty.conf:

```bash
enable_audio_bell no

include color.ini

font_family	CaskaydiaCove Nerd Font
#font_family HackNerdFont
font_size 10

disable_ligatures never

url_color #61afef

url_style curly

map ctrl+left neighboring_window left
map ctrl+right neighboring_window right
map ctrl+up neighboring_window up

cursor_shape beam
cursor_beam_thickness 1.0

mouse_hide_wait 3.0
detect_urls yes
repaint_delay 10
input_delay 3
sync_to_monitor yes

inactive_tab_background #e06c75
active_tab_background #98c379
inactive_tab_foreground #000000
tab_bar_margin_color black
background_opacity 0.88


tab_bar_style powerline
```

Compartiré un código de ejemplo para el archivo color.ini que requiere kitty.conf

```bash
cursor_shape          beam
cursor_underline_thickness 1
window_padding_width  20

# Special
foreground #a9b1d6
;background #1a1b26
background #000000

# Black
color0 #414868
color8 #414868

# Red
color1 #f7768e
color9 #f7768e

# Green
color2  #73daca
color10 #73daca

# Yellow
color3  #e0af68
color11 #e0af68

# Blue
color4  #7aa2f7
color12 #7aa2f7

# Magenta
color5  #bb9af7
color13 #bb9af7

# Cyan
color6  #7dcfff
color14 #7dcfff

# White
color7  #c0caf5
color15 #c0caf5

# Cursor
cursor #c0caf5
cursor_text_color #1a1b26

# Selection highlight
selection_foreground #7aa2f7
selection_background #28344a
```

### Instalamos Picom para ajustar las transparencias.

> Picom nos ayuda a ajustar las transparencias además de bordeados de ventana, para esto ejecutamos los siguientes pasos.

Compartiré un archivo de prueba con configuraciones del *picom.conf*:

```bash
corner-radius = 20;
rounded-corners-exclude = [
  #"window_type = 'normal'",
  #"class_g = 'firefox'",
   "class_g = 'Polybar'"
];

round-borders = 20;
round-borders-exclude = [
  #"class_g = 'TelegramDesktop'",
];

round-borders-rule = [];

shadow = false
shadow-radius = 15
shadow-opacity = .5
shadow-offset-x = -15
shadow-offset-y = -15

shadow-exclude = [
    "class_g = 'firefox' && argb",
    "class_g = 'discord'"
];

fade-in-step = 0.01;
fade-out-step = 0.01;

inactive-opacity = 1.0
frame-opacity = 1.0
opacity = 1.0
inactive-opacity-override = false;
active-opacity = 1.0
focus-exclude = [ "class_g = 'Cairo-clock'" ];
backend = "glx";
vsync = false
mark-wmwin-focused = true;
mark-ovredir-focused = true;
detect-rounded-corners = true;
detect-client-opacity = true;
refresh-rate = 0
detect-transient = true
detect-client-leader = true
use-damage = false
log-level = "warn";

wintypes:
{
  tooltip = { fade = true; shadow = true; shadow-radius = 0; shadow-opacity = 1.0; shadow-offset-x = -20; shadow-offset-y = -20; opacity = 0.8; full-shadow = true; }; 
  dnd = { shadow = false; }
  dropdown_menu = { shadow = false; };
  popup_menu    = { shadow = false; };
  utility       = { shadow = false; };
}
```


### Problema de fuentes escasas 

No todas las fuentes están instaladas, por tanto, haremos los siguientes pasos:

1. Escribimos `cd /usr/share/fonts/`.
2. Migramos al *usuario root*[^23] con `sudo su` y brindamos nuestra contraseña.

#### Primera opción

Atención al comando con *wget*, nuestra herramienta para descargar ficheros web:

```bash
wget http://fontlot.com/downfile/5baeb08d06494fc84dbe36210f6f0ad5.105610
```

Esto descargara la fuente Iovseka.zip, en caso de no funcionar tenemos como alternativa [Nerd Fonts](https://www.nerdfonts.com/font-downloads) y buscar manualmente Iovseka.

> El comando lo que hace es buscar por todos los archivos en el directorio actual y filtrar por aquellos que terminen en extensión .ttf, seguido entra en un bucle while para leer cada linea de archivos terminantes en .ttf para copiarlos en el directorio actual. Cuando termine, cerrará el bucle while.
> 
```bash
find . | grep "\.ttf$" | while read line; do cp $line .; done
```

#### Segunda opción

En este caso sera ejecutar bajo el directorio repos los comandos. Ya deberíamos tener la soltura de tanto que nos hemos movido entre carpetas para encontrar repos.

> Migramos al usuario normal, ya que debemos estar con bajos privilegios.

1. Ejecutamos bajo el directorio repos `git clone https://aur.archlinux.org/ttf-iosevka.git`. Presionamos *Enter* y nos dejara una carpeta.
2. Hacemos un `cd ttf-iosevka` y escribimos `makepkg -si.
3. `cd pkg`.

Aquí viene la jugada usando Bash Scripting:

```bash
find . | grep "\.ttf$" | while read line; do sudo cp $line /usr/share/fonts; done
```

4. Nos iremos un directorio atrás con `cd ..`, puesto que debemos entrar al directorio src `cd scr`
5. Posterior repetimos la jugada con Bash Scripting:

```bash
find . | grep "\.ttf$" | while read line; do sudo cp $line /usr/share/fonts; done
```

Por último hacemos un `fc-cache -v`.
### Instalación de herramientas útiles para el sistema.

Instalamos `bat`, `lsd`,`flameshot`, `fzf y ranger` e instalar el plugin `zsh-syntax-highlighting`.

 Ejecutamos en nuestra *kitty* `sudo pacman -S bat lsd flameshot fzf ranger`.

Para este paso y tunear nuestra terminal con *kitty*, Instalaremos la *PowerLevel10k* en nuestra zsh para darle una mejor estética. Para ello debemos abrirnos el FIrefox y buscar "powerlevel10k github" en el caso de querer saber más de proyecto. Dejare aquí los comandos que debemos realizar para instalar la *PowerLevel10k*.

1. La correcta instalación nos dice que debemos estar bajo la ruta `/home/*username*`, así que haremos un `cd`.
2. Clonamos *PowerLevel10k* ejecutando `git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k; echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc`
3. Seguido escribimos zsh y completamos todo el tutorial, ya que previamente instalamos nuestras nerd fonts. No tendremos ningún problema con la configuración de la *PowerLevel10k*.
4. Una vez terminemos los pasos, debemos migrar al *usuario root*, para ello `sudo su` y ponemos nuestra contraseña.
5. Escribimos `cd` para estar bajo la ruta `/root` y clonar nuevamente la *PowerLevel10k* como hicimos en el paso 2.

Para evitar errores y aprovechar que nos encontramos como *usuario root* escribimos `chsh -s zsh`, después cambiamos el tipo de *Shell* por defecto tanto para _root_ como para el _usuario con bajos privilegios_.

En caso de ejecutar `echo $SHELL` y respuesta sea _/bin/bash_ hay que cambiarla por una zsh. Ejecutamos los siguientes comandos:

```bash
usermod --shell /usr/bin/zsh *username*
usermod --shell /usr/bin/zsh root
```

Creamos un enlace simbólico con **ln** de la zshrc para root, nos iremos al directorio `root` y ejecutamos el siguiente comando:

```bash
ln -s -f /home/*userame*/.zshrc .zshrc
```

Como configuración extra, al momento de migrar al usuario *root* podemos editar sobre la PowerLevel10k para root el mensaje `with root`.

Retocamos el archivo `.p10k.zsh` para adecuarlo a nuestro gusto.

> Para el de root, podemos ir a `'POWERLEVEL9K_CONTEXT_ROOT_TEMPLATE'` para asignar el **Hashtag** o el símbolo que queramos desplegar al momento de ser root.

Comentamos la siguiente línea:

```
POWERLEVEL9K_CONTEXT_PREFIX='%246Fwith '
```

### Problema con permisos.

Para evitar un pequeño problema de permisos a la hora de migrar desde el usuario _root_ migrar con _‘su’_ al usuario con bajos privilegios, ejecutamos los siguientes comandos.

```bash
chown {usuario}:{usuario} /root
chown {usuario}:{usuario} /root/.cache -R
chown {usuario}:{usuario} /root/.local -R
```

### Problema al usar Vim, Nvim con zshrc.

Para arreglar el error del cursor incorporamos posteriormente las siguientes líneas al final del _zshrc_ para que al salir de *vim* el cursor recupere su aspecto de línea.

```bash
# Change cursor shape for different vi modes.
    function zle-keymap-select {
        if [[ $KEYMAP == vicmd ]] || [[ $1 = 'block' ]]; then
             echo -ne '\e[1 q'
        elif [[ $KEYMAP == main ]] || [[ $KEYMAP == viins ]] || [[ $KEYMAP = '' ]] || [[ $>
             echo -ne '\e[5 q'
        fi
    }
    zle -N zle-keymap-select
# Start with beam shape cursor on zsh startup and after every command.
-zle-line-init() { zle-keymap-select 'beam'}
```

#Archivo zshrc

```bash
# Created by newuser for 5.9

eval "$(/home/palo/.local/bin/oh-my-posh init zsh --config /home/palo/.config/ohmyposh/pure.omp.json)"
# Fix the Java Problem
export _JAVA_AWT_WM_NONREPARENTING=1
export AWT_TOOLKIT=MToolkit

# enable completion features
autoload -Uz compinit
compinit -d ~/.cache/zcompdump
zstyle ':completion:*:*:*:*:*' menu select
zstyle ':completion:*' auto-description 'specify: %d'
zstyle ':completion:*' completer _expand _complete
zstyle ':completion:*' format 'Completing %d'
zstyle ':completion:*' group-name ''
zstyle ':completion:*' list-colors ''
zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
zstyle ':completion:*' rehash true
zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
zstyle ':completion:*' use-compctl false
zstyle ':completion:*' verbose true
zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'

# Use modern completion system
autoload -Uz compinit
compinit

zstyle ':completion:*' auto-description 'specify: %d'
zstyle ':completion:*' completer _expand _complete _correct _approximate
zstyle ':completion:*' format 'Completing %d'
zstyle ':completion:*' group-name ''
zstyle ':completion:*' menu select=2
eval "$(dircolors -b)"
zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' list-colors ''
zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
zstyle ':completion:*' matcher-list '' 'm:{a-z}={A-Z}' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=* l:|=*'
zstyle ':completion:*' menu select=long
zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
zstyle ':completion:*' use-compctl false
zstyle ':completion:*' verbose true

zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'

HISTFILE=~/.zsh_history
HISTSIZE=1000
SAVEHIST=2000
setopt histignorealldups sharehistory


# Custom Aliases
# -----------------------------------------------
# bat
alias cat='bat'
alias catn='bat --style=plain'
alias catnp='bat --style=plain --paging=never'

# ls
alias ll='lsd -lh --group-dirs=first'
alias la='lsd -a --group-dirs=first'
alias l='lsd --group-dirs=first'
alias lla='lsd -lha --group-dirs=first'
alias ls='lsd --group-dirs=first'

# Functions
function mkt(){
	mkdir {nmap,content,exploits}
}

function burp(){
  burpsuite &>/dev/null & disown
}

# Extract nmap information
function extractPorts(){
	ports="$(cat $1 | grep -oP '\d{1,5}/open' | awk '{print $1}' FS='/' | xargs | tr ' ' ',')"
	ip_address="$(cat $1 | grep -oP '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}' | sort -u | head -n 1)"
	echo -e "\n[*] Extracting information...\n" > extractPorts.tmp
	echo -e "\t[*] IP Address: $ip_address"  >> extractPorts.tmp
	echo -e "\t[*] Open ports: $ports\n"  >> extractPorts.tmp
	echo $ports | tr -d '\n' | xclip -sel clip
	echo -e "[*] Ports copied to clipboard\n"  >> extractPorts.tmp
	cat extractPorts.tmp; rm extractPorts.tmp
}
function limpiar(){
	echo '' > ~/.zsh_history
	echo -e "[!] Se ha limpiado el historial" > limpiarlog.tmp
	cat limpiarlog.tmp; rm limpiarlog.tmp
}
function rim(){
	rm ~/.zsh_history
	echo -e "[!] Se ha eliminado el historial" > rimlog.tmp
	cat rimlog.tmp; rm rimlog.tmp
}

source /usr/share/zsh-plugins/sudo.plugin.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
function musb(){
	sudo mount -t ntfs-3g /dev/sdb1 /mnt/usb
	echo -e "[!] Se ha montado la usb" > montlog.tmp
	cat montlog.tmp; rm montlog.tmp
}

function dusb(){
	sudo umount /mnt/usb
	echo -e "[!] Se ha desmontado la usb" > montlog.tmp
	cat montlog.tmp; rm montlog.tmp
}

function settarget(){
    ip_address=$1
    machine_name=$2
    echo "$ip_address $machine_name" > /home/palo/.config/polybar/bin/.target.tmp
}

function cleartarget(){
	echo '' > /home/palo/.config/polybar/bin/.target.tmp
}

#Eliminar negrita de la zsh con ultimas versiones de powerlevel10k
export LS_COLORS="rs=0:di=34:ln=36:mh=00:pi=40;33:so=35:do=35:bd=40;33:cd=40;33:or=40;31:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=32:*.tar=31:*.tgz=31:*.arc=31:*.arj=31:*.taz=31:*.lha=31:*.lz4=31:*.lzh=31:*.lzma=31:*.tlz=31:*.txz=31:*.tzo=31:*.t7z=31:*.zip=31:*.z=31:*.dz=31:*.gz=31:*.lrz=31:*.lz=31:*.lzo=31:*.xz=31:*.zst=31:*.tzst=31:*.bz2=31:*.bz=31:*.tbz=31:*.tbz2=31:*.tz=31:*.deb=31:*.rpm=31:*.jar=31:*.war=31:*.ear=31:*.sar=31:*.rar=31:*.alz=31:*.ace=31:*.zoo=31:*.cpio=31:*.7z=31:*.rz=31:*.cab=31:*.wim=31:*.swm=31:*.dwm=31:*.esd=31:*.jpg=35:*.jpeg=35:*.mjpg=35:*.mjpeg=35:*.gif=35:*.bmp=35:*.pbm=35:*.pgm=35:*.ppm=35:*.tga=35:*.xbm=35:*.xpm=35:*.tif=35:*.tiff=35:*.png=35:*.svg=35:*.svgz=35:*.mng=35:*.pcx=35:*.mov=35:*.mpg=35:*.mpeg=35:*.m2v=35:*.mkv=35:*.webm=35:*.webp=35:*.ogm=35:*.mp4=35:*.m4v=35:*.mp4v=35:*.vob=35:*.qt=35:*.nuv=35:*.wmv=35:*.asf=35:*.rm=35:*.rmvb=35:*.flc=35:*.avi=35:*.fli=35:*.flv=35:*.gl=35:*.dl=35:*.xcf=35:*.xwd=35:*.yuv=35:*.cgm=35:*.emf=35:*.ogv=35:*.ogx=35:*.aac=36:*.au=36:*.flac=36:*.m4a=36:*.mid=36:*.midi=36:*.mka=36:*.mp3=36:*.mpc=36:*.ogg=36:*.ra=36:*.wav=36:*.oga=36:*.opus=36:*.spx=36:*.xspf=36:"

export GEM_HOME=~/.ruby/
#export PATH="$PATH:/usr/sbin:/opt:~/.ruby/bin:/home/qw4qe/.local/share/gem/ruby/3.2.0/bin/"
export PATH="$PATH:/usr/sbin:/opt/apps:/home/palo/.local/bin:~/.ruby/bin:/home/palo/.local/share/gem/ruby/3.3.0/bin"
export ZSH_DISABLE_COMPFIX=true

bindkey "\E[1~" beginning-of-line
bindkey "\E[4~" end-of-line
bindkey "^[[H" beginning-of-line
bindkey "^[[F" end-of-line
bindkey "^[[3~" delete-char
bindkey "^[[1;3C" forward-word
bindkey "^[[1;3D" backward-word

# Change cursor shape for different vi modes.
function zle-keymap-select {
  if [[ $KEYMAP == vicmd ]] || [[ $1 = 'block' ]]; then
    echo -ne '\e[1 q'
  elif [[ $KEYMAP == main ]] || [[ $KEYMAP == viins ]] || [[ $KEYMAP = '' ]] || [[ $1 = 'beam' ]]; then
    echo -ne '\e[5 q'
  fi
}
zle -N zle-keymap-select

# Start with beam shape cursor on zsh startup and after every command.
zle-line-init() { zle-keymap-select 'beam'}

# Use beam shape cursor on startup.
#echo -ne '\e[5 q'
# Use beam shape cursor for each new prompt.
#preexec() {
#  echo -ne '\e[5 q'
#}
_fix_cursor() {
   echo -ne '\e[5 q'
}

precmd_functions+=(_fix_cursor)

```

---
<h1 id="ufetch-neofetch-alternative" class="titulo-principal">ufetch neofetch alternative</h1>

Como *neofetch* fue descontinuado usaremos la alternativa ufetch:

1. Migramos a root con `sudo su`.
2. Nos dirigimos a `cd /opt/`.
3. Creamos una carpeta llamada apps `mkdir apps`.
4. Ejecutamos `cd apps`.
5. Y crearemos el archivo ufetch usando *vim*, en este caso para Arch es el siguiente:

```bash
#!/bin/sh
#
# ufetch-arch - tiny system info for arch

## INFO

# user is already defined
host="$(cat /etc/hostname)"
os='Arch Linux'
kernel="$(uname -sr)"
uptime="$(uptime -p | sed 's/up //')"
packages="$(pacman -Q | wc -l)"
shell="$(basename "${SHELL}")"

## UI DETECTION

parse_rcs() {
  for f in "${@}"; do
    wm="$(tail -n 1 "${f}" 2> /dev/null | cut -d ' ' -f 2)"
    [ -n "${wm}" ] && echo "${wm}" && return
  done
}

rcwm="$(parse_rcs "${HOME}/.xinitrc" "${HOME}/.xsession")"

ui='unknown'
uitype='UI'
if [ -n "${DE}" ]; then
  ui="${DE}"
  uitype='DE'
elif [ -n "${WM}" ]; then
  ui="${WM}"
  uitype='WM'
elif [ -n "${XDG_CURRENT_DESKTOP}" ]; then
  ui="${XDG_CURRENT_DESKTOP}"
  uitype='DE'
elif [ -n "${DESKTOP_SESSION}" ]; then
  ui="${DESKTOP_SESSION}"
  uitype='DE'
elif [ -n "${rcwm}" ]; then
  ui="${rcwm}"
  uitype='WM'
elif [ -n "${XDG_SESSION_TYPE}" ]; then
  ui="${XDG_SESSION_TYPE}"
fi

ui="$(basename "${ui}")"

## DEFINE COLORS

# probably don't change these
if [ -x "$(command -v tput)" ]; then
  bold="$(tput bold 2> /dev/null)"
  black="$(tput setaf 0 2> /dev/null)"
  red="$(tput setaf 1 2> /dev/null)"
  green="$(tput setaf 2 2> /dev/null)"
  yellow="$(tput setaf 3 2> /dev/null)"
  blue="$(tput setaf 4 2> /dev/null)"
  magenta="$(tput setaf 5 2> /dev/null)"
  cyan="$(tput setaf 6 2> /dev/null)"
  white="$(tput setaf 7 2> /dev/null)"
  reset="$(tput sgr0 2> /dev/null)"
fi

# you can change these
lc="${reset}${bold}${blue}"         # labels
nc="${reset}${bold}${blue}"         # user and hostname
ic="${reset}"                       # info
c0="${reset}${blue}"                # first color

## OUTPUT

cat <<EOF

${c0}        /\\         ${nc}${USER}${ic}@${nc}${host}${reset}
${c0}       /  \\        ${lc}OS:        ${ic}${os}${reset}
${c0}      /\\   \\       ${lc}KERNEL:    ${ic}${kernel}${reset}
${c0}     /  __  \\      ${lc}UPTIME:    ${ic}${uptime}${reset}
${c0}    /  (  )  \\     ${lc}PACKAGES:  ${ic}${packages}${reset}
${c0}   / __|  |__\\\\    ${lc}SHELL:     ${ic}${shell}${reset}
${c0}  /.\`        \`.\\   ${lc}${uitype}:        ${ic}${ui}${reset}

EOF
```
 
------
<h3 class="titulo-secundario">Referencias</h3>

[^1]: iNet Wireless Daemon (iwd) project aims to provide a comprehensive Wi-Fi connectivity solution for Linux based devices. The core goal of the project is to optimize resource utilization: storage, runtime memory and link-time costs. This is accomplished **by not depending on any external libraries and utilizes features provided by the Linux Kernel to the maximum extent possible.** The result is a self-contained environment that only depends on the Linux Kernel and the runtime C library.

[^2]: **Ping** Comprueba la conectividad a nivel de IP con otro equipo TCP/IP mediante el envío de mensajes de solicitud de eco del protocolo de mensajes de control de Internet (ICMP). Se muestra la recepción de los mensajes de respuesta de eco correspondientes, junto con los tiempos de ida y vuelta. 

[^3]: A special area of every disk is set aside for storing information about the disk's controller, geometry, and slices. That information is called the disk's **label**. Another term that is used to described the disk label is the VTOC (Volume Table of Contents). To **label** a disk means to write slice information onto the disk

[^4]: **MBR (Master Boot Record) and GPT (GUID Partition Table) are the most widely used partition tables**. As compared to GPT, MBR is an old standard and has some limitations. In the MBR scheme with 32-bit entries, we can only have a maximum disk size of 2 TB. Furthermore, only four primary partitions are allowed. Meanwhile GPT is the New standard as partition table.

[^5]: **cfdisk** es un comando que se utiliza para modificar y editar las particiones físicas o lógicas de los discos teniendo como ventaja la posibilidad de ampliar las particiones extendidas cuando hay espacio libre tras ellas los cual no es posible con otros comandos como el [comando Fdisk](https://es.wikipedia.org/wiki/Fdisk)

[^6]: The EFI (Extensible Firmware Interface) system partition or ESP is a partition on a data storage device (usually a hard disk drive or solid-state drive) that is used by computers that have the Unified Extensible Firmware Interface (UEFI). UEFI = **Unified Extensible Firmware Interface**. Effectively the same things. EFI is primarily about booting. It is aimed at replacing the historic system of booting PCs via boot sectors, notably the Master Boot Record (MBR) supplemented by Primary, Secondary and Logical partition boot sectors.

[^7]: The **BIOS boot partition** is a [partition](https://en.wikipedia.org/wiki/Partition_(computing) "Partition (computing)") on a [data storage device](https://en.wikipedia.org/wiki/Data_storage_device "Data storage device") that [GNU GRUB](https://en.wikipedia.org/wiki/GNU_GRUB "GNU GRUB") uses on legacy [BIOS](https://en.wikipedia.org/wiki/BIOS "BIOS")-based [personal computers](https://en.wikipedia.org/wiki/Personal_computer "Personal computer") in order to [boot](https://en.wikipedia.org/wiki/Booting "Booting") an [operating system](https://en.wikipedia.org/wiki/Operating_system "Operating system"), when the actual [boot device](https://en.wikipedia.org/wiki/Boot_device "Boot device") contains a [GUID Partition Table](https://en.wikipedia.org/wiki/GUID_Partition_Table "GUID Partition Table") (GPT). Such a layout is sometimes referred to as BIOS/GPT boot.[[1]](https://en.wikipedia.org/wiki/BIOS_boot_partition#cite_note-1). A BIOS boot partition is needed on GPT-partitioned storage devices to hold the second stages of GRUB. On traditional [MBR](https://en.wikipedia.org/wiki/Master_Boot_Record "Master Boot Record")-partitioned devices, the [disk sectors](https://en.wikipedia.org/wiki/Disk_sector "Disk sector") immediately following the first are usually unused, as the partitioning scheme does not designate them for any special purpose and partitioning tools avoid them for alignment purposes. On GPT-based devices, the sectors hold the actual partition table, necessitating the use of an extra partition.

[^8]: El gestor de arranque **es el primer software que se ejecuta cuando se arranca el ordenador**. Es responsable de la carga y de la transferencia del control al software del sistema operativo del kernel. El kernel, por otro lado, inicializa el resto del sistema operativo.

[^9]: La partición *swap* en Linux es un **espacio del disco duro utilizado por el sistema operativo como memoria virtual o almacenamiento temporal**. Es utilizado cuando no hay espacio suficiente en la memoria RAM para guardar datos de aplicaciones, por lo que la partición *swap* cumple la función de emular RAM en disco.

[^10]: The _root partition_ in a system contains all the necessary files and directories. Every user must know what is _root partition_ in Linux.

[^11]: lsblk **enumera información sobre todos los dispositivos de bloque disponibles o especificados** incluyendo particiones de disco.

[^12]: https://www.gnu.org/software/grub/manual/grub/grub.html#BIOS-installation, (Sector 4.4) When creating a BIOS Boot Partition on a GPT system, you should make sure that it is at least 31 KiB in size. (GPT-formatted disks are not usually particularly small, so we recommend that you make it larger than the bare minimum, such as 1 MiB, to allow plenty of room for growth.)

[^13]: https://www.reddit.com/r/linuxmasterrace/comments/sm5k7a/which_side_are_you/

[^14]: fdisk **es un software que está disponible para varios sistemas operativos, el cual permite dividir en forma lógica un disco duro**, siendo denominado este nuevo espacio como partición. La descripción de las particiones se guarda en la tabla de particiones que se localiza en el sector 0 de cada disco.

[^15]: El **Cuarto Sistema de Archivos Extendido (Ext4)** es el sistema de archivos nativo de Linux.

[^16]: EFI-based systems boot using an EFI system partition, whose format is defined in [the EFI specifications](https://uefi.org/specifications/). This format is based on FAT, but is maintained by [the Unified Extensible Firmware Interface Forum](https://uefi.org/). What happens to FAT now has no effect on the EFI system partition format itself. So whether FAT32 is deprecated or not, you’ll still see EFI system partitions with a FAT-based format, for a long time to come. UEFI systems are able to boot only from FAT12/16/32 partitions (and ISO9660 for optical disks):[https://en.wikipedia.org/wiki/EFI_system_partition](https://en.wikipedia.org/wiki/EFI_system_partition)

[^17]: **El sistema divide y almacena archivos entre grupos de datos, a los que accede cuando interactúa con un archivo** . Una tabla de asignación de archivos (FAT) almacena información sobre los grupos de datos en el disco e indica si un grupo específico está asignado para un archivo o directorio.

[^18]: You can't mount the "future" root filesystem to `/` because the Live USB you are installing from already has it's own root filesystem mounted to `/`. During the installation you mount the filesystems you created for your new system temporarily to `/mnt`, copy the system to it, switch to it using [chroot](https://en.wikipedia.org/wiki/Chroot) and do the configuration which includes configuring the `/etc/fstab` and bootloader configuration to make sure the newly created filesystems are mounted to `/` and `/home` after the reboot. Btw. if you are new to Linux, I suggest not starting with Arch, but rather with some more "user friendly" distribution like Ubuntu, Mint or Fedora. (Installation on these work the same way but the graphical installer hides those parts.)

[^19]: Pacstrap *es un script* que toma como parámetros el punto de montaje del sistema raíz *( /mnt )* y los paquetes a descargar e instalar en dicho directorio.

[^20]: El comando cat en Linux **permite concatenar y mostrar el contenido de archivos**. Deriva de «con*cat*enar» y se utiliza para visualizar, unir y crear archivos. Por ejemplo, «cat ejemplo. txt» muestra el contenido de «ejemplo.

[^21]: El comando ln **es una herramienta muy útil en el sistema operativo Linux para crear enlaces simbólicos y duros**. Estos enlaces son una forma de asociar un archivo o directorio existente a otro lugar en el sistema de archivos.

[^22]: Un usuario en Linux está **asociado a una cuenta de usuario, que consta de varias propiedades que definen su identidad y privilegios dentro del sistema**.

[^23]: El usuario *root* en Linux es el usuario que **tiene acceso administrativo al sistema**. Los usuarios normales no tienen este acceso por razones de seguridad. Se da acceso administrativo a usuarios individuales, que pueden utilizar la aplicación *sudo* para realizar tareas administrativas. La primera cuenta de usuario que creó en su sistema durante la instalación tendrá, de forma predeterminada, acceso a sudo.

[^24]: To be safe and secure, **root account should have logins disabled**. Applications' Vulnerability: When an application is served using the root account, in case of vulnerability, hacker can execute code remotely and gain access. Also your application can erase important files or directories mistakenly.

[^25]: Modern Unix systems generally use user groups as a security protocol to control access privileges. The wheel group is **a special user group used on some Unix systems, mostly BSD systems, to control access to the su or sudo command, which allows a user to masquerade as another user (usually the super user)**.

[^26]: **El Shell en Linux es una interfaz de línea de comandos** que permite a los usuarios interactuar con el sistema operativo. *Es una herramienta que proporciona un entorno para ejecutar programas* y gestionar archivos, directorios y otras tareas. **El shell interpreta los comandos del usuario**, que pueden escribirse directamente en la ventana del terminal o leerse desde un archivo de script. Entre los más conocidos se encuentran **Bash, Zsh, Sh**.

[^27]: Sudo **significa “superuser do” y permite a los usuarios autorizados ejecutar comandos en nombre de otro usuario del sistema**. A modo de ejemplo, el comando sudo permite ejecutar comandos en nombre del usuario root. No obstante, el comando sudo no tiene la capacidad de otorgar todos los derechos del usuario root.

[^28]: In the Linux and Unix-like operating systems, the sudoers file is **a configuration file used by the sudo command, which allows a permitted user to execute a command as another user** (typically the superuser, or root).

[^29]: Daemons are **background processes that start at system boot and continue running until the system is shut down**. They are typically initiated by the init process, the first process that starts when a Unix-like system boots up, and the parent of all other processes.



Esta publicación ha sido creada como soporte para la instalación de un sistema Arch.

© Juan David Garcia Acevedo (aka liandd)
