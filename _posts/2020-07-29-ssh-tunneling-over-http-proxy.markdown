---
title: SSH tunneling over HTTP Proxy
date: 2020-07-25 21:12:00 Z
categories:
- tunneling
tags:
- http
- ssh
- injector
layout: post
---

`sudo apt update && sudo apt install gcc`

`sudo vim http-injector-unix-client.c`

```c
/*
MIT License

Copyright (c) [2020] [Ardika Rommy Sanjaya]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <pthread.h>
#include <stddef.h>

#if (__STDC_VERSION__ >= 199901L)
#include <stdint.h>
#endif

// https://creativeandcritical.net/str-replace-c
char *repl_str(const char *str, const char *from, const char *to) {

	/* Adjust each of the below values to suit your needs. */

	/* Increment positions cache size initially by this number. */
	size_t cache_sz_inc = 16;
	/* Thereafter, each time capacity needs to be increased,
	 * multiply the increment by this factor. */
	const size_t cache_sz_inc_factor = 3;
	/* But never increment capacity by more than this number. */
	const size_t cache_sz_inc_max = 1048576;

	char *pret, *ret = NULL;
	const char *pstr2, *pstr = str;
	size_t i, count = 0;
	#if (__STDC_VERSION__ >= 199901L)
	uintptr_t *pos_cache_tmp, *pos_cache = NULL;
	#else
	ptrdiff_t *pos_cache_tmp, *pos_cache = NULL;
	#endif
	size_t cache_sz = 0;
	size_t cpylen, orglen, retlen, tolen, fromlen = strlen(from);

	/* Find all matches and cache their positions. */
	while ((pstr2 = strstr(pstr, from)) != NULL) {
		count++;

		/* Increase the cache size when necessary. */
		if (cache_sz < count) {
			cache_sz += cache_sz_inc;
			pos_cache_tmp = realloc(pos_cache, sizeof(*pos_cache) * cache_sz);
			if (pos_cache_tmp == NULL) {
				goto end_repl_str;
			} else pos_cache = pos_cache_tmp;
			cache_sz_inc *= cache_sz_inc_factor;
			if (cache_sz_inc > cache_sz_inc_max) {
				cache_sz_inc = cache_sz_inc_max;
			}
		}

		pos_cache[count-1] = pstr2 - str;
		pstr = pstr2 + fromlen;
	}

	orglen = pstr - str + strlen(pstr);

	/* Allocate memory for the post-replacement string. */
	if (count > 0) {
		tolen = strlen(to);
		retlen = orglen + (tolen - fromlen) * count;
	} else	retlen = orglen;
		ret = malloc(retlen + 1);
	if (ret == NULL) {
		goto end_repl_str;
	}

	if (count == 0) {
		/* If no matches, then just duplicate the string. */
		strcpy(ret, str);
	} else {
		/* Otherwise, duplicate the string whilst performing
		 * the replacements using the position cache. */
		pret = ret;
		memcpy(pret, str, pos_cache[0]);
		pret += pos_cache[0];
		for (i = 0; i < count; i++) {
			memcpy(pret, to, tolen);
			pret += tolen;
			pstr = str + pos_cache[i] + fromlen;
			cpylen = (i == count-1 ? orglen : pos_cache[i+1]) - pos_cache[i] - fromlen;
			memcpy(pret, pstr, cpylen);
			pret += cpylen;
		}
		ret[retlen] = '\0';
	}

end_repl_str:
	/* Free the cache and return the post-replacement string,
	 * which will be NULL in the event of an error. */
	free(pos_cache);
	return ret;
}

void *reader(void *args) {
	int fd = *(int *) args;
	char ch;
	while (1) {
    		fread(&ch, 1, 1, stdin);
		send(fd, (void *) &ch, 1, 0);
	}
}

void *writer(void *args) {
	int fd = *(int *) args;
	char ch;
	while (1) {
		recv(fd, (void *) &ch, 1, 0);
		fwrite(&ch, 1, 1, stdout);
		fflush(stdout);
	}
}


int main(int argc, char* argv[]) {

	int fd;
	struct sockaddr_in remote; 

	char *proxy_host = NULL;
	int proxy_port = -1;

	char *payload = NULL;

	int buf_size = 1024;
	int opt;
  	while ((opt = getopt (argc, argv, "x:h:s:P:")) != -1) {
		switch (opt) {
			case 'x':
				proxy_host = strtok(optarg, ":");
				if (proxy_host != NULL) {
					proxy_port = atoi(strtok(NULL, ":"));
				}
				break;
			case 'h':
				printf ("prog -x proxy_host:proxy_port -s 1024 -P 'CONNECT 10.14.204.10:22\\r\\n\\r\\n'\n");
				break;
			case 's':
				buf_size = atoi(optarg);
				break;
			case 'P':
				payload = optarg;
				payload = repl_str(payload, "[cr]", "\r");
				payload = repl_str(payload, "[lf]", "\n");
				payload = repl_str(payload, "[crlf]", "\r\n");
				payload = repl_str(payload, "[crlf*2]", "\r\n\r\n");
				payload = repl_str(payload, "[lfcr]", "\n\r");
				break;
		}
	}
	
	if (proxy_host == NULL || proxy_port < 0 || payload == NULL) {
		printf ("prog -x proxy_host:proxy_port -s 1024 -P 'CONNECT 10.14.204.10:22\\r\\n\\r\\n'\n");
		exit(-1);
	}

	printf("Proxing : %s:%d %d %s\n", proxy_host, proxy_port, buf_size, payload);
	
	char buffer[buf_size];
	int sent, read = 0;
	pthread_t worker;


	if ((fd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
		printf("\nFailed to open socket file descriptor.\n");
		return -1;
	}

	remote.sin_family = AF_INET;
	remote.sin_port = htons(proxy_port);

	if (inet_pton(AF_INET, proxy_host, &remote.sin_addr) <= 0) {
        	printf("\nInvalid address/Address not supported.\n");
		close(fd);
        	return -1;
    	}

	if (connect(fd, (struct sockaddr *) &remote, sizeof(remote)) < 0) {
        	printf("\nConnection Failed.\n");
		close(fd);
        	return -1;
	}

	if ((sent = send(fd, payload, strlen(payload), 0)) < 0) {
		printf("\nFailed to send HTTP payload.\n");
		close(fd);
		return -1;
	}

	memset(buffer, '\0', buf_size);
	while (read == 0) {
		read = recv(fd, buffer, buf_size, 0);
		for (int i = 0; i < read; i++) {
			if (buffer[read - 4] == '\r' && buffer[read - 3] == '\n' && buffer[read - 2] == '\r' && buffer[read - 1] == '\n') {
				read == 0;
				break;
			}
		}
	}

	pthread_create(&worker, NULL, reader, (void*) &fd); 
	writer((void*) &fd);

	close(fd);
	return 0;
}
```

`gcc http-injector-unix-client.c -o http-injector-client -lpthread`

`ssh marshall-vpnjantit.com@103.129.220.168 -o "ProxyCommand=./http-injector-client -x 192.168.43.173:44355 -P 'CONNECT 103.129.220.168:22 HTTP/1.1[crlf*2]'"`

*) Parameters

- `-x`: HTTP Proxy

- `-P`: HTTP request payload (Request connection to ssh server)

- `-s`: Buffer size (Optional), default value is 1024.
