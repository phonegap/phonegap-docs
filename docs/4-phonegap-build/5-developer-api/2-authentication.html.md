---
title: API Authentication
url: phonegap-build/developer-api/authentication
layout: subpage
---

Version 1 supports two forms of authentication: basic authentication over HTTPS, and token authentication.

When using basic authentication, use your PhoneGap Build credentials (username and password) to authenticate each request:

```sh
$ curl -u andrew.lunny@adobe.com https://build.phonegap.com/api/v1/me
{
  "created_at":"2010-10-12T19:10:16Z",
  "updated_at":"2010-11-29T19:58:00Z",
  "username":"alunny",
  "email":"andrew.lunny@nitobi.com"
}
```

To use token authentication, use basic authentication to post to `/token` with your request, and the token returns in the response:

```sh
$ curl -u andrew.lunny@adobe.com -X POST -d "" https://build.phonegap.com/token
{
  "token":"ASTRINGTOKEN"
}
```

Then pass this token as a parameter for any call that you make:

```js
$ curl https://build.phonegap.com/api/v1/me?auth_token=ASTRINGTOKEN
{
  "username":"alunny",
  "email":"andrew.lunny@adobe.com"
}
```

Both forms of authentication are supported. All unauthenticated requests return a `401` (unauthorized) status code.

All the examples documented here use token authentication for clarity.

__NOTE:__ Users who registered using Github authentication may not have PhoneGap Build credentials, and therefore may not be able to use basic authentication. To retrieve an authententication token for your Github-linked account, go to __Edit Account__, on the top right of the site's navigation bar. Find the __Authentication Tokens__ section, where you can obtain, as well as create, reset, or delete your token. Note that resetting or deleting a token invalidates any further requests using the previous token.
