---
title: Usage
url: references/browser-support/usage/cli
layout: subpage
tabs:
  - label: Desktop App
    url: references/browser-support/usage/desktop
  - label: CLI
    url: references/browser-support/usage/cli
---

<div class="alert--warning">You should ensure you have installed the latest version of the PhoneGap CLI by running `$ npm update -g phonegap@latest`</div>

PhoneGap makes it easy to use the browser target by adding it automatically as an additional platform when you `serve` your apps with the [PhoneGap CLI](/references/phonegap-cli/serve/):

```sh
$ phonegap serve
```

You will see a local IP address in the console output which you can open directly in your browser (or via `http://localhost:<portNumber>`) and start debugging.

![](/images/browser-support/serve-command.png)

You can also start making edits to your source code and see the changes immediately in the browser without having to restart due to the built-in live reload feature.

![](/images/browser-support/live-reload.png)

<div class="alert--tip">**TIP:** You can pass a port number to use specifically when serving your app using the `--port` parameter. For example `$ phonegap serve --port 3002`.</div>

The browser platform support ensures the `deviceready` event is fired in the browser and allows you to use all of the core plugins without disrupting your development.

![](/images/browser-support/chrome-debug-deviceready.png)

<div class="alert--info">**Note:** Check out the <a href='/references/browser-support/plugin-support'>plugin support section</a> for more details on how plugins can be used in the browser.</div>

## No Browser Support Flag

Of course, using the browser support may not be necessary for all users. If you would like to continue serving applications without the browser, you can do so by running

```sh
$ phonegap serve --no-browser.
```
