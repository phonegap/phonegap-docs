---
title: "Embedding the Webview"
url: tutorials/develop/1-embed-webview/android-with-extension
layout: subpage
tabs:
  - label: iOS
    url: tutorials/develop/1-embed-webview/ios
  - label: Android
    url: tutorials/develop/1-embed-webview/android
  - label: Android with AS extension
    url: tutorials/develop/1-embed-webview/android-with-extension
---

## Creating Apps with PhoneGap and Android Native Components with the Android Studio extension

This tutorial will show you how to add PhoneGap/Cordova support to an existing Android project using PhoneGap's Android Studio extension.

**Notice: make sure you're in `Text` mode when editing XML files. Select the `Text` tab at the bottom of the XML editor.**

### Create Android project

* Create a new android project, set Application name to "ComponentCase", Company Domain to "phonegapday.com" and edit Package name to be "com.phonegapday". Click next.

![step1](/images/android-webviews/step1.png)

* Check "Phone and Tablet" and set Minimum SDK to API 21: Android 5.0 (Lollipop)

![step2](/images/android-webviews/step2.png)

* Click next and select "Navigation Drawer Activity".

![step3](/images/android-webviews/step3.png)

* Click next and click Finish

![step4](/images/android-webviews/step4.png)

* Clean up a few things
  * open `res/menu/activity_main_drawer.xml` and make sure it looks like this
  ```XML
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
  * open `res/layout/app_bar_main.xml` and delete the `FloatingActionButton`
  * delete all `ic_menu*` from `res/drawable`
  * open `res/layout/nav_header_main.xml` and change the first `TextView`'s text to "**ComponentCase**". Delete the `ImageView` and the other `TextView`.
  * open `res/values/dimens.xml` and change `nav_header_height` to '100dp'
  * open `MainActivity.java` and delete lines 26-33 (FloatingActionButton) and make sure your `onNavigationItemSelected` method looks like this
  ```Java
    public boolean onNavigationItemSelected(MenuItem item) {
          // Handle navigation view item clicks here.
          int id = item.getItemId();

          if (id == R.id.nav_webview) {
              // Handle the camera action
          } else if (id == R.id.nav_list_webview) {

          } else if (id == R.id.nav_list_native) {

          }

          DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
          drawer.closeDrawer(GravityCompat.START);
          return true;
      }
  ```

### Set up PhoneGap/Cordova in your project

* Make sure you have [NodeJS](https://nodejs.org) installed. If you already have NodeJS installed make sure you `npm install -g plugman`
* Go to **Android Studio** > `Preferences` > `Plugins` and click on _Browse Repositories_ button.
* Search for `PhoneGap` and install it. Make sure you don't install the **PhoneGap/Cordova Plugin**
* Restart **Android Studio**
* Go to `Tools` > `PhoneGap` > `Initialize Project`
* You should see a notification: **"Gradle files have changed since last project sync. A project sync may be necessary for the IDE to work properly"**. Click on **Sync Now**
* Copy everything from [www-shared/www](https://github.com/imhotep/PGDayEUWs2016/tree/master/www-shared) to this newly created `assets/www`
  * You can run the following to get `www-shared` easily inside your `app/src/main/assets` folder
  ```Bash
  svn export --force https://github.com/imhotep/PGDayEUWs2016.git/trunk/www-shared/www
  ```
* Go to `Tools` > `PhoneGap` > `Install Plugin from npm`
* Type in `cordova-plugin-device`
* Go to `Tools` > `PhoneGap` > `Install Plugin from npm`
* Type in `cordova-plugin-console`
* Go to `Tools` > `PhoneGap` > `Install Plugin from filesystem`
* Select `cordova-plugin-pgdayeu16` which can be found at [cordova-plugin-pgdayeu16](https://github.com/imhotep/PGDayEUWs2016/tree/master/cordova-plugin-pgdayeu16)
  * Again you can easily fetch the plugin to your filesystem using the following command
  ```Bash
  svn export https://github.com/imhotep/PGDayEUWs2016.git/trunk/cordova-plugin-pgdayeu16
  ```

### Embedding CordovaWebView

* open `res/layout/content_main.xml` and replace the TextView with the following
  ```XML
  <org.apache.cordova.engine.SystemWebView
      android:id="@+id/WebViewComponent"
      android:layout_width="match_parent"
      android:layout_height="match_parent">
  </org.apache.cordova.engine.SystemWebView>
  ```
* Add the following attributes to `MainActivity.java`. Make sure you fix the imports.
  ```Java
  private String TAG = "ComponentWrapper";
  private SystemWebView webView;
  private CordovaWebView webInterface;
  private CordovaInterfaceImpl stupidface = new CordovaInterfaceImpl(this);
  ```
* Add the following lines at the bottom of your `onCreate` method
  ```Java
  //Set up the webview
  ConfigXmlParser parser = new ConfigXmlParser();
  parser.parse(this);

  webView = (SystemWebView) findViewById(R.id.WebViewComponent);
  webInterface = new CordovaWebViewImpl(new SystemWebViewEngine(webView));
  webInterface.init(stupidface, parser.getPluginEntries(), parser.getPreferences());
  webView.loadUrl(parser.getLaunchUrl());
  ```
* These methods are required for `CordovaWebView` to work properly. Add them and fix imports
  ```Java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
      super.onActivityResult(requestCode, resultCode, intent);
      stupidface.onActivityResult(requestCode, resultCode, intent);
  }

  @Override
  public void onDestroy() {
      webInterface.handleDestroy();
      super.onDestroy();
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

### Adding native and web list views

* Add the following line to your `res/values/strings.xml`
  ```XML
  <string name="add_bookmark">Add Bookmark</string>
  ```
* Right click on `res/layout` and select `New` -> `XML` -> `Layout XML File`. Name it `bookmark_main`. Make sure it looks like this
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
* Add the following attributes to your `MainActivity.java`

  ```Java
  // need this for page navigation
  private String[] urls = new String[2];
  private ListView listView;
  private LinearLayout bookmarkLayout;
  private ArrayList<String> bookmarks = new ArrayList<String>();
  ```
* Set up the native ListView by adding the following lines to your `onCreate` method

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
* Add the following methods

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
* Fix imports
* Add this line to your `res/layout/content_main.xml`

  ```XML
  <include layout="@layout/bookmark_main"/>
  ```
* Add these lines at the bottom of your `onCreate` method

  ```Java
  urls[0] = parser.getLaunchUrl();
  urls[1] = urls[0].replace("index.html", "listeditor.html");
  webView.loadUrl(urls[0]);
  ```
* Make sure your `onNavigationItemSelected` looks like this

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
* Make sure to add this attribute to your `<activity>` tag in your `AndroidManifest.xml`

  ```XML
  android:windowSoftInputMode="adjustPan"
  ```

### Run the application

* Run the application by clicking on `Run` -> `Run 'app'`. You notice that elements added in the webview and native view are sychronized. Check out the plugin code for more details.
* To avoid seeing weird `eglCodecCommon` errors in the console add this to your filter: `^(?!eglCodecCommon)`
