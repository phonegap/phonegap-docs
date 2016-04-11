---
title: PhoneGap Desktop Browser Support
url: references/browser-support
layout: subpage
expand: browser-support
---

### Overview
PhoneGap apps are built with web technologies and offer the benefit of allowing you to use your desktop browser
to rapidly iterate through your development phases while taking advantage of the built-in developer tooling you already 
know and love. 

You can also implement your layout and test it across a variety of screen sizes without moving to a physical device using tools like
the [Chrome mobile device emulators](https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/) and [Safari Responsive
Design Mode](https://developer.apple.com/safari/tools/).


#### Chrome Developer Tools
![](/images/browser-support/chrome-debug-deviceready.png)

#### Safari Responsive Design Mode
![](/images/browser-support/safari-responsive2.png)

The specific browser support referred to in this guide is different than just opening up your `index.html` from your `www` folder in
your browser as you may have done in the past. This includes support for the core plugins and the Cordova `deviceready` event to aid
 in your testing and debugging. 

The browser as an initial platform target helps greatly reduce the challenges faced by mobile developers due 
to platform fragmentation. It also helps in those cases where a developer wants to build an app for both the
web and mobile that simply provides extra functionality when run on a device via PhoneGap versus the desktop
 browser. 
 
 The browser platform is not without its limitations and developers should understand what they are specifically
 to get the most value from this new platform target during their development phase. Check out the 
 [Caution/Next Steps](/references/browser-support/caution-next-steps) section for more details. 
