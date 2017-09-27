---
title: Windows Signing
url: phonegap-build/signing/windows
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

- [Windows 10 (Universal) Signing](#windows): `phonegap-version cli-6.1.1` and greater
- [Windows Phone 8.0/8.1 Signing](#winphone8): `phonegap-version cli-6.0.0` and below

<a class="anchor" id="windows"></a>

## Windows 10 (Universal) Signing

Windows builds have a slightly more involved signing process than the previous Windows Phone Publisher ID method, which was a simple GUID setting. A .pfx certificate file is now required to sign your app and distribute it to the App Store. [This article on MSDN](https://docs.microsoft.com/en-us/windows/uwp/packaging/create-certificate-package-signing) explains how to create a PFX store file. Ensure the Subject Name of your signing certificate matches the Windows Publisher ID from your [Microsoft Developer Account](https://developer.microsoft.com/en-us/dashboard/account/management).

Go to your [PhoneGap Build Account Settings](https://build.phonegap.com/people/edit), select the **Signing Keys** tab, upload your **Windows 10** pfx key and unlock it, and select it when building your application.

### In addition:

1. The `author` field in your `config.xml` is required and must match the Publisher Display Name from *Windows Dev Center -> Account Settings*, i.e:

  ```xml
  <author>Adobe Systems Canada Inc</author>
  ```

1. A new config.xml preference `windows-identity-name` has been introduced to set the App Idenity Name in your App Manifest. This preference must match the App Identity Name from your *Windows Dev Center Account -> App Management -> App Identity*:

  ```xml
  <preference name="windows-identity-name" value="PhonegapBuild.PGBDeveloper" />
  ```

<a class="anchor" id="winphone8"></a>

## Windows Phone 8.0/8.1 Signing

1. Log into the [Windows Dev Center](http://dev.windows.com), and click **Dashboard** in the top right.
1. Click **Account Settings**.
1. Copy the **Windows Publisher ID** field.
1. Add the Publisher ID to your Signing Keys in your [PhoneGap Build Account Settings](https://build.phonegap.com/people/edit).
1. Build your app using the newly added Windows Publisher ID, selected in a dropdown in your App details.
1. Upload the resulting xap/appx file to the Windows Dev Center.
