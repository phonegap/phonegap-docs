---
title: "Performance Tip: Paint before Animate"
layout: "tutorialspage"
next: /tutorials/optimize/06-image-handling
---

####Problem: 
Animations can compete with repaints, including those caused by loading a new view template. This could occur when a view template is being rendered (a repaint occurring) and a slide animation occurring at the same time.

####Solution:
Defer the animation until after you've painted. First, append your new view to the DOM, but make sure it's off the screen or transparent. Then, in a requestAnimationFrame call, do your animation. That's it! The requestAnimationFrame callback won't be called until the paint is done, and we're ready to animate.

Load or render template in  an offscreen or transparent form then use `requestAnimationFrame` to cause the animation to occur only *after* paint is finished.

Like we said previously, one of the keys to fast animations is to ensure that your animations aren't competing with repaints. Repaints not caused directly by your animation are just as bad.

Let's say a user clicks a button to go to another page. If we render the page and then immediately animate it in, the painting and the animating will happen concurrently, and jank can occur. The solution is to defer the animation until after you've painted. 

#### Steps:
1. Append your new view to the DOM ensuring it's located off the screen or transparent. 
2. Then call `requestAnimationFrame` to perform the animation. The `requestAnimationFrame` callback will be called until the paint is done, and we're ready to animate.

"Instead, you should try to use window.requestAnimationFrame(). This waits until the browser is actually ready to start building the next frame of your animation, and won't bother if the hardware isn't going to actually draw anything. Another benefit to this API is that animations won't run while your app isn't visible on the screen (such as if it's in the background and some other task is operating)"

Caveat: if you're rendering a large page, your animation won't jank, but it may a long wait before the animation runs. This is just because painting a lot of content takes a long time. Generally when this is the case, try to just paint everything "above the fold" before you animate the view in, and then start painting everything else in asyncronously once it's loaded.

#### Further Reading:
https://developer.mozilla.org/en-US/Apps/Build/Performance/Performance_fundamentals