---
title: Debugging
url: references/developer-app/debugging
layout: subpage
---

The intended audience for the PhoneGap Developer app is typically beginner-level and just getting started with PhoneGap. For
more complete control over your debugging environment you should plan to use the full featured [PhoneGap CLI](https://www.npmjs.com/package/phonegap). Since the PhoneGap Developer app is a production version app downloaded from the app stores, you can't use the traditional Remote Debugging tools like Safari and Chrome to debug apps running within it. However, you do currently have two other options for debugging; using the weinre tool or building a custom version of the PhoneGap Developer app.

## Using Weinre

[Weinre](https://www.npmjs.com/package/weinre) is a limited implementation of Remote Web Inspector for remotely debugging apps running on a device.

### Steps

You can run weinre on your local machine and use it to debug your application being served from either the PhoneGap Desktop App or the PhoneGap CLI.

1. Install weinre using npm (requires [Node.js](https://nodejs.org))

  ```sh
  $ sudo npm install -g weinre
  ```

    You could also download or clone the project from [the GitHub repo](https://github.com/apache/cordova-weinre).

1. Start up weinre with the following command, replacing the IP address with your local machine's IP address found in your network settings:

  ```sh
  $ weinre --boundHost x.x.x.x
  ```

  for example:

  ```sh
  $ ./weinre --boundHost 192.168.1.20
  2015-08-17T20:51:35.866Z weinre: starting server at http://192.168.1.20:8080
  ```

  <div class="alert--tip">**TIP:** Another quick way to find the IP address of your machine is by noting the IP address your projects are served on from the CLI or PhoneGap Desktop app minus the port number (ie: 192.168.1.20:3000 becomes 192.168.1.20). You could also find it in the PhoneGap Desktop Settings.</div>

1. Open your PhoneGap project to debug and add the following script tag in the *www/index.html* of the project you're debugging, replacing the IP address with yours and including the port 8080.

  ```html
  <script src="http://192.168.1.20:8080/target/target-script-min.js#anonymous"></script>
  ```

  This will allow weinre access to debug your app when it's being served.

1. Now use the PhoneGap Desktop Application or PhoneGap CLI to serve it.

1. Open the PhoneGap Developer app on your mobile device and connect to the IP address the app was served on to complete the pairing process (ie: `http://192.168.1.20:3000`).

1. Open the browser on your computer and enter the URL weinre was started on (ie: `http://192.168.1.20:8080/` in this example):

  You should see a view like the following:

  ![](/images/weinre-home.png)

  Click on the link next to *debug client user interface:* and you will see the following type of view where the debug target link is shown in blue:

  ![](/images/weinre-target.png)

  Click on the link in the Targets section and it will turn green when it's connected and you can begin debugging:

  ![](/images/weinre-connected.png)

  You can now inspect elements directly on your device and use the JavaScript console to debug your app as shown below, although breakpoints and stepping through code are not supported:

  ![](/images/weinre-demo.png)

  <img class="mobile-image" src="/images/weinre-inspect.png" alt="Weinre inspector"/>

#### Video Demo

![](/images/weinre-demo-video.gif)

## Creating Custom Builds

The other option for debugging is to create your own [custom build](/references/developer-app/custom-build/ios) of the PhoneGap Developer App (as opposed to the app marketplace version). This option can be used for debugging using other Remote Debugging tools found in Safari, Chrome and others developers may be more comfortable with. You could also include any other plugins or change settings overall to fit your testing needs. See the [guide](/references/developer-app/custom-build/ios) for more details.
