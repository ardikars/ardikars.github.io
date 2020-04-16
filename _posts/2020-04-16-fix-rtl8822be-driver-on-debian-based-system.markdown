---
title: Fix RTL8822BE driver on Debian based system
date: 2020-04-16 06:45:00 Z
categories:
- linux
tags:
- driver
- wifi
layout: post
---

Below script tested on Kali Linux 2020.1b (Kernel 5.4.0)

```bash
sudo mkdir -p /lib/firmware/rtw88
sudo cp /lib/firmware/rtlwifi/rtl8822befw.bin /lib/firmware/rtw88/rtw8822b_fw.bin
sudo reboot
```
<!--more-->
