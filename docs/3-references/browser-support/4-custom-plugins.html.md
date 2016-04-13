---
title: Custom Plugins
url: references/browser-support/custom-plugins
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/browser-support/4-custom-plugins.html.md
layout: subpage
expand: browser-support
---

With the browser platform target support in PhoneGap, you also have the ability to write code targeting it specifically 
when writing your own custom plugins. Some plugins will be easier to support it than others depending on what native feature they're exposing by allowing you to specify 
mock data or simply returning a console message. It's up to the plugin author to determine what's desired in that case. 

To support the browser in your own plugins, follow the [Cordova Plugin Development docs](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html) on the Official Apache Cordova site 
and ensure you've defined the `browser` platform handling in your `plugin.xml` mapping. You will define your JavaScript files 
to implement your specific `browser` platform handling code in the `src/browser`
path in your plugin root. For instance:
  
 ![](/images/browser-support/browser-folder.png)


You'll need to ensure you name these browser platform-specific JS files with different names then the client-side implementation included in the `www` by default. Most of the Apache Cordova plugins add the word `Proxy` to the
 class. You can take a look at any of the [Apache Cordova core plugins](/plugin-apis/) for specific examples. 
 
For instance, by taking a look at the Apache Cordova Camera Plugin's [plugin.xml](https://github.com/apache/cordova-plugin-camera/blob/master/plugin.xml), 
you will see how the `CameraProxy.js` class is defined with the following:
 
    <!-- browser -->
    <platform name="browser">
        <config-file target="config.xml" parent="/*">
            <feature name="Camera">
                <param name="browser-package" value="Camera" />
            </feature>
        </config-file>

        <js-module src="src/browser/CameraProxy.js" name="CameraProxy">
            <runs />
        </js-module>
    </platform>
            
<div class="info">The `<runs/>` element is required to tell Cordova to initialize the module.</div>            
            
<div class="alert--info">**Note:** Browser Support for the PhoneGap Desktop App will be released in the very near future.</div>            