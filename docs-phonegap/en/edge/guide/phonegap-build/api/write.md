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

# The PhoneGap Build Write API

This section details write methods for version 1 of the API. See The
PhoneGap Build API for an overview, or The PhoneGap Build Read API for
read methods.

All write API methods expect JSON-encoded content. Many also accept
file uploads. API requests should have the content type
`multipart/form-data`, and bodies of JSON requests should be named
`data`.

The API's write interface includes the following:

* POST https://build.phonegap.com/api/v1/apps
* PUT https://build.phonegap.com/api/v1/apps/:id
* POST https://build.phonegap.com/api/v1/apps/:id/icon
* POST https://build.phonegap.com/api/v1/apps/:id/build
* POST https://build.phonegap.com/api/v1/apps/:id/build/:platform
* POST https://build.phonegap.com/api/v1/apps/:id/collaborators
* PUT https://build.phonegap.com/api/v1/apps/:id/collaborators/:id
* POST https://build.phonegap.com/api/v1/keys/:platform
* PUT https://build.phonegap.com/api/v1/keys/:platform/:id
* DELETE https://build.phonegap.com/api/v1/apps/:id
* DELETE https://build.phonegap.com/api/v1/apps/:id/collaborators/:id
* DELETE https://build.phonegap.com/api/v1/keys/:platform/:id

## POST https://build.phonegap.com/api/v1/apps

Creates a new app. Required parameters:

* __title__: You must specify a title for your app. Any title
  specified in your package's `config.xml` takes precedence.

* __create_method__: How the app is created (described below). There
  are two valid values:

  * __file__: A file is being uploaded with the app content

  * __remote_repo__: You have a remote repository with your app content

Optional parameters:

* __package__: Sets your app's package identifier. This can be
  modified after the app's creation, or in your `config.xml` file.
  Defaults to `com.phonegap.www`

* __version__: Sets your app's version number. This can also be
  modified after the app's creation, or in your `config.xml` file.
  Defaults to `0.0.1`

* __description__: Sets your app's description. This can also be
  modified after creation, or in your `config.xml` file. Defaults to
  empty text.

* __debug__: Builds your app in debug mode, as detailed in Remote
  Debugging Tools.  Defaults to `false`.

* __keys__: Set the signing keys to use for each platform you wish to
  sign. (See below for details.)

* __private__: Whether your app can be publicly downloaded. Defaults
  to `true` during beta period, and `false` once the beta period is
  complete.

* __phonegap_version__: Which version of PhoneGap your app uses. See
  the Configuration Reference for details on which are supported,
  and which one is currently the default.

* __hydrates__: Builds your app with hydration enabled, as described
  in Collaborating and Testing. Defaults to `false`.

### create_method

A new app can be created from an archive file or from a remote git
repository. You can choose which one of these to use by setting the
`create_method` parameter in your JSON data.

The create method is immutable. An app created from a repository can
never be changed to be file-backed, or vice versa. If you want to
change at some later date, delete the old app and create a new one.

### File-backed applications

To create a file-backed application, set the `create_method` parameter
to `file`, and include a zip file (`tar.gz`) or an `index.html` file
in the multipart body of your post, using `file` as a parameter name:

        $ curl -F file=@/Users/alunny/index.html -u andrew.lunny@nitobi.com -F 'data={"title":"API V1 App","package":"com.alunny.apiv1","version":"0.1.0","create_method":"file"}' https://build.phonegap.com/api/v1/apps
        {
            "keys":{
                "ios":{
                    "title":"ios-key",
                    "default":true,
                    "id":2,
                    "link":"/api/v1/keys/ios/2"
                 },
                 "blackberry":null,
                 "android":{
                    "title":"release-key",
                    "default":true,
                    "id":2,
                    "link":"/api/v1/keys/android/2"
                 }
            },
            "download":{},
            "title":"API V1 App",
            "repo":null,
            "collaborators":[
                {
                    "person":"andrew.lunny@nitobi.com",
                    "role":"admin"
                }
            ],
            "role":"admin",
            "id":26486,
            "icon":{
                "filename":null,
                "link":"/api/v1/apps/26486/icon"
            },
            "package":"com.alunny.apiv1",
            "version":"0.1.0",
            "description":null,
            "debug":false,
            "private":true,
            "link":"/api/v1/apps/26486",
            "status":{
                "webos":"pending",
                "ios":"pending",
                "blackberry":"pending",
                "android":"pending",
                "symbian":"pending",
                "winphone":"pending"
            },
            "error":{},
            "phonegap_version":"2.9.0",
            "hydrates":false,
            "build_count":null
        }

### Remote-repository backed applications

To create an app based on a remote repository, set the `create_method`
parameter to `remote_repo`, and include a `repo` parameter with the
repository's URL.

The URL has to be publicly accessible; PhoneGap Build does not
authenticate against your repository. If you wish to keep your code
private, use one of the other `create_method` options:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"API V1 App","repo":"https://github.com/alunny/phonegap-start.git","create_method":"remote_repo"}' https://build.phonegap.com/api/v1/apps
        {
            "keys":{
                "ios":{
                    "title":"ios-key",
                    "default":true,
                    "id":2,
                    "link":"/api/v1/keys/ios/2"
                 },
                 "blackberry":null,
                 "android":{
                    "title":"release-key",
                    "default":true,
                    "id":2,
                    "link":"/api/v1/keys/android/2"
                 }
            },
            "download":{},
            "title":"alunnys Amazing App",
            "repo":"https://github.com/alunny/phonegap-start.git",
            "collaborators":[
                {
                    "person":"andrew.lunny@nitobi.com",
                    "role":"admin"
                }
            ],
            "role":"admin",
            "id":26488,
            "icon":{
                "filename":"blurry",
                "link":"/api/v1/apps/26488/icon"
            },
            "package":null,
            "version":null,
            "description":null,
            "debug":false,
            "private":true,
            "link":"/api/v1/apps/26488,
            "status":{
                "webos":"pending",
                "ios":"pending",
                "blackberry":"pending",
                "android":"pending",
                "symbian":"pending"
            },
            "error":{},
            "phonegap_version":"2.9.0",
            "hydrates":false,
            "build_count":null
        }

If you provide a repository URL that requires authentication, the
response returns a `400` HTTP status code along with the error message
in the body of the response:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"API V1 App","repo":"https://alunny@github.com/alunny/phonegap-start.git","create_method":"remote_repo"}' https://build.phonegap.com/api/v1/apps
        {
            "error":"Private repository URLs not supported - try removing &quot;alunny@&quot;"
        }

### Signing keys

To sign your builds on PhoneGap Build, you must first upload one or
more keys, through the `POST https://build.phonegap.com/api/v1/keys`
method, or through the web interface. You can get a list of all the
keys associated with your account by sending a GET request to the
same URL.

In the `data` JSON hash that you send to the build server, you can
specify the keys, per platform, by id, that you wish to use for this
build.

The value for each platform can be the integer id, such as:

        "keys":{"ios":123}

or an object, containing the `password` field, or the `key_pw` and
`keystore_pw` fields for Android, such as:

        "keys":{"ios":{"id":123,"password":"password1"}

Using the second form allows you to unlock the given key, without
making a separate PUT request to
`https://build.phonegap.com/v1/keys/ios/123`

Here is a sample post, using the first form:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"Signing Keys","repo":"https://github.com/alunny/phonegap-start.git","create_method":"remote_repo","keys":{"ios":123,"android":567}}' https://build.phonegap.com/api/v1/apps
        {
            "keys":{
                "ios":{
                    "title":"new iOS key",
                    "default":false,
                    "id":123,
                    "link":"/api/v1/keys/ios/123"
                 },
                 "blackberry":null,
                 "android":{
                    "title":"some android key",
                    "default":false,
                    "id":567,
                    "link":"/api/v1/keys/android/567"
                 }
            },
            "download":{},
            "title":"Remote Application",
            "repo":"https://github.com/phonegap/phonegap-start.git",
            "collaborators":[
                {
                    "person":"andrew.lunny@nitobi.com",
                    "role":"admin"
                }
            ],
            "role":"admin",
            "id":36500,
            "icon":{
                "filename":"null",
                "link":"/api/v1/apps/36500/icon"
            },
            "package":null,
            "version":null,
            "description":null,
            "debug":false,
            "private":true,
            "link":"/api/v1/apps/36500,
            "status":{
                "webos":"pending",
                "ios":"pending",
                "blackberry":"pending",
                "android":"pending",
                "symbian":"pending",
                "winphone":"pending"
            },
            "error":{},
            "phonegap_version":"2.9.0",
            "hydrates":false,
            "build_count":null
        }

## PUT https://build.phonegap.com/api/v1/apps/:id

Update an existing app, either its contents, its metadata, or both.
The response is a JSON representation of the app, the same as for `GET
/api/v1/apps/:id`.

Updating the metadata involves sending a JSON object as the parameter
`data`. Available options in this JSON object are:

* __title__: the title of your application.

* __package__: the app's package identifier, such as
  `com.phonegap.www`.

* __version__: the app's version, such as `0.0.1`.

* __description__: the app's description.

* __debug__: whether to build your app in debug mode, as detailed in
  Remote Debugging Tools.

* __private__: whether the app has restricted visibility.

* __phonegap_version__: which release of PhoneGap your app uses.

Here is a simple example that update an app's version number:

        $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"version":"0.2.0"}' https://build.phonegap.com/api/v1/apps/8
        {
            "id":8,
            "version":"0.2.0",
            "keys":{
                "ios":null,
                "blackberry":null,
                "android":null
            },
            "repo":null,
            "download":{},
            "collaborators":[
                {
                    "person":"andrew.lunny@nitobi.com",
                    "role":"admin"
                }
            ],
            "title":"App From API",
            "role":"admin",
            "icon":{
                "filename":null,
                "link":"/api/v1/apps/8/icon"
            },
            "package":null,
            "link":"/api/v1/apps/8",
            "debug":false,
            "private":true,
            "description":null,
            "status":{
                "webos":"pending",
                "ios":null,
                "blackberry":"pending",
                "android":"pending",
                "symbian":"pending"
            },
            "error":{},
            "phonegap_version":"2.9.0",
            "hydrates":false,
            "build_count":12
        }

By default, the app is built for all supported platforms once the
metadata changes.

### Signing Keys

As with creating a new app, you can specify a signing key to use for
each platform that you wish to build for. You can also put a key's
credentials, which ensures the key is unlocked and ready to use.

This sample post selects a new Android key for an app, and unlocks it:

        $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"keys":{"android": {"id":457,"key_pw":"password1","keystore_pw":"password2"}}' https://build.phonegap.com/api/v1/apps/36500

        {
            "keys":{
                "ios":{
                    "title":"new iOS key",
                    "default":false,
                    "id":123,
                    "link":"/api/v1/keys/ios/123"
                 },
                 "blackberry":null,
                 "android":{
                    "title":"changed android key",
                    "default":false,
                    "id":457,
                    "link":"/api/v1/keys/android/457"
                 }
            },
            "download":{},
            "title":"Remote Application",
            "repo":"https://github.com/phonegap/phonegap-start.git",
            "collaborators":[
                {
                    "person":"andrew.lunny@nitobi.com",
                    "role":"admin"
                }
            ],
            "role":"admin",
            "id":36500,
            "icon":{
                "filename":"null",
                "link":"/api/v1/apps/36500/icon"
            },
            "package":null,
            "version":null,
            "description":null,
            "debug":false,
            "private":true,
            "link":"/api/v1/apps/36500,
            "status":{
                "webos":"pending",
                "ios":"pending",
                "blackberry":"pending",
                "android":"pending",
                "symbian":"pending",
                "winphone":"pending"
            },
            "error":{},
            "phonegap_version":"2.9.0",
            "hydrates":false,
            "build_count":null
        }

### Updating a file-based application

If the application has been created from a file upload, you can
include a new `index.html`, zip, or `tar.gz` file as the `file`
parameter in your request to update the contents:

        $ curl -u andrew.lunny@nitobi.com -X PUT -F file=@/Users/alunny/new/index.html https://build.phonegap.com/api/v1/apps/8

### Updating a repo-based application

To update an application from a remote repository, simply add the
`pull` field to your `data` hash, and set it to `true`:

        $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"pull":"true"}' https://build.phonegap.com/api/v1/apps/8

PhoneGap Build then tries to download the new code from your remote
repository, and rebuilds your app for all supported platforms.

## POST https://build.phonegap.com/api/v1/apps/:id/icon

Sets an icon file for a given app. Send a `png` file as your post's
`icon` parameter.

If you want different icons for different resolutions, you should
_not_ use this API method. Instead, include the different icon files
in your application package and specify their use in your `config.xml`
file, as detailed in the Configuration Reference.

The response has a `201` created status, and the application is queued
for building:

        $ curl -u andrew.lunny@nitobi.com -f icon=@icon.png https://build.phonegap.com/api/v1/apps/8/icon

## POST https://build.phonegap.com/api/v1/apps/:id/build

Queue new builds for a specified app. The older builds are discarded,
while new ones are queued.

The builds will use the most current app contents, as well as the
selected signing keys. The response have a `202` (accepted) status:

        $ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build

To choose which platforms to build, include them as a JSON encoded
parameter:

        $ curl -u andrew.lunny@nitobi.com -X POST -d 'data={"platforms":["android","webos"]}' https://build.phonegap.com/api/v1/apps/12/build

Once the builds are queued, you will want to watch the results of `GET
/api/v1/apps/:id` to check when each platform's status changes from
`pending` to either `complete` or `error`.

## POST https://build.phonegap.com/api/v1/apps/:id/build/:platform

A simpler URL to build for a single platform:

        $ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build/android

## POST https://build.phonegap.com/api/v1/apps/:id/collaborators

Add a collaborator to work with you on a given application. You must
be the app's owner/admin to do so.

Required parameters:

* __email__: The email address of your new collaborator.

* __role__: The new collaborator's level of access: either `tester`
  (read-only) or `dev` (read and write).

If the user is on the system, a `201` (created) HTTP status code
results, which lets you know that the user can now access your app. If
the user is not registered, a `202` (accepted) status results, and
the collaboration is listed as `pending`.

A JSON representation of the affected app returns after the
collaboration is added:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"email":"newguy@nitobi.com","role":"dev"}' https://build.phonegap.com/api/v1/apps/12/collaborators
        {
            "id":12,
            "title":"App With Collaborators",
            "collaborators":{
                "link":"/api/v1/apps/9/collaborators",
                "pending":[
                    {
                        "person":"newguy@nitobi.com",
                        "role":"developer"
                    },
                    {
                        "person":"nobody@nitobi.com",
                        "role":"tester"
                    }
                ],
                "active":[
                    {
                        "person":"admin@nitobi.com",
                        "role":"admin",
                        "id":9,
                        "link":"/api/v1/apps/9/collaborators/9"
                    },
                    {
                        "person":"foo@bar.com",
                        "role":"developer",
                        "id":13,
                        "link":"/api/v1/apps/9/collaborators/13"
                    }
                ]
            },
            "package":"app.with.collaborators",
            ...
        }

## PUT https://build.phonegap.com/api/v1/apps/:id/collaborators/:id

Allows you to change the role for a particular collaborator on
PhoneGap Build, either to `dev` or `tester`.

If you are not the owner of an app, a `401` unauthorized response
results. You cannot change the email of a collaborator; attempts to do
so return a `400` status:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"role":"tester"}' -X PUT https://build.phonegap.com/api/v1/apps/12/collaborators/13
        {
            "id":13,
            "person":"foo@bar.com",
            "role":"tester",
            "app":{
                "id":12,
                "download":{},
                "title":"My App",
                "role":"admin",
                "icon":{
                    "filename":null,
                    "link":"/api/v1/apps/12/icon"
                },
                "version":null,
                "package":null,
                "description":null,
                "debug":null,
                "link":"/api/v1/apps/12",
                "status":{
                  "ios":"pending",
                  "webos":"pending",
                  "blackberry":"pending",
                  "android":"pending",
                  "symbian":"pending",
                  "winphone":"pending"
                },
                "phonegap_version":"2.9.0",
                "hydrates":false,
                "build_count":null,
                "error":{}
            },
            "link":"/api/v1/apps/12/collaborators/13"
        }

## POST https://build.phonegap.com/api/v1/keys/:platform

Add a signing key to your PhoneGap Build account. The `platform`
parameter has to be specified in the URL, and different files are
required depending on the platform you're targeting.

### iOS Signing Keys

The following are required for iOS builds:

* a `p12` certificate file
* a `mobileprovision` file
* the password to access your certificate (optional)
* a title for your certificate-profile pair

Details on how to obtain these files are in our [iOS
Signing](/docs/ios-builds) documentation.

A sample post would look like this:

        $ curl -u andrew.lunny@nitobi.com -F cert=@My_Certificate.p12 -F profile=@MyDevices.mobileprovision -F 'data={"title":"Developer Cert","password":"12345678"}' https://build.phonegap.com/api/v1/keys/ios
         {
            "title":"Developer Cert",
            "default":false,
            "id":11,
            "link":"/api/v1/keys/ios/11",
            "provision":"meandmyteam.mobileprovision",
            "cert_name":"My_Certificate.p12",
            "role":"developer",
            "locked":false
         }

If you omit the `password` parameter, your key is _locked_ after the
upload completes. You won't be able to build with it until you unlock
the key.

### Android Keys

The following are required for Android builds:

* a `keystore` file
* the alias used for that keystore
* your keystore password (`keystore_pw`) (optional)
* your private key password (`key_pw`) (optional)
* a title for your key

Details on how to get your keystore file and the associated data are
available in our [Android Code Signing](/docs/android-signing)
documentation.

Here is a sample post:

        $ curl -u andrew.lunny@nitobi.com -F keystore=@android.keystore -F 'data={"title":"Android Key","alias":"release", "key_pw":"90123456","keystore_pw":"78901234"}' https://build.phonegap.com/api/v1/keys/android
        {
            "title":"Android Key",
            "default":false,
            "id":2,
            "alias":"release",
            "link":"/api/v1/keys/android/2",
            "locked":false
        }

If you omit one or both of the `key_pw` and `keystore_pw` parameters,
your key is _locked_ after the upload. You won't be able to build with
it until you unlock the key.

### BlackBerry Keys

The following are required for BlackBerry builds:

* a `sigtool.csk` file
* a `sigtool.db` file
* the password to your key (optional)
* a title for your key

How to obtain the `sigtool` files is outlined in our [BlackBerry
Keys](/docs/blackberry-keys) documentation.

Here is a sample post:

        $ curl -u andrew.lunny@nitobi.com -F db=@sigtool.db -F csk=@sigtool.csk -F 'data={"title":"My BB Key","password":"78901234"}' https://build.phonegap.com/api/v1/keys/blackberry
        {
            "title":"My BB Key",
            "default":false,
            "id":2,
            "link":"/api/v1/keys/blackberry/2",
            "locked":false
        }

If you omit the `password` parameter, your key is _locked_ after the
upload completes. You won't be able to build with it until you unlock
the key.

## PUT https://build.phonegap.com/api/v1/keys/:platform/:id

Updates an existing signing key on PhoneGap Build, used to unlock a
signing key so it can be used for future builds. To unlock a key, you
need to provide the appropriate credentials: a single password for iOS
or BlackBerry, or two passwords for Android, one for the key, and one
for the keystore.

__NOTE:__ PhoneGap Build _does not_ verify your key's password.  If
incorrect, an error results when you try to build with that key.

* iOS example:

         $ curl -u andrew.lunny@nitobi.com -d 'data={"password":"password1"}' -X PUT https://build.phonegap.com/api/v1/keys/ios/11
         {
            "title":"Developer Cert",
            "default":false,
            "id":11,
            "link":"/api/v1/keys/ios/11",
            "provision":"meandmyteam.mobileprovision",
            "cert_name":"My_Certificate.p12",
            "role":"developer",
            "locked":false
         }

* Android example:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"key_pw":"password1","keystore_pw":"password2"}' -X PUT https://build.phonegap.com/api/v1/keys/android/2
        {
            "title":"Android Key",
            "default":false,
            "id":2,
            "alias":"release",
            "link":"/api/v1/keys/android/2",
            "locked":false
        }

* BlackBerry example:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"password":"password1"}' -X PUT https://build.phonegap.com/api/v1/keys/blackberry/2
        {
            "title":"My BB Key",
            "default":false,
            "id":2,
            "link":"/api/v1/keys/blackberry/2",
            "locked":false
        }

## DELETE https://build.phonegap.com/api/v1/apps/:id

Delete your application from PhoneGap Build, returning either a
`202` (accepted) status, or `404` (if the app cannot be found):

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/apps/8
        {
            "success":"app 8 deleted"
        }

## DELETE https://build.phonegap.com/api/v1/apps/:id/collaborators/:id

Remove a collaborator from a project that you own:

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/apps/12/collaborators/13
        {
            "success":"foo@bar.com removed from app 9"
        }

## DELETE https://build.phonegap.com/api/v1/keys/:platform/:id

Delete a signing key from PhoneGap Build, returning either a `202`
(accepted) status, or `404` (if the key cannot be found):

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/keys/android/8
        {
            "success":"android key 8 deleted"
        }

