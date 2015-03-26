<link href="../css/styles.css" rel="stylesheet">
<link href="../css/bootstrap.css" rel="stylesheet">

## Step 4: Serve and Preview your App
<hr>
You can use the *PhoneGap Developer App* paired with the *PhoneGap Desktop App* to immediately preview your app on a device without installing platform SDKs, registering devices, or compiling code.

The PhoneGap Desktop App starts a small web server to host your project and returns the server address for you to use from the PhoneGap Developer App running on your mobile device. 

1. Ensure you are within your project directory created in the previous step and type `$ phonegap serve`. Note the server address the app is listening on in the output received from running the command (192.168.1.76:3000 in this example): 

		$ phonegap serve
		[phonegap] starting app server...
		[phonegap] listening on 192.168.1.76:3000
		[phonegap]
		[phonegap] ctrl-c to stop the server
		[phonegap]
2. Now go to your mobile device where the PhoneGap Developer App is running, enter the server address on the main screen and tap **Connect**. 
   <div class="callout callout-help"> <button class="btn-help">Tip</button> Tap directly on the server address displayed in the terminal screen of the PhoneGap Developer app to edit it. </div>

   <img src="../images/phonegap-developer-app-pairing.png" />
   
   A connection is created between your mobile device and the computer where the app is running. Once connected, you should see the app running like the screenshot below:

   <img src="../images/dev-app-preview.jpg" width="250" height="523">
    
  <div class="callout callout-help"> <button class="btn-help">Tip</button> Gestures can be used while you're previewing your app. To return to the main screen use a 3-finger tap and a 4-finger tap will force refresh your app. </div>
3. Now let's make an update to the project. Using your favorite text editor, open up the **index.html** file located within the **www** folder of your project (for instance **/appSample/www/index.html**). 

   Update the line:
	`<h1>PhoneGap</h1>`
to
	`<h1>Hello PhoneGap</h1>` and save it in your editor.
4. Now check your mobile device to see the text automatically update. 
    
    <img src="../images/dev-app-code-update.jpg" width="250" height="523" />




