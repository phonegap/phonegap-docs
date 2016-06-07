---
title: Wikitude and Augmented Reality
url: tutorials/develop/wikitude
github_url: https://github.com/phonegap/phonegap-docs/blob/wikitude/docs/3-references/developer-app/8-developing-with-wikitude.html.md
layout: subpage
---

## Overview

Augmented reality has now come to the PhoneGap Developer App with the inclusion of the Wikitude Cordova plugin. Users of the PhoneGap Developer App will now be able to detect images or locations and project 2D images or 3D models.

To see an example, here's a [video](https://www.youtube.com/watch?v=Om8CiurYLWg&feature=youtu.be).

You can test the above demo by opening the PhoneGap Developer App (v1.7.0 and higher - Windows Phone not supported) and launching from this address: `ar.phonegap.com`.

## Developing

We have made developing with the Wikitude Cordova plugin as close to a non-PhoneGap Developer App environment, but there is one caveat. When loading the AR worlds, you must use the `cordova.file.dataDirectory` + `path/to/ARWorld` location when viewing through the PhoneGap Developer App!

For example:

```js
// To load AR worlds in the Phonegap Developer App must pre-prend with cordova.file.dataDirectory
app.wikitudePlugin.loadARchitectWorld(function succes(){}, function error(){},
    cordova.file.dataDirectory + architectWorld.path,
    architectWorld.requiredFeatures,
    architectWorld.startupConfiguration
);
```
## Examples and Guides

The most comprehensive guide to developing with the Wikitude plugin can be found at [Wikitude's developer guides](http://www.wikitude.com/developer/documentation/phonegap). You may also want to github clone [Wikitude's sample repo](https://github.com/Wikitude/wikitude-cordova-plugin-samples/tree/feature/cordova_file_plugin_support). Just remember that when using `phonegap serve` to serve the `wikitude-cordova-plugin-samples`, you must use `cordova.file.dataDirectory + architectWorld.path` [here](https://github.com/Wikitude/wikitude-cordova-plugin-samples/blob/feature/cordova_file_plugin_support/SampleAppResources/js/index.js#L52).

To see the PhoneGap Day EU 2016 T-Shirt demo, you may find the [project's repo here.](https://github.com/timkim/phonegap-app-augmented-reality)

## Uploading your own images to detect

In order to detect your own images, you must signup to the Wikitude developer program. Once there, you can upload your files and download a `.wtc` file. See [this guide](http://www.wikitude.com/external/doc/documentation/latest/phonegap/clientrecognition.html#client-recognition) for more info.

## Going beyond the PhoneGap Developer App

If you want to include the Wikitude cordova project into your own app, then you must sign up for a license or free trial. Once you obtain your sdk key, simply place it in the wikitude.js file and install it in your app. See [this guide](http://www.wikitude.com/external/doc/documentation/latest/phonegap/triallicense.html#where-should-i-enter-the-license-key) for more info.
