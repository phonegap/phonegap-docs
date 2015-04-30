---
title: App Store Submission Tips
url: guides/distribute/app-store-submission-tips
layout: subpage
---

## Creating Release Builds

Creating a release ready version of your application requires different steps depending on the platform. 

### iOS
1. Ensure you have an Apple Developer Account
2. Ensure you have setup your certificates and provisioning files for app distribution via the Apple instructions
3. Run a cordova build on your device 
  $ cordova build ios --device
4. Open Xcode and select *Product -> Archive*
5. Window -> Organizer -> Archive*
6. Select Distribute -> Ad Hoc -> (your_provisioning_profile)
7. Export to res/release/ios/myApp-x.x.x-appstore.ipa

### Android
1. Set up signing files
2. Create a release version (use `--release` flag)
3. resources/release/android/
http://www.adamwadeharris.com/sign-publish-phonegap-app-google-play-store-windows/
http://www.adamwadeharris.com/android-automation/
...

### Windows

1. Create a release version (use `--release` flag)
2. Release file with .xap extension will be stored at  ../platforms/wp8/Bin/Release/
...

### Firefox OS

### Amazon Fire OS

**TODO: Separate tabs for this by platform**

### PhoneGap Build
- You can build for Android, iOS and Windows Phone using the PhoneGap Build service.
