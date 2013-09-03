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

# The PhoneGap Build Read API

This section details read methods for version 1 of the API. See The
PhoneGap Build API for an overview, or The PhoneGap Build Write API
for write methods.

Please note that example responses are formatted for the sake of
legibility. Actual JSON responses will have no significant whitespace.

The API's read interface includes the following:

* GET https://build.phonegap.com/api/v1/me
* GET https://build.phonegap.com/api/v1/apps
* GET https://build.phonegap.com/api/v1/apps/:id
* GET https://build.phonegap.com/api/v1/apps/:id/icon
* GET https://build.phonegap.com/api/v1/apps/:id/:platform
* GET https://build.phonegap.com/api/v1/keys
* GET https://build.phonegap.com/api/v1/keys/:platform
* GET https://build.phonegap.com/api/v1/keys/:platform/:id

## GET https://build.phonegap.com/api/v1/me

Get a JSON-encoded representation of the authenticated user, as well
as a listing of associated resources.

This should be the starting point for applications that traverse the
PhoneGap Build API. It is aliased to
`https://build.phonegap.com/api/v1`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/me
        {
            "id": 1,
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com",
            "apps": {
                "id": 2,
                "link": "/api/v1/apps",
                "all": [
                    {
                        "title": "A Single App",
                        "role": "owner",
                        "link": "/api/v1/apps/1234"
                    }
                ]
            },
            "keys": {
                "ios": {
                    "all":[
                        {
                            "id": 34,
                            "default":true,
                            "title": "iOS Development Key",
                            "link": "/api/v1/keys/ios/34"
                        },
                        {
                            "id": 82,
                            "default":false,
                            "title": "iOS Distribution Key",
                            "link": "/api/v1/keys/ios/82"
                        }
                    ],
                    "link":"/api/v1/keys/ios"
                },
                "blackberry": {
                    "all":[
                        {
                            "id": 12,
                            "default":false,
                            "title": "My BlackBerry Key",
                            "link": "/api/v1/keys/blackberry/12"
                        }
                    ],
                    "link":"/api/v1/keys/blackberry"
                },
                "android": {
                    "all":[
                        {
                            "id": 56,
                            "default":false,
                            "title": "Android Release Certificate",
                            "link": "/api/v1/keys/android/56"
                        }
                    ],
                    "link":"/api/v1/keys/android"
                },
                "link": "/api/v1/keys"
            },
            "link": "/api/v1/me"
        }

## GET https://build.phonegap.com/api/v1/apps

Get a JSON-encoded representation of the authenticated user's apps.

API clients can follow the `link` attribute for each app to get
further details, including the associated signing keys and
collaborators:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps
        {
            "apps":[
                {
                    "title":"My Index",
                    "id":1,
                    "package":"com.my.index",
                    "version":"0.0.1",
                    "repo":null,
                    "description":"An Index of My Applications",
                    "debug":false,
                    "private":true,
                    "link":"/api/v1/apps/1",
                    "build_count":4,
                    "phonegap_version":"2.9.0",
                    "hydrates":false,
                    "status":{
                        "android":"complete",
                        "blackberry":"error",
                        "ios":null,
                        "symbian":"complete",
                        "webos":"pending",
                        "winphone":"pending"
                    },
                    "download":{
                        "android":"/api/v1/apps/1/android",
                        "symbian":"/api/v1/apps/1/symbian"
                    },
                    "error":{
                        "blackberry":"invalid widget archive"
                    },
                    "icon":{
                        "filename":"icon.png",
                        "link":"/api/v1/apps/1/icon"
                    },
                    "role":"admin"
                },
                {
                    "title":"PhoneGap: Getting Started",
                    "id":2,
                    "package":"com.phonegap.getting.started",
                    "version":"1.0.0",
                    "repo":"https://github.com/phonegap/phonegap-start.git",
                    "description":"A template for getting started with
                            PhoneGap development and build.phonegap.com",
                    "debug":false,
                    "private":true,
                    "link":"/api/v1/apps/2",
                    "build_count":12,
                    "status": {
                        "android":"complete",
                        "blackberry":"complete",
                        "ios":"complete",
                        "symbian":"complete",
                        "webos":"complete",
                        "winphone":"complete"
                    },
                    "download":{
                        "android":"/api/v1/apps/1/android",
                        "blackberry":"/api/v1/apps/1/blackberry",
                        "ios":"/api/v1/apps/1/ios",
                        "symbian":"/api/v1/apps/1/symbian",
                        "webos":"/api/v1/apps/1/webos",
                        "winphone":"/api/v1/apps/1/winphone"
                    },
                    "error":{},
                    "icon":{
                        "filename":"big-icon.png",
                        "link":"/api/v1/apps/2/icon"
                    },
                    "role":"admin"
                }
            ],
            "link":"/api/v1/apps"
        }

## GET https://build.phonegap.com/api/v1/apps/:id

Get a JSON-encoded representation of a particular app, if the
authenticated user has permission to access it.

In addition to the fields provided in the list of all apps, this
detail view includes:

* `keys`: all of the keys that the app is currently being built
  with. This include the owner's default key for a platform, if
  selected

* `collaborators`: each person who has access to this app, along with
  their role, if the authenticated user is the owner of the app.
  Collaborators who are registered with PhoneGap Build are listed
  under `active`; collaborators you have invited who have not yet
  created an account are listed as `pending`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/2
        {
            "title":"PhoneGap: Getting Started",
            "id":2,
            "package":"com.phonegap.getting.started",
            "version":"1.0.0",
            "repo":"https://github.com/phonegap/phonegap-start.git",
            "description":"A template for getting started with
                    PhoneGap development and build.phonegap.com",
            "debug":false,
            "private":true,
            "link":"/api/v1/apps/2",
            "build_count":12,
            "status": {
                "android":"complete",
                "blackberry":"complete",
                "ios":"complete",
                "symbian":"complete",
                "webos":"complete",
                "winphone":"complete"
            },
            "download":{
                "android":"/api/v1/apps/1/android",
                "blackberry":"/api/v1/apps/1/blackberry",
                "ios":"/api/v1/apps/1/ios",
                "symbian":"/api/v1/apps/1/symbian",
                "webos":"/api/v1/apps/1/webos",
                "winphone":"/api/v1/apps/1/winphone"
            },
            "error":{},
            "icon":{
                "filename":"big-icon.png",
                "link":"/api/v1/apps/2/icon"
            },
            "role":"admin",
            "keys":{},
            "collaborators":{
                "link":"/api/v1/apps/9/collaborators",
                "active":[
                    {
                        "id":9,
                        "person":"andrew.lunny@nitobi.com",
                        "role":"admin",
                        "link":"/api/v1/apps/9/collaborators/9"
                    },
                    {
                        "id":13,
                        "person":"foo@bar.com",
                        "role":"developer",
                        "link":"/api/v1/apps/9/collaborators/13"
                    }
                ],
                "pending":[
                    {
                        "person":"nobody@nitobi.com",
                        "role":"tester"
                    }
                ]
            }
        }

If the app does not exist, or you do not have access to it, an error
message returns with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/520394
        {
            "error":"app #54 not available"
        }

## GET https://build.phonegap.com/api/v1/apps/:id/icon

Get the main icon associated with an app, either the biggest icon
specified in your `config.xml` file, or an icon you have uploaded
through the API or the PhoneGap Build web interface.

If successful, this API call returns a `302` redirect to the icon
file, and the body of the response references the URL for the file:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/2/icon
        {
            "location":""http://s3.amazonaws.com/build.phonegap.com/some-long-guid/icon.png"
        }

If your API client can follow redirects, you can save the response as
a `png` file. This example uses curl's `-L` option:

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/2/icon > ~/my-icon.png

If no icon ais vailable, an error message returns with status code
404:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/icon

        {
            "error":"No icon available for app #52"
        }

## GET https://build.phonegap.com/api/v1/apps/:id/:platform

Download the app package for the given platform. Available platforms
are `android`, `blackberry`, `ios`, `symbian`, `webos` and `winphone`.

If successful, this API method returns a `302` redirect to the
application binary, and the body of the response references the file's
URL:

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/50/android
        {
            "location":""http://s3.amazonaws.com/build.phonegap.com/some-long-guid/app.apk"
        }

If your API client can follow redirects, you can save the response
directly:

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/50/android > app_50.apk

When downloading, be sure you have the right file extension:

* `apk` for Android
* `ipa` for iOS
* `ipk` for webOS
* `jad` for unsigned BlackBerry builds; `zip` if you've uploaded your BlackBerry signing keys
* `wgz` for Symbian
* `xap` for Windows Phone

If the app package is unavailable for the specified platform, an error
message returns with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/52/android
        {
            "error":"app #52 download unavailable for android"
        }

## GET https://build.phonegap.com/api/v1/keys

Get a JSON-encoded list of all the signing keys associated with your
account.

This returns a short listing of all the associated keys, very similar
to the list you see when requesting `/api/v1/me`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys
        {
            "keys":{
                "ios":{
                    "all":[
                        {
                            "id":8,
                            "title":"My Dev Certificate",
                            "default":false,
                            "cert_name":"My_Dev_Cert.p12",
                            "provision":"My_Devices.mobileprovision",
                            "link":"/api/v1/keys/ios/8",
                            "role":"developer",
                            "locked":true
                        }
                    ],
                    "link":"/api/v1/keys/ios"
                },
                "blackberry":{
                    "all":[
                        {
                            "id":6,
                            "title":"I make bb apps too",
                            "default":false,
                            "link":"/api/v1/keys/blackberry/1",
                            "locked":true
                        }
                    ],
                    "link":"/api/v1/keys/blackberry"
                },
                "android":{
                    "all":[
                        {
                            "id":1,
                            "title":"Android Release Key",
                            "default":false,
                            "alias":"release",
                            "link":"/api/v1/keys/android/1",
                            "locked":true
                        }
                    ],
                    "link":"/api/v1/keys/android"
                }
            },
            "link":"/api/v1/keys"
        }

## GET https://build.phonegap.com/api/v1/keys/:platform

Get a JSON-encoded list of all the signing keys associated with your
account, for a specific platform. That platform can be one of `ios`,
`android`, or `blackberry`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/ios
        {
            "keys":[
                {
                    "id":8,
                    "title":"My Dev Certificate",
                    "default":false,
                    "cert_name":"My_Dev_Cert.p12",
                    "provision":"My_Devices.mobileprovision"
                    "link":"/api/v1/keys/ios/8",
                    "role":"developer",
                    "locked":true
                }
            ],
            "link":"/api/v1/keys/ios"
        }

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/android
        {
            "keys":[
                {
                    "id":1,
                    "title":"Android Release Key",
                    "default":false,
                    "alias":"releasing",
                    "link":"/api/v1/keys/android/1",
                    "locked":true
                }
            ],
            "link":"/api/v1/keys/android"
        }

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/blackberry
        {
            "keys":[
                {
                    "id":1,
                    "title":"I make bb apps too",
                    "default":false,
                    "link":"/api/v1/keys/blackberry/1",
                    "locked":true
                }
            ],
            "link":"/api/v1/keys/blackberry"
        }

## GET https://build.phonegap.com/api/v1/keys/:platform/:id

Get a JSON-encoded representation of a single signing key:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/ios/8
        {
            "id":8,
            "title":"My Dev Certificate",
            "default":false,
            "cert_name":"My_Dev_Cert.p12",
            "provision":"My_Devices.mobileprovision"
            "link":"/api/v1/keys/ios/8",
            "role":"developer",
            "locked":true
        }

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/android/1
        {
            "id":1,
            "title":"Android Release Key",
            "default":false,
            "alias":"releasing",
            "link":"/api/v1/keys/android/1",
            "locked":true
        }

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/blackberry/1
        {
            "id":1,
            "title":"I make bb apps too",
            "default":false,
            "link":"/api/v1/keys/blackberry/1",
            "locked":true
        }

If the requested key is not available, then a `404` status returns,
along with the error message as JSON:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/ios/8989898
        {
            "error":"could not find ios key #8989898"
        }
