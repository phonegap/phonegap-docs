---
title: Preview your App
url: references/developer-app/previewing-app
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/developer-app/5-previewing-app.html.md
layout: subpage
---

You can use the PhoneGap Developer App paired with PhoneGap Desktop or the PhoneGap CLI to immediately preview your app on a device 
 without installing platform SDKs, registering devices, or compiling code. 

The following steps can be taken to preview your apps on your mobile device using PhoneGap Developer. 

<div class="alert--warning">Double check to ensure you're running your device and computer on the same network before continuing. </div>

1. 'Serve' the app you want to preview using either [PhoneGap Desktop](getting-started/4-run-your-app/desktop) or the [PhoneGap CLI](getting-started/4-run-your-app/cli) and note the IP Address. 

2. Open PhoneGap Developer on your mobile device, enter the IP address noted above, then tap  **Connect**.
  <div class="alert--info"> **NOTE:** Tap directly on the server address displayed in the terminal screen of the PhoneGap Developer app to change it to match yours. The value filled in by default is only a sample. </div>
  <img class="mobile-image" src="/images/dev-app-enter-add.jpg"/>
  
3. You should see the connection occur followed by a success message as shown below. If you receive an error of any kind, ensure
   once again that you are connected to the same network on both your device and computer. Check the [issue tracker](https://github.com/phonegap/phonegap-app-developer/issues) or
 [PhoneGap Google Groups](https://groups.google.com/forum/#!forum/phonegap) list for further help.

  <img class="mobile-image" src="/images/dev-app-success.jpg"/>

4. Once the PhoneGap Developer app connects, it will load and display your application as shown below:  

  <img class="mobile-image" src="/images/dev-app-preview.jpg"/>

  <div class="alert--tip"> **TIP:** [Gestures](references/developer-app/create-project) The gestures that can be used while previewing your app are 
  a "3 finger tap" to return to the main screen and a "4 finger tap" to reload the app.
  </div>


#### Video Example

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/pggw-9b8RVY" frameborder="0" allowfullscreen></iframe>
</div>

  
