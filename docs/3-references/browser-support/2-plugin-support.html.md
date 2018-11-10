---
title: Plugin Support
url: references/browser-support/plugin-support
layout: subpage
---

The browser platform includes the ability to use any of the [Apache Cordova core plugins](/references/plugin-apis/) in your apps without disrupting your development. The level of support for them will vary depending on the type of functionality the plugin exposes. In some cases the browser version of the plugin may return mock data, and in other cases it may simply fail silently. You can take a look in the `src/browser` folder of any of the core plugins to determine exactly what to expect.

  ![](/images/browser-support/browser-folder.png)

For instance, take a look at the simple [DeviceProxy class](https://github.com/apache/cordova-plugin-device/tree/master/src/browser) for the device plugin and you'll see how it uses the User Agent to determine the specific browser being used. The [cordova-plugin-device-motion](https://github.com/apache/cordova-plugin-device-motion/blob/master/src/browser/AccelerometerProxy.js) is one you can check out to see how it simply returns mock data. The idea is that you're able to debug your apps with some level of support for the core plugins so you're not hung up on errors as a result of not running natively.

<div class="alert--info">**Note:** Check the plugin documentation for specific notes on the browser platform support for that particular plugin.</div>

Some of the core plugins use JavaScript API's that are actually supported in the Desktop browser natively, and in those cases the plugin will defer to use them. For instance, `cordova-plugin-geolocation` uses an API that is already supported in Chrome, Safari and Firefox.

<div class="alert--tip">**TIP:** Check the <a href='http://caniuse.com'>Can I Use</a> site to see which JavaScript APIs are currently supported by a given browser.</div>
