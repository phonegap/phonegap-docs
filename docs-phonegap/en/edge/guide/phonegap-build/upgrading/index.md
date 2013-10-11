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

# Upgrading to PhoneGap 3.0

PhoneGap Build now uses PhoneGap 3.0 to build projects.  This guide
shows what you need to know to upgrade projects from the prior version
2.9.

Previously, core PhoneGap APIs (such as Camera and Notification) were
bundled by default with every release. They are now implemented as
self-contained plugins and must be explicitly declared.  For example,
an app that relies on the Contacts API needs to include the following
in the `config.xml` file:

        <gap:plugin name="Contacts" value="org.apache.cordova.core.ContactManager" />

See Application Plugins for more information on plugins, and Plugins
for PhoneGap Build for details relevant to remote builds.  See The
config.xml File for details on global configuration options, and
Configuring Remote Builds for options specific to PhoneGap Build.
