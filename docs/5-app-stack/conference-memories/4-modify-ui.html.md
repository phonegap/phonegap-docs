---
title: Step 4: Modify the UI
url: app-stack/conference-memories/4-modify-ui
layout: subpage
---

<p class="sub-paragraph">Let's make a few minor changes to the UI so we can get used to the development cycle with [webpack hot loading](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).</p>

## Updating the Home Screen

Now open the **src/components/pages/Home.vue** file and we are going to modify the contents to more closely match our vision of the application.

### Navbar Title

First let's update the text that is shown in the nav bar when the home screen is loaded. Look for the following code in the **template** element:

```html
<f7-nav-center>
  Home
</f7-nav-center>
```

and modify it to be:

```html
<f7-nav-center>
  Conference Memories
</f7-nav-center>
```

Webpack will automatically compile your app and results will be displayed in your browser at [localhost:8080](http://localhost:8080) as long you kept the `npm run dev` process running.

![](/images/conference-memories/navbar-title.png)

### Content

Next, let's create a blank slate for our app to display pictures by removing the boiler plate text. Highlight and delete the following code:

```html
<!-- Scrollable page content-->
<f7-block-title>{{ title }}</f7-block-title>
<f7-block inner>
  <p>
    This is an example of split view application layout where left
    view degrades to panel on narrow screens (iPad portrait and
    iPhone). It behaves like default Mail app on iOS 7.
  </p>
  <p>
    Each view may have different layout, different navbar type
    (dynamic, fixed or static) or without navbar. You can easily
    control one view from another without any line of JavaScript
    just using "data-view" attribute on links.
  </p>
</f7-block>
```

Once again webpack will automatically compile your app and results will be displayed in your browser.

![](/images/conference-memories/blank-home.png)

## Updating the Slide Out menu

Now open the **src/components/LeftMenu.vue** file and we are going to remove the links we do not need.

### Remove links

In the `f7-list` element highlight and delete the last two list items:

```html
<f7-list-item
  link="/about"
  title="About"
  link-view="#view-main"
  link-reload
  link-close-panel
/>
<f7-list-item
  link="/services/"
  title="Services"
  link-view="#view-main"
  link-reload
  link-close-panel
/>
```

then modify the first menu item:

```html
<f7-list-item
  link="/home"
  title="Home"
  link-view="#view-main"
  link-reload
  link-close-panel
/>
```

to look like:

```html
<f7-list-item
  title="Login"
  link-close-panel
/>
```

![](/images/conference-memories/side-menu.png)

don't worry about setting up some code to handle the login action as we will do that in a future step.
