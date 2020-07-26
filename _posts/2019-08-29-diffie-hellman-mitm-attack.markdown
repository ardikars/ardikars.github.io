---
title: Diffie Hellman MITM Attack
date: 2019-08-29 10:41:00 Z
categories:
- security
tags:
- cryptography
- security
- math
- mitm
layout: post
---

```text
p = prime number (public)
g = modulus (public)

a = Alice private key (private)
b = Bob private key (private)

A = Alice public key (public)
B = Bob public ket = (public)

Sx = Shared key (public)

eA = Eve private key for Alice (private)
eB = Eve private key for Bob (private)
Ea = Spoofed Alice public key will sent to Bob (public)
Eb = Spoofed Bob public key will sent to Alice (public)
```
<!--more-->

### Diffie Hellman Algorithm
							
```text
p = 23, g = 5
```
```markdown
| a = 4                                      | b = 3                                         |
|--------------------------------------------|-----------------------------------------------|
| A = g ^ a mod p = 5 ^ 4 mod 23 = 4         | B = g ^ b mod p = 5 ^ 3 mod 23 = 10           |
| Sent Alice public key (A) to Bob           | Sent Bob public key (B) to Alice              |
| Bob public key (B) is 10                   | Alice public key (A) is 4                     |
| Compute shared key from Bob pubic key (B)  | Compute shared key from Alice public key (A)  |
| Sa = B ^ a mod p = 10 ^ 4 mod 23 = 18      | Sb = A ^ b mod p = 4 ^ 3 mod 23 = 18          |
```
								  		
```text
Sa == Sb
Discrete logarithm problem (A = g ^ ? mod p && B ^ ? mod p)
```

### MITM Attack

```text
p = 23, g = 5
```

```markdown
| a = 4                                            | eA = 6, eB = 9                                | b = 3                                              |	
|--------------------------------------------------|-----------------------------------------------|----------------------------------------------------|
| A = g ^ a mod p = 5 ^ 4 mod 23 = 4               | Eb = g ^ eB mod p = 5 ^ 9 mod 23 = 11         | -                                                  |	
| Sent Alice public key (A) to Bob (Eve)           | Sent Spoofed Bob public key (Ea) to Alice     | -                                                  |
| Bob (Eve) public key (Eb) is 11                  | Alice public key (A) is 4                     | -                                                  |
| Compute shared key from Bob (Eve) pubic key (Eb) | Compute shared key from Alice public key (A)  | -                                                  |
| Sae = Eb ^ a mod p = 11 ^ 3 mod 23 = 13          | Sa = A ^ eB mod p = 4 ^ 9 mod 23 = 13         | -                                                  |
| -                                                | Ea = g ^ eA mod p = 5 ^ 6 mod 23 = 8          | B = g ^ b mod p = 5 ^ 3 mod 23 = 10                |
| -                                                | Sent Spoofed Alice public key (Eb) to Bob     | Sent Bob public key (B) to Alice (Eve)             |
| -                                                | Bob public key (B) is 10                      | Alice (Eve) public key (Ea) is 8                   |
| -                                                | Compute shared key from Bob public key (B)    | Compute shared key from Alice (Eve) pubic key (Ea) |
| -                                                | Sb = B ^ eA mod p = 10 ^ 6 mod 23 = 6         | Sbe = Ea ^ b mod p = 8 ^ 3 mod 23 = 6              |
```

(Now Eve can intercept connection between Alice and Bob)
