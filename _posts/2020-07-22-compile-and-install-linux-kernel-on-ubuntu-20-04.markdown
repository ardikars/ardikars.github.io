---
title: Compile and Install Linux Kernel on Ubuntu 20.04
date: 2020-07-22 12:41:00 Z
categories:
- kernel
tags:
- build
- install
- linux
layout: post
---

`sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils libssl-dev bc flex libelf-dev bison`

`wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.7.10.tar.xz`

`tar xvf linux-5.7.10.tar.xz`

`cd linux-5.7.10`

`cp /boot/config-$(uname -r) .config`

`make menuconfig`

`make`

`sudo make modules_install`

`sudo make install`

`sudo update-initramfs -c -k 5.7.10`

`sudo update-grub`

*) used for trying new kernel api from linux (io_uring).
