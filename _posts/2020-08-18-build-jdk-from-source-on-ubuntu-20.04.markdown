---
title: Build JDK from source on Ubuntu 20.04
date: 2020-08-18 07:41:00 Z
categories:
- java
tags:
- jdk
- build
- linux
layout: post
---

`cd /home/iconplus/Download`

`wget -c https://releases.llvm.org/9.0.0/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz`

`tar -xvf clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz`

`./configure --with-num-cores=4 --with-memory-size=4096 --with-toolchain-type=clang --with-toolchain-path=/home/iconplus/Downloads/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04/bin --with-libclang=/home/iconplus/Downloads/clang+llvm-9.0.0-x86_64-linux-gnu-ubuntu-18.04`

`make images`
