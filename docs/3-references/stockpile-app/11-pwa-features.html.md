---
title: Lesson 10 - PWA Features
url: references/stockpile-app/10-pwa-features
layout: subpage
---

The project has built-in PWA support as a result of the template being built on top of the [Vue CLI PWA template](https://github.com/vuejs-templates/pwa). 

## Manifest
See this [manifest.json link](https://github.com/vuejs-templates/pwa/blob/master/template/index.html#L12) 

## Cross Browser Support
[UI Customizations](https://github.com/vuejs-templates/pwa/blob/master/template/index.html#L8-L22)
- meta tags etc

## PWA Best Practices 
[Handling when JavaScript not enabled](https://github.com/vuejs-templates/pwa/blob/master/template/index.html#L29-L31)

## Service worker support
See [this content](https://github.com/vuejs-templates/pwa/blob/master/template/index.html#L34)

## Building/testing for dev’t vs production workflow
Must test using the `phonegap serve` command or deploy to an `https` URL with Firebase or something similar. The [`sw-precache-webpack-plugin`](https://www.npmjs.com/package/sw-precache-webpack-dev-plugin) is currently used and [does not work with the webpack dev server](https://github.com/vuejs-templates/pwa/issues/12)

## Resources
- [Vue CLI Webpack Template Docs](http://vuejs-templates.github.io/webpack/) 
- [Vue CLI PWA Template Docs](https://github.com/vuejs-templates/pwa/tree/master/docs)
- [Cross Platform PWA Workshop](http://hollyschinsky.github.io/todos-app-pwa)