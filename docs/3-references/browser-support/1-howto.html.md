---
title: Usage
url: references/browser-support/howto
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/browser-support/1-howto.html.md
layout: subpage
expand: browser-support
---
 
PhoneGap makes it easy to use the browser support by adding it automatically as an additional platform target 
 when you `serve` your apps from the [PhoneGap CLI](/references/phonegap-cli/serve/):
 
    $ phonegap serve
 
 ![](/images/browser-support/serve-command.png)

<div class="alert--note">**Note:** Be sure to grab the latest version of the PhoneGap CLI if you don't have it already via `npm update -g phonegap@latest`</div>
    
You will see a local IP address in the console output which you can open directly in your browser (or via `localhost:portNumber`) and start debugging. You
can also start making edits to your source code as needed and see them pushed immediately to your browser due to the live reload feature also supported.  

 ![](/images/browser-support/chrome-debug.png)
 
<div class="alert--tip">**TIP:** You can pass a port number to serve your app on specifically using the `--port` parameter such as: `phonegap serve --port 3009`.</div>
  
The browser platform support ensures the `deviceready` event is fired in the browser and allows you to use all of the core plugins without 
disrupting your development. Each [Apache Cordova core plugin](http://docs.phonegap.com/plugin-apis/) has this additional `browser` platform 
target specifically supported which will often contain 
a [Proxy class](https://github.com/apache/cordova-plugin-device/tree/master/src/browser) that will return mock 
data ([cordova-plugin-device-motion](https://github.com/apache/cordova-plugin-device-motion/blob/master/src/browser/AccelerometerProxy.js) 
 for instance), or simply fail silently ensuring your app continues to execute. 
 
 ![](/images/browser-support/chrome-debug-deviceready.png)
 
Some of the core plugins use JavaScript API's that are actually supported in the Desktop browser natively, and in those cases the plugin will defer to use
 them. For instance, `cordova-plugin-geolocation` uses an API that is already supported in Chrome, Safari and Firefox. 
 
 <div class="alert--tip">**TIP:** Check the [Can I Use](http://caniuse.com) site to see which JavaScript APIs are currently supported by a 
 given browser.</div> 

 <div class="alert--info">**Note:** Check the plugin documentation for specific notes on the browser platform support for that particular plugin.</div> 

### No Browser Support Flag  
Of course, using the browser support may not be necessary for all users. If you would like to continue serving applications without 
the browser, you can do so by running 

    $ phonegap serve --no-browser.
