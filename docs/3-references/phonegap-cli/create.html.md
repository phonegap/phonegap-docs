---
<<<<<<< HEAD
title: Create an App
url: references/phonegap-cli/create
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/create.html.md
layout: subpage
=======
title: Creating an App
url: references/phonegap-cli/create
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/create.html.md
layout: subpage
expand: cli
>>>>>>> stage
---


  Create a new application project at the provided path. You can optionally specify a *name* and *package ID* via the options parameters
  listed below, or configure it in the **config.xml** file after project creation. 

### Usage 
<<<<<<< HEAD
    phonegap create [options] <path> [id [name [config]]]
=======
```bash
phonegap create [options] <path> [id [name [config]]]
```
>>>>>>> stage

You can specify some options when creating your project, including a template to use as a base project or an existing project
to copy from or symbolically link to on your hard drive. Use the `template list` 
  command to view the templates currently available. 

### Options
<<<<<<< HEAD

      --name, -n <name>         application name (default: "Hello World")
      --id, -i <package>        package name (default: "com.phonegap.hello-world")
      --template <name>         create app using an existing app template
      --copy-from, -src <path>  create project using a copy of the www folder from an existing project
      --link-to <path>          symlink/shortcut to the www folder of another project without copying

### Config 
=======
```bash
--name, -n <name>         application name (default: "Hello World")
--id, -i <package>        package name (default: "com.phonegap.hello-world")
--template <name>         create app using an existing app template
--copy-from, -src <path>  create project using a copy of the www folder from an existing project
--link-to <path>          symlink/shortcut to the www folder of another project without copying
```      

#### Config Parameter
>>>>>>> stage
The `[config]` parameter allows you to pass a JSON string with configuration parameters some plugins may specifically rely on. 
They are injected into the `<path>/.cordova/config.json` file.

### Examples
<<<<<<< HEAD

      $ phonegap create path/to/myApp
      $ phonegap create path/to/myApp "com.example.app" "My App" 
      $ phonegap create path/to/myApp --id "com.example.app" --name "My App" 
      $ phonegap create path/to/myApp --template hello-world
      $ phonegap create path/to/myApp --copy-from ../myOtherApp
      $ phonegap create path/to/myApp -src ../myOtherApp
      $ phonegap create path/to/myApp --id "com.example.app" --name "My App" --copy-from ~/myOtherApp
      $ phonegap create path/to/myApp --link-to ../myOtherApp

<div class="alert--info">**Note:** Check out the [template](/references/phonegap-cli/template) guide for more details on how to
=======
```bash
$ phonegap create path/to/myApp
$ phonegap create path/to/myApp "com.example.app" "My App" 
$ phonegap create path/to/myApp --id "com.example.app" --name "My App" 
$ phonegap create path/to/myApp --template hello-world
$ phonegap create path/to/myApp --copy-from ../myOtherApp
$ phonegap create path/to/myApp -src ../myOtherApp
$ phonegap create path/to/myApp --id "com.example.app" --name "My App" --copy-from ~/myOtherApp
$ phonegap create path/to/myApp --link-to ../myOtherApp
```

<div class="alert--info">**Note:** Check out the [templates](/references/phonegap-cli/templates) guide for more details on how to
>>>>>>> stage
create applications based on templates. </div> 