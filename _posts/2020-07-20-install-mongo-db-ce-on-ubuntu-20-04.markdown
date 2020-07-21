---
title: Install Mongo DB CE on Ubuntu 20.04
date: 2020-07-20 08:34 Z
categories:
- database
tags:
- nosql
- install
- linux
layout: post
---

# Import the public key used by the package management system

* `sudo apt-get update && sudo apt-get install gnupg`

* `wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`

# Add Mongo DB repository

* `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`

# Install Mongo DB

* `sudo apt-get update && sudo apt-get install -y mongodb-org`

# Start Mondo DB on Boot

* `sudo systemctl enable mongod.service`
