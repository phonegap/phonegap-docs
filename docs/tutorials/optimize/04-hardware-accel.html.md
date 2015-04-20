---
title: "Hardware Acceleration"
layout: "tutorialspage"
<<<<<<< Updated upstream:docs/tutorials/optimize/04-hardware-accel.html.md
next: /tutorials/optimize/05-paint-before-animate
=======
next: /tutorials/optimize/05-image-handling.html
>>>>>>> Stashed changes:docs/tutorials/optimize/04-hardware-accel.md
---

Hardware acceleration refers to offloading some processing from the CPU to the GPU (Graphics Processing Unit) to make your application run faster. The
GPU is meant for the heavy computation needed when rendering graphics and has thousands of threads over a CPU, thus making your application run quite a bit faster when 
used right. Implementing it the correct way is key with the limited memory available on the GPU since exceeding it can cause your application to crash.  

Developers often choose to use hardware acceleration in their hybrid mobile applications is for creating smoother, more native-like transitions 
and animations. The GPU would not be used automatically for those since it's really meant for 3D Rendering, WebGL and Canvas but there's a trick 
that can be used to tap into it when the application demands a smoother experience.

#### The Trick 
The trick (hack) is to apply a 3D transform to your element to move the processing from the CPU to the GPU. 
You can do this by applying a simple CSS `translate3d` with values set to 0's as shown below.

	transform: translate3d(0,0,0);
	
### Additional References: 
+ http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
+ https://dev.opera.com/articles/css-will-change-property/
+ http://www.infoq.com/interviews/arel-hybrid-mobile-development



