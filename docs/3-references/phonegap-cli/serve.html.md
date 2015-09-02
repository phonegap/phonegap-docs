---
title: Serve
url: references/phonegap-cli/serve
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/references/phonegap-cli/serve.html.md
layout: subpage
---

  The `serve` command is used to start up a local web server for hosting the application for the
  PhoneGap Developer app (or any browser) to consume.

###Usage 
    phonegap serve [options]   

###Options
  Some options are available for specifically setting the port to use, to enable/disable auto reload
  and to enable a local tunnel for providing public access as outlined below. 

      --port, -p <n>       port for web server (default: 3000)
      --autoreload         enable app refresh on file changes (default: true)
      --no-autoreload      disable app refresh on file changes
      --localtunnel        enable a local tunnel for public access (default: false)

###Alias

    $ phonegap app

###Examples

      $ phonegap serve
      $ phonegap serve --port 1337
      $ phonegap serve --no-autoreload
      $ phonegap serve --localtunnel
      $ phonegap app