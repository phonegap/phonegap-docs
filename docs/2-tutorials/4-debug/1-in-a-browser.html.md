---
title: In A Browser
url: debug/in-a-browser
layout: subpage
write: false
---

In our Getting Started documentation we show how you can quickly test out your applications on an iOS, Android or Windows device using the PhoneGap Developer App. This 
is a great way to try out your application and see how it feels in terms of handling taps, gestures, scrolling and lays out in the UI on your device. Currently however 
you can not use that method for actually debugging your application with breakpoints and more advanced features. For that you'll want to start using other tools available.
 We recommend you start locally from your computer and move on to remote debugging on the device once you start debugging mobile-specific features.


### Browser Debugging 

One big benefit of the hybrid mobile application approach is the ability to use the various browser tools available for developers since the applications are built using 
standard web technologies. You can greatly increase your productivity by taking advantage of these tools to test all of the non-native parts of the application.  You can 
set breakpoints, inspect your CSS and ensure any framework code you may be using is running properly with the many browser add-ons available for frameworks like 
Angular and React and other popular frameworks.  When you need to start testing and debugging more specific PhoneGap API functionality (accessing contacts, sensors etc), 
you can then move to remote debugging on the device or emulator. 

<div class="alert--tip">**TIP:** There are some mock Cordova libraries out there as well you could try for testing the Cordova API's that can be found by doing a quick
search. </div>

To debug your PhoneGap projects in the browser you'll need to ensure they're being served/run from a local web server to avoid any CORS 
([Cross Origin Resource Sharing](http://www.w3.org/TR/cors/issues)) issues. It's easy to do this using either the PhoneGap Desktop or PhoneGap CLI since both 
automatically include methods for starting up a local web server.

#### Serving from PhoneGap Desktop

The PhoneGap Desktop application has a green play button you can click to start the server for
any given project, and the URL that it's running on will be shown at the bottom of the app as pointed out below:

![](/images/desktop-app-run.png)

 
#### Serving from PhoneGap CLI

Once your application is running on a local web server from one of the above methods and you've noted the URL it was served on, simply enter that URL in your browser
and use the developer tools in the browser to debug and test. Most of the major browsers have great developer tools and are easy to use.     

Here's an example of debugging in Chrome DevTools (View -> Developer -> Developer Tools from Chrome browser menu):

![](/images/browser-debug-chrome.png)

In Firefox you can navigate to the same URL but select Tools -> Web Developer from the browser menu. 
![](/images/browser-firefox-debug.png)

These links provide specific instructions on using developer tools from different browsers for reference:
1. [Chrome Developer Tools](https://developer.chrome.com/devtools)
2. [Firefox Tools](https://developer.mozilla.org/en-US/docs/Tools)
3. [Safari Web Inspector Tools](https://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Introduction/Introduction.html) 

<div class="alert--warning">**NOTE:** You may want to 
comment out the `cordova.js` line in your index.html (`<script src="cordova.js"></script>`) until you're ready to move to the device or emulator for testing to avoid any errors though it's not required.  Just don't forget to uncomment the line when moving to remote debugging on a device/emulator.</div>
