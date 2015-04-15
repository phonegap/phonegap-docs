---
title: "Performance Tip: Managing Click Delay"
layout: "tutorialspage"
next: /tutorials/optimize/03-min-reflows.html
---

In this section you'll learn about concepts and tips you should be aware of to increase the performance of your mobile hybrid application.
 
<div class="alert--warning">**Note:** Some UI frameworks handle one or more of the following tips so you may not need to specifically implement them depending on your setup.</div>  
 
####Problem

When beginning mobile development, you may notice that your app feels a bit sluggish when you tap on the screen. This is because the mobile web browser is trying to interpret touch commands to map them to old-style *click* events. The browser receives a *touchstart* event first, then it listens to see if the finger is going to move to scroll or release to become a tap before it fires the click event your app is listening for. These same browser engines also have a *double-tap-to-zoom* function so then there’s the issue of distinguishing between a *tap* and *double tap*. 

The total lag introduced by the browser trying to interpret the *touch* event to *click* event mapping is about 300ms. 300ms may not sound like a lot but it’s more than enough to make an app feel noticeable lag. 

####Solution

Use a **touch-to-click** polyfill like [FastClick](	</platform>). FastClick is a library you can implement to take the incoming touch events and maps them to the click event without the 300ms delay. An example of one way to use it is shown below, see their documentation for more details. 

	window.addEventListener('load', function() {
    		FastClick.attach(document.body);
	}, false);


Use a UI framework with built-in handling for this issue. Some also fix this issue for you out of the box such as [Ionic](http://ionicframework.com) and [OnsenUI](http://onsenui.io).


