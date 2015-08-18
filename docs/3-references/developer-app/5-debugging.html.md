---
title: Debugging
url: references/developer-app/debugging
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/developer-app/debugging.html.md
layout: subpage
---

We are looking at ways to help make debugging easier with the PhoneGap Developer app, but for now there are two options:

### Weinre
[Weinre](https://www.npmjs.com/package/weinre) is a limited implementation of Remote Web Inspector for remote debugging apps running on a device. 

Weinre runs locally on your machine bound to the IP Address where your application is being served from either the PhoneGap Desktop App or
the PhoneGap CLI. 

1. Install weinre
    
        $ sudo npm install -g weinre

2. Start up weinre with the following command, replacing the IP Address with your local machine's IP address found in your network settings: 

        $ weinre --boundHost x.x.x.x
    
    for example:
    
        $ ./weinre --boundHost 192.168.1.2    
        2015-08-17T20:51:35.866Z weinre: starting server at http://192.168.1.20:8080
    
  <div class="alert--tip">Another quick way to find the IP Address of your machine is by noting the IP Address your projects are served on from 
  the CLI or PhoneGap Desktop app minus the port number (ie: 192.168.1.20:3000 becomes 192.168.1.2). You could also find it in the PhoneGap
  Desktop Settings.</div>
    
3. Open your PhoneGap project to debug and add the following script tag in the *www/index.html* of the project you're debugging, replacing the IP Address with yours
and including the port 8080.
   
        &lt;script src="http://192.168.1.20:8080/target/target-script-min.js#anonymous"&gt;&lt;/script&gt;
     
     This will allow weinre access to debug your app when it's being served.  
    
4. Now use the PhoneGap Desktop Application or PhoneGap CLI to serve it, ensuring the IP Address root still matches the machine address bound to weinre in the
previous steps (192.168.1.20:3000). 
 
5. Open PhoneGap Developer on your mobile device and connect to the IP Address (ie: 192.168.1.20:3000) the app was served on to complete the pairing process. 

6. Open the browser on your computer and enter the URL weinre was started on running (ie: http://192.168.1.20:8080/)

  You should see a view like the following:
    
  ![](/images/weinre-home.png)
    
  Click on the link next to *debug client user interface: http://192.168.1.20:8080/client/#anonymous* and you will see the following type of view where
  the debug target link is shown in blue:
    
  ![](/images/weinre-target.png)
    
  Click on the Target and it will turn green when it's connected and you can begin debugging:  
  ![](/images/weinre-connected.png)
  
  You can now inspect elements directly on your device and use the JavaScript console to debug your app as shown below:
  ![](/images/weinre-demo.png)      
  
  <img class="mobile-image" src="/images/weinre-inspect.png"/>
    
  
### Custom Builds
The other option you can use for debugging is to create your own [custom build](references/developer-app/custom-build) of the PhoneGap Developer App 
(as opposed to the app marketplace version). This option can be used for debugging using other Remote Debugging tools found in Safari, Chrome 
and others developers may be more comfortable with. You could also include any other plugins or change settings overall to fit your testing needs. See the
 guide for more details. 
 
<div class="alert--info">The assumed audience for the PhoneGap Developer app is typically beginner-level or just getting started with PhoneGap. For 
more complete control over your debugging environment you should plan to use the full featured [PhoneGap CLI](https://www.npmjs.com/package/phonegap).</div>



