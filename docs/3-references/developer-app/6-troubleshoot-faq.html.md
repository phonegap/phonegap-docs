---
title: FAQ / Troubleshooting
url: references/developer-app/troubleshoot-faq
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/developer-app/10-troubleshoot-faq.html.md
layout: subpage
---

1. *Which plugins are supported by the PhoneGap Developer app?*

 The PhoneGap Developer App supports all of the PhoneGap core plugins as well as some other popular plugins to allow you to easily test with
 them in your app on a mobile device. Below is a list of supported plugins at the time of this writing however you can get the latest list at
 any time by checking the [GitHub repo](https://github.com/phonegap/phonegap-app-developer/tree/master/plugins).  

  - [Battery Status](https://www.npmjs.com/package/cordova-plugin-battery-status) 
  - [Bluetooth](http://evothings.com/doc/plugins/com.megster.cordova.bluetoothserial/index.html)
  - [Camera](https://www.npmjs.com/package/cordova-plugin-camera)
  - [Console](https://www.npmjs.com/package/cordova-plugin-console)
  - [Contacts](https://www.npmjs.com/package/cordova-plugin-contacts)
  - [Device Motion](https://www.npmjs.com/package/cordova-plugin-device-motion)
  - [Device Orientation](https://www.npmjs.com/package/cordova-plugin-device-orientation)
  - [Device](https://www.npmjs.com/package/cordova-plugin-device)
  - [Dialogs](https://www.npmjs.com/package/cordova-plugin-dialogs)
  - [Insomnia](https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin) 
  - [File](https://www.npmjs.com/package/cordova-plugin-file)
  - [File Transfer](https://www.npmjs.com/package/cordova-plugin-file-transfer)
  - [Geolocation](https://www.npmjs.com/package/cordova-plugin-geolocation)
  - [Globalization](https://www.npmjs.com/package/cordova-plugin-globalization)
  - [InAppBrowser](https://www.npmjs.com/package/cordova-plugin-inappbrowser)
  - [MediaCapture](https://www.npmjs.com/package/cordova-plugin-media-capture)
  - [Media](https://www.npmjs.com/package/cordova-plugin-media)
  - [Network Information](https://www.npmjs.com/package/cordova-plugin-network-information)
  - [Splash Screen](https://www.npmjs.com/package/cordova-plugin-splashscreen)
  - [Status Bar](https://www.npmjs.com/package/cordova-plugin-statusbar)
  - [Vibration](https://www.npmjs.com/package/cordova-plugin-vibration)
  - [Content Sync](https://www.npmjs.com/package/phonegap-plugin-contentsync)
  - [Adobe Mobile Services](https://github.com/Adobe-Marketing-Cloud/mobile-services)

 <div class='alert--warning'>If you're using a plugin in your project that is not shown in this list, it will not work with the PhoneGap Developer 
 App out of the box. However, you can create your own [custom build of the PhoneGap Developer app](/references/developer-app/custom-build/ios)
 locally and include any other plugins there. We recommend always checking for the existence of any plugin in your code first before using it 
 to avoid errors in testing in general.</div>  
 
2. *What is Autoreload?*
    
 Autoreload is a feature that will automatically refresh your previewed app
 when a file changes in the `www/` directory. This allows you to immediately
 preview your changes without four-finger tapping the devices screen. It's
 especially useful when previewing multiple devices at the same time.
    
 Autoreload is a developer feature that only works while connected to the
 PhoneGap CLI. If the CLI server stops, then autoreload will stop working.
    
 By default, autoreload is enabled. However, you can force it to be enabled
 or disabled with the following commands:
    
    ```
    $ phonegap serve --autoreload
    $ phonegap serve --no-autoreload
    ```
    
3. *How can I debug my apps remotely?* 

  We are working on ways to make debugging easier with the PhoneGap Developer app, but for now there are two ways it can be done:
   1. Using [Weinre](https://www.npmjs.com/package/weinre)  
   2. Running your own custom build of PhoneGap Developer App (as opposed to the app marketplace version)

 Check out the [debugging section](/references/developer-app/debugging) for more details.   

4. *PhoneGap Developer App hangs on `DOWNLOADING...` for iOS*

 Currently if you enter the wrong IP address (or an invalid one) to connect to, it will hang on the DOWNLOADING phase and you will need to exit and
 restart the app to try again. See the [bug being tracked here](https://github.com/phonegap/phonegap-app-developer/issues/338) for more details.
    

