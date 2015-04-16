---
title: "Create a Project"
---
### Default Hello World
The CLI has many variations of commands available for creating a project, the simplest is:

  `$ phonegap create myApp`

This will create a folder named *myApp* in the current path location with a default project name of "Hello World" and id "com.phonegap.helloworld". However, you can also specify your own name and identifier to ensure the project is unique but still have the advantage of using the default Hello World code by specifying a couple extra attributes at create time.

1. In this step, we're going to create the default Hello World project with the PhoneGap CLI, but specify a name and identifier to make it unique.
   <br><br>To create a project with an id and name, use the command shown below with your own values:

	  	$ phonegap create path/to/appSample "org.myapp.sample" "appSample"
You could also specify `--` with parameters to explicitly identify the id and name of your app as shown below:
		$ phonegap create path/to/appSample --id "org.myapp.sample" --name "appSample"
  <div class="alert--info">**TIP:** Each of the `create` command options is documented in the help text and can be accessed with `$ phonegap create help`. To access general help from the CLI, type `-h` or `help` with any command.</div>
2. Verify that you see output like the following in your console after you run the command:

		Creating a new cordova project with name "appSample" and id "org.myapp.sample" at location "path/to/appSample"

		Using custom www assets from https://github.com/phonegap/phonegap-app-hello-world/archive/master.tar.gz`

	This output makes it clear that we have created a new project with our own unique name and id but using the Hello World default PhoneGap project as the content.
3. Change into the new project directory with the `cd` command:

		$ cd path/to/appSample

4. Check to be sure you see the following set of files and folders shown below:

		config.xml	  hooks		platforms	plugins		www
5. `cd` into the *www* folder and look around at the files and subfolders in there, this is the content of your app, with the entry point being the **index.html** file.
 <div class="alert--warning">**NOTE:** Details about the rest of the files and folders created in the root project  will be covered in guides further along. For now just focus on the *www* folder and its contents.</div>
