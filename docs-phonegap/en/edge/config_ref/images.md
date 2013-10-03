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

# Icons and Splash Screens

This section shows how to configure an app's icon and optional splash
screen for various platforms, either when working in the PhoneGap CLI
(described in The Command-line Interface), when using local
platform-specific SDK tools (detailed in the Platform Guides), or when
compiling projects remotely using PhoneGap Build (see Introducing
PhoneGap Build).

## Configuring Icons in the CLI

When working in the CLI, icon source files are located within various
platform-specific subdirectories within the project's `www/res/icons`
directory. Newly created projects come with a default set of Cordova
icons for you to replace for the platforms you wish to target.

Android specifies icons for low, medium, high, and extra-high resolutions:

        android/icon-36-ldpi.png
        android/icon-48-mdpi.png
        android/icon-72-hdpi.png
        android/icon-96-xhdpi.png

The iOS platform specifies 72-pixel-square icons for iPads, and
57-pixel icons for iPhones and iPods, with high-resolution _2x_
variants for retina displays:

        ios/icon-57-2x.png
        ios/icon-57.png
        ios/icon-72-2x.png
        ios/icon-72.png

Windows Phone specifies a default 48-pixel icon, along with various
devices' background tiling images used when representing applications:

        windows-phone/icon-48.png
        windows-phone/icon-62-tile.png
        windows-phone/icon-173-tile.png

Blackberry requires an 80-pixel icon:

        blackberry/icon-80.png

Tizen requires an 128-pixel icon:

        tizen/icon-128.png

## Configuring Splash Screens in the CLI

Use the Splashscreen API to enable display of an app's introductory
splash screen on many platforms.  When working in the CLI, splash
screen source files are located within the project's `www/res/screens`
subdirectory.

Android specifies both portrait- and landscape-oriented splash screen
images for low, medium, high, and extra-high resolutions:

        android/screen-hdpi-landscape.png
        android/screen-hdpi-portrait.png
        android/screen-ldpi-landscape.png
        android/screen-ldpi-portrait.png
        android/screen-mdpi-landscape.png
        android/screen-mdpi-portrait.png
        android/screen-xhdpi-landscape.png
        android/screen-xhdpi-portrait.png

The iOS platform specifies variants for iPhone/iPod and iPad, with
variants for retina displays and different orientations. The _568h_
file is customized for the iPhone 5's taller screen:

        ios/screen-ipad-landscape-2x.png
        ios/screen-ipad-landscape.png
        ios/screen-ipad-portrait-2x.png
        ios/screen-ipad-portrait.png
        ios/screen-iphone-landscape-2x.png
        ios/screen-iphone-landscape.png
        ios/screen-iphone-portrait-2x.png
        ios/screen-iphone-portrait.png
        ios/screen-iphone-portrait-568h-2x.png

BlackBerry and Windows Phone both specify a single splash screen
image:

        blackberry/screen-225.png
        windows-phone/screen-portrait.jpg

## Configuring Images for PhoneGap Build

By default, PhoneGap Build generates icons based on the root
application directory's `icon.png` file. Otherwise, adding `<icon>`
elements to the top-level `config.xml` file allows you to specify a
different default filename, or platform-specific icons.  The `width`
and `height` attributes are optional:

        <icon src="app.png" width="128" height="128"/>

Likewise, the default splash screen must be named `splash.png` and
must reside in the root of your application folder in _png_
format. Otherwise, use the custom `gap:splash` tag to specify a
different filename:

        <gap:splash src="app_splash.png" />

The `gap:platform` attribute specifies custom splash screens for
target platforms. For example:

        <gap:splash src="splash/ios/Default-568h@2x~iphone.png"
                gap:platform="ios" width="320" height="480" />

If the `gap:platform` attribute is not specified, the referenced file
is copied to _all_ platforms, unnecessarily increasing the size of the
application package.

The following example defines icons and splash screens for low,
medium, high, and extra-high resolution screens on Android devices:

        <icon src="icons/android/ldpi.png"  gap:platform="android" gap:density="ldpi"  />
        <icon src="icons/android/mdpi.png"  gap:platform="android" gap:density="mdpi"  />
        <icon src="icons/android/hdpi.png"  gap:platform="android" gap:density="hdpi"  />
        <icon src="icons/android/xhdpi.png" gap:platform="android" gap:density="xhdpi" />
        <gap:splash src="splash/android/ldpi.png"  gap:platform="android" gap:density="ldpi"  />
        <gap:splash src="splash/android/mdpi.png"  gap:platform="android" gap:density="mdpi"  />
        <gap:splash src="splash/android/hdpi.png"  gap:platform="android" gap:density="hdpi"  />
        <gap:splash src="splash/android/xhdpi.png" gap:platform="android" gap:density="xhdpi" />

The following defines iOS icons for _classic_, _retina_, _iPad_, and
_retina iPad_ displays:

        <icon src="icons/ios/icon.png"          gap:platform="ios" width="57"  height="57"  />
        <icon src="icons/ios/icon-72.png"       gap:platform="ios" width="72"  height="72"  />
        <icon src="icons/ios/icon_at_2x.png"    gap:platform="ios" width="114" height="114" />
        <!-- retina iPad -->
        <icon src="icons/ios/icon-72_at_2x.png" gap:platform="ios" width="144" height="144" />

The following defines iOS splash screens for _classic_, _retina_,
_iPhone 5_, and _iPad_ displays. Standard iPads have two different
splash screens for portrait and landscape orientation. Retina iPads
have two additional splash screens: retina portrait and retina
landscape. The following defines splash screens for each type of
screen:

        <gap:splash src="splash/ios/Default.png"                 gap:platform="ios" width="320"  height="480"  />
        <gap:splash src="splash/ios/Default_at_2x.png"           gap:platform="ios" width="640"  height="960"  />
        <gap:splash src="splash/ios/Default_iphone5.png"         gap:platform="ios" width="640"  height="1136" />
        <gap:splash src="splash/ios/Default-Landscape.png"       gap:platform="ios" width="1024" height="748"  />
        <gap:splash src="splash/ios/Default-Portrait.png"        gap:platform="ios" width="768"  height="1004" />
        <!-- retina iPad -->
        <gap:splash src="splash/ios/Default-Landscape_at_2x.png" gap:platform="ios" width="2048" height="1496" />
        <gap:splash src="splash/ios/Default-Portrait_at_2x.png"  gap:platform="ios" width="1536" height="2008" />

The following specifies icons and splash screens for BlackBerry
devices.  Note that BlackBerry icons __must be smaller__ than
16K. BlackBerry also defines an optional hover state that allows a
separate icon to display when users roll a trackpad cursor over the
icon image. By default, the non-hover icon displays for the hover
state.

        <icon src="icons/bb/icon.png"          gap:platform="blackberry" />
        <icon src="icons/bb/icon_hover.png"    gap:platform="blackberry" gap:state="hover"/>
        <gap:splash src="splash/bb/splash.png" gap:platform="blackberry" />

The WebOS platform supports a default icon and a miniature icon that
is used for notifications:

        <icon src="icons/webos/icon.png"     gap:platform="webos" />
        <icon src="icons/webos/miniicon.png" gap:platform="webos" gap:role="mini" />

PhoneGap Build supports two kinds of Windows Phone icons, a regular
icon and a background tile image. It also supports a single splash
screen image that, unlike other platforms, should be in _jpg_ format:

        <icon src="icons/winphone/icon.png"          gap:platform="winphone" />
        <icon src="icons/winphone/tileicon.png"      gap:platform="winphone" gap:role="background" />
        <gap:splash src="splash/winphone/splash.jpg" gap:platform="winphone" />

## Splash Screens for the Android Platform

This section provides details on image locations, relevant only when
compiling projects directly in the Android SDK along with
associated platform-specific command-line tools.

Place [9-patch image](https://developer.android.com/tools/help/draw9patch.html)
files in the Android project's `res/drawable` directory. The size for
each should be:

- xlarge (xhdpi): at least 960 &times; 720
- large (hdpi): at least 640 &times; 480
- medium (mdpi): at least 470 &times; 320
- small (ldpi): at least 426 &times; 320

In the `onCreate` method of the class that extends `DroidGap`, add the
following two lines:

        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl(Config.getStartUrl(), 10000);

The first line sets the image to display as the splash screen. If you
name your image anything other than `splash.png`, you need to modify
this line.

The second line is the normal `super.loadUrl` line, but its second
parameter specifies a timeout value to display the splash screen. In
this example the splash screen displays for 10 seconds. To dismiss the
splash screen once the app receives the `deviceready` event, call the
`navigator.splashscreen.hide()` method.

## Splash Screens for the iOS Platform

This section provides details on image locations, relevant only when
compiling projects directly in the Xcode along with associated
platform-specific command-line tools.

Copy your splash screen images into the iOS project's
`Resources/splash` directory. Only add the images for the devices you
want to support, such as iPad or iPhone. The size of each image should
be:

- `Default-568h@2x~iphone.png` (640&times;1136 pixels)
- `Default-Landscape@2x~ipad.png` (2048&times;1496 pixels)
- `Default-Landscape~ipad.png` (1024&times;748 pixels)
- `Default-Portrait@2x~ipad.png` (1536&times;2008 pixels)
- `Default-Portrait~ipad.png` (768&times;1004 pixels)
- `Default@2x~iphone.png` (640&times;960 pixels)
- `Default~iphone.png` (320&times;480 pixels)

## Splash Screens for the BlackBerry 10 Platform

Copy your splash screen images into the project's
`res/screen/blackberry10` directory. The file names should be:

- `splash-1280x768.png` (1280&times;768 pixels)
- `splash-720x720.png` (720&times;720 pixels)
- `splash-768x1280.png` (768&times;1280 pixels)
