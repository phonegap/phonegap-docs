---
title: "Adding Custom Splash Screens"
layout: "tutorialspage"
next: /tutorials/configure/03-config-elements
---

## Splash Screen Configuration

## Configuring Splash Screens in config.xml

In the top-level `config.xml` file (not the one in `platforms`), add configuration elements like those specified here.

# Example configuration 

Please notice that the value of the "src" attribute is relative to the project directory and not to the www directory.
You can name the source image whatever you like. The internal name in the app are determined by Cordova.

    <platform name="android">
        <!-- you can use any density that exists in the Android project -->
        <splash src="res/screen/android/splash-land-hdpi.png" density="land-hdpi"/>
        <splash src="res/screen/android/splash-land-ldpi.png" density="land-ldpi"/>
        <splash src="res/screen/android/splash-land-mdpi.png" density="land-mdpi"/>
        <splash src="res/screen/android/splash-land-xhdpi.png" density="land-xhdpi"/>

        <splash src="res/screen/android/splash-port-hdpi.png" density="port-hdpi"/>
        <splash src="res/screen/android/splash-port-ldpi.png" density="port-ldpi"/>
        <splash src="res/screen/android/splash-port-mdpi.png" density="port-mdpi"/>
        <splash src="res/screen/android/splash-port-xhdpi.png" density="port-xhdpi"/>
    </platform>

    <platform name="ios">
        <!-- images are determined by width and height. The following are supported -->
        <splash src="res/screen/ios/Default~iphone.png" width="320" height="480"/>
        <splash src="res/screen/ios/Default@2x~iphone.png" width="640" height="960"/>
        <splash src="res/screen/ios/Default-Portrait~ipad.png" width="768" height="1024"/>
        <splash src="res/screen/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>
        <splash src="res/screen/ios/Default-Landscape~ipad.png" width="1024" height="768"/>
        <splash src="res/screen/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>
        <splash src="res/screen/ios/Default-568h@2x~iphone.png" width="640" height="1136"/>
        <splash src="res/screen/ios/Default-667h.png" width="750" height="1334"/>
        <splash src="res/screen/ios/Default-736h.png" width="1242" height="2208"/>
        <splash src="res/screen/ios/Default-Landscape-736h.png" width="2208" height="1242"/>
    </platform>

    <platform name="wp8">
        <!-- images are determined by width and height. The following are supported -->
        <splash src="res/screen/wp8/SplashScreenImage.jpg" width="768" height="1280"/>
    </platform>

    <platform name="windows8">
        <!-- images are determined by width and height. The following are supported -->
        <splash src="res/screen/windows8/splashscreen.png" width="620" height="300"/>
    </platform>

    <platform name="blackberry10">
        <!-- Add a rim:splash element for each resolution and locale you wish -->
        <!-- http://developer.blackberry.com/html5/documentation/rim_splash_element.html -->
        <rim:splash src="res/screen/windows8/splashscreen.png"/>
    </platform>


    <preference name="SplashScreenDelay" value="10000" />

# Supported platforms 

As of now (Cordova 3.5.0 July 2014) the following platforms support splash screens.

    android
    ios
    wp8
    windows8
    blackberry10

# Splashscreen Plugin

  Apache Cordova also offers special splash screen plugin which could be used to programmatically display and hide a splash screen during application launch
  https://github.com/apache/cordova-plugin-splashscreen

