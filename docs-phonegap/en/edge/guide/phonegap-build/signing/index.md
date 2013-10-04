---
license: Licensed to the Apache Software Foundation (ASF) under one
         or more contributor license agreements.  See the NOTICE file
         distributed with this work for additional information
         regarding copyright ownership.  The ASF licenses this file
         to you under the Apache License, Version 2.0 (the
         "License"); you may not use this file except in compliance
         with the License.  You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing,
         software distributed under the License is distributed on an
         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
         KIND, either express or implied.  See the License for the
         specific language governing permissions and limitations
         under the License.

---

# Signing Apps in PhoneGap Build

This section shows the tools PhoneGap Build offers to help you sign
Android and iOS builds so that they are ready to submit to the Android
Market and the iTunes store. (For an overview, see Introducing
PhoneGap Build.)

<!-- XREF See Signing and Distributing Apps for more information on
how to use signing keys with the CLI and platform SDK tools.  -->

## Android Signing

To prepare an Android release build, you first need to generate a
signing keystore file, a process for which details are available in
the [Android
documentation](http://developer.android.com/guide/publishing/app-signing.html).
Make sure you note the alias, as well as the keystore password and key
password that you set for your keystore.

Then go to your PhoneGap Build account, and __Edit Account__ from the
top menu, then choose the __Signing Keys__ panel:

![](img/guide/phonegap-build/signing/signing-keys-panel.png)

Press the __Add a Key__ button and fill in all the details.

Make sure the __alias__, __key password__ and __keystore password__
fields match those entered when you created your key. The __title__
field can be anything you want, to help you identify your key.

![](img/guide/phonegap-build/signing/android-key-modal.png)

When you press __Save__, the list of keys at the bottom should update
to include your new key. Make sure you set your new key as the
default.

When generating a release build, PhoneGap Build signs the binary with
your keystore, and aligns it using the `zipalign` tool.  All
subsequent Android builds use your default selected key, and are ready
for release.

## iOS Signing

The process to configure iOS release builda is slightly different than
for other platforms.  All iOS builds need to be signed by a developer
certificate and a provisioning profile, which is tied to your Apple
developer account and the device on which you do your testing.

__NOTE:__ Since PhoneGap Build uses Apple's standard development
process to build applications, you will need to sign up for their
developer program to build iOS applications on PhoneGap Build. You
will also need a Mac to configure your certificate and provisioning
profile.

If you don't have a default certificate/profile pair attached to your
account, PhoneGap Build alerts you that iOS builds cannot be
completed:

![](img/guide/phonegap-build/signing/ios-key-required.png)

Your key consists of two files: a _certificate_ and a _provisioning
profile_.  Apple provides [extensive
documentation](http://developer.apple.com/) to help you set up your
environment locally. The best approach is to ensure you can build an
iOS application to your iOS device locally, to be sure that both your
certificate and your provisioning profile are set up correctly for
code signing.

Once your keys are set up, you can upload them to PhoneGap Build. For
the provisioning profile, you need a file with a `mobileprovision`
extension that looks like this:

![](img/guide/phonegap-build/signing/team-provisioning-profile.png)

Make sure this provisioning profile is correctly paired with the set
of devices you wish to test on.

When you create your profile, you need to specify associated
application IDs. These must correspond to each app's package name, or
apps won't build correctly.  Packages are declared in the `config.xml`
file as the `widget` element's `id` attribute. (See The config.xml
File for details.) For example:

        <widget id="com.example.hello" version="0.0.1">

Note that Apple appends a _Bundle Seed ID_, or _App ID Prefix_, to the
provisioning profile when you generate it through the iOS Developer
Center.  To ensure compatibility with other platforms, do not include
this prefix in the `config.xml`; only include the reverse domain-style
identifier, such as `com.domainname.appname`.

To prepare your certificate, you need to open the __Keychain Access__
utility to identify the certificate that you use for iOS
development. Control-click on the certificate and select __Export...__

![](img/guide/phonegap-build/signing/keychain-export.png)

Save the certificate in a location you can remember, and enter a
password. This is the same password you need to supply to PhoneGap
Build.

![](img/guide/phonegap-build/signing/keychain-password.png)

Return to the PhoneGap Build site and navigate to the app's main page
that lists its details. Select the __Add a Key...__ option from the
iOS platform's signing key popup. Fill out the form, specifying your
p12 certificate file and your mobileprovision file, then enter the
password associated with your certificate.

![](img/guide/phonegap-build/signing/ios-key-form.png)

Once you add your key, PhoneGap Build attempts to rebuild the
application for iOS and generate a link to the resulting _.ipa_
file. You can use iTunes to install the _.ipa_ file directly on your
provisioned iOS device, or you can scan the QR code to install it over
the air.

