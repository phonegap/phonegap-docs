---
title: Install 
url: references/phonegap-cli/install
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/install.html.md
layout: subpage
---

The PhoneGap CLI provides a command line interface for creating PhoneGap apps as an alternative to using the
[PhoneGap Desktop App](/getting-started/1-install-phonegap/desktop) for those who prefer working at the command line.
The PhoneGap CLI currently has some additional features over the PhoneGap Desktop
for building, running and packaging your PhoneGap applications on multiple platforms. If you're comfortable using a
CLI this option may be best going forward.

###Requirements
If you're going to be using the PhoneGap CLI to build locally versus through the PhoneGap Build service (using 
the [remote commands](/references/phonegap-cli/remote-usage) or without pairing it with the [PhoneGap Developer app](getting-started/4-run-your-app/cli), 
you'll need to install SDKs for each platform you wish to target. Refer to the [Cordova Platform Guides](http://cordova.apache.org/docs/en/edge/index.html)
 for details on how to proceed for each platform. 

There are a few simple requirements you'll need prior to installing the PhoneGap CLI:
- [node.js](http://nodejs.org/) - a JavaScript runtime to build your JavaScript code
- [ios-sim](https://github.com/phonegap/ios-sim#installation) - an iOS simulator for iOS development (Mac only)
- [git](http://git-scm.com) - used in the background by the CLI to download assets. It comes pre-installed on some operating systems, to see if
 you already have it installed, type `git` from the command line.

- **Windows 8 Users:** If you just installed Node.js, be sure to start the *Node.js Command Prompt* application specifically before proceeding.

###Install the Latest Version
Install the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` with the following command from the Terminal app (Mac) or Command Prompt (Win).
    
         $ npm install -g phonegap@latest
            
###Install a Specific Version
You can install a specific version of the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` by specifying the version number in place of
 the `latest` flag. 
         
        $ npm install -g phonegap@5.1.1
                 
<div class="alert--tip">**TIP:** To get a listing of the versions available, you can run `$ npm info phonegap`</div>


<div class="alert--info">**NOTE:** If you get an `Error: EACCES` when running any of the commands here, try prefixing it with `sudo`, such as:
    `$ sudo npm install -g phonegap@latest` </div>
  

