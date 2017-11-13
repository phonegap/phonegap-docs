---
title: Lesson 1 - Project Creation & Setup
url: references/stockpile-app/1-project-creation
layout: subpage
---
This lesson provides the steps to create a new PhoneGap app project based on a starter template and provides details about the resulting project structure. Before moving on you will add an icon library and test out your new base app to ensure it's running properly.

## Project Creation
1. Open a terminal window and run the `phonegap create` command below, specifying your desired *folder location*,  *package*, *name* and the [PhoneGap Split Panel template](https://github.com/phonegap/phonegap-template-vue-f7-split-panel) for the `--template` parameter as shown below:

        phonegap create Stockpile com.phonegap.stockpile Stockpile --template https://github.com/phonegap/phonegap-template-vue-f7-split-panel

  <div class="alert--tip">PhoneGap provides starter templates and layouts to help you get started building your apps quickly. The templates vary in the types of frameworks and configurations used, some being more basic and some fully configured with a build process like webpack. To create a project with a template, you specify the `--template` parameter upon project creation. To locate the various templates you could use upon project creation, go to [npmjs.org](https://www.npmjs.com/search?q=phonegap:template) and use the search term `phonegap:template`.
  </div>

3. Next, navigate into the new Stockpile folder and run the `npm install` command to install the project dependencies:

        cd Stockpile
        npm install

## Project Structure
Before moving on, it's important to understand the project structure and specifically what folder you'll be making most of your changes in. Below is the project structure you should see. It is a combination of the Vue CLI project template for PWA+Webpack and a PhoneGap CLI generated project.

![Project Structure](/images/stockpile/folder-structure.png)

The [PhoneGap Split Panel template](https://github.com/phonegap/phonegap-template-vue-f7-split-panel) was built using the [vue-pwa-boilerplate](https://github.com/vuejs-templates/pwa) template to generate the folders and files below. The **vue-pwa-boilerplate** is a full-featured PWA template with webpack, hot-reload, lint-on-save, unit testing & css extraction built-in.

A quick note about the contents of each is noted in the comments, but you can also refer to the [Vue Webpack template docs](https://github.com/vuejs-templates/webpack/blob/develop/docs) for specific details. 

```
.
├── build/                      # webpack config files
│   └── ...
├── config/
│   ├── index.js                # main project config
│   └── ...
├── src/
│   ├── main.js                 # app entry file
│   ├── App.vue                 # main app component
│   ├── components/             # ui components
│   │   └── ...
│   └── assets/                 # module assets (processed by webpack)
│       └── ...
├── static/                     # pure static assets (directly copied)
├── test/
│   └── unit/                   # unit tests
│   │   ├── specs/              # test spec files
│   │   ├── index.js            # test build entry file
│   │   └── karma.conf.js       # test runner config file
│   └── e2e/                    # e2e tests
│   │   ├── specs/              # test spec files
│   │   ├── custom-assertions/  # custom assertions for e2e tests
│   │   ├── runner.js           # test runner script
│   │   └── nightwatch.conf.js  # test runner config file
├── .babelrc                    # babel config
├── .postcssrc.js               # postcss config
├── .eslintrc.js                # eslint config
├── .editorconfig               # editor config
├── index.html                  # index.html template
└── package.json                # build scripts and dependencies
```

**IMPORTANT:** In this guide we will be updating the files and folders within the **`src`** folder specifically. Any references to files within the tutorial can be found and updated in the **`src`** folder.

## Rename the App
1. You're now ready to start editing the project to transform it into your own Stockpile app. Open the root `Stockpile` project folder in your favorite code editor.

2. Begin by providing your app a new name. Open `~src/index.html` and change the `<title>` tag value of **MyApp** to **Stockpile.**

		<title>Stockpile</title>

## Add the Framework7 Icons Library
Framework7 provides just a couple commonly used icons in their default package (back arrow and menu bars), but they also offer a free icon font library to provide additional icons (and iOS specific icons) as you develop your apps. Follow the steps below to install the [Framework7 Icons Font] (https://framework7.io/icons/) library.

1. Install the `framework7-icons` package from npm:

		npm install framework7-icons --save

2. Then open `~src/main.js` and add an import for the new icons as shown below just above the route.js import:

    	// Import the Framework7 Icons
    	import Framework7Icons from 'framework7-icons/css/framework7-icons.css';
    	
    	// Import Routes
    	...

<div class="alert--info">**Note:** This app only uses a couple of icons, but since this is a guide to building a mobile app, it's important to know there are icon font libraries available to you. There's also a free [Material Icons](https://material.io/icons/) library you can check out if you're interested in using material design specific icons. You could even include both icon font libraries with a conditional icon that used either the iOS or the Material design version. For more information about how to do this, and using icons with Framework7 in general, see the [Framework7 docs](http://framework7.io/vue/icon.html). This app did not need that extensive of a solution, and in the interest of performance, just the Framework7 Icons library was included. </div>

## Run it!

Since this app was built based on webpack, it can be run in **development mode** or **production mode**. While building the app, it's easiest to run in development mode and test in the browser as long as you can to develop the majority of the functionality until device-specific testing is needed.

#### Development mode
Open your terminal and start the development server with the following `npm` command:

	npm run dev

The app will open up in your browser at `localhost:8080` (or you can manually open it there).  When the app is run in development mode in the browser, it should appear like the screenshots below, which is essentially the [PhoneGap Default Split Panel](https://github.com/phonegap/phonegap-template-vue-f7-split-panel/) template renamed.

![](/images/stockpile/run-browser-lesson1.png)

#### Production mode
"Production mode" is meant to be used when you are ready to start testing your app on a device. This includes an actual device or a simulator. To build it for production mode, you should use the `build` run target.

	 npm run build

Once the build is complete, you then run the normal `phonegap` and `cordova` commands to actually deploy the package to an ios or android target using:

	 phonegap run ios
   phonegap run android

After the `build` command, you could also use the [`phonegap serve`](http://docs.phonegap.com/getting-started/4-preview-your-app/cli/) command to serve the app for use by the [PhoneGap Developer App](http://docs.phonegap.com/getting-started/2-install-mobile-app/) running on a device.

	 phonegap serve

<div class="alert--tip">The last option with `phonegap serve` is particularly useful for debugging [Progressive Web Apps](/references/references/stockpile-app/9-pwa-features). </div>

Open the Chrome devtools and use the mobile emulation button to try out different device simulations. You'll need to reload the page when switching between Android and iOS to see the stylesheets applied.

![](/images/stockpile/run-browser-ios.png)

## ESLint tips
The Vue template this app is based on automatically defaults to the `semistandard` ESLint option, which is essentially the [JavaScript `standard` style](https://standardjs.com/) extended to support semicolons. Take a few minutes to familiarize yourself with [the rules](https://standardjs.com/) if you're not familiar already, to help avoid compiler errors and speed up your development time while working through this guide.

## About this Guide
The Split Panel template provides a good app structure to get started with since it already includes a navigation bar, some basic views, a side menu and page routing wired up. Since the Stockpile app also needs this, it's easier to re-use existing pages and content where possible. For each of the views you may notice a similar high-level pattern of changes that need to occur:

1. Update the view routing
2. Update the UI for the view
2. Implement the JavaScript for the view updates

