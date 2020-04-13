---
title: Extended Euclidean
date: 2019-08-29 10:41:00 Z
categories:
- math
tags:
- cryptography
- security
- math
- algorithm
layout: post
---

gcd(11, 17) == 1

```text

17 = 11(1) + 6    // 1 is floor(17/11), 6 is 17 mod 11
11 = 6(1) + 5
6 = 5(1) + 1      // done

```

<!--more-->

### Implementation in python [(src)](https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm)
```python
def gcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, x, y = gcd(b % a, a)
        return (g, y - (b // a) * x, x)
```
