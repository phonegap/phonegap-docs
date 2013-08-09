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

-->
