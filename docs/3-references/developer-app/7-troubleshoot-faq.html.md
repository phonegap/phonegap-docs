---
title: FAQ / Troubleshooting
url: references/developer-app/troubleshoot-faq
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/developer-app/10-troubleshoot-faq.html.md
layout: subpage
expand: dev-app
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
    
5. *PhoneGap Developer App is unable to download from the server*

  The first thing you should check is to see if your computer that you are trying to `phonegap serve` from and the phone running the PhoneGap Developer App are on the same network. 

  If you are sure that both your computer and phone are on the same network, but still can't connect try
  pinging your phone's ip from your computer. Go into your phone's settings and find its ip address.
  Once you have that, try to see if they are actually able to communicate with each other:

    ```
    $ ping your.phones.ip.address
    ```

  If you are able unable to ping your phone, this is most likely due to a network issue. You might be on a network where connected devices are set to not talk to each other.

  If you are able to ping your phone and still unable to download, then your issue might be a firewall,  
  the port you are trying to serve is blocked, serving a zip is not allowed on your network, or a zip error has occured on device. To diagnose these problems, first try opening the browser on the computer you are serving the PhoneGap project from. Then, type the ip address from the `phonegap serve` command and append `/__api__/appzip` to the url so it looks something like this:

    ```
    http://127.0.0.1:3000/__api__/appzip
    ```

  That should start the zip download of your project onto your machine. Once you download the zip, try 
  unzipping its contents and see if it actually matches the contents of your `www/`. If you are unable to unzip the file provided, it might be due to the contents of your `www/`. For example, there are known issues when trying to serve a project that has a lot of files or that is large in size. Try to reduce the amount of files/size of your project.

  If no download happens at all, make sure that NodeJS has firewall access. On Windows, it will prompt you for permission to allow NodeJS to have access:

  <img class="mobile-image" src="/images/node_js_allow_firewall.png">

  If no prompt appears, you can go into your Windows Firewall settings and under Allowed Apps, you can see if NodeJS has firewall access or not. If there is no entry for NodeJS, find where NodeJS is installed on your system and add it by using the "Allow another app". 

  <img class="mobile-image" src="/images/node_js_firewall_allowed_apps.png">

  Next, ensure that the port you are trying to `phonegap serve` from is open. You will have to configure 
  this in your router/network settings. If you can't open the port through your network settings, you can try configuring to serve on a different port that you have access to:

    ```
    $ phonegap serve --port 1337
    ```

  Or you could try using the `--localtunnel` option to serve to devices that aren't on the same network:

    ```
    $ phonegap serve --localtunnel
    ```

  Sending zips are often blocked in an enterprise network, so this might be the case for you. Try contacting your IT department if you find that are able to connect the phone to your computer but the zip file never seems to send. 

  If all else fails, it might be due to errors in the JavaScript of your application. A helpful way to determine this is to use the `window.onerror` function to track down your errors.

  ```
    // err: error message
    // fileName: which file error occurs in
    // lineNumber: what line error occurs on
    window.onerror = function (err, fileName, lineNumber) { };
  ```