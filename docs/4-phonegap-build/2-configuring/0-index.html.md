---
title: Configuring
url: phonegap-build/configuring
layout: subpage
---

PhoneGap and PhoneGap Build are built upon the Apache Cordova Project. Spend some time at [docs.cordova.io](https://docs.cordova.io) to get more familiar with how PhoneGap and Cordova applications are configured.

PhoneGap applications are configured using a `config.xml` file. This should be at the root of your application.

The `config.xml` file follows the [W3C widget specification](http://www.w3.org/TR/widgets/). It allows developers to easily specify metadata about their applications. You can see a sample `config.xml` with our [PhoneGap Start](https://github.com/phonegap/phonegap-start/blob/master/www/config.xml) application.

We're continually adding features to our `config.xml` support to give PhoneGap Build developers more power to customize their apps. If there are any specific features you'd like to see support for, [please let us know](https://forums.adobe.com/community/phonegap/build).

1. [Essential Properties](#props)
1. [Example config.xml](#example)

<a class="anchor" id="props"></a>

## Essential Properties

<code>&lt;widget&gt;</code>

The widget element must be the root of your XML document - it lets us
know that you are following the W3C specification. When using PhoneGap
Build, ensure you have the following attributes set on your widget
element. It supports the following attributes:

- **id**: the unique identifier for your application. To support all supported platforms, this *must* be reverse-domain name style (e.g. `com.yourcompany.yourapp`)
- **version**: for best results, use a major/minor/patch style version, with three numbers, such as `0.0.1`
- **versionCode**: (optional) when building for Android, you can set the versionCode by specifying it in your *config.xml*. For more information on Android's versionCode attribute, see [the Android documentation](https://developer.android.com/studio/publish/versioning.html).

```xml
<name>
```

The name of the application.

```xml
<description>
```

A description for your application.

```xml
<author>
```

The author of the application, either a company or individual (required for Windows 10 builds).

```xml
<platform>
```

You can have zero or more of these elements present in your <code>config.xml</code>. Set the name attribute to one of `ios`, `android`, or `windows`. If you specify none, all platforms will be built. Example usage:

```xml
<platform name="ios" />
<platform name="android" />
<platform name="winphone" />
```

All of the above fields are standard Cordova config.xml tags. For more detailed info about the above elements, and all the others available, see [the Cordova config.xml documentation](https://cordova.apache.org/docs/en/latest/config_ref/index.html). Most of these will work on PhoneGap Build, but if you face issues with any specific tags, [let us know](https://forums.adobe.com/community/phonegap/build).

<a class="anchor" id="example"></a>

## Example Config.xml

```xml
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

</widget>
```
