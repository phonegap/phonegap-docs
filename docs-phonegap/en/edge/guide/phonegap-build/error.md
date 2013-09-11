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

This section details some of the errors you might encounter when using
PhoneGap Build to compile apps remotely, especially when generating
apps for unfamiliar mobile platforms.

## General Errors

* __Malformed config.xml:__ Apps require a valid `config.xml` file to
  compile, and compilation fails if the XML file is not well-formed.
  Use the [W3C validator](http://validator.w3.org) to check for
  parsing errors.

* __App has no index.html:__ Apps require an `index.html` file as an
  initial home page. Compilation fails if it is not present within the
  app's root directory.

* __PhoneGap version not supported:__ Compilation fails if you specify
  in your `config.xml` file a higher `phonegap-version` number than
  the PhoneGap&nbsp;Build service currently supports.
  <!-- XREF: config.xml -->

* __Invalid File/Directory name:__ Mobile filesystems often reject
  filenames that include non-ASCII characters, such as Arabic letters
  or Chinese characters.

* __App remains pending on all platforms for over ten minutes:__ This
  probably means there is a problem with the PhoneGap&nbsp;Build server.
  Please contact the team at
  [community.phonegap.com](http://community.phonegap.com).

## Plugin Errors

Plugins are bits of code that extend an app's capabilities past the
PhoneGap API's standard features.  PhoneGap&nbsp;Build allows you to
compile apps using an approved set of plugins, listed on the site's
[Plugins](http://build.phonegap.com/plugins) tab.  Unlike the local
CLI workflow described in The Command-line Interface, PhoneGap&nbsp;Build
requires plugins to be specified in the app's `config.xml` file.  See
Plugin Development Guide for an overview. This section details
problems that may arise due to PhoneGap&nbsp;Build's unique way of handling
plugins.

* __Plugin File Exists:__ For PhoneGap&nbsp;Build to compile plugins, you
  need to link to the plugin's JavaScript file using a `<script>` tag
  within the `index.html` file, but _without_ supplying the file in
  the app package. PhoneGap&nbsp;Build injects plugin code dynamically, and
  compilation may fail if the linked plugin script is included in the
  app package.  (This problem, caused by a migration from
  `pluginstall` to `plugman` installation software) may also result in
  a more general __Plugin error__.)

* __Plugin not supported:__ Compilation fails if PhoneGap&nbsp;Build does
  not support a plugin, or plugin version, specified in the
  `config.xml` file.  See the site's
  [Plugins](http://build.phonegap.com/plugins) tab for a list of
  approved plugins.

* __One of your plugins requires a parameter:__ One of the app's
  plugins requires a parameter that is not included in the
  `config.xml` file.  Please read the plugin's documentation for a
  list of all required parameters.

## iOS Errors

* __Icon or splash screen is not a png file:__ When building for iOS,
  the PhoneGap framework assumes that icon or splash-screen image
  files use the Portable Network Graphics, or `png`, format.  Providing
  corrupt `png` files or image files in a different format causes 
  builds to fail.

* __Certificate not found:__ Build fails if you submit your app
  without an associated signing certificate and keychain pair. Make
  sure you add the key to your
  [PhoneGap&nbsp;Build account](http://build.phonegap.com/people/edit) and
  associate that key with your app on the app's main editing page.

* __Unable to import certificate:__ If PhoneGap&nbsp;Build is unable to
  import the certificate you provide along with your password into its
  keychain, it is unable to sign the app, and build fails.  Please try
  uploading your certificate again, making sure that you supply the
  correct credentials.

* __Certificate doesn't match profile:__ PhoneGap&nbsp;Build is unable to
  build a signed app if the identity listed in your profile does not
  match the one in the certificate. This may occur if you upload a
  developer profile along with a distribution certificate, or vice
  versa.  Try using a regenerated provisioning profile that matches
  your certificate.

* __Provisioning Profile expired:__ PhoneGap&nbsp;Build is unable to sign
  the app using the supplied profile and certificate, because the
  provisioning profile has expired.  Upload a regenerated provisioning
  profile from the Apple Developer Portal.

* __Unable to read provisioning profile:__ PhoneGap&nbsp;Build is unable to
  read or parse the provisioning profile.  Check that the
  `mobileprovision` file is valid, otherwise regenerate it from the
  Apple Developer Portal.

## Android Errors

* __Keystore Issues:__ All of the following error messages represent
  issues with your Android signing keys:

  - `Keystore alias not recognized`
  - `Invalid keystore format`
  - `Incorrect keystore password`
  - `Alias not associated with private key`

  If you receive any of these errors, it means the Android `jarsigner`
  was unable to sign your app with the key and keystore you provided.
  An unrecognized alias means the `alias` field you provided was not
  found on the `keystore` file that you uploaded. An invlaid keystore
  format means you may not have uploaded the correct files. An
  incorrect password means you may have entered it incorrectly.  After
  checking hat you have the correct keystore files, password, and
  alias details for your keystore, you may need to re-upload your
  Android keys for your signed build to succeed.

* __Identical filenames:__ Unlike many desktop operating systems, the
  Android filesystem is case-insensitive. If your application package
  includes conflicting filenames such as `index.html` and
  `index.HTML`, build fails.

## BlackBerry Errors

* __Signing Timeout:__ To run on a device, all BlackBerry builds have
  to be signed by RIM's signing servers. While PhoneGap&nbsp;Build attempts
  to sign every BlackBerry build, there are intermittent problems due to 
  unresponsive servers. Rebuilding the app should fix the problem.

* __Invalid Characters in Filenames and/or Directories:__ The
  BlackBerry Widget Packager, a RIM tool that packages your
  application assets into a BlackBerry-compatible binary, adheres to a
  strict set of file-naming rules, allowing only alphanumeric
  characters, dots and underscores. The filename's first character
  needs to be a letter.

* __Invalid Directory Names:__ The BlackBerry Widget Packager reserves
  `bin` and `src` as directory names, so do not use them.

* __Icon(s) Too Large:__ The
  [BlackBerry Widget Packager](https://github.com/blackberry/WebWorks/blob/master/packager/src/net/rim/tumbler/rapc/Rapc.java#L177-178)
  specifies the default maximum size of 16,384 bytes for icon images
  in BlackBerry WebWorks applications. Anything larger triggers a
  packager error that causes the build to fail.

* __Invalid CSK password: signing not verified:__ The BlackBerry
  WebWorks Signing Tool could not verify the signing using the key you
  uploaded, with the password you provided. This usually occurs due to
  a mistake in the provided password. Check the password and re-upload
  your key if necessary.  Also note that the BlackBerry WebWorks
  Signing Tool requires passwords to be at least 8 characters long.

* __Too many files in www directory:__ The BlackBerry WebWorks
  Packager may fail to compile packages when there are over 200 files
  in the `www` directory. Either remove them, or place them in a
  subdirectory.

* __Invalid Characters in Metadata:__ The BlackBerry WebWorks Packager
  only allows Latin characters in application metadata such as name
  and description. Edit the `config.xml` file to remove any offending
  characters.

* __Data Section(s) Too Large:__ The BlackBerry WebWorks Packager may
  fail if resource files within the `www` directory are too large,
  typically high-resolution images over 200K. Try reducing file size.

* __Description too long:__ The BlackBerry WebWorks Packager fails to
  build if the `config.xml` file's `description` field is too
  long. Try to truncate the text.

## WebOS Errors

The webOS packager, an executable called `palm-package`, is sensitive
about your app's version number and package name. The version needs to
be formatted with major, minor, and patch version numbers, such as
`1.1.1`.  The package name must be formatted in reverse domain style,
all lowercase, and all alphanumerics, such as `com.yourcompany.app1`.
WebOS build errors are usually cause by one of these problems.

