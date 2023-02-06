---
title: Integer overflow attack
date: 2023-01-06 10:41:00 Z
categories:
- hacking
- programing
- number
tags:
- binary
- number
- hacking
layout: post
---

```c
#include <stdio.h>

// https://stackoverflow.com/questions/111928/is-there-a-printf-converter-to-print-in-binary-format
// Assumes little endian
void print_bits(size_t const size, void const * const ptr) {
    unsigned char *b = (unsigned char*) ptr;
    unsigned char byte;
    int i, j;
    for (i = size-1; i >= 0; i--) {
        for (j = 7; j >= 0; j--) {
            byte = (b[i] >> j) & 1;
            printf("%u", byte);
        }
    }
    printf("\n");
}


int main() {
	unsigned char a = 255;
	unsigned short b = 511;
	print_bits(sizeof(a), &a);
	print_bits(sizeof(a), &b);
	unsigned char c = (unsigned char) b;
	print_bits(sizeof(c), &c);
	if (a == c) {
		printf("Integer overflow attack!\n");
	} else {
		printf("All is fine\n");
	}
	return 0;
}
```

*Update java example
```java
long x = 50000L; // 64 bits
long y = new BigInteger("2").pow(64).add(BigInteger.valueOf(x)).longValue();
System.out.printf("x(%d) = y(%d) = %b", x, y, x == y);
```
