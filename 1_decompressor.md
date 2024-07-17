---
title: Bandit Decompressor
layout: page
permalink: /decompressor
---
## Decompressor, Herramienta para Bandit 12-13.
**Descripción**

Hace un tiempo he venido obteniendo soltura en Bash. Para practicar un poco de scripting con Bandit, he terminado desarrollando un pequeño script en Bash para descomprimir un archivo que tiene una cantidad desconocida de archivos comprimidos en su interior. 

La plataforma OTW presenta Bandit para el aprendizaje de Bash en forma de niveles, donde en el nivel 13-14 se presenta un caso en el cual hay un archivo con una cantidad enorme de comprimidos en su interior.

### Presentación del Script

<div style="text-align: center;">
  <img src="/assets/images/Bandit-Decompressor/decompressor.png" alt="bandit" width="900" oncontextmenu="return false;">
</div>

---
Específicamente para los niveles 13-14, el script es útil porque no tienes que estar mirando y descomprimiendo uno por uno los archivos que tiene el archivo en su interior.

### Situación de uso

Una vez descomprimido el archivo de Bandit13-14 llamado data, se debe cambiar su nombre a **content.gzip**. Después del cambio de nombre no hay necesidad de saber si el nuevo archivo está comprimido de nuevo y hacer el mismo proceso repetitivo, esto es debido al script.

El Script de `Decompressor` hace lo siguiente:
1. Teniendo el archivo **content.gzip**, el script leerá el último argumento del archivo adentro del comprimido.
2. Entrará en un bucle, siempre y cuando el último argumento sea también de tipo comprimido.
3. De ser así, seguirá descomprimiéndose hasta que ya no quede un archivo de tipo comprimido.
4. `Decompressor` sabrá cuando el ultimo argumento no sea un archivo comprimido, así que aplica un `/bin/cat` al archivo resultante.
5. `Decompressor` ayuda a acceder al contenido mucho mas rápido que si lo hiciéramos descomprimiendo archivo por archivo.
6. El Script hace uso de sentencias de selección (if, else).
7. Usando `7z l content.gzip`, lo que haremos es listar el contenido del archivo sin extraerlo.
8. El uso de' grep `"Name" -A 2`, significa que grep buscará un patrón en el stdout del comando `7z l al archivo content.gzip` y lo mostrara en pantalla.
9. Al hacer uso de `tail -n 1`, grep solo mostrara la ultima coincidencia con el patrón "Name".
10. El comando `awk 'NF{print NF}'` Esto nos permite obtener únicamente el nombre del archivo descomprimido.
Finalmente, el nombre del archivo descomprimido se asigna a la variable `name_decompressed`.

### Código del Script

> Para mayor entendimiento del script y lo que hace, recomiendo probar un poco experimentar con los comandos *grep*, *tail*, *awk* y sus parámetros:

```bash
#!/bin/bash
# Juan Garcia (aka liandd)
name_decompressed=$(7z l content.gzip | grep "Name" -A 2 | tail -n 1 | awk 'NF{print $NF}')
7z x  content.gzip > /dev/null 2>&1

while true; do
	7z l $name_decompressed > /dev/null 2>&1
	if [ "$(echo $?)" == "0" ]; then
		decompressed_next=$(7z l $name_decompressed | grep "Name" -A 2 | tail -n 1 | awk 'NF{print $NF}')
		7z x $name_decompressed > /dev/null 2>&1 && name_decompressed=$decompressed_next
	else
		cat $name_decompressed; rm data* 2>/dev/null
		exit 1
	fi
done
```

Para usar correctamente `Decompressor`, al estar en el Bandit13-14, hay que cambiar el nombre del archivo a **content.gzip** como se mencionó anteriormente, de esta forma funcionara sin problemas.

Para conseguir el **content.gzip**, hacemos lo siguiente:
```bash
liann@nk:~/bandit14$ 
└──╼ $ls
data.hex
liann@nk:~/bandit14$
└──╼  $xxd -r data.hex > data
liann@nk:~/bandit14$ 
└──╼ $file data
data: gzip compressed data, was 'data2.bin' .......
liann@nk:~/bandit14$ 
└──╼ $mv data content.gzip
liann@nk:~/bandit14$ 
└──╼ $ ./decompressor content.gzip
The password is .....
```
### Conclusión

El Script es compilado y funciona correctamente:

<div style="text-align: center;">
  <img src="/assets/images/Bandit-Decompressor/result.png" alt="bandit" width="900" oncontextmenu="return false;">
</div>

---

Esta publicación ha sido creada como soporte en el aprendizaje de OverTheWire:

[Aprendizaje en Over The Wire, Wargames -> Bandit](https://overthewire.org/wargames/bandit/)

© Juan David Garcia Acevedo (aka liandd)
