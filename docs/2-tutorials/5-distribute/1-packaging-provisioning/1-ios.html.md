---
title: iOS Packaging and Provisioning
url: guides/distribute/packaging-provisioning/ios
layout: subpage
tab: iOS
---

## Steps
1. Ensure you have an [Apple Developer Account](http://developer.apple.com)
2. Ensure you have set up your [certificates](https://developer.apple.com/account/ios/certificate/certificateList.action?type=distribution)
 and [provisioning files](https://developer.apple.com/account/ios/profile/profileCreate.action) for app distribution via the Apple instructions.
 
 <div class="alert--warning">**NOTE:** You must choose a Production certificate and provisioning profile for App Store submission.</div>
3. Build the app with the `device` flag 
  `$ phonegap build ios --device`
  
4. Open Xcode and select **Product -> Archive**
5. Now select **Window -> Organizer -> Archive**
6. Select **Distribute -> Ad Hoc -> (your_provisioning_profile)**
7. Export to your file system - for instance at myAppProj/res/release/ios/myApp-x.x.x-appstore.ipa

