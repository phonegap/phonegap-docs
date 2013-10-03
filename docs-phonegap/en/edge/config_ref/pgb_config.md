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

# PhoneGap Build Configuration

This section details configuration options available when using
PhoneGap Build to compile an application, or when using the _remote_
CLI option described in The Command-line Interface.  For overall
configuration options, see The config.xml File.  For information on
how to configure an app's graphics, see Icons and Splash Screens.

## Specifying Platforms

By default, PhoneGap Build builds applications for every platform it
can.  Specify the optional `<gap:platform>` element if you only want
to make certain platforms available. The following shows available
values:

        <gap:platform name="ios" />
        <gap:platform name="android" />
        <gap:platform name="webos" />
        <gap:platform name="symbian" />
        <gap:platform name="blackberry" />
        <gap:platform name="winphone" />

## Specifying the PhoneGap Version

PhoneGap Build allows you to control which version of PhoneGap to use
when compiling a project remotely. Set the `phonegap-version`
preference to any of the following values: __2.5.0__, __2.7.0__,
__2.9.0__, or the default __3.0.0__:

        <preference name="phonegap-version" value="2.9.0" />

All PhoneGap versions prior to __2.5.0__ are deprecated. Specifying an
unsupported version number prevents the project from building.

## Android Preferences

## iOS Preferences

The following preferences apply to iOS projects on PhoneGap Build:

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
