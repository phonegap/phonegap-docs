---
title: "Package for Release / Codesign"
layout: "tutorialspage"
next: /tutorials/distribute/02-submit
---

## Creating Release Builds

Creating a releaseable version of your application requires different steps depending on the platform. 

### iOS

1. Create a release version (use `--release` flag)
2. Open Xcode and select *Project -> Archive* or *Window -> Organizer -> Archive*
3. Select *Distribute -> Ad Hoc -> (your_provisioning_profile)
4. Export to res/release/ios/myApp-x.x.x-appstore.ipa

### Android

1. Create a release version (use `--release` flag)
...

### Windows

1. Create a release version (use `--release` flag)
...

**TODO: Separate tabs for this by platform**