---
title: Create an App
url: references/phonegap-cli/create
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/create.html.md
layout: subpage
---

  Creates a new application at the provided path. You can optionally specify a name and package ID or configure it in 
  the config.xml file after project creation. These values are used when creating the native project for each platform.

  The application can be created from an existing template as well. You can
  list the existing templates with the `template list` command.

  The [config] option allows you to pass a JSON string with configuration parameters some plugins may use. They are injected  
  into `<path>/.cordova/config.json`.

### Usage 
    phonegap create [options] <path> [id [name [config]]]

### Options

      --name, -n <name>         application name (default: "Hello World")
      --id, -i <package>        package name (default: "com.phonegap.hello-world")
      --template <name>         create app using an existing app template
      --copy-from, -src <path>  create project using a copy of an existing project
      --link-to <path>          symlink/shortcut to the www assets without copying

### Examples

      $ phonegap create path/to/my-app
      $ phonegap create path/to/my-app "com.example.app" "My App" 
      $ phonegap create path/to/my-app --id "com.example.app" --name "My App" 
      $ phonegap create path/to/my-app --template hello-world
      $ phonegap create path/to/my-app --copy-from ../my-other-app

<div class="alert--info">**Note:** Check out the [template list](/references/phonegap-cli/template-list) guide for more details on how to
find templates available for project creation. </div> 