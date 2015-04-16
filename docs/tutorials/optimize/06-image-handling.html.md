---
title: "Performance Tip: Image Handling"
layout: "tutorialspage"
next: /tutorials/optimize/01-genl-perf-tips.html
---

## Serve Images at Desired Resolution

####Problem: 
Browsers have limited cache for resized images. Once full, scrolling up and down where old (no longer cached) images were used will cause them to have to be resized again on the fly resulting in a choppy experience.

####Solution:
Serve images at the resolution you want them to be displayed.

Browsers have a limited cache for resized images. Once that cache fills up, older images get evacuated from the cache. This means that, as the user scrolls up and down the page, they will constantly run into images that are not in the cache. These images will have to be decoded and resized again on the fly.

The way it works is this. The browser decodes the image from whatever format it's in (jpeg, png, whatever), into a bitmap, which it then resizes and caches.

This resize will cause one of two things: either it will cause your scrolling to jank, or it'll cause the scrollable area on your mobile site to be white while the mobile browser draws the image in the background. This isn't ideal, and will result in your users not being able to see what they're scrolling through since it can't be loaded fast enough. The solution is to serve and download images at the resolution they'll be displayed.


## Use CSS Sprite Sheets

####Problem
Reduce the amount of HTTP requests that need to be made by combining your images into a CSS Sprite Sheet where possible. 


Using images in your mobile applications enhances the overall look but at the same time causes them run much slower since each background image requires another HTTP request. 

####Solution
With the use of CSS Sprite Sheets you can combine an unlimited number of images into one and the server only has to send one image file containing all of your images rather than each individual one. Then you can display any segment from that file as a background to an element through CSS styling. 

To use specific segments from a CSS sprite sheet for a background image for instance, just create a new image that is as wide as your widest image and and as tall as the combined height of all your images plus X pixels, where X is the number of images you have. Then place your images into this new image, left aligned, one on top of the other with one pixel of white space in between.

###### #nav li a {background-image:url('../img/image_nav.gif')}
###### #nav li a.item1 {background-position:0px 0px}
###### #nav li a:hover.item1 {background-position:0px -72px}
###### #nav li a.item2 {background-position:0px -143px;}
###### #nav li a:hover.item2 {background-position:0px -215px;}


You can use a tool like [Sprite Cow](http://www.spritecow.com/) to help you define sprite sheets and just grab the corresponding CSS. 

**TODO: Add vector vs raster here? ** 