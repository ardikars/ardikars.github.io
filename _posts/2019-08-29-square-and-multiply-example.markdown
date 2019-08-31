---
title: Square and Multiply Example
date: 2019-08-29 14:35:00 Z
categories:
- docs
tags:
- documentation
layout: post
---

11^37 = ?

37 = 100101 in binary

* 1 -> fist one list number          = 11

* 0 -> square                                    = (11)^2

* 0 -> square                                    = ((11)^2)^2

* 1 -> square \+ multiply              = (((11)^2)^2)^2\*11

* 0 -> square                                    = ((((11)^2)^2)^2\*11)^2

* 1 -> square \+ multiply              = (((((11)^2)^2)^2\*11)^2)^2\*11


<!--more-->

### Simple implementation in python

```python
# x ^ h mod n
def modPow(x, h, n):
    y = 1
    h = bin(h)[2:] # convert h into binary
    for i in range(len(h)):
        y = (y ** 2) % n
        if h[i] == '1':
            y = (y * x) % n
    return y
```
