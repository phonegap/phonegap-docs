---
title: Using cordova Commands
url: references/phonegap-cli/cordova
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/cordova.html.md
layout: subpage
---

There are some cases where the PhoneGap CLI and Cordova CLI have similar commands but behave differently. The PhoneGap `serve` command is
a good example of this. Another difference is found when using the `phonegap build` or `phonegap run` commands versus the Cordova
equivalent. The PhoneGap CLI version will automatically add platform targets if none exist. 

When you want to specifically force it to use the `cordova` version of a command, you can add `cordova` as the 
prefix to that command. The Cordova CLI version of a command will be used automatically for any commands that are not enhanced by the P
honeGap CLI. You don't need to specifically type `cordova`.   
  
###Usage
    phonegap cordova <command>

###Example

    $ phonegap cordova serve
  
  