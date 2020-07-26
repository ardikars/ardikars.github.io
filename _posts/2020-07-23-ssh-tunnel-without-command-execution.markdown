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

`ssh -D 8123 -fN root@ardikars.com`

- `-D`: Create socks proxy, listening on port 8123

- `-f`: Requests ssh to go to background just before command execution.

- `-N`: Do not execute a remote command.
