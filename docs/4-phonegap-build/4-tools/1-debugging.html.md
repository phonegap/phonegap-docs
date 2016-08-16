---
title: Debugging
url: phonegap-build/tools/debugging
layout: subpage
---

PhoneGap is an embedded webview, and both Android and iOS provide tools for debugging web applications running on mobile devices. These tools allow you to inspect HTML and CSS, as well as run and debug Javascript code.

- [**iOS**: Safari Web Inspector](#safari-web-inspector)
- [**Android**: Chrome Developer Tools](#chrome-developer-tools)
- [**Windows Phone**: Visual Studio Web Debugging Tools](#visual-studio-debug-tools)
- [Weinre Remote Debugger](/phonegap-build/tools/weinre)
- [Debugging Crashes and Native Exceptions](#crashes-and-native-exceptions)

## Safari Web Inspector

Steps:

1. Connect your iOS device to your computer
1. Launch Safari
1. Launch your PhoneGap application on your iOS Device
1. Open Safari's **Develop** menu, and you should see your iOS Device listed.
1. Select your PhoneGap Webview listed under your device.

More info can be found on the [Apple Developer Website](https://developer.apple.com/safari/tools/).

## Chrome Developer Tools

1. [Ensure Developer Options are enabled on your Android test device](http://developer.android.com/tools/device.html#developer-device-options).
1. Launch Google Chrome Web Browser.
1. Navigate to chrome://inspect in Chrome.
1. Select your PhoneGap Application running on your device, and the Developer tools will launch.

## Visual Studio Debug Tools

[See the Microsoft Blog Post](https://blogs.msdn.microsoft.com/visualstudioalm/2014/04/04/diagnosing-mobile-website-issues-on-windows-phone-8-1-with-visual-studio/).

## Crashes and Native Exceptions

If your PhoneGap application is crashing or freezing, or if the Javascript Console shows no errors, you may need to use the Native SDKs in order to debug your application:

### iOS

- [Debugging Deployed iOS Apps](https://developer.apple.com/library/ios/qa/qa1747/_index.html)
- There may also be third party applications which allow you to view your **iOS Device Console**.

### Android

- Download and install the Android SDK. Attach your device to your computer, and run `adb logcat` to view your device logs and watch for Exceptions.

### Windows Phone

- See [Microsft Visual Studio](https://www.visualstudio.com/en-us/visual-studio-homepage-vs.aspx).
