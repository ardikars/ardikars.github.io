var hostname = "https://www.ardikars.com";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "SSH tunneling without opening shell",
      category: null,
      content: "ssh -D 8123 -fN cmsnesia-dev -o \"ProxyCommand=nc -X connect -x 192.168.43.173:44355 %h %p\"\n",
      tags: ["ssh","proxy","http"],
      id: 0
    });
    

    index.add({
      title: "Compile and Install Linux Kernel on Ubuntu 20.04",
      category: null,
      content: "sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils libssl-dev bc flex libelf-dev bison\n\nwget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.7.10.tar.xz\n\ntar xvf linux-5.7.10.tar.xz\n\ncd linux-5.7.10\n\ncp /boot/config-$(uname -r) .config\n\nmake menuconfig\n\nmake\n\nsudo make modules_install\n\nsudo make install\n\nsudo update-initramfs -c -k 5.7.10\n\nsudo update-grub\n\n*) used for trying new kernel api from linux (io_uring).\n",
      tags: ["build","install","linux"],
      id: 1
    });
    

    index.add({
      title: "Nginx HTTP Load Balancer",
      category: null,
      content: "$ sudo vim /etc/nginx/nginx.conf\n\nhttp {\n\n  # round robin\n  upstream rumahpemuridan {\n      server 127.0.0.1:8081 weight=3;\n      server 127.0.0.1:8082 max_conns=2;\n      queue 100 timeout=70;\n  }\n\n  server {\n    listen 80;\n    server_name rumahpemuridan.com;\n    location / {\n      proxy_pass http://rumahpemuridan;\n    }\n  }\n}\n\n",
      tags: ["load-balancer","nginx","proxy"],
      id: 2
    });
    

    index.add({
      title: "Install Nginx and Let's Encrypt on Ubuntu 20.04",
      category: null,
      content: "Prerequisites\n\n\n  You have domain name pointing to your server public IP.\n\n\nInstallation process\n\n\n  \n    sudo apt update\n  \n  \n    sudo apt install nginx\n  \n  \n    sudo systemctl enable nginx\n  \n  \n    sudo apt install certbot\n  \n  \n    sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048\n  \n  \n    sudo mkdir -p /var/lib/letsencrypt/.well-known\n  \n  \n    sudo chgrp www-data /var/lib/letsencrypt\n  \n  \n    sudo chmod g+s /var/lib/letsencrypt\n  \n  \n    sudo vim /etc/nginx/snippets/letsencrypt.conf\n  \n\n\nlocation ^~ /.well-known/acme-challenge/ {\n  allow all;\n  root /var/lib/letsencrypt/;\n  default_type \"text/plain\";\n  try_files $uri =404;\n}\n\n\n\n  sudo vim /etc/nginx/snippets/ssl.conf\n\n\nssl_dhparam /etc/ssl/certs/dhparam.pem;\n\nssl_session_timeout 1d;\nssl_session_cache shared:SSL:50m;\nssl_session_tickets off;\n\nssl_protocols TLSv1 TLSv1.1 TLSv1.2;\nssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';\nssl_prefer_server_ciphers on;\n\nssl_stapling on;\nssl_stapling_verify on;\nresolver 8.8.8.8 8.8.4.4 valid=300s;\nresolver_timeout 30s;\n\nadd_header Strict-Transport-Security \"max-age=15768000; includeSubdomains; preload\";\nadd_header X-Frame-Options SAMEORIGIN;\nadd_header X-Content-Type-Options nosniff;\n\n\n\n  sudo vim /etc/nginx/sites-available/dev.cmsnesia.com.conf\n\n\nserver {\n  listen 80;\n  listen [::]:80;\n  server_name dev.cmsnesia.com;\n  \n  root /var/www/html\n  \n  include snippets/letsencrypt.conf;\n}\n\n\n\n  \n    sudo ln -s /etc/nginx/sites-available/dev.cmsnesia.com.conf /etc/nginx/sites-enabled/\n  \n  \n    sudo systemctl restart nginx\n  \n  \n    sudo certbot certonly --agree-tos --email cmsnesia@gmail.com --webroot -w /var/lib/letsencrypt/ -d dev.cmsnesia.com\n  \n  \n    sudo vim /etc/nginx/sites-available/dev.cmsnesia.com.conf\n  \n\n\nserver {\n    listen 80;\n    listen [::]:80;\n    server_name dev.cmsnesia.com;\n  \n    root /var/www/html\n    include snippets/letsencrypt.conf;\n    return 301 https://dev.cmsnesia.com$request_uri; # redirect http to https\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name dev.cmsnesia.com;\n\n    ssl_certificate /etc/letsencrypt/live/dev.cmsnesia.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/dev.cmsnesia.com/privkey.pem;\n    ssl_trusted_certificate /etc/letsencrypt/live/dev.cmsnesia.com/chain.pem;\n    include snippets/ssl.conf;\n    include snippets/letsencrypt.conf;\n}\n\n\n\n\n  sudo vim /etc/cron.d/certbot\n    0 */12 * * * root test -x /usr/bin/certbot -a \\! -d /run/systemd/system &amp;&amp; perl -e 'sleep int(rand(3600))' &amp;&amp; certbot -q renew --renew-hook \"systemctl reload nginx\"\n    \n  \n  sudo certbot renew --dry-run\n\n",
      tags: ["https","linux","proxy"],
      id: 3
    });
    

    index.add({
      title: "Install Mongo DB CE on Ubuntu 20.04",
      category: null,
      content: "Import the public key used by the package management system\n\n\n  \n    sudo apt-get update &amp;&amp; sudo apt-get install gnupg\n  \n  \n    wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -\n  \n\n\nAdd Mongo DB repository\n\n\n  echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list\n\n\nInstall Mongo DB\n\n\n  sudo apt-get update &amp;&amp; sudo apt-get install -y mongodb-org\n\n\nStart Mondo DB on Boot\n\n\n  sudo systemctl enable mongod.service\n\n",
      tags: ["nosql","install","linux"],
      id: 4
    });
    

    index.add({
      title: "Granting Capability CAP_NET_RAW and CAP_NET_ADMIN",
      category: null,
      content: "$ sudo setcap cap_net_raw,cap_net_admin=eip /path/to/java\n",
      tags: ["java","setcap"],
      id: 5
    });
    

    index.add({
      title: "Netflix error F7355 on Firefox",
      category: null,
      content: "\n  \n    sudo apt install libavcodec-extra\n  \n  \n    Enable DRM\n  \n\n",
      tags: ["drm","firefox","video"],
      id: 6
    });
    

    index.add({
      title: "Install Docker CE on Ubuntu 20.04",
      category: null,
      content: "Install Docker CE\n\n\n  \n    apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common\n  \n  \n    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -\n  \n  \n    echo \"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -sc) stable\" &gt; /etc/apt/sources.list.d/docker-ce.list\n  \n  \n    apt install docker-ce\n  \n\n\nEnable Docker and Containerd to run on system boot\n\n\n  systemctl enable --now docker containerd\n\n\nRunning Docker as a non-root user\n\n\n  \n    exit (Back to normal user)\n  \n  \n    sudo usermod -aG docker ${USER}\n  \n\n\nDone\n",
      tags: ["install","docker","container"],
      id: 7
    });
    

    index.add({
      title: "Install GNS3 on Ubuntu 20.04",
      category: null,
      content: "Install GNS3\n\n\n  \n    sudo add-apt-repository ppa:gns3/ppa\n  \n  \n    sudo apt update\n  \n  \n    sudo apt install gns3-server gns3-gui\n  \n\n\nInstall IOU Support (Optional)\n\nIOU (IOS over Unix) is an internal Cisco tool for simulating the ASICs in Cisco Switches. This enables you to play with Layer 2 switching in your LABS.\n\n\n  sudo dpkg --add-architecture i386\n  sudo apt update\n  sudo apt install gns3-iou\n\n\nAdd your user to the following groups:\n\nfor i in ubridge libvirt kvm wireshark; do\n  sudo usermod -aG $i $USER\ndone\n\n\nDone.\n",
      tags: ["install","gns3","networking"],
      id: 8
    });
    

    index.add({
      title: "Create a bootable USB on Linux",
      category: null,
      content: "Unmount and format USB drive (FAT32)\n\n\n  \n    # umount /dev/sdX\n  \n  \n    # mkfs.vfat /dev/sdX\n  \n\n\nWrite into USB drive\n\n  # dd bs=4M if=ubuntu-20.04-desktop-amd64.iso of=/dev/sdX status=progress oflag=sync\n\n\nReboot\n\n  # shutdown -r 0\n\n",
      tags: ["bootable","install","os"],
      id: 9
    });
    

    index.add({
      title: "Tor On Android",
      category: null,
      content: "\n  \n    Install Termux from Google Playstore.\n  \n  \n    Open Termux, then install tor (“pkg update &amp;&amp; pkg install”).\n  \n  \n    Run tor for tunneling:\n\n    \n      \n        Tunneling over HTTP “tor –HTTPTunnelPort 8118”.\n      \n      \n        For more details pls read tor docs (“pkg install man &amp;&amp; man tor”).\n      \n    \n  \n  \n    Install Firefox browser from Google Playstore.\n  \n  \n    Open Firefox, type “about:config” in the URL bar.\n  \n  \n    Set “network.proxy.type” to “1” (Configure proxy manually).\n  \n  \n    Set “network.proxy.http” to “127.0.0.1”, and “network.proxy.http.port” to “8118”.\n  \n\n\nNote*)\n\n\n  \n    DNS is not encrypted.\n  \n  \n    By default Tor opening socks(x) listener on 127.0.0.1:9050.\n  \n  \n    You can use Tor config file ($PREFIX/etc/tor/torrc) instead of passing Tor command line args.\n  \n\n\nFirefox =&gt; Tor local proxy (socks(x)/http/etc) =&gt; Tor network (proxy =&gt; proxy =&gt; proxy ….)\n",
      tags: ["proxy","tunnel","anonymity"],
      id: 10
    });
    

    index.add({
      title: "Unlock Nokia 3 Bootloader",
      category: null,
      content: "\n  \n    Enable developer options\n  \n  \n    Enable OEM Unlocking (OEM Unlock)\n  \n  \n    Enable USB debugging mode\n  \n  \n    Change default USB configuration, choose File Transfer (MTP)\n  \n  \n    Install adb and fastboot (sudo apt-get install android-tools-adb android-tools-fastboot)\n  \n  \n    Install nokia usb drive\n  \n  \n    Connect your phone to your PC and approve all usb connection\n  \n  \n    Type adb devices, then it will show the serial number\n  \n  \n    Type adb reboot bootloader, then your devices will boot into fastboot mode\n  \n  \n    Type fastboot devices, to make sure that your device still connected to your PC and it will show your phone serial number\n  \n  \n    Type fastboot oem key $(echo -n \"YOUR_PHONE_SERIAL_NUMBER\" | md5sum | tr [a-z] [A-Z])\n  \n  \n    Type fastboot flashing unlock, your phone will ask you about unlocking bootloader\n  \n  \n    Press vol up (yes)\n  \n\n",
      tags: ["bootloader","unlocking","rooting"],
      id: 11
    });
    

    index.add({
      title: "Fix RTL8822BE driver on Debian based system",
      category: null,
      content: "Below script tested on Kali Linux 2020.1b (Kernel 5.4.0)\n\nsudo mkdir -p /lib/firmware/rtw88\nsudo cp /lib/firmware/rtlwifi/rtl8822befw.bin /lib/firmware/rtw88/rtw8822b_fw.bin\nsudo reboot\n\n\n",
      tags: ["driver","wifi"],
      id: 12
    });
    

    index.add({
      title: "ARP - MITM Detection Method",
      category: null,
      content: "Sedikit tengan ARP\n\nARP merupakan protokol yang digunakan untuk memetakan alamat fisik (MAC) dan logika (IP). Proses pemetaan ini sering dimanfaatkan oleh penyerang dengan cara memalsukan isi dari peta (ARP table) tersebut sehingga ia dapat menguasai komunikasi yang bergantung pada isi dari peta tersebut (routing).\n\nBerikut metode yang saya gunakan untuk mendeteksi proses pemalsuan tersebut.\n\nDisini saya menggunakan TCP-Syn untuk memancing penyerang. Kenapa? Karena jika menggunakan protokol seperti ICMP maka penyerang bisa saja membuat firewall untuk mem-blok semua paket ICMP yang datang.\n\nDengan menggunakan TCP-Syn dengan port yang kita buat acak, pengerang tentu tidak dapat menebak port tersebut dan memblok nya.\n\n\n\nDi bawah ini adalah coret2 saya dahulu kala.\n\n\n    \n\n\n\n    \n\n\n\n    \n\n\n\n    \n\n",
      tags: ["mitm","security","networking"],
      id: 13
    });
    

    index.add({
      title: "RSA Small Key Problem",
      category: null,
      content: "Given public key = (7, 33).\n\nFind private key (d).\n\nn = 33 (modulus)\n\ne = 7 (exponent)\n\nlet’s factoring n\n\nn = p * q\n\n33 = ? * ?\n\nfloor(sqrt(n)) = floor(sqrt(33)) = 5\n\n33 mod 5 = 3 « not 0\n\n33 mod 4 = 1 « no need to test (except for 2 all other prime numbers are odd)\n\n33 mod 3 = 0 « we got p = 3\n\np = 3\n\n33 = 3 * ?\n\n\n\nq = n / p\n\n= 33 / 3\n\n= 11\n\nn = p * q\n\n= 3 * 33\n\nphi = ((p-1) * (q-1))\n\n= (2 * 10)\n\n= 20\n\ne * ? mod 20 = 1\n\n7 * ? mod 20 = 1  « modInv\n\n7 * 3 mod 20 = 1\n\nok, d = 3\n\nprivate key (d) = (3, 33)\n",
      tags: ["algorithm","math","security"],
      id: 14
    });
    

    index.add({
      title: "RSA Algorithm",
      category: null,
      content: "Key Generation\n\n\n  \n    Generate two random primes, p and q, e.g p=3, q=11.\n  \n  \n    Compute n = pq, n = 3 * 11 = 33.\n  \n  \n    Compute phi = (p-1)(q-1) = (3-1)(11-1) = 20\n  \n  \n    Choose an integer e, 1 &lt; e &lt; phi, such that gcd(e, phi) = 1, e.g e = 7, gcd(7, 20) = 1\n  \n  \n    Compute the secret exponent d, 1 &lt; d &lt; phi, such that (e * d) mod phi = 1, (7 * d) mod 20 = 1,  d = 3\n  \n\n\n\n\n\n  The public key is (7, 33) and the private key (3, 33).\n\n\nEncrypt\n\n\n  \n    m = 2\n  \n  \n    c = 2^7 mod 33 = 29\n  \n\n\nDecrypt\n\n\n  \n    c = 29\n  \n  \n    m = 29 ^ 3 mod\n  \n\n\n\n  \n    n is known as the modulus.\n  \n  \n    e is known as the public exponent or encryption exponent or just the exponent.\n  \n  \n    d is known as the secret exponent or decryption exponent.\n  \n\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 15
    });
    

    index.add({
      title: "Miller Rabin",
      category: null,
      content: "read more\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 16
    });
    

    index.add({
      title: "Square and Multiply",
      category: null,
      content: "11^37 = ?\n\n37 = 100101 in binary\n\n\n  \n    1 -&gt; first “One” lists number          = 11\n  \n  \n    0 -&gt; square                                    = (11)^2\n  \n  \n    0 -&gt; square                                    = ((11)^2)^2\n  \n  \n    1 -&gt; square + multiply              = (((11)^2)^2)^2*11\n  \n  \n    0 -&gt; square                                    = ((((11)^2)^2)^2*11)^2\n  \n  \n    1 -&gt; square + multiply              = (((((11)^2)^2)^2*11)^2)^2*11\n  \n\n\n\n\nSimple implementation in python\n\n# x ^ h mod n\ndef modPow(x, h, n):\n    y = 1\n    h = bin(h)[2:] # convert h into binary\n    for i in range(len(h)):\n        y = (y ** 2) % n\n        if h[i] == '1':\n            y = (y * x) % n\n    return y\n\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 17
    });
    

    index.add({
      title: "Extended Euclidean",
      category: null,
      content: "gcd(11, 17) == 1\n\n\n17 = 11(1) + 6    // 1 is floor(17/11), 6 is 17 mod 11\n11 = 6(1) + 5\n6 = 5(1) + 1      // done\n\n\n\n\n\nImplementation in python (src)\ndef gcd(a, b):\n    if a == 0:\n        return (b, 0, 1)\n    else:\n        g, x, y = gcd(b % a, a)\n        return (g, y - (b // a) * x, x)\n\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 18
    });
    

    index.add({
      title: "Diffie Hellman MITM Attack",
      category: null,
      content: "p = prime number (public)\ng = modulus (public)\n\na = Alice private key (private)\nb = Bob private key (private)\n\nA = Alice public key (public)\nB = Bob public ket = (public)\n\nSx = Shared key (public)\n\neA = Eve private key for Alice (private)\neB = Eve private key for Bob (private)\nEa = Spoofed Alice public key will sent to Bob (public)\nEb = Spoofed Bob public key will sent to Alice (public)\n\n\n\nDiffie Hellman Algorithm\n\np = 23, g = 5\n\n| a = 4                                      | b = 3                                         |\n|--------------------------------------------|-----------------------------------------------|\n| A = g ^ a mod p = 5 ^ 4 mod 23 = 4         | B = g ^ b mod p = 5 ^ 3 mod 23 = 10           |\n| Sent Alice public key (A) to Bob           | Sent Bob public key (B) to Alice              |\n| Bob public key (B) is 10                   | Alice public key (A) is 4                     |\n| Compute shared key from Bob pubic key (B)  | Compute shared key from Alice public key (A)  |\n| Sa = B ^ a mod p = 10 ^ 4 mod 23 = 18      | Sb = A ^ b mod p = 4 ^ 3 mod 23 = 18          |\n\n\nSa == Sb\nDiscrete logarithm problem (A = g ^ ? mod p &amp;&amp; B ^ ? mod p)\n\n\nMITM Attack\n\np = 23, g = 5\n\n\n| a = 4                                            | eA = 6, eB = 9                                | b = 3                                              |\t\n|--------------------------------------------------|-----------------------------------------------|----------------------------------------------------|\n| A = g ^ a mod p = 5 ^ 4 mod 23 = 4               | Eb = g ^ eB mod p = 5 ^ 9 mod 23 = 11         | -                                                  |\t\n| Sent Alice public key (A) to Bob (Eve)           | Sent Spoofed Bob public key (Ea) to Alice     | -                                                  |\n| Bob (Eve) public key (Eb) is 11                  | Alice public key (A) is 4                     | -                                                  |\n| Compute shared key from Bob (Eve) pubic key (Eb) | Compute shared key from Alice public key (A)  | -                                                  |\n| Sae = Eb ^ a mod p = 11 ^ 3 mod 23 = 13          | Sa = A ^ eB mod p = 4 ^ 9 mod 23 = 13         | -                                                  |\n| -                                                | Ea = g ^ eA mod p = 5 ^ 6 mod 23 = 8          | B = g ^ b mod p = 5 ^ 3 mod 23 = 10                |\n| -                                                | Sent Spoofed Alice public key (Eb) to Bob     | Sent Bob public key (B) to Alice (Eve)             |\n| -                                                | Bob public key (B) is 10                      | Alice (Eve) public key (Ea) is 8                   |\n| -                                                | Compute shared key from Bob public key (B)    | Compute shared key from Alice (Eve) pubic key (Ea) |\n| -                                                | Sb = B ^ eA mod p = 10 ^ 6 mod 23 = 6         | Sbe = Ea ^ b mod p = 8 ^ 3 mod 23 = 6              |\n\n\n(Now Eve can intercept connection between Alice and Bob)\n",
      tags: ["cryptography","security","math","mitm"],
      id: 19
    });
    


var store = [{
    "title": "SSH tunneling without opening shell",
    "link": "/post/tunnelling/ssh-tunnel-without-opening-shell.html",
    "image": null,
    "date": "July 23, 2020",
    "category": null,
    "excerpt": "ssh -D 8123 -fN cmsnesia-dev -o \"ProxyCommand=nc -X connect -x 192.168.43.173:44355 %h %p\"\n"
},{
    "title": "Compile and Install Linux Kernel on Ubuntu 20.04",
    "link": "/post/kernel/compile-and-install-linux-kernel-on-ubuntu-20-04.html",
    "image": null,
    "date": "July 22, 2020",
    "category": null,
    "excerpt": "sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils libssl-dev bc flex libelf-dev bison wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.7.10.tar.xz tar xvf linux-5.7.10.tar.xz cd linux-5.7.10..."
},{
    "title": "Nginx HTTP Load Balancer",
    "link": "/post/scaling/nginx-http-load-balancer.html",
    "image": null,
    "date": "July 20, 2020",
    "category": null,
    "excerpt": "$ sudo vim /etc/nginx/nginx.conf http { # round robin upstream rumahpemuridan { server 127.0.0.1:8081 weight=3; server 127.0.0.1:8082 max_conns=2; queue 100..."
},{
    "title": "Install Nginx and Let's Encrypt on Ubuntu 20.04",
    "link": "/post/server/install-nginx-and-lets-encrypt-on-ubuntu-20-04.html",
    "image": null,
    "date": "July 20, 2020",
    "category": null,
    "excerpt": "Prerequisites You have domain name pointing to your server public IP. Installation process sudo apt update sudo apt install nginx..."
},{
    "title": "Install Mongo DB CE on Ubuntu 20.04",
    "link": "/post/database/install-mongo-db-ce-on-ubuntu-20-04.html",
    "image": null,
    "date": "July 20, 2020",
    "category": null,
    "excerpt": "Import the public key used by the package management system sudo apt-get update &amp;&amp; sudo apt-get install gnupg wget -qO..."
},{
    "title": "Granting Capability CAP_NET_RAW and CAP_NET_ADMIN",
    "link": "/post/linux/granting-capability-CAP_NET_RAW-and-CAP_NET_ADMIN.html",
    "image": null,
    "date": "July 10, 2020",
    "category": null,
    "excerpt": "$ sudo setcap cap_net_raw,cap_net_admin=eip /path/to/java\n"
},{
    "title": "Netflix error F7355 on Firefox",
    "link": "/post/linux/netflix-error-F7355-on-firefox.html",
    "image": null,
    "date": "July 10, 2020",
    "category": null,
    "excerpt": "\n  \n    sudo apt install libavcodec-extra\n  \n  \n    Enable DRM\n  \n\n"
},{
    "title": "Install Docker CE on Ubuntu 20.04",
    "link": "/post/linux/install-docker-ce-on-ubuntu-20-04.html",
    "image": null,
    "date": "July 9, 2020",
    "category": null,
    "excerpt": "Install Docker CE apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - echo \"deb [arch=amd64]..."
},{
    "title": "Install GNS3 on Ubuntu 20.04",
    "link": "/post/linux/install-gns3-on-ubuntu-20-04.html",
    "image": null,
    "date": "July 9, 2020",
    "category": null,
    "excerpt": "Install GNS3 sudo add-apt-repository ppa:gns3/ppa sudo apt update sudo apt install gns3-server gns3-gui Install IOU Support (Optional) IOU (IOS over..."
},{
    "title": "Create a bootable USB on Linux",
    "link": "/post/linux/create-a-bootable-usb-on-linux.html",
    "image": null,
    "date": "July 9, 2020",
    "category": null,
    "excerpt": "Unmount and format USB drive (FAT32) # umount /dev/sdX # mkfs.vfat /dev/sdX Write into USB drive # dd bs=4M if=ubuntu-20.04-desktop-amd64.iso..."
},{
    "title": "Tor On Android",
    "link": "/post/android/tor-on-android.html",
    "image": null,
    "date": "July 3, 2020",
    "category": null,
    "excerpt": "Install Termux from Google Playstore. Open Termux, then install tor (“pkg update &amp;&amp; pkg install”). Run tor for tunneling: Tunneling..."
},{
    "title": "Unlock Nokia 3 Bootloader",
    "link": "/post/android/unlock-nokia-3-bootloader.html",
    "image": null,
    "date": "July 2, 2020",
    "category": null,
    "excerpt": "Enable developer options Enable OEM Unlocking (OEM Unlock) Enable USB debugging mode Change default USB configuration, choose File Transfer (MTP)..."
},{
    "title": "Fix RTL8822BE driver on Debian based system",
    "link": "/post/linux/fix-rtl8822be-driver-on-debian-based-system.html",
    "image": null,
    "date": "April 16, 2020",
    "category": null,
    "excerpt": "Below script tested on Kali Linux 2020.1b (Kernel 5.4.0)\n\nsudo mkdir -p /lib/firmware/rtw88\nsudo cp /lib/firmware/rtlwifi/rtl8822befw.bin /lib/firmware/rtw88/rtw8822b_fw.bin\nsudo reboot\n\n\n"
},{
    "title": "ARP - MITM Detection Method",
    "link": "/post/security/arp-mitm-detaction-method.html",
    "image": null,
    "date": "August 31, 2019",
    "category": null,
    "excerpt": "Sedikit tengan ARP ARP merupakan protokol yang digunakan untuk memetakan alamat fisik (MAC) dan logika (IP). Proses pemetaan ini sering..."
},{
    "title": "RSA Small Key Problem",
    "link": "/post/security/rsa-small-key-problem.html",
    "image": null,
    "date": "August 31, 2019",
    "category": null,
    "excerpt": "Given public key = (7, 33). Find private key (d). n = 33 (modulus) e = 7 (exponent) let’s factoring..."
},{
    "title": "RSA Algorithm",
    "link": "/post/cryptography/rsa-example.html",
    "image": null,
    "date": "August 30, 2019",
    "category": null,
    "excerpt": "Key Generation Generate two random primes, p and q, e.g p=3, q=11. Compute n = pq, n = 3 *..."
},{
    "title": "Miller Rabin",
    "link": "/post/math/miller-rabin.html",
    "image": null,
    "date": "August 29, 2019",
    "category": null,
    "excerpt": "read more\n"
},{
    "title": "Square and Multiply",
    "link": "/post/math/square-and-multiply-example.html",
    "image": null,
    "date": "August 29, 2019",
    "category": null,
    "excerpt": "11^37 = ? 37 = 100101 in binary 1 -&gt; first “One” lists number = 11 0 -&gt; square =..."
},{
    "title": "Extended Euclidean",
    "link": "/post/math/extended-euclidean-example.html",
    "image": null,
    "date": "August 29, 2019",
    "category": null,
    "excerpt": "gcd(11, 17) == 1 17 = 11(1) + 6 // 1 is floor(17/11), 6 is 17 mod 11 11 =..."
},{
    "title": "Diffie Hellman MITM Attack",
    "link": "/post/security/diffie-hellman-mitm-attack.html",
    "image": null,
    "date": "August 29, 2019",
    "category": null,
    "excerpt": "p = prime number (public) g = modulus (public) a = Alice private key (private) b = Bob private key..."
}]

$(document).ready(function() {
    $('#search-input').on('keyup', function () {
        var resultdiv = $('#results-container');
        if (!resultdiv.is(':visible'))
            resultdiv.show();
        var query = $(this).val();
        var result = index.search(query);
        resultdiv.empty();
        $('.show-results-count').text(result.length + ' Results');
        for (var item in result) {
            var ref = result[item].ref;
            var searchitem = '<li><a href="'+ hostname + store[ref].link+'">'+store[ref].title+'</a></li>';
            resultdiv.append(searchitem);
        }
    });
});