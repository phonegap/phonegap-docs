---
title: Step 3: Template Explained
url: app-stack/conference-memories/3-template-explained
layout: subpage
---

<p class="sub-paragraph">Now that we've created the application, it's worth stopping to take a moment to look through the default split view template and point out some important details.</p>

## `index.html`

Open the **index.html** file (located within your projects root folder) and look for the `div` with and `id` of `app`. This is where Vue will inject our `App.vue` into the DOM.

```html
<div id="app"></div>
```

<div class="alert--warning">Please note that this is the `index.html` in the root of your app not in the `www` folder.</div>

## `main.js`

Open the **main.js** file (located within your projects root `src` folder) and look for the line where we import the **App.vue** file.

```js
import App from './App';
```

Later on in the file you'll see were we setup `Vue`. Three really important lines to point out here:

1. We have to tell Vue what element to attach to in our **index.html** file:

   ```js
   el: '#app',
   ```

1. Then we tell the Vue which template to use:

   ```js
   template: '<app />',
   ```

1. Finally we attach the `App.vue` file to the `app` template in the `components` section:    

   ```js
   // Register App Component
   components: {
     app: App
   }
   ```

Below is the relevant code snippet from the main.js.

```js
new Vue({ // eslint-disable-line no-new
  el: '#app',
  template: '<app />',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    swipePanel: 'left',
    routes: Routes,
    material: window.isMaterial,
    animateNavBackIcon: window.isiOS,
    pushState: true,
    pushStateNoAnimation: true,
    panelLeftBreakpoint: 960
  },
  // Register App Component
  components: {
    app: App
  }
});
```

## `App.vue`

Open the **App.vue** file (located within your projects root `src` folder) and notice that the file consists of three elements **template**, **script** and **style**. This is an example of a Vue single file component.

In the **template** section you'll notice most of the tags start with `f7` as we are using [Framework7 Vue](http://framework7.io/vue/) to provide a consistent user interface. However, two tags probably jump out at you as being different `left-panel-view` and `home-page`.

Scrolling down further in the file brings you to the **script** section where you'll see the following lines:

```js
import LeftPanel from './components/LeftPanel';
import Home from './components/pages/Home';
```

This is where we import a couple of components, `LeftPanel` represents our slide out menu and `Home` represents our home page. A little further down in the file you'll see where the components are mapped to their tag names.

```js
components: {
  'left-panel-view': LeftPanel,
  'home-page': Home
},
```

## `LeftPanel.vue`

Open the **LeftPanel.vue** file (located within your projects root `src/components` folder) and notice that just like **App.vue** the file consists of three elements **template**, **script** and **style**. This is another example of a Vue single file component and in this case it encapsulates the left slide out menu for your app.

Familiarize yourself a bit with the **template** section as it includes a list with three links `Home`, `About` and `Services`. We'll be modifying this list in a later part of the tutorial.

## `Home.vue`

Open the **Home.vue** file (located within your projects root `src/components/pages` folder) and once again you'll notice that unlike **App.vue** and **LeftPanel.vue** it only contains **template** and **script** elements but no **style** element. This is because we don't need to add any additional CSS rules for this component.

The **Home.vue** component represents our app's home page, that is, it is the first screen the user will be shown when they start the app. Eventually we'll modify this file to add the functionality we want.
