---
title: Create a bootable USB on Linux
date: 2020-07-09 21:23:00 Z
categories:
- linux
tags:
- bootable
- install
- os
layout: post
---

### Unmount and format USB drive (FAT32)

* ```# umount /dev/sdX```

* ```# mkfs.vfat /dev/sdX```


### Write into USB drive
* ```# dd bs=4M if=ubuntu-20.04-desktop-amd64.iso of=/dev/sdX status=progress oflag=sync```


### Reboot
* ```# shutdown -r 0```
