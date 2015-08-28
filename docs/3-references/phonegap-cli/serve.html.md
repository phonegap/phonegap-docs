---
title: Serve
url: references/phonegap-cli/serve
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/serve.html.md
layout: subpage
---

  Serves the application on a local web server.

  The intended receiver is the PhoneGap Developer App running on a mobile device, but any
  browser can consume the content.

###Usage 
    phonegap serve [options]

###Options

      --port, -p <n>       port for web server (default: 3000)
      --autoreload         enable app refresh on file changes (default: true)
      --no-autoreload      disable app refresh on file changes
      --localtunnel        enable a local tunnel for public access (default: false)

###Alias

    phonegap app

###Examples

      $ phonegap serve
      $ phonegap serve --port 1337
      $ phonegap serve --no-autoreload
      $ phonegap serve --localtunnel
      $ phonegap app