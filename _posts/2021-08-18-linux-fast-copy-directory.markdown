---
title: Linux Fast Copy Directory
date: 2021-08-18 10:41:00 Z
categories:
- linux
- copy
tags:
- linux
layout: post
---

```bash
tar cf - . | (cd /output/directory/ && tar xvf -)
```
