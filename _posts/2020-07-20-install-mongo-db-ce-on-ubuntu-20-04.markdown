---
title: Install Mongo DB CE on Ubuntu 20.04
date: 2012-07-20 08:34 Z
categories:
- database
tags:
- nosql
- install
- linux
layout: post
---

1. Import the public key used by the package management system.

* `sudo apt-get update && sudo apt-get install gnupg`

* `wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`

2. Add Mongo DB repository.

* `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`

3. Install Mongo DB

* `sudo apt-get update && sudo apt-get install -y mongodb-org`

4. Start on Boot

* `sudo systemctl enable mongod.service`
