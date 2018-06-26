---
title: Write API
url: phonegap-build/developer-api/write
layout: subpage
---

Back to:

* [Authentication Methods](../authentication)
* [The Read API](../read)

This section details write methods for version 1 of the API. See The
PhoneGap Build API for an overview, or The PhoneGap Build Read API for
read methods.

All write API methods expect JSON-encoded content. Many also accept
file uploads. API requests should have the content type
`multipart/form-data`, and bodies of JSON requests should be named
`data`.

The API's write interface includes the following:

<style>
.api {
    padding: 5px;
    border-radius: 5px;
    background-color:#f1f1f1;
    width: 100%;
    display:block;
}
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
.api:hover {
    background-color:#e0e0e0;
    text-decoration: none;
}
.api.danger span{
    background-color:#d9534f;
}
.api.info span{
    background-color:#5bc0de;
}
.api.primary span {
    background-color:#428bca;
}
</style>

<a class="api info" href="#_post_https_build_phonegap_com_api_v1_apps"><span>POST</span><code>/api/v1/apps</code> Create a New App</a>

<a class="api primary" href="#_put_https_build_phonegap_com_api_v1_apps_id"><span>PUT</span><code>/api/v1/apps/:id</code> Update an Existing App</a>

<a class="api info" href="#_post_https_build_phonegap_com_api_v1_apps_id_build"><span>POST</span><code>/api/v1/apps/:id/build</code> Start a Build For a Specific App</a>

<a class="api info" href="#_post_https_build_phonegap_com_api_v1_apps_id_build_platform"><span>POST</span><code>/api/v1/apps/:id/build/:platform</code> Start a Build for an App for a Specific Platform</a>

<a class="api info" href="#_post_https_build_phonegap_com_api_v1_apps_id_collaborators"><span>POST</span><code>/api/v1/apps/:id/collaborators</code> Add a Collaborator To an App</a>

<a class="api primary" href="#_post_https_build_phonegap_com_api_v1_apps_id_collaborators"><span>PUT</span><code>/api/v1/apps/:id/collaborators/:id</code> Update a Collaborator On a App</a>

<a class="api info" href="#_post_https_build_phonegap_com_api_v1_keys_platform"><span>POST</span><code>/api/v1/keys/:platform</code> Add a Signing Key for A Specific Platform</a>

<a class="api primary" href="#_put_https_build_phonegap_com_api_v1_keys_platform_id"><span>PUT</span><code>/api/v1/keys/:platform/:id</code> Update/Unlock a Signing Key for a Specific Platform</a>

<a class="api danger" href="#_delete_https_build_phonegap_com_api_v1_apps_id"><span>DELETE</span><code>/api/v1/apps/:id</code> Delete an App</a>

<a class="api danger" href="#_delete_https_build_phonegap_com_api_v1_apps_id_collaborators_id"><span>DELETE</span><code>/api/v1/apps/:id/collaborators/:id</code> Delete a Collaborator for an App</a>

<a class="api danger" href="#_delete_https_build_phonegap_com_api_v1_keys_platform_id"><span>DELETE</span><code>/api/v1/keys/:platform/:id</code> Delete a Key</a>

<a class="anchor" id="_post_https_build_phonegap_com_api_v1_apps"></a>

## `POST https://build.phonegap.com/api/v1/apps`

Creates a new app. Required parameters:

* __title__: You must specify a title for your app. Any title specified in your package's `config.xml` takes precedence.

* __create_method__: How the app is created (described below). There are two valid values:

  * __file__: A file is being uploaded with the app content

  * __remote_repo__: You have a remote repository with your app content

Optional parameters:

* __package__: Sets your app's package identifier. This can be modified after the app's creation, or in your `config.xml` file. Defaults to `com.phonegap.www`

* __version__: Sets your app's version number. This can also be modified after the app's creation, or in your `config.xml` file. Defaults to `0.0.1`

* __description__: Sets your app's description. This can also be modified after creation, or in your `config.xml` file. Defaults to empty text.

* __debug__: Builds your app in debug mode, as detailed in Remote Debugging Tools.  Defaults to `false`.

* __keys__: Set the signing keys to use for each platform you wish to sign. (See below for details.)

* __private__: Whether your app can be publicly downloaded. Defaults to `true`.

* __tag__: Which tag or branch to clone. Defaults to `master`.

* __share__: Whether your private app can be publicly shared and viewed. Defaults to `false`.

* __phonegap_version__: Which version of PhoneGap your app uses. See the Configuration Reference for details on which are supported, and which one is currently the default.

* __hydrates__: Builds your app with hydration enabled, as described in Collaborating and Testing. Defaults to `false`.

### create_method

A new app can be created from an archive file or from a remote git repository. You can choose which one of these to use by setting the `create_method` parameter in your JSON data.

The create method is immutable. An app created from a repository can never be changed to be file-backed, or vice versa. If you want to change at some later date, delete the old app and create a new one.

### File-backed applications

To create a file-backed application, set the `create_method` parameter to `file`, and include a zip file (`tar.gz`) or an `index.html` file in the multipart body of your post, using `file` as a parameter name:

```sh
$ curl -F file=@/Users/alunny/index.html -u andrew.lunny@nitobi.com -F 'data={"title":"API V1 App","package":"com.alunny.apiv1","version":"0.1.0","create_method":"file"}' https://build.phonegap.com/api/v1/apps
{
    "keys":{
        "ios":{
            "title":"ios-key",
            "default":true,
            "id":2,
            "link":"/api/v1/keys/ios/2"
         },
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
    "share":false,
    "link":"/api/v1/apps/26486",
    "status":{
        "ios":"pending",
        "android":"pending",
        "winphone":"pending"
    },
    "error":{},
    "phonegap_version":"3.5.0",
    "hydrates":false,
    "build_count":null
}
```

### Remote-repository backed applications

To create an app based on a remote repository, set the `create_method` parameter to `remote_repo`, and include a `repo` parameter with the repository's URL. Optionally include a `tag` parameter which indicates the branch or tag to pull from.

The URL has to be publicly accessible; PhoneGap Build does not authenticate against your repository. If you wish to keep your code private, use one of the other `create_method` options:

```sh
$ curl -u andrew.lunny@nitobi.com -d 'data={"title":"API V1 App","repo":"https://github.com/alunny/phonegap-start.git", "tag":"master", "create_method":"remote_repo"}' https://build.phonegap.com/api/v1/apps
{
    "keys":{
        "ios":{
            "title":"ios-key",
            "default":true,
            "id":2,
            "link":"/api/v1/keys/ios/2"
         },
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
    "tag":"master",
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
    "share":true,
    "link":"/api/v1/apps/26488,
    "status":{
        "ios":"pending",
        "android":"pending",
        "winphone":"pending"
    },
    "error":{},
    "phonegap_version":"3.5.0",
    "hydrates":false,
    "build_count":null
}
```

If you provide a repository URL that requires authentication, the response returns a `400` HTTP status code along with the error message in the body of the response:

```sh
$ curl -u andrew.lunny@nitobi.com -d 'data={"title":"API V1 App","repo":"https://alunny@github.com/alunny/phonegap-start.git","create_method":"remote_repo"}' https://build.phonegap.com/api/v1/apps
{
    "error":"Private repository URLs not supported - try removing &quot;alunny@&quot;"
}
```

If your PhoneGap Build account is linked to your Github account, you will be able to pull from your private Github repositories. Other authenticated urls will fail as above.

### Signing keys

To sign your builds on PhoneGap Build, you must first upload one or more keys, through the `POST https://build.phonegap.com/api/v1/keys` method, or through the web interface. You can get a list of all the keys associated with your account by sending a GET request to the same URL.

In the `data` JSON hash that you send to the build server, you can specify the keys, per platform, by id, that you wish to use for this build.

The value for each platform can be the integer id, such as:

```js
"keys":{"ios":123}
```

or an object, containing the `password` field, or the `key_pw` and `keystore_pw` fields for Android, such as:

```js
"keys":{"ios":{"id":123,"password":"password1"}
```

Using the second form allows you to unlock the given key, without making a separate PUT request to `https://build.phonegap.com/v1/keys/ios/123`

Here is a sample post, using the first form:

```sh
$ curl -u andrew.lunny@nitobi.com -d 'data={"title":"Signing Keys","repo":"https://github.com/alunny/phonegap-start.git","create_method":"remote_repo","keys":{"ios":123,"android":567,"winphone":72}}' https://build.phonegap.com/api/v1/apps
{
    "keys":{
        "ios":{
            "title":"new iOS key",
            "default":false,
            "id":123,
            "link":"/api/v1/keys/ios/123"
         },
         "android":{
            "title":"some android key",
            "default":false,
            "id":567,
            "link":"/api/v1/keys/android/567"
         },
         "winphone":{
             "id": 72,
             "title": "Windows Publisher Key",
             "link": "/api/v1/keys/winphone/72",
             "default": false
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
        "ios":"pending",
        "android":"pending",
        "winphone":"pending"
    },
    "error":{},
    "phonegap_version":"3.5.0",
    "hydrates":false,
    "build_count":null
}
```

<a class="anchor" id="_put_https_build_phonegap_com_api_v1_apps_id"></a>

## `PUT https://build.phonegap.com/api/v1/apps/:id`

Update an existing app, either its contents, its build settings, or both. The response is a JSON representation of the app, the same as for `GET /api/v1/apps/:id`.

App metadata like title, description and version should be updated via the [config.xml file](/phonegap-build/configuring/). Updating the build settings involves sending a JSON object as the parameter `data`. Available options in this JSON object are:

* __debug__: whether to build your app in debug mode, as detailed in Remote Debugging Tools.

* __private__: whether the app has restricted visibility.

* __share__: whether the private app can be publicly viewed.

* __tag__: which branch or tag to clone from the git repository.

Here is a simple example that update an app's version number:

```sh
$ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"version":"0.2.0"}' https://build.phonegap.com/api/v1/apps/8
{
    "id":8,
    "version":"0.2.0",
    "keys":{
        "ios":null,
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
    "share":true,
    "description":null,
    "status":{
        "winphone":"pending",
        "ios":null,
        "android":"pending",
    },
    "error":{},
    "phonegap_version":"3.5.0",
    "hydrates":false,
    "build_count":12
}
```

By default, the app is built for all supported platforms once the metadata changes.

### App Signing Keys

As with creating a new app, you can specify a signing key to use for each platform that you wish to build for. You can also put a key's credentials, which ensures the key is unlocked and ready to use.

This sample post selects a new Android key for an app, and unlocks it:

```sh
$ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"keys":{"android": {"id":457,"key_pw":"password1","keystore_pw":"password2"}}' https://build.phonegap.com/api/v1/apps/36500

{
    "keys":{
        "ios":{
            "title":"new iOS key",
            "default":false,
            "id":123,
            "link":"/api/v1/keys/ios/123"
         },
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
        "ios":"pending",
        "android":"pending",
        "winphone":"pending"
    },
    "error":{},
    "phonegap_version":"3.5.0",
    "hydrates":false,
    "build_count":null
}
```

### Updating a file-based application

If the application has been created from a file upload, you can include a new `index.html`, zip, or `tar.gz` file as the `file` parameter in your request to update the contents:

```sh
$ curl -u andrew.lunny@nitobi.com -X PUT -F file=@/Users/alunny/new/index.html https://build.phonegap.com/api/v1/apps/8
```

### Updating a repo-based application

To update an application from a remote repository, simply add the `pull` field to your `data` hash, and set it to `true`:

```sh
$ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"pull":"true"}' https://build.phonegap.com/api/v1/apps/8
```

PhoneGap Build then tries to download the new code from your remote repository, and rebuilds your app for all supported platforms.

<a class="anchor" id="_post_https_build_phonegap_com_api_v1_apps_id_build"></a>

## `POST https://build.phonegap.com/api/v1/apps/:id/build`

Queue new builds for a specified app. The older builds are discarded, while new ones are queued.

The builds will use the most current app contents, as well as the selected signing keys. The response have a `202` (accepted) status:

```sh
$ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build
```

To choose which platforms to build, include them as a JSON encoded parameter:

```sh
$ curl -u andrew.lunny@nitobi.com -X POST -d 'data={"platforms":["android"]}' https://build.phonegap.com/api/v1/apps/12/build
```

Once the builds are queued, you will want to watch the results of `GET /api/v1/apps/:id` to check when each platform's status changes from `pending` to either `complete` or `error`.

<a class="anchor" id="_post_https_build_phonegap_com_api_v1_apps_id_build_platform"></a>

## `POST https://build.phonegap.com/api/v1/apps/:id/build/:platform`

A simpler URL to build for a single platform:

```sh
$ curl -u andrew.lunny@nitobi.com -X POST -d '' https://build.phonegap.com/api/v1/apps/12/build/android
```

<a class="anchor" id="_post_https_build_phonegap_com_api_v1_apps_id_collaborators"></a>

## `POST https://build.phonegap.com/api/v1/apps/:id/collaborators`

Add a collaborator to work with you on a given application. You must be the app's owner/admin to do so.

Required parameters:

* __email__: The email address of your new collaborator.

* __role__: The new collaborator's level of access: either `tester` (read-only) or `dev` (read and write).

If the user is on the system, a `201` (created) HTTP status code results, which lets you know that the user can now access your app. If the user is not registered, a `202` (accepted) status results, and the collaboration is listed as `pending`.

A JSON representation of the affected app returns after the collaboration is added:

```sh
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
```

<a class="anchor" id="_post_https_build_phonegap_com_api_v1_apps_id_collaborators_id"></a>

## `PUT https://build.phonegap.com/api/v1/apps/:id/collaborators/:id`

Allows you to change the role for a particular collaborator on PhoneGap Build, either to `dev` or `tester`.

If you are not the owner of an app, a `401` unauthorized response results. You cannot change the email of a collaborator; attempts to do so return a `400` status:

```sh
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
          "android":"pending",
          "winphone":"pending"
        },
        "phonegap_version":"3.5.0",
        "hydrates":false,
        "build_count":null,
        "error":{}
    },
    "link":"/api/v1/apps/12/collaborators/13"
}
```

<a class="anchor" id="_post_https_build_phonegap_com_api_v1_keys_platform"></a>

## `POST https://build.phonegap.com/api/v1/keys/:platform`

Add a signing key to your PhoneGap Build account. The `platform` parameter has to be specified in the URL, and different files are required depending on the platform you're targeting.

### iOS Signing Keys

The following are required for iOS builds:

* a `p12` certificate file
* a `mobileprovision` file
* the password to access your certificate (optional)
* a title for your certificate-profile pair

Details on how to obtain these files are in our [iOS Signing](/phonegap-build/signing/ios) documentation.

A sample post would look like this:

```sh
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
```

If you omit the `password` parameter, your key is _locked_ after the upload completes. You won't be able to build with it until you unlock the key.

### Android Keys

The following are required for Android builds:

* a `keystore` file
* the alias used for that keystore
* your keystore password (`keystore_pw`) (optional)
* your private key password (`key_pw`) (optional)
* a title for your key

Details on how to get your keystore file and the associated data are available in our [Android Code Signing](/phonegap-build/signing/android) documentation.

Here is a sample post:

```sh
$ curl -u andrew.lunny@nitobi.com -F keystore=@android.keystore -F 'data={"title":"Android Key","alias":"release", "key_pw":"90123456","keystore_pw":"78901234"}' https://build.phonegap.com/api/v1/keys/android
{
    "title":"Android Key",
    "default":false,
    "id":2,
    "alias":"release",
    "link":"/api/v1/keys/android/2",
    "locked":false
}
```

If you omit one or both of the `key_pw` and `keystore_pw` parameters, your key is _locked_ after the upload. You won't be able to build with it until you unlock the key.

### Windows Phone Keys

The following are required for Windows Phone builds:

* a title for your key
* the publisher id from your Windows Phone store account.

Here is a sample post:

```sh
$ curl -u andrew.lunny@nitobi.com -F 'data={"title":"Winphone Key","publisher_id":"04739CCE-16E5-4680-8644-0004225CBCF6"}' https://build.phonegap.com/api/v1/keys/winphone
{
  "title":"Winphone Key",
  "default":false,
  "id":72,
  "link":"/api/v1/keys/winphone/72",
}
```

If you omit one or both of the `key_pw` and `keystore_pw` parameters, your key is _locked_ after the upload. You won't be able to build with it until you unlock the key.

<a class="anchor" id="_put_https_build_phonegap_com_api_v1_keys_platform_id"></a>

## `PUT https://build.phonegap.com/api/v1/keys/:platform/:id`

Updates an existing signing key on PhoneGap Build, used to unlock a signing key so it can be used for future builds. To unlock a key, you need to provide the appropriate credentials: a single password for iOS or two passwords for Android, one for the key, and one for the keystore.

__NOTE:__ PhoneGap Build _does not_ verify your key's password.  If incorrect, an error results when you try to build with that key.

* iOS example:

  ```sh
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
  ```

* Android example:

  ```sh
  $ curl -u andrew.lunny@nitobi.com -d 'data={"key_pw":"password1","keystore_pw":"password2"}' -X PUT https://build.phonegap.com/api/v1/keys/android/2
  {
      "title":"Android Key",
      "default":false,
      "id":2,
      "alias":"release",
      "link":"/api/v1/keys/android/2",
      "locked":false
  }
  ```

<a class="anchor" id="_delete_https_build_phonegap_com_api_v1_apps_id"></a>

## `DELETE https://build.phonegap.com/api/v1/apps/:id`

Delete your application from PhoneGap Build, returning either a `202` (accepted) status, or `404` (if the app cannot be found):

```sh
$ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/apps/8
{
    "success":"app 8 deleted"
}
```

<a class="anchor" id="_delete_https_build_phonegap_com_api_v1_apps_id_collaborators_id"></a>

## `DELETE https://build.phonegap.com/api/v1/apps/:id/collaborators/:id`

Remove a collaborator from a project that you own:

```sh
$ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/apps/12/collaborators/13
{
    "success":"foo@bar.com removed from app 9"
}
```

<a class="anchor" id="_delete_https_build_phonegap_com_api_v1_keys_platform_id"></a>

## `DELETE https://build.phonegap.com/api/v1/keys/:platform/:id`

Delete a signing key from PhoneGap Build, returning either a `202` (accepted) status, or `404` (if the key cannot be found):

```sh
$ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v1/keys/android/8
{
    "success":"android key 8 deleted"
}
```
