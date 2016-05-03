---
title: Image Handling
url: tutorials/optimize/image-handling
layout: subpage
---

Image optimization should be done for any mobile hybrid application you're creating, yet the details of how to do it are often unknown
to developers, particularly if you don't have a designer advising you. This guide points out some specific cases to look at when building
your mobile hybrid applications to get the most performance with the graphics used. 

### 1. Choose the Right Image Type
You can choose between a vector or raster image in many cases, but knowing which one to use will depend on knowing more about each type. 
Some characteristics of each are listed below:

##### Vector Images
+ Geometric shape based images often used for icons, charts, logs etc with hard edges
+ Example file types are .svg, .ai, .eps
+ Zoom and resolution-independent

##### Raster Images
+ Consist of many colored pixels or individual building blocks with lots of detail or irregular shapes
+ Most of the images found on the web or in print are raster images
+ Example file types are .jpg, .gif, .png, .tif
+ Fixed number of pixels, cannot be resized without compromising resolution
+ Save them at the precise dimensions needed to avoid distortion

If you need your image to be zoomed or resized then you should consider using a vector image. If your image has a lot of details or is 
a complex scene then choose a raster image but be sure to save it at the actual dimensions and don't perform any scaling on it. 


### 2. Don't Use Browser Scaling
Don't rely on the browser to scale your images by serving them at full size and setting width/height properties but instead serve them at their
 desired size. 

<div class="alert--info">** Tip:** Refer to [this great article](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) on 
Image Optimization for more details. </div>


### 3. Use CSS Sprite Sheets
Combining your images into a CSS Sprite Sheet will reduce the amount of HTTP requests that need to be made and allow your application to run faster.
Once in the sprite sheet, use CSS styling to display a segment as a background to an element.

<div class="alert--info">**Tip:** You can use a tool like [Sprite Cow](http://www.spritecow.com/) to help you define sprite sheets and then copy the corresponding CSS.</div> 


