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

 -**Cálculo de Rango de ID de Red**: Se corrigió la función `getNetIDRange` para proporcionar el rango correcto de ID de red.

 -**Cálculo de Hosts por Subred**: La función `getHostsPerSubnet` se ajustó para manejar correctamente valores grandes sin errores de *desbordamiento*.

<h1 class="titulo-principal">Conclusión</h1>

El script de Bash ha sido mejorado y ajustado para proporcionar resultados más precisos y evitar posibles errores. Se recomienda su uso para cálculos de red a través de comandos en una terminal Bash.

<div style="text-align: center;">
<img src="/assets/images/calcular_subnet/teaser.png" alt="Maraton" oncontextmenu="return false;" >
</div>

<strong>Script en Bash</strong>
```bash
#!/bin/bash
# Autor: liandd (Juan Garcia)
##Colours
greenColour="\e[0;32m"
endColour="\033[0m\e[0m"
redColour="\e[0;31m"
blueColour="\e[0;34m"
yellowColour="\e[0;33m"
purpleColour="\e[0;35m"
turquoiseColour="\e[0;36m"
grayColour="\e[0;37m"

# Ctrl_C
trap ctrl_c INT

function ctrl_c(){
    echo -e "\n\n${redColour}[!] Saliendo...${endColour}\n"
    tput cnorm && exit 1
}

function helpPanel(){
    echo -e "\n${yellowColour}[!]${endColour}${grayColour} Uso: ${endColour}${greenColour}$0${endColour} ${purpleColour}-i${endColour}${blueColour} <ipAddress>${endColour} ${purpleColour}-n${endColour} ${blueColour}<netMask>${endColour}\n"
    echo -e "\t${purpleColour}i)${endColour}${grayColour} Direccion${endColour}${blueColour} IPv4${endColour}${grayColour} para subnet${endColour}"
    echo -e "\t${purpleColour}n)${endColour}${grayColour} Mascara de red${endColour}"
    echo -e "\t${purpleColour}h)${endColour}${grayColour} Panel de ayuda${endColour}"
}

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
    echo -e "\n${greenColour}[!]${endColour}${grayColour} Representacion Binaria:${endColour}"
    echo -e "\n${yellowColour}[+]${endColour}${greenColour} IP Address dada: ${endColour}${purpleColour}$(printf '%s.' "${ipBIN}" | sed "s/\.$//")${endColour} "
    echo -e "${yellowColour}[+]${endColour}${turquoiseColour} Mascara de Red: ${endColour}${purpleColour}$(printf '%s.' "${netBIN}" | sed "s/\.$//")${endColour} "
}

function getOctetosMask(){
    mask="$1"
    IFS='.' read -r -a octetosMask <<< "$mask"
    maskEnRango=()
    if [ "${#octetosMask[@]}" -eq 4 ]; then
        for octeto in "${octetosMask[@]}"; do
            if [ "$octeto" == 0 ] || [ "$octeto" == 128 ] || [ "$octeto" == 192 ] || [ "$octeto" == 224 ] || [ "$octeto" == 240 ] || [ "$octeto" == 248 ] || [ "$octeto" == 252 ] || [ "$octeto" == 254 ] || [ "$octeto" == 255 ]; then
                maskEnRango+=("true")
            else
                maskEnRango+=("false")
            fi
        done
        if [ "${maskEnRango[0]}" == "true" ] && [ "${maskEnRango[1]}" == "true" ] && [ "${maskEnRango[2]}" == "true" ] && [ "${maskEnRango[3]}" == "true" ]; then
            return 0
        else
            echo -e "\n${redColour}[!] Mascaras de subnet solo usan${endColour}${greenColour} 2^${endColour}${yellowColour}[${endColour}${turquoiseColour}0${endColour}${grayColour}-${endColour}${turquoiseColour}7${endColour}${yellowColour}]${endColour}${grayColour}.${endColour}${redColour} Ingresa nuevamente la mascara.${endColour}\n\n"
            exit 1
        fi
        else
            echo -e "\n${redColour}[!] Ingresar los cuatro octetos para la mascara de red usando puntos${endColour}\n"
            exit 1
        fi
}

function getOctetosDeIP(){
    ip="$1"
    IFS='.' read -r -a octetosIP <<< "$ip"
    ipEnRango=()
    if [ "${#octetosIP[@]}" -eq 4 ]; then
        for octeto in "${octetosIP[@]}"; do
            if [ "$octeto" -ge 0 ] && [ "$octeto" -le 255 ]; then
                ipEnRango+=("true")
            else
                ipEnRango+=("false")
            fi
        done
        if [ "${ipEnRango[0]}" == "true" ] && [ "${ipEnRango[1]}" == "true" ] && [ "${ipEnRango[2]}" == "true" ] && [ "${ipEnRango[3]}" == "true" ]; then
            return 0
        else
            echo -e "\n${redColour}[!] Solo hay${endColour}${greenColour} 255 bits${endColour}${blueColour} por octeto${endColour}${grayColour}.${endColour}${redColour} Ingresa nuevamente la IP.${endColour}\n\n"
            exit 1
        fi
    else
        echo -e "\n${redColour}[!] Ingresar los cuatro octetos para la IP usando puntos${endColour}\n\n"
        exit 1
    fi
}

function calcularClase(){
    local octetosIP=("${!1}")
    counter=0 
    if [ "${octetosIP[0]}" == 10 ]; then
        counter=1  # Class A Private address blocks
    elif [ "${octetosIP[0]}" == 172 ] && [ "${octetosIP[1]}" -ge 16 ] && [ "${octetosIP[1]}" -le 31 ]; then
        counter=2  # Class B Private address blocks
    elif [ "${octetosIP[0]}" == 192 ] && [ "${octetosIP[1]}" == 168 ]; then
        counter=3  # Class C Private address blocks
    elif [ "${octetosIP[0]}" == 127 ]; then
        counter=4  # Loopback Address Reserved address blocks
    elif [ "${octetosIP[0]}" -ge 0 ] && [ "${octetosIP[0]}" -lt 127 ]; then
        counter=5
    elif [ "${octetosIP[0]}" -gt 127 ] && [ "${octetosIP[0]}" -lt 192 ]; then
        counter=6
    elif [ "${octetosIP[0]}" -gt 191 ] && [ "${octetosIP[0]}" -lt 224 ]; then
        counter=7
    elif [ "${octetosIP[0]}" -gt 223 ] && [ "${octetosIP[0]}" -lt 240 ]; then
        counter=8
    elif [ "${octetosIP[0]}" -gt 239 ] && [ "${octetosIP[0]}" -le 255 ]; then
        counter=9
    else
        counter=0  # Out of Range
    fi
    case $counter in
        1) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${purpleColour} Private block${endColour},${greenColour} Class 'A'${endColour}" ;;
        2) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${purpleColour} Private block${endColour},${greenColour} Class 'B'${endColour}" ;;
        3) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${purpleColour} Private block${endColour},${greenColour} Class 'C'${endColour}" ;;
        4) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${redColour} Reserved block, System Loopback Address${endColour}" ;;
        5) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} A${endColour}" ;;
        6) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} B${endColour}" ;;
        7) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} C${endColour}" ;;
        8) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} D${endColour}"
            echo -e "\n${redColour}[!]${endColour}${grayColour} Esta es una ${endColour}${greenColour}Clase D${endColour}${redColour} Reservada${endColour}${turquoiseColour} 'Multicast IP Address Block'${endColour}" ;;
        9) echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Class:${endColour}${greenColour} E${endColour}"
            echo -e "\n${redColour}[!]${endColour}${grayColour} Esta es una ${endColour}${greenColour}Clase E${endColour}${redColour} Reservada${endColour}${turquoiseColour} 'Multicast IP Address Block'${endColour}" ;;
        *) echo -e "\n${redColour}[!]${endColour}${grayColour} No esta en rango${endColour}" ;;
    esac
}

function getNetID(){
    local octetosIP=("${!1}")
    local octetosMask=("${!2}")
    for ((j = 0; j < ${#octetosIP[@]}; j++)); do
        if [ $j -gt 0 ]; then
            printf ""
        fi
        netID+=("$((octetosIP[j] & octetosMask[j]))")
    done
}

function getNetIDRange(){
    local -a netIDEnd=() 
    IFS='.' read -r -a decimalNetID <<< "$1"
    local netInc=$2
    IFS='.' read -r -a decimalMask <<< "$3"
    for ((i=0; i<${#decimalNetID[@]}; i++)); do
        if [ "${decimalMask[i]}" -eq 255 ]; then
            netIDEnd+=("${decimalNetID[i]}")
        elif [ "${decimalMask[i]}" -lt 255 ] && [ "${decimalMask[i]}" -gt 0 ]; then
            netIDEnd+=("$(( (decimalNetID[i] | (255 - decimalMask[i])) + netInc - 1))")
        else
            netIDEnd+=("255")
        fi
    done
    echo -e "${yellowColour}[+]${endColour}${grayColour} BroadCast IP: ${endColour}${blueColour}$(printf '%s.' "${netIDEnd[@]}" | sed 's/\.$//')${endColour}"
}

function getHostsPerSubnet(){
    IFS='.' read -r -a decimalMask <<< "$1"
    hostBits=0
    for ((i=0; i<${#decimalMask[@]}; i++)); do
        if [ "${decimalMask[i]}" -eq 255 ]; then
            hostBits=$((hostBits + 0))
            continue
        elif [ "${decimalMask[i]}" -eq 254 ]; then
            hostBits=$((hostBits + 1))
            continue
        elif [ "${decimalMask[i]}" -eq 252 ]; then
            hostBits=$((hostBits + 2))
            continue
        elif [ "${decimalMask[i]}" -eq 248 ]; then
            hostBits=$((hostBits + 3))
            continue
        elif [ "${decimalMask[i]}" -eq 240 ]; then
            hostBits=$((hostBits + 4))
            continue
        elif [ "${decimalMask[i]}" -eq 224 ]; then
            hostBits=$((hostBits + 5))
            continue
        elif [ "${decimalMask[i]}" -eq 192 ]; then
            hostBits=$((hostBits + 6))
            continue
        elif [ "${decimalMask[i]}" -eq 128 ]; then
            hostBits=$((hostBits + 7))
            continue
        elif [ "${decimalMask[i]}" -eq 0 ]; then
            hostBits=$((hostBits + 8))
            continue
        else
            hostBits=0
            break
        fi
    done
    local hostsPerSubnet=$(awk -v bits="$hostBits" 'BEGIN { printf "%.0f", 2 ** bits - 2 }')
    echo -e "${yellowColour}[+]${endColour}${grayColour} Total Hosts:${endColour} ${purpleColour}${hostsPerSubnet}${endColour}"
}

function calculoSubnet(){
    ip=$1
    netMask=$2
    octetosIP=()
    octetosMask=()
    netID=()
    netInc=1
    getOctetosDeIP $ip getOctetosMask $netMask
    echo -e "\n${yellowColour}[+]${endColour}${grayColour} Calculo de ${endColour}${turquoiseColour}SubNetting${endColour}${greenColour} Juan Garcia${endColour} ${grayColour}(${endColour}${yellowColour}aka${endColour}${redColour} liandd${endColour}${grayColour})${endColour}"
    echo -e "\n${yellowColour}[+]${endColour}${grayColour} IP Address:${endColour}${blueColour} ${ip}${endColour}"
    echo -e "${yellowColour}[+]${endColour}${grayColour} Mascara de Red:${endColour}${blueColour} ${netMask}${endColour}"
    binaryRepresentation $ip $netMask
    echo -e "\n${greenColour}[!]${endColour}${grayColour} Informacion de Clase de red Respecto al ${endColour}${turquoiseColour}CIDR${endColour}"
    calcularClase octetosIP[@] getNetID octetosIP[@] octetosMask[@]
    echo -e "${yellowColour}[+]${endColour}${grayColour} Network ID: ${endColour}${blueColour}$(printf '%s.' "${netID[@]}" | sed 's/\.$//')${endColour}"
    getNetIDRange $ip $netInc $netMask
    getHostsPerSubnet $netMask
}

while getopts "i:n:h" arg; do
    case $arg in
        i) ipAddress=$OPTARG;;
        n) netMask=$OPTARG;;
        h) ;;
    esac
done
if [ $ipAddress ] && [ $netMask ]; then
    calculoSubnet "$ipAddress" "$netMask"
else
    helpPanel
fi

```
---

<h3 class="titulo-secundario">Version en C++</h3>
<div style="text-align: center;">
<img src="/assets/images/calcular_subnet/c1.png" alt="Maraton" oncontextmenu="return false;">
</div>
<strong>Script en C++</strong>

```c++
#include<bits/stdc++.h>
using namespace std;

int getOctetosDeIP(string ip, vector<int> &octetosIP) {	
	stringstream sip(ip);								
	string tmp;
	octetosIP.clear();									
	vector<bool> ipEnRango;
	while (getline(sip,tmp,'.'))						
		octetosIP.push_back(atoi(tmp.c_str()));			
	if (octetosIP.size() == 4) {
		for(int i=0; i<octetosIP.size(); i++){
			if (octetosIP[i] >= 0 && octetosIP[i] <= 255)
				ipEnRango.push_back(true);
			else
				ipEnRango.push_back(false);
		}
		if (ipEnRango[0]==true&&ipEnRango[1]==true&&ipEnRango[2]==true&&ipEnRango[3]==true){
			return 0;
		}else{
			cout << "\n[!] Solo hay 255 bits por octecto. Ingresa nuevamente la IP.\n\n";
			return 1;
		}
	}else{
		cout << "\n[!] Ingresar los cuatro octetos usando puntos\n\n";
		return 1;
	}
}

int getOctetosMask(string mask, vector<int> &octetosMask) {
	stringstream smask(mask);
	string tmp;
	octetosMask.clear();		
	vector<bool> maskEnRango;
	while (getline(smask,tmp,'.'))
		octetosMask.push_back(atoi(tmp.c_str()));
	if (octetosMask.size() == 4){
		for(int i = 0; i < octetosMask.size(); i++){
			if (octetosMask[i] == 0 || octetosMask[i] == 128 || octetosMask[i] == 192 || octetosMask[i] == 224 || octetosMask[i] == 240 || octetosMask[i] == 248 || octetosMask[i] == 252 || octetosMask[i] == 254 || octetosMask[i] == 255)
				maskEnRango.push_back(true);
			else
				maskEnRango.push_back(false);
		}
		if(maskEnRango[0]==true&&maskEnRango[1]==true&&maskEnRango[2]==true&&maskEnRango[3]==true){
			return 0;
		}else{
			cout<< "\n[!] Mascaras de subnet solo usan 2^[0-7]. Ingresa nuevamente la mascara.\n\n";
			return 1;
		}
	}else{
		cout<<"\n[!] Ingresar los cuatro octetos usando puntos\n";
		return 1;
	}
}

int calcularClase(vector<int> &octetosIP) {
	if (octetosIP[0] == 10) {
		return 1;	// Class A Private address blocks //
	}else if (octetosIP[0] == 172 && octetosIP[1] >= 16 && octetosIP[1] <= 31) {
		return 2;	// Class B Private address blocks //
	}else if (octetosIP[0] == 192 && octetosIP[1] == 168) {
		return 3;	// Class C Private address blocks //
	}else if (octetosIP[0] == 127) {
		return 4;	// Loopback Address Reserved address blocks //
	}else if (octetosIP[0] >= 0 && octetosIP[0] < 127) {
		return 5;
	}else if (octetosIP[0] > 127 && octetosIP[0] < 192) {
		return 6;
	}else if (octetosIP[0] > 191 && octetosIP[0] < 224) {
		return 7;
	}else if (octetosIP[0] > 223 && octetosIP[0] < 240) {
		return 8;
	}else if (octetosIP[0] > 239 && octetosIP[0] <= 255) {
		return 9;
	}else{
		return 0;	// Out of Range //
	}
}

// Determine Binary /--
int getNumeroHBits(vector<int> &octetosIP, vector<int> &octetosMask, vector<int> &octetosIPBits, vector<int> &octetosMaskBits){

	// Get IP binary rep. //
    cout << "[!] Representacion Binaria\n\n";
	for (int j=0; j<octetosIP.size(); j++){
		if (j>0)
			cout << ".";

        int mask = 128;
        while (mask){
            octetosIPBits.push_back((octetosIP[j] & mask) != 0);
			cout << ((octetosIP[j] & mask) != 0);
            mask >>= 1;
        }
    }
	cout << "  : IP Address\n";
	// Get SUBNET binary rep. //
	for (int j=0; j < octetosMask.size(); j++){
		if (j>0)
			cout << ".";
        int mask = 128;
        while (mask){
            octetosMaskBits.push_back((octetosMask[j] & mask) != 0);
			cout << ((octetosMask[j] & mask) != 0);
            mask >>= 1;
        }
    }
	cout << "  : Subnet Mask\n\n";
return 0;
}

// Perform ANDing of IP and Subnet Mask to generate Network ID range //
vector<int> getNetID(vector<int> &octetosIPBits, vector<int> &octetosMaskBits){
	vector<int> netID;
    for (int j=0; j < octetosIPBits.size(); j++){
        if ((j > 0) && (j%8 == 0))
            cout << ".";

		netID.push_back(octetosIPBits[j] & octetosMaskBits[j]);
    }
return netID;
}


// Turn Binary back to Decimal
string toString(vector<int> octetos){
	ostringstream octStrm;
	for(int j=0; j<octetos.size(); j++){
		if (j>0)
			octStrm << '.';

		octStrm << octetos[j];
	}
	return octStrm.str();
}

// Turn Binary back to Decimal
vector<int> toDecimal(vector<int> octetos, vector<int> &decimales){
	stringstream octStrm;
	decimales.clear();
	for(int j=0; j<octetos.size(); j++){
		if (j>0)
			octStrm << '.';

		octStrm << octetos[j];
	}
	string temp;
	while (getline(octStrm, temp, '.'))
		decimales.push_back(atoi(temp.c_str()));

	return decimales;
}

// Get the network increment //
int getIncrement(vector<int> decimalMask, vector<int> decimalNetID){
	int increment = 0;
	for (int i=0; i<decimalMask.size(); i++){
		if (decimalMask[i] == 255){
			increment = 1;
		}else if(decimalMask[i] == 254){
			increment = 2;
			break;
		}else if(decimalMask[i] == 252){
			increment = 4;
			break;
		}else if(decimalMask[i] == 248){
			increment = 8;
			break;
		}else if(decimalMask[i] == 240){
			increment = 16;
			break;
		}else if(decimalMask[i] == 224){
			increment = 32;
			break;
		}else if(decimalMask[i] == 192){
			increment = 64;
			break;
		}else if(decimalMask[i] == 128){
			increment = 128;
			break;
		}
	}
return increment;
}

// get network id range
vector<int> getNetIDRange(vector<int> &decimalNetID, int &netInc, vector<int> &decimalMask) {
	vector<int> netIDEnd;
	for (int i=0; i<decimalNetID.size(); i++){
		if (decimalMask[i] == 255){
			netIDEnd.push_back(decimalNetID[i]);
		}else if (decimalMask[i] < 255 && decimalMask[i] > 0){
			netIDEnd.push_back( (decimalNetID[i] + netInc) - 1 );
		}else{
			netIDEnd.push_back(255);
		}
	}
	return netIDEnd;
}

// Get subnets
int getSubnets(vector<int> &decimalMask, int &ipClass, vector<int> &subClassMask){
	int netBits = 0;
	subClassMask.clear();
		if (ipClass==1){
			subClassMask.push_back(255);
			subClassMask.push_back(0);
			subClassMask.push_back(0);
			subClassMask.push_back(0);
		}else if(ipClass==2){
			subClassMask.push_back(255);
			subClassMask.push_back(255);
			subClassMask.push_back(0);
			subClassMask.push_back(0);
		}else if(ipClass==3){
			subClassMask.push_back(255);
			subClassMask.push_back(255);
			subClassMask.push_back(255);
			subClassMask.push_back(0);
		}else if(ipClass==4 || ipClass==5){
			subClassMask.push_back(decimalMask[0]);
			subClassMask.push_back(decimalMask[1]);
			subClassMask.push_back(decimalMask[2]);
			subClassMask.push_back(decimalMask[3]);
		}

	for (int i=0; i<decimalMask.size(); i++){
		if (decimalMask[i] != subClassMask[i]){
			if (decimalMask[i] == 255){
				netBits += 8;
				continue;
			}else if (decimalMask[i] == 254){
				netBits += 7;
				continue;
			}else if (decimalMask[i] == 252){
				netBits += 6;
				continue;
			}else if (decimalMask[i] == 248){
				netBits += 5;
				continue;
			}else if (decimalMask[i] == 240){
				netBits += 4;
				continue;
			}else if (decimalMask[i] == 224){
				netBits += 3;
				continue;
			}else if (decimalMask[i] == 192){
				netBits += 2;
				continue;
			}else if (decimalMask[i] == 128){
				netBits += 1;
				continue;
			}else if (decimalMask[i] == 0){
				netBits += 0;
				continue;
			}else{
				netBits += 0;
			}
		}
	}
	int subnets = pow(2.0,netBits);
	return subnets;
}

// Get hosts per subnet
int getHostsPerSubnet(vector<int> &decimalMask){
	int hostBits = 0;
	for (int i=0; i<decimalMask.size(); i++){
		if (decimalMask[i] == 255){
			hostBits += 0;
			continue;
		}else if (decimalMask[i] == 254){
			hostBits += 1;
			continue;
		}else if (decimalMask[i] == 252){
			hostBits += 2;
			continue;
		}else if (decimalMask[i] == 248){
			hostBits += 3;
			continue;
		}else if (decimalMask[i] == 240){
			hostBits += 4;
			continue;
		}else if (decimalMask[i] == 224){
			hostBits += 5;
			continue;
		}else if (decimalMask[i] == 192){
			hostBits += 6;
			continue;
		}else if (decimalMask[i] == 128){
			hostBits += 7;
			continue;
		}else if (decimalMask[i] == 0){
			hostBits += 8;
			continue;
		}else{
			hostBits = 0;
			break;
		}
	}
	cout<<hostBits<<":bitss\n";
	int hostsPerSubnet = pow(2.0,hostBits)-2;
	cout<<hostsPerSubnet<<":bitssPersubnet\n";
	return hostsPerSubnet;
}

int main() {

// Give details, given an IP and Subnet Mask //
char resp = 'y';
while (resp == 'y') {
        system("cls");
        cout << "[+] Calculadora IPv4\n";
		// Get IP address octets //
		string ip;
		vector<int> octetsIP;
		while (getOctetosDeIP(ip, octetsIP) == 1) {
		cout << "[!] Ingresar direccion IPv4 -> ";
		(getline(cin, ip));		// Accept user input for IP Address //
		}

		// Get subnet mask octets //
		string mask;
		vector<int> octetsMask;
		while (getOctetosMask(mask, octetsMask) == 1) {
		cout << endl << "[!] Ingresar subnet mask para la IP -> " << ip << " -> ";
		(getline(cin, mask));	// Accept user input for subnet mask //
		}
		system("cls");

		// Print Initial User IP and Subnet Mask //
		vector<int> decimals;
		cout << "[+] IP Address: " << toString(octetsIP) << "\n";
		vector<int> decimalMask = toDecimal(octetsMask, decimals);
		cout << "[+] Subnet Mask: " << toString(octetsMask) << "\n";
		cout << "" << "\n\n";

		// Print Binary Representation //
		vector<int> octetsIPBits;
		vector<int> octetsMaskBits;
		getNumeroHBits(octetsIP, octetsMask, octetsIPBits, octetsMaskBits);
		vector<int> netID = getNetID(octetsIP, octetsMask);
		vector<int> decimalNetID = toDecimal(netID, decimals);
		int netInc = getIncrement(decimalMask, decimalNetID);

		// Print IP Class
			// Run function to determine and print IP class
			cout << "\n[+] Informacion de Clase\n\n";
			int classResult = calcularClase(octetsIP);
			int ipClass = 0;
			switch (classResult){
				case 1:
					cout << "[+] IP Class: Private block, Class 'A' " << endl;
					ipClass = 1;
					break;
				case 2:
					cout << "[+] IP Class: Private block, Class 'B'" << endl;
					ipClass = 2;
					break;
				case 3:
					cout << "[+] IP Class: Private block, Class 'C'" << endl;
					ipClass = 3;
					break;
				case 4:
					cout << "[+] IP Class: Reserved block, System Loopback Address" << endl;
					ipClass = 1;
					break;
				case 5:
					cout << "[+] IP Class: A\n";
					ipClass = 1;
					break;
				case 6:
					cout << "[+] IP Class: B\n";
					ipClass = 2;
					break;
				case 7:
					cout << "[+] IP Class: C\n";
					ipClass = 3;
					break;
				case 8:
					cout << "[+] IP Class: D\n";
					ipClass = 4;
					cout << "[!]  Esta es una Clase D Reservada 'Multicast IP Address Block'\n";
					break;
				case 9:
					cout << "[+] IP Class: E\n";
					ipClass = 5;
					cout << "[!] Esta es una Clase E Reservada 'Multicast IP Address Block'\n";
					break;
				default :
					cout << "[!] No esta en rango\n";
					break;
			}
		vector<int> subClassMask;
		getSubnets(decimalMask, ipClass, subClassMask);
		cout << "[+] Default Class Subnet Mask: " << toString(subClassMask) << endl;
		cout << "\n\n";

		// Print Subnetting Details //
		cout << "[+] Subnet Details\n\n";
		cout << "[+] Total Hosts:  " << getHostsPerSubnet(decimalMask) << "\n";
		vector<int> netIDRange = getNetIDRange(decimalNetID, netInc, decimalMask);
		cout << "[+] Network ID:   "<<toString(netID)<<"\n[+] Broadcast ID: "<<toString(netIDRange)<<"\n";
		cout << "[+] Network Increment: " << getIncrement(decimalMask, decimalNetID) << endl;
		cout << "[+] Number of Subnets: " << getSubnets(decimalMask, ipClass, subClassMask) << endl;

		cout << "\n[!] Ingresar otra IP? (y or n): ";
		cin >> resp;
}
	return 0;
}

```
---

Esta publicación ha sido creada como soporte en mi formación académica y crecimiento profesional.

© Juan David Garcia Acevedo (aka liandd)

