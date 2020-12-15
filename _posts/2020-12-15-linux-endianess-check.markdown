---
title: Linux Endianess Check
date: 2020-12-15 10:41:00 Z
categories:
- linux
tags:
- os
- endianess
layout: post
---

```bash
echo -n I | hexdump -o | awk '{ print substr($2,6,1); exit}'
# 0 for BE, 1 for LE
```
