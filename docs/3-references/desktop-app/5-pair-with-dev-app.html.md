---
title: Preview an App
url: references/desktop-app/pair-with-dev-app
layout: subpage
---

You can use the **PhoneGap Developer App** paired with **PhoneGap Desktop** to immediately preview your app on a device without installing platform SDKs, registering devices, or compiling code. For further instructions on installing the PhoneGap Developer App to your mobile device, see the [Getting Started Guide](/getting-started/2-install-mobile-app).

The local web server started by **PhoneGap Desktop** that hosts your project returns a server address you can enter into the **PhoneGap Developer** app running on a mobile device.

## Preview on a Device

<div class="alert--warning">Double check to ensure you're running your device and computer on the same network before continuing.</div>

1. In PhoneGap Desktop, ensure the project you want to test is active (or click the green "play" button next to it to make it active). Locate the server address it's currently running on in the footer of the app as shown below:

     ![](/images/desktop-app-create.png)

1. Open the PhoneGap Developer App on a mobile device and enter the server address noted above then tap  **Connect**.

  <div class="alert--info"> **NOTE:** Tap directly on the server address displayed in the terminal screen of the PhoneGap Developer app to change it to match yours. The value filled in by default is only a sample. </div>

  <img class="mobile-image" src="/images/dev-app-enter-add.png" alt="Developer App, enter server address"/>

1. You should see the connection occur followed by a success message as shown below. If you receive an error of any kind, ensure once again that you are connected to the same network on both your device and computer. You could also check the [issue tracker](https://github.com/phonegap/phonegap-app-developer/issues) and [PhoneGap Google Groups](https://groups.google.com/forum/#!forum/phonegap) list for further help.

  <img class="mobile-image" src="/images/dev-app-success.jpg" alt="Developer App, connection success"/>

1. Once the PhoneGap Developer app connects, it will load and display your application as shown below:

  <img class="mobile-image" src="/images/dev-app-preview.jpg" alt="Developer App, preview"/>

  <div class="alert--tip"> **TIP:** Gestures can be used while you're previewing your app. A "3 finger tap" will return you to the main screen and a "4 finger tap" will cause a refresh.</div>

### Video Example

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/pggw-9b8RVY" frameborder="0" allowfullscreen></iframe>
</div>

See the [Getting Started Docs](/getting-started/4-preview-your-app/desktop) for more details.
