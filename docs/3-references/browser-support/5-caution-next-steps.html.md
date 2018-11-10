---
title: Caution / Next Steps
url: references/browser-support/caution-next-steps
layout: subpage
---

When you are developing an app to be consumed on a mobile device, it should go without saying that the best environment for testing is going to be that target device itself. Some things to specifically note and keep in mind while testing with the browser platform are listed below:

- The desktop browsers often differ in the support for certain features and APIs versus the mobile browsers, and between platforms. You should refer to the [Can I Use](http://caniuse.com) site for specific details of which features your apps use and what is supported.

   ![](/images/browser-support/caniuse.png)

- The browser does not have a soft keyboard to test with so you cannot test the effect it might have on the UI/screen layout when using form controls/input fields.
- Certain devices may support hardware features that cannot be tested in a desktop browser.
- Apache Cordova Plugins expose native features that can't always be mocked properly since they are native to a platform.
- The application is being served from an IP address rather than a filesystem affecting the way security is handled.
- Performance testing for things like low battery, poor network coverage, low available memory and interrupt testing for situations like incoming/outgoing calls, texts, notifications etc cannot be properly tested in the browser.

## Development/Testing Options:

1. Use the browser to develop as much of your app as possible with the tooling you already know and use daily while being aware of the limitations noted above.

1. Use the [PhoneGap Developer App](/references/developer-app/) on a physical device to pair and test your app being served from either the PhoneGap CLI or the PhoneGap Desktop App in addition to the browser platform. See the [Getting Started Guides](/getting-started/2-install-mobile-app/) for more details.

1. Get a compiled version of your app using the PhoneGap/Cordova CLI or [PhoneGap Build](http://build.phonegap.com) (to avoid having to set up platform SDK's) and test on the platforms you're targeting with a physical device or simulator. Apple provides the [iOS simulator](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html) as part of Xcode, and Google offers the [Android Emulator](http://developer.android.com/tools/help/emulator.html) as part of the Android developer tools. There's also the [Genymotion](http://genymotion.com/) emulator which can be used to test your Android apps and often runs faster than the  emulator packaged in the Android tooling.

1. Leverage mobile testing and automation services ([Sauce Labs](https://saucelabs.com), [Appium](http://appium.io/) etc) and mobile app intelligence services ([Apteligent](https://www.apteligent.com/), [Crashlytics](https://try.crashlytics.com/)) to provide crash test reporting and other analytics to ensure your app is providing the best user experience once delivered.

<div class="alert--info">**Note:** Make a point to check out this <a href='https://cordova.apache.org/docs/en/latest/guide/next/index.html'>Next Steps Guide</a> in the Apache Cordova docs for more information on testing, remote debugging and more.</div>
