---
title: Step 2: Getting Started
url: app-stack/conference-memories/2-getting-started
layout: subpage
---

<p class="sub-paragraph">Now that you've got your [Adobe ID](https://helpx.adobe.com/ca/x-productkb/global/adobe-id-account-change.html) and [registered your app](https://creativesdk.zendesk.com/hc/en-us/articles/216369343-Why-and-how-to-register-my-app-).</p>

## Create PhoneGap Project

The PhoneGap CLI has a default Hello World project for beginners to start with but for this tutorial we are going to use a different template.

1. Enter the following command from your terminal:

  ```sh
  $ phonegap create confApp --template https://github.com/phonegap/phonegap-template-vue-f7-split-panel
  ```

   This will create a folder named **confApp** in the current path location with a default project name of *Hello World* and id of *com.phonegap.helloworld*.

   You can also specify a name and identifier to ensure the project is unique but still contains the default Hello World code project by specifying them as qualified parameters as shown below:

  ```sh
  $ phonegap create confApp --id "org.confapp.sample" --name "ConfApp" --template https://github.com/phonegap/phonegap-template-vue-f7-split-panel
  ```

   <div class="alert--tip">**TIP:** Each of the `create` command options is documented in the help text and can be accessed with `$ phonegap create help`. To access general help from the CLI, type `-h` or `help` with any command.</div>

1. Verify that you see the following output in your console after you run the command:

  ```sh
  Creating a new cordova project.
  ```

1. Change into the new project directory with the `cd` command:

  ```sh
  $ cd confApp/
  ```

1. Check to be sure you see the following set of files and folders shown below:

  ```sh
  config.xml    hooks    platforms    plugins    www
  ```

1. Now we'll install the node modules we need to develop the app. Enter the following command in your terminal:

  ```sh
  $ npm install
  ```

1. Once all the node modules have been installed, it may take awhile, let's test our install by running the webpack development server by entering the following terminal command:

  ```sh
  $ npm run dev
  ```

   This will open the app in your browser by at [localhost:8080](http://localhost:8080)

  ![](/images/conference-memories/browser-debug.png)
