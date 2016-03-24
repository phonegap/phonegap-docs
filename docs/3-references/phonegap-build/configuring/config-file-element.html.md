---
title: Modifying Platform Manifests
url: references/phonegap-build/configuring/config-file-element
layout: subpage
expand: build-configuring
---

PhoneGap Build aims to take away the pains of configuring SDKs and compiling native applications so you can focus on writing great code. As part of this, we obfuscate management of the platform configuration files -- namely your [Android Manifest](http://developer.android.com/guide/topics/manifest/manifest-intro.html) (AndroidManifest.xml) and your [iOS Property List](https://developer.apple.com/library/iOS/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) (Info.plist). We configure these files based on the preferences you specify in your app's config.xml file. However, the specifications of these xml files are constantly changing, and it would be impossible for us to expose all of the possible configurations through the use of simple preferences. So for those cases that we haven't covered, you can contribute xml directly to your Android Manifest and iOS Propertly List files, via the `config-file` element (beta feature).


The `config-file` spec is based on the [config-file element in PhoneGap's plugin.xml spec](http://docs.phonegap.com/en/3.3.0/plugin_ref_spec.md.html#Plugin%20Specification_config_file_element), though has a slightly different implementation. 

    <config-file platform="ios" parent="SomeXMLElement" mode="replace">
        <SomeXMLElement someAttribute="text" >Go Skiing</SomeXMLElement>
    </config-file>


* **`platform`**: currently supported values are `ios` (Info.plist) and `android` (AndroidManifest.xml)
* **`parent`**: on iOS this will be the plist key you wish to modify; on android this will be an xpath string resolving to the parent of the xml element inside of which your xml will be injected
* **`mode`**: `add`, `replace`, `merge`, or `delete` -- how to modify the parent element. `add` will append to the inner xml of the parent, `replace` will completely overwrite the parent's inner xml with your declaration, `merge` will attempt to find elments of the same name and merge their attributes, and `delete` will search for elements matching the specifed name and attributes and delete them.

### iOS

As an example on iOS, if you wish to restrict the orientation of an application, you can use the orientation preference in config.xml, where

    <preference name="orientation" value="portrait" />

will translate to the following in your iOS Property List:

    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
      </array>

But suppose you don't want to allow PortraitUpsideDown? So specify your own xml for this property instead:

    <config-file platform="ios" parent="UISupportedInterfaceOrientations" mode="replace">
        <array>
            <string>UIInterfaceOrientationLandscapeOmg</string>
        </array>
    </config-file>

To check and debug the resulting Property List file, simply rename your .ipa file to .zip, unzip it, and examine the Info.plist file.


### Android

**Important: When targeting Android with the config-file element, you'll need to declare the android xml namespace in the widget element of your config.xml, otherwise your document will not pass our xml validation:**

    <widget xmlns       = "http://www.w3.org/ns/widgets"
        xmlns:gap       = "http://phonegap.com/ns/1.0"
        xmlns:android   = "http://schemas.android.com/apk/res/android"
        id              = "com.lumberg.greeeaaat"
        version         = "1.0.0">

For an Android example suppose you want to modify the screen sizes supported by your application, through the supports-screens element in the Android Manifest. Here is the default in a PhoneGap Build AndroidManifest.xml:

    <supports-screens android:anyDensity="true" android:resizeable="true" 
        android:smallScreens="true" 
        android:normalScreens="true" 
        android:largeScreens="true" 
        android:xlargeScreens="true" />

To disable support for all but normalScreens, set them to false:

    <config-file platform="android" parent="/manifest" mode="merge">
        <supports-screens 
            android:xlargeScreens="false" 
            android:largeScreens="false" 
            android:smallScreens="false" />
    </config-file>

Your xml will be merged with the default manifest xml, and when conflicts occur, your specified values will take precedence. To check and debug the resulting Android Manifest, you can use the [Android apk-tool](https://code.google.com/p/android-apktool/) to unpack your compiled apk, and examine the AndroidManifest.xml.


If you have any questions about using this beta feature, [don't hesitate to ask](http://community.phonegap.com/nitobi).
