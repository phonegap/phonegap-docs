---
license: Licensed to the Apache Software Foundation (ASF) under one
         or more contributor license agreements.  See the NOTICE file
         distributed with this work for additional information
         regarding copyright ownership.  The ASF licenses this file
         to you under the Apache License, Version 2.0 (the
         "License"); you may not use this file except in compliance
         with the License.  You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing,
         software distributed under the License is distributed on an
         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
         KIND, either express or implied.  See the License for the
         specific language governing permissions and limitations
         under the License.

---

# PhoneGap Build

<!--

# Preparing Your Application for PhoneGap Build

PhoneGap Build requires an application to be packaged in a specific
manner that may not be intuitive at first.

We use an open packaging model that follows the [W3C Widget
Packaging specification](http://www.w3.org/TR/widgets/).

The following is a guide to help package your application for PhoneGap
Build.

##Sections

1. [What Do I Upload?](#what_do_i_upload)

2. [How Do I Configure My Application?](#configure_application)

3. [What's Next?](#whats_next)

3. [Where can I Get Help?](#whats_next)


<a id="#what_do_i_upload"></a>
###What Do I Upload?

####Preparing the Assets

PhoneGap Build only requires the assets of your application. This is
essentially your www directory which contains your html, css, images,
js files, etc.

PhoneGap Build will most likely fail to compile your application
if native files are uploaded (.h, .m, .java, etc).

####Removing Unnecessary Files

Once you've included the necessary assets, remove the `phonegap.js`
(cordova.js) as Build will automatically inject it during compile
time.

####Why must you delete the `phonegap.js`?

PhoneGap requires a different JavaScript file for each platform and
using an incompatible `phonegap.js` will result in errors when
running your application.

####Making Sure You can Still Access the PhoneGap API

Once you've deleted the `phonegap.js` you'll need to make sure that your
application can still access the PhoneGap API.

To do so, simply ensure that the following reference is made in your `index.html`

    <script src="phonegap.js"></script>

<a id="#configure_application"></a>
###How Do I Configure My Application?

PhoneGap Build supports a configuration XML file, `config.xml`.

This configuration file allows you to modify things like the
application's title, icons, splash screens, and other properties.

For more information on the config.xml see our
[documentation](/docs/config-xml).

<a id="whats_next"></a>
###What's Next?

You should now be ready to proceed with building your application on
PhoneGap Build.

However, we also recommend reading the following documentation as it will help
achieve a better understanding of PhoneGap Build.

* [Start Compiling with PhoneGap Build](/docs/start).

* [Debugging Your Applications with PhoneGap Build](/docs/phonegap-debug)

<a id="help"></a>
###Where can I get help?

If you're running into errors during compilation we have prepared
a list of
[common errors and their solutions.](/docs/build-failed).

If your question has still not been answered, or you would like to
provide some feedback to our team we use our
[community support channel](http://community.phonegap.com)
for most of our communication. Don't hesitate to drop us a line!



# Getting Started

Hi, and welcome to Adobe® PhoneGap™ Build. PhoneGap Build allows you
to create cross-platform mobile apps based on HTML, CSS, and
JavaScript through a simple web interface. We take care of all the
packaging and compilation, and you get some mobile apps back in a
matter of minutes.

The first step is to register an account and log in - we'll assume
that you've gotten that far, and you're at the __+ new app__ form.

![New App Form](images/getting-started/new-app-form.png)

PhoneGap Build gives you two options - you can upload an existing
PhoneGap project either as a single `index.html` or a package zip
archive, or link the site to a source control repository (that is
publicly accessible -- we'll have support for private repositories
soon).

Your project, whether a source control repository or a zip archive,
can contain:

* `index.html` (the main page of your app)

* any other assets your app uses - JavaScript or CSS files, images,
  audio, video and whatnot

* a `config.xml` file, based on the [W3C widget
  spec](http://www.w3.org/TR/widgets/), that contains data about your
  application

* an app icon image - `png` files are the widest supported, and your
  best bet for now

Only `index.html` is required - any of your app properties can be
edited through the web interface.

If you haven't got an app at hand, the easiest way to get started is
with our [Getting Started](https://github.com/phonegap/phonegap-start)
GitHub repository.

![PhoneGap Start](images/getting-started/phonegap-start.png)

If you don't have a GitHub account, you can copy the `http` url for
the app - `http://github.com/phonegap/phonegap-start.git` - and put
that in the app field.

That will build the app right away, but if you have a GitHub account,
you can easily fork the app to make your own edits. Hit __Fork__, to
have your own copy of the source repository.

![alunny-Start](images/getting-started/alunny-start.png)

You probably want to customize the app a little at this point, so
clone the repository to do so:

$ git clone https://github.com/alunny/phonegap-start.git

and open `config.xml` from the root of the repository. I'm going to
edit the following attributes:

* `<name>` will become `<name>alunny's Amazing app</name>`</span>

* `<description>` will become `<description>An Amazing app by
  alunny</description>`

* the `version` attribute on the root element will be `99.999`

* the `id` attribute on the root element will be `com.alunny.amazing`

* we can ignore the rest for the moment: most of those attributes are
  placeholders for future PhoneGap Build functionality

and let's change `icon.png` to something new:

![New Icon](images/getting-started/new-icon.png)

Alright, let's push those changes to our repo.

$ git push origin master

![alunny-start with changes](images/getting-started/alunny-start-changes.png)

It's an app to be proud of, for sure. Now let's create the Amazing app
on PhoneGap Build - fill out the form - my public git url is
`http://github.com/alunny/phonegap-start.git`. Once pasted into the
repo field, your app should immediately begin uploading:

![New App Populated](images/getting-started/new-app-populated.png)

Once the app has been fetched, you can choose to enabled debugging and
hydration if you'd like. When everything looks okay, hit 'Ready to
build'.

![New App Ready](images/getting-started/new-app-ready.png)

Things are moving now! You should be able to see that PhoneGap Build
servers are spinning, and your app is being readied on six platforms.

![Spinners](images/getting-started/spinners.png)

Oh, looks like the downloads are ready. We'll get to those in a
second.

![Downloads Ready](images/getting-started/downloads-ready.png)

If you click the app title or icon, you will be taken to the app's
detail page. Under the "Settings" tab, you'll see the details we set
in `config.xml`, and our beautiful icon. If you'd like to make any
changes, simply make them in your Git repository.

Since we're linked to GitHub, you'll see a direct link to you latest
commit that Build has. There's also a link to update your PhoneGap app
to the latest commit you've made - this works for whichever code host
you choose. Again, for now, make sure the repository URL you've added
allows public read access.

Now for the apps themselves. It's not too difficult to install them
directly, depending on which platform you're using:

* __Android__: ensure your Android device can install `apk` files from
  unknown sources

* enter __Settings__ --&gt; __Applications__ --&gt; and enable
  __Unkown Sources__

* __webOS__: You cannot install webOS packages (`ipk` files) directly
  from the web; use Palm's `palm-install` utility for this

* __Symbian__: Download and open the `wgz` file on your device. Done!

* __BlackBerry__: Hit the `OTA install` link and follow the
  instructions on your device. We currently just support BlackBerry OS
  5.0 and above

* __Windows Phone__: You cannot install Windows Phone packages
  directly from the web; you will need to use Microsoft's tools

For the platforms that support direct installation (everything besides
webOS for the moment), you can either navigate to the site and touch
the appropriate link, or use the phone's camera to read the QR code
displayed with a QR code reader of your choice.

Now go write some great apps!

# FAQ

<section class="module">

Have a question about Adobe® PhoneGap™ Build? Check out our FAQ
below. We’ll be adding to this FAQ regularly, so if you have questions
that need answering, [please ask us](http://community.phonegap.com).

</section>
<section class="module">

## What is the PhoneGap Build service and how is it different from PhoneGap?

PhoneGap is a mobile application development framework, based upon the
open source [Apache Cordova](http://incubator.apache.org/cordova/)
project. It allows you to write an app once with HTML, CSS and
JavaScript, and then deploy it to a wide range of mobile devices
without losing the features of a native app.  PhoneGap Build is a
cloud-based service built on top of the PhoneGap framework. It allows
you to easily build those same mobile apps in the cloud.

</section>

<section class="module">

## How do I get started with PhoneGap Build?

Simply upload your web assets - a ZIP file of HTML, CSS and
JavaScript, or a single index.html file - to PhoneGap Build, point us
to your Git or SVN repository. Then we’ll undertake the compilation
and packaging for you. In minutes, you’ll receive the download URLs
for all mobile platforms.

</section>

<section class="module">

## Do I need to install anything before I use PhoneGap Build?

No!

</section>

<section class="module">

## What about developer accounts and SDKs? Do I need to set those up before starting with PhoneGap Build?

No! But you might want to install some of the SDK emulators if you
don’t own a particular device that you want to test a build for.

</section>

<section class="module">

## What do I do with my app when I get it back from PhoneGap Build? Is it ready for app store submission?

It depends on the platform that you're targeting. For the webOS and
Symbian platforms, you will get back a binary that is ready for
submission and distribution. For Android, iOS, and BlackBerry, you'll
need to provide the correct certificates and/or signing keys to allow
distribution. See our other documentation for more details on this
process.

</section>

<section class="module">

## Can I build for iPhone?

Yes! Check out our [iOS Guide](/docs/ios-builds) for information on
how to get PhoneGap Build up and running with iOS.

</section>

<section class="module">

## Can I integrate PhoneGap Build with my existing tools?

Yes! we now have an [API available](/docs/api) you can use over HTTPS
to build apps, and access data about your existing apps.

</section>

<section class="module">

## Can I use PhoneGap Build with a private Github repository?

Yes!  As of the most recent update to PhoneGap Build, you can now
point the service at a private GitHub repository. Once your Build
account is connected to your GitHub account in the user settings, you
simply provide your authentication information and the Build service
uses it when creating new builds of your code.

</section>

<section class="module" id="private-app">

## What is the difference between public and private apps?

Public apps have their source code hosted in a publicly accessible
GitHub repository.  Private apps have their source code hosted in a
private (non-publicly accessible) GitHub repository or are created
when a developer uploads a ZIP file containing the source code and
assets to the PhoneGap Build service.

</section>

<section class="module">

## Where do I go to find PhoneGap Build help?

Ask a question on our community forum:
<http://community.phonegap.com>, or ask us on Twitter:
<http://twitter.com/PhoneGapBuild>

</section>

-->
