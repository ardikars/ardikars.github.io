---
title: ARP - MITM Detection Method
date: 2019-08-31 17:45:00 Z
categories:
- docs
tags:
- documentation
layout: post
---

Sedikit tengan ARP

ARP merupakan protokol yang digunakan untuk memetakan alamat fisik (MAC) dan logika (IP). Proses pemetaan ini sering dimanfaatkan oleh penyerang dengan cara memalsukan isi dari peta (ARP table) tersebut sehingga ia dapat menguasai komunikasi yang bergantung pada isi dari peta tersebut (routing).

Berikut metode yang saya gunakan untuk mendeteksi proses pemalsuan tersebut.

Disini saya menggunakan TCP-Syn untuk memancing penyerang. Kenapa? Karena jika menggunakan protokol seperti ICMP maka penyerang bisa saja membuat firewall untuk mem-blok semua paket ICMP yang datang.

Dengan menggunakan TCP-Syn dengan port yang kita buat acak, pengerang tentu tidak dapat menebak port tersebut dan memblok nya.

<!--more-->

Di bawah ini adalah coret2 saya dahulu kala.

<figure class="aligncenter">
    <img src="/uploads/2019-08-31-arp-mitm-detaction-method-1.png" />
</figure>

<figure class="aligncenter">
    <img src="/uploads/2019-08-31-arp-mitm-detaction-method-2.png" />
</figure>

<figure class="aligncenter">
    <img src="/uploads/2019-08-31-arp-mitm-detaction-method-3.png" />
</figure>

<figure class="aligncenter">
    <img src="/uploads/2019-08-31-arp-mitm-detaction-method-4.png" />
</figure>
