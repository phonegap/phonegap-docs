---
title: Lesson 1 - Project Creation & Setup
url:  tutorials/stockpile/1-project-creation
layout: subpage
next: 2-tutorials/3-stockpile/stockpile-app/2-search-page.html.md
---
This lesson provides the steps to create a new PhoneGap project based on a starter app template and contains details about the resulting project structure. Before moving on you will add an icon library and test out the new app to ensure your environment is set up properly.

## Project Creation

1. Open a terminal window and run the `phonegap create` command below, specifying your desired folder location,  package, name and the [phonegap-template-vue-f7-split-panel](https://github.com/phonegap/phonegap-template-vue-f7-split-panel) for the `--template` parameter as shown below:

        phonegap create Stockpile com.phonegap.stockpile Stockpile --template phonegap-template-vue-f7-split-panel

  <div class="alert--tip">PhoneGap provides starter templates and layouts to help you get started building your apps quickly. The templates vary in the types of frameworks and configurations used, some more basic and some fully configured with a build process like Webpack. To create a new PhoneGap project with a template, you specify the `--template` parameter upon project creation. To locate the various templates available, go to [npmjs.org](https://www.npmjs.com/search?q=phonegap:template) and use the search term `phonegap:template`. See the [project overview](/tutorials/stockpile/01-project-overview/) for more details about the templates and project structure.
  </div>

1. Next, navigate into the new Stockpile folder and run the `npm install` command to install the project dependencies:

        cd Stockpile
        npm install

  <div class="alert--info">**IMPORTANT:** You will be updating the files and folders within the **`src`** folder specifically when going through the lessons in this guide. Do not confuse it with the `www` folder. That folder will be regenerated when the `npm run build` command is used. Refer to the [project overview](/tutorials/stockpile/01-project-overview/) for more details.</div>

## Rename the App

1. You're now ready to start editing the project to transform it into your own Stockpile app. Open the root `Stockpile` project folder in your favorite code editor.

1. Begin by providing your app a new name. Open `~src/index.html` and change the `<title>` tag value of **MyApp** to **Stockpile.**

        <title>Stockpile</title>

    <div class="alert--tip">**TIP:** If you're looking for a good code editor check out [Visual Studio Code](https://code.visualstudio.com/).</div>

## Add the Framework7 Icons Library

Framework7 provides just a couple commonly used icons in their default package (back arrow and menu bars), but they also offer a free icon font library to provide additional icons (and iOS specific icons) as you develop your apps. Follow the steps below to install the [Framework7 Icons Font](https://framework7.io/icons/) library.

1. Install the `framework7-icons` package from npm:

        npm install framework7-icons --save

1. Then open `~src/main.js` and add an import for the new icons as shown below just above the routes import:

        // Import the Framework7 Icons
        import Framework7Icons from 'framework7-icons/css/framework7-icons.css';

        // Import Routes
        import Routes from './routes';

<div class="alert--info">**Note:** This app only uses a couple of icons, but since this is a guide to building a mobile app, it's important to know there are icon font libraries available to you. There's also a free [Material Icons](https://material.io/icons/) library you can check out if you're interested in using material design specific icons. You could even include both icon font libraries with a conditional icon that used either the iOS or the Material design version. For more information about how to do this, and using icons with Framework7 in general, see the [Framework7 docs](http://framework7.io/vue/icon.html). This app did not need that extensive of a solution, and in the interest of performance, just the Framework7 Icons library was included. </div>

## Run it!

Since this app was built based on webpack, it can be run in **development mode** or **production mode**. While building the app, it's easiest to run it in development mode and test it in the browser as long as possible to develop the majority of the functionality until device-specific testing is needed.

### Development mode

Open your terminal and start the development server with the following `npm` command:

        npm run dev

The app will open up in your browser at `localhost:8080` (or you can manually open it there).  When the app is run in development mode in the browser, it should appear like the screenshots below, which is essentially the [PhoneGap Default Split Panel](https://github.com/phonegap/phonegap-template-vue-f7-split-panel/) app renamed at this point.

![](/images/stockpile/run-browser-lesson1.png)

You can take advantage of the real-time compiling and hot reloading while running in `dev` mode to speed up your development time as you work through the lessons.

### Production mode

Build in "production mode" when you're ready to start actually testing your app on a device or simulator. To build it for production mode, use the `build` run target:

         npm run build

<div class="alert--tip">Specific details about the differences between the `dev` and `build` mode can also be found [here](https://github.com/vuejs-templates/webpack/blob/develop/docs/commands.md).</div>

Once the build is complete, you can then run the normal `phonegap` and `cordova` commands to actually deploy the package to an ios or android target using:

         phonegap run ios
         phonegap run android

After the `build` command, you could also use the [`phonegap serve`](http://docs.phonegap.com/getting-started/4-preview-your-app/cli/) command to serve the app for use by the [PhoneGap Developer App](http://docs.phonegap.com/getting-started/2-install-mobile-app/) running on a device.

         phonegap serve

<div class="alert--tip">The last option with `phonegap serve` is particularly useful for debugging [Progressive Web Apps](/tutorials/stockpile/911-pwa-features). </div>

Open the Chrome devtools and use the mobile emulation button to try out different device simulations. You'll need to reload the page when switching between iOS and Android to see the stylesheets applied.

![](/images/stockpile/run-browser-ios.png)
![](/images/stockpile/run-browser-android.png)

## ESLint tips

The Vue template this app is based on automatically defaults to the [`semistandard` ESLint option,](https://github.com/vuejs-templates/webpack/blob/develop/docs/linter.md) which is the [JavaScript `standard` style](https://standardjs.com/) extended to include semicolons. Take a few minutes to familiarize yourself with [the rules](https://standardjs.com/) if you're not familiar already, to help avoid compiler errors and speed up your development time while working through this guide.
