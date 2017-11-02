---
title: Lesson 3 - Data Store Setup
url: references/stockpile-app/3-data-store
layout: subpage
---

## Overview

To handle state management in smaller to medium Vue applications, one common pattern is to use a [global store](`https://vuejs.org/v2/guide/state-management.html`) defined on the `window` object for access throughout the app. You can then assign any shared object to be a property on a Vue instance's data source (which is automatically converted to be reactive).

## Add JavaScript handling

Update main.js with this new global store object:

	// Global store defaults
	window.store = {
	  images: [],
	  imagesById: {}
	};