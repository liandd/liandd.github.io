---
title: Calcular Subnet - Script
layout: page
permalink: /Script_SubNet
---

<h2 id="subtitulo-importante">Subnet Calculator - Script</h2>
<h1 class="titulo-principal">Descripción</h1>

El proyecto se centra en el desarrollo de un script en Bash para el cálculo de parámetros de red, incluyendo la identificación de la clase de red, el `cálculo del ID de red` y del `rango de hosts`. Además, se implementa una función para obtener la representación binaria de una dirección IP y una máscara de red.

<h1 class="titulo-principal">Estructura del Proyecto</h1>

> El script de Bash consta de varias funciones clave

  **`1.`** *helpPanel*: Muestra un panel de ayuda con la descripción de los parámetros esperados.
```bash
function helpPanel(){
  echo -e "\n[!] Uso: $0 -i <ipAddress> -n <netMask>\n"
  echo -e "\ti) Direccion IPv4 para subnet"
  echo -e "\tn) Mascara de red"
  echo -e "\th) Panel de ayuda"
}
  ```
  **`2.`** *calculoSubnet*: Realiza el cálculo de la clase de red, el ID de red, el rango de hosts y la representación binaria de la IP y la máscara de red.

  **`3.`** *getNetIDRange*: Calcula el rango de ID de red, tomando en cuenta la dirección IP, la máscara de red y el incremento deseado.

  **`4.`** *getHostsPerSubnet*: Determina la cantidad de hosts por subred basándose en la máscara de red proporcionada.

  **`5.`** *binaryRepresentation*: Obtiene la `representación binaria` de la dirección IP y la máscara de red.

  ```bash
function binaryRepresentation(){
  IFS='.' read -r -a ipOctet <<< "$1"
  IFS='.' read -r -a netOctet <<< "$2"
  local ipBinary=""
  local netBinary=""
  for octet in "${ipOctet[@]}"; do
      binaryOctet=$(echo "obase=2; $octet" | bc)
      binaryOctet=$(printf "%08d" "$binaryOctet")
      ipBinary+="$binaryOctet."
  done 
  ipBinary=${ipBinary%?}
  for octet in "${netOctet[@]}"; do
      binaryOctet=$(echo "obase=2; $octet" | bc)
      binaryOctet=$(printf "%08d" "$binaryOctet")
      netBinary+="$binaryOctet."
  done
  netBinary=${netBinary%?}
  ipBIN=$ipBinary
  netBIN=$netBinary
  echo -e "\n[!] Representacion Binaria:"
  echo -e "\n[+] IP Address dada: $(printf '%s.' "${ipBIN}" | sed "s/\.$//") "
  echo -e "[+] Mascara de Red: $(printf '%s.' "${netBIN}" | sed "s/\.$//") "
}
```

<h1 class="titulo-principal">Ejemplo de Uso</h1>

```bash
./subNet.sh -i 192.168.1.1 -n 255.255.255.0
```
Este comando calculará la información de red para la dirección IP **192.168.1.1** y la máscara de red **255.255.255.0**.

<h1 class="titulo-principal">Problemas Resueltos</h1>

- **Cálculo de Rango de ID de Red**: Se corrigió la función `getNetIDRange` para proporcionar el rango correcto de ID de red.

- **Cálculo de Hosts por Subred**: La función `getHostsPerSubnet` se ajustó para manejar correctamente valores grandes sin errores de *desbordamiento*.

<h1 class="titulo-principal">Conclusión</h1>

El script de Bash ha sido mejorado y ajustado para proporcionar resultados más precisos y evitar posibles errores. Se recomienda su uso para cálculos de red a través de comandos en una terminal Bash.

<div style="text-align: center;">
<img src="/assets/images/calcular_subnet/teaser.png" alt="Maraton" oncontextmenu="return false;" >
</div>


---

<h3 class="titulo-secundario">Version en C++</h3>
<div style="text-align: center;">
<img src="/assets/images/calcular_subnet/c1.png" alt="Maraton" oncontextmenu="return false;">
</div>

---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)

