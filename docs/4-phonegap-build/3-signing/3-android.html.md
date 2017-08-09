---
title: Android Signing
url: phonegap-build/signing/android
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

- [Generating a private key](#generating-a-private-key)
- [Submitting your key to build](#submitting-your-key-to-build)
- [Unlocking your key](#unlocking-your-key)

<div class="alert-info">**Note**: it is Phonegap Build's policy not to retrieve signing keys for users, for legal reasons. Back them up.</div>

***

## Generating a private key

1. [Download and install Java](http://www.java.com/en/download/index.jsp).

1. [Set Java_Home directory](http://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/index.html).

1. Open the command prompt (cmd.exe) as an Administrator, then Run the following command: `$ keytool -genkey -v -keystore [keystore_name].keystore -alias [alias_name] -keyalg RSA -keysize 2048 -validity 10000`

1. Keytool will ask for keystore password. Enter password and confirm:

  ![Keystore Password](/images/phonegap-build/android_keystore_pass.png)

1. Next, keytool will ask for additional information. Supply appropriately:

  ![Keystore Password 2](/images/phonegap-build/additional_info.png)

1. Next, keytool will ask password for Alias. Return if it's the same as keystore password. Othewise enter password and confirm:

  ![Alias password](/images/phonegap-build/alias_password.png)

1. Your signing key is now ready to submit:

  ![Submit signing key](/images/phonegap-build/keystore_ready.png)

## Submitting your key to Build

Go to your Account > Edit Setting > Signing Key's tab.

![Edit signing keys](/images/phonegap-build/edit_account_settings.png)

Click 'add a key...', ensuring you use the same alias used when you generated your key.

![Add info](/images/phonegap-build/add_key.png)

## Unlocking your key

Go to your Account > Edit Setting > Signing Key's tab:

![Signing Keys](/images/phonegap-build/edit_account_settings.png)

Click unlock button and supply the the certificate password (from step #6 above) and the keystore password (from step #4 above)

![Unlocking](/images/phonegap-build/unlock_key.png)

Lastly, either set your key to be default using the checkbox in the keys list, or in your individual application's details, select the key you've uploaded and unlocked.

***

[More info](http://developer.android.com/tools/publishing/app-signing.html#cert)
