---
title: Step 1: Install PhoneGap CLI
url: getting-started/1-install-phonegap/cli
layout: subpage
tab: CLI
next: 1-getting-started/2-install-mobile-app.html.md
---

###Requirements

- [node.js](http://nodejs.org/) - a JavaScript runtime to build your JavaScript code
- [ios-sim](https://github.com/phonegap/ios-sim#installation) - an iOS simulator for iOS development (Mac only)
- [git](http://git-scm.com) - used in the background by the CLI to download assets. It comes pre-installed on some operating systems, to see if you already have it installed, type `git` from the command line.

###Install Steps

1. Install the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` with the following command from the Terminal app (Mac) or Command Prompt (Win).
`$ npm install -g phonegap`

 <div class="alert--info">**TIPS**

 1. The `$` symbol is used throughout this guide to indicate the command prompt, it should not be typed.
 2. `npm` is the node package manager and installed with node.js. The `npm` command fetches the necessary dependencies for the PhoneGap CLI to run on your local machine. It creates a *node_modules* folder with the necessary code needed to run the CLI. The `-g` flag specifies that folder to be installed at the global location so it can be accessed from anywhere on your machine (defaults to */usr/local/lib/node_modules/phonegap* on Mac).

 </div>

  <div class="alert--warning">**OS X Users:** You may need to prefix this command with `sudo` to allow installation to restricted directories and type the following instead: `$ sudo npm install -g phonegap`<br><br>
  **Windows 8 Users:** If you just installed Node.js, be sure to start the *Node.js Command Prompt* application specifically.</div>
2. Test to ensure the PhoneGap CLI is properly installed by typing `phonegap` on the command line to ensure you see the following output `help` text display:
  ``` bash
  $ phonegap
  Usage: phonegap [options] [commands]
  Description:
     PhoneGap command-line tool.
     Commands:
        help [command]       output usage information
        create <path>        create a phonegap project
         ...
  ```

<div class="alert--info">**TIP:** You can access the PhoneGap CLI usage text at any time by adding the keyword `help`, `-h` or `--h` with any phonegap command i.e.: `phonegap create help`, `phonegap serve -h`.</div>
