---
title: "Performance Tip: Hardware Acceleration"
layout: "tutorialspage"
next: /tutorials/optimize/05-paint-before-animate
---

Devices have a separate GPU that can be tapped by invoking a CSS transform on them. 
In effect, this trick is all about rendering your element the same as it always is but by telling the browser that you want a 3D transform, you’re moving the rendering of this element from the CPU to the GPU. You can do this by applying a simple CSS `translate3d` shown below.

	.accelerated {
     	transform: translate3d(0,0,0);
	}
	
	transform: translateZ  
	will-change: transform
	will-change: opacity

In Chrome and Safari you might see a flickering effect when using CSS transforms and need the declaration of `-webkit-backface-visibility:hidden; & -webkit-perspective: 1000;` to fix the issue.
You need to be careful using CSS 3D transforms in this manner however because the amount of memory available on the GPU is limited and exceeding it can cause your app to crash. You should use this trick with more complex parts of views where you apply it to the top-level element. 

####Additional References: 
+ https://dev.opera.com/articles/css-will-change-property/
+ http://www.infoq.com/interviews/arel-hybrid-mobile-development?utm_term=global



