---
title: "Simple Debugging"
layout: "tutorialspage"
next: /tutorials/debug/02-remotely
---

In our Getting Started documentation we show how you can quickly test out your applications on an iOS, Android or Windows device using the PhoneGap Developer App. This is a great way to try out your application and see how it feels in terms of handling taps, gestures, scrolling and lays out in the UI on your device. Currently however you can not use that method for actually debugging your application with breakpoints and more advanced features. For that you'll want to start using other tools available. We recommend you start locally from your computer and move on to remote debugging on the device once you start debugging mobile-specific features.

### Browser Debugging 

When building your mobile hybrid applications, you should take advantage of the fact that they're running in a WebView and test/debug in a browser as much as you can since it's quick and easy and most of us are familiar with the browser developer tools. You can set breakpoints, inspect your CSS and ensure any framework code you may be using is running properly with the many browser tools available.  When you need to start testing and debugging more specific PhoneGap API functionality (accessing contacts, sensors etc), you can then move to remote debugging on the device or emulator. 

<div class="alert--info">**TIP:**
Just like other web applications, you'll need to ensure your mobile application is being run from a local web server when testing in the browser to avoid any `XMLHttpRequest` cross origin request issues. If you don't have anything already set up for this, a simple way to do it on OS X is to run the already bundled `$python -m SimpleHTTPServer 8000` from the terminal to start up a simple web server from within your project root folder. </div>

`$ python -m SimpleHTTPServer 8000
Serving HTTP on 0.0.0.0 port 8000 ...`

Then open **localhost:8000/www** in your browser (or your own local web server location) and use the associated developer tools. 

Here's an example of debugging in Chrome DevTools (View -> Developer -> Developer Tools from Chrome browser menu):

![](/images/browser-debug-chrome.png)

In Firefox you can navigate to the same URL but select Tools -> Web Developer from the browser menu. 
![](/images/browser-firefox-debug.png)

These links provide specific instructions on using developer tools from different browsers if you're not familiar already:
1. [Chrome Developer Tools](https://developer.chrome.com/devtools)
2. [Firefox Tools](https://developer.mozilla.org/en-US/docs/Tools)
3. [Safari Web Inspector Tools](https://developer.apple.com/library/safari/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Introduction/Introduction.html) 

<div class="alert--warning">**NOTE:** You may want to 
comment out the `cordova.js` line in your index.html (`<script src="cordova.js"></script>`) until you're ready to move to the device or emulator for testing to avoid any errors though it's not required.  Just don't forget to uncomment the line when moving to remote debugging on a device/emulator.</div>


  




