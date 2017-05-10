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

## Creating Apps with PhoneGap and Android Native Components using the Android Studio extension.

* create a new android project, set application name to "componentcase", company domain to "phonegapday.com" and edit package name to be "com.phonegapday". click next.

![step1](/images/android-webviews/step1.png)

* check "phone and tablet" and set minimum sdk to api 21: android 5.0 (lollipop)

![step2](/images/android-webviews/step2.png)

* click next and select "navigation drawer activity".

![step3](/images/android-webviews/step3.png)

* click next and click finish

![step4](/images/android-webviews/step4.png)

* clean up a few things
  * open `res/menu/activity_main_drawer.xml` and make sure it looks like this
  ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <menu xmlns:android="http://schemas.android.com/apk/res/android">
        <group android:checkablebehavior="single">
            <item
                android:id="@+id/nav_webview"
                android:title="webview" />
            <item
                android:id="@+id/nav_list_webview"
                android:title="list (webview)" />
            <item
                android:id="@+id/nav_list_native"
                android:title="list (native)" />
        </group>
    </menu>
  ```
  * open `res/layout/app_bar_main.xml` and delete the `floatingactionbutton`
  * delete all `ic_menu*` from `res/drawable`
  * open `res/layout/nav_header_main.xml` and change the first textview's text by "componentcase". delete the imageview and the other textview.
  * open `res/values/dimens.xml` and change `nav_header_height` to '100dp'
  * open 'mainactivity' and delete lines 26-33 (floatingactionbutton) and make sure your `onnavigationitemselected` method looks like this
  ```java
    public boolean onnavigationitemselected(menuitem item) {
          // handle navigation view item clicks here.
          int id = item.getitemid();

          if (id == r.id.nav_webview) {
              // handle the camera action
          } else if (id == r.id.nav_list_webview) {

          } else if (id == r.id.nav_list_native) {

          }

          drawerlayout drawer = (drawerlayout) findviewbyid(r.id.drawer_layout);
          drawer.closedrawer(gravitycompat.start);
          return true;
      }
  ```

* Make sure you have [NodeJS](https://nodejs.org) installed. If you already have [NodeJS](https://nodejs.org) installed make sure you `npm install -g plugman`
* Go to **Android Studio** > `Preferences` > `Plugins` and click on _install JetBrains Plugin_ button.
* Search for `PhoneGap` and install it. Make sure you don't install the **PhoneGap/Cordova Plugin**
* Restart **Android Studio**
* Go to `Tools` > `PhoneGap` > `Initialize Project`
* Copy everything from www-shared/www to this newly created assets/www
* Go to `Tools` > `PhoneGap` > `Install Plugin from npm`
* Type in `cordova-plugin-device`
* Go to `Tools` > `PhoneGap` > `Install Plugin from npm`

1* Type in `cordova-plugin-console`
1* Go to `Tools` > `PhoneGap` > `Install Plugin from filesystem`
1* Select `cordova-plugin-pgdayeu16` which can be found at [cordova-plugin-pgdayeu16](https://github.com/imhotep/PGDayEUWs2016/tree/master/cordova-plugin-pgdayeu16)

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
* Set up the native ListView by adding the following lines to your `onCreate` method. Fix imports

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
* To avoid seeing weird `eglCodecCommon` errors in the console add this to your filter: `^(?!eglCodecCommon)`
