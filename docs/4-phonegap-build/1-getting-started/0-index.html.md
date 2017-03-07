---
title: Getting Started
url: phonegap-build/getting-started
layout: subpage
expand: build
---

1. [What Do I Upload?](#what_do_i_upload)
1. [How Do I Structure My Application?](#structure_application)
1. [How Do I Configure My Application?](#configure_application)
1. [Where can I Get Help?](#help)

## 1. What Do I Upload?<a class="anchor" id="what_do_i_upload"></a>

### Preparing the Assets

PhoneGap and PhoneGap Build use an open packaging model that follows the [W3C Widget Packaging specification](http://www.w3.org/TR/widgets/). This consists of a `config.xml` file, and your web assets (html, js, css, images, etc). You should not be uploading native application code files (.c, .h, .m, java, etc). See the [PhoneGap Hello World Application](https://github.com/phonegap/phonegap-template-hello-world) for a basic example. This application is also explained in more detail [here](/tutorials/develop/hello-world-explained/).

#### Don't include phonegap.js or plugin files

PhoneGap Build will inject `phonegap.js`, `cordova.js` (identical sources), and any files required by your plugins, into the root of your www. This is because these files differ depending on the versions of PhoneGap and any plugins you are using. However you do still need to source phonegap.js or cordova.js (both are available and they are identical) from your html files.

    <script src="cordova.js"></script>

For maximum sizes of apps, see the <a href="https://build.phonegap.com/plans">plans page</a>.

## 2. How Do I Structure My Application? <a class="anchor" id="structure_application"></a>

PhoneGap Build's only **minimum requirement** for your application structure is that there is an `index.html` present inside your app. For instance you can upload a single file called index.html and it will be packaged as an app.

While this is a minimum requirement most certainly you will need a much more complicated structure that will contain your app's javascript files, splash screen and icon images, media files, and any other payloads required by your app. See the [app project structure section](app-project-structure) for more information on how to structure your uploaded assets.

**.pgbomit** is a file that you can create and add to a directory that signifies to PhoneGap Build that it SHOULD NOT include the contents of that directory as source for the native application. This folder, however, can be used to store any files needed during the PhoneGap Build process up to the compile step. A typical use case is for a directory containing the icons and splashcreens for an app. Place .pgbomit in that directory and none of those files/directories will be included in the binary app package, except those copied and used for icons and splashscreens for a specific platform.

Please note that the **.pgbomit** file is a placeholder file only, it is not read and its only function is to highlight a directory. It is **not like .gitignore** or other file types that can contain patterns.

## 3. How Do I Configure My Application?<a class="anchor" id="configure_application"></a>

You'll need an application configuration file, or `config.xml`, in your app package to configure how your app is built. This includes PhoneGap version, icons and splash screens, platforms, and much more. See the [configuration section](../configuring/) for more on the config.xml file.

## 4. Where can I get help?<a class="anchor" id="help"></a>

Please search all communication channels prior to posting questions to help us reduce repetition and keep the forums useful and efficient! Here's some channels:

- Search our old [community forum](http://community.phonegap.com)
- For help on developing your application (plugins, APIs, platform quirks, etc), see the [Adobe PhoneGap Forum](https://forums.adobe.com/community/phonegap/)
- For help specifically using the PhoneGap Build Service (website, API, build errors), post to the [Adobe PhoneGap Build Forum](https://forums.adobe.com/community/phonegap/)
- [Stackoverflow](http://www.stackoverflow.com)
