---
title: OAuth
url: references/phonegap-build/developer-api/oauth
layout: subpage
expand: build-developer
---

The Oauth authorization protocol allows third party applications access user information from PhoneGap Build without ever seeing the user's login information. Client Applications are pre-registered with PhoneGap Build, and users can view and manage which applications are interacting with PhoneGap Build on their behalf.

If you're looking for documentation on simple token authentication, [go here](../authentication). Note that we don't recommend this for integrating production applications with the PhoneGap Build Developer API.

- [Client Application Registration](#client-application-registration)
- [Web Application Flow](#web-application-flow)
- [Non Web Application Flow](#non-web-application-flow)

### Client Application Registration

As an application developer, you first need to [register your client application with Build](https://build.phonegap.com/people/edit):


- **Name**: A suitable display name for your application.
- **Main Application Url**: A url where a user can go to see what this application is.
- **Callback Url**: The url we'll redirect to after a user allows your application to interact with your Build account. More info on this below.

We'll generate a couple of fields for you:

- **Client ID**: A unique identifier that you'll include in requests, identifying your application.
- **Client Secret**: Don't share this, it will verify that the request is indeed from your application.

### Web Application Flow

You've registred your application and are ready to hook it into PhoneGap Build. The first thing you'll do is redirect users to PhoneGap Build where we'll ask them if they want to allow your app to access their resources:
    
    GET https://build.phonegap.com/authorize?client_id=abcdef

If they allow, we'll redirect to the Callback Url that you indicated when you registered your application, along with a `code` parameter. If they deny, we'll redirect to your Callback Url with an error parameter (`error=authorization_refused`).

Now that the user has allowed your application to access Build, you need to request an access token from us:

    POST https://build.phonegap.com/authorize/token?client_id=abcdef&client_secret=123456&code=a1b2c3

If those params fail to check out, you'll get an error with the following format:

    { "error" : "invalid request" }

If they do check out, we'll respond with a json object containing your access token:

    { "access_token": "xyz123" }

Save it.

Now, you can make requests to PhoneGap Build on behalf of this user:

    GET https://build.phonegap.com/api/v1/me?access_token=xyz123

### Non Web Application Flow

Its possible that you're creating an application that doesn't include a web server or browser to allow users to authorize your application to access the PhoneGap Build API. Don't fret, there is a solution. Users will obtain a simple auth token from Build (in their [account settings](https://build.phonegap.com/people/edit)), which they'll then pass to your application. If they give that token to your application, they have authorized it to access Build. You'll then exchange that simple auth token for an Oauth client access token. Of course, you'll still need to register your application with Build as above.

    POST https://build.phonegap.com/authorize?client_id=abcdef&client_secret=123456&auth_token=789hij

For example, via curl:
  
    curl -X POST https://build.phonegap.com/authorize?client_id=abcdef&client_secret=123456&auth_token=789hij

If those params fail to check out, you'll get an error with the following format:

    { "error" : "Invalid authentication token." }

If they do check out, we'll respond with a json object containing your access token:

    { "access_token": "xyz123" }

And now you can make your requests on behalf of the user.

    GET https://build.phonegap.com/api/v1/me?access_token=xyz123
