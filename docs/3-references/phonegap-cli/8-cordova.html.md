---
title: Cordova Commands
url: references/phonegap-cli/cordova
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/3-references/phonegap-cli/8-cordova.html.md
layout: subpage
---

There are some cases where the PhoneGap CLI and Cordova CLI have similar commands but behave differently. The PhoneGap `serve` command is a good example of this. Another difference is found when using the `phonegap build` or `phonegap run` commands versus the Cordova CLI equivalent. The PhoneGap CLI version will automatically add the platform target if it doesn't already exist.

When you want to specifically enforce the `cordova` version of a command, you can add `cordova` as the prefix to that command. The Cordova CLI version of a command will automatically be used for any commands that are not enhanced by the PhoneGap CLI without having to specifically type `cordova`.

## Usage

```bash
phonegap cordova <command>
```

## Example

```bash
$ phonegap cordova serve
```
