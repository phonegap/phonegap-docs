---
title: iOS Signing
url: phonegap-build/signing/ios
layout: subpage
tabs:
  - label: Overview
    url: phonegap-build/signing/overview 
  - label: iOS
    url: phonegap-build/signing/ios
  - label: Android
    url: phonegap-build/signing/android
  - label: Windows
    url: phonegap-build/signing/windows 
---

A Certificate and Mobile Provisioning file are required to build your iOS apps on PhoneGap Build, and in order to obtain these, a membership in the Apple Developer Program is required. During development, you will use a Development certificate which will allow you to install your iOS apps on a pre-selected set of specific devices (identified by their UUID). Once you're ready to publish, you'll sign the application with a Distribution certificate.

- [Creating your key on Mac](#mac-users)
- [Creating your key on Windows](#windows-users)
- [Register Devices](#register-devices)
- [Create Provisioning Profile](#create-provisioning-profile)
- [Submit to Build](#submit-to-build)

***

## Mac Users

### Generating your p12 certificate

You'll first need to obtain an Apple Developer Certificate. See apple documentation for this.

Next you'll export it to the P12 keystore format. To do this on Mac&reg; OS:

1. Open the Keychain Access application (in the Applications/Utilities folder).
1. If you have not already added the certificate to Keychain, select File > Import. Then navigate to the certificate file (the .cer file) you obtained from Apple.
1. Select the Keys category in Keychain Access.
1. Select the private key associated with your iPhone Development Certificate. The private key is identified by the iPhone Developer: <First Name> <Last Name> public certificate that is paired with it.
1. Command-click the iPhone Developer certificate and select, Export "iPhone Developer: Name...".

  ![Keychain export](/images/phonegap-build/keychain-export.png)

1. Save your keystore in the Personal Information Exchange (.p12) file format.
1. You will be prompted to create a password that is used when you use the keystore to sign applications or transfer the key and certificate in this keystore to another keystore.

  ![keychain password](/images/phonegap-build/keychain-password.png)

***

## Windows Users

### Convert an Apple developer certificate to a P12 file on Windows

To develop apps via Build, you must use a P12 certificate file. You generate this certificate based on the Apple iPhone developer certificate file you receive from Apple.

1. Download and install [OpenSSL](http://slproweb.com/products/Win32OpenSSL.html)

1. Convert the developer certificate file you receive from Apple into a PEM certificate file. To do this, run the following command-line statement from the [OpenSSL](http://slproweb.com/products/Win32OpenSSL.html) bin directory:

  `openssl x509 -in developer_identity.cer -inform DER -out developer_identity.pem -outform PEM`

1. If you are using the private key from the keychain on a Mac computer, convert it into a PEM key:

  `openssl pkcs12 -nocerts -in mykey.p12 -out mykey.pem`

1. You can now generate a valid P12 file, based on the key and the PEM version of the iPhone developer certificate:

  `openssl pkcs12 -export -inkey mykey.key -in developer_identity.pem -out iphone_dev.p12`

## Register devices

1. Visit [Apple Developer Portal](https://developer.apple.com).
1. Go to Device section. Under Manage tab, provide Device Name and Device UDID (40 hex characters).

## Create Provisioning Profile

1. Visit [Apple Developer Portal](https://developer.apple.com).
1. Go to Provisioning section. Create new profile under Development tab.
1. Fill the form with Profile Name, Certificates (as per .cer above), App ID and your development device.

## Submit to Build

Go to your Account > Edit Setting > Signing Keys' tab:

![Edit Account](/images/phonegap-build/edit_account_settings.png)

Click 'add a key...' and supply your previously generated p12:

![Add Key](/images/phonegap-build/ios_add_key.png)

<a class="anchor" id="unlock"></a>

## Unlocking the key.

Go to your Account > Edit Setting > Signing Keys' tab:

![Edit Account](/images/phonegap-build/edit_account_settings.png)

Click 'lock' button and supply the certificate password you used to export your cert.

![Unlock key](/images/phonegap-build/ios_unlock.png)
