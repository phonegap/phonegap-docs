---
title: Step 3: Create Your App
url: getting-started/3-create-your-app/cli
layout: subpage
tabs:
  - label: Desktop App
    url: getting-started/3-create-your-app/desktop
  - label: CLI
    url: getting-started/3-create-your-app/cli
next: 1-getting-started/4-preview-your-app/2-cli.html.md
---

Now that you've installed [PhoneGap Desktop](/getting-started/1-install-phonegap/desktop) and/or the [PhoneGap CLI](/getting-started/1-install-phonegap/cli)

## Create Default PhoneGap Project

The PhoneGap CLI has a default Hello World project for beginners to start with. It's proven to be the quickest and easiest way to understand the basics of building a mobile PhoneGap app so let's start by creating the default project with the CLI.

1. Enter the following command from your terminal:

  ```sh
  $ phonegap create myApp
  ```

   This will create a folder named **myApp** in the current path location with a default project name of *Hello World* and id of *com.phonegap.helloworld*.

   You can also specify a name and identifier to ensure the project is unique but still contains the default Hello World code project by specifying them as qualified parameters as shown below:

  ```sh
  $ phonegap create myApp --id "org.myapp.sample" --name "appSample"
  ```

   <div class="alert--tip">**TIP:** Each of the `create` command options is documented in the help text and can be accessed with `$ phonegap create help`. To access general help from the CLI, type `-h` or `help` with any command.</div>

1. Verify that you see the following output in your console after you run the command:

  ```sh
  Creating a new cordova project.
  ```

1. Change into the new project directory with the `cd` command:

  ```sh
  $ cd myApp/
  ```

1. Check to be sure you see the following set of files and folders shown below:

  ```sh
  config.xml    hooks    platforms    plugins    www
  ```

1. `cd` into the ***www*** folder and look around at the files and subfolders in there, this is the content of your app, with the entry point being the **index.html** file.

  ```sh
  $ cd www/
  ```

 <div class="alert--tip">**TIP:** Details about the rest of the files and folders created in the root project  will be covered in guides further along. For now just focus on the ***www*** folder and its contents.</div>
