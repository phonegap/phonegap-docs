<link href="../css/styles.css" rel="stylesheet">
<link href="../css/bootstrap.css" rel="stylesheet">
<div class="sidebar"></div>

##Step 1: Install the PhoneGap CLI 


<hr>
###Requirements

- [node.js](http://nodejs.org/) - a server based app platform
- [ios-sim](https://github.com/phonegap/ios-sim#installation) - an iOS simulator for iOS development (Mac only)
- [git](http://git-scm.com) - used in the background by the CLI to download assets. It comes pre-installed on some operating systems, to see if you already have it installed, type `git` from the command line. 

###Install Steps

1. Install the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` with the following command from the Terminal app (Mac) or Command Prompt (Win). 

	`$ npm install -g phonegap`
	
    <div class="callout callout-info">**QUICK TIPS** 
   
  	-   `npm` is the package manager for node and installed with node.js
  	-    The `$` symbol is used throughout this guide to indicate the command prompt, it should not be typed.
</div>
    
   <div class="alert alert-warning">**OS X Users:** You may need to prefix this command with `sudo` to allow installation to restricted directories and type the following instead: `$ sudo npm install -g phonegap`<br><br>
  **Windows 8 Users:** If you just installed Node.js, be sure to start the *Node.js Command Prompt* application specifically.</div>

2. Test to ensure the PhoneGap CLI is properly installed by typing `phonegap` on the command line to ensure you see the following output `help` text display:

        $ phonegap
        Usage: phonegap [options] [commands]
        Description:
           PhoneGap command-line tool.
           Commands:
              help [command]       output usage information
              create <path>        create a phonegap project
              ...


 <div class="alert alert-info">**TIP:** You can access the PhoneGap CLI usage text at any time by adding the keyword `help`, `-h` or `--h` with any phonegap command i.e.: `phonegap create help`,`phonegap serve -h`.</div>
<hr>
That's it! You're ready to move on to the next step and start building your first PhoneGap mobile app!
<hr>
<a href="install-guide.html"><button class="btn-prev"><- Step 0: Choose Desktop Tool</button></a><a href="developer-install.html"><button class="btn-next">Step 2: Install Developer App -></button></a>
