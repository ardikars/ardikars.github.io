---
title: A Strict Firewall that Only Allows SSH
date: 2020-07-31 23:43:00 Z
categories:
- firewall
tags:
- ssh
- network
- security
layout: post
---

`export SERVER_IP="x.x.x.x"`

# Flushing all rules

`iptables -F`

`iptables -X`


# Setting default filter policy

`iptables -P INPUT DROP`

`iptables -P OUTPUT DROP`

`iptables -P FORWARD DROP`


# Allow incoming ssh only

`iptables -A INPUT -p tcp -s 0/0 -d $SERVER_IP --sport 513:65535 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT`

`iptables -A OUTPUT -p tcp -s $SERVER_IP -d 0/0 --sport 22 --dport 513:65535 -m state --state ESTABLISHED -j ACCEPT`


# Make sure nothing comes or goes out

`iptables -A INPUT -j DROP`

`iptables -A OUTPUT -j DROP`
