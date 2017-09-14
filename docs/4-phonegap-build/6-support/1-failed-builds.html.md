---
title: Failed Builds
url: phonegap-build/support/failed-builds
layout: subpage
---

At  PhoneGap Build, we do our best to take any package you submit and build a cross-platform mobile application from it. However, sometimes that won't work: platforms have their own quirks, and sometimes our site has some quirks too. Here are some errors you may receive, and how you can fix them.

## App is pending on all platforms for over ten minutes

This usually means something has gone wrong on our end. Please [contact us](http://community.phonegap.com) to let us know.

<a name="no_index"></a>

## App has no index.html

PhoneGap Build, and PhoneGap/Cordova apps in general, require a file named `index.html` in your app. This is used as the starting point where your app will initialize.

Please ensure that you have an `index.html` in your application.

<a name="phonegap_unsupported"></a>

## PhoneGap version not supported

You have specified a `phonegap-version` in your `config.xml` file that is not currently supported by PhoneGap Build. Please see out [config.xml docs](../../configuring) to see which releases are currently supported.

<a name="invalid_filename"></a>

## Invalid File/Directory name

Mobile filesystems are very picky about certain filenames - in particular, they don't allow files with non-ASCII characters, such as Chinese or Arabic letters. Please rename any files with non-ASCII characters, and your app should build successfully.

<a name="malformed_config"></a>

## Malformed config.xml

We were unable to successfully parse the `config.xml` file that you provided - it most likely is not well-formed XML.

Please check whether your `config.xml` is valid XML - you can use the [W3C validator](http://validator.w3.org) to do this - and make any necessary changes to fix it.

<a name="file_exists"></a>

## Plugin File Exists

We were unable to install a plugin as a file injected for the plugin already exists in your www folder.

This is commonly the Javascript files used by the plugin. The script links to these files should be present in your index.html but the files themselves should not be included in your app before uploading to build.

<a name="plugin_unsupported"></a>

## Plugin not supported

The plugin (or plugin version, if specified) referenced in your config.xml is not supported on PhoneGap build.

Please visit the [plugins page](https://build.phonegap.com/plugins) to view all supported plugins.

<a name="plugin_parameter_missing"></a>

## One of your plugins requires a parameter

One of the plugins included in your app requires a parameter that is not included in your config.xml.

Please read the documentation of the plugin to get a list of all required parameters. Please visit the [plugins page](https://build.phonegap.com/plugins) to view all supported plugins.

## Windows Phone build has failed

<a name="winphone-config-file"></a>

### Error adding config-file element

The build has failed as your config.xml may contain `config-file` elements that will produce a malformed or illegally formatted `WMAppManifest.xml` file. The `WMAppManifest.xml` for windows phone projects has a [strictly defined format](https://msdn.microsoft.com/library/windows/apps/ff769509.aspx). Make sure your `config-file` elements are valid. A common error is not defining a xmlns namespace for an element eg. `<tag xmlns=""></tag>`

<a name="path_too_long"></a>

### Path too long

The MSBuild build tools enforce a maximum path size of 260 characters. If a file in your app has a path longer than 260 you will get this error. To fix this error please move/rename the any file that may be longer than this limit. N.B. although 260 characters is the MSBuild maximum PhoneGap Build does use around 25 characters in the app root path on the file system. So an operational maximum shouldbe around 220.

## iOS build has failed

<a name="libpng"></a>

### Icon or splash screen is not a png file

When building for iOS, the PhoneGap framework assumes that the image files provided for display in the system - as icons or splash screens - are in the Portable Network Graphics, `png`, format. If you've gotten this error, you've provided image files in a different format, or corrupted png files. Please check those files to ensure that they are valid pngs, and rebuild.

<a name="no_cert"></a>

### Certificate not found

Your app was submitted without an associated signing certificate and keychain pair. Please ensure that you've [added the key to your PhoneGap Build account](https://build.phonegap.com/people/edit), and that you've associated that key with your app on the app edit page.

<a name="cert_import"></a>

### Unable to import certificate

Our servers were unable to use the certificate you provided with the password that you provided. Because we could not import the certificate into our keychain, we were unable to sign an app with the certificate.

Please try uploading your certificate again, ensuring that you supply the correct credentials with it.

<a name="cert_profile_mismatch"></a>

### Certificate doesn't match profile

Our servers were unable to sign your app using the profile and certificate that you uploaded, because the identity listed on the profile did not match the one on the certificate. This could be because you uploaded a developer profile with a distribution certificate, or vice versa.

Try generating a new provisioning profile that matches your certificate, and uploading that to PhoneGap Build.

<a name="cert_or_profile_expired"></a>

### Provisioning Profile or Signing Certificate has expired

Our servers were unable to sign your app using the profile and certificate that you uploaded, because the either the provisioning profile or signing certificate has expired.

You will need to generate a new provisioning profile or signing certificate from the Apple Developer Portal and upload that to PhoneGap Build before your app can build successfully.

<a name="unreadable_profile"></a>

### Unable to read provisioning profile

Our servers were unable to sign your app using the profile and certificate that you uploaded, because we could not read/parse your provisioning profile.

Please check that the `mobileprovision` file you have uploaded is a valid provisioning profile from the Apple Developer Portal. If you've made an error, please ensure you have a valid profile available and upload that to PhoneGap Build before rebuilding your app.

## Android build has failed

<a name="keystore"></a>

### Keystore Issues

All of the following error messages represent issues with your Android signing keys:

* `Keystore alias not recognized`
* `Invalid keystore format`
* `Incorrect keystore password`
* `Alias not associated with private key`

If you received one of these errors, then the Android `jarsigner` was not able to sign your app with the key and keystore you provided.

If the alias is not recognized, the `alias` field you provided was not found on the `keystore` file that you uploaded. If the keystore format was invalid, you may not have uploaded the correct files. If the password was incorrect, you may have entered it incorrectly.

In each of these cases, check that you have the correct keystore files, and the correct password and alias details for your keystore. You may need to reupload your Android keys for your signed build to succeed.

<a name="identical_filenames"></a>

### Identical filenames

The Android filesystem, unlike many desktop operating systems, is case-insensitive -- you cannot have a file called `index.html` and a file called `index.html` in the same Android app package.

Delete one of the files, and your app should build successfully.

<a name="gz_asset_error"></a>

### Compressed File Error

The Android tool chain for compiling your app includes a step that compresses all your files inside your application.  This step will fail if your app contains a compressed file (.gz) file.

Delete all compressed files from your application.

<a name="invalid_package_identifier"></a>

### Invalid application identifier

Cordova requires a valid application identifier for your application. This identifier should be in the reverse-domain name style and for maximum compatibility should contain only letters, digits and underscores.

The identifier should be unique. The identifier may contain uppercase or lowercase letters ('A' through 'Z'), numbers, and underscores ('_'). However, individual package name parts may only start with letters.

The identifier also cannot contain any Java reserved keywords eg. class, default etc. They are listed [here](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html).

Complete information can be found under `package` in the [android documentation](http://developer.android.com/guide/topics/manifest/manifest-element.html#package).

<a name="malformed_9_patch"></a>

### Malformed 9 Patch image

9-Patch drawables (eg. splashcreen.9.png) must be valid 9-patch images with all required transparent borders present. Android documentation regarding 9-patch images can be found [here](http://developer.android.com/guide/topics/graphics/2d-graphics.html#nine-patch).

To ensure a valid image there is an Android 9-patch drawing tool. This can be downloaded as part of the [Android SDK](http://developer.android.com/sdk). Documentation for this tool can be found [here](http://developer.android.com/tools/help/draw9patch.html). For most errors simply loading and re-saving the image with this tool will correct the image.

<a name="invalid_minsdkversion"></a>

### Invalid minSdkVersion

As PhoneGap 4.x moves to Gradle builds minSdkVersion will now be enforced. This means the minSdkVersion of your application, as set in your [config.xml](../../configuring/preferences) or the default (14 for phonegap 4.x) must be greater than any Libraries included in the application. Typically these libraries will be part of a plugin. To find out the minSdkVersion for a particular plugin it is typically in the AndroidManifest.xml file.  The value can also be seen in the error message contained in the build log file of the failed build.

To fix this error add a preference `<preference name="android-minSdkVersion" value="14" />` being sure the value is equal to or higher than the minSdkVersion specified in any included plugins.

To override this enforcement (advanced users only) you can overwrite the entire `uses-sdk` AndroidManifest.xml fragment.

    <config-file platform="android" parent="/manifest">
        <uses-sdk tools:overrideLibrary="org.apache.cordova,com.library.plugin" />
    </config-file>

For the brave the documentation is [here](http://tools.android.com/tech-docs/new-build-system/user-guide/manifest-merger#TOC-tools:overrideLibrary-marker).

<a name="plugin-error"></a>

## Plugin error

The most likely cause for this error is error is that you have included plugin  javascript files in your app package, such as barcodescanner.js, GAPlugin.js,  cdv-plugin-fb-connect.js, or any other plugin files such as the childbrowser  assets directory.

Previously we used pluginstall to install plugins, which would simply overwrite files in your app. However we recently migrated to plugman, which will not overwrite these files and instead fails. So make sure you remove them!

If you're receiving a different error then please [let us know](https://forums.adobe.com/community/phonegap/build), and we can update this document.
