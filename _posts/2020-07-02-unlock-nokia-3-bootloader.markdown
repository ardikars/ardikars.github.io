---
title: Unlock Nokia 3 Bootloader
date: 2020-07-02 17:45:00 Z
categories:
- android
tags:
- bootloader
- unlocking
- rooting
layout: post
---

1. Enable developer options

2. Enable OEM Unlocking (OEM Unlock) 

3. Enable USB debugging mode

4. Change default USB configuration, choose File Transfer (MTP)

5. Install adb and fastboot (sudo apt-get install android-tools-adb android-tools-fastboot)

6. Install nokia usb drive

7. Connect your phone to your PC and approve all usb connection

8. Type "adb devices", then it will show the serial number

9. Type "adb reboot bootloader", then your devices will boot into fastboot mode

10. Type "fastboot devices", to make sure that your device still connected to your PC and it will show your phone serial number

11. Type "fastboot oem key $(echo -n "YOUR_PHONE_SERIAL_NUMBER" | md5sum | tr [a-z] [A-Z])"

12. Type "fastboot flashing unlock", your phone will ask you about unlocking bootloader

13. Press vol up (yes)
