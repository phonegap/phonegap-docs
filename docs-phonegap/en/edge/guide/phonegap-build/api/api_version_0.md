# API v0

<section class="module">

## Version 0

Version 0 (v0) of the API is a preview release for the beta version of PhoneGap Build. Although we are keeping this release online for existing clients, it will not receive any further updates. If you are developing a new application to access PhoneGap Build, use [the latest version of the API (currently v1)](/docs/api).

### Authentication

v0 currently authenticates through HTTPS with basic authentication. We are investigating other authentication options, particularly for allowing users to authorize apps/dev tools with their PhoneGap Build credentials (the present author favors OAuth 2).

All unauthenticated requests return a `401` (unauthorized) status code.

</section>
<section class="module">

## JSON

All successful requests return either a JSON-encoded string or a binary file. All failing requests return a JSON-encoded string of the following form (with an appropriate status code):

    {"error":"some error message"}

When using the API, check the status code returned; if it's not 200, check the error field on the parsed response, a la:

    if (res.status != 200)
        console.log(JSON.parse(res.body).error)

</section>

# API Docs

<section class="module">

## Read API

### GET https://build.phonegap.com/api/v0/me

Get a JSON-encoded representation of the authenticated user.

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/me</strong></pre>
    {"created_at":"2010-10-12T19:10:16Z","updated_at":"2010-11-29T19:58:00Z",
      "username":"alunny","email":"andrew.lunny@nitobi.com"}

### GET https://build.phonegap.com/api/v0/apps

Get a JSON-encoded representation of the authenticated user's apps.

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps</strong></pre>
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

Get a JSON-encoded representation of a single app (belonging to the authenticated user).

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50</strong></pre>
    {"created_at":"2010-11-09T20:36:58Z","title":"alunny's Amazing App",
     "updated_at":"2010-11-23T22:53:12Z","symbian_status":"symbian complete",
     "repo_url":"http://github.com/alunny/phonegap-start.git",
     "blackberry_status":"blackberry pending","android_status":"error",
     "webos_status":"compiling webos project","id":50,"icon":"icon.png",
     "version":99.999,"package":"com.alunny.amazing","person_id":1,
     "desc":"An Amazing app by alunny"}

If the app does not exist or belongs to another user, an error message is returned with status code `404`:

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/54</strong></pre>
    {"error":"app #54 not available"}

### GET https://build.phonegap.com/api/v0/apps/:id/:icon

Get the icon file of an app.

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50/icon &gt; icon.png</strong></pre>

If there's no icon available, an error message is returned with status code `404`:

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/icon</strong></pre>
    {"error":"No icon available for app #52"}

### GET https://build.phonegap.com/api/v0/apps/:id/:platform

Download the app package for the given platform; available platforms right now are `android`, `blackberry`, `symbian` and `webos`.

The request actually returns a redirect to the app package itself--ensure your API client follows redirects to download the app.

<pre><strong>$ curl -Lu andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/50/android &gt; app_50.apk</strong></pre>

If the app package (for the specified platform) is unavailable, an error message is returned with status code `404`:

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/52/android</strong></pre>
    {"error":"App #52 for android error"}

### GET https://build.phonegap.com/api/v0/keys/

Get a list of signing keys that have been uploaded to build

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/keys/</strong></pre>
    {"ios":[{"title":"Test Key","updated_at":"2011-07-07T15:51:23-07:00",
    "id":2,"mobile_provision":"test.mobileprovision",
    "cert_name":"Certificates.p12"}],"blackberry":[],"android":[]}

If no keys have been uploaded the following will be returned

    {"ios":[],"blackberry":[],"android":[]}

To get a specific platform's keys use

<pre><strong>$ curl -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/keys/:platform</strong></pre>

If the app does not exist or belongs to another user, an error message is returned with status code `404`:

</section>
<section class="module">

## Write API

### POST https://build.phonegap.com/api/v0/apps

Create a new app. Requires a title parameter to be passed, and either the URL of a public git/svn repository, or an `index.html` or project zip file to be sent.

With a repo_url:

<pre><strong>$ curl -u andrew.lunny@nitobi.com -d 'data={"title":"New App","repo":"http://github.com/alunny/phonegap-start.git"}' \
  https://build.phonegap.com/api/v0/apps</strong></pre>
    {"created_at":"2010-11-29T21:13:26Z","title":"alunny's Amazing App",
    "updated_at":"2010-11-29T21:13:26Z","symbian_status":"pending",
    "repo_url":"http://github.com/alunny/phonegap-start.git",
    "blackberry_status":"pending","android_status":"pending",
    "webos_status":"pending","id":55,"icon":"icon.png","version":"99.999",
    "package":"com.alunny.amazing","person_id":1,
    "desc":"An Amazing app by alunny"}

With a file (note that if you're using curl, you'll want the `-F` option, not `-d`):

<pre><strong>$ curl -F file=@index.html -F 'data={"title":"Another App"}' -u andrew.lunny@nitobi.com \
  https://build.phonegap.com/api/v0/apps</strong></pre>
    {"created_at":"2010-11-29T21:52:32Z","title":"Another App",
    "updated_at":"2010-11-29T21:52:32Z","symbian_status":"pending",
    "repo_url":null,"blackberry_status":"pending","android_status":"pending",
    "webos_status":"pending","id":56,"icon":null,"version":null,
    "package":null,"person_id":1,"desc":null}

Again, JSON errors if anything goes wrong:

<pre><strong>$ curl -u andrew.lunny@nitobi.com -d 'data={"title":"New App"}' https://build.phonegap.com/api/v0/apps</strong></pre>
    {"error":"Need either a repo url or a file"}

An error with the request returns status code `400` (bad request) - the JSON string details what changes have to be made. If status code `500` is returned, an internal error has occurred - please contact us about this request.

### POST https://build.phonegap.com/api/v0/apps/:id/:icon

Set an icon file for the given app:

<pre><strong>$ curl -F file=@icon.png -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/56/icon</strong></pre>
    {"created_at":"2010-11-29T21:52:32Z","title":"Another App",
    "updated_at":"2010-11-29T22:24:26Z","symbian_status":"symbian complete",
    "repo_url":null,"blackberry_status":"pending","android_status":"pending",
    "webos_status":"webos complete","id":56,"icon":"icon.png",
    "version":null,"package":null,"person_id":1,"desc":null}

A JSON error with status code `400` is returned if there is an error in the request.

### POST https://build.phonegap.com/api/v0/apps/:id/push

Update the current app from its source repo - designed, among other things, to work with [Github's post-receive hooks](http://help.github.com/post-receive-hooks/) functionality. Right now, the post data is ignored - I'm including some dummy data so curl agrees to set a Content-Length header.

<pre><strong>$ curl -X POST -d data=dummy -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/55/push</strong></pre>
    {"created_at":"2010-11-29T21:13:26Z","title":"alunny's Amazing App",
    "updated_at":"2010-11-29T22:28:33Z","symbian_status":"pending",
    "repo_url":"http://github.com/alunny/phonegap-start.git",
    "blackberry_status":"pending","android_status":"pending",
    "webos_status":"pending","id":55,"icon":"icon.png","version":99.999,
    "package":"com.alunny.amazing","person_id":1,
    "desc":"An Amazing app by alunny"}

If the app is not associated with a repository, status code `400` is returned. If the app cannot be found, status code `404` is returned. If there is an internal error, `500` is returned:

<pre><strong>$ curl -X POST -d data=dummy -u andrew.lunny@nitobi.com https://build.phonegap.com/api/v0/apps/56/push</strong></pre>
    {"error":"app #56 is not repo backed"}

### PUT https://build.phonegap.com/api/v0/apps/:id

Update the meta-data associated with your app:

<pre><strong>$ curl -u andrew.lunny@nitobi.com -X PUT -d 'data={"title":"New Title"}' \
  https://build.phonegap.com/api/v0/apps/56</strong></pre>
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

<pre><strong>$ curl -F profile_file=@example.mobileprovision -F cert_file=@example.p12 -F 'data={"title":"Example Key", "password":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/ios/</pre></strong>

Will produce a response similar to:

    {"title":"Example Key","updated_at":"2011-07-08T10:27:01-07:00",
    "id":3,"cert_name":"example.p12","mobile_provision":"example.mobileprovision"}

#### Android Example

The following example:

<pre><strong>$ curl -F key_file=@example.keystore -F 'data={"title":"Example Key","alias":"example alias", "key_pw":"test", "keystore_pw":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/android/</pre></strong>

Will produce a response similar to:

    {"title":"Example Key","updated_at":"2011-07-08T14:07:09-07:00","id":1}

#### Blackberry Example

The following example:

<pre><strong>curl -F csk_file=@example.csk -F db_'data={"title":"example key", "password":"test"}' -u andrew.lunny@nitobi.com http://build.phonegap.com/api/v0/keys/blackberry/</pre></strong>

Will produce a response similar to:

    {"title":"example key","updated_at":"2011-07-08T10:48:18-07:00","id":1}

If the app does not exist or belongs to another user, an error message is returned with status code `404`:

### DELETE https://build.phonegap.com/api/v0/apps/:id

Delete the app. Sad to see you go :(

<pre><strong>$ curl -u andrew.lunny@nitobi.com -X DELETE https://build.phonegap.com/api/v0/apps/56</strong></pre>
    {"success":"app #56 destroyed"}

Again, `404` error if the app cannot be found.

</section>
