---
title: "Embedded the Webview for iOS"
url: develop/1-embed-webview/ios
github_url: https://github.com/phonegap/phonegap-docs/blob/master/docs/2-tutorials/2-develop/1-embed-webview/1-ios.html.md
layout: subpage
tabs:
  - label: iOS
    url: develop/1-embed-webview/ios
  - label: Android
    url: develop/1-embed-webview/android
---

##Creating Apps with Cordova and iOS Native Components

Before getting started you should read [this blog post](http://phonegap.com/blog/2015/03/12/mobile-choices-post1/) about choosing a mobile strategy. 
As a quick refresher, native hybrid mobile apps include a blend of native controls and one or more webviews. One common use case implemented in many popular 
apps (Instagram, Basecamp) is to use native controls to provide the navigation and page transitions, with the main content wrapped in embedded Cordova webviews. 
However, you could combine the native and WebView components in many different ways to achieve your needs. This guide is meant as a reference to help you start 
that journey.

###Reference App
We'll use this [sample application](https://github.com/phonegap/phonegap-sample-hybrid-ios) for reference throughout the tutorial. It contains two views; 
a Cordova view and a native view. The final sample app will have a button on the Cordova webview that will add an item to a table control in the native view to 
represent a bookmark to show how to communicate between the web and native views. 

###Lesson 1: Create a Default Cordova iOS Project
Most developers use the PhoneGap or Cordova CLI to create their projects, and while it is possible to use it for this approach, it's not recommended since 
we are only working with the iOS platform project itself. Instead, we'll use the [cordova-ios](https://github.com/apache/cordova-ios) project. This is the same 
project used from the CLI when you add the iOS platform.

1. Begin by cloning or downloading the zip file for the base [cordova-ios](https://github.com/apache/cordova-ios) project.

2. Open a terminal window and `cd` into the directory *containing* the cordova-ios base project from above. So for instance 
if it was downloaded to `userxyz/cordova-ios` then you'll want to run the `create` command from `userxyz`.
 Create a new Cordova iOS project by running the following command: 
	
	`$ cordova-ios/bin/create HybridIOSApp org.sample.hybridiosapp HybridIOSApp`

3. `cd` into the newly created project:

    `$ cd HybridIOSApp`
	
3. Use [plugman](https://github.com/apache/cordova-plugman) to add any desired plugins to your project. 
If you don't have plugman, you can install it via npm. (You should add the [Cordova console plugin](https://github.com/apache/cordova-plugin-console) at minimum 
on iOS so you can receive log messages):

    `$ plugman install --platform ios --project . --plugin cordova-plugin-console`


###Lesson 2: Set up the Storyboard
1. Open the `HybridIOSApp.xcodeproj` file in Xcode (requires Mac OS). This is the base native project we're extending.

2. Create an iOS storyboard to lay out each screen as a 'scene'. Ensure you have the `Classes` folder of your `HybridIOSApp` 
project selected and use the Xcode **File -> New** menu to create a storyboard file and name it `Main.storyboard`.
 
 ![](../../../images/new-storyboard.jpg)

3. Set the main interface for the project to the Storyboard just created. This new storyboard file created in the previous step will serve as the 
main interface for your application, so before going further you need to update the project properties to point to it. Select the project root 
in the *Project Navigator* on the left and the first tab General, should be selected. Set **Devices** to iPhone if not already set, then set the 
**Main Interface** drop down to the `Main.storyboard` file you created. The screenshot below outlines all of this in red.

    ![](../../../images/main-interface.jpg)

4.  Now go back to the storyboard and create a scene by dragging a View Controller in from the *Object Library* panel on the right. 
(If it's not already opened, toggle it from the Xcode main menu bar under **View -> Utilities**).  The right arrow below shows where to drag it from. 
Once it's dragged in, you should see it in the *Document Outline* view as shown below. If that outline is not showing, toggle it using the button 
pointed to with the red arrows below. You will need to use it throughout this guide.

    ![](../../../images/view-controller.jpg)
    
5. Next we'll need to set the View Controller class to `MainViewController`, which is the Cordova-enabled View Controller class created in your 
base project and provides the access to the PhoneGap APIs. To do this, ensure the new View Controller is selected and then open the 
*Identity Inspector* panel (circled below) and change the class name to `MainViewController`. 

   ![](../../../images/main-view-controller.jpg)

6. In the *Attributes Inspector* tab (circled in red), set the View Controller title to **Cordova**. This will display in the *Document Outline* 
for the view and helps better keep track of which view we're working on.

   ![](../../../images/cordova-title.jpg)

7. Next let's add one more View Controller to our storyboard to represent a Native View scene. Leave the default class set to `UIViewController` 
since it's representing a native view scene. Set the title in the *Attributes Inspector* tab to **Native**.

   ![](../../../images/native-title.png)
   
8. Now let's put some navigation into our app by adding a `TabBarController` to allow users to switch between the cordova and native views from tabs at the 
bottom of the application. Our two View Controllers for Native and Cordova views can be embedded into this `TabBarController` via the Xcode *Editor* menu. 
Ensure you have both View Controllers selected then go to **Editor-> Embed In-> Tab Bar Controller**. 

   ![](../../../images/embed-in.png)

9. You will see that a new `TabBarController` is now placed on the screen and connected to your View Controllers automatically.

  ![](../../../images/tabbar.png)

10. Now we'll need to set an entry point for our app to know what to display first. We'll set the `TabBarController` to be the entry point 
by clicking on the *Attribute Inspector* tab and checking the box next to *Is Initial View Controller* like below. When the box is checked 
you'll see an arrow added to the screen into the `TabBarController`. 
   
   ![](../../../images/initial-view.jpg)
   
11. The storyboard entry point set in the previous step will not take effect quite yet as we still have code that exists to programmatically 
set the entry point as well that needs to be removed. Open **AppDelegate.m** and search for `didFinishLaunchingWithOptions`. 
 This method is the point where any final customization or final tweaks can be done before displaying the app. 
 Since we're using a storyboard and have already set an entry point into the `TabBarController` there, we don't need to use the current 
 code in this method to set the `rootViewController`. You can completely remove everything within this method, leaving it empty:

        (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
        {
     
        }

12. In each of the scenes in the *Document Outline* view you will notice an **Item** object which represents the tab displayed for each view. 

  ![](../../../images/items-change.jpg)
13. Change the name and icon to represent something more meaningful for each of them in the *Attribute Inspector*. For the Cordova view, set the name to 
  Cordova and then choose a cordova logo for the Cordova view tab in the drop-down. Since the default logos are already included in the Resources folder from the cordova-ios 
  project, you can easily select one from the drop-down. Choose the *icon-40.png* size.

  ![](../../../images/cordova-title.jpg)

  For the native view we'll simply set the *System Item* to a built-in value of *History* since this view will represent a history of bookmarked 
  items of sorts. Setting this value will automatically set the icon and title for us in the tab so we only need to fill in that value. 
  See the screenshot in the next step for the result:

  ![](../../../images/native-title.png)

13. Now run the app and you will see the two buttons at the bottom and can toggle between views with them. The Cordova view shows the default 
Hello Cordova app and the native view is currently blank. We will change that in the next lesson. 


###Lesson 3: Adding to the Native View
In this lesson we'll set up a table in our native view to allow for items to be added to it and displayed when a button is clicked from the Cordova WebView. 
To set up our native view to display a table, we'll also need to define a custom `UITableViewController` class for our logic. 

1. Go to **File -> New -> File -> Cocoa Touch Class**

   ![](../../../images/cocoa-touch-class.png)

2. Name it to `MyTableViewController` and ensure the `UITableViewController` subclass is selected and save into **Classes** folder. 

   ![](../../../images/table-view-controller-name.png)

3. Next we'll need to use the new `TableViewController` class we created by setting it as our native View Controller from within the Storyboard of our native view. 
Ensure the native scene is selected and change the View Controller class to `MyTableViewController` (or to the value you named it in the above) in the *Identity Inspector*.

   ![](../../../images/table-view-controller-class.png)

4. Since there's still nothing visible from a UI perspective in the native view, we'll need to add the actual Table control itself that the `MyTableViewController` 
class will manage. This control is represented by a `UITableView` class and will replace the current default `UIView` there (denoted by the *View* 
object in the *Document Outline*). Delete the current View In the *Document Outline* located under Native View by selecting it and pressing delete. 
Now drag a *Table View* component from the *Object Library* into the Native View. The result should look like the following:

  ![](../../../images/tableview.jpg)

5. While we have our `TableView` selected, let's also change the row height to pad it a bit and make it easier to read. Change the *Row Height* to 70 
as shown here:

  ![](../../../images/row-height.jpg)

6. Now add a *Table View Cell* component on to the `TableView` by dragging it from the *Object Library*. You will see a new element on the 
Table View titled Prototype Cells. Name the Table View Cell to **Cell1** by setting the Identifier in the *Attribute Inspector* tab.
The name will change in the *Document Outline* as shown below:

  ![](../../../images/cell-title.jpg)

7. Next drag a Label on to the Table Cell View (*Cell1*) to represent the title of the item added. Name the new label **Title** and drag it 
over to the left to align it as shown below:

 ![](../../../images/title.jpg)
	
8. We are now done working with the Storyboard and UI. In this step we'll need to add some code handling for this new table by updating the 
`MyTableViewController` header and class. 

  We will use an array to manage the items for the table and name the array variable bookmarks.  To support the new array variable, we'll first 
  need to define it as a property in the `MyTableViewController.h` header file. 

    @property (nonatomic,strong) NSMutableArray* bookmarks;

  Next open the **MyTableViewController.m** class and make the following changes:

  * Add this new method above the `viewDidLoad` method to initialize the bookmarks array:
        
         - (instancetype)initWithCoder:(NSCoder *)aDecoder {
             self = [super initWithCoder:aDecoder];
             self.bookmarks = [[NSMutableArray alloc]init];
             return self;
         }
        
  * Update the `numberOfSectionsInTableView` method to return 1 instead of 0:
      
         - (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
            return 1;
         }
         
  * For `numberOfRowsInSection`, return the current count of the `bookmarks` array:   
         
          - (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
            return [self.bookmarks count];
          }

  * Lastly, uncomment and update the `cellForRowAtIndexPath` to contain the following code:

         - (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {      
           UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell1" forIndexPath:indexPath];        
           cell.textLabel.text=[self.bookmarks objectAtIndex:indexPath.row];        
           return cell;
         }

###Run it!
Now stop and run your application in the emulator or on your iPhone. You should see a blank table now for the Native **History** view as shown here:

<img class="mobile-image" src="../../../images/running-empty.png"/>

In the next lesson we'll show how you can add items to this table from a WebView button control by communication via a plugin.

###Troubleshoot
If you have any errors upon run, double check your code updates above against the sample project and ensure your Storyboard matches. You should also 
specifically check to ensure your Native View Controller outlets look the same as in this screenshot below and the **View -> Table View** is shown 
as an Outlet. 

 ![](../../../images/troubleshoot.jpg)

Also check to ensure the scheme and target device you're trying to run are properly set up in the top bar as shown here. 
Your app name should be set as the scheme, and the iPhone 6 simulator or your own device:

  ![](../../../images/target.png)


###Lesson 4: Web to Native Communication 

The way to communicate between the Cordova and native iOS views is via a Cordova plugin. Let's create our own custom plugin now and we'll 
see how we can gain access to the `TableViewController` to add an item to the table. 

Cordova plugins for iOS extend the `CDVPlugin` class, can return a result using the `CDVPluginResult` class and are called from JavaScript via the `cordova.exec` 
interface. The `exec` interface signature takes callback functions for success and error, a service name, method name and an array of optional 
arguments as follows:

    exec(<successFunction>, <failFunction>, <service>, <action>, [<args>]);

The `service` parameter maps to the name of the iOS class to call and the action specifies the function within that class to execute using any arguments 
passed in from the last parameter. Upon success, the success callback function will be called, otherwise the error callback function will be called. 
The `CDVPluginResult` will hold the specific result, which can hold a variety of result types in the message. For instance, a simple result for a success 
status may have the form of the following where you're sending back the success status only:

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];

or you could also pass a message string with it as follows:

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:myStr];

When an error results, you will likely want to pass a message or object back indicating details about the failure. Below is an example of passing a 
message back, but you could also pass the error status along with a message or another data type (`messageAsArrayBuffer`, `messageAsMultipart` etc). 

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Arg was null"];

For a list of the different result types, see [this doc](http://cordova.apache.org/docs/en/edge/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide). 

###Create a Cordova Plugin
Start creating your custom plugin by going to the **Xcode File -> New -> File** menu and selecting Cocoa Touch. Ensure to choose the `CDVPlugin` as the subclass 
for your new plugin and name it something like `MyHybridPlugin` and save into your **Classes** folder.

Now update the `MyHybridPlugin.h` header file to look like the following:

	#import <Cordova/CDVPlugin.h>

    @interface MyHybridPlugin : CDVPlugin
        - (void)addBookmark:(CDVInvokedUrlCommand*) command;
    @end

<div class="alert--info">**Note:** Ensure your import statement uses `CDVPlugin.h` as Xcode may try to default it to Cordova.h and it will not work.</div>

Next open the `MyHybridPlugin.m` class file and modify it to the following:

    #import "MyHybridPlugin.h"
    #import "MainViewController.h"
    #import "MyTableViewController.h"
    
    @implementation MyHybridPlugin
        -(void)addBookmark:(CDVInvokedUrlCommand*) command {
            NSString* bookmark = [command.arguments objectAtIndex:0];
            
            if(bookmark) {
                NSLog(@"addBookmark %@", bookmark);
                MainViewController* mvc = (MainViewController*)[self viewController];
                
                MyTableViewController* tvc = (MyTableViewController*)mvc.tabBarController.viewControllers[1];
                [tvc.bookmarks addObject:bookmark];
                [tvc.tableView reloadData];
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            } else {
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }
        }
    @end


	
### Code Dissection
Here's an explanation of what is happening above... 
1. Since we're running in the `MainViewController` when the button is clicked, we can get access to that controller via this line:

        MainViewController* mvc = (MainViewController*)[self viewController];

2. Now we'll use our `MainViewController` object to gain access to our `TabBarController` and subsequently the native view `TableViewController` 
object via it's `ViewController` array at index 1 (`MainViewController` is at index 0). 

        MyTableViewController* tvc = (MyTableViewController*)mvc.tabBarController.viewControllers[1];
            
3. Next we'll add a bookmark object to the array of bookmarks held in the `TableViewController` object:

        [tvc.bookmarks addObject:bookmark];

4. Now we'll call the `reloadData` function to reload the data in the table view since the array (the datasource) has changed.

        [tvc.tableView reloadData];

5. Lastly we'll form our Plugin Result via the `CDVPluginResult` classes discussed previously in this guide and return the plugin result status back using the 
`commandDelegate`:

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } 
        else {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }

<div class="alert--info">Also, notice in the above that the name of the class is `MyHybridPlugin` and the name of the method being called is `addBookmark`. To use this 
new plugin from the Cordova JavaScript side we will use the following syntax and specify those values in the `exec` call along with our callbacks 
and parameters (the string to add to the native table view):

        `cordova.exec(win, fail, "MyHybridPlugin", "addBookmark", [bookmark]);`

</div>

###Use the Plugin

1. Now open your Cordova **index.js** file located in the project under the `www/js` folder and add a method on the JavaScript side called `addBookmark` 
that will call the `addBookmark` method in the plugin via the `exec` call (highlighted in red). 
	
        addBookmark: function() {	  
            var win = function(d) {
            console.log("Bookmark added!");
            };
            var fail = function(e) {
                        console.log(e)
            }
            var bookmark = document.getElementById("bookmark").value
            cordova.exec(win, fail, "MyHybridPlugin", "addBookmark", [bookmark]);
        }

2. Open **index.html** and replace the `div` contents with a new text input and button:

        <div class="app">
                <label for="bookmark">Bookmark this:</label>
                <input id="bookmark" type="text" />
                <button id="bookmarkBtn">Add a bookmark</button>
          </div>

3. Now go back into **index.js** and in the `onDeviceReady` function, delete or comment out the `receivedEvent` call (since we removed the 
corresponding code from index.html in the previous step) and add the following line to call our `addBookmark` function when the button is clicked:

        onDeviceReady: function() {
            //app.receivedEvent('deviceready');
            document.getElementById("bookmarkBtn").onclick = app.addBookmark;
        },

4. None of this will work yet until we update our **config.xml** file with the new plugin details in the form of a <feature/> tag so it knows it's a valid 
plugin and how to reference it. Open the **config.xml** file located in the project at the same level as the `Classes` folder we've been working out of 
(at path: `HybridIOSApp/HybridIOSApp/config.xml`) and add the following lines in the same area as any other feature elements already added if you added other plugins. (Since we didn't use a tool like 
 plugman or the CLI to add our plugin, we must do this step manually).

        <feature name="MyHybridPlugin">
            <param name="ios-package" value="MyHybridPlugin" />
        </feature>
	
5. Run your app now and ensure you can enter text into the input field on the Cordova screen, click the *Add a bookmark* button and see it added into your 
native view. Keep adding items and see them added into your native table view!

    ![](../../../images/running-final.png)
    
  
<div class="alert--info">The full [sample project](https://github.com/phonegap/phonegap-sample-hybrid-ios) for this guide can be found in the [PhoneGap GitHub repository](https://github.com/phonegap/phonegap-sample-hybrid-ios) 
for further reference.</div>

###Conclusion
While it may not be the most aesthetically pleasing looking app, it illustrates how easily you can combine native and webview elements to get you thinking about more options in 
approaching this for your own hybrid app development!

