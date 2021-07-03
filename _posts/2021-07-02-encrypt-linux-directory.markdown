---
title: Encrypt Linux Directory
date: 2021-07-02 10:41:00 Z
categories:
- linux
tags:
- security
- disk
layout: post
---

```bash
$ mkdir -p ~/.local/share/python_keyring

$ cd ~/.local/share

$ sudo mount -t ecryptfs python_keyring python_keyring

$ sudo umount secret_directory
```
