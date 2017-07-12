---
title: Push Notifications
url: tutorials/develop/push-notifications
layout: subpage
---

You can use the **PhoneGap Developer App** paired with the **PhoneGap CLI** to immediately preview your app on a device without installing platform SDKs, registering devices, or compiling code. The PhoneGap CLI starts a small web server to host your project and returns the server address for you to pair with from the PhoneGap Developer App running on your mobile device.

Starting with **PhoneGap CLI** release 6.2.0 and **PhoneGap Developer App** release 1.6.2, you can now test push notification functionality without needing to set up a [Google Cloud Messaging (GCM)](https://developer.android.com/google/gcm/index.html) project for Android or an [Apple Push Notification Service (APNs)](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html) certification for iOS.

<div class="alert--warning">Double check to ensure you're running your device and computer on the same network before continuing. </div>

## Create Default PhoneGap Push Project

1. Enter the following command from your terminal:

  ```sh
  $ phonegap create myApp --template push
  ```

  This will create a folder named myApp in the current path location with a default project name of Hello World and id of com.phonegap.helloworld.

  You can also specify a name and identifier to ensure the project is unique but still contains the default Hello World code project by specifying them as qualified parameters as shown below:

  ```sh
  $ phonegap create myApp --id "org.myapp.sample" --name "appSample" --template phonegap-template-push
  ```

1. Verify that you see the following output in your console after you run the command:

  ```sh
  Creating a new cordova project.

  Retrieving phonegap-template-push using npm...
  ```

1. Change into the new project directory with the cd command:

  ```sh
  $ cd myApp/
  ```

1. Check to be sure you see the following set of files and folders shown below:

  ```sh
  config.xml      hooks        platforms    plugins        www
  ```

1. `cd` into the ***www*** folder and look around at the files and subfolders in there, this is the content of your app, with the entry point being the index.html file.

  ```sh
    $ cd www/
  ```

  <div class="alert--tip">**TIP:** Details about the rest of the files and folders created in the root project will be covered in guides further along. For now just focus on the ***www*** folder and its contents.</div>

1. Type `$ phonegap serve`. You will receive the server address the app is being hosted on in the output received in the console (`192.168.1.11:3000` in this example):

  ```sh
  $ phonegap serve
  [phonegap] starting app server...
  [phonegap] listening on 192.168.1.11:3000
  [phonegap]
  [phonegap] ctrl-c to stop the server
  [phonegap]
  ```

1. Now go to your mobile device where the PhoneGap Developer App is running, enter the server address on the main screen and tap **Connect** (for the browser you would use `localhost:3000` as the server address).

  <img class="mobile-image" src="/images/dev-app-enter-add.png" alt="PhoneGap Developer App, iOS"/>

  <div class="alert--info"> **NOTE:** Tap directly on the server address displayed in the terminal screen of the PhoneGap Developer app to change it to match yours. The value filled in by default is only a sample. </div>

  You should see the connection occur followed by a success message as shown below. If you receive an error of any kind, ensure once again that you are connected to the same network on both your  and computer. You could also check the [issue tracker](https://github.com/phonegap/phonegap-app-developer/issues) and [PhoneGap Google Groups](https://groups.google.com/forum/#!forum/phonegap) list for further help.

  <img class="mobile-image" src="/images/dev-app-success.jpg" alt="Developer App, connection success"/>

  The first time you run an app inside the **PhoneGap Developer App** that requests the permission to receive push notifications you will see the following dialog:

  <img class="mobile-image" src="/images/dev-app-push-permission.jpg" alt="Developer App, push permission request"/>

  <img src="/images/browser-push-permission.png" alt="Browser, push permission request"/>

  Please click on the `OK` button to give the app the required permission. Subsequent runs of the application will not show you this permission dialog.

  Once the PhoneGap Developer app connects and loads your mobile application, it should be displayed for preview as shown below:

  <img class="mobile-image" src="/images/dev-app-preview-push.jpg" alt="Developer App, push registration"/>

  <img src="/images/browser-preview-push.png" alt="Browser, push registration"/>

  The grey `Requesting Registration ID` line under the PhongGap Bot should turn into a green `Registered` line and you should see the following in your terminal session.

  ```sh
  [phonegap] [console.log] registration event: APA91bE1MmeTc92igNoi5OkDWUV
  ```

  <div class="alert--warning">Obviously, your registration ID will be different but you get the picture.</div>

## Sending Your First Push

1. Open a new terminal window and enter the following command if you are testing on iOS:

  MacOS:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload '{ "aps": { "alert": "Hello World" } }'
  ```

  Windows:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload "{ \"aps\": { \"alert\": \"Hello World\" } }"
  ```

  or enter the following command if you are testing on Android or Browser (If you are running PhoneGap CLI 6.5.0 or earlier replace `--service fcm` with `--service gcm`):

  MacOS:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service fcm --payload '{ "data": { "title": "Hello", "message": "World"} }'
  ```

  Windows:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service fcm --payload "{ \"data\": { \"title\": \"Hello\", \"message\": \"World\"} }"
  ```

  replacing the deviceID with the one you received from the registration event in the previous step.

1. This will result in a push notification being received by the app.

  <img class="mobile-image" src="/images/dev-app-success-push.jpg" alt="Developer App, push received"/>

  <img src="/images/browser-success-push.png" alt="Browser, push received"/>

## Sending Your Second and Third Pushes

1. Now minimize the **PhoneGap Desktop App**.

1. From your terminal window, enter the following command if you are testing on iOS:

  MacOS:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload '{ "aps": { "alert": "Hello World" } }'
  ```

  Windows:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload "{ \"aps\": { \"alert\": \"Hello World\" } }"
  ```

  or enter the following command if you are testing on Android or Browser (If you are running PhoneGap CLI 6.5.0 or earlier replace `--service fcm` with `--service gcm`):

  MacOS:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service fcm --payload '{ "data": { "title": "Hello", "message": "World"} }'
  ```

  Windows:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service fcm --payload "{ \"data\": { \"title\": \"Hello\", \"message\": \"World\"} }"
  ```

  replacing the deviceID with the one you received from the registration event in the previously.

1. This will result in a push notification being received by the app while it is in the background.

  <img class="mobile-image" src="/images/dev-app-success-push-bg.jpg" alt="Developer App, push received background"/>

1. Now, lock your device.

1. From your terminal window, enter the following command if you are testing on iOS:

  MacOS:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload '{ "aps": { "alert": "Hello World" } }'
  ```

  Windows:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload "{ \"aps\": { \"alert\": \"Hello World\" } }"
  ```

  or enter the following command if you are testing on Android or Browser (If you are running PhoneGap CLI 6.5.0 or earlier replace `--service fcm` with `--service gcm`):

  MacOS:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service fcm --payload '{ "data": { "title": "Hello", "message": "World"} }'
  ```

  Windows:
  ```sh
  $ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service fcm --payload "{ \"data\": { \"title\": \"Hello\", \"message\": \"World\"} }"
  ```

  replacing the deviceID with the one you received from the registration event in the previously.

1. This will result in a push notification being received by the app while the device is locked.

  <img class="mobile-image" src="/images/dev-app-success-push-locked.jpg" alt="Developer App, push received locked"/>

## Explaining Push

Now open the **www/js/index.js** file and we'll take a deep dive into what is going on. All of the code required to register and receive push notifications is in the `onDeviceReady` function.

### Initialization

First we need to initialize the push notification system. The `init` function sets up the communication path with the remote push service and requests a registration ID. You will need to do this each time your app starts. Don't worry about requesting a registration ID each time your app starts. The phonegap-plugin-push code is smart enough to use cached registration ID if available.

```js
var push = PushNotification.init({
  "android": {
    "senderID": "XXXXXXXX"
  },
  "browser": {},
  "ios": {
    "sound": true,
    "vibration": true,
    "badge": true
  },
  "windows": {}
});
```

<div class="alert--info"> **NOTE:** You may notice the `senderID` is set to *XXXXXXXX*. That is okay as the **PhoneGap Developer App** will intercept this request and use the correct value. When you build an app for yourself you will need to get a `senderID` when you setup a project with Google to use GCM. </div>

### Registration

Next we'll setup an event handler for the registration event. Once the app has successfully registered with the remote push service, our event handler will be called. The event handler is called with one parameter, a data object containing one property; the registrationId received from the remote push service.

Then we'll get the value of the saved `registrationId` from `localStorage`. If the old registration ID does not match the newly received registration ID we need to do two things. First, save the new `registrationId` into `localStorage`. Second, send the registration ID to your push service.

<div class="alert--info"> **NOTE:** The implementation for this second step is left up to the user and not relevant for the purposes of this guide. </div>

You'll see that the `registration` event handler updates the HTML to visually display that the app is now registered. It does this by setting the CSS display attribute to none on the initial &lt;p&gt; element that was shown and instead shows the Registered element in index.html by setting its display attribute to block.

```js
push.on('registration', function(data) {
  console.log('registration event: ' + data.registrationId);

  var oldRegId = localStorage.getItem('registrationId');
  if (oldRegId !== data.registrationId) {
    // Save new registration ID
    localStorage.setItem('registrationId', data.registrationId);
    // Post registrationId to your app server as the value has changed
  }

  var parentElement = document.getElementById('registration');
  var listeningElement = parentElement.querySelector('.waiting');
  var receivedElement = parentElement.querySelector('.received');

  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');
});
```

### Error Handling

Next we'll setup an event handler for the `error` event. If anything goes wrong with registration the error event will be fired.

```js
push.on('error', function(e) {
  console.log("push error = " + e.message);
});
```

### Receiving notifications

Finally, we'll setup an event handler for the notification event, called only when the app receives a push notification while running in the foreground. This event handler function will have one data object parameter that could contain multiple properties, including title and message.

```js
push.on('notification', function(data) {
  console.log('notification event');
  navigator.notification.alert(
    data.message,         // message
    null,                 // callback
    data.title,           // title
    'Ok'                  // buttonName
  );
});
```

<div class="alert--info"> **NOTE:** When your app is running in the background the above event handler is not called until the user clicks on the notification in the notification shade. </div>

For more information on how to use Push Notifications see the [documentation](https://github.com/phonegap/phonegap-plugin-push/blob/master/README.md) at the [PhoneGap Push Plugin repository](https://github.com/phonegap/phonegap-plugin-push/).
