---
title: Using Augmented Reality with the Wikitude Cordova Plugin
url: references/developer-app/wikitude
github_url: https://github.com/phonegap/phonegap-docs/blob/wikitude/docs/3-references/developer-app/8-developing-with-wikitude.md
layout: subpage
expand: dev-app
---

## Overview

Augmented reality has now come to the PhoneGap Developer App with the inclusion of the Wikitude Cordova plugin. Users of the PhoneGap Developer App will now be able to detect images or locations and project 2D images or 3D models.

To see an example, here's a [video](video link).

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

* [ar.phonegap.com project repo](https://github.com/timkim/phonegap-app-augmented-reality)
* [Wikitude developer guide](http://www.wikitude.com/developer/documentation/phonegap)
* [Sample code repo](https://github.com/Wikitude/wikitude-cordova-plugin-samples)

## Uploading your own images to detect

In order to detect your own images, you must signup to the Wikitude developer program. Once there, you can upload your files and download a `.wtc` file. See [this guide](http://www.wikitude.com/external/doc/documentation/latest/phonegap/clientrecognition.html#client-recognition) for more info.

## Going beyond the PhoneGap Developer App

If you want to include the Wikitude cordova project into your own app, then you must sign up for a license or free trial. Once you obtain your sdk key, simply place it in the wikitude.js file and install it in your app. See [this guide](http://www.wikitude.com/external/doc/documentation/latest/phonegap/triallicense.html#where-should-i-enter-the-license-key) for more info.
