---
title: Serve an App
url: references/phonegap-cli/serve
layout: subpage
---

The `serve` command is used to start up a local web server to host the application for the PhoneGap Developer app (or any browser) to consume.

## Usage

```bash
phonegap serve [options]
```

## Options

Some options are available for specifically setting the port to use, to enable or disable auto reload, or to setup a local tunnel for public access as shown below.

```bash
--port, -p <n>       port for web server (default: 3000)
--autoreload         enable app refresh on file changes (default: true)
--no-autoreload      disable app refresh on file changes
--browser            enable desktop browser support (default: true)
--no-browser         disable desktop browser support
--localtunnel        enable a local tunnel for public access (default: false)
```

## Alias

```bash
$ phonegap app
```

## Examples

```bash
$ phonegap serve
$ phonegap serve --port 1337
$ phonegap serve --no-autoreload
$ phonegap serve --browser
$ phonegap serve --no-browser
$ phonegap serve --localtunnel
$ phonegap app
```
