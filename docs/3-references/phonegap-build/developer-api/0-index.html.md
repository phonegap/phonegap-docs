---
title: PhoneGap Build Developer API
url: references/phonegap-build/developer-api
layout: subpage
expand: build-developer
---


The PhoneGap Build API allows applications to use the PhoneGap Build web service to create, build, update, and download PhoneGap apps. It integrates easily into IDEs, shell scripts, app builders, and elsewhere.

The core sections discussed in this documentation article are:

* [Authentication Methods](oauth)
* [The Read API](read)
* [The Write API](write)

Here are some additional notes on using the API.

- [JSON](#JSON)
- [JSONP](#JSONP)
- [HATEOAS](#HATEOAS)

### JSON

All successful requests return either a JSON-encoded string or a binary file. All requests that fail return a JSON-encoded string in the following form, with an appropriate status code:

    {
        "error":"some error message"
    }

When using the API, check each returned status code; if it's not 200, check the error field on the parsed response, for example:

    if (res.status != 200)
        console.log(JSON.parse(res.body).error)

As is standard in HTTP, a _4xx_ status indicates an error with the request, while a _5xx_ status indicates an server error. Contact
  <a href="http://community.phonegap.com" target="_blank">PhoneGap's support forums</a>
if you get a 500 error, or an unexpected 400 error.

### JSONP

JSONP access is available for PhoneGap Build developers: just add a `callback` parameter to your requests, and the JSONP response body is wrapped in that function:

    $ curl https://build.phonegap.com/api/v1/me?auth_token=ASTRINGTOKEN&callback=exec
    exec({
        "username":"alunny",
        "email":"andrew.lunny@nitobi.com"
    })

This allows you to access the PhoneGap Build API using `<script>` tags.

### HATEOAS

Wherever possible, the PhoneGap Build API v1 uses _Hypermedia as the Engine of Application State_ (
  <a href="http://en.wikipedia.org/wiki/HATEOAS" target="_blank">HATEOAS</a>
).  This means you can access the source of the api (`/api/v1`), then follow nested resources' `link` attributes to navigate the application, with no knowledge of the other routes within your application.

The home resource for the API v1 is the same as the `/me` resource, which represents the current user.
