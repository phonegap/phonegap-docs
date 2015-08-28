---
title: Using PhoneGap Build
url: references/phonegap-cli/remote-usage
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/remote-usage.html.md
layout: subpage
---


The PhoneGap remote commands are used for executing commands against the PhoneGap Build service in the cloud rather than relying on a locally 
installed SDK for each platform. 

###Usage 
      $ phonegap remote [command]

###Commands

      login                login to PhoneGap Build (requires an account and your credentials)
      logout               logout of PhoneGap Build
      build <platform>     build a specific platform
      install <platform>   install a specific platform (returns a generated QR code in the terminal)
      run <platform>       build and install a specific platform

###Examples

      $ phonegap remote login
      $ phonegap remote build ios
      $ phonegap remote install android
      $ phonegap remote run ios
      $ phonegap remote logout
  

### Notes
- You'll need to have an existing [PhoneGap Build](http://build.phonegap.com) account to use these commands. You'll be prompted to enter your credentials after running the 
`$ phonegap remote login` command. If you have an Adobe ID you can use that as well.  

- The `phonegap remote run` command will execute both the `build` and `install` commands automatically and is the quickest path to building your app
 with the PhoneGap Build cloud service. The result is a QR code that can be scanned by your mobile device directly from the terminal. The app 
 loads wirelessly on your mobile device and you will be prompted to install it. 