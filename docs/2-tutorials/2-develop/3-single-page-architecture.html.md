---
title: Single Page Architecture
url: develop/single-page-architecture
layout: subpage
write: false
---

## Overview

Single Page Architecture (aka Single Page Applications or SPA's) is a concept many developers building HTML5 apps are likely familiar with, however it's worth mentioning for those that may not be as it is currently considered a hybrid mobile app best practice.

The reason it's popular for mobile development specifically is the resulting native-like fluid user experience that can be attained using this architecture since the UI can be redrawn without requiring a server roundtrip to retrieve HTML. State changes occur via JavaScript using templates and DOM manipulation and the logic stays on the client side.

![](/images/spa.png)

**Figure 1:** Single Page App Architecture Diagram

## Characteristics

Some characteristics of a Single Page Application are listed below:

+ **Routing** – navigation and view state changes without reload. Often implemented via a hash (#) in the URL (ie: `http://myapp.com/#/users/12`).

+ **Templating** – declarative binding of data to HTML templates replaces UI coding and DOM manipulations (see [Mustache.js](http://mustache.github.io/), [Underscore.js](http://underscorejs.org)

+ **Controllers** – JavaScript code to handle state changes, data manipulation, AJAX calls etc that separate views and models using MVC or MVVM patterns. (see AngularJS, Backbone.js, Ember, Knockout etc)

+ **Chunking** – chunks of HTML fragments and JSON data are loaded instead of receiving a full HTML page from a web server on every request.

+ **Local storage** – data is often stored locally for performance and offline access.

### Best Practices

Some general best practices to keep in mind when building Single Page Applications are:

1. Load data locally first before going to a server
1. Handle for offline scenarios.
1. Cache images and resources

### Benefits

+ Less network bandwidth is needed/used
+ Navigation is faster

### Frameworks

Some popular JavaScript frameworks to help you build Single Page Applications are listed below:

+ [React](https://facebook.github.io/react/)
+ [AngularJS](http://angularjs.org)
+ [Ember](http://emberjs.com)
+ [Backbone.js](http://backbonejs.org)
+ [Knockout](http://knockoutjs.com)

### Additional Reading

[Single Page App Book](http://singlepageappbook.com/)
