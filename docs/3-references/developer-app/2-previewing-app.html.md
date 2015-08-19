---
title: Preview an App
url: references/developer-app/previewing-app
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/developer-app/2-previewing-app.html.md
layout: subpage
---

The PhoneGap Developer app is used to preview apps on your devices without the need for SDK's or compiling code. It's paired with your PhoneGap
 app being served by either the PhoneGap Desktop or the PhoneGap CLI on your local webserver.  

The following steps can be taken to preview your apps on your mobile device using the PhoneGap Developer app. 

<div class="alert--warning">Double check to ensure you're running your device and computer on the same network before continuing. </div>

1. From your computer, *serve* the app you want to preview on your mobile device using either [PhoneGap Desktop](getting-started/4-run-your-app/desktop) 
or the [PhoneGap CLI](getting-started/4-run-your-app/cli) and note the IP address. 

2. Open the **PhoneGap Developer** app installed on your mobile device, enter the IP address noted above and tap  **Connect**.

  <div class="alert--info"> **NOTE:** Tap directly on the server address displayed in the terminal screen 
  of the PhoneGap Developer app and change it to yours. (The value filled in by default is only a sample). </div>
  
  <img class="mobile-image" src="/images/dev-app-enter-add.png"/>
  
3. You will see status messages that the app is being `DOWNLOADED` and `EXTRACTED` followed by a `SUCCESS` message.  
If you receive an error of any kind, double check to make sure you are connected to the same network on both your device and computer. 
Check the [issue tracker](https://github.com/phonegap/phonegap-app-developer/issues) or 
[PhoneGap Google Groups](https://groups.google.com/forum/#!forum/phonegap) list for further help. 

  <img class="mobile-image" src="/images/dev-app-success.jpg"/>

4. Once the PhoneGap Developer app connects to the IP address where your project is being served, it will load and display your application as 
shown below:  

  <img class="mobile-image" src="/images/dev-app-preview.jpg"/>

### Gestures 
There are a couple of gestures that are supported when using the PhoneGap Developer app. 

- A 3-finger tap gesture will return you back to the home screen if you want to connect to a new IP address.
- A 4-finger tap gesture will cause the current application to refresh. The PhoneGap Developer app will automatically load any changes made
 but a forced refresh can be done with this gesture as needed.   

#### Video Example

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/pggw-9b8RVY" frameborder="0" allowfullscreen></iframe>
</div>

  
