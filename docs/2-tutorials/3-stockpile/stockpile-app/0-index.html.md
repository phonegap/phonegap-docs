---
title: Building the Adobe Stockpile App
url: tutorials/stockpile
layout: subpage
next: 2-tutorials/3-stockpile/stockpile-app/01-project-overview.html.md
---

The Stockpile App is a sample mobile app written by the Adobe PhoneGap team to help teach developers how to use PhoneGap to build highly performant, fully-featured mobile apps. The Stockpile app allows you to search for images from the [Adobe Stock Photo Library](https://stock.adobe.com/), view details, download, add favorites and more. It was built using the latest web standards and is being provided to developers to use as a reference when creating their own mobile apps.

<img class="mobile-image" src="/images/stockpile/vids/stockpile-run2.gif" alt="Stockpile App"/>

This guide will walk through how to build Stockpile step by step with a series of lessons aimed to teach mobile app development with PhoneGap using a proven technology stack. The source code for each of the lessons is also provided in the [Stockpile app repo](https://github.com/phonegap/phonegap-app-stockpile/tree/tutorial-docs/docs) in case you run into problems and need to reset your working version at any point.

## Technology Stack

The Stockpile app was built using [Framework7 with Vue.js bindings](http://framework7.io/vue/) and the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/) with the [PhoneGap Split View Panel app template](https://github.com/phonegap/phonegap-template-vue-f7-split-panel) base.

<div class="alert--info">**NOTE:** The goal of this guide is to take you through the process of building a full blown mobile app using PhoneGap with some popular tools and frameworks currently available. As such, it is more of an intermediate guide and will assume some knowledge by the developer. We highly recommend keeping the documentation for the other frameworks and tools used open while going through each lesson so you gain the most out of the learning process. There's a list of resources included at the bottom of the page you will find useful throughout this guide.</div>

## Requirements

- A code editor, Chrome browser, and connection to the Internet
- Node.js 6.x+
- PhoneGap CLI (npm install -g phonegap@latest)

<div class="alert--tip">**TIP:** Install the [VueJS Devtools Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) to help debug your app in the Chrome browser.
</div>

## Helpful Resources

- [Framework7](https://framework7.io/)
- [Framework7+Vue Docs](https://framework7.io/vue/)
- [VueJS Guide](https://vuejs.org/v2/guide/)
- [Vue PWA Template](https://github.com/vuejs-templates/pwa)
- [Vue Webpack Template Docs](https://github.com/vuejs-templates/webpack/tree/develop/docs)
- [Webpack Docs](https://webpack.github.io/docs/)
- [Demystifying Vue Webpack](https://alligator.io/vuejs/demistifying-vue-webpack/)
- [Official Apache Cordova Docs](http://cordova.apache.org/docs)
- [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html).