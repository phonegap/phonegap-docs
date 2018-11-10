---
title: Custom Build
url: references/developer-app/custom-build/ios
layout: subpage
tabs:
   - label: iOS
     url: references/developer-app/custom-build/ios
   - label: Windows Phone
     url: references/developer-app/custom-build/win
---

Since the PhoneGap Developer App is an open source project, you could also use it to create your own custom builds. This may be useful if you want to add your own 3rd party plugins or specific settings and distribute it to a team of testers for instance. You could also use this option to allow the use of more remote debugging tools when you're running it locally rather than being flagged as a release build.

## Steps

1. Open your terminal application and clone the [PhoneGap Developer app repo](https://github.com/phonegap/phonegap-app-developer) git project and `cd` into it:

  ```sh
  $ git clone https://github.com/phonegap/phonegap-app-developer.git
  $ cd phonegap-app-developer/
  ```

1. Install the node dependencies:

  ```sh
  $ npm install
  ```

1. Next, from the main project folder (`<your-path>/phonegap-app-developer`) open the **config.xml** file. Within the root `widget` element, modify the `id` attribute to set your own unique app bundle id.

  ```xml
  <?xml version='1.0' encoding='utf-8'?>
  <widget id="org.mycompany.phonegap.app" version="1.5.4" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">
  ```

1. Run the `build` command for iOS on the command line in the root of the project:

  ```sh
  $ cordova platform add ios
  $ cordova build ios
  ```

  <div class='alert--warning'>
    <p>At this point the build may fail with code signing errors due to provisioning if it did not associate your app id with one of your valid provisioning profiles with an error such as below:</p>

    <pre class="highlight"><code class="hljs sh">Check dependencies
    Code Sign error: No matching provisioning profile found: Your build settings specify a provisioning profile with the UUID &lt;some-uuid&gt;, however, no such provisioning profile was found.</pre></code>

    <pre class="highlight"><code class="hljs sh">CodeSign error: code signing is required for product type 'Application' in SDK 'iOS 8.4' BUILD FAILED</pre></code>

    <p>The easiest way to fix this issue is to open the **PhoneGap.xcodeproj** file in the `platforms/ios` subfolder with Xcode and build/run it there. You will be prompted to fix it using your Apple Developer account settings.</p>
  </div>

1. Run the app on your mobile device:

  Once you have your own build running successfully on your iOS device, you can modify it at any time to add custom plugins or other settings as desired. You can also use Safari or Chrome Remote debugging to help you debug your apps more easily since it's no longer packaged as a release build for the App Store.

  <img class="mobile-image" src="/images/custom-build1.png" alt="Developer app, custom build"/>

### Video Demo

In this short video we are running a locally built version of the PhoneGap Developer app on iOS with the addition of a 3rd party Social Sharing plugin built into it for sending text messages and some visual updates to the color and label of the wrapper to show that it's a custom build.

![](/images/ios-custom-build.gif)

### Distributing Your Custom Build

If you want to distribute your version of the PhoneGap Developer app to others for testing on your team then you'll need to continue with a couple more steps explained in the next section.

1. To package for distribution you'll need to start by building an Xcode product archive for your version of the app. Open the project in Xcode (by opening the **PhoneGap.xcodeproj** file) if you haven't already and select **Product -> Archive**. Once it completes the archive steps you should see it show up in the list of archives in the Xcode Organizer window as shown below.

  ![Xcode Organizer](/images/xcode-organizer.png)

  <div class='alert--warning'>If the **Archive** menu item appears disabled then double check to ensure you have your actual iOS device selected as the active *scheme*. It will not be selectable if a simulator is currently set.</div>

  <div class='alert--tip'>**TIP:** You can manually open the Organizer window by clicking **Window -> Organizer** in the Xcode menu as well.</div>

1. Once you locate the PhoneGap archive in the Xcode Organizer, you'll need to choose it for Export. Select the archive and click the **Export** button in the right-hand menu. You'll be prompted with the following dialog where you can choose the type of distribution you desire:

  ![Xcode Organizer](/images/ad-hoc.png)

1. You'll be prompted to select your Apple ID associated with your Developer Account and then after the required provisioning and signing checks have been made, you'll be prompted to save to your file system. It will be saved as an **.ipa** package you can then distribute as needed.

  ** Notice the final product exported is a file with an *.ipa* extension. Keep track of where you put this since you will need it for submitting your application to the app store. **

<div class="alert--tip">**TIP:** If you are stuck in the packaging or provisioning process, check out <a href='https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html'>this page</a> for specific details on the process.</div>
