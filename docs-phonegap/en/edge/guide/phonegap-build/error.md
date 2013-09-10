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

# Remote Build Errors

At Adobe&reg; PhoneGap&trade; Build, we do our best to take any
package you submit and build a cross-platform mobile application from
it. However, sometimes that won't work: platforms have their own
quirks, and sometimes our site has some quirks too. Here are some
errors you may receive, and how you can fix them.

* __App is pending on all platforms for over ten minutes:__ This
  usually means something has gone wrong on our end. Please [contact
  us](http://community.phonegap.com) to let us know.

* __App has no index.html:__ PhoneGap Build, and PhoneGap/Cordova apps
  in general, require a file named `index.html` in your app. This is
  used as the starting point where your app will initialize.  Please
  ensure that you have an `index.html` in the root of your app, and
  your build should go through correctly.

* __PhoneGap version not supported:__ You have specified a
  `phonegap-version` in your `config.xml` file that is not currently
  supported by PhoneGap Build. Please see out [config.xml
  docs](/docs/config-xml) to see which releases are currently
  supported.

* __Invalid File/Directory name:__ Mobile filesystems are very picky
  about certain filenames - in particular, they don't allow files with
  non-ASCII characters, such as Chinese or Arabic letters. Please
  rename any files with non-ASCII characters, and your app should
  build successfully.

* __Malformed config.xml:__ We were unable to successfully parse the
  `config.xml` file that you provided - it most likely is not
  well-formed XML.  Please check whether your `config.xml` is valid
  XML - you can use the [W3C validator](http://validator.w3.org) to do
  this - and make any necessary changes to fix it.

## Plugin Errors

* __Plugin File Exists:__ We were unable to install a plugin as a file
  injected for the plugin already exists in your www folder.  This is
  commonly the Javascript files used by the plugin. The script links
  to these files should be present in your index.html but the files
  themselves should not be included in your app before uploading to
  build.

* __Plugin not supported:__ The plugin (or plugin version, if
  specified) referenced in your config.xml is not supported on
  PhoneGap build.  Please visit the [plugins page](/plugins) to view
  all supported plugins.

* __One of your plugins requires a parameter:__ One of the plugins
  included in your app requires a parameter that is not included in
  your config.xml.  Please read the documentation of the plugin to get
  a list of all required parameters. Please visit the [plugins
  page](/plugins) to view all supported plugins.

* __Plugin error:__ The most likely cause for this error is error is
  that you have included plugin javascript files in your app package,
  such as barcodescanner.js, GAPlugin.js, cdv-plugin-fb-connect.js, or
  any other plugin files such as the childbrowser assets directory.
  Previously we used pluginstall to install plugins, which would
  simply overwrite files in your app. However we recently migrated to
  plugman, which will not overwrite these files and instead fails. So
  make sure you remove them!  If you're receiving a different error
  then please [let us know](http://community.phonegap.com), and we can
  update this document.

## iOS Errors

* __Icon or splash screen is not a png file:__ When building for iOS,
  the PhoneGap framework assumes that the image files provided for
  display in the system - as icons or splash screens - are in the
  Portable Network Graphics, `png`, format. If you've gotten this
  error, you've provided image files in a different format, or
  corrupted png files. Please check those files to ensure that they
  are valid pngs, and rebuild.

* __Certificate not found:__ Your app was submitted without an
  associated signing certificate and keychain pair. Please ensure that
  you've [added the key to your PhoneGap Build account](/people/edit),
  and that you've associated that key with your app on the app edit
  page.

* __Unable to import certificate:__ Our servers were unable to use the
  certificate you provided with the password that you
  provided. Because we could not import the certificate into our
  keychain, we were unable to sign an app with the certificate.
  Please try uploading your certificate again, ensuring that you
  supply the correct credentials with it.

* __Certificate doesn't match profile:__ Our servers were unable to
  sign your app using the profile and certificate that you uploaded,
  because the identity listed on the profile did not match the one on
  the certificate. This could be because you uploaded a developer
  profile with a distribution certificate, or vice versa.  Try
  generating a new provisioning profile that matches your certificate,
  and uploading that to PhoneGap Build.

* __Provisioning Profile expired:__ Our servers were unable to sign
  your app using the profile and certificate that you uploaded,
  because the provisioning profile itself has expired.  You will need
  to generate a new provisioning profile from the Apple Developer
  Portal and upload that to PhoneGap Build before your app can build
  successfully.

* __Unable to read provisioning profile:__ Our servers were unable to
  sign your app using the profile and certificate that you uploaded,
  because we could not read/parse your provisioning profile.  Please
  check that the `mobileprovision` file you have uploaded is a valid
  provisioning profile from the Apple Developer Portal. If you've made
  an error, please ensure you have a valid profile available and
  upload that to PhoneGap Build before rebuilding your app.

## Android Errors

* __Keystore Issues:__ All of the following error messages represent
  issues with your Android signing keys:

  - `Keystore alias not recognized`
  - `Invalid keystore format`
  - `Incorrect keystore password`
  - `Alias not associated with private key`

  If you received one of these errors, then the Android `jarsigner`
  was not able to sign your app with the key and keystore you
  provided.

  If the alias is not recognized, the `alias` field you provided was
  not found on the `keystore` file that you uploaded. If the keystore
  format was invalid, you may not have uploaded the correct files. If
  the password was incorrect, you may have entered it incorrectly.

  In each of these cases, check that you have the correct keystore
  files, and the correct password and alias details for your
  keystore. You may need to reupload your Android keys for your signed
  build to succeed.

* __Identical filenames:__ The Android filesystem, unlike many desktop
  operating systems, is case-insensitive -- you cannot have a file
  called `index.html` and a file called `index.HTML` in the same
  Android app package.  Delete one of the files, and your app should
  build successfully.

## BlackBerry Errors

* __Signing Timeout:__ To run on a device, all BlackBerry builds have
  to be signed by RIM's signing servers. PhoneGap Build attempts to do
  this with every BlackBerry build, but there are intermittent issues
  - if the server is unresponsive, the build will time out. Hit
  _rebuild_ to try running your BlackBerry build again.

* __Invalid Characters in Filenames and/or Directories:__ The
  BlackBerry Widget Packager, a RIM tool that takes your application
  assets and packages them into a BlackBerry-compatible binary, has
  very stringent rules on what characters your filenames and
  directories can be composed of. Make sure all of your filenames and
  directories contain only alphanumeric characters. Until RIM can fix
  this issue, unfortunately there is nothing we can do about this.

* __Invalid Directory Names:__ Another twist in the BlackBerry Widget
  Packager saga, there are two names that are reserved for directory
  names: `bin` and `src`. If your application package contains
  directories with either of these names, the Widget Packager will
  fail. Make sure you rename those directories!

* __Icon(s) Too Large:__ According to the [BlackBerry Widget Packager
  source
  code](https://github.com/blackberry/WebWorks/blob/master/packager/src/net/rim/tumbler/rapc/Rapc.java#L177-178),
  the default maximum size of icon images for BlackBerry WebWorks
  applications is 16,384 bytes. Anything larger than this will trigger
  an error from the packager, and thus, an error in your build.

* __Invalid CSK password: signing not verified:__ The BlackBerry
  WebWorks Signing Tool could not verify the signing using the key you
  uploaded, with the password you provided. This is usually due to a
  mistake in the provided password - please check that you provided
  the correct password, and upload your key again if necessary.  Also
  note that the BlackBerry WebWorks Signing Tool requires passwords to
  be at least 8 characters long - a shorter password will also raise
  this error.

* __Too many files in www directory:__ A limitation of the BlackBerry
  WebWorks Packager is that a limited amount of files can be present
  in your application package, or the compiler will fail to build your
  app. Empirically, we have found this limit to be around 200-250
  files.  If you receive this error, you will need to remove some
  files from your `www` directory in order for your app to build.

* __Invalid Characters in Metadata:__ Another BlackBerry WebWorks
  Packager limitation is that only Latin characters are allowed in
  application metadata (name, description, etc). If you have non-
  Latin characters in your app metadata, the BBWP compiler will not be
  able to build your app.  If you receive this error, you will need to
  edit your app metadata (through PhoneGap Build or by editing your
  `config.xml` file) to remove any offending characters.

* __Data Section(s) Too Large:__ BlackBerry builds can also fail if a
  "data section" - any part of your `www` data - is too large to be
  processed by the Packager. This is usually due to having high
  resolution images, or other large assets (over 200KB, usually), in
  your app package.  For your app to build for BlackBerry, please try
  removing any such assets from your package.

* __Description too long:__ The BlackBerry WebWorks Packager processes
  your app configuration (your `config.xml` file), including your app
  description, as part of your app package.  If the description is too
  long, the `config.xml` that gets generated for the BBWP makes the
  packager throw an exception.  If you'd like your app to build
  successfully for BlackBerry, please trunctate the description.

## webOS Errors

The webOS packager&#151;an executable called `palm-package`&#151;is
particularly sensitive about the version number and package name of
your application. Your version number should be of the form
`1.1.1`&#151;it must have a major, minor, and patch version. A version
like `1.0` will fail with `palm-package`.

Similarly, the package name must be of the form
`com.yourcompany.app1`&#151; reverse domain style, all lowercase, and
all alphanumerics. If your build has failed on webOS, it is likely
that one of these is the root issue.

