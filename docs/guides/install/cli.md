<link href="../css/styles.css" rel="stylesheet">
<link href="../css/bootstrap.css" rel="stylesheet">

#PhoneGap CLI Installation Guide 

##Requirements:
- [NodeJS](http://nodejs.org/) 
- [ios-sim]
(https://github.com/phonegap/ios-sim#installation) - iOS simulator for iOS development (Mac only)

**Note:** [git] (http://git-scm.com) is also required. It's used in the background by the CLI. OSX includes it by default. To see if you already have it installed, type `git` from the command line. 

##Install Steps

1. Install the PhoneGap CLI via npm

	`$ npm install -g phonegap`
	
<div class="callout callout-tip"><span class="label label-success">Tip:</span> OSX Users may need to prefix this command with `sudo` to install to allow installation to restricted directories

		$ npm install -g phonegap
	
</div>
2. Try it! 

	Run a basic `phonegap create` command to ensure you've installed the CLI correctly:
		
		$ phonegap create myApp

3. cd into your new project folder and get started!
	
		$ cd myApp
	
<div class="tip">

**Tip:** for quick help at any time use the `-h` flag or type `help` after `phonegap` or the specific command i.e.: `$ phonegap create help`</div>