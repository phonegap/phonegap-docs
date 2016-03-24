---
title: Icons and Splashes
url: references/phonegap-build/configuring/icons-and-splash
layout: subpage
expand: build-configuring
---

- [Icons](#icons)
- [Splash Screens](#splashes)

### Specifying platform

Icons and splashes are usually platform specific.  There are two ways to specify an icon or splash is for a particular platform.  The first way is by specifying a `platform` attribute:

    <icon src="icon-60@3x.png" platform="ios" width="180" height="180" />

The second way (recommended) is by putting the icon or splash inside a platform tag:

    <platform name="ios">
        <icon src="icon-60@3x.png" width="180" height="180" />
    </platform>

Both these fragments will result in the icon being used for iOS.

<a name="icons"></a>
# Icons

The simplest icon configuration is a single default `icon.png`:

    <icon src="icon.png" />

The default icon must be named `icon.png` and must reside in the root of your application folder. If no other icon configurations are specified, each platform will attempt to use this file as the default icon. To define platform specific icons please use the guide provided below. Icon files should be the file formats specified in the examples below, other file types are not guaranteed to work across platforms.

    <icon src="res/icon/ios/icon-60@3x.png" platform="ios" width="180" height="180" />

- **src**: (required) specifies the location of the image file, relative to your `www` directory
- **width**: (optional) but recommended to include, width in pixels
- **height**: (optional) but recommended to include, height in pixels
- **platform**: (optional) the target platform (`ios`, `android`, or `windows`)


### iOS

We support classic, retina, iPhone 5 and iPad displays.

The names below reflect the names of the destination files when they are added to the application. During app submittal you may get feedback that has a reference to these filenames.

#### iOS 7.0+

    <!-- iPhone 6 / 6+ -->
    <icon src="icon-60@3x.png" platform="ios" width="180" height="180" />

    <!-- iPhone / iPod Touch  -->
    <icon src="icon-60.png" platform="ios" width="60" height="60" />
    <icon src="icon-60@2x.png" platform="ios" width="120" height="120" />

    <!-- iPad -->
    <icon src="icon-76.png" platform="ios" width="76" height="76" />
    <icon src="icon-76@2x.png" platform="ios" width="152" height="152" />

    <!-- Settings Icon -->
    <icon src="icon-small.png" platform="ios" width="29" height="29" />
    <icon src="icon-small@2x.png" platform="ios" width="58" height="58" />

    <!-- Spotlight Icon -->
    <icon src="icon-40.png" platform="ios" width="40" height="40" />
    <icon src="icon-40@2x.png" platform="ios" width="80" height="80" />
    
#### iOS 6.1
    
    <!-- iPhone / iPod Touch -->
    <icon src="icon.png" platform="ios" width="57" height="57" />
    <icon src="icon@2x.png" platform="ios" width="114" height="114" />

    <!-- iPad -->
    <icon src="icon-72.png" platform="ios" width="72" height="72" />
    <icon src="icon-72@2x.png" platform="ios" width="144" height="144" />

    <!-- iPhone Spotlight and Settings Icon -->
    <icon src="icon-small.png" platform="ios" width="29" height="29" />
    <icon src="icon-small@2x.png" platform="ios" width="58" height="58" />

    <!-- iPad Spotlight and Settings Icon -->
    <icon src="icon-50.png" platform="ios" width="50" height="50" />
    <icon src="icon-50@2x.png" platform="ios" width="100" height="100" />

### Android

We support all Android resource qualifiers. Commonly used qualifiers refer to device density and language.

    <icon src="ldpi.png" platform="android" qualifier="ldpi" />
    <icon src="mdpi.png" platform="android" qualifier="mdpi" />
    <icon src="hdpi.png" platform="android" qualifier="hdpi" />
    <icon src="xhdpi.png" platform="android" qualifier="xhdpi" />
    <icon src="xxhdpi.png" platform="android" qualifier="xxhdpi" />
    <icon src="fr-xxhdpi.png" platform="android" qualifier="fr-xxhdpi" />

A list of these qualifiers can be viewed on Table-2 [here](http://developer.android.com/guide/topics/resources/providing-resources.html). Note that compound qualifiers (eg. "port-xhdpi") have to
be in the same order as viewed on this table.

### Windows Phone 8 (cordova-wp8)

We support two icons for Windows Phone, a regular icon and a tile image.

    <icon src="icon.png" platform="winphone" />
    <icon src="tileicon.png" platform="winphone" role="background" />

### Windows Phone 8.1+ (cordova-windows)

As of PhoneGap Release cli-6.0.0, the Windows Phone 8.1 package is built using cordova-windows. Here are the supported icons:

    <icon platform="winphone" width="44" height="44" src="res/Square44x44Logo.scale-100.png" />
    <icon platform="winphone" width="106" height="106" src="res/Square44x44Logo.scale-240.png" />
    <icon platform="winphone" width="150" height="150" src="res/Square150x150Logo.scale-100.png" />
    <icon platform="winphone" width="360" height="360" src="res/Square150x150Logo.scale-240.png" />
    <icon platform="winphone" width="71" height="71" src="res/Square71x71Logo.scale-100.png" />
    <icon platform="winphone" width="170" height="170" src="res/Square71x71Logo.scale-240.png" />
    <icon platform="winphone" width="310" height="150" src="res/Wide310x150Logo.scale-100.png" />
    <icon platform="winphone" width="744" height="360" src="res/Wide310x150Logo.scale-240.png" />

<a name="splashes"></a>
# Splash Screens

You can have zero or more of these elements present in your `config.xml`. This element can have `src`, `platform`, `width` and `height` attributes, just like the `<icon>` element above. Like icon files, your splash screens should be saved as `png` files.

    <splash src="splash/ios/Default-568h@2x~iphone.png" platform="ios" width="320" height="480" />

### Usage and Additional Information:

Unless otherwise specified in a config.xml, each platform will try to use the default `splash.png` during compilation. To define platform specific splash screens please use the guide provided below.

Splash files should be the file formats specified in the examples below. Any other file type is not guaranteed to work across platforms.

### Warning:
If you do not supply the `platform` attribute, the referenced image will be copied to ALL platforms, increasing the size of their application packages.

### Default

The default splash must be named `splash.png` and must reside in the root of your application folder.

    <splash src="splash.png" />

Please note that in the past splash screens were specified with the `gap:splash` element and the platform specified with `gap:platform`.  This is still supported but we recommend moving to `splash` and `platform`.

### iOS

We support classic, retina, iPhone 5 and iPad displays; the following will define splash screens for each of those. Standard iPads have two different splash screens, portrait, landscape. Retina iPads have two additional splash screens, retina  portrait and retina landscape.

The names below reflect the names of the destination files when they are added to the application. During app submittal you may get feedback that has a reference to these filenames.

    <!-- iPhone and iPod touch -->
    <splash src="Default.png" platform="ios" width="320" height="480" />
    <splash src="Default@2x.png" platform="ios" width="640" height="960" />

    <!-- iPhone 5 / iPod Touch (5th Generation) -->
    <splash src="Default-568h@2x.png" platform="ios" width="640" height="1136" />

    <!-- iPhone 6 -->
    <splash src="Default-667h@2x.png" platform="ios" width="750" height="1334" />
    <splash src="Default-Portrait-736h@3x.png" platform="ios" width="1242" height="2208" />
    <splash src="Default-Landscape-736h@3x.png" platform="ios" width="2208" height="1242" />

    <!-- iPad -->
    <splash src="Default-Portrait.png" platform="ios" width="768" height="1024" />
    <splash src="Default-Landscape.png" platform="ios" width="1024" height="768" />

    <!-- Retina iPad -->
    <splash src="Default-Portrait@2x.png" platform="ios" width="1536" height="2048" />
    <splash src="Default-Landscape@2x.png" platform="ios" width="2048" height="1536" />

### Android

We support all Android resource qualifiers. Commonly used qualifiers refer to device orientation, language and density.

    <splash src="ldpi.png" platform="android" qualifier="ldpi" />
    <splash src="mdpi.png" platform="android" qualifier="mdpi" />
    <splash src="hdpi.png" platform="android" qualifier="hdpi" />
    <splash src="xhdpi.png" platform="android" qualifier="xhdpi" />
    <splash src="fr-xhdpi.png" platform="android" qualifier="fr-xhdpi" />
    <splash src="portrait-xxhdpi.png" platform="android" qualifier="port-xxhdpi" />
    <splash src="landscape-xxhdpi.png" platform="android" qualifier="land-xxhdpi" />

A list of these qualifiers can be viewed on Table-2 [here](http://developer.android.com/guide/topics/resources/providing-resources.html). Note that compound qualifiers (eg. "port-xhdpi") have to
be in the same order as viewed on this table.

Patch-9 backgrounds are supported. All patch-9 files have to have a ".9.png" suffix.

### Windows Phone 8 (cordova-wp8)

  Windows Phone supports a single splash image and can be defined as below. Unlike the other supported platforms, Windows Phone splash screen should be in `jpg` format

    <splash src="splash/winphone/splash.jpg" platform="winphone" />

### Windows Phone 8.1 (cordova-windows)

  Windows Phone 8.1 supports a single png splash as defined here

    <splash platform="winphone" width="1152" height="1920" src="www/res/SplashScreenPhone.scale-240.png" />


