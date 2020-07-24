---
title: Compile and Install Linux Kernel on Ubuntu 20.04
date: 2020-07-23 12:41:00 Z
categories:
- tunnelling
tags:
- ssh
- proxy
- http
layout: post
---

`ssh -D 8123 -fNT marshall-vpnjantit.com@103.129.220.168 -o "ProxyCommand=./http-injector-client -x 192.168.43.173:44355 -P 'CONNECT 103.129.220.168:22 HTTP/1.1[crlf*2]'"`
