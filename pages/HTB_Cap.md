---
title: Cap
layout: page
permalink: /HTB_Cap
---

<h2 class="amarillo">Cap</h2>
<div id="imgs" style="text-align: center;">
  <img src="" alt="under" oncontextmenu="return false;">
</div>

Comenzamos encendiendo la máquina y nos da la dirección IP 10.129.17.161, enviaremos un paquete para saber a que nos estamos enfrentando:

```bash
❯ ping -c 5 10.129.17.161
PING 10.129.17.161 (10.129.166.121) 56(84) bytes of data.
64 bytes from 10.129.17.161: icmp_seq=1 ttl=63 time=115 ms
64 bytes from 10.129.17.161: icmp_seq=2 ttl=63 time=112 ms
64 bytes from 10.129.17.161: icmp_seq=3 ttl=63 time=109 ms
64 bytes from 10.129.17.161: icmp_seq=4 ttl=63 time=108 ms
64 bytes from 10.129.17.161: icmp_seq=5 ttl=63 time=111 ms
--- 10.129.17.161 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 108.120/110.928/115.225/2.492 ms
```

Con un TTL de 63 estamos frente a una máquina Linux.
<h2 class="amarillo">Enumeración</h2>

