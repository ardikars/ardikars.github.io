---
title: Tor On Android
date: 2020-07-03 00:45:00 Z
categories:
- android
tags:
- proxy
- tunnel
- anonymity
layout: post
---


1. Install Termux from Google Playstore.

2. Open Termux, then install tor ("pkg update && pkg install").

3. Run tor for tunneling:

   - Tunneling over HTTP "tor --HTTPTunnelPort 8118".

   - For more details pls read tor docs ("pkg install man && man tor").

4. Install Firefox browser from Google Playstore.

5. Open Firefox, type "about:config" in the URL bar.

6. Set "network.proxy.type" to "1" (Configure proxy manually).

7. Set "network.proxy.http" to "127.0.0.1", and "network.proxy.http.port" to "8118".


Note*)

* By default Tor opening socks(x) listener on 127.0.0.1:9050.

* You can use Tor config file ($PREFIX/etc/tor/torrc) instead of passing Tor command line args.


Firefox => Tor local proxy (socks(x)/http/etc) => Tor network (proxy => proxy => proxy ....)
