---
title: Lesson 2 - Search View
url: references/stockpile-app/2-search-page
layout: subpage
---

You will begin by coding the first view presented when the app is run, the **Search** view. The search view consists of an HTML form with some UI elements, including a title, input field for the search term, a submission button and a hidden field to store a results limit. The existing **Home** page from the base app will be used to implement this new **Search** view.

<img class="mobile-image" src="/images/stockpile/android/search.png" alt="Stockpile Search Screen"/>

## Renaming & Routing Updates
1. Rename the existing `~src/components/pages/Home.vue` to `Search.vue`. 
2. Update the routing for this app to load the `Search` component instead of the `Home` component. Open `~src/routes.js` and replace all instances of _Home_ with _Search_, for example:

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

2. The Split Panel template includes a side menu with links to each page. Each of those menu items links to a `path` in the `routes.js` file, so you'll want to update the `title` corresponding to the route you just modified for descriptive purposes, since the root path (`/`) now loads `Search` and not `Home`.

    Open `~src/components/LeftPanel.vue` and change the following list item title from **Home** to **Search**:

	    <f7-list-item
	        link="/"
	        title="Search"
	        link-view="#main-view"
	        link-reload
	        link-close-panel
	    />

## Implement the UI 

<div class="alert--tip">**TIP:** Be sure to keep the [Framework7 Docs](https://framework7.io/) and the [Framework7+Vue Docs](https://framework7.io/vue/) handy for a quick reference while building out your app. Details on all of the UI components and attributes used throughout the app can be found there. The components prefixed with `<f7-*>` specifically refer to [Framework7 Vue components](https://framework7.io/vue/).</div>

1. In `Search.vue`, change the page name from "home" to "search":

		<f7-page name="search">

### Navigation Bar 
Each of the views you will work with in this guide has a navigation bar implemented with the Framework7 `<f7-navbar>` component though each will have slight modifications. The `<f7-navbar>` block in the base app has a `left` and `center` defined, which refer to what you see in the app for the hamburger menu icon on the left and the Search title in the center. You will make some slight modifications to the navbar.

<img class="mobile-image" src="/images/stockpile/navbar1.png" alt="Stockpile Navbar"/>

1. Change the side menu icon reference in the left side of the navbar to use one from the *Framework7 Icons* library you added during project setup instead. The default `icon-bars` icon is currently referenced which is part of the default Framework7 library, but to use icons from the *Framework7 Icons* library specifically, use the `icon-f7` attribute with the [icon name](http://framework7.io/icons/) as the value, which in this case is `bars`. For instance:

		<f7-link icon-f7="bars" open-panel="left"></f7-link>

    <div class="alert--info">See [this link](http://framework7.io/vue/icon.html) for details and syntax for using icons with Framework7+Vue projects.</div>

2. Change the value of the `<f7-nav-center />` tag content to use a dynamic variable named `title` defined in a template string like below: (curly braces denote the [Vue template syntax](https://vuejs.org/v2/guide/syntax.html)) instead of the **Home** string, so in the future if you want to change it you only have to do it in one place:

        <f7-nav-center sliding>{{ title }}</f7-nav-center>

    <div class="alert--info">**Note:** The `title` variable is defined in the JavaScript block at the bottom of the page via this [`data`](https://vuejs.org/v2/api/#data) function:</div>
    
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

### Page Content 
1. Next, replace this UI block:

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

	with:

		<f7-block-title>Search for Stock images by keyword</f7-block-title>
		<form ref="searchForm" form method="GET" @submit.prevent="onSubmit">
			<f7-list>
		    </f7-list>
		</form>

	This new code adds a [block content title](http://framework7.io/vue/content-block-title.html) to the page and an HTML form with a `GET` method and an `onSubmit()` event handler function. 
	
    <div class="alert--info">**Note:** The Vue-specific syntax in the `form` element registers a reference to the `form` component via [`ref`](https://vuejs.org/v2/guide/components.html#Child-Component-Refs) and specifies an event handler function of `onSubmit` to call on form submission. The `prevent` keyword is a [Vue modifier](https://vuejs.org/v2/guide/events.html#Event-Modifiers) that prevents the page from being reloaded on submission (for instance if the user hits enter within the form).</div>

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
    
	This block specifies a hidden field to store the required max limit of results to return, a hidden submit field and a button that calls an `onSubmit()` event handler. 

    <div class="alert--info">In the previous step the `<input type="submit" class="hidden" value="Search" />` element was added, which is used specifically for iOS to set the keyboard button text to **Search** instead of **Return**. However, that input field is actually not meant to show, so the `hidden` class name is used but still needs to be define.</div> 

4. Your UI components have all been added. Double check to ensure your code below the closing `</f7-navbar>` looks like the following:

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

6. Before moving on to the JavaScript additions, scroll to the bottom of the page and add a `<style>..</style>` block wth a `.hidden` class that has a `display` set to `none` for the hidden submit field style:

		<style scoped>
		  .hidden {
		    display: none;
		  }
		</style>

    <div class="alert--tip">The [`scoped`](https://vue-loader.vuejs.org/en/features/scoped-css.html) attribute ensures this style block only applies to this component. </div>

## Add JavaScript Handling
Now locate the the `<script>` tag that holds the JavaScript `export` block since this part of the lesson will focus in there. 

1. Rename this component by changing the `name: Home` to `name: Search`.

		export default {
	        name: 'Search',
	        ...
	    }

2. Within the `data ()` function, set the value for the `title` variable to `Search`.  (You may recall this variable from earlier in the lesson when it was used in the navigation bar).

        data () {
            return {
                title: 'Search'
            };
        },

2. Add a [`methods` object](https://vuejs.org/v2/guide/events.html) with a stub for the `onSubmit()` function so your code will compile. You will add more to this section later. The resulting `export` block should appear as below at this point:

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

    <div class="alert--tip">The Vue `methods` object is where you will typically define your event handlers.</div>
    
3. In the default export, add a [computed property](https://vuejs.org/v2/guide/computed.html) object and define an `isMaterial` property just after the `methods` object:
		
        computed: {
          isMaterial () {
              return window.isMaterial;
           }
        }

4. Ensure the Search page is always at the top of the view stack by adding this [lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) on the [`created ()`](https://vuejs.org/v2/api/#created) lifecycle event. Add it after the `computed` object in the default export:

        created () {
            this.$f7.mainView.history = ['/'];
         }

    <div class="alert--tip">Don't worry too much about this syntax since it's Framework7 specific, just understand that it ensures this page is kept at the top of the stack in terms of navigation and history since it's meant to be a top-level page (versus one that is only navigated to like Results or Details). </div>


5. The final export block should look like the following:
             
        export default {
	        name: 'Search',
	        data () {
	            return {
	                title: 'Search'
	            };
	        },
	        methods: {
	            onSubmit () {}
	        },
	        computed: {
		      isMaterial () {
		          return window.isMaterial;
		       }
		    }
            created () {
		  		this.$f7.mainView.history = ['/'];
            }
	    };
    
## Run it! 
Take a moment to stop and run the app now to make sure everything works so far as expected. You should see the new Search page but when you try to submit the search form it will not do anything at this point since you haven't put anything in the `onSubmit` handler yet. 

You should also open the left panel menu and click between the menu options to ensure the new **Search** view is shown when toggling between views and back to **Search**. 

<img class="mobile-image" src="/images/stockpile/lesson2-search.png" alt="Stockpile Search "/>

<div class="alert--info">**Note:** In this lesson you were given more helper reference code and instruction to help you get started versus what you will see in subsequent views. Most of them follow a similar pattern however, so you can refer back to this lesson for more contextual help as needed. </div>

<!-- TODO - THIS MOVE UNTIL RESULTS PAGE AVAILABLE 
### Handling form submission
Now you need to add some code to actually do something when the **Find Images** button is hit. You have a stubbed out `onSubmit ()` function currently that is called but doesn't do anything quite yet. 

- Modify your `onSubmit ()` function as shown below:

		onSubmit () {
		  const { searchInput, searchForm } = this.$refs;
		  const { filter, limit, q } = this.$f7.formToJSON(searchForm);
		  const { router } = this.$f7.mainView;
		  const input = searchInput.$el.querySelector('input');

		  input.blur();

		  if (!q.trim()) {
		    this.$f7.alert('Please enter a search term', 'Search Error');
		    return;
		  }
		  router.loadPage(`/results/${filter || 'words'}/${limit}/${q}/search`);
		}
-->	

<!--TODO should i make these a list of things to try instead of paragraphs? 

Screenshot? And more on this page
-->
