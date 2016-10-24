---
title: Read API
url: phonegap-build/developer-api/read
layout: subpage
---

Back to:

* [Authentication Methods](../authentication)
* [The Write API](../write)

This section details read methods for version 1 of the API. See The
PhoneGap Build API for an overview, or The PhoneGap Build Write API
for write methods.

Please note that example responses are formatted for the sake of
legibility. Actual JSON responses will have no significant whitespace.

The API's read interface includes the following:

<style>
.api span {
    background-color: #5cb85c;
}
.api span {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
    margin-right: 10px;
}

.api code {
    padding: 2px 4px;
    font-size: 90%;
    color: #333;
    white-space: nowrap;
    border-radius: 4px;
    margin-right: 10px;
}

.api {
    padding: 5px;
    border-radius: 5px;
    background-color:#f1f1f1;
    width: 100%;
    display:block;
}

.api:hover {
    background-color:#e0e0e0;
    text-decoration: none;
}
</style>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_me"><span class="label label-success">GET</span><code>/api/v1/me</code> Get A User's Profile and Resources</a>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_apps"><span class="label label-success">GET</span><code>/api/v1/apps</code> Get A User's Apps</a>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_apps_id"><span class="label label-success">GET</span><code>/api/v1/apps/:id</code> Get A User's App by Id</a>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_apps_id_platform"><span class="label label-success">GET</span><code>/api/v1/apps/:id/:platform</code> Download A User's App by Platform</a>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_keys"><span class="label label-success">GET</span><code>/api/v1/keys</code> Get Meta-data About A User's Keys</a>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_keys_platform"><span class="label label-success">GET</span><code>/api/v1/keys/:platform</code> Get Meta-Data About A User's Platfom Keys</a>

<a class="api" href="#_get_https_build_phonegap_com_api_v1_keys_platform_id"><span class="label label-success">GET</span><code>/api/v1/keys/:platform/:id</code> Get Meta-Data About A Specific Key</a>

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_me"></a>

## `GET https://build.phonegap.com/api/v1/me`

Get a JSON-encoded representation of the authenticated user, as well
as a listing of associated resources.

This should be the starting point for applications that traverse the
PhoneGap Build API. It is aliased to
`https://build.phonegap.com/api/v1`:

```sh
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
        "winphone": {
            "all": [
                {
                    "id": 72,
                    "title": "Windows Publisher Key",
                    "link": "/api/v1/keys/winphone/72",
                    "default": false
                }
            ],
            "link": "/api/v1/keys/winphone",
        }
        "link": "/api/v1/keys"
    },
    "link": "/api/v1/me"
}
```

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_apps"></a>

## `GET https://build.phonegap.com/api/v1/apps`

Get a JSON-encoded representation of the authenticated user's apps.

API clients can follow the `link` attribute for each app to get
further details, including the associated signing keys and
collaborators:

```sh
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
            "phonegap_version":"cli-6.3.0",
            "hydrates":false,
            "status":{
                "android":"complete",
                "ios":null,
                "winphone":"pending"
            },
            "phonegap_versions":{
                "android":"5.2.1",
                "ios":"4.2.0",
                "winphone":"4.4.1"
            },
            "download":{
                "android":"/api/v1/apps/1/android",
            },
            "error":{
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
            "share":true,
            "link":"/api/v1/apps/2",
            "phonegap_version":"cli-6.3.0",
            "build_count":12,
            "status": {
                "android":"complete",
                "ios":"complete",
                "winphone":"complete"
            },
            "phonegap_versions":{
                "android":"5.2.1",
                "ios":"4.2.0",
                "winphone":"4.4.1"
            },
            "download":{
                "android":"/api/v1/apps/1/android",
                "ios":"/api/v1/apps/1/ios",
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
```

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_apps_id"></a>

## `GET https://build.phonegap.com/api/v1/apps/:id`

Get a JSON-encoded representation of a particular app, if the authenticated user has permission to access it.

In addition to the fields provided in the list of all apps, this detail view includes:

* `keys`: all of the keys that the app is currently being built with. This include the owner's default key for a platform, if selected

* `collaborators`: each person who has access to this app, along with their role, if the authenticated user is the owner of the app. Collaborators who are registered with PhoneGap Build are listed under `active`; collaborators you have invited who have not yet created an account are listed as `pending`:

```sh
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
    "share":false,
    "link":"/api/v1/apps/2",
    "phonegap_version":"cli-6.3.0",
    "last_build":"2014-12-03 13:52:10 -0800",
    "build_count":12,
    "status": {
        "android":"complete",
        "ios":"complete",
        "winphone":"complete"
    },
    "phonegap_versions":{
        "android":"5.2.1",
        "ios":"4.2.0",
        "winphone":"4.4.1"
    },
    "download":{
        "android":"/api/v1/apps/1/android",
        "ios":"/api/v1/apps/1/ios",
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
```

If the app does not exist, or you do not have access to it, an error
message returns with status code `404`:

```sh
$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/520394
{
    "error":"app #54 not available"
}
```

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_apps_id_platform"></a>

## `GET https://build.phonegap.com/api/v1/apps/:id/:platform`

Download the app package for the given platform. Available platforms
are `android`, `ios`, and `winphone`.

If successful, this API method returns a `302` redirect to the
application binary, and the body of the response references the file's
URL:

```sh
$ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/50/android
{
    "location":""http://s3.amazonaws.com/build.phonegap.com/some-long-guid/app.apk"
}
```

If your API client can follow redirects, you can save the response
directly:

```sh
$ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/50/android > app_50.apk
```

When downloading, be sure you have the right file extension:

* `apk` for Android
* `ipa` for iOS
* `xap` for Windows Phone

If the app package is unavailable for the specified platform, an error
message returns with status code `404`:

```sh
$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/apps/52/android
{
    "error":"app #52 download unavailable for android"
}
```

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_keys"></a>

## `GET https://build.phonegap.com/api/v1/keys`

Get a JSON-encoded list of all the signing keys associated with your
account.

This returns a short listing of all the associated keys, very similar
to the list you see when requesting `/api/v1/me`:

```sh
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
        },
        "winphone":{
            "all":[
                {
                    "id": 72,
                    "title": "Windows Publisher Key",
                    "link": "/api/v1/keys/winphone/72",
                    "default": false
                }
            ],
            "link": "/api/v1/keys/winphone",
        }
    },
    "link":"/api/v1/keys"
}
```

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_keys_platform"></a>

## `GET https://build.phonegap.com/api/v1/keys/:platform`

Get a JSON-encoded list of all the signing keys associated with your
account, for a specific platform. That platform can be either `ios` or
`android`:

```sh
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

$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/winphone
{
    "keys":[
        {
            "id": 72,
            "title": "Windows Publisher Key",
            "link": "/api/v1/keys/winphone/72",
            "default": false
        }
    ],
    "link":"/api/v1/keys/winphone"
}
```

<a class="anchor" id="_get_https_build_phonegap_com_api_v1_keys_platform_id"></a>

## `GET https://build.phonegap.com/api/v1/keys/:platform/:id`

Get a JSON-encoded representation of a single signing key:

```sh
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

$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/winphone/72
{
    "id": 72,
    "title": "Windows Publisher Key",
    "link": "/api/v1/keys/winphone/72",
    "default": false
}
```

If the requested key is not available, then a `404` status returns,
along with the error message as JSON:

```sh
$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v1/keys/ios/8989898
{
    "error":"could not find ios key #8989898"
}
```
