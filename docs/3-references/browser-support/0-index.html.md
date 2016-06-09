---
title: PhoneGap Browser Support
url: references/browser-support
layout: subpage
---

PhoneGap apps are built with web technologies providing the benefit of allowing you to use your desktop browser to rapidly iterate through your development phases while taking advantage of the built-in developer tooling you already know and love.

You can even design your app layout and test it across a variety of screen resolutions without moving to a physical device using tools like the [Chrome mobile device emulators](https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/) and [Safari Responsive Design Mode](https://developer.apple.com/safari/tools/).

## Chrome Developer Tools

![](/images/browser-support/chrome-debug-deviceready.png)

## Safari Responsive Design Mode

![](/images/browser-support/safari-responsive2.png)

## Overview

The specific browser support referred to in this guide is different than just opening up your `index.html` from your `www` folder in your browser as you may have done in the past. This includes support for the Apache Cordova core plugins and the Cordova `deviceready` event to aid in your testing and debugging.

The browser as an initial platform target helps greatly reduce the challenges faced by mobile developers due to platform fragmentation. It also provides the ability for a developer to build an app for both the desktop web browser and mobile device where the additional native functionality is used only when running on the device by leveraging plugins.

The browser platform is not without its limitations, however, and developers should understand those limitations specifically to get the most value from this new platform target during their development phase. Check out the [Caution/Next Steps](/references/browser-support/caution-next-steps) section for more details.
