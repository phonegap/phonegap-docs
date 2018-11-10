---
title: FAQ/Troubleshooting
url: references/developer-app/troubleshoot-faq
layout: subpage
---

## Which plugins are supported by the PhoneGap Developer app?

The PhoneGap Developer App supports all of the PhoneGap core plugins as well as some other popular plugins to allow you to easily test with them in your app on a mobile device. Below is a list of supported plugins at the time of this writing however you can get the latest list at any time by checking the [GitHub repo](https://github.com/phonegap/phonegap-app-developer/blob/master/config.xml#L23).

- [Battery Status](https://www.npmjs.com/package/cordova-plugin-battery-status)
- [Bluetooth](https://github.com/don/cordova-plugin-ble-central)
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
- [Push Notifications](https://www.npmjs.com/package/phonegap-plugin-push)

<div class='alert--warning'>If you're using a plugin in your project that is not shown in this list, it will not work with the PhoneGap Developer App out of the box. However, you can create your own <a href='/references/developer-app/custom-build/ios'>custom build of the PhoneGap Developer app</a> locally and include any other plugins there. We recommend always checking for the existence of any plugin in your code first before using it to avoid errors in testing in general.</div>

## What is Autoreload?

Autoreload is a feature that will automatically refresh your previewed app when a file changes in the `www/` directory. This allows you to immediately preview your changes without four-finger tapping the devices screen. It's especially useful when previewing multiple devices at the same time.

Autoreload is a developer feature that only works while connected to the PhoneGap CLI. If the CLI server stops, then autoreload will stop working.

By default, autoreload is enabled. However, you can force it to be enabled or disabled with the following commands:

```sh
$ phonegap serve --autoreload
$ phonegap serve --no-autoreload
```

## How can I debug my apps remotely?

We are working on ways to make debugging easier with the PhoneGap Developer app, but for now there are two ways it can be done:

1. Using [Weinre](https://www.npmjs.com/package/weinre)
1. Running your own custom build of PhoneGap Developer App (as opposed to the app marketplace version)

Check out the [debugging section](/references/developer-app/debugging) for more details.

## PhoneGap Developer App hangs on `DOWNLOADING...` for iOS

Currently if you enter the wrong IP address (or an invalid one) to connect to, it will hang on the DOWNLOADING phase and you will need to exit and restart the app to try again. See the [bug being tracked here](https://github.com/phonegap/phonegap-app-developer/issues/338) for more details.

## PhoneGap Developer App is unable to download from the server

The Phonegap Developer App may encounter a download error for one of the following reasons:

- Your machine and device are not on the same network
- Your machine and device cannot communicate on the network
- The downloaded zip file is corrupt
- The network firewall is blocking the downloading of zip files
- The network firewall is blocking the port
- The mobile app has an internal JavaScript error

First, you should verify that your machine and device are on the same network.

Second, you should verify that your machine and device can communicate with each other. You can accomplish this by pinging your device's IP Address from your machine.

1. Open your device's wifi network settings
1. Find the device's IP Address (e.g. `10.0.1.18`)
1. Open your machine's terminal or command-prompt window
1. Type the following command to ping your device (your IP Address will be different):

  ```bash
  $ ping 10.0.1.18
  ```

If you are able unable to ping your device, then you may have a network issues. For example, you may be on a public or guest network where connected devices are allowed to not talk to each other.

Third, if you are able to ping your phone, then we must verify that the zip file is not corrupt. The zip file is generated by PhoneGap to transfer your app from your machine to your device. Sometimes, the zip archive can become corrupt. We can verify that the zip archive by downloading and inspecting it.

1. On your machine, serve your app
    1. Open your terminal or command prompt
    1. Type `phonegap serve`
    1. Remember the IP Address displayed (e.g. `10.0.1.18`)
1. On your machine, download the zip archive
    1. Open your desktop browser
    1. Type the following address into your browser (your IP Address will be different)

      ```bash
      http://10.0.1.18:3000/__api__/appzip
      ```

1. Wait for the download to finish
1. Unzip the downloaded zip archive
1. Verify that the contents match your `www/`

If you are unable to unzip the downloaded archive, then the archive is corrupt. There are known issues when serving a project that contains lot of files or files that are large in size. Try to reduce the amount of files/size of your project.

If the zip archive download does not start, then you have a network firewall issue.

Fourth, we want to verify that the network firewall is not blocking the zip download. On Windows, you must allow NodeJS network access. The first time that NodeJS accesses the network, it will prompt you for permission:

<img class="mobile-image" src="/images/node_js_allow_firewall.png" alt="Firewall allow NodeJS">

If no prompt appears, you can manually allow access:

1. On Windows, open your _Settings_ or _Control Panel_
1. Find the _Windows Firewall_ settings
1. Find the _Allowed Apps_ section
1. If NodeJS is listed
    1. Allow NodeJS network access
1. If NodeJS is not listed
    1. Select _Allow another app_
    1. Locate NodeJS on your system

<img class="mobile-image" src="/images/node_js_firewall_allowed_apps.png" alt="Firewall allowed apps">

On Mac OSX, the firewall is in `System Preferences > Security & Privacy`

Fifth, the network firewall may be blocking the port used by `phonegap serve`. If you have access to your router/network settings, then you open the port for internal network communication. If you can't open the port through your network settings, then you can try specify a different port:

```sh
$ phonegap serve --port 80
$ phonegap serve --port 1337
```

Or you can try using the `--localtunnel` option to serve to devices that aren't on the same network:

```sh
$ phonegap serve --localtunnel
```

Keep in mind that the local tunnel will go through a third-party web server,
so it is both insecure and slow.

Enterprise networks often block the transfer of zip archives. If you suspect
that this is your problem, then you can verify it by trying a home network
or wireless hotspot. You can try contacting your IT department if you verify
that it is the issue.

Sixth, when using a virtual machine (VM), you should configure the network adapter
to appear as a separate network device. This means that your VM will have an
IP address that is different from your host computer. Inside the VM network
settings, this is often called a _bridged network_. In some cases for the _bridged network_ to work,
you will need to enable [ICMP Echo Requests][1].

  [1]: https://technet.microsoft.com/en-us/library/cc749323(v=ws.10).aspx

Seventh, when all else fails, the issue may be caused by errors in your JavaScript application.
A helpful way to determine this is to use the `window.onerror` function to track down your errors.

```js
  // err: error message
  // fileName: which file error occurs in
  // lineNumber: what line error occurs on
  window.onerror = function (err, fileName, lineNumber) {
    // alert or console.log a message
    alert(fileName, 'Line:', lineNumber, 'Error:', e.message);
  };
```

## Sending Push Notifications to the PhoneGap Developer App

To learn how to send push notifications to your app being served by the **PhoneGap Developer App** see this [Developer Guide](/tutorials/develop/push-notifications/).
