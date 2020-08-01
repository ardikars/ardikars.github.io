---
title: Install Haraka SMTP Server On Ubuntu 20.04
date: 2020-07-31 22:23:00 Z
categories:
- server
tags:
- mail
- smtp
- install
layout: post
---

`sudo -i`

# Install NVM (Node Version Manager)

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`

`export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"`

`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`


# Install Node (LTS)

`nvm install --lts`

# Install Haraka

`apt install build-essential`

`npm -g config set user root`

`npm install -g Haraka`

`cd /var/mail && haraka -i .`

`vim /var/mail/config/smtp.ini`

```bash
; Server public IP
public_ip=x.x.x.x

; Daemonize
daemonize=true
daemon_log_file=/var/log/haraka.log
daemon_pid_file=/var/run/haraka.pid

; Spooling
; Save memory by spooling large messages to disk
spool_dir=/var/spool/haraka
```

`haraka -c /var/mail`

## Allows incoming SMTP request on port 25 for server IP address x.x.x.x

`iptables -A INPUT -p tcp -s 0/0 --sport 1024:65535 -d x.x.x.x --dport 25 -m state --state NEW,ESTABLISHED -j ACCEPT`

`iptables -A OUTPUT -p tcp -s x.x.x.x --sport 25 -d 0/0 --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT`

## Allow outgoing SMTP requst for server IP address x.x.x.

`iptables -A OUTPUT -p tcp -s x.x.x.x --sport 1024:65535 -d 0/0 --dport 25 -m state --state NEW,ESTABLISHED -j ACCEPT`

`iptables -A INPUT -p tcp -s 0/0 --sport 25 -d x.x.x.x --dport 1024:65535 -m state --state ESTABLISHED -j ACCEPT`
