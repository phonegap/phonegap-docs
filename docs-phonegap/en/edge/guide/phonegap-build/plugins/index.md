---
license: Licensed to the Apache Software Foundation (ASF) under one
         or more contributor license agreements.  See the NOTICE file
         distributed with this work for additional information
         regarding copyright ownership.  The ASF licenses this file
         to you under the Apache License, Version 2.0 (the
         "License"); you may not use this file except in compliance
         with the License.  You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing,
         software distributed under the License is distributed on an
         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
         KIND, either express or implied.  See the License for the
         specific language governing permissions and limitations
         under the License.

---

# Plugins for PhoneGap Build

A _plugin_ is a package of code that is injected into an application,
allowing it to access features of the device platform on which it
runs.  All the main PhoneGap API features are implemented as plugins,
and many others are available that enable features such as bar code
scanners, NFC communication, or to tailor calendar interfaces.

Plugins work somewhat differently in PhoneGap Build than with the CLI
(described in The Command-line Interface), or with lower-level
SDK-based command-line tooling (described in the various Platform
Guides).  PhoneGap Build supports a whitelisted selection of plugins,
each of which you specify in the application's main `config.xml` file
for PhoneGap Build to inject them into your app.

This section shows how to add plugins to projects compiled with
PhoneGap Build. It also shows how plugin authors can contribute their
code to make it available to other PhoneGap Build users.  See
Application Plugins for details on how to author plugins. See The
config.xml File for details on other configation options.

## Using Existing Plugins

To see a list of available plugins, both for third-party features and
to enable core PhoneGap APIs, see
[build.phonegap.com/plugins](https://build.phonegap.com/plugins):

![](img/guide/phonegap-build/plugins/plugin_listing.png)

There are two steps to include a plugin in your project: referencing
the JavaScript file that provides the plugin's main interface, and
modifying the app's `config.xml` file to import each plugin package by
the identifier listed in the PhoneGap Build interface.

By default, the webview that renders the PhoneGap app loads a
`phonegap.js` file. The plugin code depends on PhoneGap already being
loaded. To ensure they load in the correct order, specify them both
explicitly:

        <script src="phonegap.js"></script>
        <script src="barcodescanner.js"></script>

Read each plugin's documentation to determine its JavaScript
interface. Otherwise, its JavaScript file is specified by the
`<js-module>` element in the plugin's `plugin.xml` manifest file. (See
Application Plugins for an example, and Plugin Specification for
more details.)

__NOTE:__ Do not include any of the plugin's code in your app.  Let
PhoneGap Build inject it, or problems will result.

To specify the plugin itself, add a `<gap:plugin>` tag to the
`config.xml` file, as in the following example plugin:

        <gap:plugin name="com.phonegap.plugins.example" />

Specify each plugin's `name` by the reverse domain-style identifier
that displays in PhoneGap Build's plugin listings.

Adding a `version` attribute allows you to specify the plugin version,
or range of versions as in the following examples. Otherwise the
latest available version is used.

        <gap:plugin name="com.phonegap.plugins.example" version="2.2.1" />
        <gap:plugin name="com.phonegap.plugins.example" version=">=2.2.1" />
        <gap:plugin name="com.phonegap.plugins.example" version="<=2.2.1" />
        <gap:plugin name="com.phonegap.plugins.example" version=">2.2.1" />
        <gap:plugin name="com.phonegap.plugins.example" version="<2.2.1" />

The tilde (`~`) operator specifies fuzzy versions, such as the most
recent version of the `2.1` minor release in this example:

        <gap:plugin name="com.phonegap.plugins.example" version="~2.1" />

This variation does the same, but requires at least patch level 3:

        <gap:plugin name="com.phonegap.plugins.example" version="~2.1.3" />

Plugins may require additional configuration information, which you
add as child `<param>` elements to the `<gap:plugin>` element. For
example:

        <gap:plugin name="com.phonegap.plugins.example">
            <param name="APIKey" value="12345678" />
            <param name="APISecret" value="87654321" />
        </gap:plugin>

Read the plugin's documentation to check whether any parameters are
necessary.

## Contributing Plugins

