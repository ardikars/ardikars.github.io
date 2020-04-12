---
title: RSA Algorithm
date: 2019-08-30 05:34:00 Z
categories:
- cryptography
- security
tags:
- documentation
layout: post
---

Key Generation

1. Generate two random primes, p and q, e.g p=3, q=11.

2. Compute n = pq, n = 3 \* 11 = 33.

3. Compute phi = (p-1)(q-1) = (3-1)(11-1) = 20

4. Choose an integer e, 1 < e < phi, such that gcd(e, phi) = 1, e.g e = 7, gcd(7, 20) = 1

5. Compute the secret exponent d, 1 < d < phi, such that (e \* d) mod phi = 1, (7 \* d) mod 20 = 1,  d = 3

<!--more-->

6. The public key is (7, 33) and the private key (3, 33).


Encrypt

1. m = 2

2. c = 2^7 mod 33 = 29


Decrypt

1. c = 29

2. m = 29 ^ 3 mod

* n is known as the modulus.

* e is known as the public exponent or encryption exponent or just the exponent.

* d is known as the secret exponent or decryption exponent.
