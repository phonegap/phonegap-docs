---
title: Update Version
url: references/phonegap-cli/update
layout: subpage
---

## Manually Update

To update your PhoneGap CLI to the latest version, run the following command:

```bash
$ npm install -g phonegap
```

<div class="alert--info">**NOTE:** If you get an `Error: EACCES` when running any of the commands here, try prefixing it with `sudo`, such as: `$ sudo npm install -g phonegap` </div>

## Update Available Notification

The CLI will also display a notification when any command is used if an update is available:

```bash
$ phonegap -v
6.0.3

   ---------------------------------------
   |                                     |
   |   Update available 6.0.3 -> 6.0.4   |
   |   Run npm i -g phonegap to update   |
   |                                     |
   ---------------------------------------
```

<div class="alert--info">**NOTE:** This notification will only be displayed once every 24 hours.</div>

To disable the update notifier, you can do one of the following:

1. Use the `--no-update-notifer` flag with any PhoneGap command.
  * For example, `phonegap run ios --no-update-notifier`
1. Disable the update notifier by altering the configuration file.
    1. Open `~/.config/configstore/update-notifier-phonegap.json`
    1. Set the property `"optOut": true`
