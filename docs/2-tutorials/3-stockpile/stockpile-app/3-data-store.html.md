---
title: Lesson 3 - Data Store Setup
url: tutorials/stockpile/3-data-store
layout: subpage
next: 2-tutorials/3-stockpile/stockpile-app/4-stock-api.html.md
---

## Overview

To handle state management in smaller to medium Vue applications, one common pattern is to use a [global store](https://vuejs.org/v2/guide/state-management.html) defined on the `window` object for access throughout the app. You can then assign any shared object to be a property on a Vue instance's `data` source and it will automatically be converted to a [reactive variable](https://vuejs.org/v2/guide/reactivity.html).

## Create a Global Store

1. Open `~src/main.js` and add the following store object to the [global `window` object:](https://developer.mozilla.org/en-US/docs/Web/API/Window/window) bottom of the file:

```javascript
    // Set up a global store
    const favorites = [];
    const favoritesById = [];

    // Global store defaults
    window.store = {
      images: [],
      imagesById: {},
      favorites,
      favoritesById
     };
```

<div class="alert--tip">The variables held in this global store will manage the array of images returned from the Stock API and those that were favorited, as well as two variables to access an object from one of those arrays by ID.</div>

## Resources:

- [Simple state management, simpler than Vuex](http://vuetips.com/simple-state-management-vue-stash)