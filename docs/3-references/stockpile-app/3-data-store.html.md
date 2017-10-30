---
title: Lesson 3 - Data Store Setup
url: references/stockpile-app/3-data-store
layout: subpage
---

## Overview

`https://vuejs.org/v2/guide/state-management.html`

## Add JavaScript handling

Update main.js with this new global store object:

	// Global store defaults
	window.store = {
	  images: [],
	  imagesById: {}
	};