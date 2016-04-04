---
title: PhoneGap Desktop Browser Support
url: references/browser-support
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/3-references/browser-support-guide.html.md
layout: subpage
---

### Overview
PhoneGap apps are built with web technologies, giving you the option of using your desktop browser to help iterate through the 
development phases rapidly by leveraging all the great built-in browser tooling readily available. You can also take advantage of mobile 
[Chrome mobile device emulators](https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/) and [Safari Responsive
Design Mode](https://developer.apple.com/safari/tools/) to test your layouts on a variety of screen sizes without moving to a physical device.
This helps greatly reduce the challenges faced by mobile developers due to platform fragmentation in the marketplace for a large part of the 
development process.
 
 ![](/images/browser-support/safari-devtools.png)

 ![](/images/browser-support/safari-responsive2.png)

### Browser Platform 
PhoneGap makes it easy to leverage this browser support automatically by adding an additional platform target for it when you `serve` your apps from
the [PhoneGap CLI](http://localhost:3001/references/phonegap-cli/serve/):
 
    $ phonegap serve
 
 ![](/images/browser-support/serve-command.png)
    
You will see the console output a local IP address which you can then open directly in your browser (or via localhost:3000) and start debugging. You
can then start making edits to your source code as needed and see them pushed immediately to your browser due to the live reload feature also supported.  

 ![](/images/browser-support/browser-debug.png)
 
The browser platform support ensures the `deviceready` event is fired in the browser and allows you to use all of the core plugins without 
disrupting your development. Each [Apache Cordova core plugin](http://docs.phonegap.com/plugin-apis/) has this additional `browser` platform target specifically supported which will often contain 
a [Proxy class](https://github.com/apache/cordova-plugin-device/tree/master/src/browser) that will return mock data ([cordova-plugin-device-motion](https://github.com/apache/cordova-plugin-device-motion/blob/master/src/browser/AccelerometerProxy.js) 
 for instance), or simply fail silently ensuring your app continues to execute. 
 
Some of the core plugins use JS API's that are actually supported in the Desktop browser natively and in those cases the plugin will defer to use
 it instead. For instance, `cordova-plugin-geolocation` uses an API that is already supported in Chrome, Safari and Firefox. 
 
 <div class="alert--tip">**TIP:** Check the [Can I Use](http://caniuse.com) site to see which JavaScript APIs are currently supported by a 
 given browser.</div> 

### Multiple Platform Support  
The addition of the browser does not affect the multi-device functionality that was already present when serving apps. Now you can run your app in the browser, as well as on an Android, iOS, or Windows Phone device all at the same time with livereloading.
  
### No Browser Support Flag  
Of course, using the browser may not be necessary for all users. If you would like to continue serving applications without the browser, you can do 
so by running 

    $ phonegap serve --no-browser.
  
### Custom Plugin Development 
With the new browser platform target supported now in PhoneGap, you also have the ability to write code to support it specifically 
when writing your own custom plugins. Some plugins will be easier to write obvious support than others by allowing you to specify 
mock data or simply return a console message. It is up to you to determine what's best for your plugins. 

Follow the [Cordova Plugin Development docs](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html) on the Official Apache Cordova site 
and ensure you've defined the `browser` platform handling in your `plugin.xml` mapping. You can take a look at the core plugins for specific examples of how 
to implement it as well. 
 
<div class="alert--info">**NOTE:** The PhoneGap Desktop App browser support will be released in the near future.</div>