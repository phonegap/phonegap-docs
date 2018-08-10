---
title: "Step 1: Install PhoneGap"
url: getting-started/1-install-phonegap/cli
layout: subpage
tabs:
  - label: Desktop App
    url: getting-started/1-install-phonegap/desktop
  - label: CLI
    url: getting-started/1-install-phonegap/cli
next: 1-getting-started/2-install-mobile-app.html.md
---

The PhoneGap CLI provides a command line interface for creating PhoneGap apps as an alternative to using the [PhoneGap Desktop App](/getting-started/1-install-phonegap/desktop) for those who prefer working at the command line. The PhoneGap CLI currently has some additional features over the PhoneGap Desktop for building, running and packaging your PhoneGap applications on multiple platforms. If you're comfortable using a CLI this option may be best going forward.

<div class="alert--info">**NOTE:** The getting started steps vary based on the initial PhoneGap tool you install here in step 1. For the rest of the steps be sure to choose either the **Desktop** or **CLI** tab at the top accordingly.</div>

## Requirements

There are a few simple requirements you'll need prior to installing the PhoneGap CLI:

- [node.js](https://nodejs.org/) - a JavaScript runtime to build your JavaScript code
- [git](http://git-scm.com) - used in the background by the CLI to download assets. It comes pre-installed on some operating systems.

To see if you already have it installed, type `git` from the command line.

## Install Steps

1. Install the [PhoneGap CLI](https://www.npmjs.com/package/phonegap) via `npm` with the following command from the Terminal app (Mac) or Command Prompt (Win).

  ```sh
  $ npm install -g phonegap@latest
  ```

  <div class="alert--tip">**TIPS:** 1) The `$` symbol is used throughout this guide to indicate the command prompt, it should not be typed. 2) `npm` is the node package manager and installed with node.js. The `npm` command fetches the  necessary dependencies for the PhoneGap CLI to run on your local machine. It creates a *node_modules* folder with the necessary code needed to run the CLI. The `-g` flag specifies that folder to be installed at the global location so it can be accessed from anywhere on your machine (defaults to */usr/local/lib/node_modules/phonegap* on Mac).</div>

  <div class="alert--warning">**OS X Users:** You may need to prefix this command with `sudo` to allow installation to restricted directories and type the following instead: `$ sudo npm install -g phonegap@latest`<br><br>**Windows 8 Users:** If you just installed Node.js, be sure to start the *Node.js Command Prompt* application specifically.</div>

1. Test to ensure the PhoneGap CLI is properly installed by typing `phonegap` on the command line. You should see the following `help` text output displayed:

  ```sh
  $ phonegap
  Usage: phonegap [options] [commands]
  Description:
   PhoneGap command-line tool.
   Commands:
      help [command]       output usage information
      create <path>        create a phonegap project
       ...
  ```

  <div class="alert--tip">**TIP:** You can access the PhoneGap CLI usage text at any time by adding the keyword `help`, or the `-h` or `--h` attribute with any phonegap command i.e.: `$ phonegap create help`, `$ phonegap serve -h`.</div>
