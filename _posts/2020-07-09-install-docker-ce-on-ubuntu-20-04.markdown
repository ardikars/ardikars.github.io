---
title: Install Docker CE on Ubuntu 20.04
date: 2020-07-09 23:45:00 Z
categories:
- linux
tags:
- install
- docker
- container
layout: post
---

### Install Docker CE

* `apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common`

* `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -`

* `echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -sc) stable" > /etc/apt/sources.list.d/docker-ce.list`

* `apt update`

* `apt install docker-ce`


### Enable Docker and Containerd to run on system boot

* `systemctl enable --now docker containerd`


### Running Docker as a non-root user

* `exit` (Back to normal user)

* `sudo usermod -aG docker ${USER}`

Done
