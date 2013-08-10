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

# Collaborating and Testing

<!--

 # Collaborating on Projects

When working with a team, apps are a collaborative undertaking.
PhoneGap Build hopes to create an easy to use and useful environment
for managing and building applications with many developers and
testers.

 ### Adding and Removing Collaborators:

To add or remove a user to your app, you will first need to head over
to your apps’ detail page.

From there you will need to select the collaborators tab.

This tab provides a list of all collaborators associated with the
currently selected app.

To add a collaborator select the 'add a collaborator' button, enter
their email address, select a role, and hit send; they will now
receive an email stating you have shared the application.

If the new collaborator has not yet created a PhoneGap Build account
they will need to create one first and login; if they are logged in or
do not have an account will see a 404 page.

 ### What are the Tester and Developer roles for?

We allow you to specify one of two roles for a collaborator.

Testers can only download the app.

Developers can change the code, rebuild the app, and do anything short
of deleting the app or managing signing keys.

You can of course revoke people's access to your app, or change them
from a developer to tester.

 ### Have feedback?

We'd love to hear your thoughts on our collaborator workflow! If you
have any feedback on how we can improve collaboration on PhoneGap
Build or have a general question head over to our
[community](http://community.phonegap.com) page and start a
discussion!

 # Hydration

Adobe&reg; PhoneGap Build is excited to offer Hydration to its users. Hydration
is a tool that has two main benifits for developers and testers:

1. Compilation times are improved significantly.
2. Updates are pushed directly to the application installed on a device.

PhoneGap accomplishes this by compiling a native binary that acts as
a container for your mobile application. Once a developer uploads a
new build the end user (eg. tester) of the application will be
notified upon restart of the application. If the end user decides to
run the new code base the Hydrated app will automatically fetch and run
the latest code base.

If you have any questions or you would like to provide some feedback
to our team we use our [community support channel](http://community.phonegap.com)
for most of our communication. Don't hesitate to drop us a line!

 ## Sections

1. [Configuring A project to use Hydration](#create_hydration_build)
    1. [Hydrate a New Application](#new_build_project)
    2. [Hydrate an Existing Application](#existing_build_project)
2. [Building an application with Hydration](#build_app)
    1. [Building an Application](#build_application)
    2. [Installing the hydrated application](#installing_application)
    3. [Updating the application](#update_application)
    4. [Disabling Hydration](#disable_hydration)

<a id="create_hydration_build"></a>

 ##Configuring A project to use Hydration

Hydration can be enabled and disabled for both new projects and existing
projects, however it requires a project with the following PhoneGap
versions

        supported versions:  2.0.0 and above
        supported platforms: iOS, Android

<a id="new_build_project"></a>

 ###Hydrate a New Application

After logging in navigate to
[https://build.phonegap.com/](https://build.phonegap.com/),
and click the "+ new app" button.

Under the "SETTINGS" category select the option labeled
"Hydrate Application", next configure the remaining options
and hit "Create".

Until disabled, every build will produce a hydrated version of this app.

<a id="existing_build_project"></a>

 ###Hydrate an Existing Application

After logging in navigate to
[https://build.phonegap.com/](https://build.phonegap.com/).
Next, select your app by clicking its title or icon. On the app's detail
page, open the "Settings" panel. Then, under the "Basic" header, enable the
checkbox labelled "enable hydration".

Until disabled, every build will produce a hydrated version of this app.

 ##Building an application with Hydration

<a id="build_application"></a>

 ###Building an Application

Building an application with Hydration is as simple as building any
other application with build. Once you've enabled Hydration simply
hit the rebuild button and you've got a Hydrated build.

Build will generate a new binary if we detect a modification to the
project's settings.

These settings include:

        name, version, version code, icons, splash screens, preferences,
        features, and access tags

Please note that the end user must update their binary everytime a
native binary is generated.

<a id="installing_application"></a>

 ###Installing the hydrated application

The binary provided by build is exactly like its non-Hydrated binary
equivalent. Simply install the application as you would a
non-Hydrating version; this can be via the QR code or the platform's
specific tool (eg: iTunes, adb).

Please note that any limitations on native binaries also apply to
Hydration builds. For example, Adhoc distribution (IOS) builds can
only be provisioned for one-hundred devices.

<a href="update_application"></a>

 ###Updating the application

Once a developer has compiled a new build the Hydrated application can
be updated by the end user. This update proccess occurs on every
restart of the application.

When the user restarts the application they will be prompted with a
dialog requesting them to update the application.

If the user decides to update the application, the new build will be
downloaded and executed.

If the user decides to skip the update they will remain frozen at the
current build and will be prompted to update on the next restart.

If a non-Hydratable build is generated by the developer the user
will need to obtain a new version of the compiled binary. The
user can obtain the binary by downloading it, or by using one of our
other methods.

<a id="disable_hydration"></a>

 ###Disabling Hydration

After logging in Navigate to
[https://build.phonegap.com/](https://build.phonegap.com/),
Next, select your app by clicking its title or icon. On the app's detail
page, open the "Settings" panel. Under the "Basic" header de-select
the checkbox labeled "enable hydration", and finally hit save.

You've now successfully disabled Hydration.

Please note, that users will now need to download updates to your app
manually again.

-->
