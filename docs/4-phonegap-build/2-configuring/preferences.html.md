---
title: Preferences
url: phonegap-build/configuring/preferences
layout: subpage
---
**For a complete list of all of the preferences supported, refer to the [Apache Cordova config.xml preferences documentation](https://cordova.apache.org/docs/en/latest/config_ref/index.html#preference).**

PhoneGap utilizes the `<preference>` tag to customize your application configuration. All `<preference>` tags in your config.xml are copied to the platform-specific configuration files, which means that any preferences supported by the Cordova framework, or by any plugins you are using, will work on PhoneGap Build.

**Note**: make sure you select your Cordova version when looking at the Cordova docs page.

In addition, PhoneGap Build supports some of its own custom preferences, used for things like selecting the PhoneGap version, platform sdk version targeting, and others. These custom preferences are listed below.

If you want to see more detail about what exactly these custom preferences are doing, most of them are translated using the [open-source confetti library](http://github.com/phonegap-build/confetti). Check out the templates directory if you want to dig in.

## Multi-Platform

- [phonegap-version](#phonegap-version)
- [pgb-builder-version](#pgb-builder-version)
- [orientation](#orientation)
- [fullscreen](#fullscreen)
- [signing-key](#signing-key)

## iOS Only

- [target-device](#target-device)
- [prerendered-icon](#prerendered-icon)
- [detect-data-types](#detect-data-types)
- [exit-on-suspend](#exit-on-suspend)
- [deployment-target](#deployment-target)
- [swift-version](#swift-version)

## Android Only

- [android-versionCode](#android-versionCode)
- [android-build-tool](#android-build-tool)
- [android-minSdkVersion](#android-minSdkVersion)
- [android-maxSdkVersion](#android-maxSdkVersion)
- [android-targetSdkVersion](#android-targetSdkVersion)
- [android-installLocation](#android-installLocation)
- [android-windowSoftInputMode](#android-windowSoftInputMode)

**Note**: The **AndroidLaunchMode** preference is not currently supported on Phonegap Build. You can work around this by using the config-file element to set the value in your config.xml directly:

```xml
<config-file platform="android" parent="/manifest/application" mode="merge">
    <activity android:launchMode="singleTop" />
</config-file>
```

## Windows Only (cli-6.1.1 and above)

- [windows-arch](#windows-arch)
- [windows-identity-name](#windows-identity-name)

## Examples

- [Full sample config.xml](#example)
- [Platform selection](#platform-selection)

## Multi-Platform

<a name="phonegap-version" class="anchor"></a>
<div class='alert--warning'>**phonegap-version**: PhoneGap Build only -- the version of PhoneGap / Cordova to be used. For a list of currently supported PhoneGap versions, and a breakdown of the individual platform versions, <a href='https://build.phonegap.com/current-support'>go here</a>.</div>

<a name="orientation" class="anchor"></a>
<div class='alert--warning'>**orientation**: Device orientation; possible values are <code>default, landscape, or portrait</code>. Please note that <code>default</code> means <b>both</b> landscape and portrait are enabled. If you want to use each platform's default settings (usually portrait only), remove this tag from your config.xml file.</div>

<a name="fullscreen" class="anchor"></a>
<div class='alert--warning'>**fullscreen**: Makes your app full screen, with values <code>true or false</code>. This hides the status bar at the top, and is false by default. Note: may not be supported by newer versions of iOS, but users can use
the <a href='http://phonegap.com/blog/2014/01/30/customizing-your-android-manifest-and-ios-property-list-on-phonegap-build/'>config-file element on phonegap build</a>, and set UIViewControllerBasedStatusBarAppearance to false and UIStatusBarHidden to true.</div>

<a name="signing-key" class="anchor"></a>
<div class='alert--warning'>**signing-key**: specifies which signing key to use when building. This can either be the key's <code>id</code> or <code>title</code>. If a title is specified it will use the most recently uploaded key with that title. A <code>platform</code> must be specified either placing this preference inside a platform tag or adding a platform attribute.</div>

<a name="pgb-builder-version" class="anchor"></a>
<div class='alert--warning'>**pgb-builder-version**: With the release of cli-7.0.1 on PhoneGap Build, we did some refactoring of the build servers which may change how your app behaves. By default, this new builder is used for cli-7.0.1 and above, and the older builder is used for the older versions. However you can explicitly specify which builder to use ("1" for old builder, "2" for new builder). <a href='https://blog.phonegap.com/phonegap-7-0-1-now-on-build-and-it-includes-some-important-changes-89087fe465f5'>See this blog post for more info.</a></div>

## iOS Only

<a name="phonegap" class="anchor"></a>
<div class='alert--warning' id="target-device">**target-device**: For targeting a specific device; possible values are <code>handset, tablet, or universal</code>. Note that this currently only applies to iOS builds; by default all builds are universal.</div>

<a name="prerendered-icon" class="anchor"></a>
<div class='alert--warning'>**prerendered-icon**: This will cause iOS to not apply its gloss to the app's icon on the user's home screen; possible values are <code>true or false</code>, default is false.</div>

<a name="detect-data-types" class="anchor"></a>
<div class='alert--warning'>**detect-data-types**: Controls whether certain data types (such as phone numbers and dates) are automatically turned into links by the system. Defaults to "true" (as does the system web view). In preference to this, try using meta-tags:

    ```xml
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    ```

And use detect-data-types if meta tags don't work for you.</div>

<a name="exit-on-suspend" class="anchor"></a>
<div class='alert--warning'>**exit-on-suspend**: If set to true, app will terminate when suspended, for example when home button is pressed; default is <b>false</b>.</div>

<a name="deployment-target" class="anchor"></a>
<div class='alert--warning'>**deployment-target**: This sets the <code>IPHONEOS_DEPLOYMENT_TARGET</code> in the build, which tranlsates to the <code>MinimumOSVersion</code> in the ipa Property List.</div>

<a name="swift-version" class="anchor"></a>
<div class='alert--warning'>**swift-version**: This sets the <code>SWIFT_VERSION</code> for the build. Valid values are 2.3 or 3.0. Defaults to 3.0</div>

## Android Only

<a name="android-versionCode" class="anchor"></a>
<div class='alert--warning'>**android-versionCode**: Internal Android Version Code. Sets the <a href='https://developer.android.com/studio/publish/versioning.html'>version code</a> for the application. This number is used only to determine whether one version is more recent than another, with higher numbers indicating more recent versions.
Default is generated from version as MAJOR \* 10000 + MINOR \* 100 + PATCH, or 1 if version cannot be parsed.</div>

<a name="android-build-tool" class="anchor"></a>
<div class='alert--warning'>**android-build-tool**: Specifies which android build tool to use. Values can be `gradle` or `ant`. Defaults to `gradle` for android >= 5 or `ant` for android < 5.</div>

<a name="android-minSdkVersion" class="anchor"></a>
<div class='alert--warning'>**android-minSdkVersion**: Minimum Android SDK version. Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file - more details are in the Android documentation:(http://developer.android.com/guide/topics/manifest/uses-sdk-element.html). Defaults to 14 (Android >= 4.0).</div>

<a name="android-maxSdkVersion" class="anchor"></a>
<div class='alert--warning' id="android-maxSdkVersion">**android-maxSdkVersion**: Maximum Android SDK version. Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file - more details are in the <a href='http://developer.android.com/guide/topics/manifest/uses-sdk-element.html'>Android documentation</a>. Unset by default.</div>

<a name="android-targetSdkVersion" class="anchor"></a>
<div class='alert--warning'>**android-targetSdkVersion**:
Corresponds to the <code>usesSdk</code> attributes in the <code>AndroidManifest.xml</code> file -- an integer designating the API Level that the application targets. If not set, the default value equals that given to minSdkVersion. More details are in <a href='http://developer.android.com/guide/topics/manifest/uses-sdk-element.html#target'>the Android documentation</a>. Unset by default.</div>

<a name="android-installLocation" class="anchor"></a>
<div class='alert--warning'>**android-installLocation**: Where an app can be installed - defaults to <code>internalOnly</code> (as the Android SDK). <code>auto</code> or <code>preferExternal</code> allow the app to be installed on an SD card - this can lead to unexpected behavior. More details available in <a href='http://developer.android.com/guide/appendix/install-location.html'>the Android documentation</a>.</div>

<a name="android-windowSoftInputMode" class="anchor"></a>
<div class='alert--warning'>**android-windowSoftInputMode**: How the main window of the activity interacts with the window containing the on-screen soft keyboard. More details, and possible values, available in <a href='http://developer.android.com/guide/topics/manifest/activity-element.html#wsoft'>the Android documentation</a>.</div>

## Windows Only

<a name="windows-arch" class="anchor"></a>
<div class='alert--warning'>**windows-arch**: Select the architecture that your build targets. Valid values are `anycpu`, `arm`, `x86`, and `x64`. Supported by cordova-windows 4.x (cli-6.1.0) and above only.</div>

<a name="windows-identity-name" class="anchor"></a>
<div class='alert--warning'>**windows-identity-name**: Set the App Idenity Name in your App Manifest, necessary for publishing to the App Store. This preference must match the App Identity Name from your *Windows Dev Center Account -> App Management -> App Identity*. Supported by cordova-windows 4.x (cli-6.1.0) and above only.</div>

<a name="windows-appx-target" class="anchor"></a>
<div class='alert--warning'>**windows-appx-target**: Which of the supported Windows platforms you wish to target. Supported values are `uap` (Windows 10 Mobile / Universal), `8.1-phone`, `8.1-win`. Supported by cordova-windows 4.x (cli-6.1.0) and above only.</div>

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
