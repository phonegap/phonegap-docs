---
title: Adobe Stockpile Sample App
url: references/stockpile-app
layout: subpage
---

## Overview

The Stockpile App is a sample mobile app written by the Adobe PhoneGap team to showcase how to use PhoneGap to build highly performant, fully-featured mobile apps. The app allows you to search for images from the [Adobe Stock Photo Library](https://stock.adobe.com/), view details, download, add favorites and more. It was built using the latest web standards and is being provided to developers to use as a reference when creating their own mobile apps. 

This guide will walk through how to build Stockpile step by step with a series of lessons aimed to teach mobile app development with PhoneGap using a proven technology stack.

## Technology Stack

The Stockpile app was built using [Framework7 with Vue.js bindings](http://framework7.io/vue/) and the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/) with the [PhoneGap Split View Panel app template](https://github.com/phonegap/phonegap-template-vue-f7-split-panel) base.

<div class="alert--info">**NOTE:** The goal of this guide is to take you through the process of building a full blown mobile app using PhoneGap with some popular tools and frameworks currently available. As such, it is more of an intermediate guide and will assume some knowledge by the developer. We highly recommend keeping the documentation for the other frameworks and tools used open while going through each lesson so you gain the most out of the learning process. There's a list of resources included at the bottom of the page you will find useful throughout this guide.</div>

## Requirements

- A code editor, Chrome browser, and connection to the Internet
- Node.js 6.x+
- PhoneGap CLI (npm install -g phonegap@latest)

<div class="alert--tip">**TIP:** Install the [VueJS Devtools Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) to help debug your app in the Chrome browser.
</div>

## Preview

<img class="mobile-image" src="/images/stockpile/search.png" alt="Stockpile Search Screen"/>
<img class="mobile-image" src="/images/stockpile/search-results.png" alt="Stockpile Results Screen"/>
<img class="mobile-image" src="/images/stockpile/details.png" alt="Stockpile Details Screen"/>
<img class="mobile-image" src="/images/stockpile/similar-results.png" alt="Stockpile Similar Results Screen"/>

<!--
![Search](/images/stockpile/search.png)
![Results](/images/stockpile/search-results.png)
![Details](/images/stockpile/details.png)
![Find Similar](/images/stockpile/similar-results.png)
-->

## Helpful Resources
- [Framework7](https://framework7.io/)
- [Framework7+Vue Docs](https://framework7.io/vue/)
- [Webpack Docs](https://webpack.github.io/docs/)
- [Demystifying Vue Webpack](https://alligator.io/vuejs/demistifying-vue-webpack/)
- [Official Apache Cordova Docs](http://cordova.apache.org/docs)
- [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html).