---
title: iOS Icons
url: tutorials/configure/icons/ios
layout: subpage
tabs:
  - label: iOS
    url: tutorials/configure/icons/ios
  - label: Android
    url: tutorials/configure/icons/android
  - label: Windows
    url: tutorials/configure/icons/win    
---

## Icon Configuration

This section shows how to configure the icons that represent your mobile application. 

## Configuring Icons in config.xml

When working in the PhoneGap CLI you can define app icon(s) via the `<icon>` element (`config.xml`).

If you do not specify an icon then the default logo included in the project is used (when available).

    <icon src="res/ios/icon.png" platform="ios" width="57" height="57" density="mdpi" />

src: (required) specifies the location of the image file, relative to your project directory

platform: (optional) target platform

width: (optional) icon width in pixels

height: (optional) icon height in pixels 

density: (optional) android specific, specifies icon density

The following configuration can be used to define single default icon
which will be used for all platforms.

        <icon src="res/icon.png" />

For each platform you can also define a pixel-perfect icons set to fit 
different screen resolutions.

#### Android

         <platform name="android">
                  <icon src="res/android/ldpi.png" density="ldpi" />
                  <icon src="res/android/mdpi.png" density="mdpi" />
                  <icon src="res/android/hdpi.png" density="hdpi" />
                  <icon src="res/android/xhdpi.png" density="xhdpi" />
         </platform>

<div class="alert-info">**TIP:** See this [Android Developer Iconography Guide](http://developer.android.com/design/style/iconography.html) for more details.</div>

#### iOS

         <platform name="ios">
                  <!-- iOS 8.0+ -->
                  <!-- iPhone 6 Plus  -->
                  <icon src="res/ios/icon-60@3x.png" width="180" height="180" />
                  <!-- iOS 7.0+ -->
                  <!-- iPhone / iPod Touch  -->
                  <icon src="res/ios/icon-60.png" width="60" height="60" />
                  <icon src="res/ios/icon-60@2x.png" width="120" height="120" />
                  <!-- iPad -->
                  <icon src="res/ios/icon-76.png" width="76" height="76" />
                  <icon src="res/ios/icon-76@2x.png" width="152" height="152" />
                  <!-- iOS 6.1 -->
                  <!-- Spotlight Icon -->
                  <icon src="res/ios/icon-40.png" width="40" height="40" />
                  <icon src="res/ios/icon-40@2x.png" width="80" height="80" />
                  <!-- iPhone / iPod Touch -->
                  <icon src="res/ios/icon.png" width="57" height="57" />
                  <icon src="res/ios/icon@2x.png" width="114" height="114" />
                  <!-- iPad -->
                  <icon src="res/ios/icon-72.png" width="72" height="72" />
                  <icon src="res/ios/icon-72@2x.png" width="144" height="144" />
                  <!-- iPhone Spotlight and Settings Icon -->
                  <icon src="res/ios/icon-small.png" width="29" height="29" />
                  <icon src="res/ios/icon-small@2x.png" width="58" height="58" />
                  <!-- iPad Spotlight and Settings Icon -->
                  <icon src="res/ios/icon-50.png" width="50" height="50" />
                  <icon src="res/ios/icon-50@2x.png" width="100" height="100" />
         </platform>

#### Windows Phone8

         <platform name="wp8">
                  <icon src="res/wp/ApplicationIcon.png" width="99" height="99" />
                  <!-- tile image -->
                  <icon src="res/wp/Background.png" width="159" height="159" />
         </platform>

#### Windows8

         <platform name="windows8">
                  <icon src="res/windows8/logo.png" width="150" height="150" />
                  <icon src="res/windows8/smalllogo.png" width="30" height="30" />
                  <icon src="res/windows8/storelogo.png" width="50" height="50" />
         </platform>


