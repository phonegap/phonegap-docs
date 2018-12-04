---
title: Augmented Reality
url: tutorials/develop/wikitude
github_url: https://github.com/phonegap/phonegap-docs/blob/wikitude/docs/2-tutorials/2-develop/9-developing-with-wikitude.html.md
layout: subpage
write: false
---

## Overview

Wikitude's augmented reality Cordova plugin has recently become available in the PhoneGap Developer App allowing developers to build apps that can detect images or locations and project 2D images or 3D models.

See the demo in action on our PhoneGap Day EU 2016 T-Shirts!

<div class="video-wrapper">
<iframe width="420" height="315" src="https://www.youtube.com/embed/Om8CiurYLWg" frameborder="0" allowfullscreen></iframe>
</div>

## Running from Hosted Template

You can test the above demo by downloading and launching the PhoneGap Developer App (v1.7.0 and higher - Windows Phone not supported). Then use this address: `ar.phonegap.com` in the url section of the PhoneGap Developer App.

  <img class="mobile-image" src="/images/dev-app-wikitude.jpg" alt="PhoneGap Developer App and Wikitude"/>

## Running from Local Template

Instead of running from `ar.phonegap.com` you can create your own augmented reality PhoneGap project by using the command:

```sh
$ phonegap create myApp --template wikitude-augmented-reality
$ cd myApp
$ phonegap serve
```

## Developing

There's one additional line you'll need to include when using the Wikitude plugin with the PhoneGap Developer App specifically. When loading the AR worlds, you'll need to specify the `cordova.file.dataDirectory + path/to/ARWorld` location.

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

The most comprehensive guide to developing with the Wikitude plugin can be found at [Wikitude's developer guides](http://www.wikitude.com/developer/documentation/phonegap). You may also want to github clone [Wikitude's sample repo](https://github.com/Wikitude/wikitude-cordova-plugin-samples). Just remember that when using `phonegap serve` to serve the `wikitude-cordova-plugin-samples`, you must use `cordova.file.dataDirectory + architectWorld.path` [here](https://github.com/Wikitude/wikitude-cordova-plugin-samples/blob/master/SampleAppResources/js/index.js#L65).

To see the PhoneGap Day EU 2016 T-Shirt demo, you may find the [project's repo here.](https://github.com/timkim/phonegap-app-augmented-reality)

## Uploading your own images to detect

In order to detect your own images, you must signup to the Wikitude developer program. Once there, you can upload your files and download a `.wtc` file. See [this guide](http://www.wikitude.com/external/doc/documentation/latest/phonegap/gettingstartedcloudrecognition.html#getting-started-with-the-cloud-recognition-service) for more info.

## Going beyond the PhoneGap Developer App

If you want to include the Wikitude cordova project into your own app, then you must sign up for a license or free trial. Once you obtain your sdk key, simply place it in the wikitude.js file and install it in your app. See [this guide](http://www.wikitude.com/external/doc/documentation/latest/phonegap/triallicense.html#where-should-i-enter-the-license-key) for more info.
