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

# Remote Collaboration and Testing

This section shows how to add other developers to work on a remotely
compiled PhoneGap Build project, how to grant different access
privileges to application developers and testers, and how to share the
app more widely. It shows how to use support for _Hydration_ and other
techniques to automatically push the latest version of an app to all
your testers.

## Adding Collaborators

To add a collaborator from within the [PhoneGap&nbsp;Build
interface](http://build.phonegap.com), make sure the application has
first been built, as described in the section on PhoneGap Build.

1. Under the __Apps__ tab, press the name of the app.

2. In the resulting panel, select the __Collaborators__ tab.

3. Press __Add a Collaborator__, supplying an email address, and
   specifying a role.

![](img/guide/phonegap-build/pgbuild_collab_add.png)

The recipient may need to set up a PhoneGap&nbsp;Build account, keyed
either to an AdobeID or a GitHub account.  Any recipient who accepts
the invitation can view the same application in the PhoneGap&nbsp;Build
interface. Each role brings different privileges:

* Testers can only download the app.

* Developers can modify the code or rebuild the app. They may delete
  the app, manage signing keys, or add other collaborators.

At any point, you may __Edit__ to change the role, or __Delete__ the
collaborator from the project.

## Publicly Shared Apps

If you wish, you can share an app more widely outside your specified
set of testers. Within the app's __Settings__ panel, make sure the
following check box is _not_ selected:

![](img/guide/phonegap-build/pgbuild_collab_check.png)

Then when you rebuild the app, a public link appears near the QR code:

![](img/guide/phonegap-build/pgbuild_collab_link.png)

It links to a publicly available page on which mobile users can
install the appropriate app package directly onto their devices:

![](img/guide/phonegap-build/pgbuild_collab_share.png)

Once you rebuild an app with the __only approved collaborators can
download this app__ checkbox enabled, this page is only accessible to
the collaborators you have specified.

## Using Hydration to Make Testing Easier

Ordinarily after rebuilding an app, anyone testing the app would have
to re-install the new version, either via USB cable or by re-scanning
the QR code to download the new version.  The Hydration tool,
supported by PhoneGap&nbsp;Build, prevents you from having to do this.
Hydration works using a compiled application that serves as a
wrapper for your PhoneGap app. When the wrapper detects a new version
of the app on the PhoneGap&nbsp;Build site, it prompts you to install and
run the new version:

![](img/guide/phonegap-build/pgbuild_hydrate.png)

Because the wrapper app updates the PhoneGap app dynamically at
run-time, you may expect significantly less compilation time up front.

To enable Hydration, select the name of the app from the __Apps__ tab
listing.  Then select the __Settings__ tab when viewing the app's
details.  Within the __Basic__ settings panel, select __Enable
Hydration__:

![](img/guide/phonegap-build/pgbuild_hydrate_enable.png)

Once enabled, the next build produces the hydrated version of the app.
Following installation, it updates itself. When rebuilding an app with
Hydration disabled, it has to be re-installed conventionally.

__NOTE__: The build process produces a new wrapper app if there are
changes to a project's basic settings, including: name, version,
version code, icons, splash screens, preferences, features, and access
tags.
