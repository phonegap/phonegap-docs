---
title: Preferences
url: phonegap-build/configuring/preferences
layout: subpage
---
PhoneGap utilizes the `<preference>` tag to customize your application configuration. All `<preference>` tags in your config.xml are copied to the platform-specific configuration files, which means that any preferences [supported by the PhoneGap framework](http://docs.phonegap.com/en/edge/config_ref_index.md.html#The%20config.xml%20File), or by any plugins you are using, will work on PhoneGap Build.

**Note**: make sure you select your PhoneGap version when looking at the PhoneGap docs page.

In addition, PhoneGap Build supports some of its own custom preferences, used for things like selecting the PhoneGap version, platform sdk version targeting, and others. These custom preferences are listed below.

If you want to see more detail about what exactly these custom preferences are doing, most of them are translated using the [open-source confetti library](http://github.com/phonegap-build/confetti). Check out the templates directory if you want to dig in.

## Multi-Platform

- [phonegap-version](#phonegap-version)
- [orientation](#orientation)
- [fullscreen](#fullscreen)

## iOS Only

- [target-device](#target-device)
- [prerendered-icon](#prerendered-icon)
- [detect-data-types](#detect-data-types)
- [exit-on-suspend](#exit-on-suspend)
- [deployment-target](#deployment-target)

## Android Only

- [android-build-tool](#android-build-tool)
- [android-minSdkVersion](#android-minSdkVersion)
- [android-maxSdkVersion](#android-maxSdkVersion)
- [android-targetSdkVersion](#android-targetSdkVersion)
- [android-installLocation](#android-installLocation)
- [android-windowSoftInputMode](#android-windowSoftInputMode)

## Windows Only (cli-6.1.1 and above)

- [windows-arch](#windows-arch)
- [windows-identity-name](#windows-identity-name)

## Examples

- [Full sample config.xml](#example)
- [Platform selection](#platform-selection)

## Multi-Platform

<div class='alert--warning' id="phonegap-version">**phonegap-version**: The version of PhoneGap / Cordova used. For a list of currently supported PhoneGap versions, and a breakdown of the individual platform versions, [go here](https://build.phonegap.com/current-support).</div>

<div class='alert--warning' id="orientation">**orientation**: Device orientation; possible values are <code>default, landscape, or portrait</code>. Please note that <code>default</code> means <b>both</b> landscape and portrait are enabled. If you want to use each platform's default settings (usually portrait only), remove this tag from your config.xml file.</div>

<div class='alert--warning' id="fullscreen">**fullscreen**: Makes your app full screen, with values <code>true or false</code>. This hides the status bar at the top, and is false by default. Note: may not be supported by newer versions of iOS, but users can use
the [config-file element on phonegap build](http://phonegap.com/blog/2014/01/30/customizing-your-android-manifest-and-ios-property-list-on-phonegap-build/), and set UIViewControllerBasedStatusBarAppearance to false and UIStatusBarHidden to true.</div>

## iOS Only

<div class='alert--warning' id="target-device">**target-device**: For targeting a specific device; possible values are <code>handset, tablet, or universal</code>. Note that this currently only applies to iOS builds; by default all builds are universal.</div>

<div class='alert--warning' id="prerendered-icon">**prerendered-icon**: This will cause iOS to not apply its gloss to the app's icon on the user's home screen; possible values are <code>true or false</code>, default is false.</div>

<div class='alert--warning' id="detect-data-types">**detect-data-types**: Controls whether certain data types (such as phone numbers and dates) are automatically turned into links by the system. Defaults to "true" (as does the system web view). In preference to this, try using meta-tags:

    ```xml
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    ```

And use detect-data-types if meta tags don't work for you.</div>

<div class='alert--warning' id="exit-on-suspend">**exit-on-suspend**: If set to true, app will terminate when suspended, for example when home button is pressed; default is <b>false</b>.</div>

<div class='alert--warning' id="deployment-target">**deployment-target**: This sets the <code>IPHONEOS_DEPLOYMENT_TARGET</code> in the build, which tranlsates to the <code>MinimumOSVersion</code> in the ipa Propertly List.</div>

## Android Only

<div class='alert--warning' id="android-build-tool">**android-build-tool**: Minimum Android SDK version. Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file - more details are in [the Android documentation](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html). Defaults to 14 (Android 4.0, 4.0.1, 4.0.2).</div>

<div class='alert--warning' id="android-minSdkVersion">**android-minSdkVersion**: Minimum Android SDK version. Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file - more details are in [the Android documentation](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html). Defaults to 14 (Android 4.0, 4.0.1, 4.0.2).</div>

<div class='alert--warning' id="android-maxSdkVersion">**android-maxSdkVersion**: Maximum Android SDK version. Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file - more details are in [the Android documentation](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html). Unset by default.</div>

<div class='alert--warning' id="android-targetSdkVersion">**android-targetSdkVersion**:
Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file -- an integer designating the API Level that the application targets. If not set, the default value equals that given to minSdkVersion. More details are in [the Android documentation](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html#target). Unset by default.</div>

<div class='alert--warning' id="android-installLocation">**android-installLocation**: Where an app can be installed - defaults to <code>internalOnly</code> (as the Android SDK). <code>auto</code> or <code>preferExternal</code> allow the app to be installed on an SD card - this can lead to unexpected behavior. More details available in [the Android documentation](http://developer.android.com/guide/appendix/install-location.html).</div>

<div class='alert--warning' id="android-windowSoftInputMode">**android-windowSoftInputMode**: How the main window of the activity interacts with the window containing the on-screen soft keyboard. More details, and possible values, available in [the Android documentation](http://developer.android.com/guide/topics/manifest/activity-element.html#wsoft).</div>

## Windows Only

<div class='alert--warning' id="windows-arch">**windows-arch**: Select the architecture that your build targets. Valid values are `anycpu`, `arm`, `x86`, and `x64`.</div>

<div class='alert--warning' id="windows-identity-name">**windows-identity-name**: Set the App Idenity Name in your App Manifest, necessary for publishing to the App Store. This preference must match the App Identity Name from your *Windows Dev Center Account -> App Management -> App Identity*.</div>

<a class="anchor" id="example"></a>

## Example Config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<widget xmlns   = "http://www.w3.org/ns/widgets"
    xmlns:gap   = "http://phonegap.com/ns/1.0"
    id          = "com.phonegap.example"
    versionCode = "10"
    version     = "1.0.0" >

  <name>PhoneGap Example</name>
  <description>
      An example for phonegap build docs.
  </description>
  <author href="https://build.phonegap.com" email="support@phonegap.com">
      wildabeast
  </author>

  <!-- all platforms -->
  <preference name="phonegap-version" value="cli-6.0.0" />
  <preference name="orientation" value="landscape" />
  <preference name="fullscreen" value="true" />

  <!-- iOS only -->
  <preference name="target-device" value="universal" />
  <preference name="prerendered-icon" value="true" />
  <preference name="detect-data-types" value="true" />
  <preference name="exit-on-suspend" value="true" />
  <preference name="deployment-target" value="7.0" />

  <!-- Android only -->
  <preference name="android-build-tool" value="ant|gradle" />
  <preference name="android-minSdkVersion" value="10" />
  <preference name="android-maxSdkVersion" value="15" />
  <preference name="android-targetSdkVersion" value="12" />
  <preference name="android-installLocation" value="auto" />
  <preference name="android-windowSoftInputMode" value="stateVisible|adjustResize" />
</widget>
```

## Platform Selection

By default, preferences are for all platforms. To specify a preference to be for a single platform you can place any preference inside a platform tag.

```xml
<platform name="ios" >
  <preference name="orientation" value="landscape" />
</platform>

<platform name="android" >
  <preference name="orientation" value="portrait" />
</platform>
```

This fragment will make the iOS app be available in landscape orientation while the android app will be in portrait mode.
