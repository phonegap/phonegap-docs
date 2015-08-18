---
title: Custom PhoneGap Developer App Build
url: references/developer-app/custom-build
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/developer-app/custom-build.html.md
layout: subpage
---

The PhoneGap Developer App is an open source project, so you are free to clone it and create your own custom build. This may be useful if you 
 want to add your own 3rd party plugins or specific settings and distribute it to a team of testers for instance. This would also allow for the 
 use of more remote debugging tools when you're running it locally rather than being flagged as a release build. 

Below are the steps to take to create your custom build for Mac and Windows. 

### Mac OSX
1. Open your terminal application and clone the [PhoneGap Developer app repo](https://github.com/phonegap/phonegap-app-developer) git 
 project and `cd` into it: 

       $ git clone https://github.com/phonegap/phonegap-app-developer.git
       $ cd phonegap-app-developer/

2. Install the node dependencies:
    
        $ npm install        
 
3. Next, `cd` into the `www` folder (`<your-path>/phonegap-app-developer/www`) and open the **config.xml** file. Within the root &lt;widget&gt;
element, modify the `id` attribute to set your own unique app bundle id.
 
   `<?xml version='1.0' encoding='utf-8'?>`
    `<widget` `**id="org.mycompany.phonegap.app"**` `version="1.5.4" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">`
                
4. Run the `build` command for iOS on the command line in the root of the project:  

        $ cordova build ios
      
  <div class='alert--warning'>At this point the build may fail with code signing errors due to provisioning if it did not associate your app id with one of your 
  valid provisioning profiles with an error such as below:
     
      Check dependencies
      Code Sign error: No matching provisioning profile found: Your build settings specify a provisioning profile with the UUID “xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx”, however, no such provisioning profile was found.
      CodeSign error: code signing is required for product type 'Application' in SDK 'iOS 8.4'
      
     `** BUILD FAILED **`
           
  The easiest way to fix this issue is to open the **phonegap-app-developer/platforms/ios/PhoneGap.xcodeproj** file in Xcode and build/run it there. 
  You will be prompted to fix it using your Apple Developer account settings.</div>
     
   
Once you have your own build running successfully on your iOS device, you can modify it at any time to add custom plugins or other
 settings as desired. You can also use Safari or Chrome Remote debugging to help you debug your apps more easily since it's no longer packaged 
 as a release build for the App Store.   

 <img class="mobile-image" src="/images/custom-build1.png"/>   
   
If you want to distribute your version of the PhoneGap Developer app to others for testing on your team then you'll need to continue with a 
couple more steps explained in the next section.
    
### Distributing Your Custom Build   
1. To package for distribution you'll need to start by building an Xcode product archive for your version of the app. 
Open the project in Xcode (by opening the **phonegap-app-developer/platforms/ios/PhoneGap.xcodeproj** file) 
if you haven't already and select **Product -> Archive**. Once it completes the archive steps you should see it show up in the 
list of archives in the Xcode Organizer window as shown below.  
     
     ![Xcode Organizer](/images/xcode-organizer.png)
     
     <div class='alert--warning'>If the **Archive** menu item appears disabled then double check to ensure you have your actual iOS device selected
      as the active *scheme*. It will not be selectable if a simulator is currently set.</div> 

     <div class='alert--tip'>You can manually open the Organizer window by clicking **Window -> Organizer** in the Xcode menu as well.</div>

2. Once you locate the PhoneGap archive in the Xcode Organizer, you'll need to choose it for Export. Select the archive and click the **Export**
button in the right-hand menu. You'll be prompted with the following dialog where you can choose the type of distribution you desire:     
    
    ![Xcode Organizer](/images/ad-hoc.png)
    
3. You'll be prompted to select your Apple ID associated with your Developer Account and then after the required provisioning and signing 
checks have been made, you'll be prompted to save to your file system. It will be saved as an **.ipa** package you can then distribute as 
 needed. 

 ** Notice the final product exported is a file with an *.ipa* extension. Keep track of where you put this since you will need it for 
 submitting your application to the app store. **


<div class="alert--tip">If you are stuck in the packaging or provisioning process, check out [this page](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html)
 for specific details on the process.</div> 
     
## Windows
1. Open the command line application and clone the [PhoneGap Developer app repo](https://github.com/phonegap/phonegap-app-developer) git 
 project with the following command:

        C:\> git clone https://github.com/phonegap/phonegap-app-developer.git

2. Ensure you change into the newly created project folder:     
    
        C:\> cd <your-path>/phonegap-app-developer

2. Next, `cd` into the `www` folder (`<your-path>/phonegap-app-developer/www`) and open the **config.xml** file.  Modify the `id` attribute 
to set your own unique apo bundle id within the root `&lt;widget&gt;` element.
 
   `<?xml version='1.0' encoding='utf-8'?>`
    `<widget` `**id="org.mycompany.phonegap.app"**` `version="1.5.4" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">`
                
3. Run the `build` command for the Win platform you're targeting on the command line in the root of the project:  

        $ phonegap build wp8 

4. Once you've tested the app from your custom build locally on your Windows device and are ready to package for distribution, add the `release` flag:
 
        $ phonegap build wp8 --release
    
  Your newly built *.xap app bundle will be created in the platforms folder under **platforms/wp8/Bin/Release/<your-bundle-id>.xap**
      
      