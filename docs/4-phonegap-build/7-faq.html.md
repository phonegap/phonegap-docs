---
title: FAQ
url: phonegap-build/faq
layout: subpage
expand: build
---

1. [What is the PhoneGap Build service and how is it different from PhoneGap?](#what-is-build)
1. [What versions of PhoneGap are supported by PhoneGap Build?](#what-versions)
1. [How do I get started with PhoneGap Build?](#how-start)
1. [Do I need to install anything before I use PhoneGap Build?](#what-to-install)
1. [What about developer accounts and SDKs? Do I need to set those up before starting with PhoneGap Build?](#developer-accounts)
1. [What do I do with my app when I get it back from PhoneGap Build? Is it ready for app store submission?](#submitting)
1. [What platforms can I build for?](#what-platforms)
1. [Can I integrate PhoneGap Build with my existing tools?](#existing-tools)
1. [What is the difference between public and private apps?](#public-private)
1. [When I try to log in with my Adobe ID, I get "That email address is already linked to a PhoneGap Build account."](#already-linked)
1. [I'm seeing "This app isn't using the latest version of PhoneGap. We recommend upgrading..."](#app-upgrade)
1. [Where do I go to find PhoneGap Build help?](#where-help)
1. [My build has suddenly started failing, what happened?](#sudden-failure)

<a name="what-is-build" class="anchor"></a>

## What is the PhoneGap Build service and how is it different from PhoneGap?

PhoneGap is a mobile application development framework, based upon the open source [Apache Cordova](https://cordova.apache.org/) project. It allows you to write an app once with HTML, CSS and JavaScript, and then deploy it to a wide range of mobile devices without losing the features of a native app.  PhoneGap Build is a cloud-based service built on top of the PhoneGap framework. It allows you to easily build those same mobile apps in the cloud.

<a name="what-versions" class="anchor"></a>

## What versions of PhoneGap are supported by PhoneGap Build?

[See this page.](http://build.phonegap.com/current-support)

<a name="how-start" class="anchor"></a>

## How do I get started with PhoneGap Build?

Simply upload your web assets - a ZIP file of HTML, CSS and JavaScript, or a single index.html file - to PhoneGap Build, point us to your Git or SVN repository. Then we'll undertake the compilation and packaging for you. In minutes, you'll receive the download URLs for all mobile platforms.

<a name="what-to-install" class="anchor"></a>

## Do I need to install anything before I use PhoneGap Build?

No!

<a name="developer-accounts" class="anchor"></a>

## What about developer accounts and SDKs? Do I need to set those up before starting with PhoneGap Build?

No! But you might want to install some of the SDK emulators if you don't own a particular device that you want to test a build for.

<a name="submitting" class="anchor"></a>

## What do I do with my app when I get it back from PhoneGap Build? Is it ready for app store submission?

It depends on the platform that you're targeting. For Android, iOS and Windows Phone 8, you'll need to provide the correct certificates and/or signing keys to allow distribution. See our other documentation for more details on this process.

<a name="what-platforms" class="anchor"></a>

## What platforms can I build for?

iOS, Android, and Windows.

<a name="existing-tools" class="anchor"></a>

## Can I integrate PhoneGap Build with my existing tools?

Yes! We have an [API available](/phonegap-build/developer-api) you can use over HTTPS to build apps, and access data about your existing apps.

<a name="public-private" class="anchor"></a>

## What is the difference between public and private apps?

Public apps have their source code hosted in a publicly accessible GitHub repository.
Private apps have their source code hosted in a private (non-publicly accessible) GitHub repository or are created when a developer uploads a ZIP file containing the source code and assets to the PhoneGap Build service.

<a name="already-linked" class="anchor"></a>

## When I try to log in with my Adobe ID, I get "That email address is already linked to a PhoneGap Build account."

This message means an account with that email address, created before Build had Adobe ID authentication, already exists. You need to log in with that old account, and then link your Adobe ID to it. So on the [sign in page](https://build.phonegap.com/people/sign_in), click where it says "Click here if you don't sign in with an Adobe ID". Sign in with either an email/password or using your Github account (however you would have created the old account). Once logged in, you will be prompted that "To continue using PhoneGap Build we ask you to please link an AdobeID to this account." and limited to the account settings page. Now Connect your Adobe ID, and you're done!

<a name="app-upgrade" class="anchor"></a>

## I'm seeing "This app isn't using the latest version of PhoneGap. We recommend upgrading ..."

If you're seeing this message, it means that there is a newer version of Phonegap available to build with. This can be set in your [config.xml file](/phonegap-build/configuring) with the [phonegap-version preference](/phonegap-build/configuring/preferences/#phonegap-version), for example:

    <preference name="phonegap-version" value="cli-6.4.0" />

If you omit this preference, Phonegap Build will use a default version (which is incremented approximately every 6 months). A list of Phonegap Build's currently supported Phonegap versions, and the default, can be seen [here](http://build.phonegap.com/current-support). In general you won't need to upgrade every time a new version becomes available, but you should upgrade whenever you can to ensure you are taking advantage of any new security fixes, and support for the latest devices. When you upgrade your Phonegap version, always fully test your app, especially if you're utilizing plugins and device APIs, as behaviour can and will change across versions.

<a name="where-help" class="anchor"></a>

## Where do I go to find PhoneGap Build help?

Ask a question on our community forum: <http://community.phonegap.com/build>, or ask us on Twitter: <http://twitter.com/PhoneGapBuild>

<a name="sudden-failure" class="anchor"></a>

## My build has suddenly started failing, what happened?

9 times out of 10 this is because one of the plugins you are using was updated on NPM (or wherever you're sourcing it), and you weren't locking the version. With the version unset, PGB will use the latest version of the plugin, which can introduce breaking changes. [See the docs for details](http://docs.phonegap.com/phonegap-build/configuring/plugins/#plugin-version). One other possibility is that the default phonegap-version was incremented, and you're not setting your phonegap-version preference. This is more rare as the default phonegap-version is only incremented approximately annually.
