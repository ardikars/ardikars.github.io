---
title: Nginx HTTP Load Balancer
date: 2020-07-20 12:41:00 Z
categories:
- scaling
tags:
- load-balancer
- nginx
- proxy
layout: post
---


`$ sudo vim /etc/nginx/nginx.conf`

```bash
http {

  # round robin
  upstream rumahpemuridan {
      server 127.0.0.1:8081 weight=3;
      server 127.0.0.1:8082 max_conns=2;
      queue 100 timeout=70;
  }

  server {
    listen 80;
    server_name rumahpemuridan.com;
    location / {
      proxy_pass http://rumahpemuridan;
    }
  }
}
```
