---
title: Step 6: Taking a picture
url: app-stack/conference-memories/6-taking-picture
layout: subpage
---

<p class="sub-paragraph">Next up we need to be able to take a photo or load one from your devices photo library. In order to do that we'll need to add the cordova-plugin-camera and some UI elements.</p>

## Adding the Camera plugin

In order to take a photo we'll need to add the Cordova Camera plugin.

1. Enter the following command from your terminal to add the [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) plugin:

  ```sh
  $ phonegap plugin add cordova-plugin-camera --save
  ```

  <div class="alert--info">This plugin provides your app with device access to the camera and photo library.</div>

## Adding a Floating Action Buttons

Since our app can now take pictures we'll need to give our users a way to trigger the camera which we will do by adding a Floating Action Button.

1. Open up the **src/components/pages/Home.vue** file and in the **template** tag find the closing tag of the `f7-navbar` element:

   ```html
   </f7-navbar>
   ```

   and immediately after add the following html:

   ```html
   </f7-navbar>
   <f7-fab-speed-dial>
     <f7-fab-actions>
       <f7-fab-action close-speed-dial @click="onCamera">
         <i class="fa fa-camera"></i>
       </f7-fab-action>
       <f7-fab-action close-speed-dial @click="onPicture">
         <i class="fa fa-picture-o"></i>
       </f7-fab-action>
     </f7-fab-actions>
     <f7-fab>
       <f7-icon icon="icon-plus"></f7-icon>
       <f7-icon icon="icon-close"></f7-icon>
     </f7-fab>
   </f7-fab-speed-dial>
   ```

   This will add a floating action button to the bottom right of our `Home` page. When clicked it will open and give the user two options, take a picture with the camera or select one from the camera roll.

1. You probably noticed that we've got a couple of click handlers to get our pictures and we'll add those now to the **script** tag in the `methods` section which we will add:

   Right after the data function add a `,` then the `methods` property:

   ```js
   methods: {
     onCamera() {
       console.log('camera clicked');
       this.takePicture(Camera.PictureSourceType.CAMERA);
     },
     onPicture() {
       console.log('picture clicked');
       this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
     },
   }
   ```

   these method will be executed when our user clicks on the floating action button but it doesn't tell the whole story.

1. As you noticed in the above code we are calling `this.takePicture()` so we will also add the `takePicture` method immediately after the `onPicture` method:

   ```js
   takePicture(cameraSource) {
     navigator.camera.getPicture((picUri) => {
       console.log(picUri);
       this.processPicture(picUri);
     }, (message) => {
       console.log(`Failed because: ${message}`);
     }, {
       quality: 100,
       destinationType: Camera.DestinationType.FILE_URI,
       sourceType: cameraSource,
     });
   },
   ```

   Now we are calling the `getPicture` function on the `camera` object passing in an options object letting the device know we want the best quality picture to be stored on the file system. As long as the device is successfully able to take a picture the success callback will be invoked and we'll call `processPicture` which we will add next.

1. After the `takePicture` method we'll add `processPicture` method:

   ```js
   processPicture(picUri) {
     const user = JSON.parse(localStorage.getItem('user'));
     pictureStore.unshift({
       date: Date.now(),
       image: picUri,
       photographer: user.displayName,
     });
     localStorage.setItem('pictures', JSON.stringify(pictureStore));
   }
   ```

   `processPicture` is interesting as we are using the `pictureStore` array to store the list of all pictures the user has taken. We haven't setup `pictureStore` yet but we will in one of the next steps. Then we store a stringified representation of the array in `localStorage` so that when the user quits the app we won't lose track of their pictures on the file system.

1. Before we setup the `pictureStore` we need to do one more step in **Home.vue** so we don't run into any linter errors. so after the **script** tag we will have to include a comment to declare our globals:

   ```js
   /* global pictureStore Camera */
   ```

   For reference the entire script tag should look like this:

   ```html
   <script>
     /* global pictureStore Camera */

     export default {
       name: 'Home',
       data() {
         return {
           title: 'Home Page'
         };
       },
       methods: {
         onCamera() {
           console.log('camera clicked');
           this.takePicture(Camera.PictureSourceType.CAMERA);
         },
         onPicture() {
           console.log('picture clicked');
           this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
         },
         takePicture(cameraSource) {
           navigator.camera.getPicture((picUri) => {
             console.log(picUri);
             this.processPicture(picUri);
           }, (message) => {
             console.log(`Failed because: ${message}`);
           }, {
             quality: 100,
             destinationType: Camera.DestinationType.FILE_URI,
             sourceType: cameraSource,
           });
         },
         processPicture(picUri) {
           const user = JSON.parse(localStorage.getItem('user'));
           pictureStore.unshift({
             date: Date.now(),
             image: picUri,
             photographer: user.displayName,
           });
           localStorage.setItem('pictures', JSON.stringify(pictureStore));
         }
       }
     };
   </script>
   ```

1. Finally we'll open the **src/main.js** file and add the `pictureStore` property just under where we added the `loginTextStore` so:

   ```js
   // Stores
   window.loginTextStore = localStorage.getItem('user') ? 'Logout' : 'Login';
   ```

   becomes:

   ```js
   // Stores
   window.loginTextStore = localStorage.getItem('user') ? 'Logout' : 'Login';
   window.pictureStore = JSON.parse(localStorage.getItem('pictures')) || [];
   ```
