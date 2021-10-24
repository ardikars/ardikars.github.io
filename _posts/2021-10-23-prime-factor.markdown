---
title: Prime Factor
date: 2021-10-23 10:41:00 Z
categories:
- prime
- math
tags:
- cryptography
layout: post
---

Simple prime factorization

```python
import math

def prime_factor(num):
    factors = []
    while num % 2 == 0:
        factors.append(2)
        num = num / 2
    for i in range(3, int(math.sqrt(num)) + 1, 2): # 3, 5, 7, ...
        while num % i == 0:
            factors.append(i)
            num = num / i
    if num > 2:
        factors.append(num)
    return factors


num = 1000003 + 1
factors = prime_factor(num)

if len(factors) == 1:
    print(str(num) + " is prime")
else:
    print(str(num) + " = multiply(" + str(factors) + ")")
```
