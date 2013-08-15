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

# PhoneGap Build

Adobe&reg; PhoneGap&trade; Build is a web service that compiles
PhoneGap apps for you remotely, making downloadable packages available
in a simple web interface at
[build.phonegap.com](http://build.phonegap.com). If you use PhoneGap
Build, you don't need to install and maintain local SDK tools, and can
expect to update projects smoothly.

PhoneGap Build offers three basic development options:

* You can upload your project files directly through the PhoneGap
  Build website.

* You can link your PhoneGap Build account to your GitHub account,
  either public or private, then dynamically pull in remote code
  repositories.

* You can link the `phonegap` command-line tool to your PhoneGap Build
  account. Its `remote` option allows you to compile projects remotely
  in a single command.

This guide provides an overview of the first two options, with basic
details on how to set up an account, link it to a code repository,
import projects, compile them, download packaged apps, and install
them wirelessly onto a device.  Whichever option you choose, the CLI
offers the easiest way to set up the project's required top-level
`www` project directory, with its `config.xml` package specification
and its `index.html` home page.  See The Command-line Interface for
information on how to use the CLI to generate a new project.  See the
Build Applications Remotely section for details on how to use the
CLI's `remote` command to compile your local project in PhoneGap
Build.

<!-- Q: is CLI's `login` command required once per project? -->

<!--

Once you have set up your PhoneGap Build account and generated
projects as described below, see the following sections for more
advanced options:

* Collaborating and Testing shows how you can use the site to grant
  access rights to software testers, with the option for them to
  automatically download the latest version of the app.

* Remote Debugging Tools shows how to configure PhoneGap Build's
  debugging options, or use a custom debug server.

* Common Errors shows how to overcome several problems you may
  encounter when compiling a PhoneGap project remotely.

* The PhoneGap Build API details how an application can communicate
  with the PhoneGap Build service to compile PhoneGap projects.

-->

## Adding an App

Register for a new account at
[build.phonegap.com](https://build.phonegap.com), specified by a
unique email/password pair, or using the same credentials as in your
GitHub account.

Once logged in for the first time, you are prompted to create a new
app, either __open-source__ or from __private__ source:

![](img/guide/phonegap-build/pgbuild_newapp.png)

Choosing the __private__ tab allows you to upload a _.zip_ archive of
the source code, whose directory contains web assets such as a
`config.xml` file for the app's metadata, and an `index.html` for the
home page. You can use the `phonegap` CLI tool to create the project's
top-level `www` directory, then send an archive:

        $ cd /path/to/my/development/directories
        $ phonegap create hello com.example.hello HelloWorld
        $ ls hello
        merges    platforms     plugins         www
        $ ls hello/www
        config.xml   icon.png   index.html      res             spec.html
        css          img        js              spec
        $ cd hello
        $ zip -r hello.zip www

Once you upload the `hello.zip` archive, the site displays the app's
metadata from its `config.xml` file, and it is ready to build:

![](img/guide/phonegap-build/pgbuild_listapp.png)

Once you build the app, the site compiles each platform and makes
downloads available once they're done:

![](img/guide/phonegap-build/pgbuild_builtapp.png)

Click on each platform's link to download each package.  Otherwise,
while testing your app, the QR code image on the right of the panel
offers a quick way to install it onto the device.  Using a QR-reading
app on iOS, Android, or BlackBerry devices, scan the image directly
from your computer screen.  The app loads wirelessly and prompts you
to install it, and then becomes available on the home screen:

![](img/guide/phonegap-build/pgbuild_onAndroid.png)

Note that you may have to change device settings to allow you to
install apps in this manner, outside of an app-store interface.

## Building from a Repository

<!-- 2DO: add screen shots showing github UI -->

Uploading a zip archive as described above can be time-consuming. As
an alternative, you can link a newly created app to a GitHub
repository, either open-source or private.

To do so, make sure you have a viable repository URL. On your GitHub
page, go to the __Repositories__ tab and navigate to the app's
repository, creating a new one if necessary. The URL link displays in
the sidebar.

Here is a simple way to use the PhoneGap CLI to create a new project
(as described in The Command-line Interface), then link it to a GitHub
repository:

        $ cd /path/to/my/development/directories
        $ phonegap create hello com.example.hello HelloWorld
        $ cd hello
          # use this Markdown file to document the app on the GitHub site:
        $ touch README.md
        $ git init
        $ git add .
        $ git commit -am "bootstrap default app"
        $ git remote add origin https://github.com/ulothrix/hello.git
        $ git push -u origin master

Then, after modifying code and other local assets, commit the code and
push it to your GitHub repository:

        $ git commit -am "modified app"
        $ git push

On the PhoneGap Build site, press __Update Code__ to pull the latest
master branch, and __Rebuild All__ to generate application packages
from the updated code.

## Add Features for Remotely Built Projects

<!-- NOTE: VERSION-specific content -->

The most recent version of PhoneGap implements basic device APIs using
a system of added _plugins_. The version used in PhoneGap Build
([2.9.0](http://docs.phonegap.com/en/2.9.0)) uses a somewhat different
system based on project settings. To enable device APIs for projects
compiled with PhoneGap Build, place any of the following `<feature>`
elements in the project's top-level `config.xml` file:

* Basic device information (Device API):

        <feature name="Device" value="org.apache.cordova.core.Device"/>

* Network Connection and Battery Events:

        <feature name="NetworkStatus" value="org.apache.cordova.core.NetworkManager" />
        <feature name="Battery" value="org.apache.cordova.core.BatteryListener" />

* Accelerometer, Compass, and Geolocation:

        <feature name="Accelerometer" value="org.apache.cordova.core.AccelListener" />
        <feature name="Compass" value="org.apache.cordova.core.CompassListener" />
        <feature name="Geolocation" value="org.apache.cordova.core.GeoBroker" />

* Camera, Media playback and Capture:

        <feature name="Camera" value="org.apache.cordova.core.CameraLauncher" />
        <feature name="Media" value="org.apache.cordova.core.AudioHandler" />
        <feature name="Capture" value="org.apache.cordova.core.Capture" />

* Access files on device or network (File API):

        <feature name="File" value="org.apache.cordova.core.FileUtils" />
        <feature name="FileTransfer" value="org.apache.cordova.core.FileTransfer" />

* Notification via dialog box or vibration:

        <feature name="Notification" value="org.apache.cordova.core.Notification" />
        <feature name="Vibration" value="org.apache.cordova.core.Vibration" />

* Contacts:

        <feature name="Contacts" value="org.apache.cordova.core.ContactManager" />

* Globalization:

        <feature name="Globalization" value="org.apache.cordova.core.globalization" />

* Splashscreen:

        <feature name="SplashScreen" value="org.apache.cordova.core.SplashScreen" />

* Open new browser windows (InAppBrowser):

        <feature name="InAppBrowser" value="org.apache.cordova.core.InAppBrowser" />

See Configuration Reference for information about other application
settings you can modify in the `config.xml` file.

<!--

## validate existing download instructions...

Now for the apps themselves. It's not too difficult to install them
directly, depending on which platform you're using:

* __Android__: ensure your Android device can install `apk` files from
  unknown sources

* enter __Settings__ --&gt; __Applications__ --&gt; and enable
  __Unkown Sources__

* __webOS__: You cannot install webOS packages (`ipk` files) directly
  from the web; use Palm's `palm-install` utility for this

* __Symbian__: Download and open the `wgz` file on your device. Done!

* __BlackBerry__: Hit the `OTA install` link and follow the
  instructions on your device. We currently just support BlackBerry OS
  5.0 and above

* __Windows Phone__: You cannot install Windows Phone packages
  directly from the web; you will need to use Microsoft's tools

-->
