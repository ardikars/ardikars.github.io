var hostname = "https://www.ardikars.com";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "MariaDB Insert Large Dataset (Java)",
      category: null,
      content: "EntityManager entityManagerA = entityManagerFactoryA.createEntityManager();\nQPayment payment = QPayment.payment;\nJPAQueryFactory qf = new JPAQueryFactory(entityManagerA);\nJPAQuery&lt;PaymentResponse&gt; query = qf.from(payment)\n        .groupBy(payment.refnum)\n        .select(\n                Projections.bean(\n                        PaymentResponse.class,\n                        payment.refnum.as(PaymentResponse.PaymentResponse_.REFNUM),\n                        payment.idtrx.as(PaymentResponse.PaymentResponse_.IDTRX),\n                        payment.jenisTransaksi.as(PaymentResponse.PaymentResponse_.PRODUK),\n                        payment.tglbayar.as(PaymentResponse.PaymentResponse_.TANGGAL_BAYAR),\n                        payment.rptag.castToNum(Long.class).add(payment.rpadmin.castToNum(Long.class)).sum().stringValue().as(PaymentResponse.PaymentResponse_.AMOUNT)\n                )\n        ).where(payment.tglbayar.between(from, to).and(payment.kodebank.in(banks)))\n        .orderBy(payment.tglbayar.desc());\n\nString start = DateTimes.format(from);\nString end = DateTimes.format(to);\nString file = System.getProperty(\"user.dir\") + \"/\" + start + \"-\" + end + \"-\" + System.currentTimeMillis() + \".csv\";\nLocalDateTime now = DateTimes.now();\nlog.info(\"Started...\");\nlog.info(\"Writing to file: {}\", file);\nfinal AtomicLong total = new AtomicLong();\ntry (RandomAccessFile writer = new RandomAccessFile(file, \"rw\");\n     FileChannel channel = writer.getChannel()) {\n    final ByteBuffer buff = ByteBuffer.allocate(655535);\n    query.stream().forEach(paymentResponse -&gt; {\n        buff.clear();\n        String line = String.format(\"%s;%s;%s;%s;%d;%s\\n\", paymentResponse.getAmount(), DateTimes.format(paymentResponse.getTanggalBayar()), paymentResponse.getIdtrx(), paymentResponse.getProduk(), pullPlnId, paymentResponse.getRefnum());\n        buff.put(line.getBytes(StandardCharsets.UTF_8));\n        buff.flip();\n        try {\n            channel.write(buff);\n            total.incrementAndGet();\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n    });\n} catch (FileNotFoundException e) {\n    // do something\n} catch (IOException e) {\n    // do something\n} finally {\n    entityManagerA.close();\n}\n\nEntityManager entityManagerB = entityManagerFactoryB.createEntityManager();\n\nSession session = entityManagerB.unwrap(Session.class);\nsession.doWork(connection -&gt; {\n    String baQuery = \"LOAD DATA LOCAL INFILE ? INTO TABLE my_dst_table FIELDS TERMINATED BY ';' LINES TERMINATED BY '\\n'\";\n    PreparedStatement preparedStatement = connection.prepareStatement(baQuery);\n    preparedStatement.setString(1, file);\n    boolean execute = preparedStatement.execute();\n    System.out.println(\"EXECUTED: \" + execute);\n});\nlong between = ChronoUnit.MINUTES.between(now, DateTimes.now());\nlog.info(\"Done: takes {} minutes.\", between);\nentityManagerB.close();\n\n",
      tags: ["database","mariadb"],
      id: 0
    });
    

    index.add({
      title: "Prime Factor",
      category: null,
      content: "Simple prime factorization\n\nimport math\n\ndef prime_factor(num):\n    factors = []\n    while num % 2 == 0:\n        factors.append(2)\n        num = num / 2\n    for i in range(3, int(math.sqrt(num)) + 1, 2): # 3, 5, 7, ...\n        while num % i == 0:\n            factors.append(i)\n            num = num / i\n    if num &gt; 2:\n        factors.append(num)\n    return factors\n\n\nnum = 1000003 + 1\nfactors = prime_factor(num)\n\nif len(factors) == 1:\n    print(str(num) + \" is prime\")\nelse:\n    print(str(num) + \" = multiply(\" + str(factors) + \")\")\n\n",
      tags: ["cryptography"],
      id: 1
    });
    

    index.add({
      title: "Linux Fast Copy Directory",
      category: null,
      content: "tar cf - . | (cd /output/directory/ &amp;&amp; tar xvf -)\n\n",
      tags: ["linux"],
      id: 2
    });
    

    index.add({
      title: "Mikrotik Wireless Client Mode",
      category: null,
      content: "Reset\n\n/system reset-configuration\n\n\nLogin\n\nssh admin@192.168.88.1\n\n\nScan\n\n/interface wireless scan wlan1\n\n\nConfigure\n\n/interface wireless security-profiles\nadd authentication-types=wpa-psk,wpa2-psk \\\n    management-protection=allowed \\\n    mode=dynamic-keys \\\n    unicast-ciphers=tkip,aes-ccm \\\n    group-ciphers=tkip,aes-ccm \\\n    name=Bless2Profile \\\n    supplicant-identity=Bless2 \\\n    wpa-pre-shared-key=mysecretpassword \\\n    wpa2-pre-shared-key=mysecretpassword\n\n/interface wireless\nset [ find default-name=wlan1 ] \\\n    disabled=no \\\n    mode=station \\\n    security-profile=Bless2Profile \\\n    ssid=Bless2\n\n/ip dhcp-client\nadd comment=defconf \\\n    add-default-route=yes \\\n    disabled=no \\\n    interface=wlan1\n\n\nRemove wlan1 from bridge interface\n\n/interface bridge port print\n/interface bridge port remove numbers=1\n\n\nAdd ether1-4 to bridge interface\n\n/interface bridge port add bridge=bridge interface=ether2\n/interface bridge port add bridge=bridge interface=ether3\n/interface bridge port add bridge=bridge interface=ether4\n\n\nNAT\n\n/ip firewall nat add chain=srcnat action=masquerade out-interface=wlan1\n\n",
      tags: ["wireless","mikrotik","routing"],
      id: 3
    });
    

    index.add({
      title: "Linux RAID 0",
      category: null,
      content: "Create RAID-0\n\n$ sudo blkid\n$ sudo mdadm --create --verbose /dev/md0 --level=0 --raid-devices=2 /dev/sda1 /dev/sdb1\n$ sudo cat /proc/mdstat\n$ sudo mkfs.ext4 /dev/md0\n$ sudo mkdir -p /mnt/raid0\n$ sudo mount /dev/md0 /mnt/raid0\n\nRemove RAID-0\n\n$ sudo mdadm --stop /dev/md0\n$ sudo mdadm --remove /dev/md0 # mdadm: error opening /dev/md0: No such file or directory\n$ sudo mdadm --zero-superblock /dev/sda1 /dev/sdb1\n$ sudo cat /proc/mdstat # verify RAID device was removed\n\n",
      tags: ["linux","disk"],
      id: 4
    });
    

    index.add({
      title: "Encrypt Linux Directory",
      category: null,
      content: "$ mkdir -p ~/.local/share/python_keyring\n\n$ cd ~/.local/share\n\n$ sudo mount -t ecryptfs python_keyring python_keyring\n\n$ sudo umount python_keyring\n\n",
      tags: ["security","disk"],
      id: 5
    });
    

    index.add({
      title: "Ubuntu - Youtube Stream Client Not Working on Firefox",
      category: null,
      content: "Youtube drops Flash for HTML5 video as default\n\n$ sudo apt update\n$ sudo apt install ubuntu-restricted-extras\n\n",
      tags: ["os","ubuntu"],
      id: 6
    });
    

    index.add({
      title: "Linux Endianess Check",
      category: null,
      content: "echo -n I | hexdump -o | awk '{ print substr($2,6,1); exit}'\n# 0 for BE, 1 for LE\n\n",
      tags: ["os","endianess"],
      id: 7
    });
    

    index.add({
      title: "NATO phonetic alphabet and Morse code",
      category: null,
      content: "\n",
      tags: ["nato","radio","morse","communication"],
      id: 8
    });
    

    index.add({
      title: "Java Damn Simple HTTP Proxy",
      category: null,
      content: "import java.io.IOException;\nimport java.net.ServerSocket;\nimport java.net.Socket;\nimport java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\n\npublic class HttpProxy {\n\n  private static byte[] CONNECTION_ESTABLISHED =\n      \"HTTP/1.0 200 Connection established\\r\\nProxy-Agent: HTTP Proxy/1.0\\r\\n\\r\\n\".getBytes();\n\n  public static void main(String[] args) throws IOException {\n    ExecutorService threadPool = Executors.newCachedThreadPool();\n    ServerSocket serverSocket = new ServerSocket(8080);\n    while (true) {\n      threadPool.submit(new UpstramHandler(serverSocket.accept()));\n    }\n  }\n\n  static class UpstramHandler implements Runnable {\n\n    private final Socket socket;\n    private final ExecutorService executorService;\n\n    UpstramHandler(Socket socket) {\n      this.socket = socket;\n      this.executorService = Executors.newSingleThreadExecutor();\n    }\n\n    @Override\n    public void run() {\n      byte[] buffer = new byte[2048];\n      while (true) {\n        try {\n          Socket remoteSocket = null;\n          int recv = 1;\n          while (recv &gt; 0) {\n            recv = socket.getInputStream().read(buffer);\n            if (recv &gt; 0) {\n              if (recv &gt; 8) {\n                String s = new String(buffer, 0, 8);\n                if (s.contains(\"CONNECT\")) {\n                  int endlIndx = 0;\n                  for (int i = 8; i &lt; recv - 1; i++) {\n                    if (buffer[i] == '\\r' &amp;&amp; buffer[i + 1] == '\\n') {\n                      endlIndx = i + 1;\n                      break;\n                    }\n                  }\n                  if (endlIndx &gt; 8) {\n                    String request = new String(buffer, 0, endlIndx + 1);\n                    int connectIndex = request.indexOf(\"CONNECT\");\n                    int startIndex = request.indexOf(\" \", connectIndex) + 1;\n                    int endIndex = request.indexOf(\" \", startIndex);\n                    String[] hostnameAndPort;\n                    if (endIndex &lt; startIndex) {\n                      hostnameAndPort = request.substring(startIndex).split(\":\");\n                    } else {\n                      hostnameAndPort = request.substring(startIndex, endIndex).split(\":\");\n                    }\n                    String hostname = hostnameAndPort[0];\n                    int port = Integer.parseInt(hostnameAndPort[1]);\n                    remoteSocket = new Socket(hostname, port);\n                    socket.getOutputStream().write(CONNECTION_ESTABLISHED);\n                    socket.getOutputStream().flush();\n                    executorService.submit(new DownstreamHandler(socket, remoteSocket));\n                    continue;\n                  }\n                }\n              }\n              if (remoteSocket != null) {\n                remoteSocket.getOutputStream().write(buffer, 0, recv);\n                remoteSocket.getOutputStream().flush();\n              }\n            }\n          }\n        } catch (IOException e) {\n          System.err.println(e);\n        }\n      }\n    }\n  }\n\n  static class DownstreamHandler implements Runnable {\n\n    private final Socket socket;\n    private final Socket remoteSocket;\n\n    DownstreamHandler(Socket socket, Socket remoteSocket) {\n      this.socket = socket;\n      this.remoteSocket = remoteSocket;\n    }\n\n    @Override\n    public void run() {\n      byte[] buffer = new byte[2048];\n      int recv = 1;\n      while (recv &gt; 0) {\n        try {\n          recv = remoteSocket.getInputStream().read(buffer);\n          if (recv &gt; 0 &amp;&amp; remoteSocket != null) {\n            socket.getOutputStream().write(buffer, 0, recv);\n            socket.getOutputStream().flush();\n          }\n        } catch (IOException e) {\n          System.err.println(e);\n        }\n      }\n    }\n  }\n}\n\n",
      tags: ["proxy","http","networking"],
      id: 9
    });
    

    index.add({
      title: "Build JDK from source on Ubuntu 20.04",
      category: null,
      content: "cd /home/iconplus/Download\n\nwget -c https://releases.llvm.org/9.0.0/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz\n\ntar -xvf clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz\n\n./configure --with-num-cores=4 --with-memory-size=4096 --with-toolchain-type=clang --with-toolchain-path=/home/iconplus/Downloads/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04/bin --with-libclang=/home/iconplus/Downloads/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04\n\nmake images\n",
      tags: ["jdk","build","linux"],
      id: 10
    });
    

    index.add({
      title: "Mikrotik Simple Routing",
      category: null,
      content: "Mikrotik\n\n\n  Show IP\n\n\n/ip dhcp-client print\n\n\n  Get IP from dhcp\n\n\n/ip dhcp-client add interface=ether1 disable=no\n\n\n  Add bridge interface\n\n\n/interface bridge add name=bridge1\n\n/interface bridge port\n\nadd bridge=bridge1 interface=ether2\n\nadd bridge=bridge1 interface=ether3\n\n\n  Assign ip to bridge interface\n\n\n/ip address add interface=bridge1 address=192.168.100.1/24\n\n/ip route add gateway=bridge1\n\n/ip dns set servers=8.8.8.8\n\n/ip dns set allow-remote-request=yes\n\n\n  Configure firewall\n\n\n/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade\n\n/ip firewall nat print\n\n\n  Setup DHCP Server\n\n\n/ip dhcp-server setup\n\nSelect interface to run DHCP server on \ndhcp server interface: bridge1\n\n\nSelect network for DHCP addresses \ndhcp address space: 192.168.100.0/24\n\n\nSelect gateway for given network \ngateway for dhcp network: 192.168.100.1\n\n\nSelect pool of ip addresses given out by DHCP server \naddresses to give out: 192.168.100.2-192.168.100.254\n\n\nSelect DNS servers \ndns servers: 8.8.8.8\n\n\nSelect lease time \nlease time: 10m \n\n\n/ip dhcp-server enable\n\n/ip dhcp-server print\n\nUbuntu Client 20.04\n\n\n  Using DHCP client\n\n\ndhclient eth0\n\n\n  Static IP\n\n\nip 192.168.100.2/24 192.168.100.1\n",
      tags: ["networking","brige","routing"],
      id: 11
    });
    

    index.add({
      title: "Compile and Install Ubridge for GNS3 on Linux",
      category: null,
      content: "sudo apt install libcap-dev git build-essential\n\ngit clone https://github.com/GNS3/ubridge.git\n\ncd ubridge\n\nmake\n\nsudo make install\n",
      tags: ["gns3","install","virtualization","compile"],
      id: 12
    });
    

    index.add({
      title: "Enable DPDK for Libpcap",
      category: null,
      content: "Install required tools and libraries\n\nsudo apt install git build-essential bison flex libnuma-dev libnl-3-dev libnl-genl-3-dev\n\nClone latest DPDK source code from Github\ngit clone https://github.com/DPDK/dpdk.git\n\nCompile and Install\n\ncd dpdk\n\n\n  Get a native target environment automatically\n\n\nmake defconfig O=mybuild\n\n\n  Or get a specific target environment\n\n\nmake config T=x86_64-native-linux-gcc O=mybuild\n\n\n  Customize the target configuration in the generated .config file. Example for enabling the shared library\n\n\nsed -ri 's,(CONFIG_RTE_BUILD_SHARED_LIB=).*,\\1y,' mybuild/.config\n\nmake O=mybuild\n\nsudo make install O=mybuild\n\n*) Any kernel modules to be used, e.g. igb_uio, kni, must be compiled with the same kernel as the one running on the target\n\nInstall libpcap with dpdk enabled\n\ncd ../\n\ngit clone https://github.com/the-tcpdump-group/libpcap.git\n\ncd libpcap\n\n`./configure –with-dpdk=/usr/local\n\nmake\n\nsudo make install\n\n",
      tags: ["dpdk","integration","linux"],
      id: 13
    });
    

    index.add({
      title: "A Strict Firewall that Only Allows SSH",
      category: null,
      content: "export SERVER_IP=\"x.x.x.x\"\n\nFlushing all rules\n\niptables -F\n\niptables -X\n\nSetting default filter policy\n\niptables -P INPUT DROP\n\niptables -P OUTPUT DROP\n\niptables -P FORWARD DROP\n\nAllow incoming and outgoing ssh only\n\niptables -A INPUT -p tcp -s 0/0 -d $SERVER_IP --sport 513:65535 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT\n\niptables -A OUTPUT -p tcp -s $SERVER_IP -d 0/0 --sport 22 --dport 513:65535 -m state --state ESTABLISHED -j ACCEPT\n\nMake sure nothing comes or goes out\n\niptables -A INPUT -j DROP\n\niptables -A OUTPUT -j DROP\n\nSave and load rules\n\niptables-save &gt; /etc/iptables.rules\n\nvim /etc/network/if-pre-up.d/iptablesload\n\n#!/bin/sh\niptables-restore &lt; /etc/iptables.rules\nexit 0\n\n\nvim /etc/network/if-post-down.d/iptablessave \n\n#!/bin/sh\niptables-save -c &gt; /etc/iptables.rules\nif [ -f /etc/iptables.downrules ]; then\n   iptables-restore &lt; /etc/iptables.downrules\nfi\nexit 0\n\n\nchmod +x /etc/network/if-post-down.d/iptablessave\n\nchmod +x /etc/network/if-pre-up.d/iptablesload\n",
      tags: ["ssh","network","security"],
      id: 14
    });
    

    index.add({
      title: "Install Haraka SMTP Server On Ubuntu 20.04",
      category: null,
      content: "sudo -i\n\nInstall NVM (Node Version Manager)\n\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash\n\nexport NVM_DIR=\"$([ -z \"${XDG_CONFIG_HOME-}\" ] &amp;&amp; printf %s \"${HOME}/.nvm\" || printf %s \"${XDG_CONFIG_HOME}/nvm\")\"\n\n[ -s \"$NVM_DIR/nvm.sh\" ] &amp;&amp; \\. \"$NVM_DIR/nvm.sh\"\n\nInstall Node (LTS)\n\nnvm install --lts\n\nInstall Haraka\n\napt install build-essential\n\nnpm -g config set user root\n\nnpm install -g Haraka\n\ncd /var/mail &amp;&amp; haraka -i .\n\nvim /var/mail/config/smtp.ini\n\n; Server public IP\npublic_ip=x.x.x.x\n\n; Daemonize\ndaemonize=true\ndaemon_log_file=/var/log/haraka.log\ndaemon_pid_file=/var/run/haraka.pid\n\n; Spooling\n; Save memory by spooling large messages to disk\nspool_dir=/var/spool/haraka\n\n\nharaka -c /var/mail\n\nAllows incoming SMTP request on port 25 for server IP address x.x.x.x\n\niptables -A INPUT -p tcp -s 0/0 --sport 1024:65535 -d x.x.x.x --dport 25 -m state --state NEW,ESTABLISHED -j ACCEPT\n\niptables -A OUTPUT -p tcp -s x.x.x.x --sport 25 -d 0/0 --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT\n\nAllow outgoing SMTP requst for server IP address x.x.x.\n\niptables -A OUTPUT -p tcp -s x.x.x.x --sport 1024:65535 -d 0/0 --dport 25 -m state --state NEW,ESTABLISHED -j ACCEPT\n\niptables -A INPUT -p tcp -s 0/0 --sport 25 -d x.x.x.x --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT\n",
      tags: ["mail","smtp","install"],
      id: 15
    });
    

    index.add({
      title: "Flash the TWRP recovery to Android Device",
      category: null,
      content: "fastboot flash recovery recovery.img\n",
      tags: ["recovery","root","os"],
      id: 16
    });
    

    index.add({
      title: "SSH tunneling over HTTP Proxy",
      category: null,
      content: "sudo apt update &amp;&amp; sudo apt install gcc\n\nsudo vim http-injector-unix-client.c\n\n/*\nMIT License\n\nCopyright (c) [2020] [Ardika Rommy Sanjaya]\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n*/\n\n#include &lt;stdio.h&gt;\n#include &lt;stdlib.h&gt;\n#include &lt;string.h&gt;\n#include &lt;unistd.h&gt;\n#include &lt;sys/socket.h&gt;\n#include &lt;arpa/inet.h&gt;\n#include &lt;pthread.h&gt;\n#include &lt;stddef.h&gt;\n\n#if (__STDC_VERSION__ &gt;= 199901L)\n#include &lt;stdint.h&gt;\n#endif\n\n// https://creativeandcritical.net/str-replace-c\nchar *repl_str(const char *str, const char *from, const char *to) {\n\n\t/* Adjust each of the below values to suit your needs. */\n\n\t/* Increment positions cache size initially by this number. */\n\tsize_t cache_sz_inc = 16;\n\t/* Thereafter, each time capacity needs to be increased,\n\t * multiply the increment by this factor. */\n\tconst size_t cache_sz_inc_factor = 3;\n\t/* But never increment capacity by more than this number. */\n\tconst size_t cache_sz_inc_max = 1048576;\n\n\tchar *pret, *ret = NULL;\n\tconst char *pstr2, *pstr = str;\n\tsize_t i, count = 0;\n\t#if (__STDC_VERSION__ &gt;= 199901L)\n\tuintptr_t *pos_cache_tmp, *pos_cache = NULL;\n\t#else\n\tptrdiff_t *pos_cache_tmp, *pos_cache = NULL;\n\t#endif\n\tsize_t cache_sz = 0;\n\tsize_t cpylen, orglen, retlen, tolen, fromlen = strlen(from);\n\n\t/* Find all matches and cache their positions. */\n\twhile ((pstr2 = strstr(pstr, from)) != NULL) {\n\t\tcount++;\n\n\t\t/* Increase the cache size when necessary. */\n\t\tif (cache_sz &lt; count) {\n\t\t\tcache_sz += cache_sz_inc;\n\t\t\tpos_cache_tmp = realloc(pos_cache, sizeof(*pos_cache) * cache_sz);\n\t\t\tif (pos_cache_tmp == NULL) {\n\t\t\t\tgoto end_repl_str;\n\t\t\t} else pos_cache = pos_cache_tmp;\n\t\t\tcache_sz_inc *= cache_sz_inc_factor;\n\t\t\tif (cache_sz_inc &gt; cache_sz_inc_max) {\n\t\t\t\tcache_sz_inc = cache_sz_inc_max;\n\t\t\t}\n\t\t}\n\n\t\tpos_cache[count-1] = pstr2 - str;\n\t\tpstr = pstr2 + fromlen;\n\t}\n\n\torglen = pstr - str + strlen(pstr);\n\n\t/* Allocate memory for the post-replacement string. */\n\tif (count &gt; 0) {\n\t\ttolen = strlen(to);\n\t\tretlen = orglen + (tolen - fromlen) * count;\n\t} else\tretlen = orglen;\n\t\tret = malloc(retlen + 1);\n\tif (ret == NULL) {\n\t\tgoto end_repl_str;\n\t}\n\n\tif (count == 0) {\n\t\t/* If no matches, then just duplicate the string. */\n\t\tstrcpy(ret, str);\n\t} else {\n\t\t/* Otherwise, duplicate the string whilst performing\n\t\t * the replacements using the position cache. */\n\t\tpret = ret;\n\t\tmemcpy(pret, str, pos_cache[0]);\n\t\tpret += pos_cache[0];\n\t\tfor (i = 0; i &lt; count; i++) {\n\t\t\tmemcpy(pret, to, tolen);\n\t\t\tpret += tolen;\n\t\t\tpstr = str + pos_cache[i] + fromlen;\n\t\t\tcpylen = (i == count-1 ? orglen : pos_cache[i+1]) - pos_cache[i] - fromlen;\n\t\t\tmemcpy(pret, pstr, cpylen);\n\t\t\tpret += cpylen;\n\t\t}\n\t\tret[retlen] = '\\0';\n\t}\n\nend_repl_str:\n\t/* Free the cache and return the post-replacement string,\n\t * which will be NULL in the event of an error. */\n\tfree(pos_cache);\n\treturn ret;\n}\n\n/* connecting to http proxy */\n\nvoid printHelp() {\n\tprintf(\"ssh ardikars@103.129.220.168 -o ProxyCommand=\\\"./http-injector-client -x 192.168.43.172:44533 -P \\'CONNECT 103.129.220.168:22 HTTP/1.1[crlf*2]\\'\\\"\\n\\n\");\n\tprintf(\"-x: HTTP Proxy.\\n\");\n\tprintf(\"-P: HTTP Payload.\\n\");\n\tprintf(\"-s: Buffer size (Optional, default: 1023).\\n\");\n}\n\nvoid *reader(void *args) {\n\tint fd = *(int *) args;\n\tchar ch;\n\twhile (1) {\n    \t\tfread(&amp;ch, 1, 1, stdin);\n\t\tsend(fd, (void *) &amp;ch, 1, 0);\n\t}\n}\n\nvoid *writer(void *args) {\n\tint fd = *(int *) args;\n\tchar ch;\n\twhile (1) {\n\t\trecv(fd, (void *) &amp;ch, 1, 0);\n\t\tfwrite(&amp;ch, 1, 1, stdout);\n\t\tfflush(stdout);\n\t}\n}\n\n\nint main(int argc, char* argv[]) {\n\n\tint fd;\n\tstruct sockaddr_in remote; \n\n\tchar *proxy_host = NULL;\n\tint proxy_port = -1;\n\n\tchar *payload = NULL;\n\n\tint buf_size = 1024;\n\tint opt;\n  \twhile ((opt = getopt (argc, argv, \"x:h:s:P:\")) != -1) {\n\t\tswitch (opt) {\n\t\t\tcase 'x':\n\t\t\t\tproxy_host = strtok(optarg, \":\");\n\t\t\t\tif (proxy_host != NULL) {\n\t\t\t\t\tproxy_port = atoi(strtok(NULL, \":\"));\n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t\tcase 'h':\n\t\t\t\tprintHelp();\n\t\t\t\tbreak;\n\t\t\tcase 's':\n\t\t\t\tbuf_size = atoi(optarg);\n\t\t\t\tbreak;\n\t\t\tcase 'P':\n\t\t\t\tpayload = optarg;\n\t\t\t\tpayload = repl_str(payload, \"[cr]\", \"\\r\");\n\t\t\t\tpayload = repl_str(payload, \"[lf]\", \"\\n\");\n\t\t\t\tpayload = repl_str(payload, \"[crlf]\", \"\\r\\n\");\n\t\t\t\tpayload = repl_str(payload, \"[crlf*2]\", \"\\r\\n\\r\\n\");\n\t\t\t\tpayload = repl_str(payload, \"[lfcr]\", \"\\n\\r\");\n\t\t\t\tbreak;\n\t\t}\n\t}\n\t\n\tif (proxy_host == NULL || proxy_port &lt; 0 || payload == NULL) {\n\t\tprintHelp();\n\t\texit(-1);\n\t}\n\n\tchar buffer[buf_size];\n\tint sent, read = 0;\n\tpthread_t worker;\n\n\n\tif ((fd = socket(AF_INET, SOCK_STREAM, 0)) &lt; 0) {\n\t\tprintf(\"\\nFailed to open socket file descriptor.\\n\");\n\t\treturn -1;\n\t}\n\n\tremote.sin_family = AF_INET;\n\tremote.sin_port = htons(proxy_port);\n\n\tif (inet_pton(AF_INET, proxy_host, &amp;remote.sin_addr) &lt;= 0) {\n        \tprintf(\"\\nInvalid address/Address not supported.\\n\");\n\t\tclose(fd);\n        \treturn -1;\n    \t}\n\n\tif (connect(fd, (struct sockaddr *) &amp;remote, sizeof(remote)) &lt; 0) {\n        \tprintf(\"\\nConnection Failed.\\n\");\n\t\tclose(fd);\n        \treturn -1;\n\t}\n\n\tif ((sent = send(fd, payload, strlen(payload), 0)) &lt; 0) {\n\t\tprintf(\"\\nFailed to send HTTP payload.\\n\");\n\t\tclose(fd);\n\t\treturn -1;\n\t}\n\n\tmemset(buffer, '\\0', buf_size);\n\twhile (read == 0) {\n\t\tread = recv(fd, buffer, buf_size, 0);\n\t\tfor (int i = 0; i &lt; read; i++) {\n\t\t\tif (buffer[read - 4] == '\\r' &amp;&amp; buffer[read - 3] == '\\n' &amp;&amp; buffer[read - 2] == '\\r' &amp;&amp; buffer[read - 1] == '\\n') {\n\t\t\t\tread == 0;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\n\tpthread_create(&amp;worker, NULL, reader, (void*) &amp;fd); \n\twriter((void*) &amp;fd);\n\n\tclose(fd);\n\treturn 0;\n}\n\n\ngcc http-injector-unix-client.c -o http-injector-client -lpthread\n\nssh marshall-vpnjantit.com@103.129.220.168 -o \"ProxyCommand=./http-injector-client -x 192.168.43.173:44355 -P 'CONNECT 103.129.220.168:22 HTTP/1.1[crlf*2]'\"\n\n*) Parameters\n\n\n  \n    -x: HTTP Proxy\n  \n  \n    -P: HTTP request payload (Request connection to ssh server)\n  \n  \n    -s: Buffer size (Optional), default value is 1024.\n  \n\n",
      tags: ["http","ssh","injector"],
      id: 17
    });
    

    index.add({
      title: "SSH tunneling without opening shell",
      category: null,
      content: "ssh -D 8123 -fN root@ardikars.com\n\n\n  \n    -D: Create socks proxy, listening on port 8123\n  \n  \n    -f: Requests ssh to go to background just before command execution.\n  \n  \n    -N: Do not execute a remote command.\n  \n\n",
      tags: ["ssh","proxy","http"],
      id: 18
    });
    

    index.add({
      title: "Compile and Install Linux Kernel on Ubuntu 20.04",
      category: null,
      content: "sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils libssl-dev bc flex libelf-dev bison\n\nwget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.7.10.tar.xz\n\ntar xvf linux-5.7.10.tar.xz\n\ncd linux-5.7.10\n\ncp /boot/config-$(uname -r) .config\n\nmake menuconfig\n\nmake\n\nsudo make modules_install\n\nsudo make install\n\nsudo update-initramfs -c -k 5.7.10\n\nsudo update-grub\n\n*) used for trying new kernel api from linux (io_uring).\n",
      tags: ["build","install","linux"],
      id: 19
    });
    

    index.add({
      title: "Nginx HTTP Load Balancer",
      category: null,
      content: "$ sudo vim /etc/nginx/nginx.conf\n\nhttp {\n\n  # round robin\n  upstream rumahpemuridan {\n      server 127.0.0.1:8081 weight=3;\n      server 127.0.0.1:8082 max_conns=2;\n      queue 100 timeout=70;\n  }\n\n  server {\n    listen 80;\n    server_name rumahpemuridan.com;\n    location / {\n      proxy_pass http://rumahpemuridan;\n    }\n  }\n}\n\n",
      tags: ["load-balancer","nginx","proxy"],
      id: 20
    });
    

    index.add({
      title: "Install Nginx and Let's Encrypt on Ubuntu 20.04",
      category: null,
      content: "Prerequisites\n\n\n  You have domain name pointing to your server public IP.\n\n\nInstallation process\n\n\n  \n    sudo apt update\n  \n  \n    sudo apt install nginx\n  \n  \n    sudo systemctl enable nginx\n  \n  \n    sudo apt install certbot\n  \n  \n    sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048\n  \n  \n    sudo mkdir -p /var/lib/letsencrypt/.well-known\n  \n  \n    sudo chgrp www-data /var/lib/letsencrypt\n  \n  \n    sudo chmod g+s /var/lib/letsencrypt\n  \n  \n    sudo vim /etc/nginx/snippets/letsencrypt.conf\n  \n\n\nlocation ^~ /.well-known/acme-challenge/ {\n  allow all;\n  root /var/lib/letsencrypt/;\n  default_type \"text/plain\";\n  try_files $uri =404;\n}\n\n\n\n  sudo vim /etc/nginx/snippets/ssl.conf\n\n\nssl_dhparam /etc/ssl/certs/dhparam.pem;\n\nssl_session_timeout 1d;\nssl_session_cache shared:SSL:50m;\nssl_session_tickets off;\n\nssl_protocols TLSv1 TLSv1.1 TLSv1.2;\nssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';\nssl_prefer_server_ciphers on;\n\nssl_stapling on;\nssl_stapling_verify on;\nresolver 8.8.8.8 8.8.4.4 valid=300s;\nresolver_timeout 30s;\n\nadd_header Strict-Transport-Security \"max-age=15768000; includeSubdomains; preload\";\nadd_header X-Frame-Options SAMEORIGIN;\nadd_header X-Content-Type-Options nosniff;\n\n\n\n  sudo vim /etc/nginx/sites-available/dev.cmsnesia.com.conf\n\n\nserver {\n  listen 80;\n  listen [::]:80;\n  server_name dev.cmsnesia.com;\n  \n  root /var/www/html\n  \n  include snippets/letsencrypt.conf;\n}\n\n\n\n  \n    sudo ln -s /etc/nginx/sites-available/dev.cmsnesia.com.conf /etc/nginx/sites-enabled/\n  \n  \n    sudo systemctl restart nginx\n  \n  \n    sudo certbot certonly --agree-tos --email cmsnesia@gmail.com --webroot -w /var/lib/letsencrypt/ -d dev.cmsnesia.com\n  \n  \n    sudo vim /etc/nginx/sites-available/dev.cmsnesia.com.conf\n  \n\n\nserver {\n    listen 80;\n    listen [::]:80;\n    server_name dev.cmsnesia.com;\n  \n    root /var/www/html\n    include snippets/letsencrypt.conf;\n    return 301 https://dev.cmsnesia.com$request_uri; # redirect http to https\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name dev.cmsnesia.com;\n\n    ssl_certificate /etc/letsencrypt/live/dev.cmsnesia.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/dev.cmsnesia.com/privkey.pem;\n    ssl_trusted_certificate /etc/letsencrypt/live/dev.cmsnesia.com/chain.pem;\n    include snippets/ssl.conf;\n    include snippets/letsencrypt.conf;\n}\n\n\n\n\n  sudo vim /etc/cron.d/certbot\n    0 */12 * * * root test -x /usr/bin/certbot -a \\! -d /run/systemd/system &amp;&amp; perl -e 'sleep int(rand(3600))' &amp;&amp; certbot -q renew --renew-hook \"systemctl reload nginx\"\n    \n  \n  sudo certbot renew --dry-run\n\n",
      tags: ["https","linux","proxy"],
      id: 21
    });
    

    index.add({
      title: "Install Mongo DB CE on Ubuntu 20.04",
      category: null,
      content: "Import the public key used by the package management system\n\n\n  \n    sudo apt-get update &amp;&amp; sudo apt-get install gnupg\n  \n  \n    wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -\n  \n\n\nAdd Mongo DB repository\n\n\n  echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list\n\n\nInstall Mongo DB\n\n\n  sudo apt-get update &amp;&amp; sudo apt-get install -y mongodb-org\n\n\nStart Mondo DB on Boot\n\n\n  sudo systemctl enable mongod.service\n\n",
      tags: ["nosql","install","linux"],
      id: 22
    });
    

    index.add({
      title: "Granting Capability CAP_NET_RAW and CAP_NET_ADMIN",
      category: null,
      content: "$ sudo setcap cap_net_raw,cap_net_admin=eip /path/to/java\n",
      tags: ["java","setcap"],
      id: 23
    });
    

    index.add({
      title: "Netflix error F7355 on Firefox",
      category: null,
      content: "\n  \n    sudo apt install libavcodec-extra\n  \n  \n    Enable DRM\n  \n\n",
      tags: ["drm","firefox","video"],
      id: 24
    });
    

    index.add({
      title: "Install Docker CE on Ubuntu 20.04",
      category: null,
      content: "Install Docker CE\n\n\n  \n    apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common\n  \n  \n    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -\n  \n  \n    echo \"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -sc) stable\" &gt; /etc/apt/sources.list.d/docker-ce.list\n  \n  \n    apt update\n  \n  \n    apt install docker-ce\n  \n\n\nEnable Docker and Containerd to run on system boot\n\n\n  systemctl enable --now docker containerd\n\n\nRunning Docker as a non-root user\n\n\n  \n    exit (Back to normal user)\n  \n  \n    sudo usermod -aG docker ${USER}\n  \n  \n    sudo chmod 666 /var/run/docker.sock\n  \n\n\nDone\n",
      tags: ["install","docker","container"],
      id: 25
    });
    

    index.add({
      title: "Install GNS3 on Ubuntu 20.04",
      category: null,
      content: "Install GNS3\n\n\n  \n    sudo add-apt-repository ppa:gns3/ppa\n  \n  \n    sudo apt update\n  \n  \n    sudo apt install gns3-server gns3-gui\n  \n\n\nInstall IOU Support (Optional)\n\nIOU (IOS over Unix) is an internal Cisco tool for simulating the ASICs in Cisco Switches. This enables you to play with Layer 2 switching in your LABS.\n\n\n  sudo dpkg --add-architecture i386\n  sudo apt update\n  sudo apt install gns3-iou\n\n\nAdd your user to the following groups:\n\nfor i in ubridge libvirt kvm wireshark; do\n  sudo usermod -aG $i $USER\ndone\n\n\nDone.\n",
      tags: ["install","gns3","networking"],
      id: 26
    });
    

    index.add({
      title: "Create a bootable USB on Linux",
      category: null,
      content: "Unmount and format USB drive (FAT32)\n\n# umount /dev/sd[X|Y]\n\nCreating new partition table on /dev/sdX\n\n\n  \n    \n      *) legacy\n      msdos\n      mbr\n      pc\n    \n  \n\n\n# parted --script /dev/sdX mklabel msdos\n\n\n  \n    \n      *) gpt\n      guid\n    \n  \n\n\n# parted --script /dev/sdX mklabel gpt\n\nWrite into USB drive\n\n  # dd bs=4M if=ubuntu-20.04-desktop-amd64.iso of=/dev/sdX status=progress oflag=sync\n\n\nReboot\n\n  # shutdown -r 0\n\n",
      tags: ["bootable","install","os"],
      id: 27
    });
    

    index.add({
      title: "Tor On Android",
      category: null,
      content: "\n  \n    Install Termux from Google Playstore.\n  \n  \n    Open Termux, then install tor (“pkg update &amp;&amp; pkg install”).\n  \n  \n    Run tor for tunneling:\n\n    \n      \n        Tunneling over HTTP “tor –HTTPTunnelPort 8118”.\n      \n      \n        For more details pls read tor docs (“pkg install man &amp;&amp; man tor”).\n      \n    \n  \n  \n    Install Firefox browser from Google Playstore.\n  \n  \n    Open Firefox, type “about:config” in the URL bar.\n  \n  \n    Set “network.proxy.type” to “1” (Configure proxy manually).\n  \n  \n    Set “network.proxy.http” to “127.0.0.1”, and “network.proxy.http.port” to “8118”.\n  \n\n\nNote*)\n\n\n  \n    DNS is not encrypted.\n  \n  \n    By default Tor opening socks(x) listener on 127.0.0.1:9050.\n  \n  \n    You can use Tor config file ($PREFIX/etc/tor/torrc) instead of passing Tor command line args.\n  \n\n\nFirefox =&gt; Tor local proxy (socks(x)/http/etc) =&gt; Tor network (proxy =&gt; proxy =&gt; proxy ….)\n",
      tags: ["proxy","tunnel","anonymity"],
      id: 28
    });
    

    index.add({
      title: "Unlock Nokia 3 Bootloader",
      category: null,
      content: "\n  \n    Enable developer options\n  \n  \n    Enable OEM Unlocking (OEM Unlock)\n  \n  \n    Enable USB debugging mode\n  \n  \n    Change default USB configuration, choose File Transfer (MTP)\n  \n  \n    Install adb and fastboot (sudo apt-get install android-tools-adb android-tools-fastboot)\n  \n  \n    Install nokia usb drive\n  \n  \n    Connect your phone to your PC and approve all usb connection\n  \n  \n    Type adb devices, then it will show the serial number\n  \n  \n    Type adb reboot bootloader, then your devices will boot into fastboot mode\n  \n  \n    Type fastboot devices, to make sure that your device still connected to your PC and it will show your phone serial number\n  \n  \n    Type fastboot oem key $(echo -n \"YOUR_PHONE_SERIAL_NUMBER\" | md5sum | tr [a-z] [A-Z])\n  \n  \n    Type fastboot flashing unlock, your phone will ask you about unlocking bootloader\n  \n  \n    Press vol up (yes)\n  \n\n",
      tags: ["bootloader","unlocking","rooting"],
      id: 29
    });
    

    index.add({
      title: "Fix RTL8822BE driver on Debian based system",
      category: null,
      content: "Below script tested on Kali Linux 2020.1b (Kernel 5.4.0)\n\nsudo mkdir -p /lib/firmware/rtw88\nsudo cp /lib/firmware/rtlwifi/rtl8822befw.bin /lib/firmware/rtw88/rtw8822b_fw.bin\nsudo reboot\n\n\n",
      tags: ["driver","wifi"],
      id: 30
    });
    

    index.add({
      title: "ARP - MITM Detection Method",
      category: null,
      content: "Sedikit tengan ARP\n\nARP merupakan protokol yang digunakan untuk memetakan alamat fisik (MAC) dan logika (IP). Proses pemetaan ini sering dimanfaatkan oleh penyerang dengan cara memalsukan isi dari peta (ARP table) tersebut sehingga ia dapat menguasai komunikasi yang bergantung pada isi dari peta tersebut (routing).\n\nBerikut metode yang saya gunakan untuk mendeteksi proses pemalsuan tersebut.\n\nDisini saya menggunakan TCP-Syn untuk memancing penyerang. Kenapa? Karena jika menggunakan protokol seperti ICMP maka penyerang bisa saja membuat firewall untuk mem-blok semua paket ICMP yang datang.\n\nDengan menggunakan TCP-Syn dengan port yang kita buat acak, pengerang tentu tidak dapat menebak port tersebut dan memblok nya.\n\n\n\nDi bawah ini adalah coret2 saya dahulu kala.\n\n\n    \n\n\n\n    \n\n\n\n    \n\n\n\n    \n\n",
      tags: ["mitm","security","networking"],
      id: 31
    });
    

    index.add({
      title: "RSA Small Key Problem",
      category: null,
      content: "Given public key = (7, 33).\n\nFind private key (d).\n\nn = 33 (modulus)\n\ne = 7 (exponent)\n\nlet’s factoring n\n\nn = p * q\n\n33 = ? * ?\n\nfloor(sqrt(n)) = floor(sqrt(33)) = 5\n\n33 mod 5 = 3 « not 0\n\n33 mod 4 = 1 « no need to test (except for 2 all other prime numbers are odd)\n\n33 mod 3 = 0 « we got p = 3\n\np = 3\n\n33 = 3 * ?\n\n\n\nq = n / p\n\n= 33 / 3\n\n= 11\n\nn = p * q\n\n= 3 * 11\n\nphi = ((p-1) * (q-1))\n\n= (2 * 10)\n\n= 20\n\ne * ? mod 20 = 1\n\n7 * ? mod 20 = 1  « modInv\n\n7 * 3 mod 20 = 1\n\nok, d = 3\n\nprivate key (d) = (3, 33)\n\nSample code in python.\n\n#!/usr/bin/env python\n\nimport math\n\npub_key = (7, 33) ## 7 = exponent (e), 33 = modulus (n)\n\n# factoring modulus (n = 33)\n\n# n = p * q\n# 33 = p * q\n\ndef round_up(n, decimals=0):\n    multiplier = 10 ** decimals\n    return math.ceil(n * multiplier) / multiplier\n\ndef egcd(a, b):\n    if a == 0:\n        return (b, 0, 1)\n    else:\n        g, y, x = egcd(b % a, a)\n        return (g, x - (b // a) * y, y)\n\ndef modinv(a, m):\n    g, x, y = egcd(a, m)\n    if g != 1:\n        raise Exception('modular inverse does not exist')\n    else:\n        return x % m\n\nsqroot = int(round_up(math.sqrt(pub_key[1])))\n\n# find p from sqroot to 3\nfor i in reversed(range(3, sqroot, 2)):\n    if pub_key[1] % i == 0:\n        p = i\n        break\n\n# find p from 3 to sqroot\nfor i in range(3, sqroot, 2):\n    if pub_key[1] % i == 0:\n        assert p == i\n        break\n\n\nq = int(pub_key[1] / p)\nphi = (p - 1) * (q - 1)\nprint (\"e = \" + str(pub_key[0]) + \", n = \" + str(pub_key[1]) + \", p = \" + str(p) + \", q = \" + str(q) + \", phi = \" + str(phi))\n\nd = modinv(pub_key[0], phi)\nprint(\"d = \" + str(d))\n\n\n",
      tags: ["algorithm","math","security"],
      id: 32
    });
    

    index.add({
      title: "RSA Algorithm",
      category: null,
      content: "Key Generation\n\n\n  \n    Generate two random primes, p and q, e.g p=3, q=11.\n  \n  \n    Compute n = pq, n = 3 * 11 = 33.\n  \n  \n    Compute phi = (p-1)(q-1) = (3-1)(11-1) = 20\n  \n  \n    Choose an integer e, 1 &lt; e &lt; phi, such that gcd(e, phi) = 1, e.g e = 7, gcd(7, 20) = 1\n  \n  \n    Compute the secret exponent d, 1 &lt; d &lt; phi, such that (e * d) mod phi = 1, (7 * d) mod 20 = 1,  d = 3\n  \n\n\n\n\n\n  The public key is (7, 33) and the private key (3, 33).\n\n\nEncrypt\n\n\n  \n    m = 2\n  \n  \n    c = 2^7 mod 33 = 29\n  \n\n\nDecrypt\n\n\n  \n    c = 29\n  \n  \n    m = 29 ^ 3 mod\n  \n\n\n\n  \n    n is known as the modulus.\n  \n  \n    e is known as the public exponent or encryption exponent or just the exponent.\n  \n  \n    d is known as the secret exponent or decryption exponent.\n  \n\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 33
    });
    

    index.add({
      title: "Miller Rabin",
      category: null,
      content: "read more\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 34
    });
    

    index.add({
      title: "Square and Multiply",
      category: null,
      content: "11^37 = ?\n\n37 = 100101 in binary\n\n\n  \n    1 -&gt; first “One” lists number          = 11\n  \n  \n    0 -&gt; square                                    = (11)^2\n  \n  \n    0 -&gt; square                                    = ((11)^2)^2\n  \n  \n    1 -&gt; square + multiply              = (((11)^2)^2)^2*11\n  \n  \n    0 -&gt; square                                    = ((((11)^2)^2)^2*11)^2\n  \n  \n    1 -&gt; square + multiply              = (((((11)^2)^2)^2*11)^2)^2*11\n  \n\n\n\n\nSimple implementation in python\n\n# x ^ h mod n\ndef modPow(x, h, n):\n    y = 1\n    h = bin(h)[2:] # convert h into binary\n    for i in range(len(h)):\n        y = (y ** 2) % n\n        if h[i] == '1':\n            y = (y * x) % n\n    return y\n\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 35
    });
    

    index.add({
      title: "Extended Euclidean",
      category: null,
      content: "gcd(11, 17) == 1\n\n\n17 = 11(1) + 6    // 1 is floor(17/11), 6 is 17 mod 11\n11 = 6(1) + 5\n6 = 5(1) + 1      // done\n\n\n\n\n\nImplementation in python (src)\ndef gcd(a, b):\n    if a == 0:\n        return (b, 0, 1)\n    else:\n        g, x, y = gcd(b % a, a)\n        return (g, y - (b // a) * x, x)\n\n",
      tags: ["cryptography","security","math","algorithm"],
      id: 36
    });
    

    index.add({
      title: "Diffie Hellman MITM Attack",
      category: null,
      content: "p = prime number (public)\ng = modulus (public)\n\na = Alice private key (private)\nb = Bob private key (private)\n\nA = Alice public key (public)\nB = Bob public ket = (public)\n\nSx = Shared key (public)\n\neA = Eve private key for Alice (private)\neB = Eve private key for Bob (private)\nEa = Spoofed Alice public key will be sent to Bob (public)\nEb = Spoofed Bob public key will be sent to Alice (public)\n\n\n\nDiffie Hellman Algorithm\n\np = 23, g = 5\n\n| a = 4                                      | b = 3                                         |\n|--------------------------------------------|-----------------------------------------------|\n| A = g ^ a mod p = 5 ^ 4 mod 23 = 4         | B = g ^ b mod p = 5 ^ 3 mod 23 = 10           |\n| Send Alice public key (A) to Bob           | Send Bob public key (B) to Alice              |\n| Bob public key (B) is 10                   | Alice public key (A) is 4                     |\n| Compute shared key from Bob pubic key (B)  | Compute shared key from Alice public key (A)  |\n| Sa = B ^ a mod p = 10 ^ 4 mod 23 = 18      | Sb = A ^ b mod p = 4 ^ 3 mod 23 = 18          |\n\n\nSa == Sb\nDiscrete logarithm problem (A = g ^ ? mod p &amp;&amp; B ^ ? mod p)\n\n\nMITM Attack\n\np = 23, g = 5\n\n\n| a = 4                                            | eA = 6, eB = 9                                | b = 3                                              |\t\n|--------------------------------------------------|-----------------------------------------------|----------------------------------------------------|\n| A = g ^ a mod p = 5 ^ 4 mod 23 = 4               | Eb = g ^ eB mod p = 5 ^ 9 mod 23 = 11         | -                                                  |\t\n| Send Alice public key (A) to Bob (Eve)           | Send Spoofed Bob public key (Ea) to Alice     | -                                                  |\n| Bob (Eve) public key (Eb) is 11                  | Alice public key (A) is 4                     | -                                                  |\n| Compute shared key from Bob (Eve) pubic key (Eb) | Compute shared key from Alice public key (A)  | -                                                  |\n| Sae = Eb ^ a mod p = 11 ^ 3 mod 23 = 13          | Sa = A ^ eB mod p = 4 ^ 9 mod 23 = 13         | -                                                  |\n| -                                                | Ea = g ^ eA mod p = 5 ^ 6 mod 23 = 8          | B = g ^ b mod p = 5 ^ 3 mod 23 = 10                |\n| -                                                | Send Spoofed Alice public key (Eb) to Bob     | Send Bob public key (B) to Alice (Eve)             |\n| -                                                | Bob public key (B) is 10                      | Alice (Eve) public key (Ea) is 8                   |\n| -                                                | Compute shared key from Bob public key (B)    | Compute shared key from Alice (Eve) pubic key (Ea) |\n| -                                                | Sb = B ^ eA mod p = 10 ^ 6 mod 23 = 6         | Sbe = Ea ^ b mod p = 8 ^ 3 mod 23 = 6              |\n\n\n(Now Eve can intercept connection between Alice and Bob)\n",
      tags: ["cryptography","security","math","mitm"],
      id: 37
    });
    


var store = [{
    "title": "MariaDB Insert Large Dataset (Java)",
    "link": "/post/java/mariadb/largedata/mariadb-insert-large-dataset-java.html",
    "image": null,
    "date": "November 24, 2021",
    "category": null,
    "excerpt": "EntityManager entityManagerA = entityManagerFactoryA.createEntityManager(); QPayment payment = QPayment.payment; JPAQueryFactory qf = new JPAQueryFactory(entityManagerA); JPAQuery&lt;PaymentResponse&gt; query = qf.from(payment) .groupBy(payment.refnum) .select( Projections.bean(..."
},{
    "title": "Prime Factor",
    "link": "/post/prime/math/prime-factor.html",
    "image": null,
    "date": "October 23, 2021",
    "category": null,
    "excerpt": "Simple prime factorization import math def prime_factor(num): factors = [] while num % 2 == 0: factors.append(2) num = num..."
},{
    "title": "Linux Fast Copy Directory",
    "link": "/post/linux/copy/linux-fast-copy-directory.html",
    "image": null,
    "date": "August 18, 2021",
    "category": null,
    "excerpt": "tar cf - . | (cd /output/directory/ &amp;&amp; tar xvf -)\n\n"
},{
    "title": "Mikrotik Wireless Client Mode",
    "link": "/post/networking/mikrotik-wireless-client-mode.html",
    "image": null,
    "date": "August 10, 2021",
    "category": null,
    "excerpt": "Reset /system reset-configuration Login ssh admin@192.168.88.1 Scan /interface wireless scan wlan1 Configure /interface wireless security-profiles add authentication-types=wpa-psk,wpa2-psk \\ management-protection=allowed \\..."
},{
    "title": "Linux RAID 0",
    "link": "/post/raid/linux-raid-0.html",
    "image": null,
    "date": "July 10, 2021",
    "category": null,
    "excerpt": "Create RAID-0 $ sudo blkid $ sudo mdadm --create --verbose /dev/md0 --level=0 --raid-devices=2 /dev/sda1 /dev/sdb1 $ sudo cat /proc/mdstat $..."
},{
    "title": "Encrypt Linux Directory",
    "link": "/post/linux/encrypt-linux-directory.html",
    "image": null,
    "date": "July 2, 2021",
    "category": null,
    "excerpt": "$ mkdir -p ~/.local/share/python_keyring\n\n$ cd ~/.local/share\n\n$ sudo mount -t ecryptfs python_keyring python_keyring\n\n$ sudo umount python_keyring\n\n"
},{
    "title": "Ubuntu - Youtube Stream Client Not Working on Firefox",
    "link": "/post/linux/ubuntu-20-04-youtube-stream-client-not-working-on-firefox.html",
    "image": null,
    "date": "June 26, 2021",
    "category": null,
    "excerpt": "Youtube drops Flash for HTML5 video as default\n\n$ sudo apt update\n$ sudo apt install ubuntu-restricted-extras\n\n"
},{
    "title": "Linux Endianess Check",
    "link": "/post/linux/linux-endianess-check.html",
    "image": null,
    "date": "December 14, 2020",
    "category": null,
    "excerpt": "echo -n I | hexdump -o | awk '{ print substr($2,6,1); exit}'\n# 0 for BE, 1 for LE\n\n"
},{
    "title": "NATO phonetic alphabet and Morse code",
    "link": "/post/alphabet/nato-phonetic-alphabet-and-morse-code.html",
    "image": null,
    "date": "September 1, 2020",
    "category": null,
    "excerpt": "\n"
},{
    "title": "Java Damn Simple HTTP Proxy",
    "link": "/post/java/java-damn-simple-http-proxy.html",
    "image": null,
    "date": "August 20, 2020",
    "category": null,
    "excerpt": "import java.io.IOException; import java.net.ServerSocket; import java.net.Socket; import java.util.concurrent.ExecutorService; import java.util.concurrent.Executors; public class HttpProxy { private static byte[] CONNECTION_ESTABLISHED = \"HTTP/1.0..."
},{
    "title": "Build JDK from source on Ubuntu 20.04",
    "link": "/post/java/build-jdk-from-source-on-ubuntu-20.04.html",
    "image": null,
    "date": "August 18, 2020",
    "category": null,
    "excerpt": "cd /home/iconplus/Download\n\nwget -c https://releases.llvm.org/9.0.0/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz\n\ntar -xvf clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz\n\n./configure --with-num-cores=4 --with-memory-size=4096 --with-toolchain-type=clang --with-toolchain-path=/home/iconplus/Downloads/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04/bin --with-libclang=/home/iconplus/Downloads/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04\n\nmake images\n"
},{
    "title": "Mikrotik Simple Routing",
    "link": "/post/mikrotik/mikrotik-simple-routing.html",
    "image": null,
    "date": "August 13, 2020",
    "category": null,
    "excerpt": "Mikrotik Show IP /ip dhcp-client print Get IP from dhcp /ip dhcp-client add interface=ether1 disable=no Add bridge interface /interface bridge..."
},{
    "title": "Compile and Install Ubridge for GNS3 on Linux",
    "link": "/post/linux/compile-and-install-ubrige-for-gns3-on-linux.html",
    "image": null,
    "date": "August 11, 2020",
    "category": null,
    "excerpt": "sudo apt install libcap-dev git build-essential\n\ngit clone https://github.com/GNS3/ubridge.git\n\ncd ubridge\n\nmake\n\nsudo make install\n"
},{
    "title": "Enable DPDK for Libpcap",
    "link": "/post/libpcap/enable-dpdk-for-libpcap.html",
    "image": null,
    "date": "August 6, 2020",
    "category": null,
    "excerpt": "Install required tools and libraries sudo apt install git build-essential bison flex libnuma-dev libnl-3-dev libnl-genl-3-dev Clone latest DPDK source code..."
},{
    "title": "A Strict Firewall that Only Allows SSH",
    "link": "/post/firewall/a-strict-firewall-that-only-allows-ssh.html",
    "image": null,
    "date": "July 31, 2020",
    "category": null,
    "excerpt": "export SERVER_IP=\"x.x.x.x\" Flushing all rules iptables -F iptables -X Setting default filter policy iptables -P INPUT DROP iptables -P OUTPUT..."
},{
    "title": "Install Haraka SMTP Server On Ubuntu 20.04",
    "link": "/post/server/install-haraka-smtp-server-on-ubuntu-20-04.html",
    "image": null,
    "date": "July 31, 2020",
    "category": null,
    "excerpt": "sudo -i Install NVM (Node Version Manager) curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash export NVM_DIR=\"$([ -z \"${XDG_CONFIG_HOME-}\" ] &amp;&amp; printf %s..."
},{
    "title": "Flash the TWRP recovery to Android Device",
    "link": "/post/android/flash-the-twrp-recovery-to-android-device.html",
    "image": null,
    "date": "July 31, 2020",
    "category": null,
    "excerpt": "fastboot flash recovery recovery.img\n"
},{
    "title": "SSH tunneling over HTTP Proxy",
    "link": "/post/tunneling/ssh-tunneling-over-http-proxy.html",
    "image": null,
    "date": "July 25, 2020",
    "category": null,
    "excerpt": "sudo apt update &amp;&amp; sudo apt install gcc sudo vim http-injector-unix-client.c /* MIT License Copyright (c) [2020] [Ardika Rommy Sanjaya]..."
},{
    "title": "SSH tunneling without opening shell",
    "link": "/post/tunnelling/ssh-tunnel-without-command-execution.html",
    "image": null,
    "date": "July 23, 2020",
    "category": null,
    "excerpt": "ssh -D 8123 -fN root@ardikars.com -D: Create socks proxy, listening on port 8123 -f: Requests ssh to go to background..."
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
    "excerpt": "Unmount and format USB drive (FAT32) # umount /dev/sd[X|Y] Creating new partition table on /dev/sdX *) legacy msdos mbr pc..."
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