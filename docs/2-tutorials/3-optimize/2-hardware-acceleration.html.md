---
title: Hardware Acceleration
url: tutorials/optimize/hardware-acceleration
layout: subpage
---


### Overview
Hardware acceleration refers to offloading some processing from the CPU to the GPU (Graphics Processing Unit) to make your application run faster. The
GPU is meant for the heavy computation needed when rendering graphics and has thousands of threads over a CPU, thus making your application run quite a bit faster when 
used properly. The GPU is typically used for apps requiring 3D Rendering, WebGL and Canvas and not enabled for everything
since enabling it is costly, especially for devices with limited batteries. Implementing it the correct way is key with the
limited memory available on the GPU since exceeding it can cause your application to crash.    

#### How to Apply 
The browser will choose to hardware accelerate CSS transitions on elements that have their own compositing layer
Applying a CSS property that requires a compositing layer is a trick you can use to ensure hardware acceleration is used
if there's a particular part of your application you feel needs it. A 3D transform is a property that can be added to an 
element to move the processing from the CPU to the GPU, for instance: 


    .accelerateMe {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

	<div class="accelerateMe">
        <img...>
    </div>
}
	
