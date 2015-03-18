<link href="../css/styles.css" rel="stylesheet">
<link href="../css/bootstrap.css" rel="stylesheet">

###PhoneGap CLI Installation Guide 

##Requirements:
- [NodeJS](http://nodejs.org/) 
- [ios-sim]
(https://github.com/phonegap/ios-sim#installation) - iOS simulator for iOS development (Mac only)

    <div class="callout callout-info">The CLI requires [git] (http://git-scm.com) as well since it's used in the background by the CLI. OSX includes it by default. To see if you already have it installed, type `git` from the command line. 

##Install Steps

1. Install the PhoneGap CLI via npm

	`$ npm install -g phonegap`
	
    <div class="callout callout-warning"><span class="label label-warning">Note:</span> OSX Users may need to prefix this command with `sudo` to install to allow installation to restricted directories

		$ npm install -g phonegap
	
</div>
2. Test it out. Type `phonegap` on the command line to ensure you get a listing of help docs to ensure you've installed the CLI correctly. Now you're ready to move on to the next step and create your first project!

<div class="alert alert-info">

For quick help at any time, type `help` i.e.: `$ phonegap help` or `$ phonegap create help`</div>
