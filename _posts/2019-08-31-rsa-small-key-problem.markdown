---
title: RSA Small Key Problem
date: 2019-08-31 03:39:00 Z
categories:
- docs
tags:
- documentation
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
33 mod 4 = 1 << not 0
33 mod 3 = 0 << we got p = 3

p = 3

33 = 3 \* ?

q = n / p
= 33 / 3
= 11

n = p \* q
= 3 \* 33

phi = ((p-1) \* (q-1))
= (2 \* 10)
= 20

e \* ? mod 20 = 1
7 \* ? mod 20 = 1  << modInv
7 \* 3 mod 20 = 1

ok, d = 3

private key (d) = (3, 33)