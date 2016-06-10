---
title: Custom Build
url: references/developer-app/custom-build/win
layout: subpage
tabs:
   - label: iOS
     url: references/developer-app/custom-build/ios
   - label: Windows Phone
     url: references/developer-app/custom-build/win
---

## Steps

1. Open the command line application and clone the [PhoneGap Developer app repo](https://github.com/phonegap/phonegap-app-developer) with the following command:

  ```bash
  C:\> git clone https://github.com/phonegap/phonegap-app-developer.git
  ```

1. Ensure you change into the newly created project folder:

  ```bash
  C:\> cd <your-path>/phonegap-app-developer
  ```

1. Next, `cd` into the `www` folder (`<your-path>/phonegap-app-developer/www`) and open the **config.xml** file.  Modify the `id` attribute to set your own unique apo bundle id within the root `widget` element.

  ```xml
  <?xml version='1.0' encoding='utf-8'?>
  <widget id="org.mycompany.phonegap.app" version="1.5.4" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">
  ```

1. Run the `build` command for the Win platform you're targeting on the command line in the root of the project:

  ```bash
  C:\> phonegap build wp8
  ```

1. Once you've tested the app from your custom build locally on your Windows device and are ready to package for distribution, add the `release` flag:

        C:\> phonegap build wp8 --release

  Your newly built *.xap app bundle will be created in the platforms folder under **phonegap-app-developer/platforms/wp8/Bin/Release/<your-bundle-id>.xap**

## Video Demo

In this short video we are running a locally built version of the PhoneGap Developer app on a Windows Phone with the addition of a 3rd party Social Sharing plugin built into it for sending text messages and some visual updates to the color and label of the wrapper to show that it's a custom build.

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/_IfMzntPAus" frameborder="0" allowfullscreen></iframe>
</div>
