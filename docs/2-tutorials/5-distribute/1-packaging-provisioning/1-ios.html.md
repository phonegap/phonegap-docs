---
title: iOS Packaging and Provisioning
url: distribute/packaging-provisioning/ios
layout: subpage
tab: iOS
write: false
---


## Steps
1. Ensure you have an [Apple Developer Account](http://developer.apple.com)
2. Ensure you have set up your [certificates](https://developer.apple.com/account/ios/certificate/certificateList.action?type=distribution)
 and [provisioning files](https://developer.apple.com/account/ios/profile/profileCreate.action) for app distribution via the Apple instructions.
 
 <div class="alert--warning">**NOTE:** You must choose a Production certificate and provisioning profile for App Store submission.</div>
 
 <div class="alert--info">**TIP:** At this point you could choose to use the [PhoneGap Build](https://build.phonegap.com) cloud service to package your app, just keep
 the resources set up in the above steps handy for necessary provisioning and code signing.</div>

3. Build the app using the PhoneGap CLI with the `device` flag: 

  `$ phonegap build ios --device`
  
Next you need to use Xcode to create an application archive and then export it to it's final .ipa format.

1. Open the project in Xcode by opening your `xcodeproj` file located in your *myApp/platforms/ios* folder. Here's an example using the command line from your 
root project folder. You could also select the file in Finder and double click it to open. 
  
  `$ open platforms/ios/*.xcodeproj`
  
2. With the project open in Xcode, select **Product -> Archive** in the top menu bar of Xcode
  You will see messages indicating the progress while it's being archived and a notification when the build is completed.
<div class="alert--warning">**NOTE:** If it's greyed out, it's probably because your scheme (the target for your application up in the top left corner in Xcode) is set to an emulator rather than your actual device.</div>

  ![](/images/xcode-scheme.png)
  
3. Next select **Window -> Organizer -> Archive** and find it in the listing of archives (most recent at top).
  ![](/images/xcode-organizer-archives.png)

4. Click on your app in the list of archives, then select **Export** from the right panel: 
   ![](/images/xcode-archive-export.png)
   
5. Select the radio button next to the distribution choice desired if you want to submit somewhere outside of the iOS App Store. 
   ![](images/xcode-organizer-export-method.png)
   
5. You'll be prompted to select your Apple ID associated with your Developer Account and then after the required provisioning and signing checks have been made, you'll be prompted to save to your file system.

 ** Notice the final product exported is a file with an *.ipa* extension. Keep track of where you put this, you will need it for submitting your application to the app store. **

### Recommend Reference
 - Read [this page](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html)
 for important details on using Xcode to create a package and associating your provisioning files.
  
