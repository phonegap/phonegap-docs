---
title: "Embedding the Webview"
url: tutorials/develop/1-embed-webview/android
layout: subpage
tabs:
  - label: iOS
    url: tutorials/develop/1-embed-webview/ios
  - label: Android
    url: tutorials/develop/1-embed-webview/android
---

## Options

There are two options available to embed an Android WebView into an existing
native Android app.

- [IntelliJ Plugin for Android Studio and JetBrains](#intellij)
- [Manual Approach](#manual)

<a class="anchor" id="intellij"></a>

## Option 1: IntelliJ Plugin for Android Studio and JetBrains

### Step 1: Create an Android project

> You can skip this step if you have an existing Android project.

1. Create a new Android project:
  - Set _Application name_ to "ComponentCase"
  - Set _Company Domain_ to "phonegapday.com"
  - Set _Package name_ to "com.phonegapday"
  - Click _Next_

  ![step1](/images/tutorials/develop/embed-webview/android/step1.png)
2. On the _Target Android Devices_ screen:
  - Select "Phone and Tablet"
  - Set _Minimum SDK_ to "API 21: Android 5.0 (Lollipop)"
  - Click _Next_

  ![step2](/images/tutorials/develop/embed-webview/android/step2.png)
3. On the _Add an Activity to Mobile_ screen:
  - Select "Navigation Drawer Activity"
  - Click _Next_

  ![step3](/images/tutorials/develop/embed-webview/android/step3.png)
4. On the _Customize the Activity_ screen:
  - Click _Finish_

  ![step4](/images/tutorials/develop/embed-webview/android/step4.png)
5. Finally, we can clean up the new project:
  1. Open `res/menu/activity_main_drawer.xml` and ensure it matches:
  ```xml
      <?xml version="1.0" encoding="utf-8"?>
      <menu xmlns:android="http://schemas.android.com/apk/res/android">
          <group android:checkableBehavior="single">
              <item
                  android:id="@+id/nav_webview"
                  android:title="Webview" />
              <item
                  android:id="@+id/nav_list_webview"
                  android:title="List (WebView)" />
              <item
                  android:id="@+id/nav_list_native"
                  android:title="List (Native)" />
          </group>
      </menu>
  ```
  2. Open `res/layout/app_bar_main.xml`:
    - Delete the `FloatingActionButton`
  3. Delete all `ic_menu` from `res/drawable`
  4. Open `res/layout/nav_header_main.xml`
    - Update the first TextView's text to "ComponentCase"
    - Delete the ImageView and the other TextView
  5. Open `res/values/dimens.xml`
    - Update `nav_header_height` to '100dp'
  6. Open 'MainActivity'
    - Delete lines 26-33 (`FloatingActionButton`)
    - Ensure the `onNavigationItemSelected` method matches:
    ```java
        public boolean onNavigationItemSelected(MenuItem item) {
            // Handle navigation view item clicks here.
            int id = item.getItemId();

            if (id == R.id.nav_webview) {
                // Handle the webview action
            } else if (id == R.id.nav_list_webview) {
                // Handle the webview (list) action
            } else if (id == R.id.nav_list_native) {
                // Handle the native (list) action
            }

            DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
            drawer.closeDrawer(GravityCompat.START);
            return true;
        }
    ```

### Step 2: Setup the Cordova WebView in the Android project

1. Go to cordova-android/framework and run `android update project -p .` then run `ant jar`. There should be a `cordova-5.2.0-dev.jar` generated in the same folder.
2. Copy cordova-5.2.0-dev.jar to your `app/libs` folder.
3. Select `Project Files` on the left hand pane in Android Studio, right click on `cordova-5.2.0-dev.jar` and click `Add as Library`, click Ok.
3. Currently there is no easy way to install plugins in an Android Studio project. We will need to create a cordova android project, install plugins and then copy necessary files to the right location in our project. Run the following commands:
  `cordova create myApp`
  `cd myApp`
  `cordova platform add android`
  `cordova plugin add cordova-plugin-device`
  `cordova plugin add cordova-plugin-console`
  `cordova plugin add /path/to/cordova-plugin-pgdayeu16`
4. We will now create some folders that are used by cordova.
  1. Right click on `app` in `Project` and select `New` > `Folder` > `Assets folder`
  2. Right click on `assets` and select `New` > `Directory` and name it `www`
  3. Copy everything from `www-shared/www` to this newly created `assets/www`
  4. Right click on `res` and select `New` > `Directory` and name it xml
  5. Copy `/path/to/your/cordova_android_project/platforms/android/res/xml/config.xml` to your `ComponentCase/app/src/main/res/xml`
  6. Copy `cordova.js`, `cordova_plugins.js` and `plugins/` from `/path/to/your/cordova_android_project/platforms/assets/www/` to your `ComponentCase/app/src/main/assets/www`
  7. Copy `/path/to/your/cordova_android_project/platforms/android/src/org` to your `ComponentCase/app/src/main/java`
  8. Copy `/path/to/your/cordova_android_project/platforms/android/src/com/phonegapday/PGDayEU16Plugin.java` to your `ComponentCase/app/src/main/assets/src/main/java/com/phonegapday`

### Step 3: Add the Cordova WebView

1. open `res/layout/content_main.xml` and replace the TextView with the following

  ```XML
    <org.apache.cordova.engine.SystemWebView
        android:id="@+id/WebViewComponent"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    </org.apache.cordova.engine.SystemWebView>
  ```
2. Add the following attributes to `MainActivity.java`. Make sure you fix the imports.

  ```Java
    private String TAG = "ComponentWrapper";
    private SystemWebView webView;
    private CordovaWebView webInterface;
    private CordovaInterfaceImpl stupidface = new CordovaInterfaceImpl(this);
  ```
3. Add the following lines at the bottom of your `onCreate` method

  ```Java
  //Set up the webview
  ConfigXmlParser parser = new ConfigXmlParser();
  parser.parse(this);

  webView = (SystemWebView) findViewById(R.id.WebViewComponent);
  webInterface = new CordovaWebViewImpl(new SystemWebViewEngine(webView));
  webInterface.init(stupidface, parser.getPluginEntries(), parser.getPreferences());
  webView.loadUrl(parser.getLaunchUrl());
  ```

4. These methods are required for `CordovaWebView` to work properly. Add them and fix imports

  ```Java
    @Override
    public void onDestroy()
    {
        webInterface.handleDestroy();
        super.onDestroy();
    }
  
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        stupidface.onActivityResult(requestCode, resultCode, intent);
    }

    public void onRequestPermissionsResult(int requestCode, String permissions[],
                                           int[] grantResults) {
        try
        {
            stupidface.onRequestPermissionResult(requestCode, permissions, grantResults);
        }
        catch (JSONException e)
        {
            Log.d(TAG, "JSONException: Parameters fed into the method are not valid");
            e.printStackTrace();
        }

    }

  ```

### Step 4: Add ListView to control the WebView

1. Add the following line to your `res/values/strings.xml`

  ```XML
  <string name="add_bookmark">Add Bookmark</string>
  ```
1. Right click on `res/layout` and select `New` -> `XML` -> `Layout XML File`. Name it `bookmark_main`. Make sure it looks like this

  ```XML
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:id="@+id/bookmarkLayout"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical"
      android:visibility="gone"
      android:weightSum="1">

      <ListView
          android:id="@+id/bookmarkView"
          android:layout_width="match_parent"
          android:layout_height="465dp"
          android:layout_gravity="center_horizontal" />

      <EditText
          android:id="@+id/bookmark"
          android:inputType="textUri"
          android:layout_width="fill_parent"
          android:layout_height="wrap_content"
          android:imeActionLabel="@string/add_bookmark" />
  </LinearLayout>
  ```
1. Add the following attributes to your `MainActivity.java`

  ```Java
  // need this for page navigation
  private String[] urls = new String[2];
  private ListView listView;
  private LinearLayout bookmarkLayout;
  private ArrayList<String> bookmarks = new ArrayList<String>();
  ```
2. Set up the native ListView by adding the following lines to your `onCreate` method. Fix imports

  ```Java
  // Set up the bookmark view
  bookmarks.add("http://google.com"); // dummy bookmark
  bookmarkLayout = (LinearLayout) findViewById(R.id.bookmarkLayout);
  listView = (ListView) findViewById(R.id.bookmarkView);
  if(listView != null) {
      listView.setAdapter(new ArrayAdapter<String>(this,
              android.R.layout.simple_list_item_activated_1,
              android.R.id.text1,
              bookmarks));
  }
  EditText bookmark = (EditText)findViewById(R.id.bookmark);
  if(bookmark != null) {
    bookmark.setOnEditorActionListener(new TextView.OnEditorActionListener() {
        @Override
        public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
            if (event != null && (event.getKeyCode() == KeyEvent.KEYCODE_ENTER)) {
                String text = v.getText().toString();
                addItem(text);
                v.setText("");
                InputMethodManager in = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                in.hideSoftInputFromWindow(
                        v.getApplicationWindowToken(),
                        InputMethodManager.HIDE_NOT_ALWAYS);
            }
            return false;
        }
    });
  }
  ```
3. Add the following methods

  ```Java
  protected ArrayList<String> getBookmarks() {
      return bookmarks;
  }

  protected void addItem(String item) {
      if(item != null) {
          bookmarks.add(item);
          ((BaseAdapter)listView.getAdapter()).notifyDataSetChanged();
      }
  }

  ```
3. Add this line to your `res/layout/content_main.xml`

  ```XML
  <include layout="@layout/bookmark_main"/>
  ```
4. Add these lines at the bottom of your `onCreate` method

  ```Java
  urls[0] = parser.getLaunchUrl();
  urls[1] = urls[0].replace("index.html", "listeditor.html");
  webView.loadUrl(urls[0]);
  ```
5. Make sure your `onNavigationItemSelected` looks like this

  ```Java
  public boolean onNavigationItemSelected(MenuItem item) {
      // Handle navigation view item clicks here.
      int id = item.getItemId();

      if (id == R.id.nav_webview) {
          bookmarkLayout.setVisibility(View.GONE);
          webView.setVisibility(View.VISIBLE);
          webView.loadUrl(urls[0]);
      } else if (id == R.id.nav_list_webview) {
          bookmarkLayout.setVisibility(View.GONE);
          webView.setVisibility(View.VISIBLE);
          webView.loadUrl(urls[1]);
      } else if (id == R.id.nav_list_native) {
          bookmarkLayout.setVisibility(View.VISIBLE);
          webView.setVisibility(View.GONE);
      }

      DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
      drawer.closeDrawer(GravityCompat.START);
      return true;
  }
  ```
6. Make sure to add this attribute to your `<activity>` tag in your `AndroidManifest.xml`

  ```
  android:windowSoftInputMode="adjustPan"
  ```
7. To avoid seeing weird `eglCodecCommon` errors in the console add this to your filter: `^(?!eglCodecCommon)` 

<a class="anchor" id="manual"></a>

## Option 2: Creating Apps with PhoneGap and Android Native Components

In this guide we'll walk through the basic steps needed to create a native hybrid Android app that has elements of both native Android components and a Cordova webview. For more information about why you might choose this approach, read [this blog post](http://phonegap.com/blog/2015/03/12/mobile-choices-post1/).

### Requirements:

- [Android Studio](http://developer.android.com/tools/studio/index.html)
- [Plugman](https://github.com/apache/cordova-plugman)

### Reference App

We'll use this [sample application](https://github.com/phonegap/phonegap-sample-hybrid-android) for reference throughout the tutorial. It contains two views; a Cordova view and a native view. The final sample app will have a button on the Cordova webview that will add an item to a list in the native view to show how to communicate between the web and native views. The sample also uses a couple other Cordova plugins to show how they're installed and for further reference use.

### Step 1: Create a Base Cordova Project

Most developers use the PhoneGap or Cordova CLI to create their projects, however for this type of project it's not recommended since we are only working with the Android platform project specifically and we don't want to rebuild or overwrite the platform level code each time we run. Instead we'll use the [cordova-android](https://github.com/apache/cordova-android) project itself. (This is the same project used from the CLI when you add the Android platform).

Begin by cloning or downloading the zip file for the [cordova-android](https://github.com/apache/cordova-android) Apache Cordova project for Android. Run the following command to execute the `create` script from the directory containing the [cordova-android](https://github.com/apache/cordova-android) base project you cloned or unzipped locally to create the default **Hello Cordova** project. (If you unzipped into your user directory then you should run it from there).

```sh
$ cordova-android/bin/create HybridAndroidApp org.sample.hybridandroidapp
```

You will see output that looks like the following:

```sh
HybridAndroidApp
Creating Cordova project for the Android platform:
  Path: HybridAndroidApp
  Package: org.example.hybridandroidapp
  Name: HybridAndroidApp
  Activity: MainActivity
  Android target: android-22
Copying template files...
Android project created with cordova-android@4.1.0-dev
```

### Step 2: Add Plugins

Next use [plugman](https://github.com/apache/cordova-plugman) to add any desired plugins. Plugman is the tool used to work with Cordova plugins when we're not using a CLI specifically. While still on the command line, `cd` into the root project created above:

```sh
$ cd HybridAndroidApp
```

Now add plugins using `plugman` from the command line of the root project with the syntax below. For this sample app we'll add the following set of plugins:

```sh
$ plugman install --platform android --project . --plugin cordova-plugin-whitelist
$ plugman install --platform android --project . --plugin cordova-plugin-device
$ plugman install --platform android --project . --plugin nl.x-services.plugins.toast
```

### Step 3: Import the project into Android Studio

Go to **File -> Import Project** and select the root **HybridAndroidApp** project created above. Allow the Gradle Sync to occur by clicking Ok in the dialog that pops up:

 ![](/images/gradle-ok.png)

<div class="alert--warning">Stop and run the app now to ensure you see the default Hello Cordova app running and the DEVICE READY message before moving on.</div>

### Step 4: Create a layout for a native view

Next create a layout resource file to represent a native list view. The layout resource is an xml file that defines how a view will look. It will be used in the `MyListActivity.java` Class created in the next step.

To create a layout, right click on the **res** folder in the project navigator on the left and then select the **New -> Android Resource Directory** option. In the dialog popup, select **layout** for the Directory name and Resource type and leave Source set to **main**.

 ![](/images/res-folder.png)

 ![](/images/layout-folder.png)

Now right click on the new **layout** folder in the project navigator and select **New -> Layout Resource** file. Put in a name of `activity_list` and leave the Root element and Directory name as is.

 ![](/images/layout-resource.png)

Paste in the following content to represent a simple list view. We'll use this list view to add items when pressing a button from the Cordova view:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:orientation="vertical" android:layout_width="match_parent"
  android:layout_height="match_parent">
  <ListView
    android:id="@android:id/list"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
  />
</LinearLayout>
```

### Step 5: Create a Native List Activity

Now we need a native `Activity` class to represent the logic behind this view.  Based on the android docs, an activity is a single, focused thing a user can do. Almost all activities interact with the user, so the `Activity` class takes care of creating a window for your UI. Create a new Java Class called `MyListActivity` in your project's `java/<package-name>` folder at the same level as the `MainActivity` class. In the sample case it's under `org.sample.hybridandroidapp`. Paste in the following below the `package` declaration and save it.

```java
import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import java.util.ArrayList;

public class MyListActivity extends ListActivity {

  ArrayList<String> list = new ArrayList<String>();

  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    /** Setting a custom layout for the list activity */
    setContentView(R.layout.activity_list);

    Intent intent = this.getIntent();

    if (intent.hasExtra("items")) {
      list = intent.getExtras().getStringArrayList("items");
    }
    /** The adapter to manage the data for the list **/
    ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, list);

    /** Setting the adapter to the ListView */
    setListAdapter(adapter);

    setResult(RESULT_OK, intent);
    }
  }
```

Note the line `setContentView(R.layout.activity_list);`.
This is the line where we specify the layout view to associate with this `Activity`.

### Step 6: Add to the AndroidManifest.xml

In this step we'll add our new `Activity` to the `AndroidManifest.xml`. Open the `AndroidManifest.xml` in the root of your project (or it may be listed in Android Studio under a **manifests** folder depending on your view) and insert an &lt;activity&gt; element for `MyListActivity` in the &lt;application&gt; element as shown below, right below the `MainActivity` declaration.

```xml
<activity
  android:name=".MyListActivity"
  android:label="MyListActivity">
</activity>
```

### Step 7: Cordova to Native Communication

### Hybrid Plugin

In this section we'll use a custom plugin to communicate between the native and cordova views. You can go through the steps below to create your own plugin, or install or clone it from [here](https://github.com/hollyschinsky/HybridBridgePlugin.git) for use or if you want to skip the plugin creation process for now and move on to [Step 8](#step8).

<div class="alert--tip">**TIP:** To directly install it to your project, use the following command from your hybrid android root:

```sh
$ plugman install --platform android --plugin https://github.com/hollyschinsky/HybridBridgePlugin.git --project .
```

</div>

#### Plugin Create Steps (Optional)

1. Create a new folder somewhere outside of your hybrid android project named **HybridBridgePlugin** with two subdirectories named `src` and `www`.

1. Next, navigate into the `www/js` folder and create a JavaScript file for the plugin interface named `HybridBridge.js`. Insert the following code:

  ```js
  var exec = require('cordova/exec'),
      cordova = require('cordova');

  function HybridBridge() {

  }
  HybridBridge.prototype.addItem = function(item, classname, successCallback, errorCallback) {
      exec(successCallback, errorCallback, "HybridBridge", "addItem", [item, classname]);
  };

  module.exports = new HybridBridge();
  ```

1. Now create folders to reflect your Java package as subdirectories of the `src` folder (`src/org/sample/hybrid`). Navigate into `src/org/sample/hybrid` and create the Java interface for the plugin in a file named `HybridBridge.java`. Insert the following code:

  ```java
  package org.sample.hybrid;

  import android.content.Context;
  import android.content.Intent;

  import org.apache.cordova.CallbackContext;
  import org.apache.cordova.CordovaPlugin;
  import org.json.JSONArray;
  import org.json.JSONException;

  import java.util.ArrayList;

  public class HybridBridge extends CordovaPlugin {
    public ArrayList itemsList = new ArrayList();
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
      try {
        if (action.equals("addItem")) {
          String item = args.getString(0);
          String className = args.getString(1);
          Context context = cordova.getActivity().getApplicationContext();
          Intent intent = new Intent(context,Class.forName(className));
          itemsList.add(item);
          intent.putStringArrayListExtra("items", itemsList);
          cordova.startActivityForResult(this,intent,1);
          callbackContext.success();
          return true;
        }
        callbackContext.error("Invalid action");
        return false;
      } catch(Exception e) {
        System.err.println("Exception: " + e.getMessage());
        callbackContext.error(e.getMessage());
        return false;
      }
    }
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
      // Handle a result here if one set in the Activity class started
      System.out.println("Activity Result: " + resultCode); //-1 is RESULT_OK
      if (resultCode==Activity.RESULT_OK) {
        System.out.println("All good!");
      }
    }
  }
  ```

  <div class="alert--info">**NOTE:** The `execute` function will create an android `Intent` for the fully qualified name of the `Activity` class specified in the parameter. In our sample we will pass in the name of our List Activity class: "org.sample.hybridandroidapp.MyListActivity" and the code will resolve it to the class to be started. The code also adds the latest item to the `ArrayList` of items being managed for that view and passes in the updated list as an extra to be accessed from the `Intent`.</div>

1. Cordova plugins use a `plugin.xml` file to describe their metadata so they can be added via plugman and submitted to the registry for others to use. In the root of your **HybridBridgePlugin** folder create a file named `plugin.xml` with the following text, replacing with your own plugin details, GitHub repo etc.

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
      xmlns:android="http://schemas.android.com/apk/res/android"
      id="cordova-plugin-hybrid"
      version="1.0.0">
    <name>HybridBridge</name>

    <description>
      Simple hybrid bridge example
    </description>

    <author>Your Name</author>

    <license>MIT</license>
    <keywords>Hybrid, Embedded </keywords>

    <engines>
      <engine name="cordova" version=">=3.0.0"/>
    </engines>

    <js-module src="www/HybridBridge.js" name="HybridBridge">
      <clobbers target="HybridBridge" />
    </js-module>

    <!-- android -->
    <platform name="android">
      <config-file target="res/xml/config.xml" parent="/*">
        <feature name="HybridBridge">
          <param name="android-package" value="org.sample.hybrid.HybridBridge" />
        </feature>
      </config-file>
      <source-file src="src/android/org/sample/hybrid/HybridBridge.java" target-dir="src/org/sample/hybrid"/>
    </platform>
  </plugin>
  ```

  <div class="alert--info">There are also optional `repo` and `issue` elements that can also be included if you upload your plugin to a repo and helps you share it with others.

  ```xml
  <repo>https://github.com/hollyschinsky/HybridBridgePlugin.git</repo>
  <issue>https://github.com/hollyschinsky/HybridBridgePlugin/issues</issue>
  ```

  </div>

  Your final plugin structure should look like the following:

  ![](/images/plugin-structure.png)

1. Now, open your terminal and cd into the root of your hybrid android project. Install your new plugin with the following syntax and using the path to your own hybrid plugin after the `--plugin` option:

  ```sh
  $ plugman install --platform android --plugin ~/HybridBridgePlugin --project .
  ```

  If you have any issues with the above you can install the sample plugin directly with the following command:

  ```sh
  $ plugman install --platform android --plugin https://github.com/hollyschinsky/HybridBridgePlugin.git --project .
  ```

<a class="anchor" id="step8"></a>

### Step 8: Use the Hybrid Plugin

1. Open `<project-root>/assets/www/index.html` and modify the `app div` block to include the new `input` and `button` HTML elements shown below:

  ```html
  <div class="app">
    <h1>Apache Cordova</h1>
    <div id="deviceready" class="blink">
      <p class="event listening">Connecting to Device</p>
      <p class="event received">Device is Ready</p>
    </div>
    <input id="bookmark" type="text"/>
    <button id="btnAdd">ADD ITEM</button>
    <br/>
    <button id="btnDeviceInfo">GET DEVICE INFO</button>
    <br/>
    <button id="btnToast">SHOW TOAST</button>
    <br>
    <button id="btnUrl">OPEN URL</button>
    <br/>
  </div>
  ```

1. Open `<project-root>/assets/www/js/index.js` and add the following code to handle our new buttons:

  First modify the `onDeviceReady` function to look as shown here:

  ```js
  onDeviceReady: function() {
    window.plugins.toast.showLongBottom('Use the back button to return to main.');
    document.getElementById("btnAdd").addEventListener("click", app.addItem);
    document.getElementById("btnToast").addEventListener("click", app.showToast);
    document.getElementById("btnDeviceInfo").addEventListener("click", app.showDeviceInfo);
    document.getElementById("btnUrl").addEventListener("click", app.openWeb);
    app.receivedEvent('deviceready');
  },
  ```

  Next, still in `index.js`, define the handlers for each of the buttons registered above directly below the `receivedEvent` function:

  ```js
  addItem: function() {
    console.log("Plugin ADD ITEM CALLED " + HybridBridge);
    var item = document.getElementById("bookmark").value;
    HybridBridge.addItem(item,function(){console.log("Hybrid Bridge Success")},function(e){console.log("Hybrid Bridge Error" + e)});
  },
  showDeviceInfo: function(){
    var message = 'Cordova version: ' + device.cordova;
    message += '\n\nDevice Model: ' + device.model;
    message += '\n\nDevice Version (Android): ' + device.version;
    alert(message);
  },
  showToast: function(){
    window.plugins.toast.showShortCenter('PHONEGAP IS AWESOME!!!');
  },
  openWeb: function(){
    var url = "http://phonegap.com"
    window.open(url)
  }
  ```

### Step 9: Run it!

Run it now from Android Studio and choose either an emulator or device target. Here it is running in a Nexus 5 emulator. Enter text and click Add Item to ensure it's working correctly. Click the other buttons to display device info, show a toast message etc, taking advantage of the other plugins added to the project.

![](/images/hybrid-android-run.png)

### Step 10: Troubleshooting

 If you run into any issues, start by checking logcat (the device console for Android) to look for errors. You can use the `logcat` window from Android Studio or run it from the command line with:

```sh
$ adb logcat
```

 <div class="alert--tip">**TIP:** You can search the output specifically for `INFO:CONSOLE` to filter the search further and locate your errors.</div>

 You could also compare your code to the sample project located [here](https://github.com/phonegap/phonegap-sample-hybrid-android).
