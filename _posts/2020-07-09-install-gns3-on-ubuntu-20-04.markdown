---
title: Install GNS3 on Ubuntu 20.04
date: 2020-07-09 22:45:00 Z
categories:
- linux
tags:
- install
- gns3
- networking
layout: post
---
### Install GNS3

1. `sudo add-apt-repository ppa:gns3/ppa`

2. `sudo apt update`

3. `sudo apt install gns3-server gns3-gui`


### Install IOU Support (Optional)

IOU (IOS over Unix) is an internal Cisco tool for simulating the ASICs in Cisco Switches. This enables you to play with Layer 2 switching in your LABS.

4. `sudo dpkg --add-architecture i386`
5. `sudo apt update`
6. `sudo apt install gns3-iou`


### Add your user to the following groups:

```bash
for i in ubridge libvirt kvm wireshark; do
  sudo usermod -aG $i $USER
done
```

Done.
