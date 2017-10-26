---
title: Lesson 2 - Search Page
url: references/stockpile-app/2-search-page
layout: subpage
---

Let's begin by coding the first view you are presented with when the app is run, the **Search** page. The search page consists of a title and an HTML form with some UI elements, including a title, input field for the search term, a submission button and a hidden field to store a limit needed when using the Stock API later. 

<img class="mobile-image" src="/images/stockpile/search.png" alt="Stockpile Search Screen"/>

## Implement the UI 

<div class="alert--tip">**TIP:** Be sure to keep the [Framework7 Docs](https://framework7.io/) and the [Framework7+Vue Docs](https://framework7.io/vue/) handy for a quick reference while building out your app. Details on all of the UI components and attributes used throughout the app can be found there. The components prefixed with `<f7-*>` specifically refer to [Framework7 Vue components](https://framework7.io/vue/).</div>

1. Rename `~src/components/pages/Home.vue` to `Search.vue`. This page will encapsulate the functionality for our Search view.
2. In `Search.vue`, change the page name from **home** to **search**:

		<f7-page name="search">

### Part 1: Navigation Bar 
There are some minor changes to make to the `<f7-navbar>` block. The `<f7-navbar>` block has a left and center definition to it currently, which refer to what you see in the app for the hamburger menu icon on the left and the Search title in the center. 

1. Change the icon reference for the side menu to use one from the *Framework7 Icons* library we added during project setup instead. The default `icon-bars` icon is referenced now (from the default Framework7 library), but to use icons from the *Framework7 Icons* library specifically, use the `icon-f7` attribute, with the icon name as the value, as shown here: 

		<f7-link icon-f7="bars" open-panel="left"></f7-link>

    <div class="alert--info">See [this link](http://framework7.io/vue/icon.html) for details and syntax for using icons with Framework7+Vue projects.</div>

2. Change the value of the `<f7-nav-center />` tag content to use a dynamic variable named `title` (curly braces denote the [Vue template syntax](https://vuejs.org/v2/guide/syntax.html)) instead of the **Home** string, so in the future if you want to change it you only have to do it in one place:

        <f7-nav-center sliding>{{ title }}</f7-nav-center>

    <div class="alert--info">**Note:** The title variable is defined in the JavaScript block at the bottom of the page via this [`data`](https://vuejs.org/v2/api/#data) function:

		data () {
	      	return {
	        	title: 'Home Page'
	      	};
	    }

3. Your final `<f7-navbar>` block should look like the snippet below:

	    <f7-navbar>
	      <f7-nav-left sliding>
	        <f7-link icon-f7="bars" open-panel="left"></f7-link>
	      </f7-nav-left>
	      <f7-nav-center sliding>{{ title }}</f7-nav-center>
	    </f7-navbar>

### Part 2: Page Content 
Continuing in `Search.vue`...

1. Replace this UI block from the base app:

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

	with:

		<f7-block-title>Search for Stock images by keyword</f7-block-title>
		<form ref="searchForm" form method="GET" @submit.prevent="onSubmit">
			<f7-list>
		    </f7-list>
		</form>

	This new code adds a [block content title](http://framework7.io/vue/content-block-title.html) to the page and an HTML form with some Vue-specific syntax that registers a reference to the `form` component (via [`ref`](https://vuejs.org/v2/guide/components.html#Child-Component-Refs) and specifies an event handler function of `onSubmit` to call on form submission. The `prevent` keyword is a [Vue modifier](https://vuejs.org/v2/guide/events.html#Event-Modifiers) that prevents the page from being reloaded on submission (for instance if the user hits enter within the form).

2. Now populate the `<f7-list>` with the necessary UI components.

    Add the following list item into the  `<f7-list>` block to put a label and search input field on the form:

		<f7-list-item>
			<f7-label floating v-if="isMaterial">Image search</f7-label>
			<f7-input type="search" name="q"
				placeholder="Image search" ref="searchInput"
				autocorrect="off" autocapitalize="off"  />
		</f7-list-item>

 3. Next, ***after*** the closing `</f7-list>` tag and ***before*** the closing `</form>` tag, add the following block:

		<f7-block>
		     <input type="hidden" name="limit" value="60" />
		     <input type="submit" name="submit" class="hidden" value="Search" />
		     <f7-button @click.prevent="onSubmit" big raised fill>
		       Find Images
		     </f7-button>
		</f7-block>
    
	This block specifies a hidden field to store the results `limit` to be passed in the request, and a hidden search input field and button that will call the `onSubmit()` event handler function. 

4. Your UI should be complete now and the code below the closing `</f7-navbar>` should look like the following:

	    <f7-block-title>Search for Stock images by keyword</f7-block-title>
	    <form ref="searchForm" form method="GET">
	      <f7-list>
	        <f7-list-item>
	          <f7-label floating v-if="isMaterial">Image search</f7-label>
	          <f7-input type="search" name="q"
	            placeholder="Image search" ref="searchInput"
	            autocorrect="off" autocapitalize="off"  />
	        </f7-list-item>
	      </f7-list>
	      <f7-block>
	        <input type="hidden" name="limit" value="60" />
	        <input type="submit" name="submit" class="hidden" value="Search" />
	        <f7-button @click.prevent="onSubmit" big raised fill>
	          Find Images
	        </f7-button>
	       </f7-block>
	    </form>

## Add JavaScript handling
In this section you should scroll down to the bottom of the page where the JavaScript default export block is defined to make some changes and additions. 

1. Rename this component by changing `name: Home` to `name: Search`.

2. Within the `data ()` function, set the value for the `title` variable to `Search`.  (You may recall this variable from earlier in the lesson when used in the navigation bar).

2. Add a `methods` object with a stub for the `onSubmit()` function so your code will compile. We will add more to this section later. The resulting `export` block should appear as below at this point:

	    export default {
	        name: 'Search',
	        data () {
	            return {
	                title: 'Search'
	            };
	        },
	        methods: {
	            onSubmit () {}
	        }
	    };

<!--TODO 


- data() properties - set name/title
- methods() - handle form submission
- computed properties, created() hack
-->
## Page Routing Updates

In this step you will change the routing of the app to display  the _Search_ page instead of the _Home_ page.

1. Open `~src/routes.js` and replace the instances of _Home_ with _Search_, for example:

	    import Search from './components/pages/Search';
	    import About from './components/pages/About';
	    ...

	    {
	        path: '/',
	        component: Search
	    },
	    {
	        path: '/about/',
	        component: About
	    },
	    ...

2. We can test out our routing updates via the left panel menu where you can switch between views, but we first need to update the string to **Search** rather than **Home** . 

    Open `~src/components/LeftPanel.vue` and change the link title from **Home** to **Search** in the menu list item:

	    <f7-list-item
	        link="/"
	        title="Search"
	        link-view="#main-view"
	        link-reload
	        link-close-panel
	    />

## Run it! 
Take a moment to stop and run the app where it's at to make sure everything works so far as expected. You should see the new UI components and changes to content but when you try to submit the search form it will not do anything at this point since we haven't told it to yet. 

You should also open the left panel menu and click between the links to ensure the `Search` link shows the right view and content.

<!--TODO should i make these a list of things to try instead of paragraphs? 

Screenshot? And more on this page
-->