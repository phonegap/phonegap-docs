---
title: Installing the CLI
url: references/phonegap-cli/install
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/3-references/phonegap-cli/install.html.md
layout: subpage
expand: cli
---

There are a few basic requirements you'll need prior to installing the PhoneGap CLI:

- [Node.js](http://nodejs.org/) - a JavaScript runtime to build your JavaScript code
- [git](http://git-scm.com) - used in the background by the CLI to download assets. It comes pre-installed on some operating systems. You can check if it's already installed by typing `git` from the command line.

## Install via npm

Run the following command to install the latest version of the PhoneGap CLI:

```bash
$ npm install -g phonegap
```

### Installing a Specific Version

You can install a specific version of the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` by specifying the version number after the `@` symbol:

```bash
$ npm install -g phonegap@5.1.1
```

<div class="alert--tip">**TIP:** To get a listing of the PhoneGap CLI versions available, you can run `$ npm info phonegap`</div>

<div class="alert--warning">If you get an `EACCES` error when running any of the commands here, try prefixing it with `sudo`, such as: `$ sudo npm install -g phonegap` </div>

## PhoneGap CLI Use Cases

The PhoneGap CLI can be used for different stages of development and with other tools offered by the PhoneGap team. The multiples use cases are outlined below and will determine any other dependencies that may need to be installed.

### 1 - Paired with the PhoneGap Developer App

Use the PhoneGap CLI to simply `create` and `serve` your PhoneGap apps for the [PhoneGap Developer App](/references/developer-app) to consume as shown in the [Getting Started Guides](/getting-started/3-create-your-app/cli).

<div class="alert--tip">**TIP:** No additional SDK's are needed other than a browser or the PhoneGap Developer app on your mobile device for previewing your apps. You can use this approach for developing a large part of your apps since the PhoneGap Developer app already includes most common plugins and you can tweak your HTML/JS as needed per platform. Once you're ready to move on to configuring, building and packaging your app outside of the PhoneGap Developer app sandbox however, you'll need to move on to one of the two options below.</div>

### 2 - Paired with PhoneGap Build

Use the PhoneGap CLI to create and configure your apps locally, then build and package them in the [PhoneGap Build](http://build.phonegap.com) cloud service.

 <div class="alert--info">**NOTE:** The `remote` command is used from the PhoneGap CLI to interface with PhoneGap Build once your project has been configured. The [Remote Usage Guide](/references/phonegap-cli/remote-usage) provides the details for this command. For details on how to specifically configure your apps for PhoneGap Build. Check out [their docs located here](http://docs.build.phonegap.com/).</div>

### 3 - Standalone

The PhoneGap CLI can be used to do everything from creating your apps to packaging them for distribution. To build, run and package apps for multiple platforms you'll need to install some additional SDK's and/or tools for the platforms you wish to target. Refer to the [Cordova Platform Guides](http://cordova.apache.org/docs/en/edge/index.html) for details on how to proceed for each platform.

<div class="alert--tip">**TIP:** If you're developing for iOS on a Mac, you may want to install the [ios-sim](https://github.com/phonegap/ios-sim#installation) iOS simulator to emulate easily from the command line rather than going into Xcode.</div>
