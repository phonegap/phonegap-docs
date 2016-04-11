---
title: Caution / Next Steps
url: references/browser-support/caution-next-steps
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/browser-support/5-caution-next-steps.html.md
layout: subpage
expand: browser-support
---

When you are developing an app to be consumed on a mobile device, it should go without saying that the best environment for testing 
is going to be that target device itself. Some things to specifically note and keep in mind while testing with the browser platform only:
 
- The desktop browser may have a variation of support for different features and APIs then your mobile browsers, as well as those browsers between 
platforms. You should refer to the [Can I Use](http://caniuse.com) site for specific details of which features your apps use and what is supported.
- No soft keyboard exists in the browser which can affect the UI and screen layout when using form controls/input fields. 
- Apache Cordova Plugins expose native features that can't always be mocked properly since they are native to a platform.
- The application is being served from an IP address rather than a filesystem affecting the way security is handled.

### Development/Testing Phases:
1. Use the browser to develop as much of your app as you can using the tooling you already know and use daily. Be aware of the limitations
noted above. 
2. Use the [PhoneGap Developer App](/references/developer-app/) on a physical device to pair and test your app being served from either 
the PhoneGap CLI or PhoneGap Desktop App in addition to the browser platform.
 <div class="alert--info">See the [Getting Started Guides](/getting-started/4-preview-your-app/) for more details.</div> 
2. Get a compiled version of your app using the PhoneGap/Cordova CLI or PhoneGap Build (to avoid having to set up platform SDK's) and test
on any platform you are targeting via a physical device or the simulators shipped with the platform SDK's at a minimum with remote debugging 
to test your apps. 
2. Use a 3rd party testing service. 
 
 <div class="alert--info">**Note:** Make a point to check out this [Next Steps Guide](https://cordova.apache.org/docs/en/latest/guide/next/index.html)
  in the Apache Cordova docs for more information on testing, remote debugging and more.</div>
