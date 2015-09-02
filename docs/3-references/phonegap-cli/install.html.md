---
title: Installing the CLI 
url: references/phonegap-cli/install
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/install.html.md
layout: subpage
---

The PhoneGap CLI provides a command line interface for creating PhoneGap apps as an alternative to using the
[PhoneGap Desktop App](/getting-started/1-install-phonegap/desktop) for those who prefer working at the command line.

### Usage 
    $ npm install -g phonegap

###Requirements
If you're going to be using the PhoneGap CLI to build locally versus through the PhoneGap Build service (using 
the [remote commands](/references/phonegap-cli/remote-usage) or without pairing it to the 
[PhoneGap Developer app](getting-started/4-run-your-app/cli)), you'll need to install SDKs for the platforms you wish to target. 
Refer to the [Cordova Platform Guides](http://cordova.apache.org/docs/en/edge/index.html) for details on how to proceed for each platform. 

There are a few simple requirements you'll need prior to installing the PhoneGap CLI:

- [node.js](http://nodejs.org/) - a JavaScript runtime to build your JavaScript code
- [git](http://git-scm.com) - used in the background by the CLI to download assets. It comes pre-installed on some operating systems, to see if you already have it installed, type `git` from the command line.
- [ios-sim](https://github.com/phonegap/ios-sim#installation) - an iOS simulator for iOS development (Mac only)
 
- **Windows 8 Users:** Be sure to start the *Node.js Command Prompt* application specifically before proceeding.

###Install a Specific Version
You can install a specific version of the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` by specifying the version number after the `@` symbol:
         
        $ npm install -g phonegap@5.1.1
                 
<div class="alert--tip">**TIP:** To get a listing of the PhoneGap CLI versions available, you can run `$ npm info phonegap`</div>


<div class="alert--info">**NOTE:** If you get an `Error: EACCES` when running any of the commands here, try prefixing it with `sudo`, such as:
    `$ sudo npm install -g phonegap@` </div>
  

