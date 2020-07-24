---
title: SSH tunneling without opening shell
date: 2020-07-23 12:41:00 Z
categories:
- tunnelling
tags:
- ssh
- proxy
- http
layout: post
---

`ssh -D 8123 -fN cmsnesia-dev -o "ProxyCommand=nc -X connect -x 192.168.43.173:44355 %h %p"`
