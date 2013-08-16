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

## API v1 Overview

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
your token request. You will receive a token as a response:

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
