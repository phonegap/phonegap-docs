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

# The PhoneGap Build API, Version 0

Version 0 (v0) of the API is a preview release for the beta version of
PhoneGap Build. Although available for legacy applications, it will
not receive any further updates. If you are developing a new
application accessing PhoneGap Build, see version 1 of The PhoneGap
Build API.

Version 0 authenticates through HTTPS with basic authentication.  All
unauthenticated requests return a `401` (unauthorized) status code.

The read API features:

* GET https://build.phonegap.com/api/v0/me
* GET https://build.phonegap.com/api/v0/apps
* GET https://build.phonegap.com/api/v0/apps/:id
* GET https://build.phonegap.com/api/v0/apps/:id/:icon
* GET https://build.phonegap.com/api/v0/apps/:id/:platform
* GET https://build.phonegap.com/api/v0/keys/

The write API features:

* POST https://build.phonegap.com/api/v0/apps
* POST https://build.phonegap.com/api/v0/apps/:id/:icon
* POST https://build.phonegap.com/api/v0/apps/:id/push
* PUT https://build.phonegap.com/api/v0/apps/:id
* POST https://build.phonegap.com/api/v0/keys/:platform
* DELETE https://build.phonegap.com/api/v0/apps/:id

## JSON

Successful requests return either a JSON-encoded string or a binary
file. Failed requests return a JSON-encoded string of the following
form, with an appropriate status code:

        {"error":"some error message"}

When using the API, check the status code returned; if it's not 200,
check the error field on the parsed response:

        if (res.status != 200)
            console.log(JSON.parse(res.body).error)

## Read API

### GET https://build.phonegap.com/api/v0/me

Get a JSON-encoded representation of the authenticated user:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/me
        {"created_at":"2010-10-12T19:10:16Z","updated_at":"2010-11-29T19:58:00Z",
          "username":"alunny","email":"andrew.lunny@nitobi.com"}

### GET https://build.phonegap.com/api/v0/apps

Get a JSON-encoded representation of the authenticated user's apps:

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

Get a JSON-encoded representation of a single app that belongs to the
authenticated user:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50
        {"created_at":"2010-11-09T20:36:58Z","title":"alunny's Amazing App",
         "updated_at":"2010-11-23T22:53:12Z","symbian_status":"symbian complete",
         "repo_url":"http://github.com/alunny/phonegap-start.git",
         "blackberry_status":"blackberry pending","android_status":"error",
         "webos_status":"compiling webos project","id":50,"icon":"icon.png",
         "version":99.999,"package":"com.alunny.amazing","person_id":1,
         "desc":"An Amazing app by alunny"}

If the app does not exist or belongs to another user, an error message
returns with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/54
        {"error":"app #54 not available"}

### GET https://build.phonegap.com/api/v0/apps/:id/:icon

Get the icon file of an app:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50/icon &gt; icon.png

If no icon is available, an error message returns with status code
`404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/icon
        {"error":"No icon available for app #52"}

### GET https://build.phonegap.com/api/v0/apps/:id/:platform

Download the app package for the given platform, either `android`,
`blackberry`, `symbian` or `webos`.  The request actually returns a
redirect to the app package itself, so make sure your API client
follows redirects to download the app:

        $ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50/android &gt; app_50.apk

If the app package is unavailable for the specified platform, an error
message returns with status code `404`:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/android
        {"error":"App #52 for android error"}

### GET https://build.phonegap.com/api/v0/keys/

Get a list of signing keys that have been uploaded to build:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/keys/
        {"ios":[{"title":"Test Key","updated_at":"2011-07-07T15:51:23-07:00",
        "id":2,"mobile_provision":"test.mobileprovision",
        "cert_name":"Certificates.p12"}],"blackberry":[],"android":[]}

The following returns if no keys have been uploaded:

        {"ios":[],"blackberry":[],"android":[]}

Get a specific platform's keys:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/keys/:platform

If the app does not exist or belongs to another user, an error message
returns with status code `404`:

## Write API

### POST https://build.phonegap.com/api/v0/apps

Create a new app. Requires a `title` parameter, and either the URL of
a public git or svn repository, or an `index.html` or project zip
file.

With a repository's URL:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"New App","repo":"http://github.com/alunny/phonegap-start.git"}' https://build.phonegap.com/api/v0/apps
        {"created_at":"2010-11-29T21:13:26Z","title":"alunny's Amazing App",
        "updated_at":"2010-11-29T21:13:26Z","symbian_status":"pending",
        "repo_url":"http://github.com/alunny/phonegap-start.git",
        "blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":55,"icon":"icon.png","version":"99.999",
        "package":"com.alunny.amazing","person_id":1,
        "desc":"An Amazing app by alunny"}

With a file (using `curl -F`, not `curl -d`):

        $ curl -F file=@index.html -F 'data={"title":"Another App"}' -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps
        {"created_at":"2010-11-29T21:52:32Z","title":"Another App",
        "updated_at":"2010-11-29T21:52:32Z","symbian_status":"pending",
        "repo_url":null,"blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":56,"icon":null,"version":null,
        "package":null,"person_id":1,"desc":null}

Again, JSON errors result if anything goes wrong:

        $ curl -u andrew.lunny@nitobi.com -d 'data={"title":"New App"}' https://build.phonegap.com/api/v0/apps
        {"error":"Need either a repo url or a file"}

Any errors with the request return a `400` status code. Status codes
of `500` indicate an internal error; contact the [PhoneGap&nbsp;Build
team](http://community.phonegap.com).

### POST https://build.phonegap.com/api/v0/apps/:id/:icon

Set an app's icon file:

        $ curl -F file=@icon.png -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/56/icon
        {"created_at":"2010-11-29T21:52:32Z","title":"Another App",
        "updated_at":"2010-11-29T22:24:26Z","symbian_status":"symbian complete",
        "repo_url":null,"blackberry_status":"pending","android_status":"pending",
        "webos_status":"webos complete","id":56,"icon":"icon.png",
        "version":null,"package":null,"person_id":1,"desc":null}

### POST https://build.phonegap.com/api/v0/apps/:id/push

Update the current app from its source repo, using [Github's
post-receive hooks](http://help.github.com/post-receive-hooks/)
functionality. In the example below, the post data is ignored, but is
present for `curl` to agree to set a `Content-Length` header:

        $ curl -X POST -d data=dummy -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/55/push
        {"created_at":"2010-11-29T21:13:26Z","title":"alunny's Amazing App",
        "updated_at":"2010-11-29T22:28:33Z","symbian_status":"pending",
        "repo_url":"http://github.com/alunny/phonegap-start.git",
        "blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":55,"icon":"icon.png","version":99.999,
        "package":"com.alunny.amazing","person_id":1,
        "desc":"An Amazing app by alunny"}

If the app is not associated with a repository, a `400` status code
results. If the app can't be found, a `404` status code results. If
there is an internal error, `500` results:

        $ curl -X POST -d data=dummy -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/56/push
        {"error":"app #56 is not repo backed"}

### PUT https://build.phonegap.com/api/v0/apps/:id

Update the app's metadata:

        $ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"title":"New Title"}' https://build.phonegap.com/api/v0/apps/56
        {"created_at":"2010-11-29T21:52:32Z","title":"New Title",
        "updated_at":"2010-11-29T22:37:44Z","symbian_status":"pending",
        "repo_url":null,"blackberry_status":"pending","android_status":"pending",
        "webos_status":"pending","id":56,"icon":"icon.png","version":null,
        "package":null,"person_id":1,"desc":null}

Status code `400` returns if the post data cannot be parsed.

### POST https://build.phonegap.com/api/v0/keys/:platform

Upload a key for application signing

#### IOS Example

The password field is optional if the key requires one.  The following
example:

        $ curl -F profile_file=@example.mobileprovision -F cert_file=@example.p12 -F 'data={"title":"Example Key", "password":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/ios/</pre></strong>

produces a response similar to:

        {"title":"Example Key","updated_at":"2011-07-08T10:27:01-07:00",
        "id":3,"cert_name":"example.p12","mobile_provision":"example.mobileprovision"}

#### Android Example

The following example:

        $ curl -F key_file=@example.keystore -F 'data={"title":"Example Key","alias":"example alias", "key_pw":"test", "keystore_pw":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/android/</pre></strong>

produces a response similar to:

        {"title":"Example Key","updated_at":"2011-07-08T14:07:09-07:00","id":1}

#### Blackberry Example

The following example:

        curl -F csk_file=@example.csk -F db_'data={"title":"example key", "password":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/blackberry/</pre></strong>

produces a response similar to:

        {"title":"example key","updated_at":"2011-07-08T10:48:18-07:00","id":1}

If the app does not exist or belongs to another user, an error message
returns with status code `404`:

### DELETE https://build.phonegap.com/api/v0/apps/:id

Delete the app:

        $ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v0/apps/56
        {"success":"app #56 destroyed"}

Again, `404` error if the app cannot be found.
