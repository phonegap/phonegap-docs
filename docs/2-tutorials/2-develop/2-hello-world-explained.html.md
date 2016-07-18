---
title: Hello World Explained
url: tutorials/develop/hello-world-explained
layout: subpage
---

Now that we've installed the tools necessary to create and preview the default PhoneGap application, it's worth stopping to take a moment to look through the default application and point out some important details.

## `viewport`

Open the **index.html** file (located within your project root's ***www*** folder) and notice the `viewport` meta element. This is used to indicate how much of the screen should be used by the application content and specify how it should scale. Scaling refers to the zoom level, where `initial-scale` indicates the desired zoom upon load, the `maximum-scale`, `minimum-scale` values control the least and most allowed and `user-scalable` properties control whether a user should be allowed to control the scale or zoom factor (via pinch gesture for instance).

In the default application the settings are configured to load the content at 100%, (`initial-scale=1`) allow no user scaling (`user-scalable=no`), and use the maximum width and height of the device.

```html
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1,
width=device-width, height=device-height, target-densitydpi=device-dpi" />
```

## `cordova.js`

In the **index.html** file you'll notice a script tag pointing to a `cordova.js` file like below:

```html
<script type="text/javascript" src="cordova.js"></script>
```

The **cordova.js** file is the PhoneGap (powered by the open-source Apache Cordova project, hence the name) library and what's used to specifically access the native device hardware (camera, contacts, GPS etc) from JavaScript in our PhoneGap apps. Including this file reference ensures the Cordova APIs have access to those features and are available.

You may notice that there isn't a **cordova.js** file however located anywhere in the folder. That's because the right version for the platform is injected for you at runtime by the Developer app or the PhoneGap CLI if you're building your projects using the CLI. You simply need to ensure the reference is available.

## `index.js`

The **index.js** file is another JavaScript file referred to in another script tag in the index.html. This file is not required in your applications, but is
specific to this default application and used to add simple logic around determining when the Cordova library has loaded and is ready to be used. More information on that follows in the next section. Notice that the index.html contains a line to call an `initialize` function via an `app` variable right before the closing HTML body tag:

```html
<script type="text/javascript">
  app.initialize();
</script>
```

This calls the `initialize` function on the app variable defined in the index.js file under the **www/js** folder. Open that now before moving on.

## `deviceready`

The other important Cordova-specific feature to point out is the `deviceready` event. This event signals that Cordova's device APIs have loaded and are ready to access. If you start making calls to Cordova APIs without relying on this event, you could end up in a situation where the native code is not yet fully loaded and not available. Applications typically attach an event listener with `document.addEventListener` once the HTML document's DOM has loaded as shown below and in the default Hello application:

```js
document.addEventListener('deviceready', this.onDeviceReady, false);
```

In the index.js file you'll see that the `onDeviceReady` function then calls a `receivedEvent` function to visually display that the device is now ready. It does this by setting the CSS `display` attribute to `none` on the initial `<p>` element that was shown and instead shows the *Device is Ready* element in index.html by setting its `display` attribute to `block`.
Below is the relevant code snippet from the index.js followed by the index.html block.

### `index.js`

```js
onDeviceReady: function() {
  app.receivedEvent('deviceready');
},
  // Update DOM on a Received Event
receivedEvent: function(id) {
  var parentElement = document.getElementById(id);
  var listeningElement = parentElement.querySelector('.listening');
  var receivedElement = parentElement.querySelector('.received');

  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');

  console.log('Received Event: ' + id);
}
```

### `index.html`

```html
<div id="deviceready" class="blink">
  <p class="event listening">Connecting to Device</p>
  <p class="event received">Device is Ready</p>
</div>
```

## more `<meta/>` tags

Some other meta tags included in the default project are explained here as well.

## `format-detection`

```html
<meta name="format-detection" content="telephone=no" />
```

This meta tag represents an Apple feature to recognize a telephone number and make an automatic link from it providing implicit click-to-call support. However, too many numbers tend to get selected with this enabled including some addresses, ISBN numbers and other numeric data, so the recommendation is to set it to no to disable it and use the `tel:` scheme (per RFC 3966) in the URL instead. See [this link](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) for more details on this and other meta tags supported by Apple.

## `msapplication-tap-highlight`

```html
<meta name="msapplication-tap-highlight" content="no" />
```

This meta tag allows you to disable the grey tap highlight on Windows Phone 8 and greater. This property is similar to the `-webkit-tap-highlight-color` in iOS Safari except an HTML meta element rather than a CSS property.
