---
title: Create a Project
url: references/desktop-app/create-project
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/3-references/desktop-app/2-create-project.html.md
layout: subpage
---

There are multiple ways to create a project using PhoneGap Desktop; via the **Plus (+)** button, from the **File** menu or by drag
and drop.

## Create Project Options

### 1. Using the Plus Button

  Click on the **+** button in the side menu shown below:
  ![Add Project Button](/images/docs-plus-button.png)

  You will then be presented with the following options. Choose **Create new PhoneGap project**.

  ![Create Project Button](/images/docs-add-new.png)

### 2. **Using the File Menu**

   Click **File -> New Project** in the menu bar to create a new project. You will be taken directly to the **New Project Dialog**
   explained below.

   ![File New Project](/images/docs-file-menu.png)

### 3. **Using Drag & Drop**

   You can also drag any file or folder onto the PhoneGap Desktop interface to trigger the dialog below. Choose **Create new PhoneGap project**.

   ![Add New Project Dialog](/images/docs-add-new.png)

## New Project Dialog

Once you've chosen to create a new project you will be prompted with the **New Project Dialog** to enter details about your app.

1. Choose a folder where your project will be created in the **Local path** section.
1. Enter a name for your project in the **Name** section.
1. Optionally enter a project ID in the **ID** text field. If you choose not to enter a project ID, your project will be given a default ID of `com.phonegap.helloworld`. This ID field will be used for the *package identifier* for Android and the *bundle identifier* for iOS and is typically in reverse domain style.
1. Click on the **Create project** button. Your new project will be created and started on the local web server. The project created will be based on the default PhoneGap Hello World application.

  ![Create New Project Dialog](/images/docs-create-dialog.png)

## Next Steps

You can now test out your new app by [pairing it](/references/desktop-app/pair-with-dev-app/) with the **PhoneGap Developer App** running on your mobile device.
