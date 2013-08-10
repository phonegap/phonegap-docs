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

# The PhoneGap Build API

<!--

 # API v1 Overview

The Adobe® PhoneGap™ Build API allows programmatic access to creating,
building, updating and downloading PhoneGap apps, using the PhoneGap
Build web service. It is designed for easy integration into IDEs,
shell scripts, app builders, and anywhere else.

This document covers version 1 of the API. If you the older release of
the API, please see [the version 0
documentation](/docs/api_version_0).

 ## API Documentation

* [Read API](/docs/read_api)
* [Write API](/docs/write_api)

 ## Authentication

Version 1 supports two forms of authentication: basic authentication
over HTTPS, or token authentication.

When using basic authentication, use your PhoneGap Build credentials
(username and password) to authenticate each request, in this way:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/me
        {
            "created_at":"2010-10-12T19:10:16Z",
            "updated_at":"2010-11-29T19:58:00Z",
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com"
        }

To use token authentication, use basic auth to post to `/token` with
your token request. You will receive a token as a response.

        $ curl -u andrew.lunny@nitobi.com -X POST -d "" https://build.phonegap.com/token</pre></strong>
        {
            "token":"ASTRINGTOKEN"
        }

You can then pass this token as a parameter for any call that you
make:

        $ curl https://build.phonegap.com/api/v1/me?auth_token=ASTRINGTOKEN
        {
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com"
        }

Both forms of authentication are supported. All unauthenticated
requests return a `401` (unauthorized) status code.

In all of the examples below, token authentication is used for
clarity.

<strong>Github users</strong>

Users who registered using Github authentication may not have PhoneGap
Build credentials, and therefore may not be able to use basic
authentication. To retrieve an authententication token for your
Github-linked account, go to Edit Account (top right in the site
navigation bar). Find the authentication tokens section, and there you
can obtain, as well as create, reset, or delete your token. Note that
resetting or deleting a token will invalidate any further requests
using the previous token.

 ## JSON

All successful requests return either a JSON-encoded string or a
binary file. All failing requests return a JSON-encoded string of the
following form (with an appropriate status code):

        {
            "error":"some error message"
        }

When using the API, check the status code returned; if it's not 200,
check the error field on the parsed response, a la:

        if (res.status != 200)
            console.log(JSON.parse(res.body).error)

As is standard in HTTP, a 4xx status indicates an error with the
request, while a 5xx status indicates an error on our servers. Please
check [our support forums](http://community.phonegap.com) if you get a
500 error, or if you receive an unexpected 400 error.

 ## JSONP

JSONP access is available for PhoneGap Build developers: just add a
`callback` parameter to your requests, and the JSONP response body
will be wrapped in that function:

        $ curl https://build.phonegap.com/api/v1/me?auth_token=ASTRINGTOKEN&callback=exec
        exec({
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com"
        })

This allows you to access the PhoneGap Build API through regular old
`<script>` tags. [More information about
JSONP](http://en.wikipedia.org/wiki/JSONP).

 ## HATEOAS

The PhoneGap Build API v1 tries to use __Hypermedia as the Engine of
Application State ([HATEOAS](http://en.wikipedia.org/wiki/HATEOAS))__
as much as possible. For an application developer, this should mean
that you can hit the source of the api - `/api/v1` - and then follow
the `link` attributes of the nested resources to navigate the
application, without having knowledge of the other routes within your
application.

The home resource for the API v1 is the same as the `/me` resource - a
representation of the current user.

 # API v0

 ## Version 0

Version 0 (v0) of the API is a preview release for the beta version of
PhoneGap Build. Although we are keeping this release online for
existing clients, it will not receive any further updates. If you are
developing a new application to access PhoneGap Build, use [the latest
version of the API (currently v1)](/docs/api).

 ### Authentication

v0 currently authenticates through HTTPS with basic authentication. We
are investigating other authentication options, particularly for
allowing users to authorize apps/dev tools with their PhoneGap Build
credentials (the present author favors OAuth 2).

All unauthenticated requests return a `401` (unauthorized) status
code.

 ## JSON

All successful requests return either a JSON-encoded string or a
binary file. All failing requests return a JSON-encoded string of the
following form (with an appropriate status code):

        {"error":"some error message"}

When using the API, check the status code returned; if it's not 200,
check the error field on the parsed response, a la:

        if (res.status != 200)
            console.log(JSON.parse(res.body).error)

 # API Docs

 ## Read API

 ### GET https://build.phonegap.com/api/v0/me

Get a JSON-encoded representation of the authenticated user.

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/me
        {"created_at":"2010-10-12T19:10:16Z","updated_at":"2010-11-29T19:58:00Z",
          "username":"alunny","email":"andrew.lunny@nitobi.com"}

 ### GET https://build.phonegap.com/api/v0/apps

Get a JSON-encoded representation of the authenticated user's apps.

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps
        [{"created_at":"2010-11-09T20:36:58Z","title":"alunny's Amazing App",
          "updated_at":"2010-11-23T22:53:12Z","symbian_status":"symbian complete",
          "repo_url":"http://github.com/alunny/phonegap-start.git",
          "blackberry_status":"blackberry pending","android_status":"complete",
          "webos_status":"compiling webos project","id":50,"icon":"icon.png",
          "version":99.999,"package":"com.alunny.amazing","person_id":1,
          "desc":"An Amazing app by alunny"},
          {"created_at":"2010-11-23T00:16:04Z","title":"New Title",
          "updated_at":"2010-11-26T21:11:55Z","symbian_status":"symbian complete",
          "repo_url":null,"blackberry_status":"pending","android_status":"pending",
          "webos_status":"webos complete","id":52,"icon":null,"version":null,
          "package":null,"person_id":1,"desc":null},
          {"created_at":"2010-11-27T00:39:57Z","title":"Docco App",
          "updated_at":"2010-11-27T00:39:59Z","symbian_status":"symbian complete",
          "repo_url":null,"blackberry_status":"pending","android_status":"error",
          "webos_status":"webos complete","id":53,"icon":null,"version":null,
          "package":null,"person_id":1,"desc":null}]

 ### GET https://build.phonegap.com/api/v0/apps/:id

Get a JSON-encoded representation of a single app (belonging to the
authenticated user).

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50
        {"created_at":"2010-11-09T20:36:58Z","title":"alunny's Amazing App",
         "updated_at":"2010-11-23T22:53:12Z","symbian_status":"symbian complete",
         "repo_url":"http://github.com/alunny/phonegap-start.git",
         "blackberry_status":"blackberry pending","android_status":"error",
         "webos_status":"compiling webos project","id":50,"icon":"icon.png",
         "version":99.999,"package":"com.alunny.amazing","person_id":1,
         "desc":"An Amazing app by alunny"}

If the app does not exist or belongs to another user, an error message
is returned with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/54
        {"error":"app #54 not available"}

 ### GET https://build.phonegap.com/api/v0/apps/:id/:icon

Get the icon file of an app.

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50/icon &gt; icon.png

If there's no icon available, an error message is returned with status
code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/icon
        {"error":"No icon available for app #52"}

 ### GET https://build.phonegap.com/api/v0/apps/:id/:platform

Download the app package for the given platform; available platforms
right now are `android`, `blackberry`, `symbian` and `webos`.

The request actually returns a redirect to the app package
itself--ensure your API client follows redirects to download the app.

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50/android &gt; app_50.apk

If the app package (for the specified platform) is unavailable, an
error message is returned with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/android
        {"error":"App #52 for android error"}

 ### GET https://build.phonegap.com/api/v0/keys/

Get a list of signing keys that have been uploaded to build

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/keys/
        {"ios":[{"title":"Test Key","updated_at":"2011-07-07T15:51:23-07:00",
        "id":2,"mobile_provision":"test.mobileprovision",
        "cert_name":"Certificates.p12"}],"blackberry":[],"android":[]}

If no keys have been uploaded the following will be returned

        {"ios":[],"blackberry":[],"android":[]}

To get a specific platform's keys use

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/keys/:platform

If the app does not exist or belongs to another user, an error message
is returned with status code `404`:

 ## Write API

 ### POST https://build.phonegap.com/api/v0/apps

Create a new app. Requires a title parameter to be passed, and either
the URL of a public git/svn repository, or an `index.html` or project
zip file to be sent.

With a repo_url:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"New App","repo":"http://github.com/alunny/phonegap-start.git"}' \
  https://build.phonegap.com/api/v0/apps
        {"created_at":"2010-11-29T21:13:26Z","title":"alunny's Amazing App",
        "updated_at":"2010-11-29T21:13:26Z","symbian_status":"pending",
        "repo_url":"http://github.com/alunny/phonegap-start.git",
        "blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":55,"icon":"icon.png","version":"99.999",
        "package":"com.alunny.amazing","person_id":1,
        "desc":"An Amazing app by alunny"}

With a file (note that if you're using curl, you'll want the `-F`
option, not `-d`):

        $ curl -F file=@index.html -F 'data={"title":"Another App"}' -u andrew.lunny@nitobi.com \
  https://build.phonegap.com/api/v0/apps
        {"created_at":"2010-11-29T21:52:32Z","title":"Another App",
        "updated_at":"2010-11-29T21:52:32Z","symbian_status":"pending",
        "repo_url":null,"blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":56,"icon":null,"version":null,
        "package":null,"person_id":1,"desc":null}

Again, JSON errors if anything goes wrong:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"New App"}' https://build.phonegap.com/api/v0/apps
        {"error":"Need either a repo url or a file"}

An error with the request returns status code `400` (bad request) -
the JSON string details what changes have to be made. If status code
`500` is returned, an internal error has occurred - please contact us
about this request.

 ### POST https://build.phonegap.com/api/v0/apps/:id/:icon

Set an icon file for the given app:

        $ curl -F file=@icon.png -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/56/icon
        {"created_at":"2010-11-29T21:52:32Z","title":"Another App",
        "updated_at":"2010-11-29T22:24:26Z","symbian_status":"symbian complete",
        "repo_url":null,"blackberry_status":"pending","android_status":"pending",
        "webos_status":"webos complete","id":56,"icon":"icon.png",
        "version":null,"package":null,"person_id":1,"desc":null}

A JSON error with status code `400` is returned if there is an error
in the request.

 ### POST https://build.phonegap.com/api/v0/apps/:id/push

Update the current app from its source repo - designed, among other
things, to work with [Github's post-receive
hooks](http://help.github.com/post-receive-hooks/)
functionality. Right now, the post data is ignored - I'm including
some dummy data so curl agrees to set a Content-Length header.

        $ curl -X POST -d data=dummy -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/55/push
        {"created_at":"2010-11-29T21:13:26Z","title":"alunny's Amazing App",
        "updated_at":"2010-11-29T22:28:33Z","symbian_status":"pending",
        "repo_url":"http://github.com/alunny/phonegap-start.git",
        "blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":55,"icon":"icon.png","version":99.999,
        "package":"com.alunny.amazing","person_id":1,
        "desc":"An Amazing app by alunny"}

If the app is not associated with a repository, status code `400` is
returned. If the app cannot be found, status code `404` is
returned. If there is an internal error, `500` is returned:

        $ curl -X POST -d data=dummy -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/56/push
        {"error":"app #56 is not repo backed"}

 ### PUT https://build.phonegap.com/api/v0/apps/:id

Update the meta-data associated with your app:

        $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"title":"New Title"}' \
  https://build.phonegap.com/api/v0/apps/56
        {"created_at":"2010-11-29T21:52:32Z","title":"New Title",
        "updated_at":"2010-11-29T22:37:44Z","symbian_status":"pending",
        "repo_url":null,"blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":56,"icon":"icon.png","version":null,
        "package":null,"person_id":1,"desc":null}

Status code `400` is returned if the post data cannot be parsed.

 ### POST https://build.phonegap.com/api/v0/keys/:platform

Upload a key for application signing

 #### IOS Example

The password field is optional if the key requires one.

The following example:

        $ curl -F profile_file=@example.mobileprovision -F cert_file=@example.p12 -F 'data={"title":"Example Key", "password":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/ios/</pre></strong>

Will produce a response similar to:

        {"title":"Example Key","updated_at":"2011-07-08T10:27:01-07:00",
        "id":3,"cert_name":"example.p12","mobile_provision":"example.mobileprovision"}

 #### Android Example

The following example:

        $ curl -F key_file=@example.keystore -F 'data={"title":"Example Key","alias":"example alias", "key_pw":"test", "keystore_pw":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/android/</pre></strong>

Will produce a response similar to:

        {"title":"Example Key","updated_at":"2011-07-08T14:07:09-07:00","id":1}

 #### Blackberry Example

The following example:

        curl -F csk_file=@example.csk -F db_'data={"title":"example key", "password":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/blackberry/</pre></strong>

Will produce a response similar to:

        {"title":"example key","updated_at":"2011-07-08T10:48:18-07:00","id":1}

If the app does not exist or belongs to another user, an error message
is returned with status code `404`:

 ### DELETE https://build.phonegap.com/api/v0/apps/:id

Delete the app. Sad to see you go :(

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v0/apps/56
        {"success":"app #56 destroyed"}

Again, `404` error if the app cannot be found.

 # Read API V1

This document is part of the Adobe® PhoneGap™ Build API V1
documentation; see also:

* [API Overview](/docs/api)
* [Write API](/docs/write_api)

Please note that example responses have been formatted for increased
legibility; actual JSON responses will not have significant
whitespace.

 ### GET https://build.phonegap.com/api/v1/me

Get a JSON-encoded representation of the authenticated user, as well
as a listing of associated resources.

This should be the starting point for applications traversing the
PhoneGap Build API. It is aliased to
`https://build.phonegap.com/api/v1`.

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

 ### GET https://build.phonegap.com/api/v1/apps

Get a JSON-encoded representation of the authenticated user's apps.

API clients can follow the `link` attribute for each app to get
further details, including the associated signing keys and
collaborators.

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

 ### GET https://build.phonegap.com/api/v1/apps/:id

Get a JSON-encoded representation of a particular app, if the
authenticated user has permission to access it.

In addition to the fields provided in the list of all apps, this detail view includes:

* `keys`: all of the keys that the app is currently being built
  with. This will include the owner's default key for a platform, if
  selected

* `collaborators`: each person who has access to this app, along with
  their role, if the authenticated user is the owner of the
  app. Collaborators who are registered with PhoneGap Build are listed
  under `active`; collaborators you have invited who have not yet
  created an account are listed as `pending`.

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
message is returned with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/520394
        {
            "error":"app #54 not available"
        }

 ### GET https://build.phonegap.com/api/v1/apps/:id/icon

Get the main icon associated with an app - this is either the biggest
icon specified in your `config.xml` file, or an icon you have uploaded
through the API or the PhoneGap Build web interface.

In the successful case, this API method will return a 302 redirect to
the icon file - the actual body of the response will point to the
resource in question:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/2/icon
        {
            "location":""http://s3.amazonaws.com/build.phonegap.com/some-long-guid/icon.png"
        }

If your api client can follow redirects, you can save the response as
a `png` file (with curl, this is done through the `-L` option).

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/2/icon > ~/my-icon.png

If there's no icon available, an error message is returned with status
code 404:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/icon

        {
            "error":"No icon available for app #52"
        }

 ### GET https://build.phonegap.com/api/v1/apps/:id/:platform

Download the app package for the given platform; available platforms
are `android`, `blackberry`, `ios`, `symbian`, `webos` and `winphone`.

In the successful case, this API method will return a 302 redirect to
the application binary - the actual body of the response will point to
the resource's correct location:

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/50/android
        {
            "location":""http://s3.amazonaws.com/build.phonegap.com/some-long-guid/app.apk"
        }

If your api client can follow redirects, you can save the response
directly:

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/50/android > app_50.apk

If you are downloading directly, be sure you have the right extension
for the file you're downloading:

* `apk` for Android
* `ipa` for iOS
* `ipk` for webOS
* `jad` for unsigned BlackBerry builds; `zip` if you've uploaded your BlackBerry signing keys
* `wgz` for Symbian
* `xap` for Windows Phone

If the app package (for the specified platform) is unavailable, an
error message is returned with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/52/android
        {
            "error":"app #52 download unavailable for android"
        }

 ### GET https://build.phonegap.com/api/v1/keys

Get a JSON-encoded list of all the signing keys associated with your
account.

This returns a short listing of all the associated keys--it's very
similar to the list you'll see when requesting `/api/v1/me`

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

 ### GET https://build.phonegap.com/api/v1/keys/:platform

Get a JSON-encoded list of all the signing keys associated with your
account, for a specific platform. That platform can be one of `ios`,
`android`, or `blackberry`.

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

 ### GET https://build.phonegap.com/api/v1/keys/:platform/:id

Get a JSON-encoded representation of a single signing key.

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

If the requested key is not available, then a 404 status is returned,
along with the error message as JSON:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/ios/8989898
        {
            "error":"could not find ios key #8989898"
        }

 # Write API V1

This document is part of the Adobe® PhoneGap™ Build API V1
documentation; see also:

* [API Overview](/docs/api)
* [Read API](/docs/read_api)

All write APIs expect JSON-encoded content. Many also accept file
uploads. Because of this, we expect API requests to have the content
type `multipart/form-data`, and JSON bodies of requests are expected
to have the name `data`. We're looking for a more elegant way of
dealing with this in a future release.

 ### POST https://build.phonegap.com/api/v1/apps

Create a new app.

 #### Required parameters

* __title__: You must specify a title for your app - if a title is
  also specified in a `config.xml` in your package, the one in the
  `config.xml` file will take preference.

* __create_method__: How the app is created (described below). There
  are two valid values:

  * __file__: A file is being uploaded with the app content

  * __remote_repo__: You have a remote repository with your app
        content

 #### Optional parameters

* __package__: Sets the package identifier for your app. This can also
  be done after creation, or in your `config.xml` file. Defaults to
  `com.phonegap.www`

* __version__: Sets the version of your app. This can also be done
  after creation, or in your `config.xml` file. Defaults to `0.0.1`

* __description__: Sets the description for your app. This can also be
  done after creation, or in your `config.xml` file. Defaults to
  empty.

* __debug__: Builds your app in [debug
  mode](/docs/phonegap-debug). Defaults to false.

* __keys__: Set the signing keys to use for each platform you wish to
  sign. See below for more details

* __private__: Whether your app can be publicly downloaded. Defaults
  to `true` during beta period; will default to `false` once the beta
  period is complete

* __phonegap_version__: Which version of PhoneGap your app uses. See
  [config.xml](/docs/config-xml) for details on which are supported,
  and which one is currently the default

* __hydrates__: Builds your app with [hydration](/docs/hydration)
  enabled. Defaults to false.

 #### create_method

A new app can be created from an archive file or a remote git
repository. You can choose which one of these to use by setting the
`create_method` parameter in your JSON data.

The create method is immutable - an app that is created from a
repository can never be changed to be file-backed, or vice versa. If
you want to change at some later date, delete the old app and create a
new one.

 #### File-backed applications

To create a file-backed application, set the `create_method` parameter
to `file`, and include a zip file, a tar.gz file, or an index.html
file in the multipart body of your post, with the parameter name
`file`.

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

 #### Remote-repository backed applications

To create an app based on a remote repo, set the `create_method`
parameter to `remote_repo`, and include a `repo` parameter with the
URL of the repository.

The URL has to be publicly accessible: PhoneGap Build will not
authenticate against your repository. If you wish to keep your code
private, use one of the other `create_method` options.

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
response will have a `400` HTTP status code and the error message in
the body of the response:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"API V1 App","repo":"https://alunny@github.com/alunny/phonegap-start.git","create_method":"remote_repo"}' https://build.phonegap.com/api/v1/apps
        {
            "error":"Private repository URLs not supported - try removing &quot;alunny@&quot;"
        }

 #### Signing keys

To sign your builds on PhoneGap Build, you must first upload one or
more keys, through the `POST https://build.phonegap.com/api/v1/keys`
method, or through the web interface. You can get a list of all the
keys associated with your account by sending a GET request to that
same URL.

In the `data` JSON hash that you send to the build server, you can
specify the keys, per platform, by id, that you wish to use for this
build.

The value for each platform can be the integer id, such as:

        "keys":{"ios":123}

Or an object, containing the `password` field (or for Android, the
`key_pw` and `keystore_pw` fields), such as:

        "keys":{"ios":{"id":123,"password":"password1"}

Using the second form allows you to unlock the given key, without
making a separate PUT request to
`https://build.phonegap.com/v1/keys/ios/123`

Here is a sample post (using the first form):

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

 ### PUT https://build.phonegap.com/api/v1/apps/:id

Update an existing app - the contents of the app, the app's metadata,
or both. The response will be a JSON representation of the app - the
same as the `GET /api/v1/apps/:id` request.

Updating the metadata involves sending a JSON object as the parameter
`data`. Available options in this JSON object are:

* __title__: the title of your application

* __package__: the app's package identifier (such as `com.phonegap.www`)

* __version__: the app's version (such as `0.0.1`)

* __description__: the app's description

* __debug__: whether your app will be built in [debug mode](/docs/phonegap-debug)

* __private__: whether the app has restricted visibility or not

* __phonegap_version__: which release of PhoneGap your app uses

Here is a simple example: updating an app's version:

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

By default, the app will be built for all supported platforms once the
metadata has been changed.

 #### Signing Keys

As with creating a new app, you can specify a signing key to use for
each platform that you wish to build for. You can also put the
credentials for a key, which will ensure the key is unlocked and ready
to use.

Here is a sample post selecting a new Android key for an app and
unlocking it:

        $ curl -u andrew.lunny@nitobi.com -X PUT
        -d 'data={"keys":{"android":
        {"id":457,"key_pw":"password1","keystore_pw":"password2"}}'
        https://build.phonegap.com/api/v1/apps/36500
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

 #### Updating a file-based application

If the application has been created from a file upload, you can
include a new `index.html`, zip file, or tar.gz file as the `file`
parameter in your request to update the contents.

        $ curl -u andrew.lunny@nitobi.com -X PUT -F file=@/Users/alunny/new/index.html https://build.phonegap.com/api/v1/apps/8

 #### Updating a repo-based application

To update an application from a remote repository, simply add the
`pull` field to your `data` hash, and set it to `true`:

        $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"pull":"true"}' https://build.phonegap.com/api/v1/apps/8

PhoneGap Build will then attempt to download the new code from your
remote repository, and rebuild your app for all supported platforms.

 ### POST https://build.phonegap.com/api/v1/apps/:id/icon

Sets an icon file for a given app. Send a `png` file as the `icon`
parameter in your post.

If you want to have multiple icons for different resolutions, you
should _not_ use this API method. Instead, include the different icon
files in your application package and specify their use in your
[config.xml file](/docs/config-xml).

The response will have a `201` created status, and the application
will be queued for building.

        $ curl -u andrew.lunny@nitobi.com -f icon=@icon.png https://build.phonegap.com/api/v1/apps/8/icon

 ### POST https://build.phonegap.com/api/v1/apps/:id/build

Queue new builds for a specified app. The older builds will be
discarded, while new ones are queued.

The builds will use the most current app contents, as well as the
selected signing keys. The response will have a `202` (accepted)
status.

        $ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build

To choose which platforms to build, include those as a JSON encoded
parameter in your post:

        $ curl -u andrew.lunny@nitobi.com -X POST -d 'data={"platforms":["android","webos"]}' https://build.phonegap.com/api/v1/apps/12/build

Once the builds are queued, you will want to watch the results of `GET
/api/v1/apps/:id` to see when each platform's status changes from
`pending` (to `complete` or `error`).

 ### POST https://build.phonegap.com/api/v1/apps/:id/build/:platform

A simpler URL for the case of building a single platform:

        $ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build/android

 ### POST https://build.phonegap.com/api/v1/apps/:id/collaborators

Add a collaborator to work with you on a given application. You must
be the owner/admin of the app to do this.

 #### Required parameters

* __email__: The email address of your new collaborator

* __role__: What level of access the new collaborator will have -
  either `tester` (read-only access) or `dev` (read and write access)

If the user is on the system, a `201` (created) HTTP status code is
returned, which lets you know that the user can now access your
app. If she is not registered, a `202` (accepted) status is returned,
and the collaboration is listed as pending.

A JSON representation of the affected app is returned after the
collaboration has been added.

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

 ### PUT https://build.phonegap.com/api/v1/apps/:id/collaborators/:id

Allows you to change the role for a particular collaborator on
PhoneGap Build, to `dev` or `tester`.

If you are not the owner of an app, you will receive a `401`
unauthorized response. You cannot change the email of a collaborator
at present; trying to do so will return a `400` status.

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

 ### POST https://build.phonegap.com/api/v1/keys/:platform

Add a signing key to your PhoneGap Build account. The `platform`
parameter has to be specified in the URL, and different files are
required depending on the platform you're targeting.

 #### iOS Signing Keys

To build for iOS, we require:

* a `p12` certificate file

* a `mobileprovision` file

* the password to access your certificate (optional)

* a title for your certificate-profile pair

Details on how to obtain these files are in our [iOS
Signing](/docs/ios-builds) documentation.

A sample post would look like this:

        $ curl -u andrew.lunny@nitobi.com
        -F cert=@My_Certificate.p12 -F profile=@MyDevices.mobileprovision
        -F 'data={"title":"Developer Cert","password":"12345678"}'
        https://build.phonegap.com/api/v1/keys/ios
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

If you omit the `password` parameter, your key will be _locked_ after
the upload completes. You won't be able to build with it until you
unlock the key.

 #### Android Keys

To sign your Android builds, we require:

* a `keystore` file

* the alias used for that keystore

* your keystore password (`keystore_pw`) (optional)

* your private key password (`key_pw`) (optional)

* a title for your key

Details on how to get your keystore file and the associated data are
available in our [Android Code Signing](/docs/android-signing)
documentation.

A sample post would look like this:

        $ curl -u andrew.lunny@nitobi.com
        -F keystore=@android.keystore
        -F 'data={"title":"Android Key","alias":"release",
        "key_pw":"90123456","keystore_pw":"78901234"}'
        https://build.phonegap.com/api/v1/keys/android
        {
            "title":"Android Key",
            "default":false,
            "id":2,
            "alias":"release",
            "link":"/api/v1/keys/android/2",
            "locked":false
        }

If you omit one or both of the `key_pw` and `keystore_pw` parameters,
your key will be _locked_ after the upload. You won't be able to build
with it until you unlock the key.

 #### BlackBerry Keys

To sign your Blackberry builds, we require:

* a `sigtool.csk` file

* a `sigtool.db` file

* the password to your key (optional)

* a title for your key

How to obtain the `sigtool` files is outlined in our [BlackBerry
Keys](/docs/blackberry-keys) documentation.

A sample post would look like this:

        $ curl -u andrew.lunny@nitobi.com
        -F db=@sigtool.db -F csk=@sigtool.csk
        -F 'data={"title":"My BB Key","password":"78901234"}'
        https://build.phonegap.com/api/v1/keys/blackberry
        {
            "title":"My BB Key",
            "default":false,
            "id":2,
            "link":"/api/v1/keys/blackberry/2",
            "locked":false
        }

If you omit the `password` parameter, your key will be _locked_ after
the upload completes. You won't be able to build with it until you
unlock the key.

 ### PUT https://build.phonegap.com/api/v1/keys/:platform/:id

Updating an existing signing key on PhoneGap Build - used to unlock a
signing key so it can be used for future builds. To unlock a key, you
need to provide the appropriate credentials - a single password for
iOS or BlackBerry, or two passwords (one for the key, one for the
keystore) for Android.

Please note that PhoneGap Build _does not_ verify the password of your
keys - if the password is incorrect, you will see an error when you
try to build with that key.

 #### iOS Example

        $ curl -u andrew.lunny@nitobi.com
        -d 'data={"password":"password1"}'
        -X PUT
        https://build.phonegap.com/api/v1/keys/ios/11
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

 #### Android Example

        $ curl -u andrew.lunny@nitobi.com
        -d 'data={"key_pw":"password1","keystore_pw":"password2"}'
        -X PUT
        https://build.phonegap.com/api/v1/keys/android/2
        {
            "title":"Android Key",
            "default":false,
            "id":2,
            "alias":"release",
            "link":"/api/v1/keys/android/2",
            "locked":false
        }

 #### BlackBerry Example

        $ curl -u andrew.lunny@nitobi.com
        -d 'data={"password":"password1"}'
        -X PUT
        https://build.phonegap.com/api/v1/keys/blackberry/2
        {
            "title":"My BB Key",
            "default":false,
            "id":2,
            "link":"/api/v1/keys/blackberry/2",
            "locked":false
        }

 ### DELETE https://build.phonegap.com/api/v1/apps/:id

Delete your application from PhoneGap Build - will return either a
`202` (accepted) status, or `404` (if the app cannot be found).

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/apps/8
        {
            "success":"app 8 deleted"
        }

 ### DELETE https://build.phonegap.com/api/v1/apps/:id/collaborators/:id

Remove a collaborator from a project that you own.

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/apps/12/collaborators/13
        {
            "success":"foo@bar.com removed from app 9"
        }

 ### DELETE https://build.phonegap.com/api/v1/keys/:platform/:id

Delete a signing key from PhoneGap Build - will return either a `202`
(accepted) status, or `404` (if the key cannot be found).

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/keys/android/8
        {
            "success":"android key 8 deleted"
        }

-->
