---
title: Step 5: Going Further
url: getting-started/5-going-further
layout: subpage
---

## Build, Package and Distribute for Production

This getting started workflow is meant for beginning mobile application development with PhoneGap in the quickest and simplest manner. At some point you will want to move out of the sandbox environment and into a more advanced environment suitable for
building, packaging and distributing your mobile application.

There are two choices available for building and packaging your applications:

- Build and package locally using the [PhoneGap CLI](http://docs.phonegap.com/references/phonegap-cli/)
  - you should be comfortable with command line environments
  - you will need to install SDKs for each device, and there are some restrictions based on your operating system.

      *ex. you cannot build iOS apps on a Windows PC, and cannot build Windows from a Mac*

### OR

- Build and package with [PhoneGap Build](http://build.phonegap.com) cloud service
  - build from anywhere, even trigger builds from your device and install it directly
  - can pull and build directly from your repo
  - no hardware, SDKs, or developer tooling to setup

Which you choose will depend on how comfortable you are working with a command line environment and more closely with the native SDKs and tools versus leaving it to a cloud service and providing the required details.

## Apache Cordova

Adobe PhoneGap&#8482; is a distribution of [Apache Cordova&#8482;](https://cordova.apache.org/). Cordova was originally created by Nitobi, who was then acquired by Adobe in 2011. The project was donated to the Apache Software Foundation (ASF) later that same year to maintain a transparent and open governance and provide a mechanism for other large organizations to contribute. Apache Cordova is the engine that powers Adobe PhoneGap&#8482;, similar to how WebKit powers Chrome or Safari. However, Adobe PhoneGap&#8482; provides additional tools that tie into other Adobe services, including tools like the PhoneGap Developer App, the PhoneGap Desktop App, PhoneGap Build and PhoneGap Enterprise.
