---
title: Step 4: Run Your App
url: getting-started/4-run-your-app/desktop
layout: subpage
tab: Desktop
next: 1-getting-started/5-going-further.html.md
---

You can use the **PhoneGap Developer App** paired with the **PhoneGap Desktop App** to immediately preview your app on a device without installing platform SDKs, registering devices, or compiling code.

The PhoneGap Desktop App starts a small web server to host your project and returns the server address for you to use from the PhoneGap Developer App running on your mobile device. It's started automatically upon
project creation, but you can also hit the play button to start a project that's currently inactive.

### Preview on a Device
<div class="alert--warning">Double check to ensure you're running your device and computer on the same network before continuing. </div>

1. In the previous step we created a project and ensured it was running by looking for the green 'play' button to be highlighted and a green bar showing the server address it's running on at the bottom of the PhoneGap Desktop App. <br><br>The screenshot is shown again below for reference. Locate the specific server address for your project before moving to the next step.

     ![](/images/desktop-app-create.png)

2. Go to your mobile device where the PhoneGap Developer App is running, enter the server address on the main screen and tap **Connect**.
   <div class="alert--info"> **NOTE:** Tap directly on the server address displayed in the terminal screen of the PhoneGap Developer app to change it to match yours. The value filled in by default is only a sample. </div>


  <img class="mobile-image" src="/images/dev-app-enter-add.jpg"/>


  You should see the connection occur followed by a success message as shown below. If you receive an error of any kind, ensure 
   once again that you are connected to the same network on both your  and computer. You could also check the 
   [issue tracker](https://github.com/phonegap/phonegap-app-developer/issues) and [PhoneGap Google Groups](https://groups.google.com/forum/#!forum/phonegap)
   list for further help. 

  <img class="mobile-image" src="/images/dev-app-success.jpg"/>
  
  Once the PhoneGap Developer app loads connects and loads your mobile application, it should be displayed for preview as shown below:  
   
  <img class="mobile-image" src="/images/dev-app-preview.jpg"/>

  <div class="alert--tip"> **TIP:** Gestures can be used while you're previewing your app. A 3 finger tap will return you to the main screen, a 4 finger tap will cause a refresh.
  </div>


#### Video Example

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/pggw-9b8RVY" frameborder="0" allowfullscreen></iframe>
</div>

### Making Updates
3. Now let's make an update to some code to see how easy it is to test a change. Using your favorite text editor, open up the **index.html** file located within the **www** folder of your project; for instance ***~/appSample/www/index.html***
  <div class="alert--tip"> **TIP:** Some popular lightweight  but powerful editors include [Brackets](http://brackets.io/), [Sublime Text](http://www.sublimetext.com/) and [Atom] (https://atom.io/). If you're looking for more of an IDE with extensive features and plugins including code hinting and type-ahead, check out [WebStorm by JetBrains](https://www.jetbrains.com/webstorm/)</div>

4. Choose an update to make. Let's start by changing the PHONEGAP text that's displayed in the app from `<h1>PhoneGap</h1>` to `<h1>Hello PhoneGap</h1>`. (This text has a CSS uppercase transform applied to it in the default project). Save it when you're finished and move on to the next step.

    ![](/images/editor.jpg)

5. Now check your mobile device where the PhoneGap Developer app is running and you will see your application reload and automatically display the new text:

    <img class="mobile-image" src="/images/dev-app-code-update.jpg"/>

6.  Continue making updates to your project to get familiar with this workflow.

At this point you should check out [this guide](/develop/hello-world-explained) explaining important details about the default Hello PhoneGap application and mobile application development tips with PhoneGap in general.
