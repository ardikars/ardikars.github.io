---
title: Enable DPDK for Libpcap
date: 2020-08-06 08:23:00 Z
categories:
- libpcap
tags:
- dpdk
- integration
- linux
layout: post
---

# Install required tools and libraries

`sudo apt install git build-essential bison flex libnuma-dev libnl-3-dev libnl-genl-3-dev`


# Clone latest DPDK source code from Github
`git clone https://github.com/DPDK/dpdk.git`



# Compile and Install

`cd dpdk`

> Get a native target environment automatically

`make defconfig O=mybuild`

> Or get a specific target environment

`make config T=x86_64-native-linux-gcc O=mybuild`

> Customize the target configuration in the generated .config file. Example for enabling the shared library

`sed -ri 's,(CONFIG_RTE_BUILD_SHARED_LIB=).*,\1y,' mybuild/.config`

`make O=mybuild`

`sudo make install O=mybuild`

*) Any kernel modules to be used, e.g. igb_uio, kni, must be compiled with the same kernel as the one running on the target


# Install libpcap with dpdk enabled

`cd ../`

`git clone https://github.com/the-tcpdump-group/libpcap.git`

`cd libpcap`

`./configure --with-dpdk=/usr/local

`make`

`sudo make install`


