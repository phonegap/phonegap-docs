---
title: App Project Structure
url: phonegap-build/getting-started/app-project-structure
layout: subpage
---

There are two main formats to structure your app for use on PhoneGap Build.

The **cli project format** is used by the Cordova CLI and is what is used for almost all Cordova / PhoneGap projects. It assumes the `config.xml` is at the root of the project with the HTML and JS assets inside a directory named `www`.

The **legacy project format** requires your `config.xml` and `index.html` to be in the same directory at the root of your application. This has been the default structure accepted by PhoneGap Build since it was created.

We recommend using the **CLI project format** from now on as it offers the most flexibility by being compatible with Cordova and PhoneGap tools. Our goal is to be a cloud replacement for local building of Cordova / PhoneGap CLI projects and using this format helps us move towards that goal.

- [CLI Project](#cli-project)
- [Legacy Project](#legacy-project)

## CLI Project

For developers that have used the Cordova CLI this format will be very familiar. This format requires the config.xml to be at the root of the project with several sub-directories that contain the assets required for the application. The directory structure contains some specially named directories that contain assets that are part of the build process.

The special directories are:

- **www**: (**required**) this directory contains the html, javascript and other assets that should be included in your application. This directory should contain a file called `index.html` that is the HTML root of your application.
- **merges**: (**optional**) this directory can contains several directories named after platforms supported by PhoneGap Build (ios,android,winphone,windows). Content inside this directory will be copied over the www directory before building the app (after plugin installation).  This directory is used for content that will change depending on the platform eg. a stylesheet that should only be used for an android build would be in `merges/android/style.css`.

Any other sub-directories will not be packaged with the application. For instance your config.xml can contain references to splash screens and icons that are contained in a top level directory and if a file is not used for a splash or icon for a specific platform then it will not be packaged in the app.

**IMPORTANT:** If a 'platforms' or 'plugins' directory is present they will be deleted as they aren't used and should not contain any assets required for your project.

An example of an app that uses this format is below:

![](/images/build/cli_project.png)

## Legacy Project

This format has been the default for PhoneGap Build since it was created and it's only requirement is that the index.html and (optional) config.xml are in the same directory at the root of the project.

Although support for this format will never be removed we don't recommend using this format anymore as it is incompatible with the Cordova CLI and does not include the merge functionality.

An example of an app that uses this format is below:

![](/images/build/legacy_project.png)

Please note the `.pgbomit` file above. This indicates that before building the app this directory should be deleted.  A typical use case is that this directoy contains the splash screens or icons for all platforms and should not be included in the app.