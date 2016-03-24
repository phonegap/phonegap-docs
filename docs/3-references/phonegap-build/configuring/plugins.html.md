---
title: Plugins
url: references/phonegap-build/configuring/plugins
layout: subpage
expand: build-configuring
---

To extend the native functionality exposed by the PhoneGap native-app container, PhoneGap Build supports most PhoneGap or Cordova plugins.

Plugins can be from <a href="https://build.phonegap.com/plugins" target="_blank">our repostiory</a>, <a href="https://www.npmjs.com/">npm</a> or from a public git repository.

Plugins need to be implemented differently for each platform, and may not be supported across all PhoneGap platforms. If you're deploying across multiple platforms, ensure that the experience degrades gracefully for users who do not have the plugin available.

If you would like to contribute a plugin to the PhoneGap Build repository, please see the [Contributing Plugins ](developer_contributing_plugins.md.html) documentation. To submit a plugin to <a href="https://www.npmjs.com/">npm</a> please view their <a href="https://docs.npmjs.com/getting-started/publishing-npm-packages">documentation</a>.

### Including a plugin in your project

There are two steps to including a plugin in your project:

1. <a href="#importing-config">Importing the native code using the config.xml</a>
2. <a href="#importing-native">Referencing the JavaScript code for the plugin</a>

<a id="importing-config"></a>
#### Importing the native code

To import the native code into your PhoneGap Build project, you will need to add the correct `<plugin>` or deprecated `<gap:plugin>` tag to your config.xml file.

<b>If you omit the `spec` (or `version`) tag of a npm or PhoneGap Build plugin, your app will always be built with the latest version of the plugin. It will be updated automatically the next time you update your application code after a plugin is updated, which may cause unexpected behaviour.</b> For more info on plugin versioning, <a href="#plugin-versions">click here</a>.

- [&lt;plugin&gt; tag](#plugin)
- [&lt;gap:plugin&gt; tag](#gap-plugin)
- [Plugin source](#plugin-source)
- [Plugin version/location](#plugin-version)
- [Plugin parameters](#plugin-parameters)
- [Usage example](#usage-example)

<a id="plugin"></a>
#### &lt;plugin&gt;

- **name**: Plugins should be referenced by the plugin ID which is normally in a reverse domain format (ex: com.phonegap.plugins.barcodescanner). Optional if the plugin is git-backed.
- **spec**: Optional, but we highly recommend locking your plugin version, as mentioned above. For git-backed plugins this will specify the git repository. If the attribute contains a full URL then it is assumed it is a git plugin.
- **source**: Optional, can either be "pgb", "npm" or "git".  Defaults to "npm" (or "git" if a git URL is detected).
- **params**: Plugins may require parameters for configuration properties. <a href="#plugin-params">Here is a detailed explanation.</a>

<a id="gap-plugin"></a>
#### &lt;gap:plugin&gt;

- **name**: Plugins should be referenced by the plugin ID which is normally in a reverse domain format (ex: com.phonegap.plugins.barcodescanner).
- **version**: Optional, but we highly recommend locking your plugin version, as mentioned above. For git-backed plugins this will specify the git repository. If the attribute contains a full URL then it is assumed it is a git plugin.
- **source**: Optional, can either be `pgb`, `npm` or `git`.  Defaults to `pgb` (or `git` if a git URL is detected).
- **params**: Plugins may require parameters for configuration properties. <a href="#plugin-params">Here is a detailed explanation.</a>

<a id="plugin-sources"></a>
#### Plugin Source

Plugins can be included from either our repository, located <a href="https://build.phonegap.com/plugins">here</a>, at <a href="https://www.npmjs.com/">npm</a> or from a public git repository.

If source is not present then the default value for this attribute is `npm` or `git` depending if it can auto-detect a git backed repo format. For instance the plugin lines below all reference the same plugin in the <a href="https://www.npmjs.com/">npm</a> repository.

    <plugin name="com.phonegap.plugins.example" spec="~1" />
    <plugin name="com.phonegap.plugins.example" spec="~1" source="npm" />

If the `spec` attribute is a git location then the source is defaulted to "git". The lines below will reference the same plugin.

    <plugin spec="https://github.com/apache/cordova-plugin-file.git#4.1.0" />
    <plugin spec="https://github.com/apache/cordova-plugin-file.git#4.1.0" source="git" />

To include a plugin from the PhoneGap Build <a href="https://build.phonegap.com/plugins">repository</a> specify `pgb` in the source attribute.

    <plugin name="example-plugin" source="pgb" spec="~1"  />

The param fragments are handled identically regardless of the source of the plugin.

<a id="plugin-versions"></a>
#### Plugin Version / Location

Here is the most simplistic way of using a versioned plugin. The `spec` attribute is the recommended way to specify the version. `spec` is used so as to be compatibile with the Cordova CLI, which uses a `spec` attribute to describe the version or location of the plugin.

    <plugin name="cordova-plugin-example" spec="2.2.1" />

PhoneGap Build also supports `fuzzy versions`.

You can use the tilde `~` operator to specify fuzzy versions, this will ensure that you have the latest version of a plugin with the same major version.

For example, you could replace the tag above with:

    <plugin name="cordova-plugin-example" spec="~2" />

which would load the latest 2.x version, but not anything with a different major/initial version number.

The following version tag:

    <plugin name="com.phonegap.plugins.example" spec="~2.2" />

would load the latest 2.x version so long as x is greater or equal to 2.

And finally, this version tag:

    <plugin name="com.phonegap.plugins.example" spec="~2.2.3" />

would load the latest 2.2.x version so long as x is greater or equal to 3.

<a id="plugin-params"></a>
#### Plugin Parameters

Plugins may require configuration information to be present; this can be done with adding <param> children to the <plugin> tag:

    <plugin name="com.phonegap.plugins.example">
      <param name="APIKey" value="12345678" />
      <param name="APISecret" value="12345678" />
    </plugin>

<i class="glyphicon glyphicon-check"></i> Make sure to check the documentation of the plugin to see if parameters are necessary.

#### Usage Example

Here is a config.xml that includes the Barcode Scanner plugin from npm as an example:

    <?xml version="1.0" encoding="UTF-8" ?>
        <widget xmlns   = "http://www.w3.org/ns/widgets"
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

        <!-- We'll include the Barcode plugin as an example -->
        <plugin name="phonegap-plugin-barcodescanner" />
    </widget>

<a id="importing-native"></a>
### Referencing the JavaScript code

If a plugin utilizes the <code>js-module</code> element to direct cordova to load the plugin javascripts, then no <code>&lt;script&gt;</code> references will be necessary to load a plugin. This is the case for the core cordova plugins, but 3rd party plugins will be implementation-dependent. Refer to the plugin's documentation to determine if you'll need to manually include the javascript.

If you do need to manually include the plugin javascript, it would look like the following:

    <script src="cordova.js"></script>
    <script src="barcodescanner.js"></script>

Whether the script tag is required or not, **do not include the actual plugin files in the zip or repository which you submit to PhoneGap Build**. These files will be injected by PhoneGap Build, and including them may cause problems.
