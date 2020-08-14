---
title: Mikrotik Simple Routing
date: 2020-08-13 17:41:00 Z
categories:
- mikrotik
tags:
- networking
- brige
- routing
layout: post
---

# Mikrotik


* Show IP

`/ip dhcp-client print`


* Get IP from dhcp

`/ip dhcp-client add interface=ether1 disable=no`


* Add bridge interface

`/interface bridge add name=bridge1`

`/interface bridge port`

`add bridge=bridge1 interface=ether2`

`add bridge=bridge1 interface=ether3`


* Assign ip to bridge interface

`/ip address add interface=bridge1 address=192.168.100.1/24`

`/ip route add gateway=bridge1`

`/ip dns set servers=8.8.8.8`

`/ip dns set allow-remote-request=yes`


* Configure firewall

`/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade`

`/ip firewall nat print`


* Setup DHCP Server

`/ip dhcp-server setup`

```
Select interface to run DHCP server on 
dhcp server interface: bridge1
```

```
Select network for DHCP addresses 
dhcp address space: 192.168.100.0/24
```

```
Select gateway for given network 
gateway for dhcp network: 192.168.100.1
```

```
Select pool of ip addresses given out by DHCP server 
addresses to give out: 192.168.100.2-192.168.100.254
```

```
Select DNS servers 
dns servers: 8.8.8.8
```

```
Select lease time 
lease time: 10m 
```

`/ip dhcp-server enable`

`/ip dhcp-server print`


# Ubuntu Client 20.04


* Using DHCP client

`dhclient eth0`


* Static IP

`ip 192.168.100.2/24 192.168.100.1`
