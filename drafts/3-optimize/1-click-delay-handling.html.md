---
title: Click Delay Handling
url: tutorials/optimize/click-delay-handling
layout: subpage
---

## Overview

When beginning mobile development, you may notice that your app feels sluggish when tapping UI elements on the screen. This is due to a 
click delay caused by mobile web browsers supporting a *double tap to zoom* event. Once the first tap is interpreted, the browser 
 waits 300ms for a 2nd tap to determine if the user is trying to zoom. This handling was implemented in the browsers long before
 Responsive Design and pinch to zoom were a thing, and though it's being handled now in some browsers, it's not across the board and still
 needs to be handled.

## Solutions

There are different solutions to consider for handling this click delay depending on how many platforms you need to support and what you're most 
comfortable with. The options are:

#### 1. FastClick Library (Cross Browser Support)
[FastClick](http://ftlabs.github.io/fastclick/) is a **touch-to-click** polyfill library you can implement to take the incoming touch events and 
map them to the click event without the 300ms delay, such as: 
        
        window.addEventListener('load', function() {
                FastClick.attach(document.body);
        }, false);

See their [documentation](http://ftlabs.github.io/fastclick/) for specific details on how to implement it. 

#### 2. Viewport `meta` tag (Chrome and Firefox)
The click delay can be disabled on Chrome and Firefox by using a viewport `meta` tag with the width set to the device width, such as:

        <meta name="viewport" content="width=device-width">

#### 3. `touch-action` CSS property (Internet Explorer, Chrome and Firefox)
There's a [`touch-action` CSS property]((https://msdn.microsoft.com/en-us/library/windows/apps/hh767313.aspx)) supported by some of the 
browsers that will eliminate the click delay when the value is set to `none` or `manipulation`. Be sure to check the browsers and versions that
support it [here](http://caniuse.com/#feat=css-touch-action). 


<div class="alert--info">**Tip:** Some UI frameworks have built-in handling for this and you may not need to worry about implementing a solution. Be sure to check 
 the documentation if you're using one. Some which do have it built in at the moment are [Ionic Framework](http://ionicframework.com/docs/api/page/tap/), 
 [Onsen UI](http://onsen.io/) and [Kendo UI Mobile](http://demos.telerik.com/kendo-ui/mobile-listview/index).</div>
  
  
  
