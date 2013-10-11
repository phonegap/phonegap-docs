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

# Configuring Remote Builds

This section details configuration options available when using
PhoneGap Build to compile an application, or when using the _remote_
CLI option described in The Command-line Interface.  For overall
configuration options, see The config.xml File.  For information on
how to configure an app's graphics, see Icons and Splash Screens.

## Specifying Platforms

By default, PhoneGap Build generates applications for every platform
it can.  Specify the optional `<gap:platform>` element if you only
want to make certain platforms available. The following shows
available values:

        <gap:platform name="ios" />
        <gap:platform name="android" />
        <gap:platform name="webos" />
        <gap:platform name="symbian" />
        <gap:platform name="blackberry" />
        <gap:platform name="winphone" />

<!--

## Specifying Application Features

## Specifying Plugins

-->

## Specifying the PhoneGap Version

PhoneGap Build allows you to control which version of PhoneGap to use
when compiling a project remotely. Set the `phonegap-version`
preference to any of the following values: __2.5.0__, __2.7.0__,
__2.9.0__, or the default __3.0.0__:

        <preference name="phonegap-version" value="2.9.0" />

All PhoneGap versions prior to __2.5.0__ are deprecated. Specifying an
unsupported version number prevents the project from building.

## Android Preferences

The following preferences affect how Android apps compiled with
PhoneGap Build run:

- `splash-screen-duration` controls the duration for which the splash
  screen remains visible. Default value is `5000` milliseconds.

        <preference name="splash-screen-duration" value="10000"/>

  __NOTE:__ Use the Splashscreen API to control visibility for other
  supporting platforms, calling `navigator.splashscreen.hide()` in the
  `deviceready` callback.

- `android-windowSoftInputMode` controls the main window's appearance
  when the keyboard appears. For details and a list of possible
  values, see
  [Android's documentation](http://developer.android.com/guide/topics/manifest/activity-element.html#wsoft).

        <preference name="android-windowSoftInputMode" value="stateVisible" />

The following preferences affect how Android projects compile on
PhoneGap Build. They correspond to the `usesSdk` attributes in the
`AndroidManifest.xml` file, for which details are available in
[Android's documentation](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html).

- `android-minSdkVersion` specifies the minimum Android SDK version
  used to compile the project. Defaults to `7`, corresponding to
  Android 2.1.

        <preference name="android-minSdkVersion" value="10" />

- `android-maxSdkVersion` specifies the maximum Android SDK version
  used to compile the project.  By default, this value is not set.

        <preference name="android-maxSdkVersion" value="15" />

- `android-targetSdkVersion` specifies an integer corresponding to the
  API Level the application targets. Unset by default, in which case the
  default value matches that of `minSdkVersion`.

        <preference name="android-targetSdkVersion" value="12" />

- `android-installLocation` controls where an app can be installed.
  The default of `internalOnly` matches that of the Android SDK.
  Values of `auto` or `preferExternal` allow the app to be installed
  on an SD card, which can lead to unexpected behavior.  For details,
  see
  [Android's documentation](http://developer.android.com/guide/appendix/install-location.html).

        <preference name="android-installLocation" value="auto" />

## iOS Preferences

The following preferences apply to iOS projects compiled with PhoneGap
Build:

- `target-device` (`handset`, `tablet`, or default `universal`)
  targets an interface for a specific class of device. For example,
  setting it to `handset` assigns to smaller interface to the larger
  screen.

        <preference name="target-device" value="handset" />

  <!-- CLARIFY EXACTLY WHAT THIS DOES -->

- `prerendered-icon` (boolean, default `false`) prevents iOS from
  applying its default gloss effect to the app's home screen icon.

        <preference name="prerendered-icon" value="true" />

- `ios-statusbarstyle` (`black-opaque`, `black-translucent`, or
  `default`) controls the appearance of the status bar at the top of
  the screen, which appears gray by default. Note that the PhoneGap
  webview does not extend beneath the status bar, so
  `black-translucent` appears the same as `black-opaque`.

        <preference name="ios-statusbarstyle" value="black-opaque" />

- `detect-data-types` (boolean, default is `true`) controls whether
  text patterns such as phone numbers and dates are automatically
  converted into links handled by various iOS services.

        <preference name="detect-data-types" value="false" />

  <!-- (ios only) Controls whether certain data types (such as phone
       numbers and dates) are automatically turned into links by the
       system. Defaults to "true" (as does the system web view). In
       preference to this, try using meta-tags: And use
       detect-data-types if meta tags don't work for you.  -->

- `exit-on-suspend` (boolean, default is `false`) allows the app to
  terminate when paused, for example when the user presses the home
  button to switch to another application.

        <preference name="exit-on-suspend" value="true" />

## BlackBerry Preferences

The following preference applies to BlackBerry projects compiled with
PhoneGap Build:

- `disable-cursor` (boolean, default is `false`) prevents a mouse or
  icon cursor from displaying. Corresponds to the `<rim:navigation/>`
  element detailed in 
  [BlackBerry's documentation](https://developer.blackberry.com/html5/documentation/rim_navigation_element_1582456_11.html).

        <preference name="disable-cursor" value="true" />

## Custom URL Schemes

The iOS platform allows you to register
[custom URL schemes](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/AdvancedAppTricks/AdvancedAppTricks.html#//apple_ref/doc/uid/TP40007072-CH7-SW50)
to field navigation links from other applications. The following
example defines two:

        <gap:url-scheme name="com.acme.myscheme" role="None">
          <scheme>pgbr</scheme>
          <scheme>pgbw</scheme>
        </gap:url-scheme>

The optional `name` attribute defaults to the current application's
`id` set by the `config.xml` file's `<widget>` element.

The optional `role` attribute declares how the app might be able to
handle data resulting from the link. The default value of `None` does
not specify any behavior. For details, see
[Apple's documentation](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-101685-TPXREF107).

The `config.xml` file may contain any number of `<gap:url-scheme>`
elements. Each must feature at least one child `<scheme>` element.

## Custom Debug Server

The `debug-server` feature allows you to use a custom Weinre instance
for your application. By default, PhoneGap Build uses
`http://debug.build.phonegap.com`, but you can change this by adding
markup such as the following to your `config.xml` and changing the
key:

        <feature name="debug-server" required="true">
           <param name="domain" value="http://debug.custom.com"/>
           <param name="key" value="some_unique_key"/>
        </feature>

See Remote Debugging Tools for more information.
