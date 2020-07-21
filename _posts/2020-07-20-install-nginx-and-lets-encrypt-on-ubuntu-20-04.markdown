---
title: Install Nginx and Let's Encrypt on Ubuntu 20.04
date: 2020-07-20 09:41:00 Z
categories:
- server
tags:
- https
- linux
- proxy
layout: post
---

# Prerequisites

* You have domain name pointing to your server public IP.

# Installation process

* `sudo apt update`

* `sudo apt install nginx`

* `sudo systemctl enable nginx`

* `sudo apt install certbot`

* `sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048`

* `sudo mkdir -p /var/lib/letsencrypt/.well-known`

* `sudo chgrp www-data /var/lib/letsencrypt`

* `sudo chmod g+s /var/lib/letsencrypt`

* `sudo vim /etc/nginx/snippets/letsencrypt.conf`

```bash
location ^~ /.well-known/acme-challenge/ {
  allow all;
  root /var/lib/letsencrypt/;
  default_type "text/plain";
  try_files $uri =404;
}
```

* `sudo vim /etc/nginx/snippets/ssl.conf`

```bash
ssl_dhparam /etc/ssl/certs/dhparam.pem;

ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;

ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
ssl_prefer_server_ciphers on;

ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 30s;

add_header Strict-Transport-Security "max-age=15768000; includeSubdomains; preload";
add_header X-Frame-Options SAMEORIGIN;
add_header X-Content-Type-Options nosniff;
```

* `sudo vim /etc/nginx/sites-available/dev.cmsnesia.com.conf`

```bash
server {
  listen 80;
  listen [::]:80;
  server_name dev.cmsnesia.com;
  
  root /var/www/html
  
  include snippets/letsencrypt.conf;
}
```

* `sudo ln -s /etc/nginx/sites-available/dev.cmsnesia.com.conf /etc/nginx/sites-enabled/`

* `sudo systemctl restart nginx`

* `sudo certbot certonly --agree-tos --email cmsnesia@gmail.com --webroot -w /var/lib/letsencrypt/ -d dev.cmsnesia.com`

* `sudo vim /etc/nginx/sites-available/dev.cmsnesia.com.conf`

```bash
server {
    listen 80;
    listen [::]:80;
    server_name dev.cmsnesia.com;
  
    root /var/www/html
    include snippets/letsencrypt.conf;
    return 301 https://dev.cmsnesia.com$request_uri; # redirect http to https
}

server {
    listen 443 ssl http2;
    server_name dev.cmsnesia.com;

    ssl_certificate /etc/letsencrypt/live/dev.cmsnesia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dev.cmsnesia.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/dev.cmsnesia.com/chain.pem;
    include snippets/ssl.conf;
    include snippets/letsencrypt.conf;
}

```

* `sudo vim /etc/cron.d/certbot`
```bash
0 */12 * * * root test -x /usr/bin/certbot -a \! -d /run/systemd/system && perl -e 'sleep int(rand(3600))' && certbot -q renew --renew-hook "systemctl reload nginx"
```

* `sudo certbot renew --dry-run`
