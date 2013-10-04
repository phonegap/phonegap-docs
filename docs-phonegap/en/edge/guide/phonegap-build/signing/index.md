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

<!-- ## iOS Signing -->
