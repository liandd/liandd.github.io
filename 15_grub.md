---
tittle: Grub Rescue de x86_64 a i386
layout: page 
permalink: /grubRescue
---

<h2 id="subtitulo-importante">Grub Rescue de x86_64 a i386</h2>


Hacer cambios de una unidad de almacenamiento ya sea un disco duro, o un disco de estado solido con un sistema operativo instaldo puede causar algunos inconvenientes, puesto que los equipos pueden contar con una diferencia de fabricación y en como acceden al sistema operetivo. Teniendo esto presente se tiene un SSD con un sistema linux EFI/UEFI y al migrar a otro equipo que solo conoce BIOS se presenta el inconveniete presentado a continuación:

> Al arrancar el sistema aparece el tedioso mensaje <strong>Grub Rescue</strong> después de transladar un disco de una máquina a otra.

```bash
ls
> (hd0), (hd0,msdos3), (hd0,msdos2), (hd0,msdos3)
```

Al usar 'ls' podemos ver unas particiones, siginifica que se presenta la oportunidad de recuperar nuestro sistema.
Podemos hacer 'ls' para en las diferentes particiones hasta encontrar nuestra raíz de sistema.

```bash
ls (hd0,msdos3)/
```

Hacer esto permite ver nuestra raíz de archivos linux instalados en el disco, y buscando entre los directorios encontramos 

```bash
ls (hd0,msdos3)/boot/grub
```

Algunas publicaciones sugieren hacer
```bash
isnmod normal
```

Pero hacer esto solo reproduce el error:
```bash
File '/boot/grub/i386-pc/normal.mod' not found
```

Pero no hay más información respecto a que hacer en caso del error. Esto se debe a que la configuración de GRUB se vió afectada al mover la unidad del disco a una máquina diferente, y al inspeccionar el sistema de archivos con `ls (hd0,msdos3)`, se pudo ver la carpeta /boot/grub, pero no existía la subcarpeta `i386-pc`. En su lugar, se encontro `x86_64-pc` con los módulos </strong>.mod</strong> correspondientes.

<h1 class="titulo-principal">Solución al GRUB Rescue</h1>

Dado que el sistema usa GRUB en su versión de 64 bits, la solución consiste en apuntar a la ruta correcta de los módulos.

<strong>Configurar la raíz y el prefijo de GRUB</strong>

Ejectura los siguientes comandos para asegurar que GRUB esté apuntando al lugar correcto con:

```bash
set root=(hd0,msdos3)
set prefix=(hd0,msdos2)/boot/grub/x86_64-pc
```

<strong>Cargar el módulo `normal`</strong>

```bash
insmod (hd0,msdos3)/boot/grub/x86_64-pc/normal.mod
```

Y si el comando se ejecuta sin errores, se debe escribir
```
normal
```

Y así se debería llegar al menu GRUB normal.

<strong>Arrancar el sistema manualmente</strong>

Si el menú de GRUB no aparece, se puede intentar arrancar el kernel manualmente:

```bash
linux (hd0,msdos3)/boot/vmlinux-linux root=/dev/sda3 ro
initrd (hd0,msdos3)/boot/initramfs-linux.img
boot
```

Si el comando `linux` no es reconocido, significa que GRUB sigue en modo de rescate, por lo que tenemos que reinstalar el GRUB.

<h3 class="titulo-secundario">Solución desde un Live USB</h3>

Si los pasos anteriores no funcionan, la mejor opción es arrancar desde un Live USB de Arch Linux y reinstalar GRUB:

<strong>Montar la partición root</stron>

```bash
sudo mount /dev/sda3 /mnt
# Si hay una partición /boot separada, móntala también:
sudo mount /dev/sda1 /mnt/boot
```

<strong>Preparar el entorno chroot</strong>

```bash
sudo mount --bind /dev /mnt/dev
sudo mount --bind /proc /mnt/proc
sudo mount --bind /sys /mnt/sys
sudo chroot /mnt
```

<strong>Reinstalar GRUB</strong>

```bash
grub-install /dev/sda
# Actualizar la configuración de GRUB:
grub-mkconfig -o /boot/grub/grub.cfg
```

<strong>Salir del chroot y reiniciar</strong>

```bash
exit
sudo umount /mnt/dev /mnt/proc /mnt/sys /mnt
sudo reboot
```

<h2 id="subtitulo-importante">Conclusión</h2>

Este problema ocurrió porque el sistema tenía GRUB de 64 bits, pero GRUB buscaba archivos en la carpeta incorrecta (i386-pc en lugar de x86_64-pc). Ajustando la ruta correctamente en grub rescue, fue posible recuperar el sistema. Sin embargo, para evitar futuros inconvenientes, se recomienda reinstalar GRUB desde un entorno Live USB.

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
