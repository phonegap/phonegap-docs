---
title: Create an App
url: references/phonegap-cli/create
layout: subpage
---

Create a new application project at the provided path. You can optionally specify a *name* and *package ID* via the options parameters listed below, or configure it in the **config.xml** file after project creation.

## Usage

```bash
phonegap create [options] <path> [id [name [config]]]
```

You can specify some options when creating your project, including a template to use as a base project or an existing project to copy from or symbolically link to on your hard drive. Use the `template list` command to view the templates currently available.

## Options

```bash
--name, -n <name>         application name (default: "Hello World")
--id, -i <package>        package name (default: "com.phonegap.hello-world")
--template <name>         create app using an existing app template
--copy-from, -src <path>  create project using a copy of the www folder from an existing project
--link-to <path>          symlink/shortcut to the www folder of another project without copying
```

### Config Parameter

The `[config]` parameter allows you to pass a JSON string with configuration parameters some plugins may specifically rely on. They are injected into the `<path>/.cordova/config.json` file.

## Examples

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

<div class="alert--info">**Note:** Check out the <a href='/references/phonegap-cli/templates'>templates</a> guide for more details on how to create applications based on templates.</div>
