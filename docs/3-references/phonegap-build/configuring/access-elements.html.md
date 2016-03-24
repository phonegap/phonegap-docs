---
title: Access Elements
url: references/phonegap-build/configuring/access-elements
layout: subpage
expand: build-configuring
---

<div class='alert--warning' style="font-style:bold">
As of Cordova iOS 4.x, Cordova Android 4.x, and Cordova Windows 4.x, whitelist management was moved from the core Cordova project to the `cordova-whitelist-plugin`, including the addition of the `allow-navigation` and `allow-intent` elements. You must add this plugin to enable and restrict network access in your application. 

    <plugin name="cordova-plugin-whitelist" />

[See the cordova-whitelist-plugin repository for up to date documentation](https://github.com/apache/cordova-plugin-whitelist). The following documentation here is for pre-4.0 applications only.
</div>


---

### Whitelist (Pre Cordova 4.x)

The access element provides your app with access to resources on other domains - in particular, it allows your app to load pages from external domains that can take over your entire webview.

<table class="table">
  <tr>
    <td><code>&lt;access&gt;</code></td>
    <td>
      <p>
        Your application can contain zero or many access elements.
      </p>
      <p>
        <code>origin</code>: The domain of where the resource lives.
      </p>
      <p>
        <code>subdomains</code> (optional): Whether to allow subdomains on the host
        specified in the origin paramter.
      </p>
    </td>
  </tr>
</table>

<i class="glyphicon glyphicon-check"></i> A blank access tag - `<access />` - denies access to any external resources. A wildcard - `<access origin="*" />` - allows access to any external resource.

## Example Usage:

    <?xml version="1.0" encoding="UTF-8" ?>
        <widget xmlns   = "http://www.w3.org/ns/widgets"
        xmlns:gap   = "http://phonegap.com/ns/1.0"
        id          = "com.phonegap.example"
        versionCode = "10" 
        version     = "1.0.0" >

        <!-- versionCode is optional and Android only -->

        <name>PhoneGap Example</name>

        <description>
          An example for phonegap build docs. 
        </description>

        <author href="https://build.phonegap.com" email="support@phonegap.com">
          Hardeep Shoker 
        </author>

        <!--
          This allows your app to load assets from all *.phongap.com domains
        -->
        <access origin="http://phonegap.com" subdomains="true" />
    </widget>

<i class="glyphicon glyphicon-check"></i> The behaviour of the access element is heavily dependent on the platform you're deploying to - we have a [blog post](http://phonegap.com/blog/2012/03/20/access-tags/) with more information. It is also likely to vary between different releases of PhoneGap - we'll work to maintain sane defaults and configurability for PhoneGap Build users.
