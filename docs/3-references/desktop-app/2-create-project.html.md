---
title: Create a Project
url: references/desktop-app/create-project
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

### 2. Using the File Menu

   Click **File -> New Project** in the menu bar to create a new project. You will be taken directly to the **New Project Dialog**
   explained below.

   ![File New Project](/images/docs-file-menu.png)

## New Project Dialog

Once you've chosen to create a new project you will be prompted with the **STEP 1 of 2 | SELECT A TEMPLATE** dialog where you can choose
to create your app based on a template from the list shown. Each template has a brief description below the name
indicating what type of project will be created. To select a template, click on the radio button next to it. In the image below, the **Hello World** template is selected.

![Templates Dialog](/images/templates-list.png)

Once you've selected the template you want to use, click on the green **Next** button. You will be taken to the **STEP 2: PROJECT DETAILS** dialog to enter the details about your app.

![Create New Project Dialog](/images/docs-create-dialog.png)

1. Choose a folder where your project will be created in the **Local path** section.

<div class="alert--info"> **NOTE:** This path will default to the last path chosen once you've created your first project.</div>

1. Enter a name for your project in the **Name** section.

1. Optionally enter a project ID in the **ID** text field. If you choose not to enter a project ID, your project will be given a default ID of `com.phonegap.helloworld`. This ID field will be used for the *package identifier* for Android and the *bundle identifier* for iOS and is typically in reverse domain style.

1. Click on the **Create project** button. Your new project will be created and started on the local web server. The project created will be based on the default PhoneGap Hello World application.

## Next Steps

You can now test out your new app by [pairing it](/references/desktop-app/pair-with-dev-app/) with the **PhoneGap Developer App** running on your mobile device.
