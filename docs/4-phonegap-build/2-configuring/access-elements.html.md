---
title: Access Elements
url: phonegap-build/configuring/access-elements
layout: subpage
---

<div class='alert--warning' style="font-style:bold">
As of Cordova iOS 4.x, Cordova Android 4.x, and Cordova Windows 4.x, whitelist management was moved from the core Cordova project to the `cordova-whitelist-plugin`, including the addition of the `allow-navigation` and `allow-intent` elements. You must add this plugin to enable and restrict network access in your application.

```xml
  <plugin name="cordova-plugin-whitelist" />
```

[See the cordova-whitelist-plugin repository for up to date documentation](https://github.com/apache/cordova-plugin-whitelist).
</div>
