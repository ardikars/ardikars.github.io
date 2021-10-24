---
title: RSA Small Key Problem
date: 2019-08-31 03:39:00 Z
categories:
- security
tags:
- algorithm
- math
- security
layout: post
---

Given public key = (7, 33).


Find private key (d).


n = 33 (modulus)

e = 7 (exponent)


let's factoring n

n = p \* q

33 = ? \* ?

floor(sqrt(n)) = floor(sqrt(33)) = 5

33 mod 5 = 3 << not 0

33 mod 4 = 1 << no need to test (except for 2 all other prime numbers are odd)

33 mod 3 = 0 << we got p = 3


p = 3

33 = 3 \* ?

<!--more-->

q = n / p

= 33 / 3

= 11


n = p \* q

= 3 \* 11


phi = ((p-1) \* (q-1))

= (2 \* 10)

= 20

e \* ? mod 20 = 1

7 \* ? mod 20 = 1  << modInv

7 \* 3 mod 20 = 1


ok, d = 3

private key (d) = (3, 33)



Sample code in python.

```python
#!/usr/bin/env python

import math

pub_key = (7, 33) ## 7 = exponent (e), 33 = modulus (n)

# factoring modulus (n = 33)

# n = p * q
# 33 = p * q

def round_up(n, decimals=0):
    multiplier = 10 ** decimals
    return math.ceil(n * multiplier) / multiplier

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m

sqroot = int(round_up(math.sqrt(pub_key[1])))

# find p from sqroot to 3
for i in reversed(range(3, sqroot, 2)):
    if pub_key[1] % i == 0:
        p = i
        break

# find p from 3 to sqroot
for i in range(3, sqroot, 2):
    if pub_key[1] % i == 0:
        assert p == i
        break


q = int(pub_key[1] / p)
phi = (p - 1) * (q - 1)
print ("e = " + str(pub_key[0]) + ", n = " + str(pub_key[1]) + ", p = " + str(p) + ", q = " + str(q) + ", phi = " + str(phi))

d = modinv(pub_key[0], phi)
print("d = " + str(d))

```
