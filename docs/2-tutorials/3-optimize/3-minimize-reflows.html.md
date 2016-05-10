---
title: Minimize Reflows
url: optimize/minimize-reflows
layout: subpage
write: false
---

## Problem:

Setting properties that cause a change to layout (`display`, `float`) or visibility (`width`, `height`, `color`, `outline`) will trigger a **reflow** or **repaint** and can greatly affect your application performance.

### In Summary

- A *reflow* is caused by a change to a property affecting the layout of the page and causes the browser engine to recompute the dimensions and position of the element as well as trigger a reflow on each on of the element's children, ancestors and elements after it.

- A *repaint* is caused by a change to a property affecting visibility and is costly since the browser must verify the visibility of all other nodes in the DOM tree.

### What causes a reflow?

- Resizing the window
- Changing the font
- Adding or removing a stylesheet
- Content changes (a user typing text in an input box)
- Activation of CSS pseudo classes such as `:hover`
- Manipulating the class attribute
- A script manipulating the DOM
- Calculating `offsetWidth` and `offsetHeight`
- Setting a property of the style attribute

<div class="alert--info">**Tip:** To see which CSS properties can cause one or the other specifically, check out this useful [CSS Triggers Reference]([http://csstriggers.com](http://csstriggers.com).</div>

## Solution:

Be cautious of manipulating DOM elements that cause reflows and repaints. If you're adding animations, stick to animating `transform` and `opacity` properties for better mobile web browser performance.

## 10 Best Practices to Minimize Reflows

1. Avoid setting multiple inline styles; avoid setting styles individually.
1. Use class names of elements, and do so as low in the DOM tree as possible.
1. Batch your DOM changes and perform them “offline”
1. Avoid computing styles too often.  If you must then cache those values.
1. Apply animations with `position: fixed or absolute` so it doesn’t affect the layout of other elements.
1. Avoid table layouts, they trigger more reflows than block layouts because multiple passes must be made over the elements.
1. Reduce unnecessary DOM depth. Changes at one level in the DOM tree can cause changes at every level of the tree - all the way up to the root, and all the the way down into the children of the modified node. This leads to more time being spent performing reflow.
1. Minimize CSS rules and remove unused CSS rules.
1. If you make complex rendering changes such as animations, do so out of the flow. Use position-absolute or position-fixed to accomplish this.
1. Avoid unnecessary complex CSS selectors - descendant selectors in particular.

### Additional Reading (and source credits):

- [Reflows & Repaints: CSS Performance making your JavaScript Slow?](http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/)
- [Minimizing Browser Reflows](https://developers.google.com/speed/articles/reflow)
- [Avoiding unneccessary Paints](http://www.html5rocks.com/en/tutorials/speed/unnecessary-paints)
- [How Bad is DOM Interaction](http://andyshora.com/how-bad-is-dom-interaction-javascript.html)
