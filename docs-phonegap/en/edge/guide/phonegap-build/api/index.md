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

The Adobe&reg; PhoneGap&trade; Build API allows applications to use
the PhoneGap Build web service to create, build, update, and download
PhoneGap apps. It integrates easily into IDEs, shell scripts, app
builders, and elsewhere.

This section discusses general issues with credentials and data
formats. See the following sections for details on how to interact
with the API:

* The PhoneGap Build Read API
* The PhoneGap Build Write API

These detail the current version 1 of the API. For information on the
older release, see The PhoneGap Build API, Version 0.

## Authentication

Version 1 supports two forms of authentication: basic authentication
over HTTPS, and token authentication.

When using basic authentication, use your PhoneGap Build credentials
(username and password) to authenticate each request:

        $ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/me
        {
            "created_at":"2010-10-12T19:10:16Z",
            "updated_at":"2010-11-29T19:58:00Z",
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com"
        }

To use token authentication, use basic authentication to post to
`/token` with your request, and the token returns in the response:

        $ curl -u andrew.lunny@nitobi.com -X POST -d "" https://build.phonegap.com/token</pre></strong>
        {
            "token":"ASTRINGTOKEN"
        }

Then pass this token as a parameter for any call that you make:

        $ curl https://build.phonegap.com/api/v1/me?auth_token=ASTRINGTOKEN
        {
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com"
        }

Both forms of authentication are supported. All unauthenticated
requests return a `401` (unauthorized) status code.

All the examples documented here use token authentication for clarity.

__NOTE:__ Users who registered using Github authentication may not
have PhoneGap Build credentials, and therefore may not be able to use
basic authentication. To retrieve an authententication token for your
Github-linked account, go to __Edit Account__, on the top right of the
site's navigation bar. Find the __Authentication Tokens__ section,
where you can obtain, as well as create, reset, or delete your token.
Note that resetting or deleting a token invalidates any further
requests using the previous token.

## JSON

All successful requests return either a JSON-encoded string or a
binary file. All requests that fail return a JSON-encoded string in
the following form, with an appropriate status code:

        {
            "error":"some error message"
        }

When using the API, check each returned status code; if it's not 200,
check the error field on the parsed response, for example:

        if (res.status != 200)
            console.log(JSON.parse(res.body).error)

As is standard in HTTP, a _4xx_ status indicates an error with the
request, while a _5xx_ status indicates an server error. Contact
[PhoneGap's support forums](http://community.phonegap.com) if you get
a 500 error, or an unexpected 400 error.

## JSONP

JSONP access is available for PhoneGap Build developers: just add a
`callback` parameter to your requests, and the JSONP response body is
wrapped in that function:

        $ curl https://build.phonegap.com/api/v1/me?auth_token=ASTRINGTOKEN&callback=exec
        exec({
            "username":"alunny",
            "email":"andrew.lunny@nitobi.com"
        })

This allows you to access the PhoneGap Build API using `<script>`
tags.

## HATEOAS

Wherever possible, the PhoneGap Build API v1 uses _Hypermedia as the
Engine of Application State_ ([HATEOAS]
(http://en.wikipedia.org/wiki/HATEOAS)).  This means you can access
the source of the api (`/api/v1`), then follow nested resources'
`link` attributes to navigate the application, with no knowledge of
the other routes within your application.

The home resource for the API v1 is the same as the `/me` resource,
which represents the current user.
