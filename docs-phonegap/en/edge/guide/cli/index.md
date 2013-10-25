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

# The Command-line Interface

This guide shows you how to create applications and deploy them to
various native mobile platforms using the `phonegap` command-line
interface (CLI). This tool allows you to create new projects, build
them on different platforms, either locally or on a remote server, and
run them within an emulator or device.  You can also use the CLI to
initialize project code, after which you use various platforms' SDKs
to develop them further.

## Prerequisites

Before building projects locally, you need to install SDKs for each
platform you wish to target.  (See the Platform Guides for details on
how to install each.) Otherwise, you can use the cloud-based PhoneGap
Build service to compile apps for the following platforms remotely:

* Android
* iOS
* BlackBerry 6
* Windows Phone 7
* WebOS
* Symbian

Unlike PhoneGap Build, local builds support BlackBerry 10.  The WebOS
and Symbian platforms are _only_ available when building remotely. The
following platforms are only available when building locally:

* Windows Phone 8
* Windows 8

See Platform Support for an overview of all available options. See
below for details on how to use PhoneGap Build to build remotely.

If building locally, you need to run the command-line interface from
the same machine that supports the platform's SDK. The CLI supports
the following combinations:

* iOS             (Mac)
* Android         (Mac, Linux)
* BlackBerry 10   (Mac, Linux, Windows)
* Windows Phone 7 (Windows)
* Windows Phone 8 (Windows)

On the Mac, the command-line is available via the _Terminal_
application. On the PC, it's available as _Command Prompt_ under
_Accessories_.

The more likely it is that you run the CLI from different machines,
the more it makes sense to maintain a remote source code repository,
whose assets you pull down to local working directories.

To install the `phonegap` command-line tool, follow these steps:

1. Download and install [Node.js](http://nodejs.org/). Following
   installation, you should be able to invoke `node` or `npm` on your
   command line.

1. Install the `phonegap` utility. In Unix, prefixing the additional
   `sudo` command may be necessary to install development utilities in
   otherwise restricted directories:

        $ sudo npm install -g phonegap

   The installation log may produce errors for any uninstalled
   platform SDKs.  Following installation, you should be able to run
   `phonegap` on the command line.

## Create the App

Go to the directory where you maintain your source code, and run a
command such as the following:

        $ phonegap create hello com.example.hello HelloWorld

The first argument specifies a _hello_ directory to be generated
for your project. Its `www` subdirectory houses your application's
home page, along with various resources under `css`, `js`, and `img`,
which follow common web development file-naming conventions. The
`config.xml` file contains important metadata needed to generate and
distribute the application.

The other two arguments are optional: the `com.example.hello` argument
provides your project with a reverse domain-style identifier, and the
`HelloWorld` provides the application's display text. The `-i` and
`-n` command-line options and their corresponding flags make these
explicit:

        $ phonegap create hello -n HelloWorld -i com.example.hello
        $ phonegap create hello --name HelloWorld --id com.example.hello

Alterately, you can edit both of these optional values in the
`config.xml` file later during development.

## Build the App

All subsequent commands need to be run within the project's directory,
or any subdirectories within its scope:

        $ cd hello

By default, the `phonegap create` script generates a skeletal
web-based application whose home page is the project's
`www/index.html` file, with its default logic referenced from
`www/js/index.js`.  Edit this application however you want, but
initialize it as part of a `deviceready` event handler, which executes
once device APIs become available.
<!-- XREF
(See the Application Development Guide and API Reference for details.)
XREF -->

The `build` command compiles an application for whichever platform you
specify, identified by common stub arguments, generating
platform-specific files within the project's `platforms`
subdirectory. For example, the following targets iPhone and iPad
devices:

        $ phonegap build ios
        [phonegap] detecting iOS SDK environment...
        [phonegap] using the local environment
        [phonegap] compiling iOS...
        [phonegap] successfully compiled iOS app

High-level information on the command's progress displays as feedback.
If you need lower-level details, use the `-V` (verbose) option:

        $ phonegap -V build ios

## Test the App on an Emulator or Device

While PhoneGap applications are implemented as web pages, you can't
use a standard browser to preview pages that invoke its device APIs.
To test how an application interacts with platform features, install
it onto a device or emulator. This example installs onto Android:

        $ phonegap install android

As an alternative, the combined `run` command performs both the
`build` and `install` operations in one line:

        $ phonegap run android
        [phonegap] detecting Android SDK environment...
        [phonegap] using the local environment
        [phonegap] compiling Android...
        [phonegap] successfully compiled Android app
        [phonegap] trying to install app onto device
        [phonegap] no device was found
        [phonegap] trying to install app onto emulator
        [phonegap] successfully installed onto emulator

If your Android device is connected and properly configured, the
application displays there by default, otherwise it displays on the
SDK emulator.

Either the device or the emulator may need to be configured, as
detailed in the Platform Guides.  In Android's case, to test on the
device you would have to enable a __USB debugging__ option on the
device, and perhaps add a USB driver depending on your development
environment.  To test in an emulator, you may first need to set up or
choose a particular AVD (_Android Virtual Device_).

The `run` command makes the app accessible on the home screen as if
you had downloaded it from an app store:

![](img/guide/cli/pg_android_emulate.png)

You can also override the device-to-emulator fallback behavior
described above.  Adding the `-e` (or `--emulator`) option to either
the `install` or `run` command forces the app to display in the
emulator, even if a device is connected.  Likewise, adding the `-d`
(or `--device`) option forces it to try to install onto the device,
without falling back to the emulator in case it fails to install.

## Add Plugin Features

When you build and view a new project, the default application that
appears doesn't do very much. You can modify the app in many ways to
take advantage of standard web technologies, but for the app to
communicate closely with various device-level features, you need to
add plugins that provide access to core PhoneGap APIs.

A _plugin_ is a bit of add-on code that provides an interface to
native components. You can design your own plugin interface, for
example when designing a hybrid app that mixes a PhoneGap WebView with
native components. (See Embedding WebViews and Plugin Development
Guide for details.)  More commonly, you would add a plugin to enable
one of PhoneGap's basic device-level features
<!-- XREF
discussed in the Application Development Guide and
XREF -->
detailed in the API Reference.

The `phonegap local plugin add` command requires you to specify the
repository for the plugin code.  Here are examples of features you
might add:

* Basic device information (Device API):

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git

* Network Connection and Battery Events:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-battery-status.git

* Accelerometer, Compass, and Geolocation:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-motion.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-orientation.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git

* Camera, Media playback and Capture:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-camera.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git

* Access files on device or network (File API):

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

* Notification via dialog box or vibration:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git
        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-vibration.git

* Contacts:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-contacts.git

* Globalization:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-globalization.git

* Splashscreen:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-splashscreen.git

* Open new browser windows (InAppBrowser):

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git

* Debug console:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git

Use `plugin list` to view currently installed plugins. Each displays
by its identifier:

        $ phonegap local plugin list
        [phonegap] org.apache.cordova.core.console

To remove a plugin, refer to it by the same identifier that appears in
the listing, which corresponds to subdirectories within the project's
`plugins` directory. For example, here is how you would remove support
for a debug console from a final release version:

        $ phonegap local plugin remove org.apache.cordova.core.console

You can batch-remove or add plugins by specifying more than one
argument for each command.

## Advanced Plugin Options

When adding a plugin, several options allow you to specify from where
to fetch the plugin. The examples above use a well-known
`registry.cordova.io` registry, from where the plugin is specified by
its `id`:

        $ phonegap local plugin add org.apache.cordova.console

The `id` may also include the plugin's version number, appended after
an `@` character. The `latest` version is an alias for the most recent
version. For example:

        $ phonegap local plugin add org.apache.cordova.console@latest
        $ phonegap local plugin add org.apache.cordova.console@0.2.1

If the plugin is not registered at `registry.cordova.io` but is located in
another git repository, you can specify an alternate URL:

        $ phonegap local plugin add https://github.com/apache/cordova-plugin-console.git

The git example above fetches the plugin from the end of the master
branch, but an alternate git-ref such as a tag or branch can be
appended after a `#` character:

        $ phonegap local plugin add https://github.com/apache/cordova-plugin-console.git#r0.2.0

If the plugin (and its `plugin.xml` file) is in a subdirectory within
the git repo, you can specify it with a `:` character. Note that the
`#` character is still needed:

        $ phonegap local plugin add https://github.com/someone/aplugin.git#:/my/sub/dir

You can also combine both the git-ref and the subdirectory:

        $ phonegap local plugin add https://github.com/someone/aplugin.git#r0.0.1:/my/sub/dir

Alternately, specify a local path to the plugin directory that
contains the `plugin.xml` file:

        $ phonegap local plugin add ../my_plugin_dir

## Customize Each Platform

While PhoneGap allows you to easily deploy an app for many different
platforms, sometimes you need to add customizations.  In that case,
you don't want to modify the source files in various `www` directories
within the top-level `platforms` directory, because they're regularly
replaced with the top-level `www` directory's cross-platform source.

Instead, the top-level `merges` directory offers a place to specify
assets to deploy on specific platforms. Each platform-specific
subdirectory within `merges` mirrors the directory structure of the
`www` source tree, allowing you to override or add files as needed.
For example, here is how you might uses `merges` to boost the default
font size for Android devices:

* Edit the `www/index.html` file, adding a link to an additional CSS
  file, `overrides.css` in this case:

        <link rel="stylesheet" type="text/css" href="css/overrides.css" />

* Optionally create an empty `www/css/overrides.css` file, which would
  apply for all non-Android builds, preventing a missing-file error.

* Create a `css` subdirectory within `merges/android`, then add a
  corresponding `overrides.css` file. Specify CSS that overrides the
  12-point default font size specified within `www/css/index.css`, for
  example:

        body { font-size:14px; }

When you rebuild the project, the Android version features the custom
font size, while others remain unchanged.

You can also use `merges` to add files not present in the original
`www` directory. For example, an app can incorporate a _back button_
graphic into the iOS interface, stored in
`merges/ios/img/back_button.png`, while the Android version can
instead capture `backbutton` events from the corresponding hardware
button.

## Build Applications Remotely

By default, building an application generates files in various
subdirectories within `platforms`, and relies on locally installed SDK
tools.  As an alternative, you may be able to build the application
remotely using Adobe's PhoneGap Build service.
(See Introducing PhoneGap Build.)
This development path
means there's no need to maintain SDK tools on your system, and it
also involves a different way to install apps onto your device, with
no emulator testing available.  PhoneGap Build also supports
additional platforms (Symbian and WebOS) that can only be compiled
remotely. (See the Overview section's _Platform Support_ table for
details.)

First, you need an account on the [PhoneGap
Build](https://build.phonegap.com) site.  Then use the `login` command
to associate your command-line environment with the account. Here are
two minor variations of the same command:

        $ phonegap remote login -u iamreallyadog@gmail.com -p mYpASSw0RD
        $ phonegap remote login --username iamreallyadog@gmail.com --password mYpASSw0RD

If you don't first run this command, you are prompted for account
details the first time you build a remote application. Credentials are
stored indefinitely for each login.  Use the corresponding `logout`
command to dissociate the account with the local environment:

        $ phonegap remote logout

To compile your app remotely, prefix the `build` command with the
additional `remote` command:

        $ phonegap remote build ios

To use plugins, you must first add them locally, then build them
remotely. For example:

        $ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
        $ phonegap remote build ios

Since the remote build environment has no SDK that would allow you to
run an emulator or tether a device, the `install` and `run` commands
simply generate a QR code in the PhoneGap Build interface. Use a QR
reader to scan this image, and the app installs over the air onto iOS,
Android, or BlackBerry devices:

        $ phonegap remote install ios
        # ...or...
        $ phonegap remote run ios

![](img/guide/cli/pg_build_qr.png)

Note that commands operate locally by default, but there is an
explicit `local` command. For example, these commands do the same
thing:

        $ phonegap local build ios
        $ phonegap build ios

## Updating PhoneGap

After installing the `phonegap` utility, you can always update it to
the latest version by running the following command:

        $ sudo npm update -g phonegap

The `version` command, or the `-v` option, displays the currently
running version:

        $ phonegap version
        $ phonegap -v

Run the `npm info` command for a longer listing that includes the
current version along with other available version numbers:

        $ npm info phonegap

Use this syntax to install a specific version listed there:

        $ sudo npm install -g phonegap@2.9.0-rc1-0.12.2

PhoneGap 3.0 is the first version to support the command-line
interface described in this section. If you are updating from a
version prior to 3.0, you need to create a new project as described
above, then copy the older application's assets into the top-level
`www` directory.  Where applicable, further details about upgrading to
3.0 are available in the Platform Guides.  Once you upgrade to the
`phonegap` command-line interface and use `npm update` to stay
current, the more time-consuming procedures described there are no
longer relevant.

