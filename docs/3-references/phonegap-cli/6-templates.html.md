---
title: Templates
url: references/phonegap-cli/templates
layout: subpage
---

Use the `template list` command to get a listing of the templates available for creating your applications with the `create` command. Some templates available include a `blank` template, a `hello-world` template or one based on jQuery Mobile. Once you choose a template, specify it using the `--template` (or the alias `--recipe`) option followed by the name of the template.

## Usage

```bash
phonegap template list
```

## Examples

```bash
$ phonegap template list
$ phonegap create myApp --template hello-world
$ phonegap create myApp --recipe hello-world
```
