<link href="../css/styles.css" rel="stylesheet">
<link href="../css/bootstrap.css" rel="stylesheet">

###PhoneGap CLI - Creating a Project

There are multiple ways to create a PhoneGap mobile app project using the CLI. You can use a shortcut, which will create a default project based on a Hello World app with a project name and identifier set to the default Hello World project. You can also specify your own name and identifier to replace in the generated Hello World project by specifiying them as parameters on the project. 

<div class="callout callout-info"><button class="btn-info">?</button>
For quick help at any time, type `help` i.e.: `$ phonegap help` or `$ phonegap create help`</div>

1. In this step, we're going to create the default Hello World project with the PhoneGap CLI, but specify our name and identifier for it to keep it unique. 


   To create a project with an id and name, use a command like shown below, replacing the values with your own:

	  	$ phonegap create path/to/appSample "org.myapp.sample" "appSample" 
	  
	
  You could also specify the `--` with the parameters to explicitly identify them as shown below:


		$ phonegap create path/to/appSample --id "org.myapp.sample" --name "appSample" 

	
   Each of the `create` command options is documented in the help text and the CLI Reference guide.

2. Verify that you see output like the following in your console after you run the command:

		Creating a new cordova project with name "appSample" and id "org.myapp.sample" at location "path/to/appSample"

		Using custom www assets from https://github.com/phonegap/phonegap-app-hello-world/archive/master.tar.gz`
		
3. Change into the new project directory with the `cd` command:

		$ cd path/to/appSample

4. Check to be sure you see what looks like the set of files and folders here below:

		config.xml	hooks		platforms	plugins		www

<hr>
Congratulations! You've created your own uniquely named version of the default PhoneGap Hello World project. In the next step we'll learn how we can make it available for preview by the PhoneGap Developer App on your mobile device with one simple command!
<hr>
<a href="cli-install.html"><button class="btn">Previous</button></a><a href="../run/cli-serve.html"><button class="btn" style="float:right">Next</button></a>
