---
title: Usage
url: references/browser-support/usage/desktop
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/3-references/browser-support/usage/1-desktop.html.md
layout: subpage
tabs:
  - label: Desktop App
    url: references/browser-support/usage/desktop
  - label: CLI
    url: references/browser-support/usage/cli
---

<div class="alert--warning">You should ensure you have the [latest version](/getting-started/1-install-phonegap/desktop) of PhoneGap Desktop before getting started.</div>

PhoneGap makes it easy to take advantage of the browser target by automatically adding it as an additional platform when your apps are *served* (run on a local web server).

In the image below, when the arrow (>) is green it implies that PhoneGap project is being served on the IP Address shown in the green bar at the bottom.

![](/images/desktop-app-create.png)

You can then open that IP Address directly in your browser (or via `http://localhost:<portNumber>`) and start debugging. You can also start making edits to your source code and see the changes immediately in the browser without having to restart due to the built-in live reload feature.

![](/images/browser-support/live-reload.png)

<div class="alert--tip">**TIP:** You can change the port number used for serving your projects via the [PhoneGap Desktop settings](/references/desktop-app/edit-settings).</div>

<div class="alert--info">**Note:** If you're new to PhoneGap Desktop, check out the [Getting Started guide](/getting-started/1-install-phonegap/desktop).</div>

The browser platform support ensures the `deviceready` event is fired in the browser and allows you to use all of the core plugins without disrupting your development.

![](/images/browser-support/chrome-debug-deviceready.png)

<div class="alert--info">**Note:** Check out the [plugin support section](/references/browser-support/plugin-support) for more details on how plugins can be used in the browser.</div>
