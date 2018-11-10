---
title: Step 4: Preview Your App
url: getting-started/4-preview-your-app/cli
layout: subpage
tabs:
  - label: Desktop App
    url: getting-started/4-preview-your-app/desktop
  - label: CLI
    url: getting-started/4-preview-your-app/cli
next: 1-getting-started/5-going-further.html.md
menuHide: true
---

The PhoneGap CLI has a `serve` command that starts a small web server to host your project where it can then be consumed by the PhoneGap Developer App running on a mobile device or your desktop browser.

## Preview in a Desktop Browser

You can test your apps in your desktop browser first to speed up your initial development process. For instance, if you're using a framework like Angular or React, there are tools available for specifically debugging those frameworks in the browser that can be quite helpful before moving over to a device. Recently PhoneGap began supporting the browser platform as a target automatically to help you test with the `deviceready` event and Apache Cordova core plugins more easily in an environment you're already familiar with.

  ![](/images/browser-support/browser-debug.png)

<div class="alert--info">Refer to the <a href='/references/browser-support'>PhoneGap Browser Support Reference guide</a> for specific details.</div>

## Preview on a Device

You can use the **PhoneGap Developer App** paired with the **PhoneGap CLI** to immediately preview your app on a device without installing platform SDKs, registering devices, or compiling code. The PhoneGap CLI starts a small web server to host your project and returns the server address for you to pair with from the PhoneGap Developer App running on your mobile device.

<div class="alert--warning">Double check to ensure you're running your device and computer on the same network before continuing. </div>

1. `cd` into the project directory created in the previous step and type `$ phonegap serve`. You will receive the server address the app is being hosted on in the output received in the console (`192.168.1.11:3000` in this example):

  ```sh
  $ phonegap serve
  [phonegap] starting app server...
  [phonegap] listening on 192.168.1.11:3000
  [phonegap]
  [phonegap] ctrl-c to stop the server
  [phonegap]
  ```

1. Now go to your mobile device where the PhoneGap Developer App is running, enter the server address on the main screen and tap **Connect**.

  <img class="mobile-image" src="/images/dev-app-enter-add.png" alt="PhoneGap Developer App, iOS"/>

  <div class="alert--info"> **NOTE:** Tap directly on the server address displayed in the terminal screen of the PhoneGap Developer app to change it to match yours. The value filled in by default is only a sample. </div>

  You should see the connection occur followed by a success message as shown below. If you receive an error of any kind, ensure once again that you are connected to the same network on both your device and your computer. You could also check the [issue tracker](https://github.com/phonegap/phonegap-app-developer/issues) and [PhoneGap Google Groups](https://groups.google.com/forum/#!forum/phonegap) list for further help.

  <img class="mobile-image" src="/images/dev-app-success.jpg" alt="Developer App, connection success"/>

  Once the PhoneGap Developer app connects and loads your mobile application, it should be displayed for preview as shown below:

  <img class="mobile-image" src="/images/dev-app-preview.jpg" alt="Developer App, preview"/>

  <div class="alert--tip"> **TIP:** Gestures can be used while you're previewing your app. A 3 finger tap will return you to the main screen, a 4 finger tap will cause a refresh. </div>

  ### Making Updates

1. Now let's make an update to some code to see how easy it is to test changes. Using your favorite text editor, open up the **index.html** file located within the **www** folder of your project; for instance *~/appSample/www/index.html*

 <div class="alert--tip"> **TIP:** Some popular lightweight  but powerful editors include [Brackets](http://brackets.io/), [Sublime Text](http://www.sublimetext.com/), [Atom](https://atom.io/) and [Code](https://www.visualstudio.com/products/code-vs.aspx). If you're looking for more of an IDE with extensive features and plugins including code hinting and type-ahead, check out [WebStorm by JetBrains](https://www.jetbrains.com/webstorm/)</div>

1. Choose an update to make. Let's start by changing the PHONEGAP text that's displayed in the app from `<h1>PhoneGap</h1>` to `<h1>Hello PhoneGap</h1>`. (This text has a CSS uppercase transform applied to it in the default project). Save it when you're finished and move on to the next step.
  ![](/images/editor.jpg)

1. Now check your mobile device where your PhoneGap Developer app is running and you will see your app reload and automatically display the new text!

  <img class="mobile-image" src="/images/dev-app-code-update.jpg" alt="Developer App update preview"/>
  ![](/images/phonegap-app-developer-workflow-v2.gif)

1. Continue making updates to your project to get familiar with this workflow.

  At this point you should check out [this guide](/tutorials/develop/hello-world-explained/) explaining important details about the default Hello PhoneGap application and mobile application development tips with PhoneGap in general.
