---
title: Updating the CLI Version
url: references/phonegap-cli/update
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/update.html.md
layout: subpage
expand: cli
---
 
To update your PhoneGap CLI to the latest version, run the following command:

```bash
$ npm install -g phonegap
```

<div class="alert--info">**NOTE:** If you get an `Error: EACCES` when running any of the commands here, try prefixing it with `sudo`, such as:
    `$ sudo npm install -g phonegap` </div>

The CLI will also display a notification when an update is available.

```bash
$ phonegap -v
6.0.3


   ╭─────────────────────────────────────╮
   │                                     │
   │   Update available 6.0.3 → 6.0.4    │
   │   Run npm i -g phonegap to update   │
   │                                     │
   ╰─────────────────────────────────────╯
```

This notification will only be displayed once every 24 hours. But if you would like to disable it, there are 2 ways of doing so:

1. Use the `--no-update-notifer` flag with any PhoneGap command.
2. You can also opt-out by changing the `optOut` property to `true` in ~/.config/configstore/update-notifier-phonegap.yml.
