---
title: Remote Usage
url: references/phonegap-cli/remote-usage
layout: subpage
---

The PhoneGap `remote` commands are used for executing commands against the PhoneGap Build service in the cloud rather than relying on a locally installed SDK for each platform.

## Usage

```bash
phonegap remote [command]
```

Use the commands below in conjunction with the `remote` command to perform the specific actions outlined below.

## Commands

```bash
login                login to PhoneGap Build (requires an account and your credentials)
logout               logout of PhoneGap Build
build <platform>     build a specific platform
install <platform>   install a specific platform (returns a generated QR code in the terminal)
run <platform>       build and install a specific platform
```

## Examples

```bash
$ phonegap remote login
$ phonegap remote build ios
$ phonegap remote install android
$ phonegap remote run ios
$ phonegap remote logout
```

<div class="alert--info">**NOTE:** You'll need to have an existing <a href='https://build.phonegap.com'>PhoneGap Build</a> account to use these commands. You'll be prompted to enter your credentials after running the `$ phonegap remote login` command. An Adobe ID can be used as well.</div>

<div class="alert--tip">**TIP:** The `phonegap remote run` command will execute both the `build` and `install` commands automatically and is the quickest path to building your app with the PhoneGap Build cloud service. The result is a QR code that can be scanned by your mobile device directly from the terminal to install the app.</div>
