---
title: Archivos de Configuración Bspwm Parrot
layout: page
permalink: /Misc_Dotfiles_Parrot
---

<h2 id="whity">Configuración personal de entorno de trabajo Bspwm.</h2>

<h1 class="amarillo">Vista Previa</h1>

<div style="text-align: center;">
  <img src="/assets/images/Dotfiles-en-bspwm/fondo.png" alt="bof" oncontextmenu="return false;">
</div>

<h1 class="amarillo">Descripción</h1>

Este entorno de trabajo personalizado con Bspwm está diseñado para máquinas con sistema operativo GNU/Linux y distribuciones basadas en Debian. Está enfocado en el pentesting y tiene una configuración con atajos de teclado.

Para este entorno se utiliza el gestor de ventanas Bspwm, que se basa en el concepto de *ventanas flotantes*. Es altamente personalizable, lo que permite organizar y controlar las ventanas de forma efectiva.

Se han configurado atajos de teclado optimizados para agilizar el flujo de trabajo, asignando comandos a combinaciones de teclas para realizar acciones rápidas y sencillas.

Estas son las especificaciones de mi sistema operativo:
```bash
liann@nk:~$
└──╼ $uname -a
Linux parrot 6.1.0-1parrot1-amd64 #1 SMP PREEMPT_DYNAMIC Parrot 6.1.15-1parrot1 (2023-04-25) x86_64 GNU/Linux
liann@nk:~$
└──╼ $lsb_release -a
No LSB modules are available.
Distributor ID:	Parrot
Description:	Parrot OS 5.3 (Electro Ara)
Release:	5.3
Codename:	ara
liann@nk:~$
└──╼ $
```

### Atajos de Teclado
```
Abrir terminal
    super + enter

Preselectores
    ctrl + super + alt + {Izquierda, Arriba, Derecha, Abajo}

Preselectores numericos
    ctrl + super + {1, 2, 3, 4, 5}

Tilling Window
    super + s

Mover tilling window
    ctrl + super + {Izquierda, Arriba, Derecha, Abajo}
   
Cambiar tamano tilling window
    super + alt + {Izquierda, Arriba, Derecha, Abajo}

Encasillar tilling window
    super + t
```
### Atajos de la terminal Kitty
```
Nueva terminal kitty
    ctrl + shift + enter

Cerrar terminal kitty
    ctrl + shift + w

Multiventanas kitty
    ctrl + shift + t

Cambiar nombre de la terminal kitty
    ctrl + alt + shift + t
```
La guía de instalación será la siguiente:

### Instalamos los siguientes paquetes
```bash
1. Instalamos los siguientes paquetes
liann@nk:~$
└──╼ $apt install build-essential git vim xcb libxcb-util0-dev libxcb-ewmh-dev libxcb-randr0-dev
    libxcb-icccm4-dev libxcb-keysyms1-dev libxcb-xinerama0-dev libasound2-dev libxcb-xtest0-dev
    libxcb-shape0-dev

2. Instalamos bspwm y sxhkd:
liann@nk:~$
└──╼ $cd /home/{usuario}/Descargas/
liann@nk:~$   
└──╼ $git clone https://github.com/baskerville/bspwm.git
liann@nk:~$   
└──╼ $git clone https://github.com/baskerville/sxhkd.git
liann@nk:~$   
└──╼ $cd bspwm/
liann@nk:~$   
└──╼ $make
liann@nk:~$   
└──╼ $sudo make install
liann@nk:~$   
└──╼ $cd ../sxhkd/
liann@nk:~$   
└──╼ $make
liann@nk:~$   
└──╼ $sudo make install
liann@nk:~$
└──╼ $sudo apt install bspwm

3. Cargamos en bspwm y sxhkd ficheros de ejemplo:
liann@nk:~$
└──╼ $mkdir ~/.config/bspwm
liann@nk:~$   
└──╼ $mkdir ~/.config/sxhkd
liann@nk:~$   
└──╼ $cd /home/{usuario}/Descargas/bspwm/
liann@nk:~$   
└──╼ $cp examples/bspwmrc ~/.config/bspwm/
liann@nk:~$   
└──╼ $chmod +x ~/.config/bspwm/bspwmrc
liann@nk:~$   
└──╼ $cp examples/sxhkdrc ~/.config/sxhkd/
```

Abrimos el sxhkdrc y configuramos el tipo de terminal así como algunos shortcuts

### Archivo Sxhkdrc
```bash
# terminal emulator
super + Return
	/opt/kitty/bin/kitty

# program launcher
super + d
	rofi -no-config -no-lazy-grab -show drun -modi drun -theme ~/.config/polybar/shades/scripts/rofi/launcher.rasi

# make sxhkd reload its configuration files:
super + Escape
	pkill -USR1 -x sxhkd

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

# set the window state
super + {t,shift + t,s,f}
	bspc node -t {tiled,pseudo_tiled,floating,fullscreen}

# set the node flags
super + ctrl + {m,x,y,z}
	bspc node -g {marked,locked,sticky,private}

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

# preselect the direction
super + ctrl + alt + {Left,Down,Up,Right}
	bspc node -p {west,south,north,east}

# preselect the ratio
super + ctrl + {1-9}
	bspc node -o 0.{1-9}

# cancel the preselection for the focused node
super + ctrl + alt + space
	bspc node -p cancel

# cancel the preselection for the focused desktop
super + ctrl + shift + space
	bspc query -N -d | xargs -I id -n 1 bspc node id -p cancel

# move a floating window
super + shift + {Left,Down,Up,Right}
	bspc node -v {-20 0,0 20,0 -20,20 0}

# Customs
alt + super + {Left,Down,Up,Right}
	/home/{usuario}/.config/bspwm/scripts/bspwm_resize {west,south,north,east}

# Google
shift + l
	firejail /usr/bin/google-chrome

# Capturas 
super + shift + g 
    /usr/bin/flameshot gui
```

### Archivo Bspwm
```lua
#! /bin/sh

pgrep -x sxhkd > /dev/null || sxhkd &

bspc monitor -d I II III IV V VI VII --cantidad de entornos de trabajos -> (10 en total)

bspc config border_width         2
bspc config window_gap          12

bspc config split_ratio          0.52
bspc config borderless_monocle   true
bspc config gapless_monocle      true

feh --bg-fill /home/{usuario}/Descargas/fondo.png & --fondo de pantalla
~/.config/polybar/./launch.sh --shades & --cargar polybar
bspc config focus_follows_pointer true --seguir ventanas con mouse
picom & --sombras
wmname LG3D & --habilitar clipboard entre Windows y Maquinas Virtuales
bspc config border_width 0 --eliminar bordes de ventanas
vmware-user-suid-wrapper & --habilitar clipboard entre Windows y Maquinas Virtuales
```

### Archivo .zshrc
```bash
# Fix the Java Problem
export _JAVA_AWT_WM_NONREPARENTING=1

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
	mkdir {nmap,content}
}

function burp(){
  burpsuite &>/dev/null & disown
}

# Extract nmap information
function etPorts(){
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
function musb(){
	sudo mount -t ntfs-3g /dev/sdb2 /media/usb
	echo -e "[!] Se ha montado la usb" > montlog.tmp
	cat montlog.tmp; rm montlog.tmp
}

function dusb(){
	sudo umount /media/usb
	echo -e "[!] Se ha desmontado la usb" > montlog.tmp
	cat montlog.tmp; rm montlog.tmp
}

function settarget(){
    ip_address=$1
    machine_name=$2
    echo "$ip_address $machine_name" > /home/{usuario}}/.config/polybar/scripts/.target.tmp
}

function cleartarget(){
	echo '' > /home/{usuario}/.config/polybar/scripts/.target.tmp
}
source /home/{usuario}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source ~/powerlevel10k/powerlevel10k.zsh-theme
source ~/powerlevel10k/powerlevel10k.zsh-theme

#Eliminar negrita de la zsh con ultimas versiones de powerlevel10k
export LS_COLORS="rs=0:di=34:ln=36:mh=00:pi=40;33:so=35:do=35:bd=40;33:cd=40;33:or=40;31:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=32:*.tar=31:*.tgz=31:*.arc=31:*.arj=31:*.taz=31:*.lha=31:*.lz4=31:*.lzh=31:*.lzma=31:*.tlz=31:*.txz=31:*.tzo=31:*.t7z=31:*.zip=31:*.z=31:*.dz=31:*.gz=31:*.lrz=31:*.lz=31:*.lzo=31:*.xz=31:*.zst=31:*.tzst=31:*.bz2=31:*.bz=31:*.tbz=31:*.tbz2=31:*.tz=31:*.deb=31:*.rpm=31:*.jar=31:*.war=31:*.ear=31:*.sar=31:*.rar=31:*.alz=31:*.ace=31:*.zoo=31:*.cpio=31:*.7z=31:*.rz=31:*.cab=31:*.wim=31:*.swm=31:*.dwm=31:*.esd=31:*.jpg=35:*.jpeg=35:*.mjpg=35:*.mjpeg=35:*.gif=35:*.bmp=35:*.pbm=35:*.pgm=35:*.ppm=35:*.tga=35:*.xbm=35:*.xpm=35:*.tif=35:*.tiff=35:*.png=35:*.svg=35:*.svgz=35:*.mng=35:*.pcx=35:*.mov=35:*.mpg=35:*.mpeg=35:*.m2v=35:*.mkv=35:*.webm=35:*.webp=35:*.ogm=35:*.mp4=35:*.m4v=35:*.mp4v=35:*.vob=35:*.qt=35:*.nuv=35:*.wmv=35:*.asf=35:*.rm=35:*.rmvb=35:*.flc=35:*.avi=35:*.fli=35:*.flv=35:*.gl=35:*.dl=35:*.xcf=35:*.xwd=35:*.yuv=35:*.cgm=35:*.emf=35:*.ogv=35:*.ogx=35:*.aac=36:*.au=36:*.flac=36:*.m4a=36:*.mid=36:*.midi=36:*.mka=36:*.mp3=36:*.mpc=36:*.ogg=36:*.ra=36:*.wav=36:*.oga=36:*.opus=36:*.spx=36:*.xspf=36:"

source ~/powerlevel10k/powerlevel10k.zsh-theme
export ZSH_DISABLE_COMPFIX=true
export PATH=$PATH:/opt/nvim-linux64/bin #Agregar el ultimo binario de nvim
```

### Creamos el archivo bspwm_resize
```bash
liann@nk:~$     
└──╼ $mkdir ~/.config/bspwm/scripts/
liann@nk:~$     
└──╼ $touch ~/.config/bspwm/scripts/bspwm_resize
liann@nk:~$     
└──╼ $chmod +x ~/.config/bspwm/scripts/bspwm_resize
```
> Mediante la siguiente configuración podremos en el futuro controlar las dimensiones y modificarlas con atajos de teclado:

### Archivo bspwm_resize
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

### Instalamos los siguientes paquetes.

Instalamos primero los siguientes paquetes:

```bash
liann@nk:~$
└──╼ $sudo apt install cmake cmake-data pkg-config python3-sphinx libcairo2-dev libxcb1-dev
     libxcb-util0-dev libxcb-randr0-dev libxcb-composite0-dev python3-xcbgen xcb-proto 
     libxcb-image0-dev libxcb-ewmh-dev libxcb-icccm4-dev libxcb-xkb-dev libxcb-xrm-dev
     libxcb-cursor-dev libasound2-dev libpulse-dev libjsoncpp-dev libmpdclient-dev
     libcurl4-openssl-dev libnl-genl-3-dev
liann@nk:~$
└──╼ $sudo apt install libuv1-dev
```

### Instalamos Picom para ajustar las transparencias.

> Primeramente, instalamos los siguientes paquetes, no sin antes actualizar el sistema:

```bash
liann@nk:~$ 
└──╼ $sudo parrot-upgrade
liann@nk:~$ 
└──╼ $sudo apt install meson libxext-dev libxcb1-dev libxcb-damage0-dev libxcb-xfixes0-dev libxcb-shape0-dev
liann@nk:~$ 
└──╼ $sudo apt install libxcb-render-util0-dev libxcb-render0-dev libxcb-randr0-dev libxcb-composite0-dev libxcb-image0-dev
liann@nk:~$ 
└──╼ $sudo apt install libxcb-present-dev libxcb-xinerama0-dev libpixman-1-dev libdbus-1-dev libconfig-dev libgl1-mesa-dev
liann@nk:~$ 
└──╼ $sudo apt install libpcre2-dev libevdev-dev uthash-dev libev-dev libx11-xcb-dev libxcb-glx0-dev
```
Posteriormente, ejecutamos los siguientes comandos bajo el directorio `~/Descargas`:

> EN KALI, EJECUTAR UNO A UNO LOS -DEV O LA INSTALACION DE PICOM CON MESON NO FUNCIONARA, DARA ERROR INFORMANDO QUE FALTAN DEPENDENCIAS. SI NO, SERA DEPRECATED Y NO SERVIRA.

```bash
liann@nk:~$ 
└──╼ $git clone https://github.com/ibhagwan/picom.git
liann@nk:~$ -     
└──╼ $cd picom/
liann@nk:~$      
└──╼ $git submodule update --init --recursive
     meson --buildtype=release . build -(DEPRECATED DO NOT USE)
liann@nk:~$ 
└──╼ $meson setup --buildtype=release . build
liann@nk:~$ 
└──╼ $ninja -C build
liann@nk:~$ 
└──╼ $sudo ninja -C build install
```
### Archivo Picom
```lua
corner-radius = 20;
rounded-corners-exclude = [
  #"window_type = 'normal'",
  #"class_g = 'firefox'",
];

round-borders = 20;
round-borders-exclude = [
  #"class_g = 'TelegramDesktop'",
];

round-borders-rule = [];

shadow = true
shadow-radius = 15
shadow-opacity = .5
shadow-offset-x = -15
shadow-offset-y = -15

shadow-exclude = [
    "class_g = 'firefox' && argb"
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

### Rofi
```bash
liann@nk:~$ 
└──╼ $sudo apt install rofi
```
### Configuramos el tema Nord de Rofi:
```bash
liann@nk:~$
└──╼ $mkdir -p ~/.config/rofi/themes
liann@nk:~$
└──╼ $cp ~/Descargas/blue-sky/nord.rasi ~/.config/rofi/themes
```
> Posteriormente con `'rofi-theme-selector'` seleccionamos el tema **Nord**.

Reiniciamos el sistema y una vez arrancado, incorporamos en el archivo `'bspwmrc'` la siguiente línea para arreglar el cursor.

```bash
xsetroot -cursor_name left_ptr &
```
---

En este punto, reiniciamos el equipo y seleccionamos **bspwm** `(Probamos que los shortcuts estén funcionando correctamente)`.

> Configuramos un poco la terminal e instalamos las `Hack Nerd Fonts`, además del Firefox (hay que descargarse la última versión,
también instalaremos `Firejail` con `apt install firejail` con el objetivo de lanzar Firefox bajo este contexto enjaulado con **sxhkd**). 
[Las fuentes de **Hack Nerd Fonts** deben ir descomprimidas en `/usr/local/share/fonts/`, una vez hecho hay que ejecutar el comando `'fc-cache -v'`]

Instalamos el addon `'FoxyProxy'` para Firefox.

Configuramos la privacidad en Firefox y el directorio de descargas principal

Instalamos `'feh'` con `'apt install feh'` para poder agregar fondos de pantalla.

> Se agrega en el archivo bspwmrc justo al final la siguiente línea:

```bash
liann@nk:~$ 
└──╼ $feh --bg-fill /home/{usuario}/Desktop/Images/fondo.jpg
```
### Polybar

Para instalar la Polybar.

```bash
liann@nk:~$  
└──╼ $cd /home/{usuario}/Descargas/
liann@nk:~$
└──╼ $git clone --recursive https://github.com/polybar/polybar
liann@nk:~$
└──╼ $cd polybar/
liann@nk:~$
└──╼ $mkdir build
liann@nk:~$
└──╼ $cd build/
liann@nk:~$
└──╼ $cmake ..
liann@nk:~$
└──╼ $make -j $(nproc)
liann@nk:~$
└──╼ $sudo make install
```

Para configurar nuestra Polybar clonaremos primeramente en 'Descargas' el siguiente repositorio.

```bash
liann@nk:~$
└──╼ $git clone https://github.com/VaughnValle/blue-sky.git
```
Posteriormente, ejecutaremos los siguientes comandos.

```bash
liann@nk:~$
└──╼ $mkdir ~/.config/polybar
liann@nk:~$
└──╼ $cd ~/Descargas/blue-sky/polybar/
liann@nk:~$
└──╼ $cp * -r ~/.config/polybar
liann@nk:~$
└──╼ $echo '~/.config/polybar/./launch.sh' >> ~/.config/bspwm/bspwmrc
liann@nk:~$
└──╼ $cd fonts
liann@nk:~$
└──╼ $sudo cp * /usr/share/fonts/truetype/
liann@nk:~$
└──╼ $fc-cache -v
```
> Hacemos `Windows + Alt + R` para cargar la configuración y deberíamos ver la **Polybar** por arriba.

### Configuramos los colores de la Polybar

Esta es la estructura en caso de que deseemos agregar un modulo propio.

```lua
--Estructura de un nuevo módulo:

--Previamente tenemos que crear una carpeta en "~/.config/bin"

[module/tumodulo]
type = custom/script
interval = 2
exec = ~/.config/bin/binario.sh

--Los modulos utilizados en estos dotfiles estan en la capeta bin de este repositorio
```

### Archivo launch.sh  
```bash
#!/usr/bin/env bash

dir="$HOME/.config/polybar"
themes=(`ls --hide="launch.sh" $dir`)

launch_bar() {
    # Terminate already running bar instances
    killall -q polybar

    # Wait until the processes have been shut down
    while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

    # Launch the bar
    if [[ "$style" == "hack" || "$style" == "cuts" ]]; then
        polybar -q top -c "$dir/$style/config.ini" &
        polybar -q bottom -c "$dir/$style/config.ini" &
    elif [[ "$style" == "pwidgets" ]]; then
        bash "$dir"/pwidgets/launch.sh --main
    else
        polybar -q main -c "$dir/$style/config.ini" &   
    fi
}
if [[ "$1" == "--material" ]]; then
    style="material"
    launch_bar

elif [[ "$1" == "--shades" ]]; then
    style="shades"
    launch_bar
else
    cat <<- EOF
    Uso : launch.sh --theme
        
    Temas :
    --shades
    EOF
fi
```
### Configurar Picom

Picom nos ayuda a ajustar las transparencias además de bordeados de ventana, para esto ejecutamos los siguientes pasos.

```bash
liann@nk:~$
└──╼ $mkdir ~/.config/picom
liann@nk:~$
└──╼ $cd ~/.config/picom
liann@nk:~$
└──╼ $nano ~/.config/picom.conf
```
> Editamos el archivo `picom.conf`, copiar el archivo y cambiamos `'backend = "glx"' por 'backend = "xrender"'`, comentando el de **glx**. 
Posteriormente, comentamos todas las líneas referentes a **glx** (En algunos ordenadores al dejar el **glx** puesto se puede llegar
a experimentar una lentitud muy molesta).

Antes de recargar la configuración, hacemos un seguimiento del mouse para saber en qué ventana estamos con la siguiente instrucción en el `bspwm`.

```bash
bspc config focus_follows_pointer true
```
Posteriormente, ejecutamos los siguientes comandos para aplicar los bordeados:
```bash
liann@nk:~$
└──╼ $echo 'picom &' >> ~/.config/bspwm/bspwmrc
liann@nk:~$
└──╼ $echo 'bspc config border_width 0' >> ~/.config/bspwm/bspwmrc
```
----

Recordar al momento de tener la Kitty, instalar la ultima versión.

### Archivo kitty.conf
```c
enable_audio_bell no

include color.ini

font_family      HackNerdFont
font_size 13

disable_ligatures never

url_color #61afef

url_style curly

map ctrl+left neighboring_window left
map ctrl+right neighboring_window right 
map ctrl+up neighboring_window up
map ctrl+down neighboring_window down
map ctrl+shift+z toggle_layout stack
cursor_shape beam
cursor_beam_thickness 1.8

mouse_hide_wait 3.0
detect_urls yes
repaint_delay 10 
input_delay 3 
sync_to_monitor yes

inactive_tab_background #e06c75
active_tab_background #98c379
inactive_tab_foreground #000000
tab_bar_margin_color black
background_opacity 0.95
map ctrl+shift+enter new_window_with_cwd
map ctrl+shift+t new_tab_with_cwd

shell zsh
tab_bar_style powerline
```

### Cambiamos el tipo de Shell por defecto tanto para *root* como para el *usuario con bajos privilegios*.

```bash
usermod --shell /usr/bin/zsh tuUsuario
usermod --shell /usr/bin/zsh root
```
### Instalamos la PowerLevel10k en zsh

Creamos un enlace simbólico de la zshrc para root, nos iremos al directorio `root` y ejecutamos el siguiente comando.

```bash
ln -s -f /home/{usuario}/.zshrc .zshrc
```

### Editar contesto sobre la PowerLevel10k para root.

Retocamos el archivo `.p10k.zsh` para adecuarlo a nuestro gusto.

> Para el de root, podemos ir a `'POWERLEVEL9K_CONTEXT_ROOT_TEMPLATE'` para asignar el **Hashtag**.

Comentamos la siguiente línea:

```bash
POWERLEVEL9K_CONTEXT_PREFIX='%246Fwith '
```
### Problema con permisos.

Para evitar un pequeño problema de permisos a la hora de desde el usuario *root* migrar con *'su'* al usuario con bajos privilegios, ejecutamos los siguientes comandos.

```bash
chown {usuario}:{usuario} /root
chown {usuario}:{usuario} /root/.cache -R
chown {usuario}:{usuario} /root/.local -R
``` 
### Instalación de herramientas útiles para el sistema.

Instalamos `bat`, `lsd`,`flameshot`, `Whichsystem.py`, `fastTCPScan.go`, `fzf y ranger` e instalar el plugin `sudo`.

> **Whichsystem.py**, es un pequeño script que se ha hecho S4vitar en la maquina Blue de HackTheBox, todos los créditos de la creación y por su tutorial para montar el entorno de Linux.

```c
https://github.com/Akronox/WichSystem.py
```

Es la herramienta creada por S4vitar, todos los créditos de esta herramienta para el.

> Con **fastTCPScan** podremos hacer descubrimiento de puertos TCP.

### Problema al usar Vim, Nvim con zshrc.

Para arreglar el error del cursos incorporamos posteriormente las siguientes líneas al final del *zshrc* para que al salir de vim el cursor recupere su aspecto de línea.

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

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)
