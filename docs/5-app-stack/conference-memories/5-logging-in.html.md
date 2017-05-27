---
title: Step 5: Logging In
url: app-stack/conference-memories/5-logging-in
layout: subpage
---

<p class="sub-paragraph">Now that we've cleared the deck we can start adding functionality to the app. In order to use some of the functionality that we are planning we'll need to authenticate with the [Adobe Creative Cloud](http://www.adobe.com/ca/creativecloud.html). We'll make use of the Adobe ID and application you registered in step 1.</p>

## Adding CreativeSDK plugins

Before we can use our Adobe ID to login to the application we will need to add the necessary plugins to authenticate our app and user with the Adobe Creative Cloud.

1. Enter the following command from your terminal to add the [phonegap-plugin-csdk-client-auth](https://github.com/CreativeSDK/phonegap-plugin-csdk-client-auth) plugin:

  ```sh
  $ phonegap plugin add phonegap-plugin-csdk-client-auth \
    --variable CSDK_CLIENT_ID_IOS=value_id \
    --variable CSDK_CLIENT_ID_ANDROID=value_id \
    --variable CSDK_CLIENT_SECRET_IOS=value_secret \
    --variable CSDK_CLIENT_SECRET_ANDROID=value_secret --save
  ```

  Replacing `value_id` with the client ID and `value_secret` with  the client secret you received in Prerequisites.

  <div class="alert--info">This plugin authenticates your app with the Adobe Creative Cloud so it can use the CreativeSDK.</div>

1. Now enter the following command from your terminal to add the [phonegap-plugin-csdk-user-auth](https://github.com/CreativeSDK/phonegap-plugin-csdk-user-auth) plugin:

   ```sh
   $ phonegap plugin add phonegap-plugin-csdk-user-auth --save
   ```

   <div class="alert--info">This plugin authenticates your user with the Adobe Creative Cloud so you can access data you've stored in the Creative Cloud.</div>

## Logging into the Creative Cloud

Now that we've included the plugins that will allow us to login to the Creative Cloud we can start writing the code. We'll be using `localStorage` to keep track of our user in this tutorial for simplicities sake.

1. Open the **src/main.js** file and we are going to add a couple of lines just before we initialize Vue.

   ```js
   // Stores
   window.loginTextStore = localStorage.getItem('user') ? 'Logout' : 'Login';
   ```

   We are going to save which text label should be shown depending if the user is logged in or logged out.

1. Next we'll have to modify our login link to show the correct string so open up the **src/components/LeftPanel.vue** file and find the element:

   ```html
   <f7-list-item
     title="Login"
     link-close-panel
   />
   ```

   and replace it with the following:

   ```html
   <f7-list-item
      :title="loginText"
      @click="login"
      link-close-panel
    />
   ```

   <div class="alert--info">Some new things to point our here are a couple of Vue.js short hand notations. You may notice the `:title="loginText"` which looks a bit weird but it is the same as saying `v-bind:title="loginText"`, that is we are going to bind the attribute `title` to the property `loginText` which we will soon setup. Also, you'll notice `@click="login"` which is a shorthand for `v-on:click="login"` which means anytime the element is clicked on we should call the `login` method.</div>

1. Of course none of the above changes will work until we define the reactive data property `loginText` and define the `login` method. Scroll down the file until you get to the **script** element and look at the `data` method as we are going to add a new property to object returned by `data`. So:

   ```js
   data () {
     return {
       isMaterial: window.isMaterial,
       isiOS: window.isiOS
     };
   }
   ```

   becomes:

   ```js
   data () {
     return {
       isMaterial: window.isMaterial,
       isiOS: window.isiOS,
       loginText: window.loginTextStore
     };
   }
   ```

   Now anytime `window.loginTextStore` value changes our link text will automatically be updated.

1. Finally, for this file we'll need to create the `login` method. However, in order to do this we need to add a new property to the default exports called `methods`. Inside of `methods` is where we will hold all the methods we need to provide login functionality.

   Right after the data function add a `,` then the `methods` property:

   ```js
   methods: {
     login (evt) {
       const loggedInUser = localStorage.getItem('user');
       if (!loggedInUser) {
         CSDKUserAuth.login((user) => {
           console.log('login success');
           window.loginTextStore = 'Logout';
           localStorage.setItem('user', JSON.stringify(user));
         }, () => {
           console.log('login failed');
         });
       } else {
         CSDKUserAuth.logout((user) => {
           console.log('logout success');
           window.loginTextStore = 'Login';
           localStorage.removeItem('user');
         }, () => {
           console.log('logout failed');
         });
       }
     }
   }
   ```

1. But wait, what's this:

   ![](/images/conference-memories/no-undef-error.png)

   Our linter has caught an error because we've never defined `CSDKUserAuth` so after the **script** tag we will have to include a comment to declare `CSDKUserAuth` as a global.

   ```js
   /* global CSDKUserAuth */
   ```

   For reference the entire script tag should look like this:

   ```html
   <script>
     /* global CSDKUserAuth */
     export default {
       name: 'LeftPanel',
       data () {
         return {
           isMaterial: window.isMaterial,
           isiOS: window.isiOS,
           loginText: window.loginTextStore
         };
       },
       methods: {
         login (evt) {
           const loggedInUser = localStorage.getItem('user');
           if (!loggedInUser) {
             CSDKUserAuth.login((user) => {
               console.log('login success');
               window.loginTextStore = 'Logout';
               localStorage.setItem('user', JSON.stringify(user));
             }, () => {
               console.log('login failed');
             });
           } else {
             CSDKUserAuth.logout((user) => {
               console.log('logout success');
               window.loginTextStore = 'Login';
               localStorage.removeItem('user');
             }, () => {
               console.log('logout failed');
             });
           }
         }
       }
     };
   </script>
   ```
