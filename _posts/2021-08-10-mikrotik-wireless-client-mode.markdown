---
title: Mikrotik Wireless Client Mode
date: 2021-08-10 10:41:00 Z
categories:
- networking
tags:
- wireless
- mikrotik
- routing
layout: post
---

#### Reset

```bash
/system reset-configuration
```


#### Login

```bash
ssh admin@192.168.88.1
```


#### Scan

```bash
/interface wireless scan wlan1
```

#### Configure

```bash
/interface wireless security-profiles
add authentication-types=wpa-psk,wpa2-psk \
    management-protection=allowed \
    mode=dynamic-keys \
    unicast-ciphers=tkip,aes-ccm \
    group-ciphers=tkip,aes-ccm \
    name=Bless2Profile \
    supplicant-identity=Bless2 \
    wpa-pre-shared-key=mysecretpassword \
    wpa2-pre-shared-key=mysecretpassword

/interface wireless
set [ find default-name=wlan1 ] \
    disabled=no \
    mode=station \
    security-profile=Bless2Profile \
    ssid=Bless2

/ip dhcp-client
add comment=defconf \
    add-default-route=yes \
    disabled=no \
    interface=wlan1
```

#### Remove wlan1 from bridge interface

```bash
/interface bridge port print
/interface bridge port remove numbers=1
```


#### Add ether1-4 to bridge interface

```bash
/interface bridge port add bridge=bridge interface=ether2
/interface bridge port add bridge=bridge interface=ether3
/interface bridge port add bridge=bridge interface=ether4
```


#### NAT

```bash
/ip firewall nat add chain=srcnat action=masquerade out-interface=wlan1
```
